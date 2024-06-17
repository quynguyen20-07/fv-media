import { GLOBALTYPES } from "./globalTypes";
import { imageUpload } from "../../Utils/imagesUpload";
import { getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI } from "../../Utils/fetchData";
import { createNotify, removeNotify } from "./notifyAction";

export const POST_TYPE = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  SHOW_POSTS: "SHOW_POSTS",
  UPDATE_POST: "UPDATE_POST",
  GET_POSTS: 'GET_POSTS',
  DELETE_POST: "DELETE_POST"
};

export const createPost = ({ content, images, auth, socket }) => async (dispatch) => {
  let media = []
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
    if (images.length > 0) media = await imageUpload(images)

    const res = await postDataAPI('posts', { content, images: media }, auth.token)

    dispatch({
      type: POST_TYPE.CREATE_POST,
      payload: { ...res.data.newPost, user: auth.user }
    })

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })

    // Notify
    const msg = {
      id: res.data.newPost._id,
      text: 'added a new post.',
      recipients: res.data.newPost.user.followers,
      url: `/post/${res.data.newPost._id}`,
      content,
      image: media[0].url
    }

    dispatch(createNotify({ msg, auth, socket }))

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    })
  }
}

export const showPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPE.LOADING_POST, payload: true });

    const res = await getDataAPI("posts", token);

    dispatch({
      type: POST_TYPE.SHOW_POSTS,
      payload: { ...res.data, page: 2 },
    });

    dispatch({ type: POST_TYPE.LOADING_POST, payload: false });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.message },
    });
  }
};

export const updatePost = ({ content, images, auth, status }) =>
  async (dispatch) => {
    let media = [];
    const newUrl = images.filter(img => !img.url)
    const OldUrl = images.filter(img => img.url)

    if (status.content === content
      && newUrl.length === 0
      && OldUrl.length === status.images.length
    ) return;

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (newUrl.length > 0) media = await imageUpload(newUrl);

      const res = await patchDataAPI(
        `post/${status._id}`,
        { content, images: [...OldUrl, ...media] },
        auth.token
      );

      dispatch({ type: POST_TYPE.UPDATE_POST, payload: res.data.newPost });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.message } });

    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.message },
      });
    }
  };

export const likeStatus = ({ post, auth, socket }) => async (dispatch) => {
  const newLike = { ...post, likes: [...post.likes, auth.user] }
  dispatch({ type: POST_TYPE.UPDATE_POST, payload: newLike })

  socket.emit('likeStatus', newLike);


  try {
    await patchDataAPI(`post/${post._id}/like`, null, auth.token)
    
    // Notify
    const msg = {
      id: auth.user._id,
      text: 'like your post.',
      recipients: [post.user._id],
      url: `/post/${post._id}`,
      content: post.content,
      image: post.images[0].url
    }

    dispatch(createNotify({ msg, auth, socket }))

  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.message },
    });
  }
}

export const dislikeStatus = ({ post, auth, socket }) => async (dispatch) => {
  const newDislike = { ...post, likes: post.likes.filter(like => like._id !== auth.user._id) }
  dispatch({ type: POST_TYPE.UPDATE_POST, payload: newDislike })

  socket.emit('disLikeStatus', newDislike)

  try {
    await patchDataAPI(`post/${post._id}/dislike`, null, auth.token);

    const msg = {
      id: auth.user._id,
      text: 'like your post.',
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    }

    dispatch(removeNotify({ msg, auth, socket }))

  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.message },
    });
  }
}

export const getPosts = ({ postDetail, id, auth }) => async (dispatch) => {
  if (postDetail.every(post => post._id !== id)) {
    try {
      const res = await getDataAPI(`post/${id}`, auth.token)
      dispatch({ type: POST_TYPE.GET_POSTS, payload: res.data.post })

    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.message },
      });
    }
  }


}

export const deletePost = ({ post, auth, socket }) => async (dispatch) => {

  dispatch({ type: POST_TYPE.DELETE_POST, payload: post })

  try {
    const res = await deleteDataAPI(`post/${post._id}`, auth.token)

    const msg = {
      id: post._id,
      text: 'added a new post.',
      recipients: res.data.newPost.user.followers,
      url: `/post/${post._id}`,
    }

    dispatch(removeNotify({ msg, auth, socket }))

  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.message },
    });
  }

}

export const savePost = ({ post, auth }) => async (dispatch) => {

  const newUser = { ...auth.user, savedPost: [...(auth && auth.user.savedPost), post._id] }

  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })

  try {
    await patchDataAPI(`savePost/${post._id}`, null, auth.token)
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    })
  }

}

export const unSavePost = ({ post, auth }) => async (dispatch) => {
  const newUser = { ...auth.user, savedPost: auth && auth.user.savedPost.filter(id => id !== post._id) }
  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })

  try {
    await patchDataAPI(`unSavePost/${post._id}`, null, auth.token)
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    })
  }
}