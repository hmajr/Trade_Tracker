export declare global{
  namespace ReactNavigation {
    interface RootParamList{
      home: undefined
      new: undefined
      trade: {
        date: string
      }
      editTrade: {
        trade: TradeInfo
        onEditComplete: onEdition
      }
    }
  }
}