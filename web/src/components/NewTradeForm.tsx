import dayjs from "dayjs";
import { Check, Prohibit} from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/axios";
import clsx from "clsx";

export function NewTradeForm(){
  const [ticker, setTicker] = useState('')
  const [result, setResult] = useState(0.0)
  const [entry_date, setEntryDate] = useState(new Date())
  const [exit_date, setExitDate] = useState(new Date())
  const [isValid = false, setIsValid] = useState(Boolean)

  async function createNewTrade(event : FormEvent){
    event.preventDefault()

    if( !ticker || 
        !dayjs(exit_date).isValid() || 
        !dayjs(entry_date).isValid() ||
        !dayjs(entry_date).isBefore(exit_date)
      ){
      return (console.log("TRADE INVALIDO!!!"))
    }

    await api.post('trades', {
      ticker,
      result,
      entry_date,
      exit_date
    })

    alert('Trade criado !!!')
  }

  //set isValid true if input is inserted
  useEffect(() => {
    (ticker && (result || result == 0) && entry_date && exit_date && dayjs(entry_date).isBefore(exit_date))
      ?
        setIsValid(true)
        :
        setIsValid(false)
  }, [ticker, result, entry_date, exit_date])
  
  return (
    <form onSubmit={createNewTrade} className="w-full flex flex-col mt-6">
      <label htmlFor="ticker">
        Qual o ticker?
      </label>

      <input 
        type="text"
        id="ticker"
        placeholder="ex.: WDO, WIN, PETR4, VALE3, Trava de Alta, ..."
        className="p-4 block rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        onChange={event => setTicker(event.target.value)}
        />

      <label htmlFor="" className="font-semibold flex leading-tight mt-4">
        Qual o Resultado?
      </label>

      <input 
        type="number"
        id="result"
        placeholder="R$ 999,99"
        className="p-4 block rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        onChange={event => setResult( Number(event.target.value) )}
        />

      
      <label htmlFor="" className="font-semibold flex leading-tight mt-4">
        Data/Hora Entrada
      </label>

      <input 
        type="datetime-local"
        id="entry"
        placeholder="R$ 999,99"
        className="p-4 block rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        onChange={event => setEntryDate(new Date(event.target.value))}
      />

      
      <label htmlFor="" className="font-semibold flex leading-tight mt-4">
        Data/Hora Saída
      </label>

      <input 
        type="datetime-local"
        id="exit"
        placeholder="R$ 999,99"
        className="p-4 block rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        onChange={event => setExitDate(new Date(event.target.value))}
      />
      
      <button type="submit" className={ clsx('mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold',
          {
            'bg-green-600 hover:bg-green-400' : isValid,
            'bg-zinc-600 hover:bg-zinc-500 pointer-events-none' : !isValid
          }
        )}
      >
        {
          isValid ?  
            <Check size={20} weight="bold" />  
            :
            <Prohibit size={20} weight="bold" />
        }
        
        Confirmar
      </button>
    </form>
  )
}