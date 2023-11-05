import { Routes } from "react-router-dom";
import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs"
import Footer from "./Components/Footer";
import HomeLayout from "./Layouts/HomeLayout";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import CourseList from "./Pages/Course/CourseList";
import Contact from "./Pages/Contact";
import Denied from "./Pages/Denied";
import Coursedescription from "./Pages/Course/Coursedescription"
import RequireAuth from "./Components/Auth/RequireAuth";
import CreateCourse from "./Pages/Course/CreateCourse";
import Profile from "./Pages/User/Profile";
import EditProfile from "./Pages/User/EditProfile";
import Checkout from "./Pages/Payment/CheckOut";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import CheckoutFail from "./Pages/Payment/CheckoutFail";
import DisplayLecture from "./Pages/Dashboard/DisplayLecture";
import Addlecture from "./Pages/Dashboard/Addlecture";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";



function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/about" element={<AboutUs/>}></Route>
        <Route path="/courses" element={<CourseList/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/denied" element={<Denied/>}></Route>
        <Route path="/course/description" element={<Coursedescription/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>} >
          <Route path="/course/create" element={<CreateCourse/>}></Route>
          <Route path="/course/addlecture" element={<Addlecture/>}></Route>
          <Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>} >
        <Route path="/user/profile" element={<Profile/>}></Route>
        <Route path="/user/editprofile" element={<EditProfile/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>
        <Route path="/checkout/success" element={<CheckoutSuccess/>}></Route>
        <Route path="/checkout/fail" element={<CheckoutFail/>}></Route>
        <Route path="/course/displaylectures" element={<DisplayLecture/>}></Route>
        
        </Route>
        
  </Routes>
 
    </>
  );
}

export default App;
