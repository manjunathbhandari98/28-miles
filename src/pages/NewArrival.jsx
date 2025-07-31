import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import CollectionGrid from "../components/common/CollectionGrid";
import { fetchNewProducts } from "../service/productService";

const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const MAX_PRODUCTS = 20;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchNewProducts(page, MAX_PRODUCTS);
        setProducts(data.content);
        setTotalPages(data.totalPages);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page]);

  return (
    <div className="w-full h-full m-auto pt-16">
      {loading ? (
        <div className="text-center text-gray-500 text-sm">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-sm">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500 text-sm">
          No products found.
        </div>
      ) : (
        <>
          <CollectionGrid products={products} name={"New Arrivals"} />

          <div
            className={`${
              products.length <= MAX_PRODUCTS ? "p-1" : ""
            } py-4 flex w-full items-center justify-center space-x-4`}
          >
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
              className={`px-4 py-2 text-sm font-medium rounded-full transition duration-200
              ${page === 0 ? "cursor-not-allowed" : " hover:text-pink-600 "}`}
            >
              <ChevronLeft />
            </button>

            <span className="text-sm text-gray-700 font-medium">
              Page <span className="font-semibold">{page + 1}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page + 1 >= totalPages}
              className={`px-4 py-2 text-sm font-medium transition duration-200
              ${
                page + 1 >= totalPages
                  ? "cursor-not-allowed"
                  : " hover:text-pink-500"
              }`}
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewArrival;
