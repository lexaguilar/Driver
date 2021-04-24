import { combineReducers } from 'redux';

// reducers
import mobileMenuReducer from './mobile-menu';
import userReducer from './user'
import appReducer from './app';
import registerReducer from './register';


export default combineReducers({
    mobileMenu: mobileMenuReducer,
    user: userReducer,
    appInfo: appReducer,
    register: registerReducer,
});