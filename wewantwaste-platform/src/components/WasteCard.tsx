import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import type { Skip } from "../types";


// Generic skip photos by size
const skipPhotos: Record<number, string> = {
  4: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  6: "https://images.unsplash.com/photo-1581093196275-1a37d95a8a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  8: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  10: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  12: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  14: "https://images.unsplash.com/photo-1581093196275-1a37d95a8a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  16: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  20: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  40: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
};

interface WasteCardProps {
  skip: Skip;
  selectedSkip: number | null;
  hoveredSkip: number | null;
  setSelectedSkip: (id: number) => void;
  setHoveredSkip: (id: number | null) => void;
}

const WasteCard: React.FC<WasteCardProps> = ({
  skip,
  selectedSkip,
  hoveredSkip,
  setSelectedSkip,
  setHoveredSkip,
}) => {
  const formatPrice = (priceBeforeVat: number, vat: number) => {
    const totalPrice = priceBeforeVat + (priceBeforeVat * vat) / 100;
    return `£${totalPrice.toFixed(2)}`;
  };

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
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform ${
        selectedSkip === skip.id
          ? "ring-4 ring-blue-500 shadow-xl scale-[1.02]"
          : "hover:scale-[1.02]"
      } ${!skip.allowed_on_road ? "cursor-pointer" : "hover:shadow-xl"}`}
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

      {skip.size === 8 && (
        <div className="absolute top-20 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 text-xs font-bold rounded-full z-10 animate-pulse">
          MOST POPULAR
        </div>
      )}

      {selectedSkip === skip.id && (
        <div className="absolute top-20 right-4 bg-blue-500 text-white px-3 py-1 text-sm font-semibold rounded-full flex items-center animate-bounce">
          <FaCheck className="mr-1" /> SELECTED
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {skip.size} Yard Skip
            </h3>
            <p className="text-gray-500 text-sm">{getDescription(skip.size)}</p>
          </div>
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(skip.price_before_vat, skip.vat)}
          </span>
        </div>

        {/* Permit Warning Card */}
        {!skip.allowed_on_road && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <div className="flex items-start">
              <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-red-700">Road Permit Required</h4>
                <p className="text-sm text-red-600">
                  This size requires a council permit for road placement.
                  Additional fees may apply.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Heavy Waste Warning */}
        {!skip.allows_heavy_waste && (
          <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
            <div className="flex items-start">
              <FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-700">
                  Heavy Waste Restrictions
                </h4>
                <p className="text-sm text-yellow-600">
                  This skip cannot accept soil, rubble, or other heavy materials.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-blue-500 rounded-full transition-all duration-500 ${
                hoveredSkip === skip.id || selectedSkip === skip.id
                  ? "bg-blue-600"
                  : ""
              }`}
              style={{
                width: `${(skip.size / 40) * 100}%`,
              }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {skip.hire_period_days} day hire period
          </p>
        </div>

        <button
          onClick={() => setSelectedSkip(skip.id)}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            selectedSkip === skip.id
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-700"
          } ${!skip.allowed_on_road ? "border-2 border-red-500" : ""}`}
        >
          {selectedSkip === skip.id ? (
            <span className="flex items-center justify-center">
              <FaCheck className="mr-2" /> Selected
            </span>
          ) : (
            "Select This Skip"
          )}
        </button>
      </div>
    </div>
  );
};

export default WasteCard;