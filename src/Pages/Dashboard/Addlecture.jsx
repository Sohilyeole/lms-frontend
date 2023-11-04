import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layouts/HomeLayout"
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { addCourseLectures } from "../../Redux/Slices/LecturesSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect } from "react";



function Addlecture(){
    const navigate=useNavigate();
    
    const courseDetails=useLocation().state;
    
    
   
   
    
    
    const dispatch=useDispatch();
    
    const [userInput,setUserInput]=useState({
        id:courseDetails.state._id,
        lecture:undefined,
        description:"",
        title:"",
        videoSrc:""
    })
    

    function handleInputChange(e){
        const{name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    function handleVideo(e){
        const video=e.target.files[0];
        const source=window.URL.createObjectURL(video)
        setUserInput({
            ...userInput,
            lecture:video,
            videoSrc:source
        })
    }
   async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.lecture|| !userInput.title ||!userInput.description){
            toast.error("All feilds are Mandatory")
            return;
        }
        const response=await dispatch(addCourseLectures(userInput));
        console.log(response)
        if(response?.payload?.sucess){
            navigate(-1)

            setUserInput({
                id:courseDetails.state._id,
                lecture:undefined,
                description:"",
                title:"",
                videoSrc:""
            })
        }

    }
    useEffect(() => {
        
        if(!courseDetails) navigate("/courses");
    }, [])

 return(
    <HomeLayout>
      <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
            <header className="flex items-center justify-center relative">
                <button className="absolute left-2 text-xl text-green-500 " onClick={()=>navigate(-1)}><AiOutlineArrowLeft/></button>
                <h1 className="text-xl text-yellow-500 font-semibold">
                    Add new lecture
                </h1>
            </header>
            <form  
                onSubmit={onFormSubmit}
                className="flex flex-col gap-3"
            >
                <input type="text" 
                name="title"
                placeholder="Enter titile of lecture"
                onChange={handleInputChange}
                className="bg-transparent px-3 py-1 border "
                value={userInput.title} />
                <textarea type="text" 
                name="description"
                placeholder="Enter description of lecture"
                onChange={handleInputChange}
                className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll "
                value={userInput.description} />
                {userInput.videoSrc?(
                    <video src={userInput.videoSrc} muted controls controlList="nodownload nofullscreen" disablePictureInPicture className="object-fill rounded-tl-lg rounded-tr-lg w-full"></video>
                ):(
                    <div className="h-48 border flex items-center justify-center cursor-pointer">
                        <label htmlFor="lecture" className="font-semibold text-xl cursor-pointer">Choose your vedio</label>
                        <input type="file" className="hidden" id="lecture" name="lecture" onChange={handleVideo} accept="video/mp4 video/xmp4 video/*"/>
                    </div>
                )}

                <button type="submit" className="btn- btn-primary py-1 font-semibold text-lg">
                    Add new lecture
                </button>

            </form>

        </div>
      </div>
    </HomeLayout>
 )
}
export default Addlecture