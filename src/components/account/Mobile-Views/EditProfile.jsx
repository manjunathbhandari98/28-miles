import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("9876543210");
  const [email, setEmail] = useState("john@example.com");

  const handleSave = () => {
    // Save logic here
    console.log("Saved:", { name, phone, email });
    navigate(-1);
  };

  // automatically redirect to /my-profile when screen size is md or larger.

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        navigate("/my-profile", { replace: true });
      }
    };

    // Check immediately when mounted
    handleResize();

    // Add listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-zinc-950 border-b border-zinc-800">
        <ChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h3 className="text-lg font-medium">Edit Profile</h3>
        <div></div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 space-y-6 md:hidden">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg border border-zinc-800 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg border border-zinc-800 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg border border-zinc-800 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition text-white py-2.5 rounded-lg font-medium mt-6"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
