import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/auth/AuthCard';
import AuthForm from '../components/auth/AuthForm';
import Button from '../components/ui/Button';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [error, setError] = useState('');

  const handleSignup = async (userData) => {
    setError('');
    const result = await signup(userData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  const footer = (
    <div className="text-center space-y-4">
      <p className="text-[13px] text-slate-500 font-medium">
        Already have an account?{' '}
        <Link to="/login" className="text-[#0E7B62] font-bold hover:text-[#0A5D48] transition-colors">
          Sign in
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
      title="Create Your Account"
      subtitle="Join thousands of patients managing their health records securely"
      footer={footer}
    >
      <AuthForm
        type="signup"
        onSubmit={handleSignup}
        loading={isLoading}
        error={error}
      />

      <div className="text-center">
        <p className="text-[11px] text-slate-400 font-medium">
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="text-slate-600 font-bold hover:text-slate-800 transition-colors">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-slate-600 font-bold hover:text-slate-800 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default SignupPage;