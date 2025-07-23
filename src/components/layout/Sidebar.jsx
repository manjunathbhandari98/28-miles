import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const navItems = [
    { id: 1, item: "New Arrivals", link: "/new-arrivals" },
    { id: 2, item: "Men", link: "/collection-men" },
    { id: 3, item: "Women", link: "/collection-women" },
    { id: 4, item: "Shop All", link: "/collection-all" },
    { id: 5, item: "About Us", link: "/about-us" },
  ];

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleNavigate = (link) => {
    navigate(link);
    setOpen(false);
  };

  const location = useLocation();
  const isSearchRoute = location.pathname.includes("search");
  const isCartRoute = location.pathname.includes("cart");

  if (isSearchRoute) return null;

  if (isCartRoute) return null;

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden flex bg-zinc-950 justify-between items-center w-full px-4 py-3 fixed top-0 left-0 shadow-md z-50">
        <Menu
          onClick={() => setOpen(true)}
          className={`${open && "hidden"}  cursor-pointer`}
        />
        <img
          src="/28Miles2.png"
          alt="logo"
          className={`w-14 ${open && "hidden"}`}
        />
        <div />
      </div>

      {/* Sidebar & Backdrop */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`absolute top-0 left-0 h-full w-[80%] max-w-xs bg-gradient-to-b from-zinc-950 to-zinc-900 text-white p-6 shadow-2xl transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-3 items-center">
              <img
                src="/user.png"
                alt="user"
                className="w-10 h-10 rounded-full border border-white"
              />
              <div>
                <p className="text-sm text-gray-200">Hey There</p>
                <div className="flex gap-1 text-xs text-blue-400">
                  <p className="cursor-pointer hover:underline">Login</p>
                  <span>/</span>
                  <p className="cursor-pointer hover:underline">Signup</p>
                </div>
              </div>
            </div>
            <div onClick={() => setOpen(false)} className="p-5">
              <X size={20} />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-5">
            <h3 className="text-gray-400 uppercase text-xs tracking-wide">
              Shop In
            </h3>
            {navItems.map((nav) => (
              <div
                key={nav.id}
                onClick={() => handleNavigate(nav.link)}
                className="text-base font-medium py-1 px-2 rounded-md hover:bg-white/10 cursor-pointer transition"
              >
                {nav.item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
