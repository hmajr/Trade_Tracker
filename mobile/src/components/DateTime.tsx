import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent }  from '@react-native-community/datetimepicker'
import { useState } from "react";

interface Props{
  title?: string,
  type : string,
}

export function DateTime( { title, type } : Props){
  if( type != 'date' && type != 'time'){
    throw new Error('Invalid prop value. Expected "date" or "time".')
  }

  const [ isInputVisible, setInputVisible ] = useState( false )
  const [ date, setDate ] = useState(new Date())

  const onChange = (event, value) => {
    setDate(value);
  };

  return (
    <View>
      <Text className="mt-6 text-white font-semibold text-base">
        {title}
      </Text>
 
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setInputVisible(!isInputVisible)}
      >
        {/* <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
        /> */}
        { isInputVisible && 
          <DateTimePicker 
            mode={type}
            maximumDate={new Date()}
            value={date}
            onChange={onChange}
          />
          
        }
        <Text 
          className="h-10 m-2 p-1 align-middle items-center border bg-zinc-800 rounded-lg text-base text-white"
        >
          {date.toUTCString()}
        </Text>
      </TouchableOpacity>
        
    </View>
  )
}