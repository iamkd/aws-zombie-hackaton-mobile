import { combineReducers } from 'redux';
import user from './user';
import chats from './chats';

const rootReducer = combineReducers({
  user,
  chats,
});

export default rootReducer;