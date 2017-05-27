import { RECEIVE_USER } from '../constants/user';

export function setUser(user) {
  return {
    type: RECEIVE_USER,
    payload: user,
  }
}