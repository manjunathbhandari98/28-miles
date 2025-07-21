import { Heart, Search, ShoppingBag, User } from "lucide-react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="flex p-2 items-center justify-between">
      <img src="/28Miles.jpeg" className="w-24" />
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
