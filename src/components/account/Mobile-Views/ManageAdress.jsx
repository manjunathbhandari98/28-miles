import { ChevronLeft, Edit3, Home, MapPin, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageAddress = () => {
  const addresses = [
    {
      id: 1,
      type: "Home",
      address: "Street no:34, Mahan nagar, Mysore, Karnataka - India",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex fixed left-0 top-0 w-full justify-between bg-zinc-950 p-4">
        <ChevronLeft onClick={() => navigate(-1)} />
        <h3 className="text-lg">Manage Addresses</h3>
        <div></div>
      </div>
      <div className="text-white px-4 py-6 mt-18 scrollbar-hide space-y-6 md:hidden">
        {/* <h2 className="text-xl font-semibold">Saved Addresses</h2> */}

        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-10 space-y-4 text-gray-400">
            <MapPin size={48} className="text-gray-600" />
            <p className="text-sm">You haven't added any address yet.</p>
            <button className="bg-white text-black px-5 py-2.5 text-sm rounded-lg shadow hover:bg-gray-100 active:scale-[0.98] transition flex items-center gap-2">
              <PlusCircle size={18} />
              Add Address
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex justify-between items-start"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                    {addr.type === "Home" ? (
                      <Home size={16} />
                    ) : (
                      <MapPin size={16} />
                    )}
                    {addr.type}
                  </div>
                  <p className="text-sm text-gray-400">{addr.address}</p>
                </div>
                <button className="text-sm text-blue-400 hover:underline flex items-center gap-1">
                  <Edit3 size={14} />
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAddress;
