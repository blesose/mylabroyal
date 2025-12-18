import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Shield, 
  Zap,
  Heart,
  UserPlus,
  Crown,
  Flower2,
  Flower,
  Dumbbell,
  ArrowRight,
  Star
} from 'lucide-react';

const Login = () => {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email.includes('@') || formData.password.length < 6) {
      toast.error('Please enter a valid email and password (min 6 characters)', {
        icon: '⚠️',
        style: {
          background: 'linear-gradient(to right, #B1D182, #688F48)',
          color: '#0B132B',
          borderRadius: '12px',
          fontWeight: '600',
        }
      });
      return;
    }

    const loginToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0B132B]"></div>
        <span className="font-medium text-[#0B132B]">Accessing your royal wellness lab...</span>
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
      
      const result = await apiService.login(formData);
      
      if (result.success) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        dispatch({ type: 'SET_USER', payload: result.user });
        
        toast.dismiss(loginToast);
        
        // Success toast
        toast.success(
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Crown className="h-6 w-6 text-[#688F48]" />
              <div>
                <div className="font-bold text-lg text-[#0B132B]">Royal Access Granted!</div>
                <div className="text-sm opacity-90 text-[#0B132B]">Welcome back, {result.user.name} 👑</div>
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

        // Redirect with royal flair
        setTimeout(() => {
          toast.custom((t) => (
            <div className={`bg-gradient-to-r from-[#B1D182] to-[#688F48] p-4 rounded-2xl shadow-2xl transform transition-all ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
              <div className="flex items-center space-x-3">
                <Sparkles className="h-6 w-6 animate-pulse text-[#F4F1E9]" />
                <div className="text-[#F4F1E9]">
                  <div className="font-bold">Entering the Mylab Dashboard...</div>
                  <div className="text-sm opacity-90">Your elite health insights await!</div>
                </div>
              </div>
            </div>
          ), { duration: 2000 });
        }, 500);

        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      toast.dismiss(loginToast);
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      
      toast.error(
        <div className="space-y-1">
          <div className="font-bold text-[#0B132B]">🔒 Access Denied</div>
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

  const handleDemoLogin = () => {
    setFormData({
      email: 'mylab@gmail.com',
      password: 'mylabwellness123'
    });
    
    toast.success(
      <div className="space-y-1">
        <div className="font-bold text-[#0B132B]">👑 Mylab Demo Loaded!</div>
        <div className="text-sm text-[#0B132B]">Experience premium features instantly</div>
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
  };

  const features = [
    { 
      name: 'Female Health', 
      icon: <Flower2 className="w-5 h-5" />, 
      gradient: 'from-[#B1D182] to-[#688F48]',
    },
    { 
      name: "Men's Health", 
      icon: <Heart className="w-5 h-5" />, 
      gradient: 'from-[#B1D182] to-[#688F48]',
    },
    { 
      name: 'Self Care', 
      icon: <Flower className="w-5 h-5" />, 
      gradient: 'from-[#B1D182] to-[#688F48]',
    },
    { 
      name: 'Fitness', 
      icon: <Dumbbell className="w-5 h-5" />, 
      gradient: 'from-[#B1D182] to-[#688F48]',
    }
  ];

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

      <div className="text-charcoal-grey min-h-screen relative overflow-hidden bg-[#F4F1E9]">
        {/* Royal Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#B1D182]/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#688F48]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B1D182]/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Mobile Header */}
        {isMobile && (
          <div className="relative z-20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-xl shadow-lg">
                  <Crown className="h-5 w-5 text-[#F4F1E9]" />
                </div>
                <span className="font-bold text-[#0B132B] text-lg">Mylab</span>
              </div>
              <button
                onClick={handleDemoLogin}
                className="px-3 py-1.5 bg-gradient-to-r from-[#B1D182] to-[#688F48] text-[#F4F1E9] text-xs rounded-lg shadow-md"
              >
                Try Mylab Demo
              </button>
            </div>
          </div>
        )}

        <div className="relative z-10 min-h-screen flex items-center justify-center py-4 sm:py-8 px-3 sm:px-4 lg:px-8">
          <div className="max-w-md w-full space-y-6 sm:space-y-8">
            {/* Royal Badge */}
            <div className="inline-flex items-center justify-center space-x-2 bg-[#F4F1E9]/80 backdrop-blur-sm border border-[#B1D182]/40 rounded-2xl px-6 py-3 mx-auto shadow-lg">
              <Crown className="w-5 h-5 text-[#688F48]" />
              <span className="font-bold text-[#688F48] text-sm uppercase tracking-wider">
                Mylab Access Portal
              </span>
              <Sparkles className="w-4 h-4 text-[#B1D182]" />
            </div>

            {/* Main Heading */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight text-[#0B132B]">
                <span className="block">Enter Your</span>
                <span className="block bg-gradient-to-r from-[#B1D182] to-[#688F48] bg-clip-text text-transparent">
                  Mylab - your own Health and Wellness lab
                </span>
              </h1>
              <p className="text-sm sm:text-base text-[#0B132B]/70">
                Access elite health insights & precision tracking
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-[#F4F1E9]/60 rounded-lg">
                <Shield className="w-4 h-4 text-[#688F48]" />
                <span className="text-xs font-medium text-[#0B132B]">Secure</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-[#F4F1E9]/60 rounded-lg">
                <Zap className="w-4 h-4 text-[#B1D182]" />
                <span className="text-xs font-medium text-[#0B132B]">Fast</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-[#F4F1E9]/60 rounded-lg">
                <Star className="w-4 h-4 text-[#688F48]" />
                <span className="text-xs font-medium text-[#0B132B]">Elite</span>
              </div>
            </div>

            {/* Main Form Card */}
            <div className="bg-[#F4F1E9]/90 backdrop-blur-sm rounded-3xl shadow-2xl p-5 sm:p-8 border-2 border-[#B1D182]/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] flex items-center space-x-2">
                  <LogIn className="h-5 w-5 sm:h-6 sm:w-6 text-[#688F48]" />
                  <span>Mylab Sign In</span>
                </h2>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-[#688F48]" />
                  <span className="text-xs text-[#688F48] font-medium">Protected</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#0B132B]">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-[#688F48]" />
                      <span>Email</span>
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 bg-[#F4F1E9] border-2 ${
                        formData.email.includes('@') ? 'border-[#688F48]' : 'border-[#B1D182]/50'
                      } rounded-xl focus:border-[#688F48] focus:ring-4 focus:ring-[#B1D182]/20 text-[#0B132B] transition-all duration-200 placeholder:text-[#0B132B]/50`}
                      placeholder="your@mylab.email"
                    />
                    {formData.email.includes('@') && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="p-1 bg-[#B1D182] rounded-full">
                          <Sparkles className="h-3 w-3 text-[#F4F1E9]" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
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
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full px-4 py-3 bg-[#F4F1E9] border-2 ${
                        formData.password.length >= 6 ? 'border-[#688F48]' : 'border-[#B1D182]/50'
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className={`w-3 h-3 rounded-full ${
                        formData.password.length >= 1 ? 'bg-[#B1D182]' : 'bg-[#B1D182]/30'
                      }`}></div>
                      <div className={`w-3 h-3 rounded-full ${
                        formData.password.length >= 3 ? 'bg-[#B1D182]' : 'bg-[#B1D182]/30'
                      }`}></div>
                      <div className={`w-3 h-3 rounded-full ${
                        formData.password.length >= 6 ? 'bg-[#688F48]' : 'bg-[#B1D182]/30'
                      }`}></div>
                    </div>
                    <span className="text-xs text-[#0B132B]/50">
                      {formData.password.length}/6 characters
                    </span>
                  </div>
                </div>

                {/* Demo Access Button */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="text-sm text-[#0B132B]/70 hover:text-[#0B132B] flex items-center justify-center space-x-2"
                  >
                    <Crown className="h-4 w-4 text-[#688F48]" />
                    <span>Experience Mylab Demo Access</span>
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading || !formData.email.includes('@') || formData.password.length < 6}
                  className={`w-full group relative overflow-hidden ${
                    formData.email.includes('@') && formData.password.length >= 6
                      ? 'bg-gradient-to-r from-[#B1D182] to-[#688F48] hover:shadow-2xl cursor-pointer' 
                      : 'bg-gradient-to-r from-[#B1D182]/50 to-[#688F48]/50 cursor-not-allowed'
                  } text-[#0B132B] text-base sm:text-lg font-bold py-3 sm:py-4 px-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50`}
                >
                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0B132B]"></div>
                        <span>Processing mylab Access...</span>
                      </>
                    ) : (
                      <>
                        <Crown className="h-5 w-5" />
                        <span>Enter Mylab</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                  {formData.email.includes('@') && formData.password.length >= 6 && !loading && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#B1D182] via-[#688F48] to-[#B1D182] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-[#F4F1E9] to-transparent opacity-20 group-hover:animate-shine"></div>
                    </>
                  )}
                </button>

                {/* Mobile Optimized Note */}
                {isMobile && (
                  <div className="flex items-center justify-center space-x-2 p-3 bg-[#F4F1E9] rounded-xl border border-[#B1D182]/30">
                    <Sparkles className="h-4 w-4 text-[#688F48]" />
                    <span className="text-xs text-[#0B132B]/70">Optimized also for your mobile experience</span>
                  </div>
                )}
              </form>

              {/* Royal Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#B1D182]/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#F4F1E9] text-[#688F48] font-medium">New to MyLab?</span>
                </div>
              </div>

              {/* Royal Registration */}
              <div className="text-center">
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center space-x-2 w-full py-3 px-4 bg-[#F4F1E9] border-2 border-[#B1D182] text-[#0B132B] rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-[1.02] hover:border-[#688F48]"
                  onClick={() => toast('👑 Begin your royal wellness journey today!', { 
                    icon: '🌟',
                    style: {
                      background: 'linear-gradient(to right, #B1D182, #688F48)',
                      color: '#0B132B',
                      borderRadius: '12px',
                    }
                  })}
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Join the Family</span>
                </Link>
              </div>
            </div>

            {/* Royal Features Preview */}
            <div className="bg-gradient-to-br from-[#B1D182] to-[#688F48] rounded-3xl p-5 sm:p-6 shadow-2xl">
              <h3 className="text-lg font-bold mb-4 flex items-center space-x-2 text-[#F4F1E9]">
                <Crown className="h-5 w-5" />
                <span>Your Royal mylab Features Await</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div 
                    key={feature.name}
                    className="bg-[#F4F1E9]/10 backdrop-blur-sm rounded-xl p-3 text-center group hover:bg-[#F4F1E9]/20 transition-all duration-300"
                  >
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-[#F4F1E9] shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <div className="text-xs font-medium text-[#F4F1E9]">{feature.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Royal Footer */}
            <div className="text-center text-xs text-[#0B132B]/60 space-y-1">
              <p>By entering, you agree to our Terms & Privacy Policy</p>
              <p>© {new Date().getFullYear()} Royal Wellness Lab. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Royal Mobile Bottom Bar */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#F4F1E9]/95 backdrop-blur-sm border-t border-[#B1D182]/30 p-3 shadow-xl">
            <div className="flex justify-around items-center text-xs text-[#0B132B]">
              <div className="text-center">
                <Shield className="h-4 w-4 mx-auto mb-1 text-[#688F48]" />
                <div>Security</div>
              </div>
              <div className="text-center">
                <Zap className="h-4 w-4 mx-auto mb-1 text-[#B1D182]" />
                <div>Efficient Speed</div>
              </div>
              <div className="text-center">
                <Heart className="h-4 w-4 mx-auto mb-1 text-[#688F48]" />
                <div>Premium Care</div>
              </div>
            </div>
          </div>
        )}

        {/* Royal Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-[#688F48] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#B1D182] rounded-full mt-2"></div>
          </div>
        </div>

        {/* Custom CSS Animations */}
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
          
          .animate-bounce {
            animation: bounce 2s infinite;
          }
          
          @keyframes bounce {
            0%, 100% { transform: translate(-50%, 0); }
            50% { transform: translate(-50%, -10px); }
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
            input, button {
              font-size: 16px !important;
            }
            
            .min-h-screen {
              min-height: 100vh;
              min-height: -webkit-fill-available;
            }
          }
          
          /* Royal glow effect */
          .royal-glow {
            box-shadow: 0 0 20px rgba(177, 209, 130, 0.3);
          }
        `}</style>
      </div>
    </>
  );
};

export default Login;