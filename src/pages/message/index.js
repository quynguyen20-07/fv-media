import React from 'react'
import LeftSide from '../../components/message/LeftSide'

const Message = () => {
  return (
    <div className="message d-flex p-2">
      <div className="col-md-4 left-card border-right px-0">
        <LeftSide />
      </div>

      <div className="col-md-8 px-0 right_mess">
        <div className="d-flex justify-content-center 
                align-items-center flex-column h-100">
          <i className="fa fa-message text-primary" style={{ fontSize: '5rem' }} />
          <h4>Messenger</h4>
        </div>
      </div>
    </div>
  )
}

export default Message