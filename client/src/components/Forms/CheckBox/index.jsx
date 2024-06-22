export default function CheckBox({
  label,
  name,
  register,
  error,
  onChange,
  defaultValue,
  placeholder,
  className,
  required,
}) {
  return (
    <div className="flex items-center gap-1 flex-start">
      <label className="order-1 block text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name)}
        type="checkbox"
        defaultValue={defaultValue}
        className={`h-4 w-4 border p-2 cursor-pointer ${className}`}
        placeholder={placeholder}
        onChange={onChange}
      />
      <p className="text-red-500 text-sm">{error?.message?.split("type")[0]}</p>
    </div>
  );
}
