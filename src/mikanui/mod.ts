import tailwindPlugin from 'npm:tailwindcss@3.3.3/plugin'

import materialColor from './material-color.ts'
import materialComponents from './material-components.ts'

export interface MikanUIInit {
  /**
   * Material Design 3's Seed color.
   * @remarks
   * It's Color code.
   * For example, `#ff00ff`
   */
  seedColor: string
}
export const mikanUI = (init: MikanUIInit) => {
  return tailwindPlugin(({ addComponents }) => {
    addComponents(materialColor(init))
    addComponents(materialComponents())
  })
}
