import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import singleProductReducer from "./singleProductReducer";
import reviewsReducer from "./reviewsReducer";
import orderReducer from "./orderReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
    categories: categoryReducer,
    products: productReducer,
    user: userReducer,
    product: singleProductReducer,
    reviews: reviewsReducer,
    cart: cartReducer,
    order: orderReducer
})

export default rootReducer