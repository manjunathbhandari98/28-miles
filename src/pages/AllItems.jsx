import CollectionGrid from "../components/common/CollectionGrid";
import { products } from "../data/products";

const AllItems = () => {
  return (
    <div className="w-full h-full m-auto pt-16">
      <CollectionGrid products={products} />
    </div>
  );
};

export default AllItems;
