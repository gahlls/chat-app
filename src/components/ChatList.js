import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { chatListUserFetch } from '../actions/AppActions';

class ChatList extends Component {

    componentWillMount() {
        this.props.chatListUserFetch()
        this.createDataSource(this.props.chatList)
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.chatList)
    }

    createDataSource(chatList) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.data = ds.cloneWithRows(chatList)
    }

    renderRow(chat) {
        return (
            <TouchableHighlight onPress={
                () => Actions.chat({ title: chat.name, contactName: chat.name, contactEmail: chat.email })
            }>
                <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#ccc" }}>
                    <Text style={{ fontSize: 25 }}>{chat.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.data}
                renderRow={this.renderRow}
            />
        )
    }
}

mapStateToProps = state => {
    const chatList = _.map(state.ListChatListReducer, (val, uid) => {
        return { ...val, uid };
    });

    console.log(chatList);
    
    return {
        chatList
    }
}

export default connect(mapStateToProps, { chatListUserFetch })(ChatList)