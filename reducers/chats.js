import { RECEIVE_CHATS } from '../constants/chats';

export default function chats(state = { items: [] }, action) {
  switch (action.type) {
    case RECEIVE_CHATS:
      return { ...state, items: action.payload.items };
    default:
      return state;
  };
}
