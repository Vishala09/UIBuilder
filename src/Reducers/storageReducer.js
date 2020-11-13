
let initialState;
if(localStorage["elements"])
initialState = JSON.parse(localStorage["elements"]);
else
initialState=[];
const storageReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'SET_IN_STORAGE':
            {
                console.log('setting dropped elems in local storage',state,action.payload);
                let data = action.payload;
                let oldData = localStorage["elements"];
                localStorage.removeItem('elements')
                localStorage["elements"] = JSON.stringify(data);
                alert("Saved successfully")
                return state;
            }
        default:
            {
                return state;
            }
             
    }
}

export default storageReducer;