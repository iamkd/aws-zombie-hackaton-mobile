import { ADD_ERROR } from '../constants/utils';

export function addError(error) {
  console.log(error);
  return {
    type: ADD_ERROR,
    payload: new Error(error),
  };
}