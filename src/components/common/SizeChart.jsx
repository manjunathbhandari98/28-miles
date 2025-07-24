import { X } from "lucide-react";
import { useEffect, useState } from "react";

const sizeDataInInch = [
  { size: "S", chest: 42.0, front: 29.0, sleeve: 9.75 },
  { size: "M", chest: 44.0, front: 29.75, sleeve: 10.0 },
  { size: "L", chest: 46.0, front: 30.5, sleeve: 10.25 },
  { size: "XL", chest: 48.0, front: 31.25, sleeve: 10.5 },
  { size: "2XL", chest: 50.0, front: 32.0, sleeve: 10.75 },
  { size: "3XL", chest: 52.0, front: 32.75, sleeve: 11.0 },
];

const convertToCM = (value) => (value * 2.54).toFixed(1);

const SizeChart = ({ onClose }) => {
  const [unit, setUnit] = useState("inch");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const dataToShow =
    unit === "inch"
      ? sizeDataInInch
      : sizeDataInInch.map((item) => ({
          size: item.size,
          chest: convertToCM(item.chest),
          front: convertToCM(item.front),
          sleeve: convertToCM(item.sleeve),
        }));

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 montserrat">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative z-10 bg-zinc-950 w-full max-w-xl p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Size Chart</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold text-gray-500 cursor-pointer hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              unit === "inch" ? "bg-white text-black" : "bg-zinc-900"
            }`}
            onClick={() => setUnit("inch")}
          >
            Inch
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              unit === "cm" ? "bg-white text-black" : "bg-zinc-900"
            }`}
            onClick={() => setUnit("cm")}
          >
            CM
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-500">
            <thead className="bg-zinc-900 text-left">
              <tr>
                <th className="p-2 border">Size</th>
                <th className="p-2 border">Chest ({unit})</th>
                <th className="p-2 border">Front Length ({unit})</th>
                <th className="p-2 border">Sleeve Length ({unit})</th>
              </tr>
            </thead>
            <tbody>
              {dataToShow.map((item) => (
                <tr key={item.size}>
                  <td className="p-2 border">{item.size}</td>
                  <td className="p-2 border">{item.chest}</td>
                  <td className="p-2 border">{item.front}</td>
                  <td className="p-2 border">{item.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizeChart;
