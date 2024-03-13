import {combineReducers} from "redux";
import {productReducer} from "./productReducer";
import {appReducer} from "./appReducer";
import {roleReducer} from './roleReducer'
import { CartReducer } from "./CartReducer";
import { orderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  role: roleReducer,
  productReducer: productReducer,
  orderReducer:orderReducer,
  CartReducer:CartReducer
})