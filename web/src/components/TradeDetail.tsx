import * as Dialog from '@radix-ui/react-dialog';
import '../styles/TradesDay.css'
import clsx from 'clsx';
import dayjs from 'dayjs';
import { PencilSimple, Trash, X } from 'phosphor-react';
import { EditTradeForm } from './EditTradeForm';
import { DeleteTradeForm } from './DeleteTradeForm';
import { useState } from 'react';

interface TradeProps {
  id: string,
  ticker: string,
  result: number,
  entry: string,
  exit: string
}

export function TradeDetail (props : TradeProps) { //Habit
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const handleTradeDeleted = () => {
    setShowDeleteModal(false); // Close the modal/container
  };

  return (
    <div className='mt-4 flex flex-col gap-3'>
      <span className='font-semibold text-zinc-400 text-xl'> 
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

      <Dialog.Root>
        <Dialog.Trigger 
          type='button' 
          className='border border-green-700 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-green-200  transition-colors duration-150'
        >
          <PencilSimple size={20} className='text-green-500' />

          Editar Trade
        </Dialog.Trigger >

        <Dialog.Portal>
          <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0'/>
          <Dialog.Content className='absolute p-10 bg bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Dialog.Title className='text-3xl leading-tight font-extrabold'>
              Editar Trade
            </Dialog.Title>
            <Dialog.Close className='absolute right-6 top-6 text-zinc-400 hover:text-zinc-200'>
              <X size={24} aria-label='Fechar'/>
            </Dialog.Close>
            <EditTradeForm id={props.id} ticker={props.ticker} result={props.result} entryDate={props.entry} exitDate={props.exit}/>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root>
        <Dialog.Trigger 
          type='button' 
          className='border border-red-700 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-red-200  transition-colors duration-150'
        >
          <Trash size={20} className='text-red-500' />

          Excluir Trade
        </Dialog.Trigger >

        { showDeleteModal && 
          (
            <Dialog.Portal>
              <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0'/>
              <Dialog.Content className='absolute p-10 bg bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <Dialog.Close className='absolute right-6 top-6 text-zinc-400 hover:text-zinc-200'>
                  <X size={24} aria-label='Fechar'/>
                </Dialog.Close>

                <Dialog.Title className='text-3xl leading-tight font-extrabold'>
                  Excluir Trade
                </Dialog.Title>
                <p>Are you sure you want to delete this trade?</p>
                <DeleteTradeForm id={props.id} onTradeDeleted={handleTradeDeleted}/>
              
              </Dialog.Content>
            </Dialog.Portal>
          )
        }
      </Dialog.Root>
    </div>
  )
}