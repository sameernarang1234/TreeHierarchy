import { combineReducers } from 'redux';
import componentReducer from './componentReducer';
// import expandCollapseReducer from './expandCollapseReducer';

const reducers = combineReducers({
  component: componentReducer
})

export default reducers;