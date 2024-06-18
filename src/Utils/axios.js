import axios from 'axios'
import { getStorageItem, STORAGE_KEY } from '../helper/localStorage'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getStorageItem(STORAGE_KEY.ACCESS_TOKEN)

    if (accessToken) {
      config.headers.Authorization = accessToken
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    return Promise.reject(error)
  }
)

export default axiosInstance
