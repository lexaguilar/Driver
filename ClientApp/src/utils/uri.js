import { createProxy, createProxyBase } from "./proxy";

const uri = {    
    users: createProxyBase('users'),
    areas: createProxyBase('areas'),
    clients: createProxyBase('clients'),
    registers: createProxyBase('registers'),
    receipts: createProxyBase('receipts'),
    instructors: createProxyBase('instructors'),
    roles:createProxyBase('roles'),
};

uri.account = 'account/auth';
uri.changepassword = 'account/changepassword';
uri.resetPassword = 'account/resetpassword';

uri.resources= roleId => `roles/${roleId}/resources`;

export const routeReset = props => props.history.push({ pathname : '/driver/navig' }, { returnUrl: props.location.pathname }); 

export default uri;