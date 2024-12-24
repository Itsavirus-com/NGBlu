export const safeRender = (obj: any, path: string, fallback = '-'): string => {
  try {
    return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? fallback
  } catch {
    return fallback
  }
}
