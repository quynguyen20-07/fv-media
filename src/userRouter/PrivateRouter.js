import { Route, Redirect } from 'react-router-dom'
import { getStorageItem, STORAGE_KEY } from '../helper/localStorage'

const PrivateRouter = (props) => {
  const isAuth = getStorageItem(STORAGE_KEY.ACCESS_TOKEN)
  return isAuth ? <Route {...props} /> : <Redirect to="/" />
}

export default PrivateRouter
