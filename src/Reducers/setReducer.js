let initialState = ["button","para","input","div","hr","smile","h1","coffee"];
const setReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'ELEMENTS':
            {
                console.log(state,"state")
                return [...state];
            }
        default:
             return state;
    }
}

export default setReducer;