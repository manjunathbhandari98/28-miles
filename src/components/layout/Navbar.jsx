import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoriesByGender } from "../../service/categoryService";
import NavOptionCard from "../common/NavOptionCard";

const Navbar = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null); // "Men", "Women", or null

  const [menCategory, setMenCategory] = useState([]);
  const [womenCategory, setWomenCategory] = useState([]);

  useEffect(() => {
    const fetchMenCategory = async () => {
      const res = await getCategoriesByGender("Men");
      setMenCategory(res || []);
    };
    const fetchWomenCategory = async () => {
      const res = await getCategoriesByGender("Women");
      setWomenCategory(res || []);
    };
    fetchMenCategory();
    fetchWomenCategory();
  }, []);

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
        const isDropdown = item.item === "Men" || item.item === "Women";
        const categories =
          item.item === "Men"
            ? menCategory
            : item.item === "Women"
            ? womenCategory
            : [];

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => isDropdown && setHovered(item.item)}
            onMouseLeave={() => isDropdown && setHovered(null)}
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
                  onClick={(index) =>
                    navigate(`/products/${categories[index].slug}`)
                  }
                  items={categories.map((cat) => cat.name)}
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
