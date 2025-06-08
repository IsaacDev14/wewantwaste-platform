import { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner, FaArrowRight } from "react-icons/fa";
import WasteCard from "../components/WasteCard";
import Topbar from "../components/Topbar"; // Import the new Topbar component
import type { Skip } from "../types";

const Homepage = () => {
  // State for skips data
  const [skips, setSkips] = useState<Skip[]>([]);
  // State for selected skip
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  // State for hovered skip
  const [hoveredSkip, setHoveredSkip] = useState<number | null>(null);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for error message
  const [error, setError] = useState<string | null>(null);

  // Fetch skips data on component mount
  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await axios.get(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        setSkips(response.data);
      } catch (err) {
        setError("Unable to load skip sizes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-gray-100 pt-16">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-gray-100 pt-16">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl text-red-600 font-bold mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="bg-gray-100">
      {/* Topbar Component */}
      <Topbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pt-20 pb-10">
        <div className="text-center my-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Choose Your Skip Size
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Select the skip size that best suits your needs
          </p>
        </div>

        {/* Skip Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </section>

        {/* Footer Navigation */}
        <div className="mt-12 flex flex-col items-center sm:flex-row justify-between gap-6">
          <button
            className="text-gray-600 hover:text-gray-900 flex items-center"
            onClick={() => console.log("Go back")}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" />
            </svg>
            Back
          </button>

          <div className="text-center">
            {selectedSkip && (
              <p className="text-gray-700 mb-2">
                Selected:{" "}
                <span className="font-semibold">
                  {skips.find((s) => s.id === selectedSkip)?.size} Yard Skip
                </span>
                {!skips.find((s) => s.id === selectedSkip)?.allowed_on_road && (
                  <span className="text-red-500 text-sm ml-2">
                    (Permit Required)
                  </span>
                )}
              </p>
            )}
            <button
              disabled={!selectedSkip}
              className={`bg-blue-600 text-white px-6 py-3 rounded shadow transition-all duration-200 flex items-center ${
                selectedSkip
                  ? "hover:bg-blue-700"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              Continue to Delivery Options
              <FaArrowRight className="ml-3" />
            </button>
          </div>

          <div className="w-24" />
        </div>
      </main>
    </div>
  );
};

export default Homepage;