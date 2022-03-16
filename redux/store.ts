import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import launchReducer from "./launchSlice";
import scheduleReducer from './scheduleSlice';
import bookingReducer from './bookingSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 2,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  launch: launchReducer,
  schedule: scheduleReducer,
  booking: bookingReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
