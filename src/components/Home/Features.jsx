const Features = () => {
  const features = [
    { id: 1, feature: "Fast Delevery", icon: "/Features/fast-delivery.png" },
    { id: 2, feature: "Easy Returns", icon: "/Features/return.png" },
    { id: 3, feature: "Free Shipping", icon: "/Features/free-delivery.png" },
    { id: 4, feature: "Cash On Delevery", icon: "/Features/cash.png" },
  ];

  return (
    <div className="py-10 mt-5 grid grid-cols-2 md:grid-cols-4 gap-5 justify-around items-center">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="flex flex-col items-center gap-3 justify-center"
        >
          <img
            src={feature.icon}
            alt={feature.feature}
            className="md:w-[100px] w-[50px] opacity-80"
          />
          <h1 className="md:text-lg text-sm uppercase">{feature.feature}</h1>
        </div>
      ))}
    </div>
  );
};

export default Features;
