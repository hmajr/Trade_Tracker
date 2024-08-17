import { Check } from "phosphor-react";
import { X } from 'phosphor-react'
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";
import { FORMAT_STYLE } from "../lib/dayjs";
import * as Dialog from '@radix-ui/react-dialog'


interface editTradeProps{
  id : string,
  ticker : string,
  result : number,
  entryDate : Date,
  exitDate : Date 
  onShowTradeEdited: () => void
}

export function EditTradeForm(props : editTradeProps){
  const [ticker, setTicker] = useState(props.ticker)
  const [result, setResult] = useState(props.result)

  async function handleEditTrade(event : FormEvent){
    event.preventDefault()
    
    if( !ticker.trim() )
    {
      return (alert("TICKER INVALIDO!!!"))
    }
    
    await api.patch(`trade/${props.id}/edit`, {
      ticker,
      result
    }).then((response) => {
        console.log('Trade updated successfully:', response.data);
        alert('Trade editado!')
        
        props.onShowTradeEdited()
      })
      .catch((error) => {
        console.error('Error updating trade:', error);
      })
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0'/>
      <Dialog.Content className='absolute p-10 bg bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Dialog.Title className='text-3xl leading-tight font-extrabold'>
          Editar Trade
        </Dialog.Title>
        <Dialog.Close className='absolute right-6 top-6 text-zinc-400 hover:text-zinc-200 hover:border-red-500'>
          <X size={24} aria-label='Fechar'/>
        </Dialog.Close>
        <form onSubmit={handleEditTrade} className="w-full flex flex-col mt-6">
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

          
          <label className="font-semibold flex leading-tight mt-4">
            Data/Hora Entrada <span className="font-normal">&nbsp;(somente leitura)</span>
          </label>

          <input readOnly
            type="text"
            id="entry"
            value={dayjs(props.entryDate).format(FORMAT_STYLE)}
            className="p-4 block rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
          />

          
          <label className="font-semibold flex leading-tight mt-4">
            Data/Hora Saída <span className="font-normal">&nbsp;(somente leitura)</span>
          </label>

          <input readOnly
            type="text"
            id="exit"
            value={dayjs(props.exitDate).format(FORMAT_STYLE)}
            className="p-4 block rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
          />
          
          <button 
            type="submit" 
            className='mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold transition-colors bg-green-600 hover:bg-green-400'
            onClick={handleEditTrade}
          >
            <Check size={20} weight="bold" />  
            Confirmar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}