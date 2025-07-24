import { Link } from "react-router-dom";
import InputBox from "../components/ui/InputBox";

const SignupPage = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/banners/banner-dt-2.jpg")' }}
    >
      <div className="w-full h-screen bg-black/60 flex items-center justify-center px-4">
        <div className="bg-black/50 backdrop-blur-md w-full max-w-md p-8 rounded-2xl shadow-lg border border-white/10">
          <h3 className="text-2xl text-white text-center uppercase font-bold tracking-wide mb-6">
            Login
          </h3>

          <div className="space-y-5">
            <InputBox label="Full Name" type="text" name="name" />
            <InputBox label="Phone Number" type="number" name="phone" />
            <InputBox label="Email" type="email" name="email" />
          </div>
          <Link to={"/auth/verify-otp"}>
            <button
              className="mt-6 w-full py-3 rounded-lg bg-white text-black font-semibold text-lg hover:bg-gray-200
             transition-all duration-200 cursor-pointer"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
