import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, Text, View } from 'react-native';

import StartScreen from './components/start/StartScreen';
import MainScreen from './components/main/MainScreen';


class Main extends Component {
  render() {
    if (this.props.user) {
      return <MainScreen />;
    }
    return <StartScreen />;
  }
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Main);
