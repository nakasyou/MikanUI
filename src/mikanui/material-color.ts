import type { MikanUIInit } from './mod.ts'
import { argbFromHex, themeFromSourceColor, applyTheme, hexFromArgb } from 'npm:@material/material-color-utilities'

export default (init: MikanUIInit) => {
  const theme = themeFromSourceColor(argbFromHex(init.seedColor))
  const props = Object.keys(theme.schemes.light.props)
  const classes = props.map(prop => prop.replace(/[A-Z]/g, l => '-' + l.toLowerCase()))
  const classToCss = Object.entries({
    bg: 'background-color',
    text: 'color',
    border: 'border-color',
    decoration: 'text-decoration-color',
    shadow: '--tw-shadow-color',
    outline: 'outline-color',
    stroke: 'stroke',
    fill: 'fill'
  })
  // @ts-ignore
  const lightComponents = Object.assign(...classToCss.map(([className, cssKey]) => Object.fromEntries(classes.map((query, index) => {
    const cssObject: Record<string, string> = {}
    cssObject[cssKey] = hexFromArgb(theme.schemes.light[props[index]])
    return ['.' + className + '-' + query, cssObject]
  }))))
  // @ts-ignore
  const darkComponents = Object.assign(...classToCss.map(([className, cssKey]) => Object.fromEntries(classes.map((query, index) => {
    const cssObject: Record<string, string> = {}
    cssObject[cssKey] = hexFromArgb(theme.schemes.dark[props[index]])
    return ['.' + className + '-' + query, cssObject]
  }))))

  return {
    '@media (prefers-color-scheme: dark)': darkComponents,
    '@media (prefers-color-scheme: light)': lightComponents,
  }
}
