import React, { Component } from 'react';
import { Button, Container, Content, Form, Input, Item, Text } from 'native-base';
import Expo from 'expo';
import { cognito } from '../../config';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'react-native-aws-cognito-js';
import {
  Config,
  CognitoIdentityCredentials
} from 'aws-sdk/dist/aws-sdk-react-native';

Config.region = 'eu-central-1';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor() {
    super();
    this.state = {
      phone: '+380958528570',
      password: '13371337',
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  login(phone, password) {
    const userPool = new CognitoUserPool(cognito);
    const authenticationData = {
      Username: phone,
      Password: password
    };

    const user = new CognitoUser({ Username: phone, Pool: userPool });
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) => (
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
        onFailure: (err) => reject(err),
      })
    ));
  }

  handleSubmit = async () => {
    try {
      console.log('handle SUMBIT')
      const result = await this.login(this.state.phone, this.state.password);
    } catch (err) {
      console.log('error!');
      console.log(err);
      console.log(err.toString());
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container style={{
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
      }}
      >
        <Content>
          <Form>
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
            <Button onPress={this.handleSubmit} style={{ marginTop: 30 }} block>
              <Text>Log in</Text>
            </Button>
            <Button onPress={() => navigate('Register')} style={{ marginTop: 15 }} block light>
              <Text>Register</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}