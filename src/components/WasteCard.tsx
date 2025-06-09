// WasteCard.tsx
import { FaArrowRight, FaCheck } from "react-icons/fa";
import type { Skip } from "../types"; // Updated type import to Skip
import { FaCalendarDays } from "react-icons/fa6";
import skip4Yard from "../assets/image3.png";
import skip6Yard from "../assets/image2.png";
import skip8Yard from "../assets/image.png";
import skip10Yard from "../assets/image4.png";
import skip12Yard from "../assets/image.png";
import skip14Yard from "../assets/image4.png";
import skip16Yard from "../assets/image2.png";
import skip20Yard from "../assets/image4.png";
import skip40Yard from "../assets/image3.png";

// Mapping of skip sizes to their respective images
const skipPhotos: Record<number, string> = {
  4: skip4Yard,
  6: skip6Yard,
  8: skip8Yard,
  10: skip10Yard,
  12: skip12Yard,
  14: skip14Yard,
  16: skip16Yard,
  20: skip20Yard,
  40: skip40Yard,
};

// Props interface for the WasteCard component
interface WasteCardProps {
  skip: Skip; // Updated type to Skip
  selectedSkip: number | null; // ID of the currently selected skip
  hoveredSkip: number | null; // ID of the currently hovered skip
  setSelectedSkip: (id: number) => void; // Function to set the selected skip
  setHoveredSkip: (id: number | null) => void; // Function to set the hovered skip
}

const WasteCard: React.FC<WasteCardProps> = ({
  skip,
  selectedSkip,
  setSelectedSkip,
  setHoveredSkip,
}) => {
  // Format price including VAT
  const formatPrice = (priceBeforeVat: number, vat: number) => {
    const totalPrice = priceBeforeVat + (priceBeforeVat * vat) / 100;
    return `£${totalPrice.toFixed(2)}`;
  };

  // Get description based on skip size
  const getDescription = (size: number) => {
    const descriptions: Record<number, string> = {
      4: "Ideal for small home projects or garden clearances",
      6: "Perfect for medium renovations or large garden projects",
      8: "Great for construction waste or large home renovations",
      10: "Commercial projects or major home renovations",
      12: "Large construction projects or commercial use",
      14: "Maximum capacity for industrial projects",
      16: "Extra large capacity for major construction work",
      20: "Roll-on/roll-off container for substantial waste",
      40: "Maximum capacity roll-on/roll-off container",
    };
    return descriptions[size] || "General purpose waste container";
  };

  return (
    <div
      onClick={() => setSelectedSkip(skip.id)}
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform ${
        selectedSkip === skip.id
          ? "ring-4 ring-blue-500 shadow-xl scale-[1.02]"
          : "hover:scale-[1.02] hover:shadow-xl"
      } ${!skip.allowed_on_road ? "cursor-pointer" : ""}`}
      onMouseEnter={() => setHoveredSkip(skip.id)}
      onMouseLeave={() => setHoveredSkip(null)}
    >
      {/* Skip Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={skipPhotos[skip.size] || skipPhotos[4]}
          alt={`${skip.size} yard skip`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      {/* Permit Warning Banner */}
      {!skip.allowed_on_road && (
        <div className="absolute top-4 left-0 right-0 bg-red-500 text-white text-center py-1 px-3 text-sm font-bold transform -rotate-3 scale-110 shadow-md">
          ROAD PERMIT REQUIRED
        </div>
      )}
      {/* Popular Badge for 8-yard skip */}
      {skip.size === 8 && (
        <div className="absolute top-2 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 text-xs font-bold rounded-full z-10 animate-pulse">
          MOST POPULAR
        </div>
      )}
      {/* Selected Badge */}
      {selectedSkip === skip.id && (
        <div className="absolute top-2 right-4 bg-blue-500 text-white px-3 py-1 text-sm font-semibold rounded-full flex items-center animate-bounce">
          <FaCheck className="mr-1" /> SELECTED
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {skip.size} Yard Skip
            </h3>
          </div>
          <span className="text-lg font-bold text-blue-600">
            {formatPrice(skip.price_before_vat, skip.vat)}
          </span>
        </div>
        <p className="text-gray-500 text-sm">{getDescription(skip.size)}</p>
        <div className="mb-6">
          <p className="text-sm text-gray-500 mt-2 flex items-center">
            <FaCalendarDays className="text-blue-500 mr-2" />
            {skip.hire_period_days} day hire period
          </p>
        </div>
        <button
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            selectedSkip === skip.id
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-700"
          } ${!skip.allowed_on_road ? "border-2 border-red-500" : ""}`}
        >
          {selectedSkip === skip.id ? (
            <span className="flex items-center justify-center">
              <FaCheck className="mr-2 h-5 w-5" /> Selected
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Select This Skip <FaArrowRight className="ml-2 h-5 w-5" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default WasteCard;