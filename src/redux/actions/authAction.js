import { GLOBAL_TYPES } from './globalTypes'
import { postDataAPI } from '../../Utils/fetchData'
import valid from '../../Utils/valid'
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
  STORAGE_KEY
} from '../../helper/localStorage'

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })
    const res = await postDataAPI('login', data)

    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user
      }
    })

    setStorageItem(STORAGE_KEY.ACCESS_TOKEN, res.data.access_token)
    setStorageItem(STORAGE_KEY.REFRESH_TOKEN, res.data.refresh_token)
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.message
      }
    })
  } catch (error) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        error: error.response.data.message
      }
    })
  }
}

export const refreshToken = () => async (dispatch) => {
  const isAuth = getStorageItem(STORAGE_KEY.ACCESS_TOKEN)
  if (isAuth) {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })
    try {
      const res = await postDataAPI('refresh_token')

      setStorageItem(STORAGE_KEY.ACCESS_TOKEN, res.data.access_token)
      setStorageItem(STORAGE_KEY.REFRESH_TOKEN, res.data.refresh_token)
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user
        }
      })
      dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} })
    } catch (error) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          error: error.response.data.message
        }
      })
    }
  }
}

export const register = (data) => async (dispatch) => {
  const checkValidate = valid(data)
  if (checkValidate.errorLength > 0)
    return dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: checkValidate.errorMsg
    })
  try {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })
    const res = await postDataAPI('register', data)

    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user
      }
    })

    setStorageItem(STORAGE_KEY.ACCESS_TOKEN, res.data.access_token)
    setStorageItem(STORAGE_KEY.REFRESH_TOKEN, res.data.refresh_token)
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (error) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        error: error.response.data.msg
      }
    })
  }
}

export const logout = () => async (dispatch) => {
  try {
    removeStorageItem(STORAGE_KEY.ACCESS_TOKEN)
    removeStorageItem(STORAGE_KEY.REFRESH_TOKEN)
    await postDataAPI('logout')
    window.location.href = '/'
  } catch (error) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        error: error.response.data.msg
      }
    })
  }
}
