import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/ui/InputBox";
import { register } from "../service/authService";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await register(formValue);
      console.log("Navigating to verify-otp");
      navigate(`/auth/verify-otp?email=${encodeURIComponent(formValue.email)}`);
    } catch (error) {
      console.error("Register failed:", error);
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
            Register
          </h3>

          <form onSubmit={registerUser} className="space-y-6">
            <InputBox
              label="Full Name"
              type="text"
              name="name"
              value={formValue.name}
              onChange={handleChange}
            />
            <InputBox
              label="Email"
              type="email"
              name="email"
              value={formValue.email}
              onChange={handleChange}
            />
            <InputBox
              label="Phone"
              type="tel"
              name="phone"
              value={formValue.phone}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="mt-6 w-full py-3 rounded-lg bg-white text-black font-semibold text-lg hover:bg-gray-200
              transition-all duration-200 cursor-pointer"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
