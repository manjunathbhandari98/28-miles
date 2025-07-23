import { ArrowLeft, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";

const SearchPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [searchKey, setSearchKey] = useState("");
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col">
      {/* Searchbar */}
      <div className="bg-zinc-900 w-full p-5 flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <ArrowLeft
            onClick={handleBack}
            size={30}
            className="cursor-pointer"
          />
          <input
            ref={inputRef}
            type="text"
            name="search"
            id="search"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search Your Product"
            className="outline-0 border-0 w-full"
          />
        </div>
        <Search className="cursor-pointer" size={20} />
      </div>
      {/* Search Items */}
      {searchKey !== "" && (
        <div className="flex flex-col gap-5 p-5 w-full">
          {filteredProducts.slice(0, 6).map((product) => (
            <Link key={product.id} to={`/product-view/${product.slug}`}>
              <div className="flex gap-2">
                <img src={product.image} alt={product.name} className="w-12" />
                <div className="flex flex-col p-2 gap-2">
                  <h2 className="text-sm cursor-pointer">{product.name}</h2>
                  <p className="text-xs">In {product.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
