import React, { useEffect, useState } from 'react'
import { AppContainer } from './styles'
import { SearchBar } from './components/searchbar'
import {
  getAllData,
  getEpisodeListBasedonIds,
  saveToLocalStorage,
} from './utils/index'
import { Loading } from './atoms/loading'

const App = () => {
  const initialStorage = () =>
    JSON.parse(window.localStorage.getItem('autosearch')) || []
  const [actorsinLocalStorage, setActorsinLocalStorage] =
    useState(initialStorage)
  const [loading, setLoading] = useState(true)

  const saveCharactersToLocalStorage = async () => {
    getAllData()
      .then(async (data) => {
        const actorsWithEpisodeInfo = await getEpisodeListBasedonIds(data)
        setActorsinLocalStorage(actorsWithEpisodeInfo)
      })
      .catch((err) => console.log('error in App Component', err))
  }

  useEffect(() => {
    if (actorsinLocalStorage.length) {
      saveToLocalStorage('autosearch', actorsinLocalStorage)
      setLoading(false)
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
