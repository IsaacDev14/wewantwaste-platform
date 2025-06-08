import { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner, FaArrowRight } from "react-icons/fa";
import WasteCard from "../components/WasteCard";
import type { Skip } from "../types";

const Homepage = () => {
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  const [hoveredSkip, setHoveredSkip] = useState<number | null>(null);
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        setSkips(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load skip sizes. Please try again later.");
        setLoading(false);
        console.error("Error fetching skip data:", err);
      }
    };

    fetchSkips();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading skip sizes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-500 mb-3">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Find Your Perfect Skip in Lowestoft
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the skip size that matches your project requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skips.map((skip) => (
            <WasteCard
              key={skip.id}
              skip={skip}
              selectedSkip={selectedSkip}
              hoveredSkip={hoveredSkip}
              setSelectedSkip={setSelectedSkip}
              setHoveredSkip={setHoveredSkip}
            />
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in-up">
          <button className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center hover:bg-gray-100 rounded-lg">
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
            {selectedSkip && (
              <p className="text-gray-600 mb-2 transition-opacity duration-300">
                Selected:{" "}
                <span className="font-semibold">
                  {skips.find((s) => s.id === selectedSkip)?.size} Yard Skip
                </span>
                {!skips.find((s) => s.id === selectedSkip)?.allowed_on_road && (
                  <span className="ml-2 text-red-500 text-sm">
                    (Permit Required)
                  </span>
                )}
              </p>
            )}
            <button
              disabled={!selectedSkip}
              className={`bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg ${
                selectedSkip
                  ? "hover:bg-blue-700 hover:shadow-xl"
                  : "opacity-50 cursor-not-allowed"
              } flex items-center mx-auto group`}
            >
              <span>Continue to Delivery Options</span>
              <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
