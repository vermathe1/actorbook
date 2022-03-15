import React from 'react'
import styled from 'styled-components'
import { CharacterShowContainer } from '../styles'
import { Thumbnail } from '../styles'
const Name = styled.h3`
  font-size: 15px;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
`

const Species = styled.span`
  color: #a1a1a1;
  font-size: 16px;
  display: flex;
  flex: 0.2;
`

export function ShowCharacters(props) {
  const { image, name, species } = props

  return (
    <CharacterShowContainer>
      <Thumbnail>
        <img src={image} />
      </Thumbnail>
      <Name>{name}</Name>
      <Species>{species}</Species>
    </CharacterShowContainer>
  )
}
