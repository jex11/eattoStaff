import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAIL } from '../actions/types';

const INITIAL_STATE = { email: '', password: '', user: null, error: '', loading: false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, loading: false, error: action.payload ? action.payload : 'Authentication Failed.' };
        case SIGNUP_USER:
            return { ...state, loading: true, error: '' };
        case SIGNUP_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case SIGNUP_USER_FAIL:
            return { ...state, loading: false, error: action.payload ? action.payload : 'Sign Up Failed.' };
        default: 
            return state;
    }
};