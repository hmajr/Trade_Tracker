import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { TradesDay } from "./TradesDay"
const weekDays = [ 'D','S','T','Q','Q','S','S' ]

const SummaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18*7
const ammountOfDaysToFill = minimumSummaryDatesSize - SummaryDates.length

export function SummaryTable() {
  

  return(
    <div className="w-full flex">
      {/* Days of Week */}
      <div className="grid grid-rows-7  grid-flow-row gap-3">
        {weekDays.map((weekDay, i)=>{
          return (
            <div key={`${weekDay}-${i}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
              {weekDay}
            </div>
          )
        })}
      </div>
      
      {/* Grid row of Days */}
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {SummaryDates.map(date => {
          return (
          <TradesDay 
            ammount={6} 
            winner={Math.round(Math.random()*6)} 
            key={date.toString()} 
          />
        )
        })}

        {ammountOfDaysToFill > 0 && Array.from({ length: ammountOfDaysToFill}).map((_, i)=>{
          return (
            <div 
              key={i} 
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          )
        })}
      </div>
    </div>
  )
}