import { FaArrowRight, FaCheck } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import type { Skip } from "../types";
import clsx from "clsx"; // <-- Import clsx
import React from "react"; // <-- Import React for React.memo

// --- Move static objects outside the component ---
import skip4Yard from "../assets/image.png";
// ... other image imports

const skipPhotos: Record<number, string> = {
  4: skip4Yard,
  // ...
};

const descriptions: Record<number, string> = {
  4: "Ideal for small home projects or garden clearances",
  // ...
};

// --- Component Props are unchanged ---
interface WasteCardProps {
  // ...
}

// --- Note the React.FC is removed in favor of direct typing for props
// --- and wrapping the export in React.memo at the bottom.
const WasteCard = ({
  skip,
  selectedSkip,
  hoveredSkip,
  setSelectedSkip,
  setHoveredSkip,
}: WasteCardProps) => {
  const formatPrice = (priceBeforeVat: number, vat: number) => {
    // ...
  };

  const getDescription = (size: number) => {
    return descriptions[size] || "General purpose waste container";
  };
  
  // Define card classes using clsx for readability
  const cardClasses = clsx(
    "relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform cursor-pointer hover:shadow-xl",
    {
      "ring-4 ring-blue-500 shadow-xl scale-[1.02]": selectedSkip === skip.id,
      "hover:scale-[1.02]": selectedSkip !== skip.id,
    }
  );
  
  // Define button classes using clsx
  const buttonClasses = clsx(
    "w-full py-2 px-4 rounded-lg font-medium transition-all duration-200",
    {
      "bg-blue-600 text-white shadow-md": selectedSkip === skip.id,
      "bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-700": selectedSkip !== skip.id,
      "border-2 border-red-500": !skip.allowed_on_road,
    }
  );

  return (
    <div
      onClick={() => setSelectedSkip(skip.id)}
      className={cardClasses} // <-- Use the clean class variable
      onMouseEnter={() => setHoveredSkip(skip.id)}
      onMouseLeave={() => setHoveredSkip(null)}
    >
      {/* ... Card content ... */}

      <div className="p-4">
        {/* ... Card details ... */}
        
        <button className={buttonClasses}> {/* <-- Use the clean class variable */}
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

// Wrap the component in React.memo to prevent re-rendering if its props don't change.
// This is a good performance optimization.
export default React.memo(WasteCard);