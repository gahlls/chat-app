import { combineReducers } from 'redux';
import AuthenticateReducer from './AuthenticateReducer';
import AppReducer from './AppReducer';
import ListContactReducer from './ListContactReducer';
import ListChatReducer from './ListChatReducer';
import ListChatListReducer from './ListChatListReducer';

export default combineReducers({
    AuthenticateReducer,
    AppReducer,
    ListContactReducer,
    ListChatReducer,
    ListChatListReducer
});