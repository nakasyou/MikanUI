import { argbFromHex, themeFromSourceColor, applyTheme, hexFromArgb, type Theme } from '@material/material-color-utilities'
import { camelToKabab } from '../utils/string-caces'

type Colors = 'primary' | 'onPrimary' | 'primaryContainer' | 'onPrimaryContainer' | 'secondary' | 'onSecondary' | 'secondaryContainer' | 'onSecondaryContainer' | 'tertiary' | 'onTertiary' | 'tertiaryContainer' | 'onTertiaryContainer' | 'error' | 'onError' | 'errorContainer' | 'onErrorContainer' | 'background' | 'onBackground' | 'surface' | 'onSurface' | 'surfaceVariant' | 'onSurfaceVariant' | 'outline' | 'outlineVariant' | 'shadow' | 'scrim' | 'inverseSurface' | 'inverseOnSurface' | 'inversePrimary'

/**
 * MikanUIのカラーシステムをCSSに適応するCSSルールを計算する
 * @param seedColor シードの色
 * @returns CSSルール
 */
export const calcColorCssRules = (seedColor: string) => {
  const theme = themeFromSourceColor(argbFromHex(seedColor))
  '@media (prefers-color-scheme: dark)'
  
  const schemeKeys = Object.keys((theme.schemes.dark as unknown as {
    props: Record<string, number>
  }).props) as Colors[]
  
  const lightRules: [string, string][] = []
  const darkRules: [string, string][] = []
  schemeKeys.forEach(schemeKey => {
    const cssVarName = '--mikanui-' + camelToKabab(schemeKey)
    darkRules.push([cssVarName, hexFromArgb(theme.schemes.dark[schemeKey])])
    lightRules.push([cssVarName, hexFromArgb(theme.schemes.light[schemeKey])])
  })
  const css = `
    @media (prefers-color-scheme: dark) {
      :root {
        ${darkRules.map(([varName, color]) => `${varName}: ${color}`).join(';')}
      }
    }
    @media (prefers-color-scheme: light) {
      :root {
        ${lightRules.join(';')}
      }
    }
  `.replaceAll(/[\n ]/g, '')
  return {
    css,
    rules: {
      light: Object.fromEntries(lightRules),
      dark: Object.fromEntries(darkRules)
    }
  }
}
/**
 * 
 * @param seedColor シードカラー
 * @returns 
 */
export const getColorCss = (seedColor: string): string => {
  return calcColorCssRules(seedColor).css
}
/**
 * 上書き
 * @param seedColor シードカラー
 * @returns 
 */
export const applyColorCss = (seedColor: string, target: string | HTMLElement | null, isDarkMode?: boolean) => {
  if (isDarkMode === void(0)) {
    isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  if (typeof target === 'string') {
    target = document.querySelector<HTMLElement>(target)
  }
  if (!target) {
    return
  }
  
  const calcedColorCssRules = calcColorCssRules(seedColor).rules
  const rule = isDarkMode ? calcedColorCssRules.dark : calcedColorCssRules.light
  for (const [cssVarName, value] of Object.entries(rule)) {
    target.style.setProperty(cssVarName, value)
  }
  return 
}
