import React from 'react'
import styled from 'styled-components'
import { CharacterShowContainer, Name, Species } from '../styles'
import { Thumbnail } from '../styles'

export function ShowCharacters(props) {
  const { image, name, species, id, onClick } = props

  return (
    <CharacterShowContainer
      onClick={() => onClick({ id, species, name, image })}
    >
      <Thumbnail>
        <img src={image} />
      </Thumbnail>
      <Name>{name}</Name>
      <Species>{species}</Species>
    </CharacterShowContainer>
  )
}
