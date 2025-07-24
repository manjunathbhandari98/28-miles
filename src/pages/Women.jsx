import CollectionGrid from "../components/common/CollectionGrid";
import { products } from "../data/products";

const Women = () => {
  const womenItems = products.filter((product) => product.category === "Women");

  return (
    <div className="w-full h-full m-auto pt-16">
      <CollectionGrid products={womenItems} name={"Women"} />
    </div>
  );
};

export default Women;
