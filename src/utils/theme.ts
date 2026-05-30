export const getThemeColor = (varName: string): [number, number, number] => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim()
  const parts = raw.split(' ').map(Number)
  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0]
}

export const isDarkTheme = (): boolean =>
  document.documentElement.getAttribute('data-theme') === 'dark'
