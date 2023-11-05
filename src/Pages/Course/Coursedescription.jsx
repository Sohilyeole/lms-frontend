import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";

function Coursedescription() {
  const { state } = useLocation();
  console.log(state)
  const navigate=useNavigate();
 
  const {role,data}=useSelector((state)=>state.auth)
  useEffect(()=>{
  if(!state){
    navigate("/courses")
  }
  },[])

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-20 flex-col items-center justify-center text-white">
        <div className=" sm:grid grid-cols-2 gap-10 py-10 relative ">
          <div className="space-y-5  ">
            <img src={state?.thumbnail?.secure_url} alt="thumbnail" className="h-[18rem]  w-full  " />
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-between text-xl">
                <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">
                        Total Lecture : {" "}
                    </span>
                    {state?.numberOfLectures}
                </p>
                <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">
                        Instructor : {" "}
                    </span>
                    {state?.createdBy}
                </p>
              </div>
              {
                role==="ADMIN" || data?.subsciprtion?.status==="active" ? (
                    <button  className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition ease-in-out duration-300" onClick={()=>navigate("/course/displaylectures",{state:{...state}})}>
                        watch lectures
                    </button>
                ):(
                    <button className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition ease-in-out duration-300" onClick={()=>navigate("/checkout")}>
                        Subscribe
                    </button>
                )
              }
            </div>
          </div>
          <div className="space-y-2 font-xl">
             <h1 className="text-4xl font-bold text-yellow-500 mb-5 text-center">
                {state?.title}
             </h1>
             <p className="text-yellow-500 font-semibold">
                course description : 
             </p>
             <p>
                {state?.description}
             </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default Coursedescription;
