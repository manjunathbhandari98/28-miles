import CollectionGrid from "../components/common/CollectionGrid";
import { products } from "./../data/products";

const NewArrival = () => {
  const NewArrivals = products.filter((p) => p.newArrival);

  return (
    <div className="w-full h-full m-auto pt-16">
      <CollectionGrid products={NewArrivals} name={"New Arrivals"} />
    </div>
  );
};

export default NewArrival;
