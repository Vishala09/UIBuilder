import setReducer from './setReducer';
import dropReducer from './dropReducer';
import storageReducer from './storageReducer';
import currentIdReducer from './currentIdReducer';
import { combineReducers } from 'redux';
const allReducers = combineReducers({
    setReducer,
    dropReducer,
    storageReducer,
    currentIdReducer
})

export default allReducers;