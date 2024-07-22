import { ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import dayjs from 'dayjs'
import { ProgressBar } from "../components/progressbar";

interface Params {
  date: string
}

export function Habit () {

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

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

        <ProgressBar progress={30} />
      </ScrollView>
    </View>
  )
}