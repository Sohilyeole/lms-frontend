
import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../Layouts/HomeLayout"
import {Chart as ChartJs, ArcElement, Tooltip,Legend,CategoryScale,LinearScale,BarElement,Title} from "chart.js"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deletCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { Bar, Pie } from "react-chartjs-2";
import {FaUsers} from "react-icons/fa"
import {FcSalesPerformance} from "react-icons/fc"
import {GiMoneyStack} from "react-icons/gi"
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

ChartJs.register(ArcElement,BarElement,CategoryScale,Legend,LinearScale,Title,Tooltip)

function AdminDashboard(){
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const {allUserCount,subscribedCount}=useSelector((state)=>state?.stat)
   const {allPayments,finalMonths,monthlySalesRecord}=useSelector((state)=>state?.razorpay);
   const userData={
    labels:["Register User", " Enrolled User"],
    fontColor:"white",
    datasets:[{
        label:"User Details",
        data:[allUserCount,subscribedCount],
        backgroundColor:["yellow","green"],
        borderWidth:1,
        borderColor:["yellow","green"]
    }]
   }
   const salesData={
    labels:["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],
    fontColor:"white",
    datasets:[
        {
            label:"Sales//Months",
            data:monthlySalesRecord,
            backgroundColor:["rgb(255,99,132)"],
            borderColor:["White"],
            borderWidth:2
        }
    ]
   }

   const myCourses=useSelector((state)=>state?.course?.courseData);
   async function onCourseDelet(id){
    if(window.confirm("are You Sure ???")){
        const res= await dispatch(deletCourse(id))
        console.log(res)
        if(res?.payload?.sucess){
            await dispatch(getAllCourses())
        }
    }
   }

   useEffect(()=>{
       (
        async ()=>{
            await dispatch(getAllCourses());
            await dispatch(getStatsData());
          await dispatch(getPaymentRecord())

        }
       )()
   },[])
    
return(
    <HomeLayout>
        <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
            <h1 className="text-center text-5xl font-semibold text-yellow-500">Admin Dashboard</h1>

            <div className="sm:grid sm:grid-cols-2  gap-5 m-auto sm:mx-10">
                <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                    <div className=" sm:h-80 sm:w-80 h-full w-full border ">
                        <Pie data={userData}/>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                            <div className="flex flex-col items-center">
                                <p className="font-semibold">Register Users</p>
                                <h3 className="text-4xl font-bold">{allUserCount}</h3>
                            </div>
                            <FaUsers className="text-yellow-500 text-5xl"/>
                        </div>
                        <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                            <div className="flex flex-col items-center">
                                <p className="font-semibold">Subscribed Users </p>
                                <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                            </div>
                            <FaUsers className="text-green-500 text-5xl"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                    <div className="h-80 w-full relative">
                        <Bar className="absolute b-0 h-80 w-full" data={salesData}/>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                    <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                            <div className="flex flex-col items-center">
                                <p className="font-semibold"> Subscription Count</p>
                                <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                            </div>
                            <FcSalesPerformance className="text-yellow-500 text-5xl"/>
                        </div>
                        <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                            <div className="flex flex-col items-center">
                                <p className="font-semibold">Total Revenue</p>
                                <h3 className="text-4xl font-bold">{allPayments?.count*499}</h3>
                            </div>
                            <GiMoneyStack className="text-yellow-500 text-5xl"/>
                        </div>

                    </div>
                </div>
            </div>
            <div className="mx-[10%]   w-[80%] flex flex-col items-center justify-center gap-10 mb-10 ">
                <div className="flex w-full  items-center justify-between">
                    <h1 className="text-center text-3xl font-semibold">
                        Courses overview
                    </h1>
                    <button onClick={()=>navigate("/course/create")} className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-lg py-2 px-4 font-semibold text-lg cursor-pointer ">
                        Create New Course

                    </button>

                </div>
                <table className="table overflow-x-scroll ">
                    <thead>
                        <tr>
                            <th>S No</th>
                            <th>Course Title</th>
                            <th>Course Category</th>
                            <th>Instructor</th>
                            <th>Totsl Lecture</th>
                            <th>Description</th>
                            <th>Acion</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(myCourses)}
                        {myCourses?.map((course,idx)=>{
                            return (
                                <tr key={course?._id}>
                                    <td>{idx+1}</td>
                                    <td><textarea readOnly value={course?.title} className="w-40 h-auto bg-transparent resize-none"></textarea></td>
                                    <td>{course?.category}</td>
                                    <td>{course?.createdBy}</td>
                                    <td>{course?.numberOfLectures}</td>
                                    <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                        <textarea value={course?.description} readOnly className="w-80 h-auto bg-transparent resize-none"></textarea>
                                    </td>
                                    <td className="flex items-center gap-4">
                                        <button onClick={()=>navigate("/course/displaylectures",{state:{...course}})} className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold">
                                            <BsCollectionPlayFill/>
                                        </button>
                                        <button onClick={()=>onCourseDelet(course?._id)} className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold">
                                            <BsTrash/>
                                        </button>

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        
    </HomeLayout>
)
}
export default AdminDashboard