import { api } from '../lib/axios';

interface TradeProps {
  id : string,
  onTradeDeleted: () => void
}

export function DeleteTradeForm( { id , onTradeDeleted } : TradeProps) {

  async function handleDelete (){
    try {
      await api.delete(`/trade/${id}/delete` )
      alert("TRADE DELETADO!!!")

      onTradeDeleted()
    } catch (error) {
      console.error('Error deleting trade:', error)
    }
  }

  return (
    <div className='flex-row items-center align-middle mt-5 '>
      <button 
        className='flex-1 mx-5 py-3 px-5 font-bold text-xl items-center text-center border-2 border-r-4 border-green-700 hover:border-green-500' 
        onClick={handleDelete}
      >
        YES
      </button>

      <button 
        className='flex flex-1 mx-5 py-3 px-5 font-bold text-xl items-center text-center border-2 border-r-4 border-red-700 hover:border-red-500'
        onClick={onTradeDeleted}
      >
        NO
      </button>
    </div>
  );
  
}

