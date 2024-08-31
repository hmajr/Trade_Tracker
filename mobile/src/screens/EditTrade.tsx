import React from "react"
import { ScrollView, TextInput, Text , View, TouchableOpacity, Alert } from "react-native"
import { BackButton } from "../components/BackButton"
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"
import dayjs from "dayjs"
import { useState } from "react"
import { api } from "../lib/axios"
import { useNavigation, useRoute } from "@react-navigation/native"
import { FORMAT_STYLE } from "../lib/dayjs"

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


export function EditTrade () {
  const route = useRoute()
  const navigation = useNavigation()

  const { trade, onEditComplete } = route.params as Params & { onEditComplete: (isEdited: boolean) => void }
  
  const [ticker, setTicker] = useState(trade.ticker)
  const [result, setResult] = useState(trade.result)
  const entry_date = trade.entry_date
  const exit_date = trade.exit_date
  
  async function handleEditTrade() {
    if( !ticker.trim() )
    {
      return (alert("TICKER INVALIDO!!!"))
    }
    
    if( ticker != trade.ticker || result != trade.result )
    {
      await api.patch(`trade/${trade.id}/edit`, {
        ticker,
        result
      }).then(() => {
        
        console.log('Trade updated successfully')
        alert('Trade editado!')

        onEditComplete(true)
      }).catch((error) => {
        console.error('Error updating trade:', error)
        onEditComplete(false)
      }).finally(() => {
        navigation.goBack()
      })
    }
  }

  const handleInputChange = (text : string) => {
    // Allow only digits, the minus sign, and a single decimal point
    const validText = text.replace(/[^-\d.]/g, '');
    // Ensure there's at most one minus sign at the beginning
    const cleanedText = validText.replace(/(?!^)-/g, '');
    setResult(Number(cleanedText));
  };

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
          onChangeText={(value)=>{handleInputChange(value)}}
          / > 

        <Text className="mt-6 text-white font-semibold text-base">
          Entry Date / Time
        </Text>
        <Text className="text-white text-lg"> {dayjs(entry_date).format(FORMAT_STYLE)}</Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Exit Date / Time
        </Text>
        <Text className="text-white text-lg">{dayjs(exit_date).format(FORMAT_STYLE)}</Text>
        
        <TouchableOpacity 
          className="w-full h-14 flex-row items-center justify-center bg-yellow-600 rounded-md mt-6"
          onPress={handleEditTrade}
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