import React from 'react'
import { CardContainer, Name, Species } from '../styles'
import { ThumbnailComponent } from '../atoms/thumbnail'

export const Cards = (props) => {
  console.log(props.info)
  const { episode, created, air_date, name } = props.info
  return (
    <CardContainer>
      <ThumbnailComponent img={props.image} />
      <Name>{name}</Name>
      <Species>{episode}</Species>
      <Species>{air_date}</Species>
      <Species>{created}</Species>
      <Species>{props.species}</Species>
    </CardContainer>
  )
}
