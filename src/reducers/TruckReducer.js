import { TRUCK_NAME_CHANGED, TRUCK_LOCATION_CHANGED, TRUCK_PHONE_CHANGED, TRUCK_CREATE, TRUCKS_FETCH_SUCCESS, 
    TRUCK_MENU_ITEM_FETCH, TRUCK_MENU_ITEM_FETCH_SUCCESS, TRUCK_MENU_ITEM_FETCH_FAILED, TRUCK_ORDER_FETCH, TRUCK_ORDER_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = { user: null, items: null, suppliers: null, orders: null, ordersByDate: null, loading: false };

export default (state = INITIAL_STATE, action) => {    
    switch (action.type) {
        case TRUCK_NAME_CHANGED:             
            return { ...state, truckname: action.payload };
        case TRUCK_LOCATION_CHANGED:             
            return { ...state, trucklocation: action.payload };
        case TRUCK_PHONE_CHANGED:
            return { ...state, truckphone: action.payload };
        case TRUCK_CREATE:
            return { INITIAL_STATE };
        case TRUCKS_FETCH_SUCCESS:
            return action.payload;
        case TRUCK_MENU_ITEM_FETCH:
            return { ...state, loading: true };
        case TRUCK_MENU_ITEM_FETCH_SUCCESS:
            return { ...state, items: action.payload.mappedSuppliers, suppliers: action.payload.suppliers, loading: false };  
        case TRUCK_ORDER_FETCH:
            return { ...state, loading: true };
        case TRUCK_ORDER_FETCH_SUCCESS:
            return { ...state, orders: action.payload.truckOrders, ordersByDate: action.payload.ordersByDate, suppliers: action.payload.suppliers, loading: false };                  
        // case LOGIN_USER_SUCCESS: 
        //     return { ...state, ...INITIAL_STATE, user: action.payload };
        // case LOGIN_USER_FAIL: 
        //     return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};