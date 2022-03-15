import React from 'react'
import { LoadingWrapper } from '../styles'
import MoonLoader from 'react-spinners/MoonLoader'
export const Loading = ({ loading, size, color }) => {
  return (
    <LoadingWrapper>
      <MoonLoader loading={loading} size={size} color={color} />
    </LoadingWrapper>
  )
}
