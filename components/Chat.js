import React from 'react';
import { View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'Welcome to Chat1',
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  // sending message
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  // change styles of bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#fafafa',
          },
          right: {
            backgroundColor: '#2d7ecf',
          },
        }}
      />
    );
  }

  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    const { bgColor } = this.props.route.params;

    return (
      <View
        style={{
          backgroundColor: bgColor,
          flex: 1,
        }}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}
