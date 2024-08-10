import { useEffect, useRef, useState } from "react"
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { TradesDay } from "./TradesDay"
import { api } from '../lib/axios'
import dayjs from "dayjs"

const weekDays = [ 'D','S','T','Q','Q','S','S' ]
const summaryDates = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18*7
const ammountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length
const weekDaysBeforeSummaryDateBeginning = dayjs(summaryDates[0]).day() % 7

type Summary = {
  id : string;
  date : string;
  trades : number;
  winTrades : number;
}[] //same as Array<{ ... }>

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([])
  const gridRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    
    api.get('summary').then(response => {
      setSummary(response.data)
    }).catch(error => {
      console.error("Error getting summary trade table", error)
    })
  }, [])
  
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollLeft = gridRef.current.scrollWidth;
    }
  }, [summary])

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
      <div 
        ref={gridRef}
        className="grid grid-rows-7 grid-flow-col gap-3 overflow-x-scroll
                   scrollbar scrollbar-track-rounded-full scrollbar-thumb-zinc-200 scrollbar-track-transparent"
        style={{ width: gridRef.current ? gridRef.current.offsetWidth : 'auto' }}
      >
        {weekDaysBeforeSummaryDateBeginning > 0 && Array.from({length : weekDaysBeforeSummaryDateBeginning}).map((_ , i)=>{
          return (
            <div 
              key={i} 
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          )
        })

        }
        {
          summaryDates.map(date => {
            const dayInSummary = summary.find(day => {
              return dayjs(date).isSame(day.date, 'day')
            }
          )
          
          return (
            <TradesDay 
              key={date.toString()}
              date={date}
              amount={dayInSummary?.trades} 
              winner={dayInSummary?.winTrades} 
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