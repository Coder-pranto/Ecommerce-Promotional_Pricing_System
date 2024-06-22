/* eslint-disable react/prop-types */
export default function BrandCard({ brandName, brandType, image }) {
  return (
    <div className="relative shadow-lg rounded-b-md">
      <img
        className="w-full h-[120px] md:h-[150px] xl:h-[180px] object-cover rounded-t-md"
        src={image}
        alt={brandName}
      />

      <div className="text-center py-2 flex flex-col items-center gap-1">
        <p className="font-bold text-sm">{brandName}</p>
        <p className="text-primary text-xs">{brandType}</p>
      </div>
    </div>
  );
}
