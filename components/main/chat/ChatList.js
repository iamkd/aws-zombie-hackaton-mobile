import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import dateformat from 'dateformat';

import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Left,
  List,
  ListItem,
  Right,
  Thumbnail
} from 'native-base';
import { getChats } from '../../../actions/chats';

class ChatList extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  componentWillMount() {
    this.props.getChats();
  }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Content>
          <List
            dataArray={this.props.chats}
            renderRow={
              ({ id, icon, name, lastMessage, lastMessageDate }) =>
                <ListItem onPress={() => navigate('Chat', { id })} style={{ marginBottom: 2.5, marginTop: 2.5 }} key={name} avatar>
                  <Left>
                    <Thumbnail source={{ uri: icon }}/>
                  </Left>
                  <Body>
                  <Text>{ name }</Text>
                  <Text note>{ lastMessage }</Text>
                  </Body>
                  <Right>
                    <Text note>{ dateformat(lastMessageDate, 'HH:MM') }</Text>
                  </Right>
                </ListItem>
            }
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ chats: { items } }) => ({ chats: items });

const mapDispatchToProps = (dispatch) => ({
  getChats: () => {
    dispatch(getChats());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);

