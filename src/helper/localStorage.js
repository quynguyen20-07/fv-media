export const getStorageItem = (name) => {
  return localStorage.getItem(name)
}

export const setStorageItem = (name, data) => {
  return localStorage.setItem(name, data)
}

export const removeStorageItem = (name) => {
  return localStorage.removeItem(name)
}

export const STORAGE_KEY = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken'
}
