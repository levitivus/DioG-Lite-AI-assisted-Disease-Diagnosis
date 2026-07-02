import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Activity, ShieldCheck, CheckSquare, Square } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import { signup } from '../services/authService.js';

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!agree) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await signup(name, email, password);
      if (data.success) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(
        err.response?.data?.message || 'Signup failed. Please check your inputs.'
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
              Create Your Account
            </h2>
            <p className="text-blue-100/90 text-base leading-relaxed font-medium">
              Join DioG Lite today and take the first step towards better, AI-powered health care. Analyze symptoms instantly and consult with verified doctors.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/20">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/10 rounded-lg text-white">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs font-semibold text-blue-50">Private, secure patient records database</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/10 rounded-lg text-white">
                <Activity className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs font-semibold text-blue-50">AI models updated with clinical research</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Sign Up Form */}
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
              Join DioG Lite
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              Get access to premium AI health scans and doctor matchmaking.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-100 rounded-2xl text-xs font-semibold text-red-600 animate-in fade-in duration-350">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3.5 bg-green-50 border border-green-100 rounded-2xl text-xs font-semibold text-green-600 animate-in fade-in duration-350">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="Nithin K."
              icon={User}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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

            <Input
              label="Confirm Password"
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              icon={Lock}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setAgree(!agree)}
                className="text-primary hover:text-primary-dark transition-colors cursor-pointer mt-0.5"
              >
                {agree ? <CheckSquare className="h-5 w-5 fill-primary/10" /> : <Square className="h-5 w-5" />}
              </button>
              <label className="text-xs text-gray-500 font-medium leading-relaxed">
                I agree to the{' '}
                <a href="#" onClick={(e) => e.preventDefault()} className="font-bold text-primary hover:underline">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#" onClick={(e) => e.preventDefault()} className="font-bold text-primary hover:underline">
                  Privacy Policy
                </a>.
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 justify-center text-sm font-semibold mt-2"
              disabled={!agree}
              loading={loading}
            >
              Sign Up
            </Button>
          </form>

          {/* Bottom link */}
          <p className="text-sm text-gray-500 text-center font-medium pt-2">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary hover:text-primary-dark transition-colors">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
