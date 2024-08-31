import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Text } from "react-native"

export function TradesEmpty() {
  const { navigate } = useNavigation()

  return (
    <>
      <Text 
        className="text-zinc-200 text-base"
      >
        Nenhum trade hoje {' '}
        
        <Text 
          className="text-green-400 text-base underline active:text-green-500"
          onPress={() => navigate('new')}
        >
          Registre um novo trade aqui!
        </Text>
      </Text>
    </>
  )
}