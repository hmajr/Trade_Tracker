import { View, Text , ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { TradeDay , DAY_SIZE} from "../components/TradeDay";

import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import dayjs from "dayjs";

import { api } from "../lib/axios";
import { AxiosError } from "axios";

const weekDays = ['D','S','T','Q','Q','S','S'];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18*6;
const ammountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

type SummaryProps = Array<{
  id : string
  date : string
  trades : number
  winTrades : number
}>

export function Home(){
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps | null>(null)

  const { navigate } = useNavigation()

  async function fetchData() {
    try{
      setLoading(true)
      
      const response = await api.get('summary')
      console.log(response.data)

      setSummary(response.data)
    } catch (error) {
      Alert.alert('Ops!', 'Não carregou os dados')
      if( error instanceof AxiosError ){
        console.error(error.response?.headers)
        console.error(error.response?.data)
        console.error(error.response?.status)
      }else{
        console.error(error)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if(loading){
    return(
      <Loading />
    )
  }

  return(
    <View className="flex-1 bg-background px-8 pt-16">
      
      <Header />
      
      <View className="flex-row mt-6 mb-2 justify-between">
        {
          weekDays.map((weekDay, i) =>(
            <Text 
              key={`${weekDay}-${i}`}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{width: DAY_SIZE}}
            >
              {weekDay}
            </Text>
          ))
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        {
          summary &&
          (
            <View className="flex-row flex-wrap">
              {
                datesFromYearStart.map(date => {
                  const dayWithTrades = summary.find(day => {
                    return dayjs(date).isSame(day.date, 'day')
                  })
                  
                  return (
                    <TradeDay
                      key={date.toISOString()}
                      date={date}
                      amountOfTrades={dayWithTrades?.trades}
                      amountOfWinnerTrades={dayWithTrades?.winTrades}
                      onPress={() => navigate ('trade', { date: date.toISOString() })}
                    />
                  )
                })
              }
    
              {
                ammountOfDaysToFill > 0 && Array
                  .from({ length: ammountOfDaysToFill})
                .map((_, index) =>(
                  <View
                    key={index}
                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  />
                ))
              }
            </View >
          )
        } 
      </ScrollView>
    </View>
  )
}