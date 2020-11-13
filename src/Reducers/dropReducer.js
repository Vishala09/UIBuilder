
let initialState=[];
const dropReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'ADD_ELEMENT':
            {
                state.push(action.payload);
                console.log('adding to droppped',state);
                return [...state];
            }
        default:
             return state;
    }
}

export default dropReducer;