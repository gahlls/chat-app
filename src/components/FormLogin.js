import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableHighlight, Image, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modifyEmail, modifyPassword, authenticateUser } from '../actions/AuthenticateActions';

class FormLogin extends Component {

    _authenticateUser() {
        const { email, password } = this.props;

        this.props.authenticateUser({ email, password });
    }

    renderBtnAccess() {

        if(this.props.loading_login) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="Access" color='#115E54' onPress={() => this._authenticateUser()} />
        )
    }
    
    render() {
        return (
            <Image style={{ flex: 1, width: null }} source={require('../imgs/bg.png')}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, color: '#fff' }}>Chat App</Text>
                    </View>
                    <View style={{ flex: 2}}>
                        <TextInput 
                            value={this.props.email} 
                            style={{ fontSize: 20, height: 45 }} 
                            placeholder='E-mail' placeholderTextColor='#fff' 
                            onChangeText={text => this.props.modifyEmail(text) } 
                        />
                        <TextInput 
                            secureTextEntry 
                            value={this.props.password} 
                            style={{ fontSize: 20, height: 45 }} 
                            placeholder='Password' 
                            placeholderTextColor='#fff' 
                            onChangeText={text => this.props.modifyPassword(text) } 
                        />
                        <Text style={{ color: '#ff0000', fontSize: 18 }}>
                            {this.props.errorLogin}
                        </Text>
                        <TouchableHighlight onPress={() => Actions.formRegister() }>
                            <Text style={{ fontSize: 20, color: '#fff' }}>No account yet? Register</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 2}}>
                        {this.renderBtnAccess()}
                    </View>
                </View>
            </Image>
        );
    }
}

const mapStateToProps = state => (
    {
        email: state.AuthenticateReducer.email,
        password: state.AuthenticateReducer.password,
        errorLogin: state.AuthenticateReducer.errorLogin,
        loading_login: state.AuthenticateReducer.loading_login
    }
)

export default connect(mapStateToProps, { modifyEmail, modifyPassword, authenticateUser })(FormLogin);