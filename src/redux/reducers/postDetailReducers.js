import { POST_TYPE } from "../actions/postAction";
import { UpdateData } from '../actions/globalTypes'

const postDetailReducers = (state = [], action) => {
    switch (action.type) {
        case POST_TYPE.GET_POSTS:
            return [...state, action.payload]
        case POST_TYPE.UPDATE_POST:
            return UpdateData(state, action.payload._id, action.payload)
        default:
            return state;
    }
}
export default postDetailReducers