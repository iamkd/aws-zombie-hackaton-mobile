import React from 'react';
import { TabNavigator } from 'react-navigation';
import ChatScreen from './chat/ChatScreen';

export default TabNavigator(
  {
    ChatScreen: { screen: ChatScreen },
  },
  {
    tabBarOptions: {
      activeTintColor: '#1e61e8',
    },
  },
);
