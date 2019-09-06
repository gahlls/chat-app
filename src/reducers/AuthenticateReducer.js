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
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    errorRegister: '',
    errorLogin: '',
    loading_login: false,
    loading_register: false
}

export default (state = INITIAL_STATE, action) => {
    
    switch(action.type) {
        case MODIFY_EMAIL:
            return { ...state, email: action.payload }
        case MODIFY_PASSWORD:
            return { ...state, password: action.payload }
        case MODIFY_NAME:
            return { ...state, name: action.payload }
        case REGISTER_USER_ERROR:
            return { ...state, errorRegister: action.payload, loading_register: false }
        case REGISTER_USER_SUCCESS:
            return { ...state, name: '', password: '', loading_register: false }
        case LOGIN_USER_ERROR:
            return { ...state, errorLogin: action.payload, loading_login: false }
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE }
        case LOGIN_PROGRESS:
            return { ...state, loading_login: true }
        case REGISTER_PROGRESS:
            return { ...state, loading_register: true }
        default:
            return state;
    }    
}
