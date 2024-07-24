import dayjs from "dayjs"
import { FastifyInstance } from 'fastify'
import { prisma } from './lib/prisma'
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
    
      await prisma.trade.create({
        data: {
          ticker,
          entry_date,
          exit_date,
          result
        }
      })

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
        entry_date: {
          gt: startDate,
        },
        exit_date: {
          lte: endDate,
        }
      }
    })

    //Filter/Get WIN Trades IDs
    const winTrades = possibleTrades.filter(winTrade => winTrade.result > 0).map(trade =>{
      return trade.id
    })

    return {
      possibleTrades,
      winTrades
    }
  })

  //Update trade result (:id)
  app.patch('/trades/:id/edit', async (request) => {
    
    const editTradeParams = z.object({
      id: z.string().uuid(),
    })
    const editTradeQuery = z.object({
      result : z.coerce.number(),
    })
    
    const { id }  = editTradeParams.parse(request.params)
    const { result } = editTradeQuery.parse(request.query)
    
    const updatedTrade = await prisma.trade.update({
      where: { id: id },
      data: { result: result },
    });

    return updatedTrade
  })

  //Delete a trade
  app.delete('/trade/:id/delete', async (request, response) => {
    
    const deleteTradeParams = z.object({
      id : z.string().uuid(),
      date : z.coerce.date(),
    })

    const {id } = deleteTradeParams.parse(request.params)
    const { date } = deleteTradeParams.parse(request.query)

    const day = await prisma.day.findUnique({
      where: {
        date : new Date(date),
      }
    })

    if( !day ){
      return response.status(404).send('Day not found')
    }

    const dayTrade = await prisma.dayTrade.findUnique({
      where: {
        day_id_trade_id : {
          day_id : day.id,
          trade_id : id,
        }
      }
    })

    if( !dayTrade ){
      return response.status(404).send('Trade not found in this day')
    }

    await prisma.dayTrade.delete({
      where : {
        id : dayTrade.id,
      }
    })

    const deletedTrade = await prisma.trade.delete({
      where : {
        id : id,
      }
    })

    return response.send(deletedTrade)
  })

  //Get summary trades from a day
  app.get('/summary', async () => {
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
  app.get('/home', async ()=> {
    const trades = prisma.trade.findFirst()

    return trades
  })
}