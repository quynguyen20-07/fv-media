import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'

import Loading from './Loading'
import Toast from './Toast'

const Notify = () => {
  const { alert } = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <div>
      {alert.loading && <Loading />}
      {alert.error && (
        <Toast
          message={{ title: 'Error', body: alert.error }}
          handleShow={() => dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} })}
          bgColor="bg-danger"
        />
      )}

      {alert.success && (
        <Toast
          message={{ title: 'Success', body: alert.success }}
          handleShow={() => dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} })}
          bgColor="bg-success"
        />
      )}
    </div>
  )
}

export default Notify
