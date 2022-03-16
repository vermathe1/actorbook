import React, { useEffect, useState } from 'react'
import { AppContainer } from './styles'
import { SearchBar } from './components/searchbar'
import { getAllData, getEpisodeListBasedonIds } from './utils/index'
import { Loading } from './atoms/loading'

const App = () => {
  const initialStorage = () =>
    JSON.parse(window.localStorage.getItem('autosearch')) || []
  const episodeListBasedonId = () =>
    JSON.parse(window.localStorage.getItem('episodeList')) || []
  const [actorsinLocalStorage, setActorsinLocalStorage] =
    useState(initialStorage)
  const [epsiosdelist, setEpisodeList] = useState(episodeListBasedonId)
  const [loading, setLoading] = useState(true)

  const saveCharactersToLocalStorage = () => {
    getAllData()
      .then(setActorsinLocalStorage)
      .catch((err) => console.log('error in App Component', err))
  }

  const saveEpisodesToLocalStorage = async () => {
    setLoading(true)
    const res = await getEpisodeListBasedonIds(actorsinLocalStorage)
    // setActorsinLocalStorage(res)
    // console.log('inside App.js', res)
  }
  useEffect(() => {
    if (actorsinLocalStorage.length) {
      window.localStorage.setItem(
        'autosearch',
        JSON.stringify(actorsinLocalStorage)
      )
      setLoading(false)
      // saveEpisodesToLocalStorage()
    } else {
      saveCharactersToLocalStorage()
    }
  }, [actorsinLocalStorage])

  return (
    <>
      {loading && <Loading loading={true} size={20} color="#000" />}
      <AppContainer>{!loading && <SearchBar />}</AppContainer>
    </>
  )
}

export default App
