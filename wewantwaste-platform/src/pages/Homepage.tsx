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
import type { Skip } from "../types";

const steps = [
  { label: "Postcode", icon: <FaMapMarkerAlt /> },
  { label: "Waste Type", icon: <FaTrashAlt /> },
  { label: "Select Skip", icon: <FaTruck /> },
  { label: "Permit Check", icon: <FaShieldAlt /> },
  { label: "Choose Date", icon: <FaCalendarAlt /> },
  { label: "Payment", icon: <FaCreditCard /> },
];

const Homepage = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  const [hoveredSkip, setHoveredSkip] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
    <div className="min-h-screen bg-gray-100">
      {/* Progress Bar */}
      <nav className="bg-gray-300 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-xs sm:text-sm px-4 overflow-x-auto">
          {steps.map((step, index) => {
            const isActive = step.label === "Select Skip";
            return (
              <div key={index} className="flex items-center whitespace-nowrap">
                <div className={`flex items-center  hover:cursor-pointer hover:bg-blue-600 hover:text-white rounded-2xl p-1 px-2 ${isActive ? "text-blue-600 font-semibold" : "text-gray-600"}`}>
                  <span className="text-base mr-1">{step.icon}</span>
                  {step.label}
                </div>
                {index < steps.length - 1 && (
                  <span className="mx-2 text-gray-400 hidden sm:inline">━</span>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Choose Your Skip Size</h1>
          <p className="text-gray-600 mt-2">Select the skip size that best suits your needs</p>
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
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
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
                  <span className="text-red-500 text-sm ml-2">(Permit Required)</span>
                )}
              </p>
            )}
            <button
              disabled={!selectedSkip}
              className={`bg-blue-600 text-white px-6 py-3 rounded shadow transition-all duration-200 flex items-center ${
                selectedSkip ? "hover:bg-blue-700" : "opacity-50 cursor-not-allowed"
              }`}
            >
              Continue to Delivery Options
              <FaArrowRight className="ml-3" />
            </button>
          </div>

          <div className="w-24" /> {/* Placeholder to balance layout */}
        </div>
      </main>
    </div>
  );
};

export default Homepage;
