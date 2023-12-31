import { useDispatch, useSelector } from "react-redux"
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { updateProfile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout"
import { BsPersonCircle } from "react-icons/bs";
import {AiOutlineArrowLeft} from "react-icons/ai"
function EditProfile(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
   const[data,setdata]=useState({
    previewImage:"",
    fullName:"",
    avatar:undefined,
    userId:useSelector((state)=>state?.auth?.data?._id)

   })
   function handleImageUpload(e){
    e.preventDefault();
    const uploadedImage=e.target.files[0];
    if(uploadedImage){
        const fileReader=new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load",function (){
            setdata({
                ...data,
                previewImage:this.result,
                avatar:uploadedImage
            })
        })
    }
   }


   function handleInputChange(e){
    const {name,value}=e.target;
    setdata({
        ...data,
        [name]:value
    })
   }
   
  async function onFormSubmit(e){
    e.preventDefault();
    if(!data.fullName ||!data.avatar){
        toast.error("All fields are mandatory")
        return;
    }
    if(data.fullName.length<5){
        toast.error("Name cannot be of less than 5 characters")
        return;
    }
    const formData=new FormData();
    formData.append("fullName",data.fullName)
    formData.append("avatar",data.avatar)

    await dispatch(updateProfile([data.userId,formData]))
     
    await dispatch(getUserData());
   navigate("/user/profile");

   }



    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh] ">
                <form 
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white sm:w-80 w-[90vw] h-[26rem] shadow-[0_0_10px_black]"
                >
                    <h1 className=" text-center text-2xl font-semibold">Edit Profile</h1>
                    <label className="cursor-pointer" htmlFor="image_upload" >
                        
                        {data.previewImage?( 
                            <img src={data.previewImage}  className="w-28 h-28 rounded-full m-auto" />
                        ):(
                        <BsPersonCircle className=" w-28 h-28 rounded-full m-auto"/>)
                        }
                    </label>
                    <input onChange={handleImageUpload} className="hidden" type="file" id="image_upload" name="image_upload" accept=".jpg, .png, .svg, .jpeg " />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="text-lg font-semibold">Full Name</label>
                        <input type="text" name="fullName" className="bg-transparent px-2 py-1 border"id="fullName" required value={data.fullName} onChange={handleInputChange}/>
                    </div>
                    <button className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg" type= "submit">
                       Update Profile
                    </button>
                    <Link to="/user/profile">
                        <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2"><AiOutlineArrowLeft/> Go Back To Profile</p>
                        
                    </Link>
                </form>
            </div>
        </HomeLayout>
   
    )
}
export default EditProfile