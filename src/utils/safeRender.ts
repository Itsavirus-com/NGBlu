export const safeRender = (obj: any, path: string, fallback = '-'): string => {
  try {
    const value = path.split('.').reduce((acc, key) => acc?.[key], obj)
    return value === 0 ? fallback : value ?? fallback
  } catch {
    return fallback
  }
}
