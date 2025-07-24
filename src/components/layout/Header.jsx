import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchPage from "../../pages/Search";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";

const Header = () => {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const isSearchRoute = location.pathname.includes("search");
  const isCartPage = location.pathname.includes("checkout/cart");
  const isLoginPage = location.pathname.includes("auth");

  if (isCartPage) return null;

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
          <ShoppingBag size={20} onClick={() => navigate("/checkout/cart")} />
          <Heart size={20} onClick={() => navigate("/wishlist")} />
          <User size={20} onClick={() => navigate("/auth/login")} />
        </div>
      </div>
    </div>
  );
};

export default Header;
