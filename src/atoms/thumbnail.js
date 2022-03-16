import React from 'react'
import { Thumbnail } from '../styles'

export const ThumbnailComponent = ({ img }) => (
  <Thumbnail>
    <img src={img} />
  </Thumbnail>
)
