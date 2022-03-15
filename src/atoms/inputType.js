import React from 'react'
import { Input } from '../styles'
export const InputType = React.forwardRef(
  ({ placeholder, id, onFocus, value, onChange }, ref) => (
    <Input
      placeholder={placeholder}
      id={id}
      onFocus={onFocus}
      ref={ref}
      onChange={(e) => onChange(e)}
      value={value}
    />
  )
)
