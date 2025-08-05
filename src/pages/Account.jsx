import {
  BadgeInfo,
  ChevronRight,
  Info,
  LogOut,
  MapPin,
  Shirt,
  SquareChartGantt,
  X,
} from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressesTab from "../components/account/AddressTab";
import HelpSupportTab from "../components/account/HelpSupportTab";
import OrdersTab from "../components/account/OrdersTab";
import OverviewTab from "../components/account/OverviewTab";
import AddressModalPage from "../components/ui/AddressModal";
import LoadingPage from "../components/ui/LoadingPage";
import { AddressModalContext } from "../context/AddressModalContext";
import { useAuth } from "../hooks/useAuth";

const Account = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout from context
  const [edit, setEdit] = useState(false);
  const { user } = useAuth();
  const { addressModalOpen } = useContext(AddressModalContext);

  const [logoutConfirmationModalOpen, setLogoutConfirmationModalOpen] =
    useState(false);

  const storedTab = parseInt(sessionStorage.getItem("activeAccountTab"));
  const [activeTab, setActiveTab] = useState(isNaN(storedTab) ? 0 : storedTab); // Load stored tab if exists

  const handleTabClick = (index) => {
    setActiveTab(index);
    sessionStorage.setItem("activeAccountTab", index); // Save selected tab
  };

  const tabs = [
    {
      title: "Overview",
      icon: <SquareChartGantt size={18} />,
      onClick: () => handleTabClick(0),
    },
    {
      title: "Orders",
      icon: <Shirt size={18} />,
      onClick: () => handleTabClick(1),
    },
    {
      title: "Addresses",
      icon: <MapPin size={18} />,
      onClick: () => handleTabClick(2),
    },
    {
      title: "Help & Support",
      icon: <BadgeInfo size={18} />,
      onClick: () => handleTabClick(3),
    },
    {
      title: "Logout",
      icon: <LogOut size={18} color="red" />,
      onClick: () => setLogoutConfirmationModalOpen(true),
    },
  ];

  const confirmLogout = () => {
    sessionStorage.removeItem("activeAccountTab");
    logout();
    navigate("/");
  };

  if (!user) return <LoadingPage />;

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex w-full h-screen pt-20 rounded-3xl shadow-lg overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 h-screen border-gray-300 flex flex-col py-14 px-6 bg-zinc-950">
          <h2 className="text-2xl font-semibold mb-8 text-gray-300 tracking-wide">
            My Account
          </h2>

          <nav className="flex flex-col space-y-3">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={tab.onClick}
                className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-colors duration-300 focus:outline-none
            ${
              activeTab === index
                ? "bg-black text-white shadow-md"
                : "text-gray-300 hover:bg-black"
            }`}
                aria-current={activeTab === index ? "page" : undefined}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-md font-medium">{tab.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-10 py-6 overflow-auto">
          {activeTab === 0 && (
            <OverviewTab
              name={user.name}
              phone={user.phone}
              email={user.email}
              edit={edit}
              setEdit={setEdit}
            />
          )}
          {activeTab === 1 && <OrdersTab />}
          {activeTab === 2 && <AddressesTab />}
          {activeTab === 3 && <HelpSupportTab />}
        </main>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col m-2 pt-16 h-[80vh] overflow-hidden">
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

        <div className="flex flex-col justify-between bg-zinc-900/90 backdrop-blur-lg rounded-xl mt-4 p-4 shadow-xl h-full">
          <div className="flex flex-col gap-4 divide-y divide-zinc-800">
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

          <button
            onClick={() => setLogoutConfirmationModalOpen(true)}
            className="flex items-center justify-center gap-2 mt-6 bg-red-500/10 text-red-400 border border-red-500/30 font-semibold text-sm rounded py-3 px-6 shadow-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      {logoutConfirmationModalOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-6 w-11/12 max-w-md text-center">
            <button
              onClick={() => setLogoutConfirmationModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-white text-lg font-semibold mb-6">
              Are you sure you want to logout?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setLogoutConfirmationModalOpen(false)}
                className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {addressModalOpen && <AddressModalPage user={user} />}
    </>
  );
};

export default Account;
