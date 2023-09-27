import React, { JSX } from 'react'
import { elevatedButton } from '../../../../../tmp_mikanui/css'

export function ElevatedButton (props: JSX.IntrinsicElements['button']) {
  const style = {
    ...elevatedButton,
    ...props.style,
  }
  return <button style={style} {...props}></button>
}
