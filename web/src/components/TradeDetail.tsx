import '../styles/TradesDay.css'
import clsx from 'clsx';
import dayjs from 'dayjs';

interface TradeProps {
  ticker: string,
  result: number,
  entry: string,
  exit: string
}

export function TradeDetail (props : TradeProps) { //Habit
  return (
    <div className='mt-4 flex flex-col gap-3'>
      <span className='font-semibold text-zinc-400 text-lg'> 
        {props.ticker} 
      </span>
      <span className={clsx('mt-1 font-extrabold leading-tight text-2xl', {
        'text-red-500' : props.result <= -10 ,
        'text-zinc-300' : props.result > -10 && props.result < 10,
        'text-green-500' : props.result >= 10 
      })}> 
        {`R$ ${props.result},00`}
      </span>
      <div className='text-white font-semibold'>
        Entrada
      </div>
      <span> {dayjs(props.entry).toString()} </span>
      <div className='text-white font-semibold'>
        Saída
      </div>
      <span> {dayjs(props.exit).toString()} </span>
    </div>
  )
}