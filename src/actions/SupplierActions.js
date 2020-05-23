import firebase from 'firebase';
import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import _ from 'lodash';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { MENU_ITEM_ADD, MENU_ITEM_ADDED_SUCCESS, MENU_ITEM_ADDED_FAILED, MENU_ITEM_FETCH, MENU_ITEM_FETCH_SUCCESS, ORDER_ITEM_FETCH, ORDER_ITEM_FETCH_SUCCESS, MENU_ITEM_NAME_CHANGED, MENU_ITEM_DESC_CHANGED, MENU_ITEM_PRICE_CHANGED } from './types';

export const menuItemNameChanged = (text) => {
    return {
        type: MENU_ITEM_NAME_CHANGED,
        payload: text
    };
};

export const menuItemDescChanged = (text) => {
    return {
        type: MENU_ITEM_DESC_CHANGED,
        payload: text
    };
};

export const menuItemPriceChanged = (text) => {
    return {
        type: MENU_ITEM_PRICE_CHANGED,
        payload: text
    };
};

export const menuFetch = () => {    
    return (dispatch, getState) => { 
        const { user } = getState().auth;
        console.log('testing menuFetch Function');
        console.log(user);  
        dispatch({ type: MENU_ITEM_FETCH });
        firebase.database().ref(`/suppliers/${user.uid}/supplier_items`)
        .on('value', snapshot => {
            console.log('snapshot');
            console.log(snapshot.val());
            dispatch({ type: MENU_ITEM_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const orderFetch = (selectedDate = null) => {  
    console.log('orderFetch', selectedDate);
    return (dispatch, getState) => { 
        const { user } = getState().auth;
        console.log('testing orderFetch Function');
        console.log(user);  
        dispatch({ type: ORDER_ITEM_FETCH });
        const inputDate = selectedDate === null ? moment(new Date()).format('YYYYMMDD') : selectedDate;
        firebase.database().ref(`/suppliers/${user.uid}/supplier_order`)
        .orderByChild('pickup_datetime')
        .startAt(inputDate)
        .endAt(`${inputDate}\uf8ff`)
        .on('value', snapshot => {       
            const supplierOrders = snapshot.val();                               
            firebase.database().ref('/trucks').on('value', resp => {                
                const truckers = resp.val();
                let ordersObj = {};
                let truckerID;                
                console.log('Get today order');
                console.log(supplierOrders);
                _.map(supplierOrders, (val, key) => {
                    truckerID = val.trucker;
                    ordersObj[key] = val;
                });                
                console.log(ordersObj);
                const response = { ordersObj, truckers };
                dispatch({ type: ORDER_ITEM_FETCH_SUCCESS, payload: response });
            });                           
        });
    };
};

export const addNewItem = ({ itemName, itemDesc, itemPrice, itemImgSoruce }) => {
    return (dispatch, getState) => { 
        dispatch({ type: MENU_ITEM_ADD });
        console.log('Adding New Item');
        console.log(itemImgSoruce);
        const { user } = getState().auth;
        const supplierItemRef = firebase.database().ref(`/suppliers/${user.uid}/supplier_items`);
        const newItemID = supplierItemRef.push().key;
        const obj = { category: 'FOOD', desc: itemDesc, name: itemName, price: itemPrice, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png' };
        
        //Insert order            
        supplierItemRef.child(newItemID).set(obj)
        .then(() => {
            console.log('Try again');
            console.log(obj);
            uploadImage({ ...itemImgSoruce, fileName: `${newItemID}.jpg` })
                .then(url => {
                    console.log('Juggernaut finally uploaded');                    
                    firebase.database().ref(`/suppliers/${user.uid}/supplier_items/${newItemID}`).update({ img: url });
                    dispatch({ type: MENU_ITEM_ADDED_SUCCESS, payload: newItemID });
                    Actions.pop();                                      
                })
                .catch(error => console.log(error));            
        })
        .catch((err) => {
            dispatch({ type: MENU_ITEM_ADDED_SUCCESS, payload: err });
            console.log(err);                
        });  
        // supplierItemRef.on('value', snapshot => {
        //     console.log('snapshot');
        //     console.log(snapshot.val());
        //     dispatch({ type: MENU_ITEM_FETCH_SUCCESS, payload: snapshot.val() });
        // });
    };
};

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
const uploadImage = (uri, mime = 'application/octet-stream') => {
    console.log(uri);
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.path.toString().replace('file://', '') : uri.path;
      let uploadBlob = null;

      const imageRef = firebase.storage().ref(`images/${uri.fileName}`);

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
            console.log(data);
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
      });
    });
  };

// export const menuCreate = ({ truckname, trucklocation, truckphone }) => {
//     return (dispatch) => {        
//         console.log('Truck Create action.');
//         firebase.database().ref('/trucks')
//             .push({ truckname, trucklocation, truckphone })
//             .then(() => {
//                 console.log('NEW TRUCK CREATED SUCCESSFULLY!');
//                 dispatch({ type: MENU_ITEM_FETCH_SUCCESS });
//             })
//             .catch((err) => {
//                 console.log(err);                
//             });
//     };
// };