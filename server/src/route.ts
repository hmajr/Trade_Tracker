import dayjs from "dayjs"
import { FastifyInstance } from 'fastify'
import { prisma } from './lib/prisma'
import { z } from 'zod'

export async function appRoutes(app : FastifyInstance){
  // HOME TEST
  app.get('/home', async ()=> {
    const trades = prisma.trade.findFirst()

    return trades
  })
}