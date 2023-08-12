import tailwindPlugin from 'npm:tailwindcss/plugin'

import materialColor from './material-color.ts'

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
  })
}
