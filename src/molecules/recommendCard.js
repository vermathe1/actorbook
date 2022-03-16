import React from 'react'
import { CardContainer, Name, Species } from '../styles'
import { ThumbnailComponent } from '../atoms/thumbnail'

export const RecommendCard = (props) => {
  const { name, image, species, created, id } = props.info
  const { onClick } = props
  return (
    <CardContainer onClick={() => onClick(props.info)}>
      <ThumbnailComponent img={image} />
      <Name>Character Name :{name}</Name>
      <Species>Created:{created}</Species>
      <Species>Species: {species}</Species>
    </CardContainer>
  )
}
