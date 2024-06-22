/* eslint-disable react/prop-types */

export default function InputField({
  label,
  name,
  register,
  type = "text",
  error,
  defaultValue,
  placeholder,
  className,
  disabled,
  onChange,
  required = true,
}) {
  return (
    <div className="mb-2">
      <label className="block text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name)}
        type={type}
        defaultValue={defaultValue}
        className={`border p-2 w-full ${className} ${
          disabled && "bg-slate-300 cursor-not-allowed"
        }`}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      <p className="text-red-500 text-sm">{error?.message?.split("type")[0]}</p>
    </div>
  );
}
