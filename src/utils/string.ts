/**
 * String utility functions
 */

import { WHITESPACE_REGEX } from '@/constants/regex'

/**
 * Normalize a string by converting to lowercase and removing all whitespace
 * Useful for string comparisons where spacing doesn't matter
 *
 * @param str The string to normalize
 * @returns Normalized string
 */
export const normalizeString = (str?: string | null): string => {
  if (!str) return ''
  return str.toLowerCase().replace(WHITESPACE_REGEX, '')
}
