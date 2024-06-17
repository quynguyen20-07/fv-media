import {GLOBALTYPES} from '../actions/globalTypes'

const initalState = false

const themeReducer =(state = initalState, action)=>{
    switch(action.type){
        case GLOBALTYPES.THEME:
            return action.payload;
        default:
            return state;
    }
}


export default themeReducer;

