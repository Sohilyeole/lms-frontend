import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layouts/HomeLayout"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deletCourseLectures, getCourseLectures } from "../../Redux/Slices/LecturesSlice";

function DisplayLecture(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const state=useLocation();

    const {lectures}=useSelector((state)=>state.lecture)
    console.log(lectures)
    const {role}=useSelector((state)=>state.auth)
    const[currentvideo,setcurrentVideo]=useState(0)
     async function onLectureDelet(courseId,lectureId){
        console.log("dshvyvd",courseId,lectureId)
        await dispatch(deletCourseLectures({courseId:courseId,lectureId:lectureId}))
        await dispatch(getCourseLectures(courseId))
    }
    useEffect(()=>{
        
        
       if(!state.state) navigate("/courses")
       dispatch(getCourseLectures(state?.state?._id))
    },[]);
return(
    
    <HomeLayout>
        
        <div className=" flex flex-col gap-10 items-center justify-center min-h-[90vh] sm:py-10 text-white mx-5">
            <div className="text-center text-2xl font-semibold text-yellow-500">
                Course Name: {state?.state?.title}
            </div>
            {(lectures&& lectures.length>0) ?
            (<div className="flex sm:flex-row flex-col justify-center gap-10 sm:w-full w-[90vw] ">
                
                 <div className="space-y-5 sm:w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                    {/* {console.log(lectures && lectures[currentvideo]?.lecture?.secure_url)} */}
                    <video src={lectures && lectures[currentvideo]?.lecture?.secure_url} 
                    className="objcet-fill rounded-tl-lg rounded-tr-lg w-full" controls disablePictureInPicture muted controlsList="nodownload"></video>
                    <div>
                        <h1><span className="text-yellow-500"> Title:{" "}</span> {lectures && lectures[currentvideo]?.title}</h1>
                        <p><span className="text-yellow-500 line-clamp-4">Deccription {" "}</span> {lectures&& lectures[currentvideo]?.description}</p>
                    </div>
                 </div>
                 <ul className="w-full sm:w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4 ">
                    <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                        <p>Lectures List</p>
                        {/* {role==="ADMIN" && (<button>add New Lecture</button>)} */}
                        {role=="ADMIN" && (<button className="btn-primary px-2 py-1 rounded-md font-semibold text-sm" onClick={()=>navigate("/course/addlecture",{state:{...state}})}>Add new Lecture</button>)}
                    </li>
                    {lectures && lectures.map((lecture,idx)=>{
                        return(
                            <li className="space-y-2" key={lecture._id}>
                                <p className="cursor-pointer " onClick={()=>setcurrentVideo(idx)}>
                                    <span>
                                        {" "} Lecture {idx +1} :{" "}
                                    </span>
                                    {lecture?.title}
                                </p>
                                { console.log()}
                                {role=="ADMIN" && (<button className="btn-accent px-2 py-1 rounded-md font-semibold text-sm" onClick={() =>onLectureDelet(state.state._id,lecture?._id)}>Delet Lecture</button>)}

                            </li>
                        )
                    })}
                 </ul>
            </div>):(  role=="ADMIN" && (<button className="btn-primary px-2 py-1 rounded-md font-semibold text-sm" onClick={()=>navigate("/course/addlecture",{state:{...state}})}>Add new Lecture</button>))
             }
        </div>

    </HomeLayout>
            
)
}
export default DisplayLecture