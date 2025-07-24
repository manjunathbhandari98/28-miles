import {
  BadgeInfo,
  ChevronRight,
  Info,
  LogOut,
  MapPin,
  Shirt,
  SquareChartGantt,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressesTab from "../components/account/AddressTab";
import HelpSupportTab from "./../components/account/HelpSupportTab";
import OrdersTab from "./../components/account/OrdersTab";
import OverviewTab from "./../components/account/OverviewTab";

const Account = () => {
  const navigate = useNavigate();

  const tabs = [
    { title: "Overview", icon: <SquareChartGantt size={18} /> },
    { title: "Orders", icon: <Shirt size={18} /> },
    { title: "Addresses", icon: <MapPin size={18} /> },
    { title: "Help & Support", icon: <BadgeInfo size={18} /> },
    { title: "Logout", icon: <LogOut size={18} color="red" /> },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("Amar");
  const [phone, setPhone] = useState("987654321");
  const [email, setEmail] = useState("amar@mail.com");

  return (
    <>
      {/* Desktop View */}
      <div className="md:block hidden pt-30">
        <div className="flex justify-between items-center p-4 rounded-2xl bg-black/30 backdrop-blur-sm shadow-lg w-full ">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex gap-3 items-center px-5 py-4 mb-3 rounded-xl cursor-pointer transition-all duration-300
            ${
              activeTab === index
                ? "bg-white/10 border border-white/30 shadow-inner scale-[1.02] last:scale-[1] last:bg-transparent last:border-none"
                : "hover:bg-white/5 hover:scale-[1.01] last:hover:bg-transparent"
            }`}
            >
              <div
                className={`text-xl ${
                  activeTab === index ? "text-white" : "text-gray-400"
                }`}
              >
                {tab.icon}
              </div>
              <h3
                className={`text-base uppercase font-semibold tracking-wide transition-all ${
                  activeTab === index
                    ? "text-white last:text-gray-400"
                    : "text-gray-400"
                }`}
              >
                {tab.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="w-full p-6 bg-black/20 rounded-2xl shadow-inner backdrop-blur">
          {activeTab === 0 && (
            <OverviewTab
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              edit={edit}
              setEdit={setEdit}
            />
          )}
          {activeTab === 1 && <OrdersTab />}
          {activeTab === 2 && <AddressesTab />}
          {activeTab === 3 && <HelpSupportTab />}
          {activeTab === 4 && <div>Logout</div>}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col m-2 pt-16 h-[80vh] overflow-hidden">
        {/* User Info */}
        <div className="flex items-center justify-between bg-zinc-900/90 backdrop-blur-md p-4 rounded-xl shadow-lg">
          <div className="flex gap-3 items-center">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-yellow-400 text-black text-xl font-bold shadow-sm">
              A
            </div>
            <div className="flex flex-col">
              <h2 className="text-gray-100 font-semibold text-lg">Amar</h2>
              <p className="text-gray-400 text-sm">amar@mail.com</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/manage-profile")}
            className="text-blue-500 text-sm font-medium hover:underline"
          >
            Edit
          </button>
        </div>

        {/* Action Panel */}
        <div className="flex flex-col justify-between bg-zinc-900/90 backdrop-blur-lg rounded-xl mt-4 p-4 shadow-xl h-full">
          <div className="flex flex-col gap-4 divide-y divide-zinc-800">
            {/* Item */}
            <div
              onClick={() => navigate("/manage-orders")}
              className="flex justify-between items-center py-4 hover:bg-zinc-800/40 px-2 rounded transition"
            >
              <div className="flex gap-3 items-center text-gray-200">
                <Shirt size={20} className="text-yellow-400" />
                <span className="text-sm font-medium">Manage Orders</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>

            <div
              onClick={() => navigate("/manage-address")}
              className="flex justify-between items-center py-4 hover:bg-zinc-800/40 px-2 rounded transition"
            >
              <div className="flex gap-3 items-center text-gray-200">
                <MapPin size={20} className="text-green-400" />
                <span className="text-sm font-medium">Manage Your Address</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>

            <div
              onClick={() => navigate("/help-and-support")}
              className="flex justify-between items-center py-4 hover:bg-zinc-800/40 px-2 rounded transition"
            >
              <div className="flex gap-3 items-center text-gray-200">
                <Info size={20} className="text-blue-400" />
                <span className="text-sm font-medium">Help and Support</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </div>

          {/* Logout */}
          <button className="flex items-center justify-center gap-2 mt-6 bg-red-500/10 text-red-400 border border-red-500/30 font-semibold text-sm rounded py-3 px-6 shadow-sm">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;
