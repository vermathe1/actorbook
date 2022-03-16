import { useEffect, useState } from 'react'
import { getfilterData } from '../../utils'

export const useEpisodes = (id) => {
  const [episodeInfo, setEpisodeInfo] = useState()
  const getEpisodeInfo = (data) => {
    return data.episode.reduce((acc, { data }) => {
      acc.push(data)
      return acc
    }, [])
  }
  const updateEpisodes = async (value) => {
    let res = await getfilterData('id', value)
    let getepisodeInfo = getEpisodeInfo(res)
    setEpisodeInfo(getepisodeInfo)
  }

  useEffect(() => {
    updateEpisodes(id)
  }, [id])
  return {
    episodeInfo,
  }
}
