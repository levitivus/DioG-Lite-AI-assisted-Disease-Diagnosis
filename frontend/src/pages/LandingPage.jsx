import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  FileText,
  UserCheck,
  ArrowRight,
  Play,
  Star,
  CheckCircle2,
  Shield,
  Activity,
  AlertTriangle,
  Upload,
  ArrowUpRight,
  Lock,
  Clock,
  Sparkles
} from 'lucide-react';

import Button from '../components/Button';
import Badge from '../components/Badge';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import DoctorCard from '../components/DoctorCard';
import FeatureCard from '../components/FeatureCard';
import StatisticCard from '../components/StatisticCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {
  keralaDoctors,
  featuresData,
  howItWorksSteps,
  testimonialsData,
  statisticsData
} from '../data/mockData';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeReportTab, setActiveReportTab] = useState('skin'); // 'skin' | 'blood'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingReverseVariants = {
    animate: {
      y: [0, 12, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Sticky Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white">
        {/* Decorative Blurred Gradients */}
        <div className="absolute top-1/4 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/3 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light text-primary border border-primary/10"
              >
                <Badge variant="primary" size="sm" icon={Sparkles}>AI-Powered Healthcare</Badge>
                <span className="text-xs font-semibold pr-1">Intelligent Care for Kerala</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]"
              >
                Understand Your Health.<br />
                Take the <span className="text-gradient-primary">Right Step.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl"
              >
                Upload an image of your skin concern or share symptom descriptions to get AI-assisted clinical insights in seconds. Connect directly with leading doctors in Kerala.
              </motion.p>

              {/* Trust Badges / Checkmarks */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-x-6 gap-y-3 pt-2"
              >
                <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                  <CheckCircle2 className="h-4.5 w-4.5 text-primary" />
                  <span>AI-Powered Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                  <CheckCircle2 className="h-4.5 w-4.5 text-primary" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                  <CheckCircle2 className="h-4.5 w-4.5 text-primary" />
                  <span>Expert Doctor Guidance</span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon={Play}
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  How It Works
                </Button>
              </motion.div>

              {/* User avatars trust section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 pt-6 border-t border-gray-100"
              >
                <div className="flex -space-x-2">
                  <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" alt="user" />
                  <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="user" />
                  <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" alt="user" />
                  <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="user" />
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  Trusted by <span className="font-bold text-gray-900">10k+ users</span> across Kerala
                </p>
              </motion.div>
            </div>

            {/* Hero Right Graphics / Interactive Visuals */}
            <div className="lg:col-span-5 relative mt-10 lg:mt-0 flex justify-center">
              {/* Floating UI Elements */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute top-10 -left-12 z-20 hidden md:block"
              >
                <Card className="p-4 shadow-xl border border-gray-100/60 bg-white/90 backdrop-blur-md rounded-2xl flex items-center gap-3.5">
                  <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">AI DIAGNOSIS</p>
                    <p className="text-sm font-bold text-gray-800">Scan Complete: 98% Accuracy</p>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                variants={floatingReverseVariants}
                animate="animate"
                className="absolute bottom-16 -right-10 z-20 hidden md:block"
              >
                <Card className="p-4 shadow-xl border border-gray-100/60 bg-white/90 backdrop-blur-md rounded-2xl flex items-center gap-3.5">
                  <div className="p-2.5 bg-primary-light text-primary rounded-xl">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-heading">RECOMMENDATION</p>
                    <p className="text-sm font-bold text-gray-800">Connected with Aster Medcity</p>
                  </div>
                </Card>
              </motion.div>

              {/* Main Banner Mockup Grid */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative w-full max-w-[420px] aspect-[9/11] bg-gradient-to-br from-primary/10 to-accent-cyan/10 rounded-[32px] p-5 shadow-2xl shadow-primary/5 border border-white/60 overflow-hidden flex flex-col justify-between"
              >
                {/* Visual medical report preview header */}
                <div className="w-full bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Live Symptom Scan</span>
                    </div>
                    <Badge variant="success" size="sm">Active</Badge>
                  </div>

                  <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-3">
                    <div className="relative h-12 w-12 rounded-lg bg-gray-200 overflow-hidden border border-gray-100 shrink-0">
                      <img src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=150" alt="skin" className="h-full w-full object-cover" />
                    </div>
                    <div className="text-left flex-grow">
                      <h4 className="text-sm font-bold text-gray-900 leading-tight">Patient Upload #842</h4>
                      <p className="text-xs text-gray-500 font-medium">Concern: Mild itching on arm</p>
                    </div>
                  </div>
                </div>

                {/* Simulated Diagnostic Analyzer */}
                <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4 text-left">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">AI Assessment</span>
                    <span className="text-xs font-bold text-primary flex items-center gap-1">
                      <Brain className="h-3.5 w-3.5" /> Gemini Clinical V2
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-gray-700">Acne Vulgaris probability</span>
                      <span className="text-sm font-bold text-primary">82%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '82%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="bg-primary h-full rounded-full"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    The uploaded image exhibits clusters of inflamed papules and pustules consistent with mild acne vulgaris.
                  </p>

                  <div className="flex gap-2 pt-1 border-t border-gray-100">
                    <Badge variant="accent" size="sm">Dermatology</Badge>
                    <Badge variant="warning" size="sm">Low Risk</Badge>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Statistics Section */}
      <section className="py-12 bg-white relative z-10 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statisticsData.map((stat) => (
              <StatisticCard
                key={stat.id}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Doctors Section */}
      <section id="doctors" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeader
            badgeText="Top Kerala Doctors"
            titleText="Expert Advice, Only a"
            highlightedText="Click Away"
            descriptionText="Consult online or offline with verified specialist doctors practicing in leading hospitals across Kerala."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {keralaDoctors.map((doctor) => (
              <motion.div key={doctor.id} variants={itemVariants}>
                <DoctorCard
                  photo={doctor.photo}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  hospital={doctor.hospital}
                  rating={doctor.rating}
                  experience={doctor.experience}
                  onBook={() => navigate('/login')}
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/login')}
            >
              View All Doctors
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Features Grid Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeader
            badgeText="Full-Suite Features"
            titleText="Everything You Need for"
            highlightedText="Your Health Journey"
            descriptionText="DioG-Lite bundles state-of-the-art AI-powered diagnostic utilities with seamless clinical recommendations."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            {featuresData.map((feature) => (
              <motion.div key={feature.id} variants={itemVariants} className="h-full">
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeader
            badgeText="User Journey"
            titleText="Simple, Private,"
            highlightedText="and Fast"
            descriptionText="See how easy it is to analyze symptoms, read health logs, and connect with clinical professionals."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 relative">
            {/* Connecting line for timeline on desktop */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-200 -translate-y-1/2 -z-10 hidden lg:block" />
            
            {howItWorksSteps.map((stepData, index) => (
              <motion.div
                key={stepData.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-100 p-8 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="text-4xl font-black text-primary/10 tracking-wider">
                    {stepData.step}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {stepData.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">
                    {stepData.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AI Report Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Text description */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary-light rounded-full">
                AI Diagnostic Report Preview
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                Instantly Translate Raw Reports into <span className="text-gradient-primary">Clear Insights.</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-medium">
                Healthcare reports are filled with complex medical jargon. DioG-Lite translates scans and lab markers into comprehensive summaries, calculating risk levels and providing actionable health actions.
              </p>

              {/* Quick Tab buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant={activeReportTab === 'skin' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setActiveReportTab('skin')}
                >
                  Skin Lesion Scan
                </Button>
                <Button
                  variant={activeReportTab === 'blood' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setActiveReportTab('blood')}
                >
                  Thyroid Blood Panel
                </Button>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span>Interactive highlight zones for high-risk markers</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span>Clinically matched doctor suggestions</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span>Exportable and printable PDF summaries</span>
                </div>
              </div>
            </div>

            {/* Interactive Mock Report Visualizer */}
            <div className="lg:col-span-7">
              <motion.div
                key={activeReportTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 border border-gray-200/80 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-6 text-left"
              >
                {/* Report Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {activeReportTab === 'skin' ? 'AI Dermatology Diagnostic Report' : 'Thyroid Blood Panel Interpretation'}
                    </h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
                      Patient ID: DL-9284 &bull; Date: June 25, 2026
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={activeReportTab === 'skin' ? 'warning' : 'danger'} size="md">
                      {activeReportTab === 'skin' ? 'Medium Risk' : 'High Risk'}
                    </Badge>
                  </div>
                </div>

                {activeReportTab === 'skin' ? (
                  // Skin Report Preview
                  <div className="space-y-6">
                    {/* Visual & description */}
                    <div className="flex flex-col sm:flex-row gap-5 items-start bg-white border border-gray-100 p-4 rounded-2xl">
                      <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                        <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=150" alt="eczema" className="h-full w-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-amber-500 uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">Likely Condition</span>
                        <h4 className="text-base font-bold text-gray-900">Atopic Dermatitis (Eczema) &bull; Confidence: 74%</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          Image displays localized erythema with mild scaling and dry cracking patches. Typical of moderate eczema flare-ups.
                        </p>
                      </div>
                    </div>

                    {/* AI Smart Summary */}
                    <div className="space-y-3.5 bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                        <Brain className="h-4.5 w-4.5 text-primary" /> AI Smart Summary
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        The lesion demonstrates classic scaling borders indicative of atopic eczema. There are no immediate markers for malignant melanomas (ABCD criteria negative). Keep dry areas moisturized and avoid harsh chemical soaps.
                      </p>
                    </div>

                    {/* Action Items */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recommended Next Steps</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 text-xs text-gray-600 font-semibold bg-white p-2.5 rounded-xl border border-gray-100">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>Apply emollient creams twice daily</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 font-semibold bg-white p-2.5 rounded-xl border border-gray-100">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>Avoid hot showers (use lukewarm)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Blood Panel Report Preview
                  <div className="space-y-6">
                    {/* Laboratory Values */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Lab Biomarkers Detected</span>
                      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
                        <div className="p-3.5 flex items-center justify-between text-sm">
                          <span className="font-semibold text-gray-700">Thyroxine (Free T4)</span>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-500 font-medium">0.65 ng/dL</span>
                            <Badge variant="danger" size="sm">Low</Badge>
                          </div>
                        </div>
                        <div className="p-3.5 flex items-center justify-between text-sm">
                          <span className="font-semibold text-gray-700">Thyroid Stimulating Hormone (TSH)</span>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-900 font-bold">8.42 uIU/mL</span>
                            <Badge variant="danger" size="sm">High</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Smart Summary */}
                    <div className="space-y-3.5 bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                        <Brain className="h-4.5 w-4.5 text-primary" /> AI Smart Summary
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        Elevated TSH levels accompanied by below-normal Free T4 values strongly indicate <strong className="text-gray-900">Primary Hypothyroidism</strong>. This combination suggests thyroid underactivity. Standard medical protocol suggests consulting an endocrinologist for thyroid hormone replacement evaluation.
                      </p>
                    </div>

                    {/* Red flag notice */}
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                      <div className="text-xs text-rose-800 leading-relaxed font-semibold">
                        <strong>Clinical Alert:</strong> Highly recommended to get an endocrinologist consultation. A clinician needs to review these findings to prescribe Levothyroxine if required.
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeader
            badgeText="Success Stories"
            titleText="What Our Users Say"
            highlightedText="About Us"
            descriptionText="Read how DioG-Lite is assisting thousands of individuals and doctors in achieving better health insights."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            {testimonialsData.map((test) => (
              <motion.div key={test.id} variants={itemVariants}>
                <Card className="flex flex-col justify-between h-full bg-white border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div>
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-sm text-gray-500 italic leading-relaxed font-medium mb-6">
                      "{test.quote}"
                    </p>
                  </div>
                  
                  {/* User Profile */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <img
                      src={test.avatar}
                      alt={test.author}
                      className="h-10 w-10 rounded-full object-cover border border-gray-100"
                    />
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-gray-900">{test.author}</h4>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{test.location}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-r from-primary to-accent rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl overflow-hidden"
          >
            {/* Background design elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_40%)]" />
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-heading">
                Ready to take charge of your skin and health?
              </h2>
              <p className="text-base md:text-lg text-blue-100/90 leading-relaxed font-medium">
                Start your symptom analysis now and get AI-powered insights in seconds. Get matched with top specialists in Kerala.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-primary hover:shadow-xl focus:ring-white cursor-pointer"
                  onClick={() => navigate('/signup')}
                >
                  Get Started Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10 hover:border-white focus:ring-white/50 cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. Footer Section */}
      <Footer />
    </div>
  );
};

export default LandingPage;
