const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <div className="text-center">
        <img src="/spinner.svg" alt="spinnerLogo" />
        <h1 className="text-2xl font-semibold text-gray-800">Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingSpinner;
