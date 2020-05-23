import { VERIFY_ORDER, VERIFY_ORDER_SUCCESS, VERIFY_ORDER_FAILED, COMPLETE_ORDER, COMPLETE_ORDER_SUCCESS } from '../actions/types';

const INITIAL_STATE = { order: null, qrCode: '', error: '', loading: false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case VERIFY_ORDER:
            return { ...state, loading: true, error: '' };
        case VERIFY_ORDER_SUCCESS: 
            return { ...INITIAL_STATE, order: action.payload };
        case VERIFY_ORDER_FAILED: 
            return { ...state, loading: false, qrCode: action.payload.qrCode, error: action.payload.error };
        case COMPLETE_ORDER:
            return { ...state, loading: true };
        case COMPLETE_ORDER_SUCCESS:
            return INITIAL_STATE;
        default:
            return state;
    }
};