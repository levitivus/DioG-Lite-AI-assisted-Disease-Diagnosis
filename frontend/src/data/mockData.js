import {
  Brain,
  FileText,
  UserCheck,
  History,
  Clock,
  MapPin,
  Calendar,
  LineChart,
  Shield,
  Activity,
  Heart,
  Sparkles
} from 'lucide-react';

// 1. Featured Doctors from Kerala
export const keralaDoctors = [
  // --- KERALA (8) ---
  {
    id: 'doc-1',
    name: 'Dr. Ananya Nair',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'Aster Medcity, Kochi',
    city: 'Kochi',
    state: 'Kerala',
    rating: '4.8',
    experience: '12+',
    photo: '/images/doctors/dr-ananya-nair.jpg'
  },
  {
    id: 'doc-2',
    name: 'Dr. Rohan Menon',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'KIMSHEALTH, Trivandrum',
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    rating: '4.7',
    experience: '10+',
    photo: '/images/doctors/dr-rohan-menon.jpg'
  },
  {
    id: 'doc-3',
    name: 'Dr. Neha Rajan',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'Baby Memorial Hospital, Kozhikode',
    city: 'Kozhikode',
    state: 'Kerala',
    rating: '4.6',
    experience: '8+',
    photo: '/images/doctors/dr-neha-rajan.jpg'
  },
  {
    id: 'doc-4',
    name: 'Dr. Thomas Paul',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'Rajagiri Hospital, Kochi',
    city: 'Kochi',
    state: 'Kerala',
    rating: '4.9',
    experience: '15+',
    photo: '/images/doctors/dr-thomas-paul.jpg'
  },
  {
    id: 'doc-5',
    name: 'Dr. Lakshmi Pillai',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'Lourdes Hospital, Kochi',
    city: 'Kochi',
    state: 'Kerala',
    rating: '4.5',
    experience: '7+',
    photo: '/images/doctors/dr-lakshmi-pillai.jpg'
  },
  {
    id: 'doc-6',
    name: 'Dr. Madhavan Kutty',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'Amala Institute of Medical Sciences, Thrissur',
    city: 'Thrissur',
    state: 'Kerala',
    rating: '4.7',
    experience: '18+',
    photo: '/images/doctors/dr-madhavan-kutty.jpg'
  },
  {
    id: 'doc-7',
    name: 'Dr. Sandeep Warrier',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'Caritas Hospital, Kottayam',
    city: 'Kottayam',
    state: 'Kerala',
    rating: '4.8',
    experience: '14+',
    photo: '/images/doctors/dr-sandeep-warrier.jpg'
  },
  {
    id: 'doc-8',
    name: 'Dr. Divya Chandran',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'KIMSHEALTH, Trivandrum',
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    rating: '4.6',
    experience: '9+',
    photo: '/images/doctors/dr-divya-chandran.jpg'
  },
  // --- TAMIL NADU (6) ---
  {
    id: 'doc-9',
    name: 'Dr. Karthik Sundaram',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'Apollo Hospitals, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    rating: '4.9',
    experience: '16+',
    photo: '/images/doctors/dr-karthik-sundaram.jpg'
  },
  {
    id: 'doc-10',
    name: 'Dr. Priyadarshini Ramasamy',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'MIOT International, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    rating: '4.8',
    experience: '11+',
    photo: '/images/doctors/dr-priyadarshini-ramasamy.jpg'
  },
  {
    id: 'doc-11',
    name: 'Dr. Vikram Sethupathi',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'PSG Hospitals, Coimbatore',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    rating: '4.7',
    experience: '13+',
    photo: '/images/doctors/dr-vikram-sethupathi.jpg'
  },
  {
    id: 'doc-12',
    name: 'Dr. Meenakshi Sundar',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'Kauvery Hospital, Tiruchirappalli',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    rating: '4.5',
    experience: '6+',
    photo: '/images/doctors/dr-meenakshi-sundar.jpg'
  },
  {
    id: 'doc-13',
    name: 'Dr. Saravanan Muthu',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'Apollo Specialty Hospitals, Madurai',
    city: 'Madurai',
    state: 'Tamil Nadu',
    rating: '4.6',
    experience: '9+',
    photo: '/images/doctors/dr-saravanan-muthu.jpg'
  },
  {
    id: 'doc-14',
    name: 'Dr. Shalini Krishnan',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'PSG Hospitals, Coimbatore',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    rating: '4.8',
    experience: '12+',
    photo: '/images/doctors/dr-shalini-krishnan.jpg'
  },
  // --- KARNATAKA (6) ---
  {
    id: 'doc-15',
    name: 'Dr. Abhinav Hegde',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'Manipal Hospitals, Bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    rating: '4.9',
    experience: '17+',
    photo: '/images/doctors/dr-abhinav-hegde.jpg'
  },
  {
    id: 'doc-16',
    name: 'Dr. Kavitha Rao',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'Nayana Health, Bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    rating: '4.7',
    experience: '11+',
    photo: '/images/doctors/dr-kavitha-rao.jpg'
  },
  {
    id: 'doc-17',
    name: 'Dr. Sanjay Deshmukh',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'Aster CMI Hospital, Bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    rating: '4.8',
    experience: '14+',
    photo: '/images/doctors/dr-sanjay-deshmukh.jpg'
  },
  {
    id: 'doc-18',
    name: 'Dr. Pooja Shetty',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'Yenepoya Specialty Hospital, Mangaluru',
    city: 'Mangaluru',
    state: 'Karnataka',
    rating: '4.6',
    experience: '8+',
    photo: '/images/doctors/dr-pooja-shetty.jpg'
  },
  {
    id: 'doc-19',
    name: 'Dr. Rajesh Murthy',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'JSS Hospital, Mysuru',
    city: 'Mysuru',
    state: 'Karnataka',
    rating: '4.7',
    experience: '12+',
    photo: '/images/doctors/dr-rajesh-murthy.jpg'
  },
  {
    id: 'doc-20',
    name: 'Dr. Shreya Joshi',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'SDM College of Medical Sciences, Hubballi',
    city: 'Hubballi',
    state: 'Karnataka',
    rating: '4.5',
    experience: '7+',
    photo: '/images/doctors/dr-shreya-joshi.jpg'
  },
  // --- MAHARASHTRA (6) ---
  {
    id: 'doc-21',
    name: 'Dr. Amit Kulkarni',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'Kokilaben Hospital, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    rating: '4.9',
    experience: '20+',
    photo: '/images/doctors/dr-amit-kulkarni.jpg'
  },
  {
    id: 'doc-22',
    name: 'Dr. Neha Deshpande',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'Lilavati Hospital, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    rating: '4.8',
    experience: '12+',
    photo: '/images/doctors/dr-neha-deshpande.jpg'
  },
  {
    id: 'doc-23',
    name: 'Dr. Aditya Patwardhan',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'Ruby Hall Clinic, Pune',
    city: 'Pune',
    state: 'Maharashtra',
    rating: '4.7',
    experience: '15+',
    photo: '/images/doctors/dr-aditya-patwardhan.jpg'
  },
  {
    id: 'doc-24',
    name: 'Dr. Tanvi Sawant',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'Jupiter Hospital, Pune',
    city: 'Pune',
    state: 'Maharashtra',
    rating: '4.6',
    experience: '9+',
    photo: '/images/doctors/dr-tanvi-sawant.jpg'
  },
  {
    id: 'doc-25',
    name: 'Dr. Rahul Wankhede',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'Wockhardt Hospitals, Nagpur',
    city: 'Nagpur',
    state: 'Maharashtra',
    rating: '4.8',
    experience: '11+',
    photo: '/images/doctors/dr-rahul-wankhede.jpg'
  },
  {
    id: 'doc-26',
    name: 'Dr. Pallavi Shinde',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'Sahyadri Super Speciality Hospital, Nashik',
    city: 'Nashik',
    state: 'Maharashtra',
    rating: '4.5',
    experience: '7+',
    photo: '/images/doctors/dr-pallavi-shinde.jpg'
  },
  // --- DELHI (4) ---
  {
    id: 'doc-27',
    name: 'Dr. Sameer Gupta',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'Max Super Speciality Hospital, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    rating: '4.9',
    experience: '19+',
    photo: '/images/doctors/dr-sameer-gupta.jpg'
  },
  {
    id: 'doc-28',
    name: 'Dr. Aisha Siddiqui',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'Fortis Escorts, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    rating: '4.8',
    experience: '13+',
    photo: '/images/doctors/dr-aisha-siddiqui.jpg'
  },
  {
    id: 'doc-29',
    name: 'Dr. Rajat Verma',
    gender: 'Male',
    specialty: 'MD, Dermatology',
    hospital: 'BLK-Max Hospital, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    rating: '4.7',
    experience: '14+',
    photo: '/images/doctors/dr-rajat-verma.jpg'
  },
  {
    id: 'doc-30',
    name: 'Dr. Meera Sen',
    gender: 'Female',
    specialty: 'MD, Dermatology',
    hospital: 'Apollo Hospital Delhi, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    rating: '4.6',
    experience: '8+',
    photo: '/images/doctors/dr-meera-sen.jpg'
  }
];

// 2. Features Grid (8 features)
export const featuresData = [
  {
    id: 'feat-1',
    icon: Brain,
    title: 'AI Symptom Analysis',
    description: 'Get immediate clinical-grade insights about your skin concerns and general symptoms in seconds using advanced AI.',
  },
  {
    id: 'feat-2',
    icon: FileText,
    title: 'Medical Report Interpretation',
    description: 'Upload lab tests, blood reports, or skin scans and receive clear, patient-friendly explanations of every value.',
  },
  {
    id: 'feat-3',
    icon: UserCheck,
    title: 'Doctor Recommendations',
    description: 'Instantly connect with top-rated specialists in Kerala matched specifically to your diagnosed concerns.',
  },
  {
    id: 'feat-4',
    icon: History,
    title: 'Health History Tracking',
    description: 'Keep a private, encrypted digital timeline of your previous analyses, report logs, and recovery progress.',
  },
  {
    id: 'feat-5',
    icon: Clock,
    title: 'Medicine Reminders',
    description: 'Never miss a dose. Schedule smart reminders for your prescriptions with easy snoozing and alerts.',
  },
  {
    id: 'feat-6',
    icon: MapPin,
    title: 'Nearby Specialists',
    description: 'Geolocate pharmacies, clinics, and leading multispecialty hospitals closest to your location in Kerala.',
  },
  {
    id: 'feat-7',
    icon: Calendar,
    title: 'Appointment Assistance',
    description: 'Check doctor availability and easily schedule clinical visits or teleconsultations without phone queues.',
  },
  {
    id: 'feat-8',
    icon: LineChart,
    title: 'Personalized Health Insights',
    description: 'Receive weekly health insights, lifestyle recommendations, and preventative tips tailored to your profile.',
  }
];

// 3. How It Works (6 steps)
export const howItWorksSteps = [
  {
    step: '01',
    title: 'Create an Account',
    description: 'Sign up securely using your email. We maintain strict compliance standards to keep your medical data private.',
  },
  {
    step: '02',
    title: 'Upload Photo or Describe Symptoms',
    description: 'Take a clear photo of your skin concern or describe your general symptoms in natural language.',
  },
  {
    step: '03',
    title: 'AI-Powered Diagnostic Scan',
    description: 'Our proprietary AI scans the input against extensive clinical datasets to generate accurate assessments.',
  },
  {
    step: '04',
    title: 'Review Structured AI Insights',
    description: 'Get a clear summary including likely conditions, confidence scores, risk categories, and explanations.',
  },
  {
    step: '05',
    title: 'Get Matched with Doctors',
    description: 'If specialized care is recommended, review top doctors in Kochi, Trivandrum, or Kozhikode matched to you.',
  },
  {
    step: '06',
    title: 'Book a Consultation',
    description: 'Book online teleconsultations or in-person visits to proceed with verified professional medical advice.',
  }
];

// 4. Testimonials (4 entries)
export const testimonialsData = [
  {
    id: 'test-1',
    quote: 'The AI analysis was extremely quick and surprisingly accurate. It helped me understand my skin condition before my appointment, saving me a lot of anxiety.',
    author: 'Riya S.',
    location: 'Kochi, Kerala',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 'test-2',
    quote: 'I found the right dermatologist near me in Trivandrum in just minutes. The report interpretation feature translated complex terms into plain English.',
    author: 'Arjun K.',
    location: 'Trivandrum, Kerala',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 'test-3',
    quote: 'The history tracking is brilliant. I could easily monitor my eczema treatment progress and share the compiled reports with my doctor.',
    author: 'Megha T.',
    location: 'Kozhikode, Kerala',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 'test-4',
    quote: 'An essential app for every family. The symptom analysis gives instant peace of mind and directs you to the absolute best specialists in Kerala.',
    author: 'Dr. Vivek R.',
    location: 'Thrissur, Kerala',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
  }
];

// 5. Statistics
export const statisticsData = [
  {
    id: 'stat-1',
    icon: Activity,
    value: '10,000+',
    label: 'Analyses Completed',
  },
  {
    id: 'stat-2',
    icon: Shield,
    value: '98%',
    label: 'User Satisfaction',
  },
  {
    id: 'stat-3',
    icon: Sparkles,
    value: '50+',
    label: 'Conditions Supported',
  },
  {
    id: 'stat-4',
    icon: UserCheck,
    value: '200+',
    label: 'Kerala Specialists',
  }
];

// 6. Recent analyses mock data for Dashboard
export const mockAnalysesHistory = [
  {
    id: 'an-1',
    condition: 'Acne Vulgaris',
    confidence: '82%',
    date: 'Jun 23, 2026',
    time: '10:30 AM',
    imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=200',
    description: 'Your image shows characteristics commonly associated with acne vulgaris. This is a preliminary analysis and not a medical diagnosis. Please consult a dermatologist for a proper diagnosis.',
    advice: [
      'Maintain a gentle skincare routine',
      'Avoid squeezing or picking',
      'Keep the affected area clean',
      'Consult a dermatologist for personalized treatment'
    ]
  },
  {
    id: 'an-2',
    condition: 'Atopic Dermatitis (Eczema)',
    confidence: '74%',
    date: 'Jun 18, 2026',
    time: '04:15 PM',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200',
    description: 'Dry, red, itchy patches suggest dermatitis. Keeping the skin moisturized with gentle ointments is critical. An evaluation by a medical professional will help determine triggers.',
    advice: [
      'Moisturize multiple times daily',
      'Use lukewarm water for baths',
      'Avoid scented soaps and harsh chemicals',
      'Identify and avoid specific allergy triggers'
    ]
  },
  {
    id: 'an-3',
    condition: 'Psoriasis Flareup',
    confidence: '68%',
    date: 'Jun 15, 2026',
    time: '11:22 AM',
    imageUrl: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=200',
    description: 'Characteristics align with silver-scaled plaque patterns. Flare-ups can be triggered by stress, weather changes, or skin injuries.',
    advice: [
      'Apply thick moisturizing creams',
      'Avoid scratching or irritating the scales',
      'Expose skin to moderate sunlight',
      'Schedule a dermatology review for topical therapies'
    ]
  }
];
