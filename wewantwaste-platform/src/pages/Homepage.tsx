// Homepage.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSpinner,
  FaArrowRight,
  FaMapMarkerAlt,
  FaTrashAlt,
  FaTruck,
  FaShieldAlt,
  FaCalendarAlt,
  FaCreditCard,
} from "react-icons/fa";
import WasteCard from "../components/WasteCard";
import Topbar from "../components/Topbar";
import type { Skip } from "../types"; // Updated type import to Skip

// Configuration data for the steps in the booking process
const steps = [
  { label: "Postcode", icon: <FaMapMarkerAlt /> },
  { label: "Waste Type", icon: <FaTrashAlt /> },
  { label: "Select Skip", icon: <FaTruck /> },
  { label: "Permit Check", icon: <FaShieldAlt /> },
  { label: "Choose Date", icon: <FaCalendarAlt /> },
  { label: "Payment", icon: <FaCreditCard /> },
];

const Homepage = () => {
  const [skips, setSkips] = useState<Skip[]>([]); // Updated type to Skip
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  const [hoveredSkip, setHoveredSkip] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Fetch skip data on component mount
  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await axios.get(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        setSkips(response.data);
      } catch {
        setError("Unable to load skip sizes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="flex flex-col items-center bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
        <p className="text-gray-700 text-lg font-medium">Loading skips...</p>
      </div>
    </div>
  );
}


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

  return (
    <div className="bg-gray-100">
      <Topbar
        steps={steps}
        activeStepLabel="Select Skip"
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />
      <main className="max-w-6xl mx-auto px-4 pt-20 pb-10">
        <div className="text-center my-8 font-serif">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Choose Your Skip Size
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Select the skip size that best suits your needs
          </p>
        </div>

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
