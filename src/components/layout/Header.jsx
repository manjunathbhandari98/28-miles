import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed hidden top-5 left-0 z-50 w-full shadow-md bg-zinc-950 md:flex items-center justify-between px-6 py-3">
      <img
        src="/28Miles2.png"
        className="w-24 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div>
        <Navbar />
      </div>
      <div className="flex gap-5 cursor-pointer items-start p-3">
        <Search size={20} />
        <ShoppingBag size={20} />
        <Heart size={20} />
        <User size={20} />
      </div>
    </div>
  );
};

export default Header;
