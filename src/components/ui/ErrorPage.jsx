import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const ErrorPage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 px-4">
      <AlertTriangle size={80} className="text-red-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-200 mb-2">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">{message}</p>
      <Link
        to="/"
        className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};
export default ErrorPage;
