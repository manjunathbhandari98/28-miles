import { ArrowUpAZ, ChevronRight, SlidersVertical } from "lucide-react";
import ProductCard from "./ProductCard";

const CollectionGrid = ({ products }) => {
  return (
    <div className="flex flex-col md:px-4 px-1 sm:py-6 sm:px-6 lg:px-8 w-full montserrat">
      {/* Breadcrumbs */}
      <p className="text-sm hidden uppercase md:flex items-center gap-1 mb-4 text-gray-300">
        Home <ChevronRight size={18} className="mb-0.5" /> Men
      </p>

      <div className="flex flex-col gap-5 w-full">
        {/* Collection Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Mobile View */}
          <div className="flex sm:hidden w-full justify-between px-4 items-center">
            <div className="flex gap-3 items-center">
              <h2 className="text-sm font-semibold">Collections</h2>
              <p className="text-sm text-gray-400">345 Products</p>
            </div>
            <div className="sm:hidden flex">
              <SlidersVertical size={18} />
            </div>
          </div>
          {/* Desktop view */}
          <div className="sm:flex hidden gap-3 items-center">
            <h2 className="text-2xl font-semibold">Collections</h2>
            <p className=":text-lg text-gray-400">345 Products</p>
          </div>
          {/* Filter Bar */}
          {/* Desktop Filter bar */}
          <div className="border border-gray-600 p-2 sm:flex hidden items-center gap-2 rounded-md text-sm cursor-pointer">
            <ArrowUpAZ />
            <span className="text-gray-300 ">Sort by:</span>
            <p>Popularity</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-5 gap-0.5">
          {products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionGrid;
