import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, Text, TextInput, Image, TouchableHighlight, ListView } from 'react-native';
import { modifyMessage, sendMessage, chatUserFetch } from '../actions/AppActions'

class Chat extends Component {

    componentWillMount() {
        this.props.chatUserFetch(this.props.contactEmail)
        this.createDataSource( this.props.chat );
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.contactEmail != nextProps.contactEmail) {
            this.props.chatUserFetch(nextProps.contactEmail)
        }
        this.createDataSource(nextProps.chat);
    }

    createDataSource(chat) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(chat);
    }

    _sendMessage() {
        const { message, contactName, contactEmail } = this.props;

        this.props.sendMessage(message, contactName, contactEmail)
    }

    renderRow(text) {

        if(text.type === 's') {
            return (
                <View style={{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40}}>
                    <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#dbf5b4', elevation: 1}}>{text.message}</Text>
                </View>
            )
        }

        return (
            <View style={{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40}}>
                <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#f7f7f7', elevation: 1}}>{text.message}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 50, backgroundColor: '#eee4dc', padding: 10 }}>
                <View style={{ flex: 1, paddingBottom: 20 }}>

                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </View>

                <View style={{ flexDirection: 'row', height: 60}}>
                    <TextInput 
                        value={this.props.message}
                        onChangeText={text => this.props.modifyMessage(text) }
                        style={{ flex: 4, backgroundColor: '#fff', fontSize: 18 }}
                    />

                    <TouchableHighlight onPress={this._sendMessage.bind(this)} underlayColor="#fff">
                        <Image source={require('../imgs/send_message.png')} />
                    </TouchableHighlight>

                </View>
            </View>
        )
    }
}

mapStateToProps = state => {
    
    const chat = _.map(state.ListChatReducer, (val, uid) => {
        return { ...val, uid };
    });

    return ({
        chat,
        message: state.AppReducer.message
    })
}

export default connect(mapStateToProps, { modifyMessage, sendMessage, chatUserFetch })(Chat)