import { useState } from "react";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  // ... other icons
} from "react-icons/fa";
import WasteCard from "../components/WasteCard";
import Topbar from "../components/Topbar";
import type { Skip } from "../types";
import { useSkips } from "../hooks/useSkips"; // <-- Import the hook
import LoadingSpinner from "../components/LoadingSpinner"; // <-- New component (see below)
import ErrorDisplay from "../components/ErrorDisplay"; // <-- New component (see below)

const steps = [
  // ... steps array is unchanged
];

const Homepage = () => {
  // --- All this state management is now replaced by our hook ---
  // const [skips, setSkips] = useState<Skip[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // --- Replaced with this single line ---
  const { skips, loading, error } = useSkips("NR32", "Lowestoft");

  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  const [hoveredSkip, setHoveredSkip] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // --- The useEffect for fetching is now gone, handled by the hook ---

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- The loading and error return blocks can be componentized ---
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }
  
  // Find the selected skip once to avoid re-calculating in the JSX
  const currentlySelectedSkip = skips.find((s) => s.id === selectedSkip);

  return (
    <div className="bg-gray-100">
      <Topbar
        // ... props are unchanged
      />

      <main className="max-w-6xl mx-auto px-4 pt-20 pb-10">
        {/* ... main content ... */}

        {/* Footer Navigation */}
        <div className="mt-12 flex flex-col items-center sm:flex-row justify-between gap-6">
          {/* ... back button ... */}

          <div className="text-center">
            {currentlySelectedSkip && (
              <p className="text-gray-700 mb-2">
                Selected:{" "}
                <span className="font-semibold">
                  {currentlySelectedSkip.size} Yard Skip
                </span>
                {!currentlySelectedSkip.allowed_on_road && (
                  <span className="text-red-500 text-sm ml-2">
                    (Permit Required)
                  </span>
                )}
              </p>
            )}
            {/* ... continue button ... */}
          </div>

          <div className="w-24" />
        </div>
      </main>
    </div>
  );
};

export default Homepage;