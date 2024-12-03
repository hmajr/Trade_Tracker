import dayjs from "dayjs"
import { FastifyInstance } from 'fastify'
import { prisma } from './lib/prisma.ts'
import { z } from 'zod'

export async function appRoutes(app : FastifyInstance){
  //Post a trade
  app.post('/trades', async (request, reply) => {
    const createTradeBody = z.object({
      ticker: z.string(),
      entry_date: z.string().datetime(),
      exit_date: z.string().datetime(),
      result: z.number()
    })

    try {
      const { ticker, result , entry_date, exit_date } = createTradeBody.parse(request.body)
    
      var tradeUID = await prisma.trade.create({
        data: {
          ticker,
          entry_date,
          exit_date,
          result
        }
      })

      const exitDateWithoutTime = dayjs(exit_date)
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0)
        .toDate()
      //search for unique date for a trade
      const existingDay = await prisma.day.findUnique({
        where: {
          date: exitDateWithoutTime
        }
      })

      if (!existingDay) {
        await prisma.day.create({
          data: {
            date: exitDateWithoutTime,
            dayTrades: {
              create: {
                trade_id : tradeUID.id,
              }
            }
          }
        })
      } else {
        await prisma.day.update({
          where: {
            date: exitDateWithoutTime,
          },
          data: {
            dayTrades: {
              create: {
                trade_id: tradeUID.id,
              },
            },
          },
        });
      }
      // FALTA REALIZAR O LINK TABLE DAY -> CREATED_TRADE
      reply.code(201).send({ message: 'Trade created successfully' })
    } catch (error) {
      console.error(error)
      reply.code(500).send({ error: 'An error occurred while creating the trade' })
    }
  })

  //Get daytrades (init/finish in 1 day)
  app.get('/dayTrades', async (request) => {
    
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParams.parse(request.query)
    const startDate = new Date(date.setHours(0,0,0,0))
    const endDate = new Date(date.setHours(23,59,59,999))

    const possibleTrades = await prisma.trade.findMany({
      where: {
        exit_date: {
          gte: startDate,
          lte: endDate,
        }
      }
    })

    //Filter/Get WIN Trades IDs
    const winTrades = possibleTrades?.filter(winTrade => winTrade.result > 0).map(trade =>{
      return trade.id
    }) ?? []

    return {
      possibleTrades,
      winTrades
    }
  })

  //Update trade result (:id)
  app.patch('/trade/:id/edit', async (request) => {
    
    const editTradeParams = z.object({
      id: z.string(),
    })
    const editTradeBody = z.object({
      ticker : z.string(),
      result : z.coerce.number(),
    })
    

    const { id }  = editTradeParams.parse(request.params)
    const { ticker, result }  = editTradeBody.parse(request.body)
    
    const updatedTrade = await prisma.trade.update({
      where: { id: id },
      data: { 
        ticker: ticker,
        result: result
      }
    })

    if (!updatedTrade) {
      throw new Error("Trade not found")
    }

    return updatedTrade
  })

  //Delete a trade
  app.delete("/trade/:id/delete", async (request, response) => {
    const deleteTradeParams = z.object({
      id: z.string().uuid()
    })

    const { id } = deleteTradeParams.parse(request.params)

    const trade = await prisma.trade.findUnique({
      where: {
        id: id
      }
    })

    if (!trade) {
      return response.status(404).send("Day not found")
    }

    const dayTrade = await prisma.dayTrade.findFirst({
      where: {
        trade_id: id
      }
    })

    if (!dayTrade) {
      return response.status(404).send("Trade not found in this day")
    }

    try {
      await prisma.dayTrade.delete({
        where: {
          id: dayTrade.id
        }
      })

      const deletedTrade = await prisma.trade.delete({
        where: {
          id: id
        }
      })

      return response.send(deletedTrade)
    } catch (error) {
      console.error("Error deleting trade:", error) // Log the error for debugging
      return response.status(500).send({ error: "Error deleting trade" })
    }
  })

  //Get summary trades from a day
  app.get("/summary", async () => {
    // [ {date: 17/01, numTrades: 5, winTrades: 2}, {date: 18/01, num trades: 3, winTrades: 3} ]
    const summary = await prisma.$queryRaw`
      -- Win trades from a day
      SELECT 
        D.id, 
        D.date,
        (
          SELECT 
            cast( count(*) as float )
          FROM day_trades DT
          WHERE DT.day_id = D.id
        ) as trades,
        (
          SELECT 
            cast( count(*) as float )
          FROM day_trades DT
          JOIN trades T 
            ON DT.trade_id = T.id
          WHERE DT.day_id = D.id 
            AND T.result > 0.0
        ) as winTrades
      FROM days D
    `

    return summary
  })

  // HOME TEST
  app.get("/home", async () => {
    const trades = prisma.trade.findFirst()

    return trades
  })
}
