import { 
    MODIFY_ADD_CONTACT_EMAIL,
    ADD_CONTACT_ERROR,
    ADD_CONTACT_SUCCESS,
    MODIFY_MESSAGE,
    SEND_MESSAGE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    add_contact_email: '',
    register_result_txt_error: '',
    register_result_inclusion: false,
    message: ''
};

export default (state = INITIAL_STATE, action) => {
    
    switch(action.type) {
        case MODIFY_ADD_CONTACT_EMAIL:
            return { ...state, add_contact_email: action.payload }
        case ADD_CONTACT_ERROR:
            return { ...state, register_result_txt_error: action.payload }
        case ADD_CONTACT_SUCCESS:
            return { ...state, register_result_inclusion: action.payload, add_contact_email: '' }
        case MODIFY_MESSAGE:
            return { ...state, message: action.payload }
        case SEND_MESSAGE_SUCCESS:
            return { ...state, message: '' }
        default:
            return state;
    }
}