import React, { useState } from 'react';
import { Heart, Video, Pill, Users, Car, Activity, MapPin, Calendar, Phone, Search, Menu, X, ChevronRight, Clock, Star, Send, Bot, MessageCircle, Filter, TrendingUp, Bed, CheckCircle, AlertCircle, ArrowLeft, User, Mail, CreditCard, Home } from 'lucide-react';

export default function HealthcarePlatform() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hello! I\'m your health assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Mock Data
  const allDoctors = [
    { id: 1, name: 'Dr. Priya Sharma', specialty: 'General Physician', distance: '2.3 km', rating: 4.8, available: 'Today 3:00 PM', experience: '12 years', fee: 500, education: 'MBBS, MD', languages: ['English', 'Hindi', 'Tamil'] },
    { id: 2, name: 'Dr. Rajesh Kumar', specialty: 'Pediatrician', distance: '3.5 km', rating: 4.9, available: 'Today 4:30 PM', experience: '15 years', fee: 600, education: 'MBBS, DCH', languages: ['English', 'Hindi'] },
    { id: 3, name: 'Dr. Anita Desai', specialty: 'Gynecologist', distance: '5.1 km', rating: 4.7, available: 'Tomorrow 10:00 AM', experience: '10 years', fee: 700, education: 'MBBS, DGO', languages: ['English', 'Hindi', 'Marathi'] },
    { id: 4, name: 'Dr. Amit Patel', specialty: 'Cardiologist', distance: '4.2 km', rating: 4.9, available: 'Today 5:00 PM', experience: '18 years', fee: 1000, education: 'MBBS, MD, DM', languages: ['English', 'Gujarati'] },
    { id: 5, name: 'Dr. Meera Singh', specialty: 'Dermatologist', distance: '3.8 km', rating: 4.6, available: 'Tomorrow 11:00 AM', experience: '8 years', fee: 800, education: 'MBBS, MD (Dermatology)', languages: ['English', 'Hindi', 'Punjabi'] },
    { id: 6, name: 'Dr. Suresh Reddy', specialty: 'Orthopedic', distance: '6.5 km', rating: 4.8, available: 'Today 6:00 PM', experience: '20 years', fee: 900, education: 'MBBS, MS (Ortho)', languages: ['English', 'Telugu'] }
  ];

  const services = [
    { id: 1, name: 'General Consultation', icon: Users, description: 'Comprehensive health checkups and consultations', price: '₹500', duration: '30 mins' },
    { id: 2, name: 'Video Consultation', icon: Video, description: 'Online doctor consultations from home', price: '₹300', duration: '20 mins' },
    { id: 3, name: 'Emergency Care', icon: Car, description: '24/7 emergency ambulance services', price: 'Variable', duration: 'Immediate' },
    { id: 4, name: 'Medicine Delivery', icon: Pill, description: 'Doorstep delivery of prescribed medicines', price: 'Free', duration: '2-4 hours' },
    { id: 5, name: 'Lab Tests', icon: Activity, description: 'Home sample collection and lab testing', price: '₹200+', duration: '1 day' },
    { id: 6, name: 'Health Monitoring', icon: Heart, description: 'Continuous health tracking and alerts', price: '₹99/month', duration: 'Ongoing' }
  ];

  const healthMetrics = [
    { name: 'Heart Rate', value: '72 bpm', status: 'normal', trend: 'up', change: '+2', icon: Heart, color: 'red' },
    { name: 'Blood Pressure', value: '120/80', status: 'normal', trend: 'stable', change: '0', icon: Activity, color: 'blue' },
    { name: 'Steps Today', value: '8,542', status: 'good', trend: 'up', change: '+1,200', icon: TrendingUp, color: 'green' },
    { name: 'Sleep', value: '7.5 hrs', status: 'good', trend: 'up', change: '+0.5', icon: Clock, color: 'purple' }
  ];

  const hospitals = [
    { name: 'City General Hospital', distance: '2.5 km', totalBeds: 50, available: 8, icuBeds: 10, icuAvailable: 2, contact: '1800-XXX-0001' },
    { name: 'Seva Medical Center', distance: '3.8 km', totalBeds: 30, available: 5, icuBeds: 8, icuAvailable: 1, contact: '1800-XXX-0002' },
    { name: 'Care Hospital', distance: '5.2 km', totalBeds: 60, available: 12, icuBeds: 15, icuAvailable: 4, contact: '1800-XXX-0003' },
    { name: 'Life Line Hospital', distance: '6.0 km', totalBeds: 40, available: 3, icuBeds: 12, icuAvailable: 0, contact: '1800-XXX-0004' }
  ];

  // Chatbot logic
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages([...chatMessages, { type: 'user', message: userMessage }]);
    setChatInput('');

    // Simple bot responses based on keywords
    setTimeout(() => {
      let botResponse = '';
      const lowerMessage = userMessage.toLowerCase();

      if (lowerMessage.includes('doctor') || lowerMessage.includes('appointment')) {
        botResponse = 'I can help you find a doctor! Please visit the Doctors page to browse specialists, or I can suggest: Would you like a General Physician, Cardiologist, or Pediatrician?';
      } else if (lowerMessage.includes('emergency') || lowerMessage.includes('ambulance')) {
        botResponse = 'For emergencies, please call 108 immediately. I can also show you nearby hospitals with ICU availability. Would you like to see that?';
      } else if (lowerMessage.includes('icu') || lowerMessage.includes('bed')) {
        botResponse = 'I found 4 hospitals nearby with available ICU beds. City General Hospital has 2 ICU beds available (2.5 km away). Would you like more details?';
      } else if (lowerMessage.includes('medicine') || lowerMessage.includes('pharmacy')) {
        botResponse = 'You can order medicines through our Medicine Delivery service. Upload your prescription and we\'ll deliver within 2-4 hours. Would you like to proceed?';
      } else if (lowerMessage.includes('health') || lowerMessage.includes('tracking')) {
        botResponse = 'Your health metrics look good! Heart rate: 72 bpm, BP: 120/80. You\'ve walked 8,542 steps today. Would you like a detailed health report?';
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        botResponse = 'Hello! How can I assist you today? I can help with finding doctors, booking appointments, checking ICU availability, or answering health questions.';
      } else {
        botResponse = 'I understand you need help. I can assist with:\n• Finding and booking doctors\n• Checking ICU bed availability\n• Health tracking\n• Medicine delivery\n• Emergency services\n\nWhat would you like to know more about?';
      }

      setChatMessages(prev => [...prev, { type: 'bot', message: botResponse }]);
    }, 1000);
  };

  // Filtered doctors based on search and specialty
  const filteredDoctors = allDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const specialties = ['all', ...new Set(allDoctors.map(d => d.specialty))];

  // Page Components
  const HomePage = () => (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center animate-fade-in-up">
          <h1 className="heading text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Healthcare Made <span className="gradient-text">Simple</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Connect with doctors, track your health, and access medical services from anywhere
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors, specialties, services..."
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-base"
              />
            </div>
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="heading text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
          Quick Access
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: Car, title: 'Emergency', subtitle: 'Ambulance & ICU', page: 'icu', color: 'from-red-500 to-orange-500' },
            { icon: Video, title: 'Consult Online', subtitle: 'Video & Audio', page: 'doctors', color: 'from-blue-500 to-cyan-500' },
            { icon: Users, title: 'Find Doctors', subtitle: 'Nearby specialists', page: 'doctors', color: 'from-green-500 to-teal-500' },
            { icon: Pill, title: 'Medicines', subtitle: 'Home delivery', page: 'services', color: 'from-purple-500 to-pink-500' }
          ].map((service, index) => (
            <div
              key={index}
              onClick={() => setCurrentPage(service.page)}
              className="card-hover bg-white rounded-2xl p-6 text-center cursor-pointer shadow-lg animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-md`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="heading text-2xl sm:text-3xl font-bold text-gray-900">
            Nearby Doctors
          </h2>
          <button 
            onClick={() => setCurrentPage('doctors')}
            className="text-orange-600 font-semibold flex items-center space-x-1 hover:text-orange-700 transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allDoctors.slice(0, 3).map((doctor, index) => (
            <div
              key={doctor.id}
              className="card-hover bg-white rounded-3xl p-6 shadow-lg animate-slide-in cursor-pointer"
              onClick={() => {
                setSelectedDoctor(doctor);
                setCurrentPage('doctors');
              }}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {doctor.name.split(' ')[1][0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-green-600" fill="currentColor" />
                  <span className="text-sm font-semibold text-green-700">{doctor.rating}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>{doctor.distance} away</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>{doctor.available}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Activity className="w-4 h-4 text-purple-500" />
                  <span>{doctor.experience} experience</span>
                </div>
              </div>

              <button className="w-full px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Activity, title: 'Health Tracking', description: 'AI-powered health monitoring', page: 'health' },
            { icon: MapPin, title: 'ICU Availability', description: 'Real-time bed status', page: 'icu' },
            { icon: Calendar, title: 'Easy Booking', description: 'One-tap appointments', page: 'booking' },
            { icon: Phone, title: 'Mentorship', description: 'Hospital guidance', page: 'services' }
          ].map((feature, index) => (
            <div
              key={index}
              onClick={() => setCurrentPage(feature.page)}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-[3rem] p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -ml-48 -mb-48"></div>

          <div className="relative z-10 max-w-3xl">
            <h2 className="heading text-4xl lg:text-5xl font-bold mb-6">
              Join 10,000+ People Getting Better Healthcare
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your journey to better health today. Connect with doctors, book appointments,
              and access medical services from the comfort of your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:bg-gray-50 transition-all hover:scale-105 shadow-xl">
                Create Free Account
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const DoctorsPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => {
          setCurrentPage('home');
          setSelectedDoctor(null);
        }}
        className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Back to Home</span>
      </button>

      {selectedDoctor ? (
        // Doctor Detail View
        <div className="animate-fade-in-up">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-8 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-3xl backdrop-blur">
                    {selectedDoctor.name.split(' ')[1][0]}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{selectedDoctor.name}</h1>
                    <p className="text-xl opacity-90">{selectedDoctor.specialty}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Star className="w-5 h-5" fill="currentColor" />
                      <span className="text-lg font-semibold">{selectedDoctor.rating}/5.0</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-900">Professional Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Activity className="w-5 h-5 text-orange-500" />
                      <span>{selectedDoctor.experience} of experience</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <User className="w-5 h-5 text-blue-500" />
                      <span>{selectedDoctor.education}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <MapPin className="w-5 h-5 text-green-500" />
                      <span>{selectedDoctor.distance} away</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <CreditCard className="w-5 h-5 text-purple-500" />
                      <span>₹{selectedDoctor.fee} consultation fee</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4 text-gray-900">Languages</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedDoctor.languages.map((lang, idx) => (
                      <span key={idx} className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-semibold">
                        {lang}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-bold text-lg mb-4 text-gray-900">Next Available</h3>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold">{selectedDoctor.available}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentPage('booking')}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
                >
                  Book Appointment
                </button>
                <button className="px-6 py-4 bg-blue-500 text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                  <Video className="w-6 h-6" />
                  <span>Video Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Doctors List View
        <>
          <h1 className="heading text-4xl font-bold text-gray-900 mb-8">Find Doctors</h1>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none appearance-none bg-white"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty === 'all' ? 'All Specialties' : specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                className="card-hover bg-white rounded-3xl p-6 shadow-lg cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {doctor.name.split(' ')[1][0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-green-600" fill="currentColor" />
                    <span className="text-sm font-semibold text-green-700">{doctor.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span>{doctor.distance} away</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{doctor.available}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CreditCard className="w-4 h-4 text-purple-500" />
                    <span>₹{doctor.fee} consultation</span>
                  </div>
                </div>

                <button className="w-full px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  const ServicesPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => setCurrentPage('home')}
        className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Back to Home</span>
      </button>

      <h1 className="heading text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
      <p className="text-lg text-gray-600 mb-8">Comprehensive healthcare services at your fingertips</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="card-hover bg-white rounded-3xl p-8 shadow-lg"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mb-6">
              <service.icon className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-3">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="text-sm text-gray-500">Starting from</p>
                <p className="text-lg font-bold text-orange-600">{service.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="text-sm font-semibold text-gray-700">{service.duration}</p>
              </div>
            </div>
            <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Book Service
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const HealthTrackingPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => setCurrentPage('home')}
        className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Back to Home</span>
      </button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="heading text-4xl font-bold text-gray-900 mb-2">Health Dashboard</h1>
          <p className="text-lg text-gray-600">Track your health metrics in real-time</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-sm font-semibold text-gray-700">2 minutes ago</p>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {healthMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
              </div>
              <div className={`flex items-center space-x-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-gray-600'}`}>
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">{metric.change}</span>
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">{metric.name}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
              metric.status === 'normal' || metric.status === 'good' 
                ? 'bg-green-50 text-green-700' 
                : 'bg-yellow-50 text-yellow-700'
            }`}>
              {metric.status === 'normal' || metric.status === 'good' ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
              {metric.status}
            </div>
          </div>
        ))}
      </div>

      {/* Activity Chart Placeholder */}
      <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Activity</h2>
        <div className="h-64 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl flex items-center justify-center">
          <p className="text-gray-500">Chart visualization (Connect backend for live data)</p>
        </div>
      </div>

      {/* Health Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Health Tips</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
              <span>Drink 8 glasses of water daily</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
              <span>Get 7-8 hours of sleep</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
              <span>Walk 10,000 steps per day</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Upcoming Check-ups</h3>
          <div className="space-y-4">
            <div className="bg-white/20 backdrop-blur rounded-xl p-4">
              <p className="font-semibold mb-1">Annual Physical</p>
              <p className="text-sm opacity-90">Dr. Priya Sharma • Feb 20, 2026</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4">
              <p className="font-semibold mb-1">Dental Cleaning</p>
              <p className="text-sm opacity-90">Dr. Amit Patel • Mar 5, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ICUAvailabilityPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => setCurrentPage('home')}
        className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Back to Home</span>
      </button>

      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <h1 className="heading text-4xl font-bold text-gray-900">ICU Bed Availability</h1>
          <div className="animate-pulse-soft">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
        <p className="text-lg text-gray-600">Real-time availability of ICU beds in nearby hospitals</p>
        <p className="text-sm text-gray-500 mt-2">Last updated: Just now</p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Bed className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Hospitals</p>
              <p className="text-2xl font-bold text-gray-900">{hospitals.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available ICU Beds</p>
              <p className="text-2xl font-bold text-green-600">
                {hospitals.reduce((sum, h) => sum + h.icuAvailable, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Regular Beds</p>
              <p className="text-2xl font-bold text-orange-600">
                {hospitals.reduce((sum, h) => sum + h.available, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Cards */}
      <div className="space-y-6">
        {hospitals.map((hospital, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 shadow-lg animate-slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{hospital.name}</h3>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span>{hospital.distance} away</span>
                    </div>
                  </div>
                  {hospital.icuAvailable > 0 ? (
                    <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                      <span className="text-sm font-semibold text-green-700">Available</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 bg-red-50 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-red-700">Full</span>
                    </div>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-600 font-semibold mb-2">ICU Beds</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-blue-900">{hospital.icuAvailable}</span>
                      <span className="text-gray-600">/ {hospital.icuBeds}</span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(hospital.icuAvailable / hospital.icuBeds) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm text-green-600 font-semibold mb-2">Regular Beds</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-green-900">{hospital.available}</span>
                      <span className="text-gray-600">/ {hospital.totalBeds}</span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${(hospital.available / hospital.totalBeds) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:w-48">
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Call Hospital
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                  Get Directions
                </button>
                <p className="text-sm text-gray-500 text-center">{hospital.contact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Contact */}
      <div className="mt-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
            <Phone className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">Emergency Services</h3>
            <p className="opacity-90">For immediate assistance, call our 24/7 helpline</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 px-6 py-4 bg-white text-red-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">
            Call 108 (Ambulance)
          </button>
          <button className="flex-1 px-6 py-4 bg-white/20 backdrop-blur border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all">
            Chat with Support
          </button>
        </div>
      </div>
    </div>
  );

  const BookingPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      symptoms: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Mock booking confirmation
      alert('Appointment booked successfully! You will receive a confirmation email shortly.');
      setCurrentPage('home');
    };

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="heading text-3xl font-bold text-gray-900 mb-2">Book an Appointment</h1>
          <p className="text-gray-600 mb-8">Fill in your details to schedule your visit</p>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  bookingStep >= step 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    bookingStep > step ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {bookingStep === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-xl font-bold text-gray-900">Schedule Details</h2>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time</label>
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="">Select a time slot</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Symptoms / Reason for Visit</label>
                  <textarea
                    required
                    value={formData.symptoms}
                    onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none resize-none"
                    placeholder="Describe your symptoms or reason for consultation..."
                  />
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Your Booking</h2>
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold text-gray-900">{formData.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold text-gray-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-semibold text-gray-900">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold text-gray-900">{formData.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold text-gray-900">{formData.time}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <span className="text-gray-600 block mb-2">Reason:</span>
                    <p className="text-gray-900">{formData.symptoms}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              {bookingStep > 1 && (
                <button
                  type="button"
                  onClick={() => setBookingStep(bookingStep - 1)}
                  className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Previous
                </button>
              )}
              {bookingStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setBookingStep(bookingStep + 1)}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Main Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'DM Sans', sans-serif;
        }
        
        h1, h2, h3, .heading {
          font-family: 'Crimson Pro', serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slide-in {
          animation: slideInRight 0.5s ease-out forwards;
        }

        .animate-pulse-soft {
          animation: pulse 2s ease-in-out infinite;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .gradient-text {
          background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.9);
        }

        .chat-container {
          max-height: 400px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #f97316 #fef3c7;
        }

        .chat-container::-webkit-scrollbar {
          width: 6px;
        }

        .chat-container::-webkit-scrollbar-track {
          background: #fef3c7;
          border-radius: 10px;
        }

        .chat-container::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }
      `}</style>

      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <div>
                <h1 className="heading text-2xl font-bold gradient-text">SevaHealth</h1>
                <p className="text-xs text-orange-700 hidden sm:block">Rural Healthcare Network</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`font-medium transition-colors ${currentPage === 'home' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('doctors')}
                className={`font-medium transition-colors ${currentPage === 'doctors' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
              >
                Doctors
              </button>
              <button 
                onClick={() => setCurrentPage('services')}
                className={`font-medium transition-colors ${currentPage === 'services' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
              >
                Services
              </button>
              <button 
                onClick={() => setCurrentPage('health')}
                className={`font-medium transition-colors ${currentPage === 'health' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
              >
                Health
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
                Sign In
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-orange-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-orange-200 animate-fade-in-up">
              <nav className="flex flex-col space-y-3">
                <button 
                  onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                  className="text-left px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => { setCurrentPage('doctors'); setIsMenuOpen(false); }}
                  className="text-left px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  Doctors
                </button>
                <button 
                  onClick={() => { setCurrentPage('services'); setIsMenuOpen(false); }}
                  className="text-left px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  Services
                </button>
                <button 
                  onClick={() => { setCurrentPage('health'); setIsMenuOpen(false); }}
                  className="text-left px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  Health Tracking
                </button>
                <button 
                  onClick={() => { setCurrentPage('icu'); setIsMenuOpen(false); }}
                  className="text-left px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  ICU Availability
                </button>
                <button 
                  onClick={() => { setCurrentPage('booking'); setIsMenuOpen(false); }}
                  className="text-left px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  Book Appointment
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'doctors' && <DoctorsPage />}
      {currentPage === 'services' && <ServicesPage />}
      {currentPage === 'health' && <HealthTrackingPage />}
      {currentPage === 'icu' && <ICUAvailabilityPage />}
      {currentPage === 'booking' && <BookingPage />}

      {/* Chatbot Button */}
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center justify-center"
      >
        {isChatbotOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chatbot Window */}
      {isChatbotOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden animate-fade-in-up">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Health Assistant</h3>
                <p className="text-xs opacity-90">Online • Here to help</p>
              </div>
            </div>
          </div>

          <div className="chat-container p-4 space-y-4 bg-gray-50">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                      : 'bg-white text-gray-900 shadow-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <h3 className="heading text-xl font-bold gradient-text">SevaHealth</h3>
              </div>
              <p className="text-sm text-gray-600">
                Bringing quality healthcare to every corner of rural India.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => setCurrentPage('doctors')} className="hover:text-orange-600 transition-colors">Find Doctors</button></li>
                <li><button onClick={() => setCurrentPage('services')} className="hover:text-orange-600 transition-colors">Services</button></li>
                <li><button onClick={() => setCurrentPage('health')} className="hover:text-orange-600 transition-colors">Health Tracking</button></li>
                <li><button onClick={() => setCurrentPage('icu')} className="hover:text-orange-600 transition-colors">ICU Availability</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Emergency</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="font-semibold text-red-600">108 - Ambulance</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-orange-600" />
                  <span className="font-semibold text-orange-600">1800-XXX-XXXX</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>© 2026 SevaHealth. Made with ❤️ for rural communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
