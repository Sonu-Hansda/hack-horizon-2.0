import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  // Base styles
  const baseStyles = 'font-bold transition-all duration-300 rounded-[14px] shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2';

  // Variant styles
  const variantStyles = {
    primary: 'bg-slate-900 hover:bg-slate-800 text-white',
    secondary: 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50',
    teal: 'bg-[#0E7B62] hover:bg-[#0A5D48] text-white',
    outline: 'border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 bg-transparent',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  // Size styles
  const sizeStyles = {
    small: 'py-2.5 px-4 text-[13px]',
    medium: 'py-3.5 px-6 text-[14px]',
    large: 'py-4 px-8 text-[15px]',
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  // Combine all styles
  const buttonStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${widthStyles}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;