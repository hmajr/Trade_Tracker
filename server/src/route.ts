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

  // HOME TEST
  app.get('/home', async ()=> {
    const trades = prisma.trade.findFirst()

    return trades
  })
}