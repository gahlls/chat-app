import React, { Component } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { modifyAddContactEmail, addContact } from '../actions/AppActions';

class AddContact extends Component {

    renderAddContact() {
        if(!this.props.register_result_inclusion) {
            return (
                
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TextInput
                            placeholder='E-mail'
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={(text) => this.props.modifyAddContactEmail(text)}
                            value={this.props.add_contact_email}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Button 
                            title="Add" 
                            color="#115E54" 
                            onPress={() => this.props.addContact(this.props.add_contact_email) } 
                        />
                        <Text style={{ color: '#ff0000', fontSize: 20 }}>
                            {this.props.register_result_txt_error}
                        </Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={{ fontSize: 20 }}>
                        Your registration was successful!
                    </Text>
                </View>
            )
        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                { this.renderAddContact() }
            </View>
        )
    }
}

const mapStateToProps = state => (
    {
        add_contact_email: state.AppReducer.add_contact_email,
        register_result_txt_error: state.AppReducer.register_result_txt_error,
        register_result_inclusion: state.AppReducer.register_result_inclusion
    }
)

export default connect(mapStateToProps, { modifyAddContactEmail, addContact })(AddContact);
