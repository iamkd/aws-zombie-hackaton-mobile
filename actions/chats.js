import { RECEIVE_CHATS } from '../constants/chats';
export function getChats() {
  return (dispatch) => {
    dispatch({
      type: RECEIVE_CHATS,
      payload: {
        items: [{
          id: 1,
          icon: 'https://placehold.it/50x50',
          name: 'Test Chat',
          lastMessage: 'Bla bla bla bla bla',
          lastMessageDate: Date.now() // unix timestamp
        }, {
          id: 2,
          icon: 'https://placehold.it/50x50',
          name: 'Test Chat 2',
          lastMessage: 'Bla bla bla bla bla',
          lastMessageDate: Date.now() // unix timestamp
        }],
      }
    })
  };
}