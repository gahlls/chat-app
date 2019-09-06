import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormRegister from './components/FormRegister';
import Welcome from './components/Welcome';
import Main from './components/Main';
import AddContact from './components/AddContact';
import Chat from './components/Chat';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#115E54' }} titleStyle={{ color: '#fff' }}>
        <Scene key='formLogin' component={FormLogin} title="Login" hideNavBar={true} />
        <Scene key='formRegister' component={FormRegister} title="Register"  hideNavBar={false} />
        <Scene key='welcome' component={Welcome} title="Welcome" hideNavBar={true} />
        <Scene key='main' component={Main} title="Main" hideNavBar={true} />
        <Scene key='addContact' component={AddContact} title="Add contact" hideNavBar={false} />
        <Scene key='chat' component={Chat} title="Chat" hideNavBar={false} />    
    </Router>
);
