import {GLOBALTYPES} from '../actions/globalTypes'

const initalState = false

const modalReducer =(state = initalState, action)=>{
    switch(action.type){
        case GLOBALTYPES.MODAL:
            return action.payload;
        default:
            return state;
    }
}


export default modalReducer;
