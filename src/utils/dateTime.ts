/**
 * Combine date and time into a single string
 * @param date - The date string in the format 'yyyy-MM-dd'
 * @param time - The time string in the format 'HH:mm:ss'
 * @returns The combined date and time string in the format 'yyyy-MM-dd HH:mm:ss'
 */

import { parse } from 'date-fns'

export function combineDateTime(date: string, time: string) {
  if (!date || !time) return null

  // Extract just the time part from the time string
  const timeOnly = time.split(' ')[1]

  // Combine date with time
  const dateOnly = date.split(' ')[0]
  const combinedDateTimeString = `${dateOnly} ${timeOnly}`

  // Parse the combined string
  const parsedDate = parse(combinedDateTimeString, 'yyyy-MM-dd HH:mm:ss', new Date())

  // Adjust for timezone and convert to ISO string
  const timezoneOffset = parsedDate.getTimezoneOffset() * 60000
  return new Date(parsedDate.getTime() - timezoneOffset).toISOString()
}
