import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
    categories: categoryReducer,
    products: productReducer
})

export default rootReducer