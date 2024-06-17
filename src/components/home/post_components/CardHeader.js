import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  CreateOutlined,
  DeleteOutlineOutlined,
  FileCopyOutlined,
  MoreHorizOutlined
} from '@material-ui/icons'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Avatar from '../../Avatar'

import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { deletePost } from '../../../redux/actions/postAction'

const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state)

  const dispatch = useDispatch()
  const history = useHistory()

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEditPost = () => {
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: { ...post, onEdit: true }
    })
  }
  const handleDeletePost = () => {
    dispatch(deletePost({ post, auth, socket }))

    setOpen(false)
    return history.push('/')
  }
  const handleCopyPost = () => {
    navigator.clipboard.writeText(`${process.env.MONGODB_URL}/post/${post._id}`)
  }

  return (
    <div className="card-H">
      <div className="d-flex">
        <Avatar src={post.user.avatar} size="medium-avatar" />
        <div className="name_card ml-2">
          <h6 className="m-0">
            <Link to={`/profile/${post.user._id}`} className="text-dark">
              <h5>{post.user.username}</h5>
            </Link>
          </h6>
          <span className="text-muted ">
            <em>{moment(post.createAt).fromNow()}</em>
          </span>
        </div>
      </div>

      <div className="nav-item dropdown ml-2">
        <span id="moreLink" data-toggle="dropdown">
          <MoreHorizOutlined />
        </span>
        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span>
                  <CreateOutlined /> Edit
                </span>
              </div>
              <div onClick={handleClickOpen} className="dropdown-item">
                <span>
                  <DeleteOutlineOutlined /> Delete
                </span>
              </div>
            </>
          )}
          <div className="dropdown-item" onClick={handleCopyPost}>
            <span>
              <FileCopyOutlined /> Copy link
            </span>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete all confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDeletePost} color="danger" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CardHeader
