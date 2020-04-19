import { combineReducers } from 'redux';
import users from './users';
import currentUser from './currentUser';
import userCreate from "./create";
import userDelete from "./delete"
import userUpdate from "./update"

const reducers = combineReducers({
  users,
  currentUser,
  userCreate,
  userDelete,
  userUpdate
});

export default reducers;
