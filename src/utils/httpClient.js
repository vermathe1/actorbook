import axios from 'axios'
const cache = {}
export const makeApiCall = (config) => {
  return new Promise((resolve, reject) => {
    const axiosPromise = axios(config)
    axiosPromise
      .then((resp) => {
        if (resp.status === 200) {
          resolve(resp.data)
        } else {
          reject(resp.status)
        }
      })
      .catch((err) => reject(err))
  })
}

export const cacheApiCall = {
  cacheCall: (config, id) => {
    if (cache[id]) {
      return Promise.resolve(cache[id])
    } else {
      return (cache[id] = makeApiCall(config))
    }
  },
}
