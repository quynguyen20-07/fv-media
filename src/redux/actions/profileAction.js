import { GLOBALTYPES, DeleteData } from "./globalTypes";
import { getDataAPI, patchDataAPI } from "../../Utils/fetchData";
import { imageUpload } from "../../Utils/imagesUpload";
import { createNotify, removeNotify } from "./notifyAction";

export const PROFILE_TYPE = {
  LOADING: "LOADING",
  GET_USER: "GET_PROFILE_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
  GET_ID: 'GET_PROFILE_ID',
  GET_POSTS: 'GET_PROFILE_POSTS',
  UPDATE_POST: 'UPDATE_PROFILE_POST'
};

export const getProfileUsers = ({ id, auth }) => async (dispatch) => {
  dispatch({ type: PROFILE_TYPE.GET_ID, payload: id })
  try {
    dispatch({ type: PROFILE_TYPE.LOADING, payload: true });
    const res = await getDataAPI(`/user/${id}`, auth.token);
    const res1 = await getDataAPI(`/user_posts/${id}`, auth.token);

    const users = await res;
    const posts = await res1;


    dispatch({
      type: PROFILE_TYPE.GET_USER,
      payload: users.data,
    });
    dispatch({
      type: PROFILE_TYPE.GET_POSTS,
      payload: { ...posts.data, _id: id, page: 2 }
    });

    dispatch({ type: PROFILE_TYPE.LOADING, payload: false });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.message },
    });
  }
};

export const updateProfile = ({ userData, avatar, auth }) =>
  async (dispatch) => {
    if (!userData.fullname)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please enter your full name." },
      });
    if (userData.fullname.length > 25)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Your full name too long." },
      });
    if (userData.status.length > 200)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Your status too long." },
      });

    try {
      let media;
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: true },
      });

      if (avatar) media = await imageUpload([avatar]);

      const res = await patchDataAPI(
        "user",
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.message },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.message },
      });
    }
  };
export const follow = ({ users, user, auth, socket }) => async (dispatch) => {
  let flUser;

  if (users.every(item => item._id !== user._id)) {
    flUser = { ...user, followers: [...user.followers, auth.user] };

  } else {
    users.forEach((item) => {
      if (item._id === user._id) {
        flUser = { ...item, followers: [...item.followers, auth.user] };
      }
    });
  }
  dispatch({
    type: PROFILE_TYPE.FOLLOW,
    payload: flUser,
  });


  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
      ...auth,
      user: { ...auth.user, following: [...auth.user.following, flUser] },
    },
  });


  try {
    const response = await patchDataAPI(`user/${user._id}/follow`, null, auth.token);

    // Socket
    socket.emit('follow', response.data.flUser)

    // Notify
    const msg = {
      id: auth.user._id,
      text: 'has started to follow you.',
      recipients: [flUser._id],
      url: `/profile/${auth.user._id}`,
    }

    dispatch(createNotify({ msg, auth, socket }))

  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.message },
    });

  }

};
export const unfollow = ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let flUser;
    if (users.every((item) => item._id !== user._id)) {
      flUser = {
        ...user,
        followers: DeleteData(user.followers, auth.user._id),
      };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          flUser = {
            ...item,
            followers: DeleteData(item.followers, auth.user._id),
          };
        }
      });
    }

    dispatch({
      type: PROFILE_TYPE.UNFOLLOW,
      payload: flUser,
    });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: DeleteData(auth.user.following, flUser._id),
        },
      },
    });
    try {
      const res = await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token);

      socket.emit('unFollow', res.data.flUser)

      // Notify
      const msg = {
        id: auth.user._id,
        text: 'has started to follow you.',
        recipients: [flUser._id],
        url: `/profile/${auth.user._id}`,
      }

      dispatch(removeNotify({ msg, auth, socket }))
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.message },
      });
    }
  };
