import {GLOBALTYPES} from '../actions/globalTypes'

const initalState ={}

const alertReducer =(state = initalState, action)=>{
    switch(action.type){
        case GLOBALTYPES.ALERT:
            return action.payload;
        default:
            return state;
    }
}


export default alertReducer;

