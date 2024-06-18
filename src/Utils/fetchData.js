import axiosInstance from './axios'

export const getDataAPI = async (url) => {
  const res = await axiosInstance.get(`/api/${url}`)
  return res
}

export const postDataAPI = async (url, prams) => {
  const res = await axiosInstance.post(`/api/${url}`, prams)
  return res
}

export const putDataAPI = async (url, prams) => {
  const res = await axiosInstance.put(`/api/${url}`, prams)
  return res
}

export const patchDataAPI = async (url, prams) => {
  const res = await axiosInstance.patch(`/api/${url}`, prams)
  return res
}

export const deleteDataAPI = async (url) => {
  const res = await axiosInstance.delete(`/api/${url}`)
  return res
}
