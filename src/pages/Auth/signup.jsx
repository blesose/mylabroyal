import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { apiService } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { 
  UserPlus, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Calendar, 
  Users, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Shield, 
  Zap,
  Heart,
  Crown,
  Flower2,
  Flower,
  Dumbbell,
  ArrowRight,
  Star,
  CheckCircle,
  Info,
  Smartphone
} from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    gender: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Royal name is required';
    if (!formData.userName.trim()) errors.userName = 'Username is required';
    if (!formData.email.includes('@')) errors.email = 'Valid email required';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.dob) errors.dob = 'Date of birth is required';
    if (!formData.gender) errors.gender = 'Please select gender';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly', {
        icon: '⚠️',
        style: {
          background: 'linear-gradient(to right, #F4F1E9, #B1D182)',
          color: '#0B132B',
          borderRadius: '12px',
          fontWeight: '600',
          border: '2px solid #688F48'
        }
      });
      return;
    }

    const registerToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0B132B]"></div>
        <span className="font-medium text-[#0B132B]">Creating your royal membership...</span>
      </div>,
      { 
        style: {
          background: 'linear-gradient(to right, #F4F1E9, #B1D182)',
          color: '#0B132B',
          borderRadius: '12px',
          fontWeight: '600',
          border: '1px solid #B1D182'
        },
        duration: Infinity
      }
    );

    try {
      setLoading(true);

      const result = await apiService.register(formData);

      if (result.success) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        toast.dismiss(registerToast);
        
        // Royal welcome toast
        toast.success(
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Crown className="h-6 w-6 text-[#688F48]" />
              <div>
                <div className="font-bold text-lg text-[#0B132B]">Royal Membership Created! 👑</div>
                <div className="text-sm opacity-90 text-[#0B132B]">Welcome to the MyLab Royal Family</div>
              </div>
            </div>
          </div>,
          { 
            style: {
              background: 'linear-gradient(to right, #B1D182, #688F48)',
              color: '#0B132B',
              borderRadius: '12px',
              fontWeight: '600',
              border: '2px solid #688F48'
            },
            duration: 3000 
          }
        );

        // Celebration toast
        setTimeout(() => {
          toast.custom((t) => (
            <div className={`bg-gradient-to-r from-[#B1D182] to-[#688F48] p-4 rounded-2xl shadow-2xl transform transition-all ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
              <div className="flex items-center space-x-3">
                <Sparkles className="h-6 w-6 animate-pulse text-[#F4F1E9]" />
                <div className="text-[#F4F1E9]">
                  <div className="font-bold">Your Royal Journey Begins!</div>
                  <div className="text-sm opacity-90">Redirecting to your dashboard...</div>
                </div>
              </div>
            </div>
          ), { duration: 2000 });
        }, 500);

        // Redirect
        setTimeout(() => navigate('/dashboard'), 2500);
      }
    } catch (error) {
      toast.dismiss(registerToast);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      
      toast.error(
        <div className="space-y-1">
          <div className="font-bold text-[#0B132B]">❌ Registration Failed</div>
          <div className="text-sm text-[#0B132B]">{errorMessage}</div>
        </div>,
        { 
          style: {
            background: 'linear-gradient(to right, #F4F1E9, #B1D182)',
            color: '#0B132B',
            borderRadius: '12px',
            fontWeight: '600',
            border: '2px solid #688F48'
          },
          duration: 5000 
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const royalFeatures = [
    { icon: <Flower2 className="w-4 h-4" />, text: 'Female Health Tracking' },
    { icon: <Heart className="w-4 h-4" />, text: "Men's Wellness" },
    { icon: <Flower className="w-4 h-4" />, text: 'Premium Self Care' },
    { icon: <Dumbbell className="w-4 h-4" />, text: 'Fitness & Nutrition' },
  ];

  const passwordStrength = formData.password.length;

  return (
    <>
      <Toaster
        position={isMobile ? "top-center" : "top-right"}
        containerStyle={{
          top: isMobile ? 10 : 20,
          zIndex: 9999,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(to right, #F4F1E9, #B1D182)',
            color: '#0B132B',
            borderRadius: '12px',
            fontWeight: '600',
            border: '1px solid #B1D182'
          },
        }}
      />

      <div className="min-h-screen relative overflow-hidden bg-[#F4F1E9]">
        {/* Royal Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#B1D182]/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#688F48]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#B1D182]/15 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Mobile Header */}
        {isMobile && (
          <div className="relative z-20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-xl shadow-lg">
                  <Crown className="h-5 w-5 text-[#F4F1E9]" />
                </div>
                <span className="font-bold text-[#0B132B] text-lg">MyLab Royal</span>
              </div>
              <Link to="/login" className="text-xs text-[#688F48] font-semibold">
                Already Royal?
              </Link>
            </div>
          </div>
        )}

        <div className="relative z-10 min-h-screen flex items-center justify-center py-4 sm:py-8 px-3 sm:px-4 lg:px-8">
          <div className="max-w-md w-full space-y-6 sm:space-y-8">
            {/* Royal Badge */}
            <div className="inline-flex items-center justify-center space-x-2 bg-[#F4F1E9]/80 backdrop-blur-sm border border-[#B1D182]/40 rounded-2xl px-6 py-3 mx-auto shadow-lg">
              <Crown className="w-5 h-5 text-[#688F48]" />
              <span className="font-bold text-[#688F48] text-sm uppercase tracking-wider">
                Join Royal MyLab
              </span>
              <Sparkles className="w-4 h-4 text-[#B1D182]" />
            </div>

            {/* Main Heading */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight text-[#0B132B]">
                <span className="block">Become a</span>
                <span className="block bg-gradient-to-r from-[#B1D182] to-[#688F48] bg-clip-text text-transparent">
                  Royal Member
                </span>
              </h1>
              <p className="text-sm sm:text-base text-[#0B132B]/70 max-w-sm mx-auto">
                Join our elite wellness community for personalized health insights
              </p>
            </div>

            {/* Royal Perks */}
            <div className="bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {royalFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="p-1 bg-[#F4F1E9]/20 rounded">
                      {feature.icon}
                    </div>
                    <span className="text-xs text-[#F4F1E9]">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Form Card */}
            <div className="bg-[#F4F1E9]/90 backdrop-blur-sm rounded-3xl shadow-2xl p-5 sm:p-8 border-2 border-[#B1D182]/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] flex items-center space-x-2">
                  <UserPlus className="h-5 w-5 sm:h-6 sm:w-6 text-[#688F48]" />
                  <span>Mylab Register</span>
                </h2>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-[#688F48]" />
                  <span className="text-xs text-[#688F48] font-medium">Secure</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Username Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#0B132B]">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-[#688F48]" />
                        <span>Full Name *</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 bg-[#F4F1E9] border-2 ${
                        formErrors.name ? 'border-red-400' : formData.name ? 'border-[#688F48]' : 'border-[#B1D182]/50'
                      } rounded-xl focus:border-[#688F48] focus:ring-4 focus:ring-[#B1D182]/20 text-[#0B132B] transition-all duration-200 placeholder:text-[#0B132B]/50`}
                      placeholder="Your royal name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#0B132B]">
                      <Users className="h-4 w-4 text-[#688F48]" />
                      Username *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      className={`w-full px-4 py-3 bg-[#F4F1E9] border-2 ${
                        formErrors.userName ? 'border-red-400' : formData.userName ? 'border-[#688F48]' : 'border-[#B1D182]/50'
                      } rounded-xl focus:border-[#688F48] focus:ring-4 focus:ring-[#B1D182]/20 text-[#0B132B] transition-all duration-200 placeholder:text-[#0B132B]/50`}
                      placeholder="Choose username"
                    />
                  </div>
                </div>

                {/* Email & Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#0B132B]">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-[#688F48]" />
                      <span>Email *</span>
                    </div>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#F4F1E9] border-2 ${
                      formErrors.email ? 'border-red-400' : formData.email.includes('@') ? 'border-[#688F48]' : 'border-[#B1D182]/50'
                    } rounded-xl focus:border-[#688F48] focus:ring-4 focus:ring-[#B1D182]/20 text-[#0B132B] transition-all duration-200 placeholder:text-[#0B132B]/50`}
                    placeholder="your@royal.email"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-[#0B132B]">
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-[#688F48]" />
                        <span>Password</span>
                      </div>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full px-4 py-3 bg-[#F4F1E9] border-2 ${
                        formErrors.password ? 'border-red-400' : formData.password.length >= 6 ? 'border-[#688F48]' : 'border-[#B1D182]/50'
                      } rounded-xl focus:border-[#688F48] focus:ring-4 focus:ring-[#B1D182]/20 text-[#0B132B] transition-all duration-200 placeholder:text-[#0B132B]/50`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0B132B]/50 hover:text-[#0B132B]"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {/* Password Strength */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className={`w-3 h-3 rounded-full ${
                        passwordStrength >= 1 ? 'bg-[#B1D182]' : 'bg-[#B1D182]/30'
                      }`}></div>
                      <div className={`w-3 h-3 rounded-full ${
                        passwordStrength >= 3 ? 'bg-[#B1D182]' : 'bg-[#B1D182]/30'
                      }`}></div>
                      <div className={`w-3 h-3 rounded-full ${
                        passwordStrength >= 6 ? 'bg-[#688F48]' : 'bg-[#B1D182]/30'
                      }`}></div>
                    </div>
                    <span className="text-xs text-[#0B132B]/50">
                      Strength: {passwordStrength < 3 ? 'Weak' : passwordStrength < 6 ? 'Medium' : 'Strong'}
                    </span>
                  </div>
                </div>

                {/* Phone Row */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#0B132B]">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-[#688F48]" />
                      <span>Phone *</span>
                    </div>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#F4F1E9] border-2 ${
                      formErrors.phone ? 'border-red-400' : formData.phone ? 'border-[#688F48]' : 'border-[#B1D182]/50'
                    } rounded-xl focus:border-[#688F48] focus:ring-4 focus:ring-[#B1D182]/20 text-[#0B132B] transition-all duration-200 placeholder:text-[#0B132B]/50`}
                    placeholder="+234 (708) 475-2971"
                  />
                </div>

                {/* DOB & Gender Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#0B132B]">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-[#688F48]" />
                        <span>Birth Date *</span>
                      </div>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className={`w-full px-4 py-3 bg-[#F4F1E9] border-2 ${
                        formErrors.dob ? 'border-red-400' : formData.dob ? 'border-[#688F48]' : 'border-[#B1D182]/50'
                      } rounded-xl focus:border-[#688F48] focus:ring-4 focus:ring-[#B1D182]/20 text-[#0B132B] transition-all duration-200`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#0B132B]">
                      <Users className="h-4 w-4 text-[#688F48]" />
                      Gender *
                    </label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className={`w-full px-4 py-3 bg-[#F4F1E9] border-2 ${
                        formErrors.gender ? 'border-red-400' : formData.gender ? 'border-[#688F48]' : 'border-[#B1D182]/50'
                      } rounded-xl focus:border-[#688F48] focus:ring-4 focus:ring-[#B1D182]/20 text-[#0B132B] transition-all duration-200 appearance-none`}
                    >
                      <option value="" className="text-[#0B132B]/50">Select Gender</option>
                      <option value="female" className="text-[#0B132B]">Female</option>
                      <option value="male" className="text-[#0B132B]">Male</option>
                      <option value="other" className="text-[#0B132B]">Other</option>
                    </select>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start space-x-3 p-3 bg-[#F4F1E9] rounded-xl border border-[#B1D182]/30">
                  <CheckCircle className="h-5 w-5 text-[#688F48] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#0B132B]/70">
                    By creating an account, you agree to our{' '}
                    <button type="button" className="text-[#688F48] hover:underline font-medium">
                      Royal Terms
                    </button>
                    {' '}and{' '}
                    <button type="button" className="text-[#688F48] hover:underline font-medium">
                      Privacy Policy
                    </button>
                  </div>
                </div>

                {/* Create Account Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-[#B1D182] to-[#688F48] text-[#0B132B] text-base sm:text-lg font-bold py-3 sm:py-4 px-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0B132B]"></div>
                        <span>Creating Royal Account...</span>
                      </>
                    ) : (
                      <>
                        <Crown className="h-5 w-5" />
                        <span>Become Mylab Member</span>
                        <Sparkles className="h-4 w-4" />
                      </>
                    )}
                  </div>
                  {!loading && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#B1D182] via-[#688F48] to-[#B1D182] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-[#F4F1E9] to-transparent opacity-20 group-hover:animate-shine"></div>
                    </>
                  )}
                </button>

                {/* Mobile Note */}
                {isMobile && (
                  <div className="flex items-center justify-center space-x-2 p-3 bg-[#F4F1E9] rounded-xl border border-[#B1D182]/30">
                    <Info className="h-4 w-4 text-[#688F48]" />
                    <span className="text-xs text-[#0B132B]/70">All royal features available on mobile</span>
                  </div>
                )}
              </form>

              {/* Royal Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#B1D182]/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#F4F1E9] text-[#688F48] font-medium">Already Royal?</span>
                </div>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center justify-center space-x-2 w-full py-3 px-4 bg-[#F4F1E9] border-2 border-[#B1D182] text-[#0B132B] rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-[1.02] hover:border-[#688F48]"
                  onClick={() => toast('👑 Welcome back to your royal wellness lab!', { 
                    icon: '🌟',
                    style: {
                      background: 'linear-gradient(to right, #B1D182, #688F48)',
                      color: '#0B132B',
                      borderRadius: '12px',
                    }
                  })}
                >
                  <ArrowRight className="h-5 w-5" />
                  <span>Access Mylab Account</span>
                </Link>
              </div>
            </div>

            {/* Royal Benefits */}
            <div className="bg-[#F4F1E9]/90 backdrop-blur-sm rounded-2xl p-4 border border-[#B1D182]/30">
              <h3 className="text-sm font-bold mb-3 text-[#0B132B] flex items-center space-x-2">
                <Star className="h-4 w-4 text-[#688F48]" />
                <span>Royal Membership Benefits</span>
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#B1D182] rounded-full"></div>
                  <span className="text-xs text-[#0B132B]/70">Personalized health insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#B1D182] rounded-full"></div>
                  <span className="text-xs text-[#0B132B]/70">AI-powered recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#B1D182] rounded-full"></div>
                  <span className="text-xs text-[#0B132B]/70">Priority support 24/7</span>
                </div>
              </div>
            </div>

            {/* Royal Footer */}
            <div className="text-center text-xs text-[#0B132B]/60 space-y-1">
              <p>MyLab Wellness • Elevating Health Experiences</p>
              <p>© {new Date().getFullYear()} Royal MyLab. All wellness rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Royal Mobile Bottom Bar */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#F4F1E9]/95 backdrop-blur-sm border-t border-[#B1D182]/30 p-3 shadow-xl">
            <div className="flex justify-around items-center text-xs text-[#0B132B]">
              <div className="text-center">
                <Shield className="h-4 w-4 mx-auto mb-1 text-[#688F48]" />
                <div>Secure</div>
              </div>
              <div className="text-center">
                <Zap className="h-4 w-4 mx-auto mb-1 text-[#B1D182]" />
                <div>Fast</div>
              </div>
              <div className="text-center">
                <Crown className="h-4 w-4 mx-auto mb-1 text-[#688F48]" />
                <div>Premium</div>
              </div>
            </div>
          </div>
        )}

        {/* Custom CSS */}
        <style>{`
          @keyframes float {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          
          @keyframes slide-in {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes slide-out {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-20px); opacity: 0; }
          }
          
          @keyframes shine {
            100% { left: 125%; }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.2; }
          }
          
          .animate-float {
            animation: float 7s infinite;
          }
          
          .animate-pulse {
            animation: pulse 2s infinite;
          }
          
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
          
          .animate-slide-out {
            animation: slide-out 0.3s ease-in;
          }
          
          .animate-shine {
            animation: shine 1.5s;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 6px;
          }
          
          ::-webkit-scrollbar-track {
            background: #F4F1E9;
            border-radius: 3px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #B1D182, #688F48);
            border-radius: 3px;
          }
          
          /* Mobile optimizations */
          @media (max-width: 640px) {
            input, button, select {
              font-size: 16px !important;
            }
            
            .min-h-screen {
              min-height: 100vh;
              min-height: -webkit-fill-available;
            }
          }
          
          select {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23688F48' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
            background-position: right 0.5rem center;
            background-repeat: no-repeat;
            background-size: 1.5em 1.5em;
            padding-right: 2.5rem;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
        `}</style>
      </div>
    </>
  );
};

export default Register;
