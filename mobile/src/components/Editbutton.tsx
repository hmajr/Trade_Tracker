import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type TradeInfo = {
  id: string,
  ticker: string,
  result: number,
  entry_date: Date,
  exit_date: Date
}

export function EditButton( trade : TradeInfo){
  const { navigate } = useNavigation()

  return(
    <TouchableOpacity 
      className="flex flex-row items-center px-5 py-2 mt-4 mr-3 rounded bg-yellow-600"
      onPress={() => navigate ('editTrade', {trade} )}
    >
      <Feather name="edit" size={16} color="white" className="mr-2" />
      <Text className="text-white font-bold">EDITAR</Text>
    </TouchableOpacity>
  )
}