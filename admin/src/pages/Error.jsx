

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-secondary">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-4xl text-red-500 font-bold mb-4">404: Not Found</h2>
        <p className="text-primary">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default Error;
