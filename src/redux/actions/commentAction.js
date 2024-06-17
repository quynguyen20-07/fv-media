import { GLOBALTYPES, UpdateData, DeleteData } from "./globalTypes";
import { POST_TYPE } from "./postAction";
import { postDataAPI, patchDataAPI, deleteDataAPI } from "../../Utils/fetchData";
import { createNotify, removeNotify } from "./notifyAction";

export const createComment = (post, newComment, auth, socket) => async (dispatch) => {
  const newPost = { ...post, comments: [...post.comments, newComment] }

  dispatch({
    type: POST_TYPE.UPDATE_POST,
    payload: newPost
  })
  try {
    const data = { ...newComment, postId: post._id, postUserId: post.user._id }

    const res = await postDataAPI('comment', data, auth.token)
    const newData = { ...res.data.newComment, user: auth.user }
    const newPost = { ...post, comments: [...post.comments, newData] }


    dispatch({
      type: POST_TYPE.UPDATE_POST,
      payload: newPost
    })

    //Socket
    socket.emit('commentRealTime', newPost)

    // Notify
    const msg = {
      id: res.data.newComment._id,
      text: newComment.reply ? 'mentioned you in a comment' : 'had comment on  your post',
      recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
      url: `/post/${post._id}`,
      content: post.content,
      image: post.images[0].url
    }

    dispatch(createNotify({ msg, auth, socket }))

  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT, payload: { error: error.response.data.message }
    })
  }
}

export const updateComment = ({ comment, post, content, auth }) => async (dispatch) => {

  const newComments = UpdateData(post.comments, comment._id, { ...comment, content })

  const newPost = { ...post, comments: newComments }
  dispatch({
    type: POST_TYPE.UPDATE_POST, payload: newPost
  })

  try {
    patchDataAPI(`comment/${comment._id}`, { content }, auth.token)

  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT, payload: { error: error.response.data.message }
    })
  }

}

export const likeComment = ({ comment, post, auth }) => async (dispatch) => {
  const newComment = { ...comment, likes: [...comment.likes, auth.user] }

  const newComments = UpdateData(post.comments, comment._id, newComment)

  const newPost = { ...post, comments: newComments }

  dispatch({
    type: POST_TYPE.UPDATE_POST, payload: newPost
  })

  try {
    await patchDataAPI(`comment/${comment._id}/like`, null, auth.token)
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT, payload: { error: error.response.data.message }
    })
  }
}

export const dislikeComment = ({ comment, post, auth }) => async (dispatch) => {
  const newComment = { ...comment, likes: DeleteData(comment.likes, auth.user._id) }

  const newComments = UpdateData(post.comments, comment._id, newComment)

  const newPost = { ...post, comments: newComments }

  dispatch({
    type: POST_TYPE.UPDATE_POST, payload: newPost
  })


  try {
    await patchDataAPI(`comment/${comment._id}/dislike`, null, auth.token)

  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT, payload: { error: error.response.data.message }
    })
  }
}

export const deleteComment = ({ comment, post, auth, socket }) => async (dispatch) => {

  const deleteArray = [...post.comments.filter(cmt => cmt.reply === comment._id), comment]

  const newPost = {
    ...post,
    comments: post.comments.filter(cmt => !deleteArray.find(deleteCmt => cmt._id === deleteCmt._id))
  }

  dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost })

  socket.emit('deleteComment', newPost)

  try {
    deleteArray.forEach(item => {

      deleteDataAPI(`comment/${item._id}`, auth.token)

      const msg = {
        id: item._id,
        text: comment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
        recipients: comment.reply ? [comment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
      }

      dispatch(removeNotify({ msg, auth, socket }))


    })
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT, payload: { error: error.response.data.message }
    })
  }
}
