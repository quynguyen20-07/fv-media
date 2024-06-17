import React from 'react';
import { MoreVert, DeleteOutline, Edit, } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../../redux/actions/commentAction';

const CommentMenu = ({ post, comment, setOnEdit }) => {

  const { auth, socket, theme } = useSelector(state => state)
  const dispatch = useDispatch()


  const handleDelete = () => {
    if (post.user._id === auth.user._id || comment.user._id)
      dispatch(deleteComment({ auth, post, comment, socket }))
  }

  const MenuItem = () => {
    return (
      <>
        <div className='dropdown-item' onClick={() => setOnEdit(true)}
          style={{
            filter: theme ? 'invert(1)' : 'invert(0)',
            color: theme ? '#fff' : '#111'
          }}>
          <span>
            <Edit />
          </span>
          Edit
        </div>

        <div className='dropdown-item' onClick={handleDelete}>
          <span>
            <DeleteOutline />
          </span>
          Delete
        </div>
      </>
    )
  }

  return (
    <div className='CmtMenu'>
      {
        (post.user._id === auth.user._id || comment.user._id === auth.user._id) &&
        <div className='nav-item dropdown'>
          <span className='' id='moreLink' data-toggle="dropdown">
            <MoreVert />
          </span>

          <div className='dropdown-menu' aria-labelledby='moreLink' >
            {
              post.user._id === auth.user._id
                ? comment.user._id === auth.user._id
                  ? MenuItem()
                  : <div className='dropdown-item' onClick={handleDelete}>
                    <span>
                      <DeleteOutline />
                    </span>
                    Delete
                  </div>
                : comment.user._id === auth.user._id && MenuItem()
            }
          </div>

        </div>

      }
    </div>
  )
}

export default CommentMenu