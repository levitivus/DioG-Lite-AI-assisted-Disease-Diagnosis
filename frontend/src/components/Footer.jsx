import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Mail, Phone, MapPin, Globe, Heart, Send } from 'lucide-react';
import Button from './Button';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer id="footer" className="bg-gray-50 border-t border-gray-100/80 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary text-white rounded-xl shadow-md shadow-primary/20">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold font-heading text-gray-900">
              DioG <span className="text-primary">Lite</span>
            </span>
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
            AI-powered healthcare platform providing intelligent symptom analysis, professional medical report interpretation, and trusted doctor recommendations across Kerala.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="p-2.5 rounded-xl bg-white hover:bg-primary hover:text-white text-gray-400 border border-gray-100 shadow-sm transition-all duration-300">
              <Globe className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="p-2.5 rounded-xl bg-white hover:bg-primary hover:text-white text-gray-400 border border-gray-100 shadow-sm transition-all duration-300">
              <Send className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="p-2.5 rounded-xl bg-white hover:bg-primary hover:text-white text-gray-400 border border-gray-100 shadow-sm transition-all duration-300">
              <Heart className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="p-2.5 rounded-xl bg-white hover:bg-primary hover:text-white text-gray-400 border border-gray-100 shadow-sm transition-all duration-300">
              <Activity className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 font-heading">
            Company
          </h4>
          <ul className="space-y-3.5">
            <li>
              <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">About Us</a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Our Doctors</a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Success Stories</a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Press & Media</a>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 font-heading">
            Resources
          </h4>
          <ul className="space-y-3.5">
            <li>
              <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">AI Symptom Check</a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Report Analysis</a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 font-heading">
            Newsletter
          </h4>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            Subscribe for the latest healthcare updates and AI features.
          </p>
          <form onSubmit={handleSubscribe} className="relative flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full pl-4 pr-11 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              required
            />
            <button
              type="submit"
              className="absolute right-1.5 p-1.5 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors cursor-pointer"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-success font-medium mt-2">
              Successfully subscribed! Thank you.
            </p>
          )}
        </div>
      </div>

      <hr className="border-gray-200/50 max-w-7xl mx-auto px-6 md:px-8 mb-8" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} DioG-Lite. All rights reserved. Made for Kerala Healthcare.
        </p>
        <p className="text-xs text-gray-400 flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-primary" /> Kochi, Kerala, India
        </p>
      </div>
    </footer>
  );
};

export default Footer;
