import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

interface DateTimeProps {
  onDateTimeChange: (newDateTime: Date) => void;
}

export function DateTime({ onDateTimeChange }: DateTimeProps) {
  const [dateTime, setDateTime] = useState(new Date());

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDateTime(selectedDate); 
      onDateTimeChange(selectedDate); 
    } 
  };

  const showMode = (currentMode: string): void => {
    DateTimePickerAndroid.open({
      mode: currentMode,
      value: dateTime,
      onChange,
      is24Hour: true,
    });
  };

  const showDatePicker = () => {
    showMode('datetime');
  };

  const showTimePicker = () => {
    showMode('time');
  };

  return (
    <View className="w-full">
      <View className="flex-row justify-evenly">
        <TouchableOpacity 
          className="flex-col my-2 mr-1 rounded-md border-2 bg-zinc-700 border-zinc-800 "
          onPress={showDatePicker}
        >
          <Text className="font-semibold text-center align-middle text-base text-white ml-2">
              Escolha Data
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-col my-2 ml-1 rounded-md border-2 bg-zinc-700 border-zinc-800 "
          onPress={showTimePicker}
        >
          <Text className="font-semibold text-center align-middle text-base text-white ml-2">
              Escolha Hora
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="font-semibold text-sm text-white"> 
        Escolheu: {dateTime ? dayjs(dateTime).format('ddd, DD/MM/YYYY HH:mm') : 'Nenhuma data/hora selecionada'}
      </Text>
    </View>
  )
}