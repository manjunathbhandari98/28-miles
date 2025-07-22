import { ChevronRight } from "lucide-react";
import Filterbar from "./Filterbar";

const CollectionGrid = () => {
  return (
    <div className="flex flex-col p-5 montserrat">
      {/* Breadcrumbs */}
      <p className="text-sm uppercase flex pl-4 items-center">
        Home <ChevronRight size={18} className="mb-1" /> Men
      </p>
      <div className="flex gap-5">
        <Filterbar />
        {/* Collections */}
        <div className="p-5 text-2xl">Collectons</div>
      </div>
    </div>
  );
};

export default CollectionGrid;
