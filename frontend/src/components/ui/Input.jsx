import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  disabled = false,
  required = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  // Base input styles
  const baseInputStyles = 'w-full bg-white border border-slate-200/80 rounded-[12px] px-5 py-3.5 text-[14px] font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-teal-500/30 focus:shadow-[0_2px_8px_-4px_rgba(14,123,98,0.15)] disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed';

  // Container styles
  const containerStyles = 'space-y-2';

  // Label styles
  const labelStyles = 'text-[13px] font-bold text-slate-700 tracking-wide';

  // Error styles
  const errorStyles = 'text-[12px] font-medium text-red-500 mt-1';

  return (
    <div className={`${containerStyles} ${className}`}>
      {label && (
        <label className={labelStyles}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            <Icon size={18} strokeWidth={2} />
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`${baseInputStyles} ${Icon ? 'pl-12' : ''} ${error ? 'border-red-300 focus:border-red-500/30' : ''}`}
          {...props}
        />
      </div>

      {error && (
        <p className={errorStyles}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;