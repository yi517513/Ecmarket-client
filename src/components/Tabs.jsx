export const Tabs = ({ options, onChange, className }) => {
  return (
    <div className={className}>
      {options?.map?.((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={option.className}
          disabled={option.disabled}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
