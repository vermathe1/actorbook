import React, { useEffect } from 'react'
import { Cards } from '../../molecules/cards'
import { EpisodeContainer } from '../../styles'

import { useEpisodes } from './useEpisodes'

export const Episodes = (props) => {
  const { id, species, name, image } = props.info
  const { episodeInfo } = useEpisodes(id)

  return (
    <EpisodeContainer>
      {episodeInfo &&
        episodeInfo.map((info, index) => {
          return (
            <Cards
              key={index}
              info={info}
              name={name}
              image={image}
              species={species}
            />
          )
        })}
    </EpisodeContainer>
  )
}
