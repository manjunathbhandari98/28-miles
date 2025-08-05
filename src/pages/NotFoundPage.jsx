// 404Page.jsx
import { motion } from "framer-motion";
import { Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center relative overflow-hidden">
      <motion.div
        className="absolute top-10 left-1/2 transform -translate-x-1/2"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 0.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <Ghost size={180} className="text-gray-700" />
      </motion.div>

      <motion.h1
        className="text-7xl font-extrabold mb-4 z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl text-gray-300 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      <motion.button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Go Home
      </motion.button>

      {/* Animated floating circles in background */}
      <div className="absolute w-full h-full top-0 left-0 z-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, idx) => (
          <motion.div
            key={idx}
            className="w-10 h-10 rounded-full bg-gray-800 absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.2,
            }}
            animate={{
              y: [Math.random() * 500, Math.random() * 500 + 100],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;
