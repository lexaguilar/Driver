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
import certificateReducer from './certificate';
import claseReducer from './clases';


export default combineReducers({
    mobileMenu: mobileMenuReducer,
    user: userReducer,
    appInfo: appReducer,
    register: registerReducer,
    calification: calificationReducer,
    cancelRegister: cancelRegisterReducer,
    details: detailsReducer,
    receipt: receiptReducer,
    certificate: certificateReducer,
    clase: claseReducer
});