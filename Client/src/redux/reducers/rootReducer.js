import {combineReducers} from "redux";
import {productReducer} from "./productReducer";
import {appReducer} from "./appReducer";
import {roleReducer} from './roleReducer'

export const rootReducer = combineReducers({
  app: appReducer,
  role: roleReducer,
  productReducer: productReducer
})