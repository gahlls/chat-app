import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers';

class App extends Component {

    componentWillMount() {

        firebase.initializeApp({
            apiKey: "AIzaSyAPQBP70DkdJoVqMihtU28GuNXVbkLAdHg",
            authDomain: "chat-app-eeffe.firebaseapp.com",
            databaseURL: "https://chat-app-eeffe.firebaseio.com",
            projectId: "chat-app-eeffe",
            storageBucket: "",
            messagingSenderId: "1040729932697",
            appId: "1:1040729932697:web:1465292eb06a7fbe980908"
        });
    }

    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Routes />
            </Provider>
        );
    }
}

export default App;
