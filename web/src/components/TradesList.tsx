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

export function TradesList( {date}: TradesListProps) {
  const [tradesInfo, setTradesInfo] = useState()

  useEffect(() => {
    api.get('dayTrades', {
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
                  {trade.ticker} | R$ {trade.result}
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