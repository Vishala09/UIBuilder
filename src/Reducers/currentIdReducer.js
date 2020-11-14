import { act } from "react-dom/test-utils";

let initialState = {id:'',show:false}
const currentIdReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'GET_CURRENT_ID':
            {
                return state;
            }
        case 'SET_CURRENT_ID':
            {
                let nstate= {...state,id:action.payload};
                return nstate;
            }
        case 'SET_TRUE':
            {
                let nstate= {...state,show:true};
                return nstate;
            }
        case 'SET_FALSE':
                {
                    let nstate= {...state,show:false};
                    return nstate;
                }
        default:
             return state;
    }
}

export default currentIdReducer;