import React from "react";
import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import clsx from "clsx";
import dayjs from "dayjs";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32*2)/5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface Props extends TouchableOpacityProps { 
  amountOfTrades?: number
  amountOfWinnerTrades?: number
  date: Date
}

export function TradeDay ({amountOfTrades = 0, amountOfWinnerTrades = 0, date, ...rest} : Props){
  
  const winnerPercentage = amountOfTrades > 0 ? generateProgressPercentage(amountOfTrades, amountOfWinnerTrades) : 0
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)

  return (
    <TouchableOpacity 
      className={clsx('rounded-lg border-2 m-1', {
        'bg-yellow-400 border-yellow-500' : winnerPercentage == 100,
        'bg-green-500 border-green-400' : winnerPercentage >= 80 && winnerPercentage < 100,
        'bg-green-600 border-green-500' : winnerPercentage >= 60 && winnerPercentage < 80,
        'bg-green-700 border-green-600' : winnerPercentage >= 40 && winnerPercentage < 60,
        'bg-green-800 border-green-700' : winnerPercentage >= 20 && winnerPercentage < 40 ,
        'bg-green-900 border-green-800' : winnerPercentage > 0 && winnerPercentage < 20,
        'bg-zinc-900 border-zinc-800' : winnerPercentage == 0,
        'border-white border-4' : isCurrentDay
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE}}
      activeOpacity={0.7}
      {...rest}
    />
  )
}