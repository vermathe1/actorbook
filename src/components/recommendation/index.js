import React from 'react'
import { RecommendCard } from '../../molecules/recommendCard'
import { EpisodeContainer, Heading } from '../../styles'

import { useRecommendations } from './useRecommenations'

export const Recommendataion = (props) => {
  const { species } = props.info
  const { onClick } = props
  const { recommendInfo } = useRecommendations(species)
  return (
    <>
      <Heading>Recommendations Based on Chosen Species:</Heading>
      <EpisodeContainer>
        {recommendInfo &&
          recommendInfo.map((info, index) => {
            return <RecommendCard key={index} info={info} onClick={onClick} />
          })}
      </EpisodeContainer>
    </>
  )
}
