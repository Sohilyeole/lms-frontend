import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helper/axiosInstance"
import toast from "react-hot-toast"

const initialState={
    key:"",
    subscription_id:"",
    ispaymentVerified:false,
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:[]

}


export const getRazorPayId=createAsyncThunk("/razorpay/getId",async()=>{
    try {
        const response=await axiosInstance.get("/payments/razorpay-key")
        return response.data
    } catch (error) {
        toast.error("Failed to load data")
    }
})


export const purchaseCourseBundle=createAsyncThunk("/purchaseCourse",async()=>{
    try {
        const response=await axiosInstance.post("/payments/subscribe") //this should be same as backend url
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
export const verifyUserPayment=createAsyncThunk("/payments/verify",async(data)=>{
    try {
        const response=await axiosInstance.post("/payments/verify",{
            razorpay_payment_id:data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        })

        return response.data
    } catch (error) {
        toast.error("Failed to load data")
    }
})

export const getPaymentRecord=createAsyncThunk("/payments/record",async()=>{
    try {
        const response= axiosInstance.get("/payments?count=10")
        toast.promise(response,{
            loading:"Getting the payments Records",
            success:(data)=>{
                console.log("gii")
                return data?.data?.message
            },
            error:"Failed to get Payment Record"
        })

        return (await response).data
    } catch (error) {
        toast.error("Operation failed")
    }
})


export const cancelCourseBundle=createAsyncThunk("/payments/cancel",async(data)=>{
    try {
        const response= axiosInstance.post("/payments/unsubscribe",data)
        toast.promise(response,{
            loading:"Unsubscribing the bundle",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to unsubscribe"
        })

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const razorpaySlice=createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder
       .addCase(getRazorPayId.fulfilled,(state,action)=>{
            state.key=action?.payload?.key;
       })
       .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
        console.log("hitesh",action)
            state.subscription_id=action?.payload?.subscription_id;
       })
       .addCase(verifyUserPayment.fulfilled,(state,action)=>{
        console.log("i am in")
        toast.success(action?.payload?.message)
        state.ispaymentVerified=action?.payload?.success
       })
       .addCase(verifyUserPayment.rejected,(state,action)=>{
        console.log("i am out")
        toast.success(action?.payload?.message)
        state.ispaymentVerified=action?.payload?.success
       })
       .addCase(getPaymentRecord.fulfilled,(state,action)=>{
        // toast.success(action?.payload?.message)
        console.log(action)
        state.allPayments=action?.payload?.allPayments;
        state.finalMonths=action?.payload?.finalMonths;
        state.monthlySalesRecord=action?.payload?.monthlySalesRecord;
       })
    }
})

export default razorpaySlice.reducer;