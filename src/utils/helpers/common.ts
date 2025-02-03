import dayjs from 'dayjs'

export const ConvertDateString = (dateString: string): string => {
  const formattedDate = dayjs(dateString).format('DD-MM-YYYY')
  return formattedDate
}
export const ConvertTimeString = (dateString: string): string => {
  const formattedTime = dayjs(dateString).format('HH:mm:ss')
  return formattedTime
}
