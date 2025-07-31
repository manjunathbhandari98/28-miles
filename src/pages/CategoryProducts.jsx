import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionGrid from "../components/common/CollectionGrid";
import { getCategoriesBySlug } from "../service/categoryService";
import { fetchProducts } from "../service/productService";

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryName, setCategoryName] = useState();
  const MAX_PRODUCTS = 20;
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    const loadCategoryInfo = async () => {
      try {
        const data = await getCategoriesBySlug(slug);
        setCategoryName(data.name);
      } catch (error) {
        console.error(error);
      }
    };

    const loadProducts = async () => {
      try {
        const data = await fetchProducts(page, MAX_PRODUCTS, "", slug);
        setProducts(data.content);

        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
    loadCategoryInfo();
  }, [page, slug]);

  return (
    <div className="w-full h-full m-auto pt-16">
      <CollectionGrid products={products} name={categoryName} />
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
        page + 1 >= totalPages ? "cursor-not-allowed" : " hover:text-pink-500"
      }`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CategoryProducts;
