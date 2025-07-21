const Navbar = () => {
  const navItems = [
    { id: 1, item: "New Arrivals", link: "/new-arrivals" },
    { id: 1, item: "Men", link: "/men" },
    { id: 1, item: "Women", link: "/women" },
    { id: 1, item: "Shop All", link: "/all" },
    { id: 1, item: "About Us", link: "/about-us" },
  ];

  return (
    <div className="flex gap-5 font-semibold text-lg items-center ">
      {navItems.map((item) => (
        <div key={item.id} className="cursor-pointer hover:text-amber-300">
          {item.item}
        </div>
      ))}
    </div>
  );
};
export default Navbar;
