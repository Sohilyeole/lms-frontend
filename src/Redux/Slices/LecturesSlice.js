import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helper/axiosInstance"
const initialState={
    lectures:[]
}
export const getCourseLectures=createAsyncThunk("/course/lecture/get",async(cid)=>{
try {
    const res=axiosInstance.get(`/courses/${cid}`)
    toast.promise(res,{
        loading:"Fetching leectures",
        success:"Lectures fetched sucessfully",
        error:"Failed to load the lecture"
    })
    return (await res).data;
} catch (error) {
   toast.error(error?.response?.data?.message)
}
})


export const addCourseLectures=createAsyncThunk("/course/lecture/get",async(data)=>{
    try {
        const formData=new FormData();
        formData.append("lecture",data.lecture)
        formData.append("title",data.title)
        formData.append("description",data.description)
        const res=axiosInstance.post(`/courses/${data.id}`,formData,{
            headers: { "Content-Type": "multipart/form-data" }})
        toast.promise(res,{
            loading:"adding Course Lectures",
            success:"Lectures added sucessfully",
            error:"Failed to add the lecture"
        })
        return (await res).data;
    } catch (error) {
       toast.error(error?.response?.data?.message)
    }
    })

    export const deletCourseLectures=createAsyncThunk("/course/lecture/delet",async(data)=>{
        try {
           
            const res=axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`)
            toast.promise(res,{
                loading:"deleting Course Lectures",
                success:"Lectures deleted sucessfully",
                error:"Failed to delete the lecture"
            })
            return (await res).data;
        } catch (error) {
           toast.error(error?.response?.data?.message)
        }
        })
const lectureSlice=createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getCourseLectures.fulfilled,(state,action)=>{
            state.lectures=action?.payload?.lectures
        })
        .addCase(addCourseLectures.fulfilled,(state,action)=>{
            state.lectures=action?.payload?.course?.lectures
        })

    }
})

export default lectureSlice.reducer