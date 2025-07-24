import { Edit3, Home, MapPin, PlusCircle } from "lucide-react";

const AddressesTab = () => {
  const addresses = []; // Empty list

  return (
    <div className="text-white space-y-6">
      <h2 className="text-xl font-semibold">Saved Addresses</h2>

      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-10 space-y-2 text-gray-400">
          <MapPin size={40} />
          <p>No saved addresses.</p>
          <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 flex items-center gap-2">
            <PlusCircle size={18} />
            Add Address
          </button>
        </div>
      ) : (
        addresses.map((addr) => (
          <div
            key={addr.id}
            className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start justify-between"
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
        ))
      )}
    </div>
  );
};

export default AddressesTab;
