import { useEffect } from 'react'
import { useState } from 'react'
import config from '../config/url'
import { makeApiCall, cacheApiCall } from './httpClient'

export function useDebounce(value, timeout = 500, callback) {
  const [timer, setTimer] = useState(null)

  const clearTimer = () => {
    if (timer) clearTimeout(timer)
  }

  useEffect(() => {
    clearTimer()

    if (value && callback) {
      const newTimer = setTimeout(callback, timeout)
      setTimer(newTimer)
    }
  }, [value])
}

export const preparaAPIQuery = (method, url, data = {}) => ({
  method,
  url: encodeURI(url),
  data,
})

export const filterbyCategory = (data, type, searchQuery = '') => {
  return new Promise((resolve, reject) => {
    let response = []
    data.results.map((result) => {
      let searchText = searchQuery ? searchQuery.toLowerCase() : ''
      let fieldvalue = result[type].toLowerCase()
      if (fieldvalue.indexOf(searchText) > -1) {
        let { name, image, id, species } = result
        response.push({ name, image, id, species })
      }
    })
    resolve(response)
  })
}

export const getDesiredData = (datakey, value) => {
  const localStorageData = getFromLocalStorage('autosearch')
  let valueFound = false
  for (let i = 0; i < localStorageData.length; i++) {
    if (valueFound) break
    for (let j = 0; j < localStorageData[i].results.length; j++) {
      if (localStorageData[i].results[j][datakey] === value) {
        valueFound = true
        return localStorageData[i].results[j]
      }
      if (valueFound) break
    }
  }
}
export const getfilterData = (dataKey, value) => {
  return new Promise((resolve, reject) => {
    let response = getDesiredData(dataKey, value)
    resolve(response)
  })
}

export const getAllReommendations = (dataKey, value) => {
  const localStorageData = getFromLocalStorage('autosearch')
  let result = []
  for (let i = 0; i < localStorageData.length; i++) {
    for (let j = 0; j < localStorageData[i].results.length; j++) {
      if (localStorageData[i].results[j][dataKey] === value) {
        result.push(localStorageData[i].results[j])
      }
    }
  }
  return result
}

export const getRecommendData = (dataKey, value) => {
  return new Promise((resolve, reject) => {
    let response = getAllReommendations(dataKey, value)
    resolve(response)
  })
}

export const getAllData = async () => {
  const urlForPages = config.baseUrl + config.characters
  const options = preparaAPIQuery('GET', urlForPages)
  try {
    let res = await makeApiCall(options)
    let pages = res.info.pages
    let apiArray = []
    for (let i = 1; i <= pages; i++) {
      let url = `${config.baseUrl}${config.characters}?page=${i}`
      apiArray.push(preparaAPIQuery('GET', url))
    }
    return Promise.all(apiArray.map((api) => makeApiCall(api)))
      .then((res) => {
        return Promise.resolve(res)
      })
      .catch((err) => {
        console.log('err in Promise.all of autosearch', err)
      })
  } catch (err) {
    console.log('error in initial autosearch api for pages', err)
  }
}

const getepisodesofEachActor = (eachactorObject) => {
  return Promise.all(
    eachactorObject.episode.map(async (episodeurl) => {
      episodeurl = String(episodeurl)
      let splitStringtoArray = episodeurl.split('/')
      let episodeId = Number(splitStringtoArray.pop())
      return {
        data: await cacheApiCall.cacheCall(
          {
            method: 'GET',
            url: encodeURI(episodeurl),
          },
          episodeId
        ),
      }
    })
  ).then((resArray) => {
    return Promise.resolve(resArray)
  })
}
const getEpisodes = async (eachpage) => {
  return Promise.all(eachpage.results.map(getepisodesofEachActor))
    .then((data) => {
      eachpage.results.map((page, key) => {
        page.episode = data[key]
      })
      return Promise.resolve(eachpage)
    })
    .catch((err) => console.log(err))
}

export const getEpisodeListBasedonIds = async (params) => {
  return Promise.all(params.map(getEpisodes))
    .then((data) => Promise.resolve(data))
    .catch((err) => console.log('error in getEpisodeListBasedonIds', err))
}

export const saveToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = (key) =>
  JSON.parse(window.localStorage.getItem(key))
