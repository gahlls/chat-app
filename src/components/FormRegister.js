import React, { Component } from 'react';
import { View, TextInput, Button, Image, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { 
    modifyEmail, 
    modifyPassword,
    modifyName, 
    registerUser 
} from '../actions/AuthenticateActions';

class FormRegister extends Component {

    _registerUser() {

        const { name, email, password } = this.props;

        this.props.registerUser({ name, email, password });
    }

    renderBtnRegister() {
        if(this.props.loading_register) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="Register" color="#115E54" onPress={() => this._registerUser()} />
        )
    }

    render() {    
        return (
            <Image style={{ flex: 1, width: null }} source={require('../imgs/bg.png')}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <TextInput
                            value={this.props.name} 
                            placeholder="Name" 
                            placeholderTextColor='#fff' 
                            style={{ fontSize: 20, height: 45 }} 
                            onChangeText={text => this.props.modifyName(text)} 
                        />
                        <TextInput 
                            value={this.props.email} 
                            placeholder="E-mail" 
                            placeholderTextColor='#fff' 
                            style={{ fontSize: 20, height: 45 }} 
                            onChangeText={text => this.props.modifyEmail(text)} 
                        />
                        <TextInput 
                            secureTextEntry 
                            value={this.props.password} 
                            placeholder="Password" 
                            placeholderTextColor='#fff' 
                            style={{ fontSize: 20, height: 45 }} 
                            onChangeText={text => this.props.modifyPassword(text)} 
                        />

                        <Text style={{ color: '#ff0000', fontSize: 18}}>{this.props.errorRegister}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.renderBtnRegister()}
                    </View>
                </View>
            </Image>
        );
    }
}

const mapStateToProps = state => { 
    return (
        {
            name: state.AuthenticateReducer.name,
            email: state.AuthenticateReducer.email,
            password: state.AuthenticateReducer.password,
            errorRegister: state.AuthenticateReducer.errorRegister,
            loading_register: state.AuthenticateReducer.loading_register
        }
    );
}

export default connect(
    mapStateToProps, 
    {
        modifyEmail,
        modifyPassword, 
        modifyName,
        registerUser
    }
)(FormRegister);
