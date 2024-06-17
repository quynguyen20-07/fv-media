import { PROFILE_TYPE } from "../actions/profileAction";
import { UpdateData } from "../actions/globalTypes";

const initialState = {
  loading: false,
  ids: [],
  users: [],
  posts: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPE.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PROFILE_TYPE.GET_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };
    case PROFILE_TYPE.FOLLOW:
      return {
        ...state,
        users: UpdateData(state.users, action.payload._id, action.payload),
      };
    case PROFILE_TYPE.UNFOLLOW:
      return {
        ...state,
        users: UpdateData(state.users, action.payload._id, action.payload),
      };
    case PROFILE_TYPE.GET_ID:
      return {
        ...state,
        ids: [...state.ids, action.payload]
      };
    case PROFILE_TYPE.GET_POSTS:
      return {
        ...state,
        posts: [...state.ids, action.payload]
      };
      case PROFILE_TYPE.UPDATE_POST:
        return {
          ...state,
          posts: UpdateData(state.posts, action.payload._id, action.payload)
        };
    default:
      return state;
  }
};

export default profileReducer;
