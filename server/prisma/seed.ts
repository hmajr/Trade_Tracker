import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//numero de dados criados
const NUM_SEEDS =  350
console.log("Seed Nubmber: " + NUM_SEEDS)

const tickers = ["WIN", "WDO"]
//Range de data dos trades criados
const START_DATE = new Date("2024-01-01T01:00:00.000z")
const END_DATE = new Date()

//Range resultado trade
const MIN_RESULT = -550
const MAX_RESULT = 2090

//Generate seed
async function run() {
  await prisma.dayTrade.deleteMany()
  await prisma.trade.deleteMany()
  await prisma.day.deleteMany()
  
  
  var count = 0
  while (count < NUM_SEEDS ){
    
    //Generate random entry and exit Dates
    var entryDate = random_dates( START_DATE, END_DATE )
    var exitDate = new Date(entryDate.getTime() + Math.floor(Math.random() * 4 + 1) * 60 * 60 * 1000)

    //Get ID generate for the Trade
    var tradeUID = await prisma.trade.create({
      data:{
        ticker: tickers[Math.floor( Math.random() * tickers.length )],
        result: Math.floor( Math.random()* (MAX_RESULT - (MIN_RESULT)) ) + (MIN_RESULT),
        entry_date: new Date(entryDate),
        exit_date: new Date(exitDate)
      }
    })
    
    const exitDateWithoutTime = new Date(exitDate.setHours(0,0,0,0))
    //search for unique date for a trade
    const existingDay = await prisma.day.findUnique({
      where: {
        date: exitDateWithoutTime,
      },
    });
    
    if(!existingDay){
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
    }
    else{
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
    
    count += 1
  }
  
}

function random_dates(start : Date, end : Date){
  const diff = end.getTime() - start.getTime()
  const newTimeStamp = Math.random()*diff + start.getTime()

  return new Date(newTimeStamp)
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })