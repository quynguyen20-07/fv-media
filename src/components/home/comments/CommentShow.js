import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CommentCard from './CommentCard'


const CommentShow = ({ comment, post, replyCmt }) => {
  const { theme } = useSelector(state => state)
  const [moreReply, setMoreReply] = useState([])
  const [more, setMore] = useState(1)

  useEffect(() => {
    setMoreReply(replyCmt.slice(replyCmt.length - more))
  }, [replyCmt, more])


  return (
    <div className='comment_show' style={{
      filter: theme ? 'invert(1)' : 'invert(0)',
      color: theme ? '#fff' : '#111'
    }}>

      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className='pl-4'>
          {
            moreReply.map((item, index) => (
              item.reply &&
              <CommentCard
                key={index}
                comment={item}
                post={post}
                commentId={comment._id}
              />
            ))
          }
          {
            replyCmt.length - more > 0
              ? <div style={{ cursor: 'pointer', color: "#B20600" }}
                onClick={() => setMore(more + 10)}
              >
                See more reply comment....
              </div>
              :
              replyCmt.length > 1 &&
              <div style={{ cursor: 'pointer', color: "#B20600" }}
                onClick={() => setMore(1)}>
                Hide comment....
              </div>
          }

        </div>
      </CommentCard>
    </div>
  )
}

export default CommentShow