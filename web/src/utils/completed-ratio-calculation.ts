export function CompletedRatioCalculation(amount:number, winner:number) {
  return (amount > 0 ? Math.round(( winner / amount ) * 100 ) : 0)
}