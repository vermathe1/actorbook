import React from 'react'
import { LoadingWrapper, WarningMessage } from '../styles'
export const Message = (props) => {
  return (
    <LoadingWrapper>
      <WarningMessage>{props.children}</WarningMessage>
    </LoadingWrapper>
  )
}
