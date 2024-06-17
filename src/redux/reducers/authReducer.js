import {GLOBALTYPES} from '../actions/globalTypes'

const initalState ={}

const authReducer =(state = initalState, action)=>{
    switch(action.type){
        case GLOBALTYPES.AUTH:
            return action.payload;
        default:
            return state;
    }
}


export default authReducer;

