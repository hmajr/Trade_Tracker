import { FormEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { api } from '../lib/axios'

interface TradeProps {
  id : string,
  onShowTradeDeleted: (isDeleted: boolean) => void
}

export function DeleteTradeForm( { id , onShowTradeDeleted } : TradeProps) {

  async function handleDeleteTrade (event : FormEvent){
    event.preventDefault()
    
    await api.delete(`/trade/${id}/delete` )
      .then(() => {
        alert("TRADE DELETADO!!!")
        
        return onShowTradeDeleted(true)
      }).catch((error) => {
        console.error('Error deleting trade:', error)

      })
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0'/>
      <Dialog.Content className='absolute p-10 bg bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>

        <Dialog.Title className='text-3xl leading-tight font-extrabold'>
          Excluir Trade
        </Dialog.Title>
        <p>Are you sure you want to delete this trade?</p>
        <div className='flex-row items-center align-middle mt-5 '>
          <button 
            className='flex-1 mx-5 py-3 px-5 font-bold text-xl items-center text-center border-2 border-r-4 border-green-700 hover:border-green-500' 
            onClick={handleDeleteTrade}
          >
            YES
          </button>

          <Dialog.Close className='flex-1 mx-5 py-3 px-5 font-bold text-xl items-center text-center border-2 border-r-4 border-red-700 hover:border-red-500'>
            NO
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
  
}

