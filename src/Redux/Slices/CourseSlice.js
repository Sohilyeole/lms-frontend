import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helper/axiosInstance"

const initialState={
courseData:[]
}
export const getAllCourses=createAsyncThunk("/course/get",async()=>{
    try {
        const res= axiosInstance.get("/courses");

        toast.promise(res,{
            loading:"loading course data...",
            success:"courses loaded sucessfully",
            error:"Failed to get the Courses"
        })
        return (await res).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
const courseSlice=createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled,(state,action)=>{
            if(action.payload){
                
                state.courseData=[...action.payload];
            }
        })
    }
})
export default courseSlice.reducer;