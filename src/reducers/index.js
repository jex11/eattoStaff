import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TruckReducer from './TruckReducer';
import SupplierReducer from './SupplierReducer';
import VerifyOrderReducer from './VerifyOrderReducer';

export default combineReducers({
    auth: AuthReducer,
    verify: VerifyOrderReducer,
    truck: TruckReducer,
    supplier: SupplierReducer
});