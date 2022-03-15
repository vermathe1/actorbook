import React, { useEffect, useState } from 'react'
import { AppContainer } from './styles'
import { SearchBar } from './components/searchbar'
import { getAllData } from './utils/index'
import { Loading } from './atoms/loading'

const App = () => {
  const initialStorage = () =>
    JSON.parse(window.localStorage.getItem('autosearch')) || []
  // const episodeListBasedonId = () =>
  //   JSON.parse(window.localStorage.getItem('episodeList')) || []
  const [actorsinLocalStorage, setActorsinLocalStorage] =
    useState(initialStorage)
  const [loading, setLoading] = useState(true)
  // const [epsiosdelist, setEpisodeList] = useState(episodeListBasedonId)

  const saveCharactersToLocalStorage = () => {
    console.log('D')
    getAllData()
      .then(setActorsinLocalStorage)
      .catch((err) => console.log('error in App Component', err))
  }

  const saveEpisodesToLocalStorage = () => {}
  useEffect(() => {
    if (actorsinLocalStorage.length) {
      window.localStorage.setItem(
        'autosearch',
        JSON.stringify(actorsinLocalStorage)
      )
      setLoading(false)
      // saveEpisodesToLocalStorage(localStorageData)
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
