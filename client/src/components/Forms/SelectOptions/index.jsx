/* eslint-disable react/prop-types */

export default function SelectOption({
  label,
  name,
  options,
  register,
  error,
  onChange,
  className,
}) {
  return (
    <div className="mb-3">
      <label className="block text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        {...register(name)}
        className={`border p-2 w-full ${className}`}
        onChange={onChange}
        defaultValue=""
      >
        <option value="" disabled>
          {label}
        </option>
        {options?.map((option, index) => (
          <option
            key={index}
            value={option.district ? option.district : option._id}
            className={option.brandName === 'Local Brand' ? "text-red-600 bg-slate-300" : ""}
          >
            {option.brandName
              ? option.brandName
              : option.district
              ? option.district
              : option.name || option}
          </option>
        ))}
      </select>
      <p className="text-red-500 text-sm">{error?.message?.split("type")[0]}</p>
    </div>
  );
}
