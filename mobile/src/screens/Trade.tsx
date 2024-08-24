import React from "react";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from 'dayjs'
import { ProgressBar } from "../components/progressbar";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import Accordion from "../components/Accordion";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

interface Params {
  date: string
}

interface DayInfoProps {
  winTrades: string[],
  possibleTrades: {
    id: string,
    ticker: string,
    result: number,
    entry_date: Date,
    exit_date: Date
  }[]
}

export function Trade () {
  const [loading, setLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)

  const route = useRoute()
  const { date } = route.params as Params

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

  const tradesProgress = dayInfo?.possibleTrades.length 
    ? generateProgressPercentage(dayInfo.possibleTrades.length, dayInfo.winTrades.length) 
    : 0

  async function fetchTrades() {
    try {
      setLoading(true)

      const response = await api.get('/dayTrades', {
        params : {
          date
        }
      })
      setDayInfo(response.data)
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível carregas as informações dos trades.')
    }finally{
      setLoading(false)
    }

    if (loading){
      return(
        <Loading />
      )
    }
  }
  useEffect(() => {
    fetchTrades()
  }, [])
  
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={tradesProgress} />

        <View className="flex flex-col mt-6 gap-3">
          {
            dayInfo?.possibleTrades && dayInfo?.possibleTrades.map(trade => { 
              return(
               <View key={`${trade.id}`}>
                  <Accordion 
                    key={`${trade.id}-accordion`}
                    title={`${trade.ticker} | ${trade.result >= 0 ? `R$ ${trade.result}` : `-R$ ${trade.result*(-1)}`} `}
                    children={trade}
                  />
               </View>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}