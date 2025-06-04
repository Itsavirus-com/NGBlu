/**
 * Combine date and time into a single string
 * @param date - The date string in the format 'yyyy-MM-dd'
 * @param time - The time string in the format 'HH:mm:ss'
 * @param seconds - The number of seconds to add to the time
 * @returns The combined date and time string in the format 'yyyy-MM-dd HH:mm:ss'
 */

import { format, parse } from 'date-fns'

export function combineDateTime(date: string, time: string, seconds = 0) {
  if (!date || !time) return null

  // Extract just the time part from the time string
  const timeOnly = time.split(' ')[1]

  // Set the seconds in the time string
  const updatedTime = setSecondsInTime(timeOnly, seconds)

  // Combine date with updated time
  const dateOnly = date.split(' ')[0]
  const combinedDateTimeString = `${dateOnly} ${updatedTime}`

  // Parse the combined string
  const parsedDate = parse(combinedDateTimeString, 'yyyy-MM-dd HH:mm:ss', new Date())

  // Adjust for timezone and convert to ISO string
  const timezoneOffset = parsedDate.getTimezoneOffset() * 60000
  return new Date(parsedDate.getTime() - timezoneOffset).toISOString()
}

/**
 * Get the first day of the current month
 * @returns A Date object representing the first day of the current month
 */
export function getFirstDayOfCurrentMonth() {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), 1)
}

/**
 * Add seconds to the time string
 * @param time - The time string in the format 'HH:mm:ss'
 * @param seconds - The number of seconds to add
 * @returns The time string with the seconds added
 */
export function setSecondsInTime(time: string, seconds: number): string {
  const [hours, minutes] = time.split(':')
  const date = new Date()
  date.setHours(parseInt(hours, 10))
  date.setMinutes(parseInt(minutes, 10))
  date.setSeconds(seconds)
  return format(date, 'HH:mm:ss')
}

/**
 * Parse access token expiration date from backend format UTC to ISO string
 *
 * @param dateString - Date string in format "YYYY-MM-DD HH:mm:ss"
 * @returns ISO string or empty string if invalid
 */
export function parseAccessTokenExpiresAt(dateString: string | null | undefined): string {
  if (!dateString || typeof dateString !== 'string') {
    return ''
  }

  try {
    const expirationDate = new Date(dateString.replace(' ', 'T') + 'Z')

    if (isNaN(expirationDate.getTime())) {
      console.error('Invalid date format for access token expiration:', dateString)
      return ''
    }
    return expirationDate.toISOString()
  } catch (error) {
    console.error('Failed to parse access token expiration date:', dateString, error)
    return ''
  }
}
