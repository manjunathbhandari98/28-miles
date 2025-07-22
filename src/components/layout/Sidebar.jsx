import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  const navItems = [
    { id: 1, item: "New Arrivals", link: "/new-arrivals" },
    { id: 2, item: "Men", link: "/men" },
    { id: 3, item: "Women", link: "/women" },
    { id: 4, item: "Shop All", link: "/all" },
    { id: 5, item: "About Us", link: "/about-us" },
  ];

  // Freeze background scroll when sidebar is open
  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  // Close sidebar when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {/* Hamburger Icon */}
      <div className="md:hidden p-4 fixed top-0 left-0 z-50">
        <Menu onClick={() => setOpen(true)} className={`${open && "hidden"}`} />
      </div>

      {/* Backdrop and Sidebar */}
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
          className={`absolute top-0 left-0 h-full w-[80%] max-w-xs bg-black text-white p-6 transition-transform duration-300 transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <img src="/user.png" alt="user" className="w-10 h-10" />
              <div className="flex flex-col">
                Hey There
                <div className="flex">
                  <p className="text-sm text-blue-400">Login</p>
                  <p className="text-sm text-blue-400 mx-1">/</p>
                  <p className="text-sm text-blue-400">Signup</p>
                </div>
              </div>
            </div>
            <X
              size={18}
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-5 mt-8">
            <h3 className="text-gray-300/60 uppercase text-sm">Shop In</h3>
            {navItems.map((item) => (
              <div key={item.id} className="cursor-pointer">
                {item.item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
