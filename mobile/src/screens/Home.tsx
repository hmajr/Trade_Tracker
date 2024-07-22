import { View, Text , ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components/Header";
import { HabitDay , DAY_SIZE} from "../components/HabitDay";
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
      
    </View>
  )
}