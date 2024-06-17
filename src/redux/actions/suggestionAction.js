import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI } from "../../Utils/fetchData";


export const SUGGES_TYPES = {
    LOADING: "SUGGES_LOADING",
    GET_USERS: 'SUGGES_GET_USERS'
}
export const getSuggestions = (token) => async (dispatch) => {

    try {
        dispatch({ type: SUGGES_TYPES.LOADING, payload: true })

        const res = await getDataAPI('suggestionUser', token)
        
        dispatch({ type: SUGGES_TYPES.GET_USERS, payload: res.data })

        dispatch({ type: SUGGES_TYPES.LOADING, payload: false })

    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.message } })

    }
}