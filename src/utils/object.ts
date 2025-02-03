import { MakeOptionalExcept } from './typescript'

/**
 * Removes `null` and `undefined` values from an object while preserving specified required fields.
 *
 * @template T - The type of the input object.
 * @template K - The keys of `T` that should remain required in the output.
 *
 * @param {T} data - The input object from which `null` and `undefined` values will be removed.
 *
 * @returns {MakeOptionalExcept<T, K>} - A new object with `null` and `undefined` values removed,
 *                                      and the specified keys (`requiredKeys`) preserved as required.
 *
 * @example
 * const inputData = {
 *   name: "Bali",
 *   age: null,
 *   email: undefined,
 *   isActive: true,
 * };
 *
 * const cleanedData = omitNullAndUndefined(inputData);
 * // Result:
 * // {
 * //   name: "Bali",
 * //   isActive: true,
 * // }
 */

export const omitNullAndUndefined = <T extends Record<string, any>, K extends keyof T>(
  data: T
): MakeOptionalExcept<T, K> => {
  return Object.entries(data).reduce<MakeOptionalExcept<T, K>>(
    (cleanedData, [key, value]) => {
      if (value !== null && value !== undefined && value !== 0 && value !== '') {
        // Use `key as keyof MakeOptionalExcept<T, K>` to ensure type safety
        cleanedData[key as keyof MakeOptionalExcept<T, K>] = value
      }
      return cleanedData
    },
    {} as MakeOptionalExcept<T, K>
  )
}
