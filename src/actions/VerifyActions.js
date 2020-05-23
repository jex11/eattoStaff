import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import _ from 'lodash';
import { VERIFY_ORDER, VERIFY_ORDER_SUCCESS, VERIFY_ORDER_FAILED, COMPLETE_ORDER, COMPLETE_ORDER_SUCCESS } from './types';

export const verifyOrder = (orderID) => {   
    return (dispatch) => {
        dispatch({ type: VERIFY_ORDER });      
        firebase.database().ref(`/orders/${orderID}`)
        .once('value', snapshot => {
            //verifyOrderSuccess(dispatch, orderID);  //use ajax call in future convert orderID to order            
            console.log(snapshot.val());
            if (snapshot.val() === null) {
                const obj = { qrCode: orderID, error: 'Order not found.' };
                dispatch({ type: VERIFY_ORDER_FAILED, payload: obj });
            } else {
                const obj = { doneOrder: snapshot.val(), orderID };
                dispatch({ type: VERIFY_ORDER_SUCCESS, payload: obj });
                Actions.verifiedOrder({ qrCode: orderID });   
                //completingOrder(orderID);             
            }            
        });        
    };    
};

export const completeOrder = (orderID) => {
    return (dispatch) => {
        // Actions.pop();
        dispatch({ type: COMPLETE_ORDER });
        firebase.database().ref(`/orders/${orderID}`)
            .once('value', snapshot => {
                const currentOrder = { ...snapshot.val(), orderID };
                completingOrder(currentOrder);
                updateCustomerOrderStatus(currentOrder);
                updateTrucksOrderStatus(currentOrder);
                updateSuppliersOrderStatus(currentOrder);
                Actions.pop();
                dispatch({ type: COMPLETE_ORDER_SUCCESS });
            });
        // completingOrder(orderID);
    };
};

const updateSuppliersOrderStatus = (currentOrder) => {
    const suppliers = _.map(currentOrder.items, 'supplier');
    const uniqueSuppliers = [...new Set(suppliers)];
    console.log('updateSuppliersOrderStatus');
    console.log(uniqueSuppliers);
    for (let supplierID of uniqueSuppliers) {
        firebase.database().ref(`/suppliers/${supplierID}/supplier_order/${currentOrder.orderID}`)
        .update({ status: 'COMPLETED' }); 
    }    
};

const updateTrucksOrderStatus = (currentOrder) => {
    firebase.database().ref(`/trucks/${currentOrder.trucker}/truck_order/${currentOrder.orderID}`)
        .update({ status: 'COMPLETED' }); 
};

const updateCustomerOrderStatus = (currentOrder) => {
    firebase.database().ref(`/customer/${currentOrder.customer}/order/${currentOrder.orderID}`)
        .update({ status: 'COMPLETED' }); 
};

const completingOrder = (currentOrder) => {
    firebase.database().ref(`/orders/${currentOrder.orderID}`)
    .update({ status: 'COMPLETED' });    
};

// const completingOrder = (orderID) => {
//     const oldRef = firebase.database().ref(`/orders/paid/${orderID}`);
//     const newRef = firebase.database().ref(`/orders/complete/${orderID}`);
//     moveFbRecord(oldRef, newRef);
// };

const moveFbRecord = (oldRef, newRef) => {    
    oldRef.once('value', snap => {
         newRef.push(snap.val())
         .then(() => {
            oldRef.remove();
            console.log('Complete Replace record');
         })
         .catch((error) => {
            console.log(error);
         });
    });
};

const verifyOrderSuccess = (dispatch, order) => {
    dispatch({ type: VERIFY_ORDER_SUCCESS, payload: order });
    Actions.verifiedOrder({ orderID: order });
};
