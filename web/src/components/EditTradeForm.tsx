import { Check, Prohibit} from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/axios";
import clsx from "clsx";
import dayjs from "dayjs";

interface editTradesProps{
  id : string,
  ticker : string,
  result : number,
  entryDate : string,
  exitDate : string 
}

export function EditTradeForm(props : editTradesProps){
  const [ticker, setTicker] = useState(props.ticker)
  const [result, setResult] = useState(props.result)
  const [isValid = false, setIsValid] = useState(Boolean)

  async function editTrade( event : FormEvent){
    event.preventDefault()

    if( !ticker )
    {
      return (console.log("TRADE INVALIDO!!!"))
    }

    await api.patch(`trades/${props.id}/edit`, {
      ticker,
      result,
    })
      .then((response) => {
        console.log('Trade updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating trade:', error);
      })
  }

  //set isValid true if input is inserted
  useEffect(() => {
    (ticker && (result || result == 0) )
      ?
        setIsValid(true)
        :
        setIsValid(false)
  }, [ticker, result])
  
  return (
    <form onSubmit={editTrade} className="w-full flex flex-col mt-6">
      <label htmlFor="ticker">
        Qual o ticker?
      </label>

      <input 
        type="text"
        id="ticker"
        placeholder={props.ticker}
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
        placeholder={props.result.toString()}
        className="p-4 block rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        onChange={event => setResult( Number(event.target.value) )}
        />

      
      <label htmlFor="" className="font-semibold flex leading-tight mt-4">
        Data/Hora Entrada
      </label>

      <input readOnly
        type="text"
        id="entry"
        value={dayjs(props.entryDate).toString()}
        className="p-4 block rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
      />

      
      <label htmlFor="" className="font-semibold flex leading-tight mt-4">
        Data/Hora Saída
      </label>

      <input readOnly
        type="text"
        id="exit"
        value={dayjs(props.exitDate).toString()}
        className="p-4 block rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
      />
      
      <button 
        type="submit" 
        className={ clsx('mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold transition-colors',
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