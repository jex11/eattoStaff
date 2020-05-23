import { MENU_ITEM_ADD, MENU_ITEM_ADDED_SUCCESS, MENU_ITEM_ADDED_FAILED, MENU_ITEM_NAME_CHANGED, MENU_ITEM_DESC_CHANGED, MENU_ITEM_PRICE_CHANGED, MENU_ITEM_FETCH, MENU_ITEM_FETCH_SUCCESS, ORDER_ITEM_FETCH, ORDER_ITEM_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = { user: null, items: null, ordered_items: null, loading: false, errorMsg: null };

export default (state = INITIAL_STATE, action) => {    
    switch (action.type) {
        case MENU_ITEM_NAME_CHANGED:             
            return { ...state, name: action.payload };
        case MENU_ITEM_DESC_CHANGED:             
            return { ...state, desc: action.payload };
        case MENU_ITEM_PRICE_CHANGED:
            return { ...state, price: action.payload };
        case MENU_ITEM_FETCH:
            return { ...state, loading: true };
        case MENU_ITEM_FETCH_SUCCESS:
            console.log(action.payload);
            return { ...state, items: action.payload, loading: false };
        case ORDER_ITEM_FETCH:
            return { ...state, loading: true };
        case ORDER_ITEM_FETCH_SUCCESS:
            console.log('Reducer here');
            console.log(action.payload);
            return { ...state, ordered_items: action.payload.ordersObj, truck_list: action.payload.truckers, loading: false };
        case MENU_ITEM_ADD:
            return { ...state, loading: true };
        case MENU_ITEM_ADDED_SUCCESS:
            return { ...state, name: '', desc: '', price: '', loading: false };
        case MENU_ITEM_ADDED_FAILED:
            return { ...state, loading: false, errorMsg: action.payload };
        // case LOGIN_USER_SUCCESS: 
        //     return { ...state, ...INITIAL_STATE, user: action.payload };
        // case LOGIN_USER_FAIL: 
        //     return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};