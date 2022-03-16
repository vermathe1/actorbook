import React, { useEffect } from 'react'
import { Cards } from '../../molecules/cards'
import { EpisodeContainer, Heading } from '../../styles'
import { useEpisodes } from './useEpisodes'

export const Episodes = (props) => {
  const { id, species, image } = props.info
  const { episodeInfo } = useEpisodes(id)

  return (
    <>
      <Heading>Episode Lists of the chosen character:</Heading>
      <EpisodeContainer>
        {episodeInfo &&
          episodeInfo.map((info, index) => {
            return (
              <Cards key={index} info={info} image={image} species={species} />
            )
          })}
      </EpisodeContainer>
    </>
  )
}
