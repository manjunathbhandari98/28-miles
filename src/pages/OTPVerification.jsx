import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const OtpVerificationPage = () => {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    console.log("Entered OTP:", otpValue);
    // Send OTP to backend here
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
                maxLength="1"
                className="w-12 h-14 text-center text-white text-xl bg-transparent border border-gray-400 rounded-lg focus:outline-none focus:border-white transition-all"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                ref={(el) => (inputsRef.current[idx] = el)}
              />
            ))}
          </div>
          <Link to={"/my-profile"}>
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-lg bg-white text-black font-semibold text-lg
             hover:bg-gray-200 transition-all duration-200 cursor-pointer"
            >
              Verify OTP
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
