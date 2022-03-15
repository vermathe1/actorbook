import axios from 'axios'
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
