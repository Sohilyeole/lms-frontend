import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserinput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: "",
    previewImage: "",
  });
  function handleImageUpload(e) {
    e.preventDefault();


    
    const uploadedImage = e.target.files[0];
    console.log(e.target.files[0])
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserinput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
    console.log(userInput.previewImage)
    console.log(userInput.thumbnail)
  }
  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserinput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
   
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast.error("All feild are mandatory");
      return;
    }
    console.log("sohil",userInput)
    const response = await dispatch(createNewCourse(userInput));
    console.log(response)
    if (response?.payload?.sucess) {
      setUserinput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: "",
        previewImage: "",
      });
      navigate("/courses");
    }
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
           <Link className="absolute top-8 text-2xl link text-accent cursor-pointer ">
           <AiOutlineArrowLeft/>
           </Link>
          <h1 className="text-center text-2xl font-bold"> Create New Course</h1>
          <main className="grid grid-cols-2 gap-x-10 ">
            <div className="gap-y-6">
                <div >
                    <label htmlFor="image_upload" className="cursor-pointer">
                        {userInput.previewImage ? (
                            <img 
                                className=" w-full h-44 m-auto border "
                                src={userInput.previewImage}
                                // alt="Upload your Course thumbnail"
                            
                            />
                        ):(
                            <div className="w-full h-44 m-auto flex items-center justify-center border ">
                                <h1 className="font-bold text-lg">upload your course thumbnail</h1>
                            </div>
                        )
                    }
                    </label>
                    <input 
                        className="hidden" 
                        type="file"
                        id="image_upload"
                        accept=".jpg, .jpeg ,.png"
                        name="image_upload"
                        onChange={handleImageUpload}
                    />
                   
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-lg font-semibold" htmlFor="title">Course title</label>
                    <input 
                       required
                       type="text"
                       name="title"
                       id="title"
                       placeholder="Enter course title"      
                       className="bg-transparent px-2 py-1 border"
                       value={userInput.title}    
                       onChange={handleUserInput}          
                    />
                </div>
            </div>
                <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                    <label className="text-lg font-semibold" htmlFor="createdBy">Course instructor</label>
                    <input 
                       required
                       type="text"
                       name="createdBy"
                       id="createdBy"
                       placeholder="Enter course Instructor name"      
                       className="bg-transparent px-2 py-1 border"
                       value={userInput.createdBy}    
                       onChange={handleUserInput}          
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-lg font-semibold" htmlFor="category">Category</label>
                    <input 
                       required
                       type="text"
                       name="category"
                       id="category"
                       placeholder="Enter course category"      
                       className="bg-transparent px-2 py-1 border"
                       value={userInput.category}    
                       onChange={handleUserInput}          
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-lg font-semibold" htmlFor="description">Course Description</label>
                    <textarea 
                       required
                       type="text"
                       name="description"
                       id="description"
                       placeholder="Enter course description"      
                       className="bg-transparent px-2 py-1 h-24  resize-none border "
                       value={userInput.description}    
                       onChange={handleUserInput}          
                    />
                </div>
                </div>

          </main>
          <button type="submit" className="w-full py-2 text-lg cursor-pointer rounded-sm font-semibold bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 ">
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}
export default CreateCourse;
