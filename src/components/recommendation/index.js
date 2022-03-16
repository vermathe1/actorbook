import React from 'react'
import { RecommendCard } from '../../molecules/recommendCard'
import { RecommendContainer, Heading } from '../../styles'

import { useRecommendations } from './useRecommenations'

export const Recommendataion = (props) => {
  const { species } = props.info
  const { onClick } = props
  const { recommendInfo } = useRecommendations(species)
  return (
    <>
      <Heading>Recommendations Based on Chosen Species:</Heading>
      <RecommendContainer>
        {recommendInfo &&
          recommendInfo.map((info, index) => {
            return <RecommendCard key={index} info={info} onClick={onClick} />
          })}
      </RecommendContainer>
    </>
  )
}
