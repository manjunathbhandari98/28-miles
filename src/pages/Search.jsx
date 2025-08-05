import { ArrowLeft, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts } from "../service/productService";

const SearchPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [searchKey, setSearchKey] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.content);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchKey.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchKey.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchKey.toLowerCase()) ||
      product.gender.toLowerCase().includes(searchKey.toLowerCase())
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
            className="outline-0 border-0 w-full bg-transparent text-white"
          />
        </div>
        <Search className="cursor-pointer" size={20} />
      </div>

      {/* Search Items */}
      {searchKey !== "" && (
        <div className="flex flex-col gap-5 p-5 w-full">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex gap-2 animate-pulse items-center"
                >
                  <div className="w-12 h-12 bg-zinc-800 rounded-md" />
                  <div className="flex flex-col gap-2">
                    <div className="w-40 h-4 bg-zinc-800 rounded" />
                    <div className="w-24 h-3 bg-zinc-700 rounded" />
                  </div>
                </div>
              ))
            : filteredProducts.slice(0, 6).map((product) => (
                <Link key={product.id} to={`/product-view/${product.slug}`}>
                  <div className="flex gap-2">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex flex-col p-2 gap-2">
                      <h2 className="text-sm cursor-pointer">{product.name}</h2>
                      <p className="text-xs text-gray-400">
                        In {product.categoryName}
                      </p>
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
