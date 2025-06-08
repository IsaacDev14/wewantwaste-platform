import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-gray-100 pt-16">
      <FaSpinner className="animate-spin text-4xl text-blue-600" />
    </div>
  );
};

export default LoadingSpinner;
