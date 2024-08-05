import clsx from "clsx";
import { Check, Prohibit } from "phosphor-react";

interface ConfirmProps{
  enabled : Boolean
}

export function ConfirmButton( {enabled} : ConfirmProps) {
  return(
    <button type="submit" className={ clsx('mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold transition-colors',
      {
        'bg-green-600 hover:bg-green-400' : enabled,
        'bg-zinc-600 hover:bg-zinc-500 pointer-events-none' : !enabled
      }
    )}
  >
    {
      enabled ?  
        <Check size={20} weight="bold" />  
        :
        <Prohibit size={20} weight="bold" />
    }
    
    Confirmar
  </button>
  )
}