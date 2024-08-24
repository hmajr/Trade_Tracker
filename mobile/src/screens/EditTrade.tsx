import React from "react";
import { ScrollView, TextInput, Text , View, TouchableOpacity, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors";
import dayjs from "dayjs";
import { useState } from "react";
import { api } from "../lib/axios";
import { useRoute } from "@react-navigation/native";
import { FORMAT_STYLE } from "../lib/dayjs";

interface Params {
  trade: TradeInfo
}

type TradeInfo = {
  id: string,
  ticker: string,
  result: number,
  entry_date: Date,
  exit_date: Date
}

interface editTradeProps{
  trade : TradeInfo
  // onShowTradeEdited: (newTicker: string, newResult: number, isEdited: boolean) => void
}

export function EditTrade () {
  const route = useRoute()
  const { trade } = route.params as Params
  
  const [ticker, setTicker] = useState(trade.ticker)
  const [result, setResult] = useState(trade.result)
  const [entry_date, setEntryDate] = useState(trade.entry_date)
  const [exit_date, setExitDate] = useState(trade.exit_date)
  
  async function handleEditTrade() {
    alert("EDITOU TRADE!")
    // if( !ticker.trim() )
    // {
    //   return (alert("TICKER INVALIDO!!!"))
    // }
    
    // if( ticker != trade.ticker ||
    //     result != trade.result
    // )
    // {
    //   try {
    //     await api.patch(`trade/${trade.id}/edit`, {
    //       ticker,
    //       result
    //     })
    //     console.log('Trade updated successfully')
    //     alert('Trade editado!')
        
    //     // props.onShowTradeEdited(ticker, result, true)
    //   } catch (error) {
    //     console.error('Error updating trade:', error)
    //     // props.onShowTradeEdited(ticker, result, false)
    //   }
    // }

  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView 
        showsVerticalScrollIndicator = {false} 
        contentContainerStyle={{ paddingBottom: 100}}
      >
        <BackButton />

         <Text className="mt-6 text-white font-extrabold text-3xl">
          Editar Trade
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual o ticker?
        </Text>
        <TextInput 
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-2 focus:border-green-600"
          autoCapitalize="characters"
          value={ticker}
          onChangeText={setTicker}
          / > 

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu resultado?
        </Text>
        <TextInput 
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-2 focus:border-green-600"
          keyboardType="numeric"
          value={`${result}`}
          onChangeText={(value)=>{setResult(Number(value))}}
          / > 

        <Text className="mt-6 text-white font-semibold text-base">
          Entry Date / Time
        </Text>
        <Text className="text-white text-lg"> {dayjs(entry_date).format(FORMAT_STYLE)}</Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Exit Date / Time
        </Text>
        <Text className="text-white text-lg">{dayjs(exit_date).format(FORMAT_STYLE)}</Text>
        
        {/* <CheckBox checked title="Conta DEMO?"/> */}

        <TouchableOpacity 
          className="w-full h-14 flex-row items-center justify-center bg-yellow-600 rounded-md mt-6"
          onPress={() => {handleEditTrade}}
        >
          <Feather 
            name="edit"
            size={20}
            color={colors.white}
          />

          <Text className="font-semibold text-base text-white ml-2">
            Editar
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}