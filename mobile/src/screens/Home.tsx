import { View, Text , ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components/Header";
import { TradeDay , DAY_SIZE} from "../components/TradeDay";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

const weekDays = ['D','S','T','Q','Q','S','S'];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18*6;
const ammountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

export function Home(){

  const { navigate } = useNavigation()

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
        <View className="flex-row flex-wrap">
          {
            datesFromYearStart.map(date => (
              <TradeDay
                key={date.toISOString()}
                onPress={() => navigate ('trade', { date: date.toISOString() })}
              />
            ))
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
      </ScrollView>
    </View>
  )
}