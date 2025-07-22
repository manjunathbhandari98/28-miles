const Filterbar = () => {
  const gender = ["Men", "Women", "All"];
  const categories = ["T-Shirts", "Shirts", "Jeans", "Shoes"];

  const handleCheckbox = () => {};

  return (
    <div className="w-[25%] flex flex-col p-5 h-screen">
      <h3 className="text-2xl pb-5 border-b">Filters</h3>
      <div className="py-5">
        <div className="flex justify-between items-center">
          <h3 className="text-xl">Gender</h3>
          <h3 className="text-xl">-</h3>
        </div>
        {gender.map((g) => (
          <label key={g} className="block uppercase text-md my-3">
            <input
              type="checkbox"
              checked={false}
              onChange={() => handleCheckbox("gender", g)}
              className="mr-2"
            />
            {g}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filterbar;
