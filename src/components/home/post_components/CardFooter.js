import React, { useState, useEffect } from 'react'
import {
  ChatBubbleOutlineOutlined,
  NearMeOutlined,
  Bookmark,
  TurnedInNot
} from '@material-ui/icons'
import { Link } from 'react-router-dom'
import LikeButton from '../../LikeButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  likeStatus,
  dislikeStatus,
  savePost,
  unSavePost
} from '../../../redux/actions/postAction'
import ShareModal from '../../ShareModal'

const CardFooter = ({ post }) => {
  const [like, setLike] = useState(false)
  const [likeLoad, setLikeLoad] = useState(false)
  const [isShare, setIsShare] = useState(false)

  const [savedPost, setSavedPost] = useState(false)
  const [saveLoad, setSaveLoad] = useState(false)

  const { auth, theme, socket } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setLike(true)
    }
  }, [post.likes, auth.user._id])

  const handleLike = async () => {
    if (likeLoad) return
    setLike(true)

    setLikeLoad(true)
    await dispatch(likeStatus({ post, auth, socket }))
    setLikeLoad(false)
  }
  const handleDisLike = async () => {
    if (likeLoad) return
    setLike(false)

    setLikeLoad(true)
    await dispatch(dislikeStatus({ post, auth, socket }))
    setLikeLoad(false)
  }

  // Saved Post--------------------------------
  useEffect(() => {
    if (auth.user.savedPost.find((id) => id === post._id)) {
      setSavedPost(true)
    } else {
      setSavedPost(false)
    }
  }, [auth.user.savedPost, post._id])

  const handleSavePost = async () => {
    if (saveLoad) return

    setSaveLoad(true)
    await dispatch(savePost({ post, auth }))
    setSaveLoad(false)
  }

  const handleUnSavePost = async () => {
    if (saveLoad) return

    setSaveLoad(true)
    await dispatch(unSavePost({ post, auth }))
    setSaveLoad(false)
  }
  return (
    <div className="card-F">
      <div className="icons-menu">
        <div>
          <i>
            <LikeButton
              like={like}
              handleLike={handleLike}
              handleDisLike={handleDisLike}
            />
          </i>

          <Link to={`/post/${post._id}`} className="text-dark">
            <i>
              <ChatBubbleOutlineOutlined />
            </i>
          </Link>
          <i onClick={() => setIsShare(!isShare)}>
            <NearMeOutlined />
          </i>
        </div>
        {savedPost ? (
          <i style={{ marginLeft: '15px' }} onClick={handleUnSavePost}>
            <Bookmark className="text-info" />
          </i>
        ) : (
          <i style={{ marginLeft: '15px' }} onClick={handleSavePost}>
            <TurnedInNot className="text-dark" />
          </i>
        )}
      </div>
      <div className="d-flex justify-content-between">
        <h6
          style={{ padding: '0 15px', cursor: 'pointer', marginLeft: '16px' }}
        >
          {post.likes.length} Likes
        </h6>
        <h6 style={{ padding: '0 15px', cursor: 'pointer' }}>
          {post.comments.length} Comment
        </h6>
      </div>
      {isShare && (
        <ShareModal
          url={`${process.env.REACT_APP_BASE_URL}/post/${post._id}`}
          theme={theme}
        />
      )}
    </div>
  )
}

export default CardFooter
