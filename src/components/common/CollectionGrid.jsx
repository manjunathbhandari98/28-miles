import { ArrowUpAZ, SlidersVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LoadingPage from "../ui/LoadingPage";
import ProductCard from "./ProductCard";

const CollectionGrid = ({ products, name, loading }) => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

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

  const [selectedFilters, setSelectedFilters] = useState({
    gender: [],
    category: [],
    size: [],
    color: [],
    sleeve: [],
    rating: [],
  });

  const genders = [...new Set(products.map((p) => p.gender))];
  const categories = [...new Set(products.map((p) => p.categoryName))];
  const sizes = [...new Set(products.flatMap((product) => product.sizes))];
  const colors = [...new Set(products.flatMap((p) => p.colors))];
  const sleeves = [
    ...new Set(products.map((p) => p.productFeatures?.sleeve).filter(Boolean)),
  ];

  const ratings = [
    { label: "4.5 And above", value: 4.5 },
    { label: "4 And above", value: 4 },
    { label: "3.5 And above", value: 3.5 },
    { label: "3 And above", value: 3 },
    { label: "2 And above", value: 2 },
    { label: "1 And above", value: 1 },
  ];

  const [items, setItems] = useState([]);
  const [sortOption, setSortOption] = useState("popularity");

  const handleFilterChange = (type, value, checked) => {
    setSelectedFilters((prev) => {
      const updated = checked
        ? [...prev[type], value]
        : prev[type].filter((v) => v !== value);

      return { ...prev, [type]: updated };
    });
  };

  useEffect(() => {
    let filtered = [...products];

    if (selectedFilters.gender.length) {
      filtered = filtered.filter((p) =>
        selectedFilters.gender.includes(p.gender)
      );
    }

    if (selectedFilters.category.length) {
      filtered = filtered.filter((p) =>
        selectedFilters.category.includes(p.categoryName)
      );
    }

    if (selectedFilters.size.length) {
      filtered = filtered.filter((product) =>
        product.sizes.some((s) => selectedFilters.size.includes(s))
      );
    }

    if (selectedFilters.color.length) {
      filtered = filtered.filter((product) =>
        product.colors.some((s) => selectedFilters.color.includes(s))
      );
    }

    if (selectedFilters.sleeve.length) {
      filtered = filtered.filter((p) =>
        selectedFilters.sleeve.includes(p.productFeatures?.sleeve)
      );
    }

    if (selectedFilters.rating.length) {
      const minThreshold = Math.min(
        ...selectedFilters.rating
          .map((r) => parseFloat(r))
          .filter((n) => !isNaN(n))
      );
      filtered = filtered.filter((p) => p.rating >= minThreshold);
    }

    setItems(filtered);
  }, [selectedFilters, products]);

  useEffect(() => {
    setItems(products);
  }, [products]);

  const handleSortChange = (value) => {
    setSortOption(value);

    const sortedProducts = [...products];

    switch (value) {
      case "low-to-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Popularity (default) — you can use sales, views, etc.
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    setItems(sortedProducts);
  };

  const handleFilterClear = () => {
    setSelectedFilters({
      gender: [],
      category: [],
      size: [],
      color: [],
      sleeve: [],
      rating: [],
    });
  };

  if (loading || !items) return <LoadingPage />;

  return (
    <>
      <div className="flex flex-col md:pt-20 md:px-4 px-2 py-6 w-full montserrat">
        {/* Breadcrumb */}
        {/* <p className="text-sm hidden uppercase md:flex items-center gap-1 mb-4 text-gray-300">
          Home <ChevronRight size={18} className="mb-0.5" /> Men
        </p> */}

        <div className="flex flex-col gap-5 w-full">
          {/* Collection Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Desktop */}
            <div className="hidden sm:flex gap-3 items-center">
              <h2 className="text-2xl font-semibold">{name}</h2>
              <p className="text-lg text-gray-400">{items.length} Products</p>
            </div>

            {/* Filter + Sort */}
            <div className="flex gap-4 items-center">
              {/* Filter Button */}
              <div
                onClick={() => setOpen(true)}
                className="border border-gray-600 p-2 flex items-center gap-2 rounded-md text-sm cursor-pointer"
              >
                <SlidersVertical />
                <p>Filter</p>
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex items-center gap-2 border border-gray-600 rounded-md p-3 text-sm text-gray-300">
                <ArrowUpAZ size={16} />
                <span className="whitespace-nowrap">Sort By:</span>

                <select
                  className="bg-transparent text-sm text-gray-300 cursor-pointer appearance-none outline-none ml-2"
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option hidden value="popularity">
                    Popularity
                  </option>
                  <option value="popularity" className="bg-zinc-900 text-white">
                    Popularity
                  </option>
                  <option
                    value="low-to-high"
                    className="bg-zinc-900 text-white"
                  >
                    Price: Low to High
                  </option>
                  <option
                    value="high-to-low"
                    className="bg-zinc-900 text-white"
                  >
                    Price: High to Low
                  </option>
                  <option value="newest" className="bg-zinc-900 text-white">
                    Newest First
                  </option>
                  <option value="rating" className="bg-zinc-900 text-white">
                    Customer Rating
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {items.map((item) => (
              <ProductCard key={item.productId} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
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
          className={`absolute top-0 right-0 h-full w-[80%] max-w-xs bg-zinc-900 text-white shadow-2xl transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col pb-20 gap-4 p-4 overflow-y-auto scrollbar-hide h-full border-l border-zinc-700">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-500/30 pb-2">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={handleFilterClear}
                className="text-blue-400 hover:underline text-sm"
              >
                Clear All
              </button>
            </div>

            {/* Filter Sections */}
            {/* <PriceSlider /> */}
            <FilterSection
              title="Gender"
              options={genders}
              type="fill"
              filterKey="gender"
              onChange={handleFilterChange}
              selectedFilters={selectedFilters}
            />

            <FilterSection
              title="Category"
              options={categories}
              filterKey="category"
              onChange={handleFilterChange}
              selectedFilters={selectedFilters}
            />

            <FilterSection
              title="Size"
              options={sizes}
              type="pill"
              filterKey="size"
              onChange={handleFilterChange}
              selectedFilters={selectedFilters}
            />

            <ColorFilter
              colors={colors}
              onChange={handleFilterChange}
              filterKey="color"
              selectedFilters={selectedFilters}
            />

            <FilterSection
              title="Sleeve"
              options={sleeves}
              filterKey="sleeve"
              onChange={handleFilterChange}
              selectedFilters={selectedFilters}
            />

            <FilterSection
              title="Ratings"
              options={ratings}
              type="rating"
              filterKey="rating"
              onChange={handleFilterChange}
              selectedFilters={selectedFilters}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Subcomponents
const FilterSection = ({
  title,
  options,
  type = "checkbox",
  onChange,
  filterKey,
  selectedFilters,
}) => {
  return (
    <div>
      <h4 className="text-sm font-medium uppercase text-gray-300 mb-2">
        {title}
      </h4>

      <div className={`${type === "pill" ? "flex gap-2 flex-wrap " : ""}`}>
        {options.map((opt, i) => {
          const value = typeof opt === "object" ? opt.value : opt;
          const label = typeof opt === "object" ? opt.label : opt;

          return type === "pill" ? (
            <label
              key={i}
              className={`border border-gray-500 px-2 py-1 rounded text-sm cursor-pointer transition
                ${
                  selectedFilters[filterKey]?.includes(value)
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
            >
              <input
                type="checkbox"
                value={value}
                className="sr-only"
                checked={selectedFilters[filterKey]?.includes(value) || false}
                onChange={(e) => onChange(filterKey, value, e.target.checked)}
              />
              {label}
            </label>
          ) : (
            <label
              key={i}
              className="flex items-center gap-3 mb-1 cursor-pointer"
            >
              <input
                type="checkbox"
                value={value}
                className="my-1.5"
                checked={selectedFilters[filterKey]?.includes(value) || false}
                onChange={(e) => onChange(filterKey, value, e.target.checked)}
              />
              <span className="text-md">{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

const ColorFilter = ({ colors, onChange, filterKey, selectedFilters }) => (
  <div>
    <h4 className="text-sm font-medium uppercase text-gray-300 mb-2">Color</h4>
    <div className="flex gap-2 flex-wrap">
      {colors.map((color, idx) => (
        <label key={idx} title={color}>
          <input
            type="checkbox"
            value={color}
            checked={selectedFilters[filterKey]?.includes(color) || false}
            onChange={(e) => onChange(filterKey, color, e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-7 h-7 rounded-full relative flex items-center justify-center
      cursor-pointer transition-transform hover:scale-110
      ${
        selectedFilters[filterKey]?.includes(color)
          ? "ring-2 ring-offset-2 ring-white"
          : "ring-1 ring-zinc-700"
      }`}
            style={{ backgroundColor: color }}
          >
            {selectedFilters[filterKey]?.includes(color) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </label>
      ))}
    </div>
  </div>
);

export default CollectionGrid;
