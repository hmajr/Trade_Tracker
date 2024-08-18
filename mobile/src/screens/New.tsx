import { ScrollView, TextInput, Text , View, TouchableOpacity, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { DateTime } from "../components/DateTime";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors";
import dayjs from "dayjs";
import { useState } from "react";
import { api } from "../lib/axios";


export function New() {
  const [ticker, setTicker] = useState('')
  const [result, setResult] = useState(0.0)
  const [entry_date, setEntryDate] = useState(new Date())
  const [exit_date, setExitDate] = useState(new Date())
  
  async function handleCreateNewTrade() {
    try {
      if( !(ticker.trim()) ||
          !dayjs(exit_date).isValid() || 
          !dayjs(entry_date).isValid() ||
          !dayjs(entry_date).isBefore(exit_date)
        ){
        return (
          console.log("Verifica as info aí carai!!! \n",
            ticker, result, entry_date, exit_date
          )
        )
      }

      await api.post('/trades', {ticker, result, entry_date, exit_date})

      setTicker('')
      setResult(0.0)

      Alert.alert('Novo Trade', 'Trade criado com sucesso!')
    } catch (error) {
      console.log(error)
      Alert.alert('Ops!', 'Deu ruim aí.')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView 
        showsVerticalScrollIndicator = {false} 
        contentContainerStyle={{ paddingBottom: 100}}
      >
        <BackButton />

         <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Trade
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual o ticker?
        </Text>
        <TextInput 
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-2 focus:border-green-600"
          autoCapitalize="characters"
          placeholder="WDO, WIN, BBAS3, PETR4, Trava de Alta, ..."
          placeholderTextColor={colors.zinc[500]}
          onChangeText={setTicker}
          value={ticker}
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
        <DateTime onDateTimeChange={handleEntryDate}/>

        <Text className="mt-6 text-white font-semibold text-base">
          Exit Date / Time
        </Text>
        <DateTime onDateTimeChange={handleExitDate}/>
        
        {/* <CheckBox checked title="Conta DEMO?"/> */}

        <TouchableOpacity 
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          onPress={handleCreateNewTrade}
        >
          <Feather 
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}