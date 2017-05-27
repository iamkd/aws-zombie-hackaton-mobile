import React from 'react';
import { StackNavigator } from 'react-navigation';
import ChatList from './ChatList';
import Chat from './Chat';


const stackNavigator = StackNavigator({
  ChatList: { screen: ChatList },
  Chat: { screen: Chat },
});

stackNavigator.navigationOptions = {
  tabBarLabel: 'Chats',
}

export default stackNavigator;