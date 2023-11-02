import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosInstance";
import axios from "axios";

const initialState = {
  courseData: [],
};
export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const res = axiosInstance.get("/courses");

    toast.promise(res, {
      loading: "loading course data...",
      success: "courses loaded sucessfully",
      error: "Failed to get the Courses",
    });
    return (await res).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      //kindly use FormData method while passinf files also in this program axios require this line { headers: { "Content-Type": "multipart/form-data" } }
      let formData = await new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnail", data?.thumbnail);

      const response = axiosInstance.post("/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.promise(response, {
        loading: "Creating New Course",
        success: "Course created Successfully",
        error: "Failed to create course",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = [...action.payload];
      }
    });
  },
});
export default courseSlice.reducer;
