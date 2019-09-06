import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import { 
    MODIFY_EMAIL,
    MODIFY_PASSWORD,
    MODIFY_NAME,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGIN_PROGRESS,
    REGISTER_PROGRESS
} from './types';

export const modifyEmail = (text) => {
    return {
        type: MODIFY_EMAIL,
        payload: text
    }
}

export const modifyPassword = (text) => {
    return {
        type: MODIFY_PASSWORD,
        payload: text
    }
}

export const modifyName = (text) => {
    return {
        type: MODIFY_NAME,
        payload: text
    }
}

export const registerUser = ({ name, email, password }) => {
    return dispatch => {

        dispatch({ type: REGISTER_PROGRESS });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                let emailB64 = b64.encode(email);
                
                firebase.database().ref('/contacts/'+emailB64)
                    .push({ name })
                    .then(value => registerUserSuccess(dispatch))   
            })
            .catch(error => registerUserError(error, dispatch));
    }
    
}


const registerUserSuccess = (dispatch) => {
    dispatch ({ type: REGISTER_USER_SUCCESS });

    Actions.welcome();
}

const registerUserError = (error, dispatch) => {
    dispatch ({ type: REGISTER_USER_ERROR, payload: error.message });
}

export const authenticateUser = ({ email, password }) => {

    return dispatch => {

        dispatch({ type: LOGIN_PROGRESS });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(value => loginUserSuccess(dispatch))
            .catch(error => loginUserError(error, dispatch));
    }
}

const loginUserSuccess = (dispatch) => {
    dispatch (
        {
            type: LOGIN_USER_SUCCESS
        }
    );

    Actions.main();
}

const loginUserError = (error, dispatch) => {
    dispatch (
        {
            type: LOGIN_USER_ERROR,
            payload: error.message
        }
    );
}