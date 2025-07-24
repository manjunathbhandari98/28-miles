import { Heart, Home, Search, ShoppingBag, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname.includes("auth");
  const profileItems = [
    { id: 1, label: "Home", icon: <Home size={22} />, link: "/" },
    { id: 2, label: "Wishlist", icon: <Heart size={22} />, link: "/wishlist" },
    { id: 3, label: "Search", icon: <Search size={22} />, link: "/search" },
    {
      id: 4,
      label: "Cart",
      icon: <ShoppingBag size={22} />,
      link: "/checkout/cart",
    },
    { id: 5, label: "Account", icon: <User size={22} />, link: "/my-profile" },
  ];

  if (isLoginPage) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-zinc-950 border-t border-zinc-800 md:hidden px-4 py-3">
      <div className="flex justify-between items-center">
        {profileItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              navigate(item.link);
            }}
            className="flex flex-col items-center justify-center text-zinc-300 hover:text-white transition-colors duration-200 text-xs"
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
