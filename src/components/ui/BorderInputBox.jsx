const BorderInputBox = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = label,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-3 p-2 ${className}`}>
      <label htmlFor="name">{label}</label>
      <div className="border rounded-sm border-gray-400/60 p-1">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-1.5 border-0 outline-0 bg-black text-white placeholder-gray-400/30"
        />
      </div>
    </div>
  );
};

export default BorderInputBox;
