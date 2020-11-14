let initialState = ["button","para","input","div","hr","smile","h1"];
const setReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'ELEMENTS':
            {
                let ind=state.findIndex((elem)=>elem===action.payload);
                //state.splice(ind,0,action.payload); //adds elem to array
                //state.splice(ind,action.payload);
                console.log(state,"state")
                state[ind]=action.payload
                let nstate=[...state,action.payload]
                return nstate;
            }
        default:
             return state;
    }
}

export default setReducer;