import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/auth/AuthCard';
import AuthForm from '../components/auth/AuthForm';
import Button from '../components/ui/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async (credentials) => {
    setError('');
    const result = await login(credentials.username, credentials.password);
    
    if (result.success) {
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed. Please check your credentials.');
    }
  };

  const footer = (
    <div className="text-center space-y-4">
      <p className="text-[13px] text-slate-500 font-medium">
        Don't have an account?{' '}
        <Link to="/signup" className="text-[#0E7B62] font-bold hover:text-[#0A5D48] transition-colors">
          Create now
        </Link>
      </p>
      
      <div className="pt-4 border-t border-slate-100">
        <Link to="/">
          <Button variant="outline" size="small" fullWidth>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to access your health records"
      footer={footer}
    >
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        loading={isLoading}
        error={error}
      />

      {/* Forgot password */}
      <div className="text-center">
        <Link 
          to="/forgot-password" 
          className="text-[12px] font-medium text-slate-500 hover:text-slate-700 transition-colors"
        >
          Forgot your password?
        </Link>
      </div>
    </AuthCard>
  );
};

export default LoginPage;