import { useState } from "react";
import { toast } from "react-hot-toast";
// import { updateUser } from "../../services/userService";
import InputBox from "../ui/InputBox";

const OverviewTab = ({ name, phone, email, edit, setEdit }) => {
  const [formData, setFormData] = useState({ name, phone, email });
  // const { setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // const updatedUser = await updateUser(formData);
      toast.success("Profile updated");
      // setUser(updatedUser); // update in context
      setEdit(false);
    } catch (err) {
      toast.error("Update failed. Try again.");
      throw new err();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Account Overview</h2>
        <button
          onClick={() => (edit ? handleSave() : setEdit(true))}
          className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-gray-200 font-semibold"
        >
          {edit ? "Save" : "Edit"}
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {!edit ? (
          <>
            <h2 className="text-lg">
              <span className="font-medium text-gray-400">Full Name:</span>{" "}
              {formData.name}
            </h2>
            <h2 className="text-lg">
              <span className="font-medium text-gray-400">Phone:</span>{" "}
              {formData.phone}
            </h2>
            <h2 className="text-lg">
              <span className="font-medium text-gray-400">Email:</span>{" "}
              {formData.email}
            </h2>
          </>
        ) : (
          <>
            <InputBox
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputBox
              label="Phone Number"
              name="phone"
              type="number"
              value={formData.phone}
              onChange={handleChange}
            />
            <InputBox
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;
