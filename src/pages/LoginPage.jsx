import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../components/ui/InputBox";
import { login } from "../service/authService";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      console.error("Email is required");
      return;
    }

    try {
      const res = await login(email);

      if (res && res.status === 200) {
        navigate(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        const message =
          res?.data?.message || "User Not Found! Please check your credentials";
        toast.error(message);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      toast.error("Login failed:", message);
    }
  };

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
            <InputBox
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={handleLogin}
            className="mt-6 w-full py-3 rounded-lg bg-white text-black font-semibold text-lg hover:bg-gray-200
             transition-all duration-200 cursor-pointer"
          >
            Log In
          </button>
          <div className="flex gap-2 my-5 items-center justify-center">
            <p>Already have an account? </p>
            <Link to={"/auth/register"} className="text-blue-500">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
