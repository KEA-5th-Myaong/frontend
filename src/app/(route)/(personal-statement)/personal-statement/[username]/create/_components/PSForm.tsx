interface FormFieldProps {
  label: string;
  name: string;
  placeholder: string;
  isTextarea?: boolean;
  maxLength?: number;
  value: string;
  onChange: (name: string, value: string) => void;
}

export default function PSForm({ name, label, isTextarea, maxLength, placeholder, value, onChange }: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <label htmlFor={name} className="ps-label">
      <div className="flex justify-between w-full">
        {label}
        {isTextarea && (
          <p>
            {value.length}/{maxLength}
          </p>
        )}
      </div>

      {!isTextarea ? (
        <input
          id={name}
          maxLength={maxLength}
          className="py-2.5 ps-input dark:text-black-0"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <textarea
          id={name}
          maxLength={maxLength}
          className={`resize-none ${name === 'reason' ? 'h-32' : 'h-64'}  py-4 whitespace-pre-wrap ps-input dark:text-black-0`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      )}
    </label>
  );
}
