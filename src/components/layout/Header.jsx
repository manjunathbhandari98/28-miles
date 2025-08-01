import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchPage from "../../pages/Search";
import { useCart } from "./../../hooks/useCart";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";

const Header = () => {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const isSearchRoute = location.pathname.includes("search");
  const isCheckoutPage = location.pathname.includes("checkout");
  const isLoginPage = location.pathname.includes("auth");

  const { cartItems } = useCart();

  if (isCheckoutPage) return null;

  if (isSearchRoute) return <SearchPage />;

  if (isLoginPage) return null;

  return (
    <div className="fixed flex flex-col top-0 left-0 w-full z-50">
      <AnnouncementBar hidden={hidden} setHidden={setHidden} />
      <div
        className={`hidden ${
          hidden ? "top-0" : "top-5"
        } left-0 z-50 w-full shadow-md bg-zinc-950 md:flex items-center justify-between px-6 py-3`}
      >
        <img
          src="/28Miles2.png"
          className="w-24 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div>
          <Navbar />
        </div>
        <div className="flex gap-5 cursor-pointer items-start p-3">
          <Search size={20} onClick={() => navigate("/search")} />
          <div
            className="relative cursor-pointer group"
            onClick={() => navigate("/checkout/cart")}
          >
            <div className="absolute -top-3 -right-2 bg-red-600 text-white text-[10px] font-semibold h-5 w-5 flex items-center justify-center rounded-full shadow-md group-hover:scale-110 transition">
              {cartItems.length}
            </div>
            <ShoppingBag size={24} />
          </div>

          <Heart size={20} onClick={() => navigate("/wishlist")} />
          <User size={20} onClick={() => navigate("/my-profile")} />
        </div>
      </div>
    </div>
  );
};

export default Header;
