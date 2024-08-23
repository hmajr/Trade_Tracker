import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs';
import '../styles/TradesDay.css'
import { ProgressBar } from './ProgressBar';
import { TradesList } from './TradesList';
import { CompletedRatioCalculation } from '../utils/completed-ratio-calculation';

interface TradeDayProps {
  date: Date
  defaultWinner?: number
  defaultAmount?: number
}

export function TradesDay ({date, defaultWinner = 0, defaultAmount = 0} : TradeDayProps) { //Habit
  const [amount, setAmount] = useState(defaultAmount)
  const [winner, setWinner] = useState(defaultWinner)

  function handleTradeInfo(newAmount: number, newWinner: number){
    setAmount(newAmount)
    setWinner(newWinner)
  }

  const completedRatio = CompletedRatioCalculation( amount, winner)

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  return (
    <Popover.Root>
      <Popover.Trigger className={clsx('w-10 h-10 border-2 rounded-lg transition-colors', {
        'bg-yellow-400 border-orange-300' : completedRatio == 100,
        'bg-green-500 border-green-400' : completedRatio >= 80 && completedRatio < 100,
        'bg-green-600 border-green-500' : completedRatio >= 60 && completedRatio < 80,
        'bg-green-700 border-green-600' : completedRatio >= 40 && completedRatio < 60,
        'bg-green-800 border-green-700' : completedRatio >= 20 && completedRatio < 40 ,
        'bg-green-900 border-green-800' : completedRatio > 0 && completedRatio < 20,
        'bg-zinc-900 border-zinc-800' : completedRatio == 0,
      })}/>

      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'> 
            {dayOfWeek} 
          </span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'> 
            {dayAndMonth} 
          </span>

          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
          
          <ProgressBar progress={completedRatio}/>

          <TradesList date={date} onChangeTrades={handleTradeInfo}/>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}