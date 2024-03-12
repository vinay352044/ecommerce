import {combineReducers} from "redux";
import {productReducer} from "./productReducer";
import {appReducer} from "./appReducer";
import { CartReducer } from "./CartReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  productReducer: productReducer,
  CartReducer:CartReducer
})