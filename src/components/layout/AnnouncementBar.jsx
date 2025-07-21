import { X } from "lucide-react";
import { useEffect, useState } from "react";

const AnnouncementBar = () => {
  const [hidden, setHidden] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const announcements = [
    { id: 1, message: "Free shipping on orders over ₹999!" },
    { id: 2, message: "Flat 20% off on summer collection ☀️" },
    { id: 3, message: "Use code '28MILES' for extra 10% OFF 🎁" },
  ];

  // Cycle through announcements every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div className="relative bg-[rgb(182,255,232)] text-black text-sm font-semibold p-1.5 flex items-center justify-between">
      <div className="text-center w-full animate-fade-in">
        {announcements[currentIndex].message}
      </div>
      <div
        className="absolute right-4 text-sm cursor-pointer"
        onClick={() => setHidden(true)}
      >
        <X size={18} />
      </div>
    </div>
  );
};

export default AnnouncementBar;
