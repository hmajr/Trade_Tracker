import '../styles/TradesDay.css'
import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';
import { TradeDetail } from './TradeDetail';

interface TradeDayProps {
  date: Date
  winner?: number
  amount?: number
}

export function TradesDay ({winner = 0, amount = 0} : TradeDayProps) { //Habit
  
  
  const completedRatio = amount > 0 ? Math.round(( winner / amount ) * 100 ) : 0

  return (
    <Popover.Root>
      <Popover.Trigger className={clsx('w-10 h-10 border-2 rounded-lg', {
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
            terça-feira 
          </span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'> 
            16/07 
          </span>

          <ProgressBar progress={completedRatio}/>

          <div className='mt-6 flex flex-col gap-3'>
            {/* Popover Trade Details */}
            <Popover.Root>
              <Popover.Trigger>
                  <span className='font-semibold text-xl text-white leading-tight'>
                    WDO | R$ 549.00
                  </span>
              </Popover.Trigger>
              <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 border-2 border-zinc-500 flex flex-col'>
                <TradeDetail ticker='WDO' result={549.00} entry={new Date().toISOString()} exit={new Date().toISOString()}/>
              </Popover.Content>
            </Popover.Root>
            <Popover.Root>
              <Popover.Trigger>
                  <span className='font-semibold text-xl text-white leading-tight'>
                    WIN | - R$ 149.00
                  </span>
              </Popover.Trigger>
              <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 border-2 border-zinc-500 flex flex-col'>
                <TradeDetail ticker='WIN' result={-149.00} entry={new Date().toISOString()} exit={new Date().toISOString()}/>
              </Popover.Content>
            </Popover.Root>
            <Popover.Root>
              <Popover.Trigger>
                  <span className='font-semibold text-xl text-white leading-tight'>
                    WIN | R$ 7.00
                  </span>
              </Popover.Trigger>
              <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 border-2 border-zinc-500 flex flex-col'>
                <TradeDetail ticker='WIN' result={7.00} entry={new Date().toISOString()} exit={new Date().toISOString()}/>
              </Popover.Content>
            </Popover.Root>
          </div>

          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}