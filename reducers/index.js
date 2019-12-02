import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';

import { loader } from './loader.reducer';
// import { addEditDept,editDeptData } from './dept.reducer';
// import { registration } from './registration.reducer';
// import { users } from './users.reducer';
import { alert } from './alert.reducer';
const rootReducer = combineReducers({
  authentication,
  loader,
  alert
});

export default rootReducer;