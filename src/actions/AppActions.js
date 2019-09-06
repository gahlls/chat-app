import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

import { 
    MODIFY_ADD_CONTACT_EMAIL,
    ADD_CONTACT_ERROR,
    ADD_CONTACT_SUCCESS,
    LIST_CONTACT_USER,
    MODIFY_MESSAGE,
    LIST_CHAT_USER,
    SEND_MESSAGE_SUCCESS,
    LIST_CHATLIST_USER
} from './types';

export const modifyAddContactEmail = text => {
    return {
        type: MODIFY_ADD_CONTACT_EMAIL,
        payload: text
    }
}

export const addContact = email => {
    
    return dispatch => {
        let emailB64 = b64.encode(email);
    
        firebase.database().ref(`/contacts/${emailB64}`)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()) {
                    //contact email we want to add
                    const dataUser = _.first(_.values(snapshot.val()));
                    console.log(dataUser);
                    
                    //authenticated user email
                    const { currentUser } = firebase.auth();
                    let emailUserB64 = b64.encode(currentUser.email);

                    firebase.database().ref(`/user_contacts/${emailUserB64}`)
                        .push({ email, name: dataUser.name })
                        .then(() => addContactSuccess(dispatch))
                        .catch(error => addContactError(error.message, dispatch))

                } else {
                    dispatch(
                        { 
                            type: ADD_CONTACT_ERROR, 
                            payload: 'Informed email does not match a valid user!'
                        }
                    )
                }
            })
    }
}

const addContactError = (error, dispatch) => (
    dispatch (
        {
            type: ADD_CONTACT_ERROR, 
            payload: error
        }
    )
)

const addContactSuccess = dispatch => (
    dispatch (
        {
            type: ADD_CONTACT_SUCCESS,
            payload: true
        }
    )
)

export const enableIncludedContact = () => (
    {
        type: ADD_CONTACT_SUCCESS,
        payload: false
    }
)

export const contactsUserFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUserB64 = b64.encode( currentUser.email );

        firebase.database().ref(`/user_contacts/${emailUserB64}`)
            .on("value", snapshot => {
                dispatch({ type: LIST_CONTACT_USER, payload: snapshot.val() })
            })
    }
}

export const modifyMessage = text => {
    return ({
        type: MODIFY_MESSAGE,
        payload: text
    })
}

export const sendMessage = (message, contactName, contactEmail) => {
    //dados do usuario (email)
    const { currentUser } = firebase.auth();
    const userEmail = currentUser.email;
    
    return dispatch => {

        const userEmailB64 = b64.encode(userEmail)
        const contactEmailB64 = b64.encode(contactEmail)

        firebase.database().ref(`/messages/${userEmailB64}/${contactEmailB64}`)
            .push({ message, type: 's' }) //send
            .then(() => {
                firebase.database().ref(`/messages/${contactEmailB64}/${userEmailB64}`)
                    .push({ message, type: 'r' }) //receipt
                    .then(() => dispatch ({ type: SEND_MESSAGE_SUCCESS }))
            })
            .then(() => { //store the conversation header of the authenticated user
                firebase.database().ref(`/user_chat_list/${userEmailB64}/${contactEmailB64}`)
                    .set({ name: contactName, email: contactEmail })

            })
            .then(() => { // store the contact's conversation header

                firebase.database().ref(`/contacts/${userEmailB64}`)
                    .once("value")
                    .then(snapshot => {

                        const dataUser = _.first(_.values(snapshot.val()))

                        firebase.database().ref(`/user_chat_list/${contactEmailB64}/${userEmailB64}`)
                            .set({ name: dataUser.name, email: userEmail })
                    })
            })
    }

}

export const chatUserFetch = contactEmail => {

    const { currentUser } = firebase.auth();

    let userEmailB64 = b64.encode(currentUser.email)
    let contactEmailB64 = b64.encode(contactEmail)

    return dispatch => {
        firebase.database().ref(`/messages/${userEmailB64}/${contactEmailB64}`)
            .on("value", snapshot => {
                dispatch({ type: LIST_CHAT_USER, payload: snapshot.val() })
            })
    }
}

export const chatListUserFetch = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        let userEmailB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/user_chat_list/${userEmailB64}`)
            .on("value", snapshot => {
                console.log(snapshot.val());
                dispatch({ type: LIST_CHATLIST_USER, payload: snapshot.val() })
            })
    }
}