import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavOptionCard from "../common/NavOptionCard";

const Navbar = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null); // "Men", "Women", or null

  // Dummy dropdown content
  const dropdownContent = {
    Men: ["T-Shirts", "Shirts", "Jeans", "Shoes"],
    Women: ["Tops", "Dresses", "Heels", "Accessories"],
  };
  const dropdownImages = {
    Men: ["/gallery-1.jpg", "/gallery-2.jpg"],
    Women: ["/gallery-4.jpg", "/gallery-5.jpg"],
  };

  const navItems = [
    { id: 1, item: "New Arrivals", link: "/new-arrivals" },
    { id: 2, item: "Men", link: "/collection-men" },
    { id: 3, item: "Women", link: "/collection-women" },
    { id: 4, item: "Shop All", link: "/collection-all" },
    { id: 5, item: "About Us", link: "/about-us" },
  ];

  return (
    <div className="relative flex gap-5 font-semibold text-lg items-center">
      {navItems.map((item) => {
        const hasDropdown = item.item === "Men" || item.item === "Women";

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => hasDropdown && setHovered(item.item)}
            onMouseLeave={() => hasDropdown && setHovered(null)}
          >
            {/* Nav Item */}
            <div
              className="cursor-pointer hover:text-amber-300"
              onClick={() => navigate(item.link)}
            >
              {item.item}
            </div>

            {/* Dropdown for Men/Women */}
            {hovered === item.item && (
              <div
                className="fixed left-1/2 top-19 -translate-x-1/2 z-50"
                onMouseEnter={() => setHovered(item.item)}
                onMouseLeave={() => setHovered(null)}
              >
                <NavOptionCard
                  items={dropdownContent[item.item]}
                  images={dropdownImages[item.item]}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
