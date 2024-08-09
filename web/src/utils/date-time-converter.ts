import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export function convertToLocalTime(gmtDateTime : Date) {
  const localTime = dayjs.utc(gmtDateTime).tz()
  return localTime
}
