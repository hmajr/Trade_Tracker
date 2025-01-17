import React from 'react';
import { StatusBar } from 'react-native';
import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';

import "./global.css"
import './src/lib/dayjs';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';


export default function App() {
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  if(!fontsLoaded){
    return (
      <Loading />
    )
  }

  return (
    <>
      <Routes />
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
    </>
  );
}

// docker + kubernets (containers)
// jakins
// aws
// ci-cd -> git actions (pr)