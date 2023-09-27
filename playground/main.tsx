import * as mikanUI from '../src'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { ElevatedButton } from '../src/react'

mikanUI.applyColorCss('#fff', ':root')
const App = () => {
  return <>
    <ElevatedButton>aa</ElevatedButton>
  </>
}
createRoot(document.body).render(<App />)
