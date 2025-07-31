// src/components/collection/LookbookWall.jsx
import Masonry from "react-masonry-css";
import { useState } from 'react';
import { useEffect } from 'react';
import { getCategories } from './../../service/categoryService';
import { useNavigate } from 'react-router-dom';


const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 2,
};


const LookbookWall = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    const fetchCategories = async() =>{
      const res = await getCategories();
      setCategories(res);
    }

    fetchCategories();
  },[])


  return (
    <div className="px-4 md:px-8 py-10 bg-black text-white">
      {/* <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-wide text-center">
        The Lookbook
      </h2> */}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4 cursor-pointer"
        columnClassName="my-masonry-grid_column"
      >
        {categories.map((item, index) => (
          <div
            onClick = {() => navigate(`products/${item.slug}`)}
            key={index}
            className="mb-4 bitcount rounded hover:scale-105 transition duration-300 ease-in-out flex flex-col overflow-hidden"
          >
            <img
              src={item.imageUrl}
              alt={`Look ${index + 1}`}
              className="w-full rounded-t-lg"
            />
            <div className="bg-[#9bb367] rounded-b-lg flex flex-col gap-3 p-5 justify-center items-center">
              <h1 className="text-xl uppercase text-black font-bold">
                {item.name}
              </h1>
              <button className="bg-black p-3 cursor-pointer font-bold text-center uppercase rounded">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default LookbookWall;
