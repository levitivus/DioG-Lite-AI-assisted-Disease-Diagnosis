import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  PlusCircle,
  History as HistoryIcon,
  User,
  Settings as SettingsIcon,
  LogOut,
  Sparkles,
  Upload,
  Download,
  AlertTriangle,
  Star,
  Building,
  Award,
  Bell,
  CheckCircle2,
  HelpCircle,
  FileText,
  UserCheck,
  ChevronRight,
  MapPin,
  Heart,
  Globe,
  Hospital
} from 'lucide-react';

import Button from '../components/Button';
import Badge from '../components/Badge';
import Card from '../components/Card';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Modal from '../components/Modal';
import { LoadingSpinner, EmptyState } from '../components/FeedbackStates';

import { keralaDoctors, mockAnalysesHistory } from '../data/mockData';
import { analyseSymptoms, getDiagnosisHistory } from '../services/diagnosisService.js';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [activeTab, setActiveTab] = useState('new-analysis'); // 'new-analysis' | 'history' | 'doctors' | 'hospitals' | 'profile' | 'settings'
  
  // New Analysis State
  const [uploadedImage, setUploadedImage] = useState(null);
  const [concernText, setConcernText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState('');
  const [currentAnalysisResult, setCurrentAnalysisResult] = useState(null);
  
  // History State
  const [historyItems, setHistoryItems] = useState(mockAnalysesHistory);
  const [viewingHistoryResult, setViewingHistoryResult] = useState(null);
  
  // Doctor Filter State
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  
  // Profile State
  const [profileData, setProfileData] = useState({
    name: 'Nithin K.',
    email: 'nithin.k@example.com',
    phone: '+91 98765 43210',
    age: '26',
    gender: 'Male',
    location: 'Kochi, Kerala',
    bloodGroup: 'O+'
  });
  const [profileSuccessMsg, setProfileSuccessMsg] = useState(false);

  useEffect(() => {
    const loadDataAndHistory = async () => {
      if (user) {
        setProfileData(prev => ({
          ...prev,
          name: user.fullName || prev.name,
          email: user.email || prev.email
        }));
        
        try {
          const response = await getDiagnosisHistory();
          if (response.success && response.diagnoses) {
            const mappedHistory = response.diagnoses.map(diag => {
              let parsedAdvice = [];
              try {
                parsedAdvice = typeof diag.advice === 'string' ? JSON.parse(diag.advice) : diag.advice;
                if (!Array.isArray(parsedAdvice)) {
                  parsedAdvice = typeof diag.raw_response?.homeCare === 'object' ? [
                    ...(diag.raw_response.homeCare || []),
                    ...(diag.raw_response.medications || []),
                    ...(diag.raw_response.recommendedTests || [])
                  ] : [];
                }
              } catch (e) {
                parsedAdvice = (diag.raw_response?.homeCare) ? [
                  ...(diag.raw_response.homeCare || []),
                  ...(diag.raw_response.medications || []),
                  ...(diag.raw_response.recommendedTests || [])
                ] : [];
              }

              return {
                id: diag.id,
                condition: diag.condition_name,
                confidence: `${diag.confidence_score}%`,
                date: new Date(diag.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                time: new Date(diag.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                imageUrl: diag.image_url,
                description: diag.description,
                advice: parsedAdvice,
                urgency: diag.urgency,
                disclaimer: diag.raw_response?.disclaimer || ''
              };
            });
            setHistoryItems(mappedHistory);
          }
        } catch (error) {
          console.error('Failed to load diagnosis history:', error);
        }
      }
    };

    loadDataAndHistory();
  }, [user]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  // Settings State
  const [settings, setSettings] = useState({
    aiReminders: true,
    emailReports: true,
    anonymousSharing: false,
    mfa: false
  });
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState(false);

  // Doctor Detail Modal State
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartAnalysis = async () => {
    if (!uploadedImage && !concernText) return;

    setIsAnalyzing(true);
    setAnalysisProgress('Scanning image structures...');
    
    // Minimum animation delays for clinical simulation feel
    const anim1 = new Promise(resolve => setTimeout(resolve, 1000));
    const anim2 = new Promise(resolve => setTimeout(resolve, 2000));
    const anim3 = new Promise(resolve => setTimeout(resolve, 3200));

    anim1.then(() => setAnalysisProgress('Comparing with clinical dermatology library...'));
    anim2.then(() => setAnalysisProgress('Extracting lesion markers & calculating risk...'));

    try {
      const response = await analyseSymptoms(uploadedImage || null, concernText || '', profileData);
      
      const [apiResponse] = await Promise.all([response, anim3]);
      
      if (apiResponse.success && apiResponse.diagnosis) {
        const newResult = {
          id: apiResponse.diagnosis.id,
          condition: apiResponse.diagnosis.condition,
          confidence: apiResponse.diagnosis.confidence,
          date: new Date(apiResponse.diagnosis.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: new Date(apiResponse.diagnosis.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          imageUrl: apiResponse.diagnosis.imageUrl,
          description: apiResponse.diagnosis.description,
          advice: apiResponse.diagnosis.advice,
          urgency: apiResponse.diagnosis.urgency,
          disclaimer: apiResponse.diagnosis.disclaimer
        };

        setHistoryItems(prev => [newResult, ...prev]);
        setCurrentAnalysisResult(newResult);
      } else {
        alert(apiResponse.message || 'An error occurred during symptom analysis. Please try again.');
      }
    } catch (error) {
      console.error('AI Analysis failed:', error);
      alert(error.response?.data?.message || 'An error occurred during symptom analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectHistoryItem = (item) => {
    setViewingHistoryResult(item);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileSuccessMsg(true);
    setTimeout(() => setProfileSuccessMsg(false), 3000);
  };

  const handleSaveSettings = () => {
    setSettingsSuccessMsg(true);
    setTimeout(() => setSettingsSuccessMsg(false), 3000);
  };

  const handleOpenDocModal = (doc) => {
    setSelectedDoc(doc);
    setIsDocModalOpen(true);
    setAppointmentBooked(false);
  };

  const handleBookAppointment = () => {
    setAppointmentBooked(true);
  };

  const uniqueStates = [...new Set(keralaDoctors.map(doc => doc.state).filter(Boolean))];
  const uniqueCities = selectedState === 'All'
    ? []
    : [...new Set(keralaDoctors.filter(doc => doc.state === selectedState).map(doc => doc.city).filter(Boolean))];

  const filteredDoctors = keralaDoctors.filter(doc => {
    const matchesState = selectedState === 'All' || doc.state === selectedState;
    const matchesCity = selectedCity === 'All' || doc.city === selectedCity;
    return matchesState && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Banner Nav */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100/80 z-30 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="p-1.5 bg-primary text-white rounded-lg">
            <Activity className="h-4 w-4" />
          </div>
          <span className="text-base font-bold font-heading text-gray-900">
            DioG <span className="text-primary">Lite</span>
          </span>
        </div>

        {/* User Info Bar */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-primary rounded-xl hover:bg-gray-50 transition-colors relative cursor-pointer">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full" />
          </button>
          <hr className="h-6 w-px bg-gray-200" />
          <div className="flex items-center gap-2.5">
            <img
              src="/images/ui/default-avatar.png"
              alt="Default Avatar"
              className="h-8 w-8 rounded-full border border-gray-100"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-gray-800 leading-tight">{profileData.name}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{profileData.location.split(',')[0]}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-grow pt-16 flex items-stretch">
        {/* Left Sidebar */}
        <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-100 flex-col justify-between p-6 fixed top-16 bottom-0 z-20">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  setActiveTab('new-analysis');
                  setCurrentAnalysisResult(null);
                  setUploadedImage(null);
                  setConcernText('');
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'new-analysis'
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <PlusCircle className="h-4.5 w-4.5 shrink-0" />
                <span>New Analysis</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('history');
                  setViewingHistoryResult(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <HistoryIcon className="h-4.5 w-4.5 shrink-0" />
                <span>History</span>
              </button>
              <button
                onClick={() => setActiveTab('doctors')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'doctors'
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <UserCheck className="h-4.5 w-4.5 shrink-0" />
                <span>Find Doctors</span>
              </button>
              <button
                onClick={() => setActiveTab('hospitals')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'hospitals'
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Hospital className="h-4.5 w-4.5 shrink-0" />
                <span>Nearby Hospitals</span>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <User className="h-4.5 w-4.5 shrink-0" />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <SettingsIcon className="h-4.5 w-4.5 shrink-0" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Help Card */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-left">
              <div className="flex items-center gap-2 text-primary mb-2">
                <HelpCircle className="h-4.5 w-4.5" />
                <span className="text-xs font-bold font-heading uppercase">Need Help?</span>
              </div>
              <p className="text-xs text-gray-500 leading-normal font-semibold">
                Our AI assistant is here to guide you through report uploads and symptom reviews.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer text-left"
            >
              <LogOut className="h-4.5 w-4.5 shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Right Main Area */}
        <main className="flex-grow md:ml-64 p-6 md:p-8 bg-gray-50 overflow-y-auto">
          {/* Mobile Tab Selector (Only visible on small devices) */}
          <div className="md:hidden flex items-center gap-1.5 overflow-x-auto pb-4 mb-4 border-b border-gray-100 scrollbar-none">
            <button
              onClick={() => { setActiveTab('new-analysis'); setCurrentAnalysisResult(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 cursor-pointer ${
                activeTab === 'new-analysis' ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-100'
              }`}
            >
              New Scan
            </button>
            <button
              onClick={() => { setActiveTab('history'); setViewingHistoryResult(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 cursor-pointer ${
                activeTab === 'history' ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-100'
              }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 cursor-pointer ${
                activeTab === 'doctors' ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-100'
              }`}
            >
              Doctors
            </button>
            <button
              onClick={() => setActiveTab('hospitals')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 cursor-pointer ${
                activeTab === 'hospitals' ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-100'
              }`}
            >
              Hospitals
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 cursor-pointer ${
                activeTab === 'profile' ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-100'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 cursor-pointer ${
                activeTab === 'settings' ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-100'
              }`}
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-500 shrink-0 bg-red-50 cursor-pointer"
            >
              Logout
            </button>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* 1. NEW ANALYSIS TAB */}
            {activeTab === 'new-analysis' && (
              <div className="space-y-6">
                {isAnalyzing ? (
                  /* Analyzing Loading Screen */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[450px]"
                  >
                    <LoadingSpinner message={analysisProgress} size="lg" />
                    <p className="text-xs text-gray-400 mt-2 font-medium">Please wait, this will take about 3 seconds...</p>
                  </motion.div>
                ) : currentAnalysisResult ? (
                  /* Displaying Analysis Result screen */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Image, diagnosis and details */}
                    <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-left">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                        <button
                          onClick={() => setCurrentAnalysisResult(null)}
                          className="hover:text-primary transition-colors font-bold cursor-pointer"
                        >
                          &larr; Start New Scan
                        </button>
                        <span>&bull;</span>
                        <span>Analysis Result</span>
                      </div>

                      {/* Header row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Possible Condition</p>
                          <h2 className="text-2xl font-bold text-gray-900 mt-0.5">{currentAnalysisResult.condition}</h2>
                        </div>
                        <div className="text-left sm:text-right shrink-0">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">AI Confidence Score</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl font-extrabold text-primary">{currentAnalysisResult.confidence}</span>
                            <Badge variant="success" size="md">High</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Image Preview & Description */}
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-2/5 aspect-[4/3] rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                          <img
                            src={currentAnalysisResult.imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80'}
                            alt="scan-lesion"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow space-y-4">
                          <span className="text-[10px] font-bold text-primary uppercase bg-primary-light px-2 py-0.5 rounded border border-primary/10">Clinical Interpretation</span>
                          <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            {currentAnalysisResult.description}
                          </p>
                          <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start gap-2.5">
                            <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-amber-800 leading-normal font-semibold">
                              <strong>Disclaimer:</strong> This is a computer-generated screening report. It is for informational support only and does not substitute a professional doctor's clinical diagnosis.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* What you can do list */}
                      <div className="space-y-3.5 border-t border-gray-100 pt-6">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">What You Can Do</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentAnalysisResult.advice.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100/50">
                              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-xs text-gray-600 font-semibold leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                        <Button
                          variant="primary"
                          icon={UserCheck}
                          onClick={() => setActiveTab('doctors')}
                        >
                          View Recommended Doctors
                        </Button>
                        <Button
                          variant="outline"
                          icon={Download}
                          onClick={() => alert('Downloading report PDF...')}
                        >
                          Download Report
                        </Button>
                      </div>
                    </div>

                    {/* Right Column: Matched Dermatologists */}
                    <div className="lg:col-span-4 space-y-5 text-left">
                      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4 font-heading">
                          Recommended Dermatologists
                        </h3>
                        <div className="space-y-4">
                          {keralaDoctors.map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-primary/10 transition-colors cursor-pointer group"
                              onClick={() => handleOpenDocModal(doc)}
                            >
                              <img
                                src={doc.photo}
                                alt={doc.name}
                                className="h-12 w-12 rounded-xl object-cover shrink-0"
                              />
                              <div className="flex-grow min-w-0 text-left">
                                <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                                  {doc.name}
                                </h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate">
                                  {doc.hospital.split(',')[0]}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                  <span className="text-xs font-semibold text-gray-700">{doc.rating}</span>
                                </div>
                              </div>
                              <ChevronRight className="h-4.5 w-4.5 text-gray-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard New Scan Upload Form */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left block: Form upload */}
                    <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-left">
                      <div>
                        <h2 className="text-xl font-bold font-heading text-gray-900 mb-1">Start New Analysis</h2>
                        <p className="text-xs text-gray-500 font-medium">Upload an image of your skin concern and describe it. Our AI models will scan it.</p>
                      </div>

                      {/* Drag Drop Area */}
                      <div
                        onClick={handleImageUploadClick}
                        className={`
                          border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300
                          ${uploadedImage 
                            ? 'border-emerald-200 bg-emerald-50/10' 
                            : 'border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-primary/40'
                          }
                        `}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          accept="image/*"
                          className="hidden"
                        />

                        {uploadedImage ? (
                          <div className="space-y-4">
                            <div className="relative w-40 aspect-[4/3] rounded-xl overflow-hidden border border-emerald-100 mx-auto">
                              <img src={uploadedImage} alt="preview" className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 justify-center">
                                <CheckCircle2 className="h-4.5 w-4.5" /> Image uploaded successfully
                              </p>
                              <p className="text-xs text-gray-400 font-medium mt-1">Click box to upload a different image</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="p-3 bg-white text-gray-400 border border-gray-100 rounded-xl shadow-sm inline-block mx-auto">
                              <Upload className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-800">Upload Skin Image</p>
                              <p className="text-xs text-gray-400 font-semibold mt-1">Drag and drop or click to browse files (JPG, PNG, WebP up to 10MB)</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Concern textarea */}
                      <TextArea
                        label="Describe Your Concern"
                        placeholder="e.g., itchy red rashes on my forearm that started showing 3 days ago. It scales slightly..."
                        value={concernText}
                        onChange={(e) => setConcernText(e.target.value)}
                        rows={4}
                      />

                      {/* Tips card */}
                      <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 font-heading">Tips for better analysis</h4>
                        <ul className="space-y-1.5 text-xs text-gray-600 font-semibold">
                          <li className="flex items-center gap-2">
                            <div className="h-1 w-1 bg-primary rounded-full shrink-0" />
                            <span>Ensure the photo has clear, bright lighting.</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-1 w-1 bg-primary rounded-full shrink-0" />
                            <span>Focus directly on the affected skin lesion.</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-1 w-1 bg-primary rounded-full shrink-0" />
                            <span>State symptoms clearly (duration, itching intensity).</span>
                          </li>
                        </ul>
                      </div>

                      {/* Submit */}
                      <Button
                        variant="primary"
                        icon={Sparkles}
                        disabled={!uploadedImage && !concernText}
                        onClick={handleStartAnalysis}
                        className="w-full py-3 justify-center"
                      >
                        Analyse with AI
                      </Button>
                    </div>

                    {/* Right block: Quick history previews */}
                    <div className="lg:col-span-4 space-y-6 text-left">
                      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-base font-bold text-gray-900 font-heading">Recent Analyses</h3>
                          <button
                            onClick={() => setActiveTab('history')}
                            className="text-xs font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer"
                          >
                            View All
                          </button>
                        </div>

                        <div className="space-y-4">
                          {historyItems.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3.5 p-3 rounded-xl border border-gray-100 hover:border-primary/10 transition-colors cursor-pointer group"
                              onClick={() => handleSelectHistoryItem(item)}
                            >
                              <img
                                src={item.imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80'}
                                alt={item.condition}
                                className="h-11 w-11 rounded-lg object-cover shrink-0"
                              />
                              <div className="flex-grow min-w-0 text-left">
                                <h4 className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                                  {item.condition}
                                </h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[10px] text-gray-400 font-bold uppercase">{item.date}</span>
                                  <span className="text-[10px] text-primary font-bold">{item.confidence} Conf.</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. HISTORY TAB */}
            {activeTab === 'history' && (
              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm text-left">
                {viewingHistoryResult ? (
                  /* Detail View of Selected History Record */
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                      <button
                        onClick={() => setViewingHistoryResult(null)}
                        className="hover:text-primary transition-colors font-bold cursor-pointer"
                      >
                        &larr; Back to History
                      </button>
                      <span>&bull;</span>
                      <span>Scan Log #{viewingHistoryResult.id}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Condition Assessed</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-0.5">{viewingHistoryResult.condition}</h2>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">AI Confidence Score</p>
                        <span className="text-2xl font-extrabold text-primary block mt-0.5">{viewingHistoryResult.confidence}</span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-2/5 aspect-[4/3] rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                        <img
                          src={viewingHistoryResult.imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80'}
                          alt={viewingHistoryResult.condition}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-grow space-y-4">
                        <span className="text-[10px] font-bold text-primary uppercase bg-primary-light px-2 py-0.5 rounded border border-primary/10">Clinical Interpretation</span>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                          {viewingHistoryResult.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3.5 border-t border-gray-100 pt-6">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-heading">What You Can Do</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {viewingHistoryResult.advice.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100/50">
                            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-600 font-semibold leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* List Grid of History Items */
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold font-heading text-gray-900 mb-1">Your Diagnostic History</h2>
                      <p className="text-xs text-gray-500 font-medium">A timeline log of all symptom scans and AI diagnostics you have executed.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {historyItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectHistoryItem(item)}
                          className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full group"
                        >
                          <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                            <img src={item.imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80'} alt={item.condition} className="h-full w-full object-cover" />
                            <div className="absolute top-3 right-3">
                              <Badge variant="primary" size="sm">{item.confidence} Conf.</Badge>
                            </div>
                          </div>
                          <div className="p-4 flex flex-col justify-between flex-grow text-left">
                            <div>
                              <h4 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
                                {item.condition}
                              </h4>
                              <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-wider">
                                {item.date} &bull; {item.time}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-primary font-bold mt-4 pt-3 border-t border-gray-50">
                              <span>View details</span>
                              <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. RECOMMENDED DOCTORS TAB */}
            {activeTab === 'doctors' && (
              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm text-left space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold font-heading text-gray-900 mb-1">Find Dermatologists</h2>
                    <p className="text-xs text-gray-500 font-medium">Browse verified dermatology specialists from leading hospitals across India.</p>
                  </div>
                  {/* Filters */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">State:</span>
                      <select
                        value={selectedState}
                        onChange={(e) => {
                          setSelectedState(e.target.value);
                          setSelectedCity('All');
                        }}
                        className="px-3.5 py-2 text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors cursor-pointer"
                      >
                        <option value="All">All States</option>
                        {uniqueStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">City:</span>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="px-3.5 py-2 text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors cursor-pointer"
                      >
                        <option value="All">All Cities</option>
                        {uniqueCities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDoctors.map((doc) => (
                    <div
                      key={doc.id}
                      className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                        <img src={doc.photo} alt={doc.name} className="h-full w-full object-cover object-top" />
                        <div className="absolute top-3 right-3">
                          <Badge variant="accent" size="sm" icon={Star}>{doc.rating}</Badge>
                        </div>
                      </div>
                      <div className="p-4 space-y-4">
                        <div>
                          <h4 className="text-base font-bold text-gray-900">{doc.name}</h4>
                          <p className="text-xs text-primary font-semibold uppercase tracking-wider">{doc.specialty}</p>
                          
                          <div className="space-y-1.5 mt-3">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Building className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                              <span className="truncate">{doc.hospital}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Award className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                              <span>{doc.experience} Years Experience</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-center"
                          onClick={() => handleOpenDocModal(doc)}
                        >
                          Book Appointment
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. NEARBY HOSPITALS TAB */}
            {activeTab === 'hospitals' && (
              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm text-center max-w-2xl mx-auto space-y-8 flex flex-col items-center justify-center">
                <div className="space-y-3">
                  <div className="p-3 bg-primary/10 text-primary rounded-2xl w-fit mx-auto">
                    <Hospital className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold font-heading text-gray-900">Nearby Hospitals</h2>
                  <p className="text-sm text-gray-500 font-medium max-w-md mx-auto">
                    Location-aware hospital discovery is currently under development.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 text-left w-full max-w-md border border-gray-100 space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Soon you'll be able to:</h4>
                  <ul className="space-y-2 text-sm text-gray-600 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Find nearby hospitals
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Filter by medical specialty
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> View emergency availability
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Navigate using Google Maps
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span> Discover trusted hospitals near your location
                    </li>
                  </ul>
                </div>

                {/* House MD Easter Egg */}
                <div className="pt-6 border-t border-gray-100 w-full space-y-4">
                  <div className="max-w-xs mx-auto overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                    <img
                      src='/images/ui/house-md.jpg'
                      alt="House MD Easter Egg"
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        if (!e.target.src.endsWith('house.jpg')) {
                          e.target.src = '/images/ui/house-placeholder.jpg';
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-700 italic">"We're still working on the Geography..."</p>
                    <p className="text-sm font-bold text-primary font-heading">"Until then, why don't you have an Apple?" 🍎</p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. MY PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm text-left max-w-2xl mx-auto space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-heading text-gray-900 mb-1">My Patient Profile</h2>
                  <p className="text-xs text-gray-500 font-medium">Keep your medical metadata up-to-date for better AI analysis matching.</p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      type="text"
                      required
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number"
                      type="text"
                      required
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                    <Input
                      label="Location (City, State)"
                      type="text"
                      required
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      label="Age"
                      type="number"
                      required
                      value={profileData.age}
                      onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                    />
                    <Input
                      label="Gender"
                      type="text"
                      required
                      value={profileData.gender}
                      onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                    />
                    <Input
                      label="Blood Group"
                      type="text"
                      required
                      value={profileData.bloodGroup}
                      onChange={(e) => setProfileData({ ...profileData, bloodGroup: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-100">
                    <Button type="submit" variant="primary">
                      Save Changes
                    </Button>
                    {profileSuccessMsg && (
                      <p className="text-sm text-emerald-600 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="h-4.5 w-4.5" /> Profile details saved successfully!
                      </p>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* 5. SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm text-left max-w-2xl mx-auto space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-heading text-gray-900 mb-1">System Settings</h2>
                  <p className="text-xs text-gray-500 font-medium">Manage notifications, report parameters, and clinical safety sharing.</p>
                </div>

                <div className="space-y-6 divide-y divide-gray-100">
                  {/* Switch 1 */}
                  <div className="flex items-center justify-between py-4">
                    <div className="space-y-0.5 pr-4">
                      <h4 className="text-sm font-bold text-gray-900">AI Reminder Alerts</h4>
                      <p className="text-xs text-gray-500 font-medium">Receive smart push notifications for medication routines and checkups.</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, aiReminders: !settings.aiReminders })}
                      className={`h-6 w-11 rounded-full p-1 cursor-pointer transition-colors shrink-0 ${
                        settings.aiReminders ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    >
                      <div className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        settings.aiReminders ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {/* Switch 2 */}
                  <div className="flex items-center justify-between py-4">
                    <div className="space-y-0.5 pr-4">
                      <h4 className="text-sm font-bold text-gray-900">Email Reports automatically</h4>
                      <p className="text-xs text-gray-500 font-medium">Get a printable PDF diagnostic breakdown emailed to you instantly after a scan.</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, emailReports: !settings.emailReports })}
                      className={`h-6 w-11 rounded-full p-1 cursor-pointer transition-colors shrink-0 ${
                        settings.emailReports ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    >
                      <div className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        settings.emailReports ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {/* Switch 3 */}
                  <div className="flex items-center justify-between py-4">
                    <div className="space-y-0.5 pr-4">
                      <h4 className="text-sm font-bold text-gray-900">Anonymous Clinical Data Contribution</h4>
                      <p className="text-xs text-gray-500 font-medium">Allow anonymous upload of lesion scans to help train AI accuracy models globally.</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, anonymousSharing: !settings.anonymousSharing })}
                      className={`h-6 w-11 rounded-full p-1 cursor-pointer transition-colors shrink-0 ${
                        settings.anonymousSharing ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    >
                      <div className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        settings.anonymousSharing ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {/* Switch 4 */}
                  <div className="flex items-center justify-between py-4">
                    <div className="space-y-0.5 pr-4">
                      <h4 className="text-sm font-bold text-gray-900">Two-Factor Authentication (2FA)</h4>
                      <p className="text-xs text-gray-500 font-medium">Protect your personal health records (PHR) by requiring an OTP on login.</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, mfa: !settings.mfa })}
                      className={`h-6 w-11 rounded-full p-1 cursor-pointer transition-colors shrink-0 ${
                        settings.mfa ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    >
                      <div className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        settings.mfa ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <Button variant="primary" onClick={handleSaveSettings}>
                    Save Settings
                  </Button>
                  {settingsSuccessMsg && (
                    <p className="text-sm text-emerald-600 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="h-4.5 w-4.5" /> Settings saved successfully!
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Doctor Profile / Consultation Modal */}
      {selectedDoc && (
        <Modal
          isOpen={isDocModalOpen}
          onClose={() => setIsDocModalOpen(false)}
          title={`Clinical Profile: ${selectedDoc.name}`}
          size="md"
        >
          {appointmentBooked ? (
            <div className="text-center py-6 space-y-4">
              <div className="p-4 bg-emerald-50 text-emerald-500 rounded-full inline-block">
                <CheckCircle2 className="h-10 w-10 mx-auto" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Appointment Requested!</h4>
              <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed font-semibold">
                An appointment request has been submitted to <strong>{selectedDoc.hospital}</strong>. The clinical desk will text you a confirmation shortly.
              </p>
              <div className="pt-4">
                <Button variant="primary" size="sm" onClick={() => setIsDocModalOpen(false)}>
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-left">
              <div className="flex gap-5 items-start">
                <img
                  src={selectedDoc.photo}
                  alt={selectedDoc.name}
                  className="h-20 w-20 rounded-2xl object-cover border border-gray-100 shrink-0"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{selectedDoc.name}</h4>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider">{selectedDoc.specialty}</p>
                  <p className="text-sm text-gray-500 mt-1 font-semibold flex items-center gap-1.5">
                    <Building className="h-4 w-4 text-gray-400" /> {selectedDoc.hospital}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-gray-800">{selectedDoc.rating}</span>
                    <span className="text-xs text-gray-400">(Expert rating)</span>
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Clinical Experience</span>
                    <strong className="text-sm text-gray-800 font-bold">{selectedDoc.experience} Years</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Consultation Fee</span>
                    <strong className="text-sm text-gray-800 font-bold">₹500 (Free first scan)</strong>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bio & Background</h5>
                  <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                    Specialist in clinical dermatology, acne treatments, allergy management, and laser aesthetics. Graduated from Government Medical College and practicing in leading multi-speciality tertiary centers.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-gray-100">
                <Button variant="outline" size="sm" onClick={() => setIsDocModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleBookAppointment}>
                  Confirm Booking (₹0 First scan)
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
