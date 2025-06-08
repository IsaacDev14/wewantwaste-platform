interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay = ({ message }: ErrorDisplayProps) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-gray-100 pt-16">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl text-red-600 font-bold mb-2">Error</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
