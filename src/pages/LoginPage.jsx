import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Activity, ShieldCheck, HeartPulse } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import { login } from '../services/authService.js';
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login(email, password);
      if (data.success) {
        loginUser(data.token, data.user);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 'Login failed. Please verify your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-stretch overflow-hidden">
      {/* Left Column: Brand/Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-accent relative items-center justify-center p-16 text-white overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />
        
        <div className="max-w-md space-y-8 relative z-10 text-left">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="p-2.5 bg-white text-primary rounded-xl shadow-lg shadow-white/10">
              <Activity className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold font-heading text-white">
              DioG <span className="text-white/80">Lite</span>
            </span>
          </Link>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight font-heading leading-tight">
              Welcome Back
            </h2>
            <p className="text-blue-100/90 text-base leading-relaxed font-medium">
              Log in to continue your health journey. Get AI symptom reviews, read report summaries, and consult with specialists in Kerala.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/20">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/10 rounded-lg text-white">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs font-semibold text-blue-50">Fully encrypted medical reports</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/10 rounded-lg text-white">
                <HeartPulse className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs font-semibold text-blue-50">Clinical recommendations matched to you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 text-left"
        >
          {/* Mobile Logo display */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="p-2 bg-primary text-white rounded-xl">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold font-heading text-gray-900">
              DioG <span className="text-primary">Lite</span>
            </span>
          </div>

          {/* Form Header */}
          <div>
            <h3 className="text-2xl font-bold font-heading text-gray-900 mb-1">
              Access Your Account
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              Please enter your login details below.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-100 rounded-2xl text-xs font-semibold text-red-600 animate-in fade-in duration-350">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              icon={Mail}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                icon={Lock}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 bottom-3 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>

            {/* Forgot password row */}
            <div className="flex items-center justify-end">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs font-bold text-primary hover:text-primary-dark transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 justify-center text-sm font-semibold"
              loading={loading}
            >
              Log In
            </Button>
          </form>

          {/* Bottom link */}
          <p className="text-sm text-gray-500 text-center font-medium pt-2">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-primary hover:text-primary-dark transition-colors">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
