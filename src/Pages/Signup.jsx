import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsEmojiAngryFill, BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setpreviewImage] = useState("");
  const [signupData, setsignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });
  function handleUserInput(e) {
    const { name, value } = e.target;
    setsignupData({ ...signupData, [name]: value });
  }

  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
      // setsignupData({
      //   ...signupData,
      //   avatar: uploadedImage,
      // });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setpreviewImage(this.result);
        setsignupData({
          ...signupData,
          avatar: uploadedImage,
        });
      });
    }
  };
  async function createNewAcoount(event) {
    event.preventDefault();
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.fullName ||
      !signupData.avatar
    ) {
      toast.error("Please fill all details");
      return;
    }
    //chceking feild namelength
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 char");
      return;
    }
    if (
      !signupData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Enter Valid Email");
      return;
    }
    if (
      !signupData.password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    ) {
      toast.error("Enter Valid Password");
      return;
    }

    const formData = {
      fullName: signupData.fullName,
      email: signupData.email,
      password: signupData.password,
      avatar: signupData.avatar,
    };

    // const formData = new FormData();
    // formData.append("fullName", signupData.fullName);
    // formData.append("email", signupData.email);
    // formData.append("password", signupData.password);
    // formData.append("avatar", signupData.avatar);

    // let formData =  await new FormData();
    // formData.append("fullName", signupData.fullName);
    // formData.append("email", signupData.email);
    // formData.append("password", signupData.password);
    // formData.append("avatar",signupData.avatar);

    const res = await dispatch(createAccount(formData));
    if (res.payload.sucess == true) {
      navigate("/");
    }

    setsignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setpreviewImage("");
  }
  return (
    <HomeLayout>
      <div className=" flex items-center justify-center h-[100vh]">
        <form
          noValidate
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] "
          onSubmit={createNewAcoount}
        >
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>
          <label className="cursor-pointer" htmlFor="image_uploads">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
                alt="preview image"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={getImage}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png"
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold ">
              Name
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter your name..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold ">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold ">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your password..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.password}
            />
          </div>
          <button className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
            create account
          </button>
          <p className="text-center">
            already have an account ?{" "}
            <Link to="/login" className="link text-accent cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Signup;
