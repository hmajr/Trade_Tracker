import * as Dialog from '@radix-ui/react-dialog'
import '../styles/TradesDay.css'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { PencilSimple, Trash } from 'phosphor-react'
import { EditTradeForm } from './EditTradeForm'
import { DeleteTradeForm } from './DeleteTradeForm'
import { useEffect, useState } from 'react'
import { FORMAT_STYLE } from '../lib/dayjs'

interface TradeProps {
  id: string,
  ticker: string,
  result: number,
  entry: Date,
  exit: Date,
  onTradeChanged: (isChanged: boolean) => void
}

export function TradeDetail (props : TradeProps) { //Habit
  const [ticker, setTicker] = useState(props.ticker)
  const [result, setResult] = useState(props.result)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  

  function handleTradeEdited (newTicker: string, newResult: number, isEdited: boolean) {
    setShowEditModal(false) // Close the modal/container
    console.log(`NEW ${newTicker} | ${newResult} -> ${isEdited}`)

    if(isEdited)
    {
      setTicker(newTicker)
      setResult(newResult)

      props.onTradeChanged(true)
    }
  }

  function handleTradeDeleted (isDeleted: boolean) {
    setShowDeleteModal(false) // Close the modal/container
    if(isDeleted)
    {
      return props.onTradeChanged(true)
    }
  }

  useEffect(() => {
    
  }, [ticker, result])
  
  return (
    <div className='mt-4 flex flex-col gap-3'>
      <span className='font-semibold text-zinc-400 text-xl'> 
        {ticker} 
      </span>

      <span className={clsx('mt-1 font-extrabold leading-tight text-2xl', {
        'text-red-500' : result <= -10 ,
        'text-zinc-300' : result > -10 && result < 10,
        'text-green-500' : result >= 10 
      })}> 
        {result >= 0 ? `R$ ${result},00` : `-R$ ${result*(-1)},00`}
      </span>
      <div className='mt-2 text-white font-semibold'>
        Entrada
      </div>
      <span className='text-lg'> {dayjs(props.entry).format(FORMAT_STYLE)} </span>

      <div className='mt-2 text-white font-semibold'>
        Saída
      </div>
      <span className='text-lg'> {dayjs(props.exit).format(FORMAT_STYLE)} </span>

      <Dialog.Root>
        <Dialog.Trigger 
          type='button' 
          className='mt-2 text-lg border border-green-700 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-green-200  transition-colors duration-150'
          onClick={() => setShowEditModal(true)}
        >
          <PencilSimple size={20} className=' text-green-500' />

          Editar Trade
        </Dialog.Trigger >

        {
          showEditModal &&
          (
            <EditTradeForm 
              id = {props.id}
              ticker = {ticker}
              result = {result}
              entryDate = {props.entry}
              exitDate = {props.exit}
              onShowTradeEdited = {handleTradeEdited}
            />
          )
        }
      </Dialog.Root>

      <Dialog.Root>
        <Dialog.Trigger 
          type='button' 
          className=' font-semibold text-lg border border-red-700 rounded-lg px-6 py-4 flex items-center gap-3 hover:border-red-200  transition-colors duration-150'
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash size={20} className='text-red-500' />
          Excluir Trade
        </Dialog.Trigger >

        { showDeleteModal && 
          (
            <DeleteTradeForm 
              id={props.id} 
              onShowTradeDeleted={handleTradeDeleted} 
            />
          )
        }
      </Dialog.Root>
    </div>
  )
}