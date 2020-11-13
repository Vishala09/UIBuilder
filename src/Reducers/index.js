import setReducer from './setReducer';
import dropReducer from './dropReducer';
import storageReducer from './storageReducer'
import { combineReducers } from 'redux';
const allReducers = combineReducers({
    setReducer,
    dropReducer,
    storageReducer
})

export default allReducers;