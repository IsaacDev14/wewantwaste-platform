import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

// Define the shape of a single step object for type safety.
interface Step {
  label: string;
  icon: React.ReactNode;
}

// Define the props that the Topbar component will accept.
interface TopbarProps {
  steps: Step[];
  activeStepLabel: string;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Topbar = ({ steps, activeStepLabel, isMenuOpen, toggleMenu }: TopbarProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Desktop Progress Steps: Hidden on small screens */}
        <nav className="hidden sm:flex items-center justify-center space-x-4 text-sm sm:justify-center">
          {steps.map((step, index) => {
            // Determine if the current step is the active one based on the prop.
            const isActive = step.label === activeStepLabel;
            return (
              <div
                key={index}
                className="flex items-center whitespace-nowrap"
              >
                <div
                  className={`flex items-center px-2 py-1 rounded-2xl transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                >
                  <span className="text-base mr-1">{step.icon}</span>
                  {step.label}
                </div>
                {/* Render a divider between steps, but not after the last one. */}
                {index < steps.length - 1 && (
                  <span className="mx-2 text-gray-400">━</span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Button: Visible only on small screens */}
        <button
          className="sm:hidden text-gray-700 hover:text-blue-600"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Progress Steps Menu: Conditionally rendered based on isMenuOpen state */}
      {isMenuOpen && (
        <nav className="sm:hidden bg-white/90 backdrop-blur-md px-4 py-4">
          <div className="flex flex-col space-y-2">
            {steps.map((step, index) => {
              const isActive = step.label === activeStepLabel;
              return (
                <div
                  key={index}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                  onClick={toggleMenu} // Close menu on item click
                >
                  <span className="text-base mr-2">{step.icon}</span>
                  {step.label}
                </div>
              );
            })}
             <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-2"
              onClick={toggleMenu}
            >
              Get a Quote
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Topbar;