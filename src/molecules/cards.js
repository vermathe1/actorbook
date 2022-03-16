import React from 'react'
import { CardContainer, Name, Species } from '../styles'
import { ThumbnailComponent } from '../atoms/thumbnail'

export const Cards = (props) => {
  const { episode, created, air_date, name } = props.info
  return (
    <CardContainer>
      <ThumbnailComponent img={props.image} />
      <Name>Episode Name :{name}</Name>
      <Species>Episode No:{episode}</Species>
      <Species>Air Date:{air_date}</Species>
      <Species>Created on:{created}</Species>
      <Species>Species: {props.species}</Species>
    </CardContainer>
  )
}
