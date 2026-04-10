import React from 'react';

const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  className = '',
  hover = false,
  ...props
}) => {
  // Base card styles
  const baseStyles = 'rounded-[20px] lg:rounded-[24px] border border-slate-200/60 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.05)]';

  // Variant styles
  const variantStyles = {
    default: 'bg-white',
    elevated: 'bg-white shadow-lg',
    subtle: 'bg-slate-50 border-slate-100',
    teal: 'bg-teal-50 border-teal-100',
  };

  // Padding styles
  const paddingStyles = {
    none: '',
    small: 'p-4 lg:p-5',
    medium: 'p-6 lg:p-7',
    large: 'p-8 lg:p-9',
  };

  // Hover styles
  const hoverStyles = hover ? 'transition-all duration-300 hover:border-slate-300 hover:shadow-md' : '';

  // Combine all styles
  const cardStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
    ${hoverStyles}
    ${className}
  `.trim();

  return (
    <div className={cardStyles} {...props}>
      {children}
    </div>
  );
};

// Card Header component
export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-6 lg:mb-7 ${className}`} {...props}>
    {children}
  </div>
);

// Card Title component
export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-[16px] lg:text-[18px] font-bold text-slate-800 tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

// Card Description component
export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-[13px] lg:text-[14px] text-slate-500 leading-relaxed font-medium ${className}`} {...props}>
    {children}
  </p>
);

// Card Content component
export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

// Card Footer component
export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-6 lg:mt-7 pt-6 lg:pt-7 border-t border-slate-100 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;