import { FaCheck, FaArrowRight, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";

const App = () => {
  const [selectedSkip, setSelectedSkip] = useState<string>("8 Yards");
  const [hoveredSkip, setHoveredSkip] = useState<string | null>(null);

  const skipSizes = [
    {
      size: "4 Yards",
      description: "Ideal for small home projects or garden clearances",
      hirePeriod: "7 day hire period",
      price: "$227",
      dimensions: "4.5' x 6' x 3.5'",
      capacity: "About 20-25 bin bags",
    },
    {
      size: "6 Yards",
      description: "Perfect for medium renovations or large garden projects",
      hirePeriod: "14 day hire period",
      price: "$300",
      dimensions: "6' x 7' x 4'",
      capacity: "About 30-35 bin bags",
    },
    {
      size: "8 Yards",
      description: "Great for construction waste or large home renovations",
      hirePeriod: "7 day hire period",
      price: "$325",
      dimensions: "8' x 6' x 4.5'",
      capacity: "About 40-45 bin bags",
    },
    {
      size: "10 Yards",
      description: "Commercial projects or major home renovations",
      hirePeriod: "7 day hire period",
      price: "$375",
      dimensions: "10' x 7' x 5'",
      capacity: "About 50-55 bin bags",
    },
    {
      size: "12 Yards",
      description: "Large construction projects or commercial use",
      hirePeriod: "7 day hire period",
      price: "$425",
      dimensions: "12' x 7' x 5.5'",
      capacity: "About 60-65 bin bags",
    },
    {
      size: "14 Yards",
      description: "Maximum capacity for industrial projects",
      hirePeriod: "7 day hire period",
      price: "$475",
      dimensions: "14' x 7' x 6'",
      capacity: "About 70-75 bin bags",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Find Your Perfect Skip
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the skip size that matches your project requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skipSizes.map((skip) => (
            <div
              key={skip.size}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                selectedSkip === skip.size
                  ? "ring-4 ring-blue-500 shadow-xl"
                  : "hover:shadow-xl"
              }`}
              onMouseEnter={() => setHoveredSkip(skip.size)}
              onMouseLeave={() => setHoveredSkip(null)}
            >
              {/* Popular badge */}
              {skip.size === "8 Yards" && (
                <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 text-xs font-bold rounded-full z-10">
                  MOST POPULAR
                </div>
              )}

              {/* Selected badge */}
              {selectedSkip === skip.size && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 text-sm font-semibold rounded-full flex items-center">
                  <FaCheck className="mr-1" /> SELECTED
                </div>
              )}

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {skip.size}
                    </h3>
                    <p className="text-gray-500 text-sm">{skip.description}</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    {skip.price}
                  </span>
                </div>

                {/* Additional info that appears on hover */}
                {(hoveredSkip === skip.size || selectedSkip === skip.size) && (
                  <div className="mt-4 mb-6 p-4 bg-blue-50 rounded-lg transition-all duration-300">
                    <div className="flex items-center text-sm text-gray-700 mb-2">
                      <FaInfoCircle className="mr-2 text-blue-500" />
                      <span>{skip.dimensions}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <FaInfoCircle className="mr-2 text-blue-500" />
                      <span>{skip.capacity}</span>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${(parseInt(skip.size) / 14) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{skip.hirePeriod}</p>
                </div>

                <button
                  onClick={() => setSelectedSkip(skip.size)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    selectedSkip === skip.size
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-700"
                  }`}
                >
                  {selectedSkip === skip.size ? (
                    <span className="flex items-center justify-center">
                      <FaCheck className="mr-2" /> Selected
                    </span>
                  ) : (
                    "Select This Skip"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
          
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Selected: <span className="font-semibold">{selectedSkip}</span>
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl flex items-center mx-auto">
              <span>Continue to Delivery Options</span>
              <FaArrowRight className="ml-3" />
            </button>
          </div>
          
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>
      </div>
    </div>
  );
};

export default App;