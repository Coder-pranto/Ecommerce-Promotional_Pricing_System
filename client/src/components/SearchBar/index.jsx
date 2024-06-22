/* eslint-disable react/prop-types */
export default function SearchBar({ onSearch }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search..."
        className="md:w-[80%] xs:w-[70%] py-2 pl-10 pr-4 lg:ml-6 md:ml-6 xs:ml-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="absolute inset-y-0 left-0 md:pl-8 xs:pl-5 pt-2 flex items-center pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>
    </div>
  );
}
