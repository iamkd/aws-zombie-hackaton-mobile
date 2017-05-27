import { ADD_ERROR, CLEAR_ERRORS } from '../constants/utils';
export default function utils(state = { errors: [] }, action) {
  switch (action.type) {
    case ADD_ERROR:
      const newErrors = errors.slice();
      newErrors.push(action.payload);
      return { ...state, errors: newErrors };
    case CLEAR_ERRORS:
      return { ...state, errors: [] };
    default:
      return state;
  };
}