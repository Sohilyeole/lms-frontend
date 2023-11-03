import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";
import HomeLayout from "../../Layouts/HomeLayout";
import {BiRupee} from "react-icons/bi"
import toast from "react-hot-toast";

function Checkout(){
const dispatch=useDispatch();
const navigate=useNavigate();
const razorpaykey=useSelector((state)=>state?.razorpay?.key)
const subscription_id=useSelector((state)=>state?.razorpay?.subscription_id)
const isPaymentVerified=useSelector((state)=>state?.razorpay?.ispaymentVerified)
const userData=useSelector((state)=>state?.auth?.data)
const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };
// async function handleSubscription(e){
//     e.preventDefault();//jab bhi form me use krna hai to ye line likhni chaiye
//     console.log(razorpaykey)
//     console.log("sphil",subscription_id)
//     // if(!razorpaykey || !subscription_id){
//     //     toast.error("something wents wrongss")
//     //     return;
//     // }
//     console.log("sohil",razorpaykey,subscription_id)
//     const options={
//         key:razorpaykey,
        
//         subscription_id:subscription_id,
//         name:"Coursify Private Limited",
//         description:"subscription",
//         theme:{
//             color:"#F37254"
//         },
//         prefill:{
//             email:userData.email,
//             name:userData.fullName
//         },
//         // handler:async function(response){
//         //     console.log("sogil",response)
//         //     paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
//         // paymentDetails.razorpay_subscription_id =
//         //   response.razorpay_subscription_id;
//         // paymentDetails.razorpay_signature = response.razorpay_signature;
//         //     console.log(paymentDetails)
//         //     toast.success("payemnt Successfull")
           
//         //    const res= await dispatch(verifyUserPayment(paymentDetails));
//         //    res?.payload?.success?navigate("/checkout/success"):navigate("/checkout/fail")

//         // }
//     }
//     const paymentObject=new window.Razorpay(options)
//     paymentObject.open();
// }
const handleSubscription = async (event) => {
    event.preventDefault();

    // checking for empty payment credential
    if (! razorpaykey || !subscription_id) {
      return;
    }

    const options = {
      key:  razorpaykey,
      subscription_id: subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Monthly Subscription",
      handler: async function (response) {
        console.log(response)
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        // displaying the success message
        toast.success("Payment Successfull");

        // verifying the payment
        const res = await dispatch(verifyUserPayment(paymentDetails));
           console.log("abhi",res)
        // redirecting the user according to the verification status
        res?.payload?.sucess
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
      prefill: {
        name: userData.fullName,
        email: userData.email,
      },
      theme: {
        color: "#F37254",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

async function load(){
    await dispatch(getRazorPayId());
    await dispatch(purchaseCourseBundle());
}
useEffect(()=>{
load();
},[])

return(
    <HomeLayout>
        <form
            onSubmit={handleSubscription}
            className="min-h-[90vh] flex items-center justify-center text-white"
        >
            <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                <h1 className="bg-yellow-500 absolute top-0 w-full text-center p-4 text-2xl font-bold rounded-tl0lg rounded-tr-lg">Subscription Bundle</h1>
                <div className="px-4 space-y-5 text-center">
                    <p className="text-[17px]">
                        This purchase will allow you to access all available course
                         of our platform for {" "}
                         <span className="text-yellow-500 font-bold">
                            <br />
                           1 Year Duration
                         </span> {" "}
                         All the existing and new launched courses will be available
                    </p>
                    <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                       <BiRupee/> <span>499</span> only
                    </p>
                    <div className="text-grey-200">
                        <p>100% refund on cancellation</p>
                        <p>* Terms and Conditions applied</p>
                    </div>
                    <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2  ">
                        Buy Now
                    </button>

                </div>
            </div>

        </form>
    </HomeLayout>
)
}
export default Checkout