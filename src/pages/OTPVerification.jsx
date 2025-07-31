import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { verifyOTP } from "../service/authService";

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputsRef = useRef(Array(4).fill(null)); // Ensures 4 refs always exist
  const [otp, setOtp] = useState(["", "", "", ""]);

  const { login } = useAuth();
  const { mergeCartAfterLogin } = useCart();

  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 4) {
      toast.error("Please enter all 4 digits");
      return;
    }

    try {
      const cartId = localStorage.getItem("guestCartId");
      const res = await verifyOTP(email, otpValue);
      if (res?.status === 200) {
        login(res.data.token, res.data.user);
        await mergeCartAfterLogin(cartId, res.data.user.userId);
        localStorage.removeItem("guestCartId");

        navigate("/", { replace: true });
      } else {
        toast.error("Invalid OTP. Double-check and enter again");
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Verification failed";
      toast.error(message);
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
            OTP Verification
          </h3>

          <p className="text-center text-gray-300 mb-6">
            Enter the 4-digit code sent to your phone/email
          </p>

          <div className="flex justify-between mx-10 gap-2 mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                autoFocus={idx === 0}
                className="w-12 h-14 text-center text-white text-xl bg-transparent border border-gray-400 rounded-lg focus:outline-none focus:border-white transition-all"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                ref={(el) => (inputsRef.current[idx] = el)}
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg bg-white text-black font-semibold text-lg
             hover:bg-gray-200 transition-all duration-200 cursor-pointer"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
