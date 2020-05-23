import firebase from 'firebase';
import _ from 'lodash';
import moment from 'moment';
import { TRUCK_NAME_CHANGED, TRUCK_LOCATION_CHANGED, TRUCK_PHONE_CHANGED, TRUCK_CREATE, TRUCK_MENU_ITEM_FETCH, TRUCK_MENU_ITEM_FETCH_SUCCESS, TRUCK_MENU_ITEM_FETCH_FAILED, TRUCK_ORDER_FETCH, TRUCK_ORDER_FETCH_SUCCESS, TRUCK_ORDER_FETCH_FAILED } from './types';

export const truckNameChanged = (text) => {
    return {
        type: TRUCK_NAME_CHANGED,
        payload: text
    };
};

export const truckLocationChanged = (text) => {
    return {
        type: TRUCK_LOCATION_CHANGED,
        payload: text
    };
};

export const truckPhoneChanged = (text) => {
    return {
        type: TRUCK_PHONE_CHANGED,
        payload: text
    };
};

export const truckCreate = ({ truckname, trucklocation, truckphone }) => {
    return (dispatch) => {        
        console.log('Truck Create action.');
        firebase.database().ref('/trucks')
            .push({ truckname, trucklocation, truckphone })
            .then(() => {
                console.log('NEW TRUCK CREATED SUCCESSFULLY!');
                dispatch({ type: TRUCK_CREATE });
            })
            .catch((err) => {
                console.log(err);                
            });
    };
};

export const truckMenuFetch = () => {    
    return (dispatch, getState) => { 
        const { user } = getState().auth;
        console.log('testing truckmenuFetch Function');
        console.log(user);  
        dispatch({ type: TRUCK_MENU_ITEM_FETCH });
        firebase.database().ref(`/trucks/${user.uid}/linked_suppliers`)
        .on('value', snapshot => {            
            const mappedSuppliers = snapshot.val();
            firebase.database().ref('/suppliers').on('value', resp => {                
                const suppliers = resp.val();
                const obj = { mappedSuppliers, suppliers };
                console.log('lalaland', obj);
                dispatch({ type: TRUCK_MENU_ITEM_FETCH_SUCCESS, payload: obj });
            });            
            // firebase.database().ref('/suppliers')
            // .on('value', snapshot2 => {
            //     let lstSuppliers = {};
            //     const suppliersList = snapshot2.val();                
            //     const result = Object.keys(suppliersList)
            //         .reduce((o, key) => {
            //             if (key in mappedSuppliers) { 
            //                 o[key] = suppliersList[key];                            
            //             }
            //             return o;
            //         }, {});
            //     console.log('shun shun li li');
            //     console.log(result);
            //     dispatch({ type: TRUCK_MENU_ITEM_FETCH_SUCCESS, payload: snapshot.val() });
            // });            
        });
    };
};

export const truckOrderFetch = (selectedDate = null) => {    
    return (dispatch, getState) => { 
        const { user } = getState().auth;
        console.log('testing truckOrderFetch Function', selectedDate);
        console.log(user);  
        const selected = selectedDate === null ? moment(new Date()).format('YYYYMMDD') : selectedDate;
        dispatch({ type: TRUCK_ORDER_FETCH });
        firebase.database().ref(`/trucks/${user.uid}/truck_order`)
        .orderByChild('pickup_datetime')
        .startAt(selected)
        .endAt(`${selected}\uf8ff`)
        .on('value', snapshot => {  
            console.log('test gg', snapshot.val());
            let truckOrders = snapshot.val();            
            firebase.database().ref('/suppliers').on('value', resp => {                
                const suppliers = resp.val();
                const obj = { truckOrders, suppliers };
                dispatch({ type: TRUCK_ORDER_FETCH_SUCCESS, payload: obj });
            });
        });
    };
};