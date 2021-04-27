import { combineReducers } from 'redux';

// reducers
import mobileMenuReducer from './mobile-menu';
import userReducer from './user'
import appReducer from './app';
import registerReducer from './register';
import calificationReducer from './calification';
import cancelRegisterReducer from './cancelRegister';
import detailsReducer from './details';
import receiptReducer from './receipt';


export default combineReducers({
    mobileMenu: mobileMenuReducer,
    user: userReducer,
    appInfo: appReducer,
    register: registerReducer,
    calification: calificationReducer,
    cancelRegister: cancelRegisterReducer,
    details: detailsReducer,
    receipt: receiptReducer,
});