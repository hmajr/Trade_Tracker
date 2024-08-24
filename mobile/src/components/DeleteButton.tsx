import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { api } from "../lib/axios";

interface TradeProps {
  tradeId: string
  onShowTradeDeleted: (isDeleted: boolean) => void
}

export function DeleteButton( props : TradeProps){
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  async function handleConfirmDelete() {
    
    await api.delete(`/trade/${props.tradeId}/delete` )
      .then(() => {
        alert("TRADE DELETADO!!!")
        
        return props.onShowTradeDeleted(true)
      }).catch((error) => {
        console.error('Erro ao deletar o trade:', error)

      })
  }

  return(
    <TouchableOpacity 
      className="flex flex-row items-center px-5 py-2 mt-4 ml-3 rounded bg-red-800"
      onPress={() => {
        handleConfirmDelete()
      }}
    >
      <Feather name="trash" size={16} color="white" className="mr-2" /> 

      <Text className="text-white font-bold">DELETAR</Text>
    </TouchableOpacity>
  )
}