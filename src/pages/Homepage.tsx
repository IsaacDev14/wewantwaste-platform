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
import type { Skip } from "../types";

// Booking steps config
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

  // Load skips from API
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

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-xl">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
          <p className="text-gray-700 text-lg">Loading skips...</p>
        </div>
      </div>
    );
  }

  // Handle error
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

  const selected = skips.find((s) => s.id === selectedSkip);
  const totalPrice =
    selected && selected.price_before_vat
      ? `£${(selected.price_before_vat + (selected.price_before_vat * selected.vat) / 100).toFixed(2)}`
      : "";

  return (
    <div className="bg-gray-100 min-h-screen relative pb-28">
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

        {/* Grid of skips */}
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

        {/* Footer */}
        <footer className="text-center text-xs text-gray-500 px-6 pt-12 max-w-4xl mx-auto">
          <p className="mt-4">
            Imagery and information shown throughout this website may not reflect
            the exact shape or size specification. Colours may vary. Options and/or
            accessories may be featured at additional cost.
          </p>
        </footer>
      </main>

      {/* Fixed bottom bar only when a skip is selected */}
      {selectedSkip && selected && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl border-t border-gray-200 z-50 px-4 py-3 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto rounded-t-xl">
          <p className="text-gray-700 text-sm mb-2 sm:mb-0">
            Selected: <strong>{selected.size} Yard Skip</strong> –{" "}
            <span className="text-blue-600 font-semibold">{totalPrice}</span>{" "}
            {selected.allowed_on_road ? "" : (
              <span className="text-red-600 text-sm ml-2">(Permit Required)</span>
            )}
          </p>
          <button
            onClick={() => console.log("Proceed to delivery options")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center hover:bg-blue-700 transition-all"
          >
            Continue to Delivery Options
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Homepage;
