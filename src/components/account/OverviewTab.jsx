/* eslint-disable no-unused-vars */
import { Pencil, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { updateUser } from "../../service/userService";
import InputBox from "../ui/InputBox";

const OverviewTab = ({ name, phone, email, edit, setEdit }) => {
  const [formData, setFormData] = useState({ name, phone, email });
  const { user, setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await updateUser(user.userId, formData);
      toast.success("Profile updated");
      setUser(res);
      setEdit(false);
    } catch (err) {
      toast.error("Update failed. Try again.");
    }
  };

  return (
    <div className="hidden md:block max-w-2xl mx-auto mt-26 p-8 rounded-lg border border-zinc-700 shadow-md space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-wide text-zinc-200 drop-shadow-sm">
          Account Overview
        </h2>
        <button
          onClick={() => (edit ? handleSave() : setEdit(true))}
          className="flex items-center gap-2 px-5 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 text-white rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-600"
          aria-label={edit ? "Save profile" : "Edit profile"}
        >
          {edit ? <Save size={18} /> : <Pencil size={18} />}
          {edit ? "Save" : "Edit"}
        </button>
      </div>

      {/* Profile Info / Form */}
      <div className="flex flex-col gap-6">
        {!edit ? (
          <>
            {/** Display each item in a flex spaced pair */}
            <div className="flex justify-between border-b border-zinc-700 pb-3">
              <p className="text-zinc-500 font-medium tracking-wide">
                Full Name
              </p>
              <p className="text-zinc-300 truncate max-w-[60%] text-right">
                {user.name}
              </p>
            </div>
            <div className="flex justify-between border-b border-zinc-700 pb-3">
              <p className="text-zinc-500 font-medium tracking-wide">Phone</p>
              <p className="text-zinc-300 truncate max-w-[60%] text-right">
                {user.phone}
              </p>
            </div>
            <div className="flex justify-between border-b border-zinc-700 pb-3">
              <p className="text-zinc-500 font-medium tracking-wide">Email</p>
              <p className="text-zinc-300 truncate max-w-[60%] text-right">
                {user.email}
              </p>
            </div>
          </>
        ) : (
          <>
            <InputBox
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoFocus
              className="bg-transparent border-b border-zinc-600 focus:border-zinc-400 text-zinc-200"
            />
            <InputBox
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="bg-transparent border-b border-zinc-600 focus:border-zinc-400 text-zinc-200"
            />
            <InputBox
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border-b border-zinc-600 focus:border-zinc-400 text-zinc-200"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;
