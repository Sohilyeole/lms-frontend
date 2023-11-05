import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice"
import courseSliceReducer from "./Slices/CourseSlice"
import razorpaySliceReducer from "./Slices/RazorpaySlice"
import lecturesSliceReducer from "./Slices/LecturesSlice";
import StatSlice from "./Slices/StatSlice";
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        course:courseSliceReducer,
        razorpay:razorpaySliceReducer, //razorpay ka state abhi react devtool me display hoga waha se data use kar sakhte hai
        lecture:lecturesSliceReducer,
        stat:StatSlice
    },
    devTools:true
})
export default store;