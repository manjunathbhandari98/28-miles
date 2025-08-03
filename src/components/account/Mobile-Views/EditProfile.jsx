import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { updateUser } from "../../../service/userService";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  // Pre-fill formData with current user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await updateUser(user.userId, formData);
      setUser(res); // ✅ Update user context
      toast.success("Profile updated");
      navigate("/my-profile"); // ✅ Optionally redirect back
    } catch (err) {
      toast.error("Update failed. Try again.");
    }
  };

  // Redirect to /my-profile if screen width is ≥ 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        navigate("/my-profile", { replace: true });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
              name="name"
              className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg border border-zinc-800 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg border border-zinc-800 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg border border-zinc-800 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
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
