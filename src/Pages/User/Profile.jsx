import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";
function Profile(){
    const dispatch=useDispatch();
    const navigate=useNavigate();   
    
  const userData = useSelector((state) => state?.auth?.data);
  const data={
    id:userData._id
  }

async function handleCancellation(){
    toast("initiating cancellation")
    await dispatch(cancelCourseBundle(data))
    await dispatch(getUserData())
    toast.success("Cancellation Completed !")
    navigate("/")
}
    
return(
   <HomeLayout>
    <div className=" px-1 h-[90vh] sm:min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4  text-white shadow-[0_0_10px_black] ">
           <img 
           src={userData?.avtar?.secure_url}
           className="w-40 m-auto rounded-full border border-black"
            alt="" 
            />
            <h3 className="text-xl font-semibold text-center capitalize">{userData?.fullName}</h3>
            <div className="grid grid-cols-2 ">
                <p>Email : </p> <p  className="break-words">{userData?.email}</p>
               
                <p>Role : </p> <p>{userData?.role}</p>
               
                <p>Subscription : </p> <p>{userData?.subscription?.status==="active" ? "Active":"Inactive"}</p>

            </div>
            <div className="flex items-center justify-between gap-2">
                <Link to="/changepassword"  className=" w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md font-semibold py-2 cursor-pointer text-center">
                    <button>Chnge Password</button>
                </Link>
                <Link to="/user/editprofile"  className=" w-1/2 border border-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md font-semibold py-2 cursor-pointer text-center">
                    <button className=" w">Edit Profile</button>
                </Link>
            </div>
            {console.log(userData)}
            {userData?.subsciprtion?.status ==="active" &&(
             <button className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center" onClick={handleCancellation}>
                Cancel Subscription
             </button>
            )}
        </div>
    </div>
   </HomeLayout>
)
}
export default Profile;