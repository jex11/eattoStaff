import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, hardSet, autoMergeLevel1, autoMergeLevel2, autoRehydrate } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from './reducers'; // the value from combineReducers

//NEED TO MIGRATE!!! it must store after Login successful, else will keep loading at loginform
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
  whitelist: ['auth']
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, {}, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);