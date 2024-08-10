import { useEffect, useState } from 'react';
import { TradeDetail } from './TradeDetail';
import * as Popover from '@radix-ui/react-popover';
import { api } from '../lib/axios';

interface TradesListProps {
  date: Date
}

interface TradesInfo {
  id: string,
  ticker: string,
  result: number,
  entry_date: Date,
  exit_date: Date
}

interface DayTradesResponse {
  possibleTrades: TradesInfo[];
  winTrades: string[]; 
}

export function TradesList( {date}: TradesListProps) {
  const [tradesInfo, setTradesInfo] = useState<DayTradesResponse | null>(null)

  useEffect(() => {
    api.get<DayTradesResponse>('dayTrades', { // Specify the expected response type
      params: {
        date: date.toISOString(),
      }
    }).then(response => {
      setTradesInfo(response.data)
    })
  }, [])
  
  return (
    <div className='mt-6 flex flex-col gap-3'>
      {/* Popover Trade Details */}
      {tradesInfo?.possibleTrades.map(trade =>{ 
        return(
          <Popover.Root key={`${trade.id}-pop`}>
            <Popover.Trigger>
              <span className='font-semibold text-xl text-white leading-tight'>
                  {trade.ticker} | {trade.result >= 0 ? `R$ ${trade.result}` : `-R$ ${trade.result*(-1)}`}
              </span>
            </Popover.Trigger>
            <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 border-2 border-zinc-500 flex flex-col'>
              <TradeDetail
                id={trade.id}
                ticker={trade.ticker} 
                result={trade.result} 
                entry={trade.entry_date} 
                exit={trade.exit_date}
              />
            </Popover.Content>
          </Popover.Root>
        )
      })}
    </div>

  )
}
