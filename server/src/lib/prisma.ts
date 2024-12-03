// import { Pool } from 'pg'
// import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "@prisma/client"


// const connectionString = `${process.env.API_DATABASE_URL_POSTGRES}`
const connectionString = `${process.env.API_DATABASE_URL_SQLITE}`

// const pool = new Pool({ connectionString })
// const adapter = new PrismaPg(pool)
export const prisma = new PrismaClient({
  log: ["query"]
})