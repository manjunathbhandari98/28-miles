import CollectionGrid from "../components/common/CollectionGrid";
import { products } from "../data/products";

const Men = () => {
  const menItems = products.filter((product) => product.category === "Men");

  return (
    <div className="w-full h-full m-auto pt-16">
      <CollectionGrid products={menItems} />
    </div>
  );
};

export default Men;
