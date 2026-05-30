type RGB = [number, number, number]

let cachedColors: Record<string, RGB> = {}
let cachedDark: boolean | null = null
let cacheFrame = -1

const ensureCache = () => {
  const frame = Math.floor(performance.now() / 500)
  if (frame !== cacheFrame) {
    cachedColors = {}
    cachedDark = null
    cacheFrame = frame
  }
}

export const getThemeColor = (varName: string): RGB => {
  ensureCache()
  if (cachedColors[varName]) return cachedColors[varName]
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim()
  const parts = raw.split(' ').map(Number)
  const result: RGB = [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0]
  cachedColors[varName] = result
  return result
}

export const isDarkTheme = (): boolean => {
  ensureCache()
  if (cachedDark !== null) return cachedDark
  cachedDark = document.documentElement.getAttribute('data-theme') === 'dark'
  return cachedDark
}
