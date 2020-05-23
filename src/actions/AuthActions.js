import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, SIGNUP_USER } from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }, loginType) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        if (loginType === 0) {
            loginInternally({ email, password }, loginType, dispatch);
        }
    };
};

const loginInternally = ({ email, password }, loginType, dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
        const currentUser = user.user;
        firebase.database().ref(`/users/${currentUser.uid}`)
        .on('value', snapshot => {
            if (snapshot.val().role !== 'CUSTOMER') {
                const loggedInUser = { uid: currentUser.uid, email: currentUser.email, user_name: currentUser.displayName, user_role: snapshot.val().role };
                loginUserSuccess(dispatch, loggedInUser);
            } else {
                firebase.auth().signOut();
                loginUserFail(dispatch);
            }        
        });
    })
    .catch((error) => {        
        loginUserFail(dispatch);
    });
};

const loginUserSuccess = (dispatch, resp) => {
    const user = { uid: resp.uid, email: resp.email, user_name: resp.user_name, user_role: resp.user_role };
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    if (user.user_role === 'TRUCKER') {
        Actions.trucker();
    } else {
        Actions.supplier();
    }    
};

const loginUserFail = (dispatch, err) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: err
    });
};

const clearAsyncStorage = async() => {
    AsyncStorage.clear();
};

export const logoutUser = (persistor) => {
    return (dispatch) => {
        console.log('logout user now...');        
        //dispatch({ type: LOGOUT_USER });
        persistor.purge().then(() => {
            console.log('success purged!');
            clearAsyncStorage();
            
            //dispatch({ type: LOGOUT_USER_SUCCESS });            
        });
        Actions.reset('auth');
    };    
};