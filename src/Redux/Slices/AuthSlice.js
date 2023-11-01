import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosInstance";
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {

  try {
    let formData =  await new FormData();
   formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar",data.avatar);

    
    
    let res = axiosInstance.post("user/register", formData,{ headers: {"Content-Type": "multipart/form-data" } });

    toast.promise(res, {
      loading: "Wait! Creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });

    // getting response resolved here
    res = (await res).data;

    return res;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    toast.error(error?.response?.data?.message);
  }
});

export const login = createAsyncThunk("/auth/signup", async (data) => {
  try {
    let res = axiosInstance.post("user/login", data);

    toast.promise(res, {
      loading: "Wait! Authentication in progress",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Login",
    });

    // getting response resolved here
    res = (await res).data;

    return res;
  } catch (error) {
    // console.log(error)
    // console.log(error.message)
    // toast.error(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
});

export const logout= createAsyncThunk("/auth/logout",async ()=>{
  try {
    let res = axiosInstance.get("user/logout");

    toast.promise(res, {
      loading: "Wait! Logout in progress",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Logout",
    });

    // getting response resolved here
    res = (await res).data;

    return res;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  }
)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", action?.payload?.user?.role);
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    })
    .addCase(logout.fulfilled,(state)=>{
      localStorage.clear()
      state.data={};
      state.isLoggedIn=false;
      state.role="";


    })
  },
});

export default authSlice.reducer;
