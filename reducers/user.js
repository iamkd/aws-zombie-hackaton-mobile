import { RECEIVE_USER, REMOVE_USER } from '../constants/user';

export default function user(state = null, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.payload.user;
    case REMOVE_USER:
      return null;
    default:
      return state;
  }
}
