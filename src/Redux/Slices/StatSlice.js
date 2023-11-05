import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helper/axiosInstance"
const initialState={
    allUserCount:0,
    subscribedCount:0
}
export const getStatsData=createAsyncThunk("stats/get",async()=>{
    try {
        const res=axiosInstance.get("/admin/stats/users");
        toast.promise(res,{
            loading:"Getting the Stats",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Load the Stats"

        })
        return (await res).data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const statSlice=createSlice({
    name:"state",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getStatsData.fulfilled,(state,action)=>{
            console.log(action)
            state.allUserCount=action?.payload?.allUsersCount;
            state.subscribedCount=action?.payload?.subscribedUsersCount

    })
    }
})

export default statSlice.reducer