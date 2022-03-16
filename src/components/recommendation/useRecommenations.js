import { useEffect, useState } from 'react'
import { getRecommendData } from '../../utils'

export const useRecommendations = (species) => {
  const [recommendInfo, setRecommendInfo] = useState()
  const getRecommendationInfo = (data) => {
    return data.reduce((acc, { name, image, species, created, id }) => {
      acc.push({ name, image, species, created, id })
      return acc
    }, [])
  }
  const updateRecommendations = async (value) => {
    let res = await getRecommendData('species', value)
    let getrecommendInfo = getRecommendationInfo(res)
    setRecommendInfo(getrecommendInfo)
  }

  useEffect(() => {
    updateRecommendations(species)
  }, [species])
  return {
    recommendInfo,
  }
}
