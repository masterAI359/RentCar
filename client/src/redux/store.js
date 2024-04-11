import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.jsx";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
// import globalReducer from "./adminSlices/adminSlice.jsx";
import AddVehiclereducer from "./adminSlices/reducer.js";
import adminReducer from "./adminSlices/adminDashboardSlice/DashboardSlice.jsx";
import userListVehiclesReducer from "./user/listAllVehicleSlice.jsx";
import modelDataSlice from './adminSlices/adminDashboardSlice/CarModelDataSlice.jsx';

const rootReducer = combineReducers({
  user: userReducer,
  // global: globalReducer,
  addVehicle: AddVehiclereducer,
  adminDashboardSlice: adminReducer,
  userListVehicles: userListVehiclesReducer,
  modelDataSlice : modelDataSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
