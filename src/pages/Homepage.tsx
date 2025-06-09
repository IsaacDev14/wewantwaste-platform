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
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import WasteCard from "../components/WasteCard";
import Topbar from "../components/Topbar";
import type { Skip } from "../types";

// Step tracker icons (used in Topbar)
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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Fetch skips from the API once the component mounts
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBack = () => {
    console.log("Go back clicked");
    // TODO: implement actual navigation if needed
  };

  const selectedSkipData = skips.find((s) => s.id === selectedSkip);

  // Utility to calculate total price
  const calculateTotal = () => {
    if (!selectedSkipData) return "";
    const total =
      selectedSkipData.price_before_vat +
      (selectedSkipData.price_before_vat * selectedSkipData.vat) / 100;
    return `£${total.toFixed(2)}`;
  };

  // Loading state
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

  // Error state
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
    <div className="relative bg-gray-100 min-h-screen pb-40">
      <Topbar
        steps={steps}
        activeStepLabel="Select Skip"
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      <main className="max-w-6xl mx-auto px-4 pt-20 pb-10">
        {/* Heading */}
        <div className="text-center my-8 font-serif">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Choose Your Skip Size
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Select the skip size that best suits your needs
          </p>
        </div>

        {/* Grid of skip cards */}
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

        {/* Always-visible back button */}
        <div className="mt-12 flex justify-center">
          <button
            className="text-gray-600 hover:text-gray-900 flex items-center font-medium"
            onClick={handleBack}
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
        </div>
      </main>

      {/* Fixed bottom bar for selected skip */}
      <AnimatePresence>
        {selectedSkipData && (
          <motion.div
            key="bottom-bar"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-0 left-0 w-full bg-white shadow-2xl z-50 border-t border-gray-200"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-700 text-sm sm:text-base text-center">
                Selected:{" "}
                <span className="font-bold text-black">
                  {selectedSkipData.size} Yard Skip
                </span>{" "}
                – <span className="text-blue-600 font-bold">{calculateTotal()}</span>
                {!selectedSkipData.allowed_on_road && (
                  <span className="text-red-500 text-xs ml-2 font-semibold inline-flex items-center">
                    <FaExclamationTriangle className="mr-1" />
                    Not Allowed On The Road
                  </span>
                )}
              </p>

              <button
                className="bg-blue-600 text-white px-2 py-2 rounded-lg font-semibold flex items-center hover:bg-blue-700 transition-all duration-200 cursor-pointer"
                onClick={() => console.log("Proceed to delivery options")}
              >
                Continue to Permit Check
                <FaArrowRight className="ml-3" />
              </button>
            </div>

            <footer className="text-center text-xs text-gray-500 pb-4 max-w-4xl mx-auto">
              <p className="leading-relaxed">
                Imagery and information shown throughout this website may not
                reflect the exact shape or size specification. Colours may vary.
                Options and/or accessories may be featured at additional cost.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Homepage;
