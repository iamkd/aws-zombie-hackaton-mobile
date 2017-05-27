import { CognitoUserAttribute, CognitoUserPool } from 'react-native-aws-cognito-js';
import React, { Component } from 'react';
import { Button, Container, Content, Form, Input, Item, Spinner, Text } from 'native-base';
import Expo from 'expo';

import { cognito } from '../../config';
import { addError } from '../../actions/utils';
import { connect } from 'react-redux';


class Register extends Component {
  static navigationOptions = {
    title: 'Register',
  };

  constructor() {
    super();
    this.state = {
      phone: '',
      password: '',
      newUser: null,
      isLoading: false,
      confirmCode: '',
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  signup(phone, password) {
    const userPool = new CognitoUserPool(cognito);

    const attributePhone = new CognitoUserAttribute({ Name: 'phone_number', Value: phone });

    return new Promise((resolve, reject) => (
      userPool.signUp(phone, password, [attributePhone], null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result.user);
      })
    ));
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await this.signup(this.state.phone, this.state.password);
      this.setState({
        newUser: newUser
      });
    } catch (err) {
      this.props.addError(err);
    }

    this.setState({ isLoading: false });
  }

  confirm(user, confirmationCode) {
    return new Promise((resolve, reject) => (
      user.confirmRegistration(confirmationCode, true, function (err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    ));
  }

  handleConfirm = async (event) => {
    event.preventDefault();
    try {
      const result = await this.confirm(this.state.newUser, this.state.confirmCode);
      if (result) {
        this.props.navigation.navigate('Login');
      }
    } catch (err) {
      this.props.addError(err);
    }
  }

  render() {
    const { newUser, isLoading } = this.state;
    let content = null;
    if (isLoading) {
      content = <Spinner color='blue'/>;
    } else if (newUser) {
      content = (<Form>
          <Item>
            <Input
              onChangeText={(confirmCode) => this.setState({ confirmCode })}
              value={this.state.confirmCode}
              placeholder="confirmation code"
            />
          </Item>
          <Button
            onPress={this.handleConfirm}
            style={{ marginTop: 15 }}
            block
            success
            disabled={!this.state.confirmCode}
          >
            <Text>Confirm</Text>
          </Button>
        </Form>
      );
    } else {
      content = (<Form>
          <Item>
            <Input
              onChangeText={(phone) => this.setState({ phone })}
              value={this.state.phone}
              placeholder="phone"
            />
          </Item>
          <Item>
            <Input
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              placeholder="password"
            />
          </Item>
          <Button
            onPress={this.handleSubmit}
            style={{ marginTop: 15 }}
            block
            success
            disabled={!(this.state.phone && this.state.password)}
          >
            <Text>Register</Text>
          </Button>
        </Form>
      );
    }
    return (
      <Container style={{
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
      }}
      >
        <Content>
          { content }
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addError: (error) => dispatch(addError(error)),
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(() => ({}), mapDispatchToProps)(Register);