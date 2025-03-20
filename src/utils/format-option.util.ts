/**
 * @file utils/format-option.util.ts
 * @description Utility functions for formatting options
 */

/**
 * Interface for defining how to extract value and label from an item
 * @interface Option
 * @property {Function} value - Function that extracts the value from an item
 * @property {Function} label - Function that extracts the label from an item
 */
export interface Option {
  value: (item: any) => string | number
  label: (item: any) => string | number
}

/**
 * Formats an item into a standardized option object
 * @param {any} item - The source item to format
 * @param {Option} option - Configuration object defining how to extract value and label
 * @returns {{ value: string, label: string, data: any }} Formatted option object
 * @example
 * const item = { id: 1, name: 'John' };
 * const option = {
 *   value: item => item.id,
 *   label: item => item.name
 * };
 * formatOption(item, option); // { value: "1", label: "1 | John", data: item }
 */
export const formatOption = (item: any, option: Option) => {
  // Check if item is valid and has required properties
  if (!item || typeof item !== 'object' || !('id' in item)) {
    return null
  }

  try {
    return {
      value: String(option.value(item)),
      label: `${item.id} | ${option.label(item)}`,
      data: item,
    }
  } catch (error) {
    return null
  }
}

/**
 * Formats a selected option based on detail data and field value
 * @param {any} detailData - The detailed data object or array
 * @param {string | number} fieldValue - The current field value
 * @param {Option} option - Configuration object defining how to extract value and label
 * @param {any[]} options - Array of available options
 * @returns {Object | null} Formatted option object or null if no match found
 * @example
 * const detailData = { 1: { id: 1, name: 'John' } };
 * const fieldValue = "1";
 * const option = {
 *   value: item => item.id,
 *   label: item => item.name
 * };
 * formatSelectedOption(detailData, fieldValue, option, []);
 */
export const formatSelectedOption = (
  detailData: any,
  fieldValue: string | number,
  option: Option,
  options: any[]
) => {
  // Handle multi-select values
  if (Array.isArray(fieldValue)) {
    return options.filter(opt => fieldValue.includes(opt.value))
  }

  // Handle empty or invalid detailData
  if (!detailData || (Array.isArray(detailData) && detailData.length === 0)) {
    return fieldValue ? options.find(opt => opt.value === String(fieldValue)) : null
  }

  if (typeof detailData !== 'object') {
    return null
  }

  const hasNumericKeys = Object.keys(detailData).some(key => !isNaN(Number(key)))
  if (hasNumericKeys) {
    const dataArray = Object.values(detailData)
    const matchingItem = dataArray.find(item => String(option.value(item)) === String(fieldValue))
    return matchingItem ? formatOption(matchingItem, option) : null
  }

  const formattedOption = formatOption(detailData, option)
  return formattedOption || null
}
