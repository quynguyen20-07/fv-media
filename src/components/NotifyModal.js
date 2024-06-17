import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Clear } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import NoNotice from '../images/notice.png';
import Avatar from './Avatar';
import { isReadNotify, NOTIFY_TYPES, deleteAllNotifies } from '../redux/actions/notifyAction'

const NotifyModal = () => {
  const { auth, notify } = useSelector(state => state)
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false);

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }))
  }

  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound })
  }

  const handleDeleteAll = () => {
    const newArr = notify.data.filter(item => item.isRead === false)
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

    if (newArr.length) {
      dispatch(deleteAllNotifies(auth.token))
    }
    setOpen(false);
    return;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div style={{ minWidth: '300px' }} className='p-2'>
      <div className="d-flex justify-content-between align-items-center px-3">
        <h4>Notification</h4>
        {
          notify.sound
            ? <i className="fas fa-bell text-danger"
              style={{ fontSize: '1.2rem', cursor: 'pointer' }}
              onClick={handleSound} />

            : <i className="fas fa-bell-slash text-danger"
              style={{ fontSize: '1.2rem', cursor: 'pointer' }}
              onClick={handleSound} />
        }
      </div>

      <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
        {
          notify.data.length === 0 &&
          <img src={NoNotice} alt="NoNotice" className="w-100" />
        }
        {
          notify.data.map((msg, index) => (
            <div key={index} className="px-2 mb-3 card">
              <Link to={`${msg.url}`} className="d-flex text-dark align-items-center"
                onClick={() => handleIsRead(msg)}>
                <Avatar src={msg.user.avatar} size="medium-avatar" />

                <div className="card-body mx-1 flex-fill">
                  <div>
                    <strong className="mr-1">{msg.user.username}</strong>
                    <span>{msg.text}</span>
                  </div>
                  {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
                </div>

                {
                  msg.image &&
                  <div style={{ width: '30px' }}>
                    {
                      msg.image.match(/video/i)
                        ? <video src={msg.image} width="100%" />
                        : <Avatar src={msg.image} size="small-avatar" />
                    }
                  </div>
                }

              </Link>
              <small className="text-muted d-flex justify-content-between px-2">
                {moment(msg.createdAt).fromNow()}
                {
                  !msg.isRead && <i className="fas fa-circle text-primary" />
                }
              </small>
            </div>
          ))
        }

      </div>
      <Button className="text-danger mt-3 text-right" onClick={handleClickOpen}>
        <Clear /> Clear all
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete all confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete all?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteAll} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default NotifyModal