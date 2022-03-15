import React from 'react'
import { CloseIcon } from '../styles'
import { IoClose } from 'react-icons/io5'
export const CloseIconComponent = ({ onClick }) => {
  return (
    <CloseIcon>
      <IoClose onClick={onClick} />
    </CloseIcon>
  )
}
