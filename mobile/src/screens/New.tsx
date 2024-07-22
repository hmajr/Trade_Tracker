import { ScrollView, TextInput, Text , View, TouchableOpacity } from "react-native";
import { BackButton } from "../components/BackButton";
import { DateTime } from "../components/DateTime";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors";
import dayjs from "dayjs";


export function New() {
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
          / > 

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu resultado?
        </Text>
        <TextInput 
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-2 focus:border-green-600"
          inputMode="decimal"
          / > 

        <DateTime title="Data Entrada" type="date" />
        <DateTime title="Hora Entrada"  type="time"/>

        <DateTime title="Data Saída" type="date" />
        <DateTime title="Hora Saída" type="time" />
        
        {/* <CheckBox checked title="Conta DEMO?"/> */}

        <TouchableOpacity 
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
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