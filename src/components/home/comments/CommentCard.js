import React, { useEffect, useState } from 'react';
import Avatar from '../../Avatar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import LikeButton from '../../LikeButton'
import CommentMenu from './CommentMenu';
import { updateComment, likeComment, dislikeComment } from '../../../redux/actions/commentAction'
import CommentInput from '../CommentInput';


const CommentCard = ({ comment, post, commentId, children }) => {

  const { auth, theme } = useSelector(state => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);


  const [like, setLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [loadLike, setLoadLike] = useState(false)


  const [isReply, setIsReply] = useState(false)

  useEffect(() => {
    setContent(comment.content)
    setLike(false)
    setIsReply(false)

    if (comment.likes.find(like => like._id === auth.user._id)) {
      setLike(true)
    }
  }, [comment, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLike(true)

    setLoadLike(true)
    await dispatch(likeComment({ comment, post, auth }))
    setLoadLike(false)
  }

  const handleDisLike = async () => {
    if (loadLike) return;
    setLike(false)

    setLoadLike(true)
    await dispatch(dislikeComment({ comment, post, auth }))
    setLoadLike(false)
  }

  const handleUpdate = () => {

    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }))
      setOnEdit(false)
    } else {
      setOnEdit(true)
    }
  }
  const handleReply = () => {
    if (isReply) return setIsReply(false)
    setIsReply({ ...comment, commentId })
  }

  const styles = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? 'inherit' : 'none',

  }



  return (
    <div className='comment_card mt-3' style={styles}>
      <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className='mx-1'>{comment.user.username}</h6>
      </Link>

      <div className='comment_content' >
        <div className='flex-fill' style={{
          filter: theme ? 'invert(1)' : 'invert(0)',
          color: theme ? '#fff' : '#111'
        }}>
          {
            onEdit
              ? <textarea row='5' value={content}
                onChange={(event) => setContent(event.target.value)} />
              : <div>
                {
                  comment.tag && comment.tag._id !== comment.user._id &&
                  <Link to={`/profile/${comment.tag._id}`}>
                    @{comment.tag.username}:
                  </Link>
                }
                <span>
                  {
                    content.length < 100 ? content :
                      readMore ? content + ' ' : content.slice(0, 100) + '...'
                  }
                </span>
                {
                  content.length > 100 &&
                  <span className='readMore' onClick={() => setReadMore(!readMore)} style={{ color: 'red', cursor: 'pointer' }}>
                    {readMore ? 'Hiden' : 'More'}
                  </span>
                }
              </div>
          }


          <div style={{ cursor: 'pointer' }}>
            <small className='text-muted mr-3'>
              {moment(comment.createAt).fromNow()}
            </small>

            <small className='font-weight-bold mr-3'>
              {
                comment.likes.length
              }
              Likes
            </small>
            {
              onEdit
                ? <>
                  <small className='font-weight-bold mr-3' onClick={handleUpdate}>
                    Update
                  </small>
                  <small className='font-weight-bold mr-3' onClick={() => setOnEdit(false)}>
                    Cancel
                  </small>
                </>
                : <small className='font-weight-bold mr-3'
                  onClick={handleReply}>
                  {isReply ? "cancel" : "reply"}
                </small>
            }

          </div>

        </div>

        <div className='d-flex align-content-center' style={{ cursor: "pointer" }}>
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
          <LikeButton like={like} handleLike={handleLike} handleDisLike={handleDisLike} />
        </div>
      </div>
      {
        isReply &&
        <CommentInput post={post} isReply={isReply} setIsReply={setIsReply}>
          <Link to={`/profile/${isReply.user._id}`} className="mr-1">
            @{isReply.user.username}:
          </Link>
        </CommentInput>
      }
      {children}
    </div>
  )
}

export default CommentCard