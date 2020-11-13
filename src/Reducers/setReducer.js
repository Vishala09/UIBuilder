let initialState = ["button","para","input","div","hr","smile","h1"];
const setReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'ELEMENTS':
            {
                let nstate=[...state,action.payload]
                return nstate;
            }
        default:
             return state;
    }
}

export default setReducer;