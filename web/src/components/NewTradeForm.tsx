import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";

export function NewTradeForm(){
  const [ticker, setTicker] = useState('')
  const [result, setResult] = useState(0.0)
  const [entryDate, setEntryDate] = useState(new Date())
  const [exitDate, setExitDate] = useState(new Date())

  function createNewTrade(event : FormEvent){
    event.preventDefault()

    console.log(ticker)
    console.log(result)
    console.log(entryDate)
    console.log(exitDate)
  }
  
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
      <button type="submit" className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-400">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}