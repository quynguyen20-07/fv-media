import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI } from "../../Utils/fetchData";

export const DISCOVER_TYPES = {
    LOADING: 'LOADING_DISCOVER',
    GET_POST: 'GET_DISCOVER',
    UPDATE_POST: 'UPDATE_DISCOVER'
}
export const getDiscoverPosts = ( token) => async (dispatch) => {
    try {
        dispatch({ type: DISCOVER_TYPES.LOADING, payload: true })

        const res = await getDataAPI('post_discover', token)

        dispatch({ type: DISCOVER_TYPES.GET_POST, payload: res.data })

        dispatch({ type: DISCOVER_TYPES.LOADING, payload: false })

    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.message } })
    }
}

