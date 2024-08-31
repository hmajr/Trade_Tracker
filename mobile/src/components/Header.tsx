import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { useNavigation } from '@react-navigation/native'

import Logo from '../assets/logo.svg';

export function Header(){
  const { navigate } = useNavigation()

  return (
    <View className="w-full flex-row items-center justify-between">
      
      {/* <Logo /> */}
      <Image source={require('../assets/logo.png')} />


      <TouchableOpacity 
        activeOpacity={0.6}
        className="flex-row h-11 px-4 border border-green-500 rounded-lg items-center"
        onPress={ () => navigate('new')}
      >
        <Feather 
          name="plus"
          color={colors.green[500]}
          size={20}
        />

        <Text className="text-white ml-3 font-semibold text-base">
          Novo
        </Text>
      </TouchableOpacity>
    </View>
  )
}