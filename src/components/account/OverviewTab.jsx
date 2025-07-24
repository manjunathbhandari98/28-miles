import InputBox from "../ui/InputBox";

const OverviewTab = ({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  edit,
  setEdit,
}) => {
  const handleSave = () => setEdit(false);

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
              {name}
            </h2>
            <h2 className="text-lg">
              <span className="font-medium text-gray-400">Phone:</span> {phone}
            </h2>
            <h2 className="text-lg">
              <span className="font-medium text-gray-400">Email:</span> {email}
            </h2>
          </>
        ) : (
          <>
            <InputBox
              label="Full Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputBox
              label="Phone Number"
              name="phone"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <InputBox
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;
