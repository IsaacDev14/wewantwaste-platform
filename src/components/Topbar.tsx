import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

// Interface for step configuration
interface Step {
  label: string;
  icon: React.ReactNode;
}

// Interface for Topbar component props
interface TopbarProps {
  steps: Step[];
  activeStepLabel: string;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Topbar: React.FC<TopbarProps> = ({
  steps,
  activeStepLabel,
  isMenuOpen,
  toggleMenu,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-end sm:justify-center cursor-pointer">
        {/* Step Navigation - Desktop */}
        <nav className="hidden sm:flex items-center text-sm">
          {steps.map((step, index) => {
            const isActive = step.label === activeStepLabel;
            return (
              <div key={index} className="flex items-center whitespace-nowrap">
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
                {index < steps.length - 1 && (
                  <FaArrowRight className="mx-4 text-gray-300" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Menu toggle for mobile */}
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

      {/* Mobile Menu with framer-motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="sm:hidden bg-white/90 backdrop-blur-md px-4 py-4"
          >
            <div className="flex flex-col space-y-2">
              {steps.map((step) => {
                const isActive = step.label === activeStepLabel;
                return (
                  <div
                    key={step.label}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                    }`}
                    onClick={toggleMenu}
                  >
                    <span className="text-base mr-2">{step.icon}</span>
                    {step.label}
                  </div>
                );
              })}
              {/* <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-2"
                onClick={toggleMenu}
              >
                Get a Quote
              </button> */}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Topbar;
