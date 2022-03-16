import React, { useEffect, useState } from 'react'
import { SearchBar } from './components/searchbar'
import {
  getAllData,
  getEpisodeListBasedonIds,
  saveToLocalStorage,
} from './utils/index'
import { Loading } from './atoms/loading'
import { Episodes } from './components/episodes'
import { Recommendataion } from './components/recommendation'

const App = () => {
  const initialStorage = () =>
    JSON.parse(window.localStorage.getItem('autosearch')) || []
  const [actorsinLocalStorage, setActorsinLocalStorage] =
    useState(initialStorage)
  const [loading, setLoading] = useState(true)
  const [actorInfo, setactorInfo] = useState()

  const saveCharactersToLocalStorage = async () => {
    getAllData()
      .then(async (data) => {
        const actorsWithEpisodeInfo = await getEpisodeListBasedonIds(data)
        setActorsinLocalStorage(actorsWithEpisodeInfo)
      })
      .catch((err) => console.log('error in App Component', err))
  }
  const onAutoSearchClick = (actorsdetails) => {
    const { id, species, name, image } = { ...actorsdetails }
    setactorInfo({ id, species, name, image })
  }

  useEffect(() => {
    if (actorsinLocalStorage.length) {
      console.log('come here once')
      saveToLocalStorage('autosearch', actorsinLocalStorage)
      setLoading(false)
    } else {
      saveCharactersToLocalStorage()
    }
  }, [actorsinLocalStorage])

  return (
    <>
      {loading && <Loading loading={true} size={20} color="#000" />}
      {!loading && <SearchBar onClick={onAutoSearchClick} />}
      {actorInfo && <Episodes info={actorInfo} />}
      {actorInfo && (
        <Recommendataion info={actorInfo} onClick={onAutoSearchClick} />
      )}
    </>
  )
}

export default App
