import React, { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const AuthForm = ({ 
  type = 'login',
  onSubmit,
  loading = false,
  error = '',
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (type === 'signup') {
      if (!formData.full_name) {
        newErrors.full_name = 'Full name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Prepare data based on form type
      const submitData = type === 'login' 
        ? { 
            username: formData.email,
            password: formData.password
          }
        : formData;
      
      onSubmit(submitData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email field */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        error={errors.email}
        required
        icon={Mail}
        disabled={loading}
      />

      {/* Password field */}
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
        error={errors.password}
        required
        icon={Lock}
        disabled={loading}
      />

      {type === 'signup' && (
        <>
          <Input
            label="Full Name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="John Doe"
            error={errors.full_name}
            required
            icon={User}
            disabled={loading}
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876543212"
            icon={Phone}
            disabled={loading}
          />
        </>
      )}

      {error && (
        <div className="p-4 rounded-[12px] bg-red-50 border border-red-200">
          <p className="text-[13px] font-medium text-red-600 text-center">
            {error}
          </p>
        </div>
      )}

      <Button
        type="submit"
        variant="teal"
        size="large"
        fullWidth
        loading={loading}
        disabled={loading}
      >
        {type === 'login' ? 'Sign In' : 'Create Account'}
      </Button>

    </form>
  );
};

export default AuthForm;