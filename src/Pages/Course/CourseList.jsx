import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";

import CourseCard from "../../Components/CourseCard";

function CourseList(){
const dispatch=useDispatch();
const {courseData}=useSelector((state)=>state.course);

async function loadCourses(){
    await dispatch(getAllCourses());
}
useEffect(()=>{
  loadCourses();
},[]);

return(
 <HomeLayout>
    <div className="min-h-[90vh] pt-12 sm:pl-20 p-1 flex flex-col gap-10 text-white">
        <h1 className="text-center font-semibold mb-3 text-2xl">
            Explore the courses made by <span className="font-bold text-yellow-500"> Industry experts </span>
        </h1>
            <div className="mb-10 flex flex-wrap gap-14 sm:ml-10 sm:mr-20  justify-center">
                {courseData?.map((element)=>{
                    return <CourseCard key={element._id} data={element}  />

                })}
                
            </div>
        
    </div>


 </HomeLayout>
)

}
export default CourseList;