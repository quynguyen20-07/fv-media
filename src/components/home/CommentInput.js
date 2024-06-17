import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComment } from '../../redux/actions/commentAction'
import Icons from '../Icons';


const CommentInput = ({ children, post, isReply, setIsReply }) => {
  const [content, setContent] = useState('');
  const { auth, socket, theme } = useSelector(state => state);
  const dispatch = useDispatch();



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setIsReply) return setIsReply(false)
      return;
    }

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createAt: new Date().toISOString(),
      reply: isReply && isReply.commentId,
      tag: isReply && isReply.user
    }

    dispatch(createComment(post, newComment, auth, socket))

    if (setIsReply) return setIsReply(false);
    setContent('');
  }

  return (
    <form className='card-footer comment-input' onSubmit={handleSubmit} >
      {children}
      <input
        type='text'
        placeholder='Add new commnets...'
        value={content} onChange={e => setContent(e.target.value)}
      />
      <Icons setContent={setContent} content={content} theme={theme}/>
      <button type="submit" className='cmtPostBtn' >
        Post
      </button>
    </form>
  )
}

export default CommentInput