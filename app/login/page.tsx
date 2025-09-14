"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { 
  Eye, 
  EyeOff, 
  BookOpen, 
  Users, 
  TrendingUp, 
  GraduationCap, 
  Rocket,
  Stars,
  Zap,
  Shield,
  Settings,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Animated Background Component
const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({length: 30}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-white rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '2s'
          }}
        />
      ))}
    </div>
  );
};

// Rocket Loading Animation Component
const RocketLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative">
        <div className="animate-bounce">
          <svg 
            viewBox="0 0 100 100" 
            className="w-12 h-12 drop-shadow-lg"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))'
            }}
          >
            <defs>
              <linearGradient id="loginRocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
              <linearGradient id="loginFireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            
            <ellipse cx="50" cy="75" rx="4" ry="10" fill="url(#loginFireGradient)" opacity="0.8">
              <animateTransform
                attributeName="transform"
                type="scale"
                values="1,1;1.2,1.5;1,1"
                dur="0.3s"
                repeatCount="indefinite"
              />
            </ellipse>
            
            <ellipse cx="50" cy="50" rx="12" ry="25" fill="url(#loginRocketGradient)" />
            <path d="M 38 25 Q 50 15 62 25 L 62 35 L 38 35 Z" fill="url(#loginRocketGradient)" />
            <path d="M 38 60 L 30 70 L 38 70 Z" fill="url(#loginRocketGradient)" />
            <path d="M 62 60 L 70 70 L 62 70 Z" fill="url(#loginRocketGradient)" />
            <circle cx="50" cy="40" r="4" fill="#60a5fa" opacity="0.8" />
          </svg>
        </div>
        
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          {Array.from({length: 8}).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-t from-orange-400 to-red-500 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 10 - 5}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s',
                transform: `translateY(${i * 2}px)`
              }}
            />
          ))}
        </div>
      </div>
      <p className="text-white/80 text-sm mt-4 animate-pulse">Launching your journey...</p>
    </div>
  );
};

// Admin Shield Loading Animation
const AdminLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative">
        <div className="animate-pulse">
          <Shield className="w-12 h-12 text-amber-400 drop-shadow-lg" 
            style={{
              filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))'
            }}
          />
        </div>
        <div className="absolute inset-0 animate-ping">
          <Shield className="w-12 h-12 text-amber-400/30" />
        </div>
      </div>
      <p className="text-white/80 text-sm mt-4 animate-pulse">Securing admin access...</p>
    </div>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showInvalidTokenDialog, setShowInvalidTokenDialog] = useState(false);
  const [collegeToken, setCollegeToken] = useState<string | null>(null);
  const [collegeInfo, setCollegeInfo] = useState<any>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Check for college token in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      setCollegeToken(token);
      validateCollegeToken(token);
    } else {
      // If no token and this is student login, show invalid URL dialog
      if (!isAdminLogin) {
        setShowInvalidTokenDialog(true);
      }
    }
  }, [isAdminLogin]);

  const validateCollegeToken = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/validate-token?token=${token}`);
      const data = await response.json();
      
      if (response.ok && data.valid) {
        setCollegeInfo(data.college);
      } else {
        setShowInvalidTokenDialog(true);
      }
    } catch (error) {
      console.error('Token validation error:', error);
      setShowInvalidTokenDialog(true);
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (isAdminLogin) {
        // Handle admin login separately
        const response = await fetch('/api/auth/login-admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Login failed');
        }

        // Store admin data
        localStorage.setItem('adminData', JSON.stringify(data.admin));
        
        // Redirect to admin dashboard using window.location for full page reload
        window.location.href = '/admin';
      } else {
        // Student login
        const response = await fetch('/api/auth/login-student', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email, 
            password,
            collegeToken // Include the college token from URL
          })
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Login failed');
        }

        // Store student data in cookies
        document.cookie = `studentData=${JSON.stringify({
          ...data.student,
          collegeToken // Store the college token with student data
        })}; path=/; max-age=86400`; // 24 hours expiry
        
        // Redirect to student dashboard with token
        window.location.href = `/dashboard?token=${collegeToken}`;
      }
    } catch (err) {
      setErrors({
        ...errors,
        email: err instanceof Error ? err.message : 'Login failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginTypeSwitch = (adminLogin: boolean) => {
    if (adminLogin === isAdminLogin) return;
    
    setIsTransitioning(true);
    setEmail("");
    setPassword("");
    setErrors({});
    
    setTimeout(() => {
      setIsAdminLogin(adminLogin);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  const studentTestimonials = [
    { name: "Priya Sharma", text: "StudentPath helped me plan my CS degree perfectly!", college: "IIT Delhi" },
    { name: "Arjun Patel", text: "The career guidance is amazing. Got my dream job!", college: "BITS Pilani" },
    { name: "Sneha Reddy", text: "Love the personalized recommendations!", college: "NIT Warangal" },
  ];

  const adminTestimonials = [
    { name: "Dr. Rajesh Kumar", text: "Managing student data has never been easier!", position: "Academic Director" },
    { name: "Prof. Meera Singh", text: "Excellent analytics and reporting features.", position: "Department Head" },
    { name: "Admin Team Lead", text: "Streamlined our entire academic workflow!", position: "Operations Manager" },
  ];

  const currentTestimonials = isAdminLogin ? adminTestimonials : studentTestimonials;
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % currentTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentTestimonials.length]);

  useEffect(() => {
    setCurrentTestimonial(0);
  }, [isAdminLogin]);

  return (
    <div className="min-h-screen flex bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${
              isAdminLogin 
                ? 'rgba(251, 191, 36, 0.3) 0%, rgba(217, 119, 6, 0.2) 25%' 
                : 'rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.2) 25%'
            }, transparent 50%)`,
            transition: 'background 0.5s ease'
          }}
        />
        <div className={`absolute inset-0 transition-all duration-700 ${
          isAdminLogin 
            ? 'bg-gradient-to-br from-black via-amber-900/20 to-orange-600/20' 
            : 'bg-gradient-to-br from-black via-blue-900/20 to-blue-600/20'
        }`} />
        <AnimatedBackground />
      </div>

      {/* Content Container with Sliding Animation */}
      <div className={`flex w-full transition-transform duration-700 ease-in-out ${
        isAdminLogin ? 'translate-x-0' : 'translate-x-0'
      }`}>
        
        {/* Left Side - Branding & Hero Content */}
        <div className={`hidden lg:flex lg:w-2/5 relative z-10 p-12 flex-col justify-between transition-all duration-700 ${
          isAdminLogin ? 'lg:order-2 lg:translate-x-full' : 'lg:order-1 lg:translate-x-0'
        }`}>
          <div
            className="absolute inset-0 h-screen bg-cover bg-center animate-[spin_60s_linear_infinite] scale-[2.0] translate-x-[-100px]"
            style={{ backgroundImage: "url('/moon.png')" }}
          />
          <div className="relative z-20">
            <div className="mb-16 mt-20">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                {isAdminLogin ? (
                  <>
                    Manage Your Institution,{" "}<br/>
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      Empower Students
                    </span>
                  </>
                ) : (
                  <>
                    Plan Your Academic Journey,{" "}<br/>
                    <span className="bg-gradient-to-r from-black to-blue-900 bg-clip-text text-transparent">
                      Achieve Your Goals
                    </span>
                  </>
                )}
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                {isAdminLogin 
                  ? "Comprehensive administrative tools for managing students, courses, and academic programs with powerful analytics and insights."
                  : "Join thousands of students who are successfully navigating their educational path with personalized guidance and AI-powered recommendations."
                }
              </p>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative z-20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              {isAdminLogin ? (
                <>
                  <BarChart3 className="w-5 h-5 text-amber-400" />
                  <span className="text-sm text-white/90 font-medium">Admin Success Stories</span>
                </>
              ) : (
                <>
                  <Stars className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-white/90 font-medium">Student Success Stories</span>
                </>
              )}
            </div>
            <div className="mb-4 transition-all duration-500">
              <p className="text-white/90 italic text-lg">"{currentTestimonials[currentTestimonial].text}"</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{currentTestimonials[currentTestimonial].name}</p>
                <p className="text-gray-400 text-sm">
                  {isAdminLogin 
                    ? (currentTestimonials[currentTestimonial] as any).position 
                    : (currentTestimonials[currentTestimonial] as any).college
                  }
                </p>
              </div>
              <div className="flex gap-2">
                {currentTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? `${isAdminLogin ? 'bg-amber-400' : 'bg-blue-400'} w-6` 
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className={`flex-1 flex items-center justify-center p-8 relative z-10 transition-all duration-700 ease-in-out ${
          isAdminLogin ? 'lg:order-1' : 'lg:order-2'
        }`}>
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                  isAdminLogin 
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600' 
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                }`}>
                  {isAdminLogin ? (
                    <Shield className="w-6 h-6 text-white" />
                  ) : (
                    <GraduationCap className="w-6 h-6 text-white" />
                  )}
                </div>
                <h1 className={`text-2xl font-bold bg-clip-text text-transparent transition-all duration-500 ${
                  isAdminLogin 
                    ? 'bg-gradient-to-r from-white to-amber-200' 
                    : 'bg-gradient-to-r from-white to-indigo-200'
                }`}>
                  StudentPath {isAdminLogin ? 'Admin' : ''}
                </h1>
              </div>
            </div>

            {/* Login Type Switcher */}
            <div className="mb-6">
              <div className="flex bg-white/5 rounded-2xl p-1 backdrop-blur-sm border border-white/10">
                <button
                  onClick={() => handleLoginTypeSwitch(false)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    !isAdminLogin 
                      ? 'bg-gradient-to-r from-grey-900 to-white text-black shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  Student Login
                </button>
                <button
                  onClick={() => handleLoginTypeSwitch(true)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    isAdminLogin 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Admin Login
                </button>
              </div>
            </div>

            {/* Login Card */}
            <Card className={`border-0 shadow-2xl backdrop-blur-xl border transition-all duration-500 ${
              isTransitioning 
                ? 'opacity-0 transform scale-95' 
                : 'opacity-100 transform scale-100'
            } ${
              isAdminLogin 
                ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20' 
                : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
            }`}>
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  {isAdminLogin ? (
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                      <Settings className="w-8 h-8 text-white" />
                    </div>
                  ) : (
                    <img
                        src="/logo.png"
                        alt="StudentPath Logo"
                        className="h-15 w-auto"
                        />
                  )}
                </div>
                <CardTitle className="text-3xl font-bold text-white mb-2">
                  {isAdminLogin ? 'Admin Portal' : 'Welcome Back'}
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  {isAdminLogin 
                    ? 'Access your administrative dashboard' 
                    : 'Sign in to continue your academic journey'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center min-h-[300px]">
                    {isAdminLogin ? <AdminLoader /> : <RocketLoader />}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={isAdminLogin ? "admin@institution.edu" : "your.email@college.edu"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 transition-all duration-300 ${
                          isAdminLogin 
                            ? 'focus:border-amber-400 focus:ring-amber-400/20' 
                            : 'focus:border-indigo-400 focus:ring-indigo-400/20'
                        } ${errors.email ? "border-red-400" : ""}`}
                      />
                      {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 transition-all duration-300 ${
                            isAdminLogin 
                              ? 'focus:border-amber-400 focus:ring-amber-400/20' 
                              : 'focus:border-indigo-400 focus:ring-indigo-400/20'
                          } ${errors.password ? "border-red-400" : ""}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                          className={`border-white/20 transition-colors duration-300 ${
                            isAdminLogin 
                              ? 'data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500' 
                              : 'data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500'
                          }`}
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-300">
                          Remember me
                        </Label>
                      </div>
                      <Link
                        href="/forgot-password"
                        className={`text-sm font-medium transition-colors ${
                          isAdminLogin 
                            ? 'text-amber-400 hover:text-amber-300' 
                            : 'text-indigo-400 hover:text-indigo-300'
                        }`}
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className={`w-full font-semibold py-3 rounded-xl transform hover:scale-[1.02] transition-all duration-300 shadow-2xl group ${
                        isAdminLogin 
                          ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white' 
                          : 'bg-gradient-to-r from-gray-600 to-white hover:from-blue-700 hover:to-white-700 text-black'
                      }`}
                      disabled={isLoading}
                    >
                      {isAdminLogin ? (
                        <Shield className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      ) : (
                        <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      )}
                      {isLoading 
                        ? (isAdminLogin ? "Securing Access..." : "Launching...") 
                        : (isAdminLogin ? "Access Portal" : "Sign In")
                      }
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/20"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-gradient-to-r from-black via-gray-900 to-black px-4 text-gray-400">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M5.8 3h12.4c1.4 0 2.6 1.2 2.6 2.6v11.6c0 1.4-1.2 2.6-2.6 2.6H5.8c-1.4 0-2.6-1.2-2.6-2.6V5.6C3.2 4.2 4.4 3 5.8 3z"/>
                          <path d="M20.6 6.9H3.4L12 14.1l8.6-7.2z" fill="white"/>
                        </svg>
                        Microsoft
                      </Button>
                    </div>

                    
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes rocketBounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0) rotate(0deg);
          }
          40%, 43% {
            transform: translate3d(0, -10px, 0) rotate(-5deg);
          }
          70% {
            transform: translate3d(0, -5px, 0) rotate(3deg);
          }
          90% {
            transform: translate3d(0, -2px, 0) rotate(-1deg);
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95);
            filter: blur(4px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        
        @keyframes fadeOutDown {
          from { 
            opacity: 1; 
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
          to { 
            opacity: 0; 
            transform: translateY(-20px) scale(0.95);
            filter: blur(4px);
          }
        }
        
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-out {
          animation: fadeOutDown 0.5s ease-in forwards;
        }
      `}</style>

      {/* Invalid Token Dialog */}
      <AlertDialog open={showInvalidTokenDialog} onOpenChange={setShowInvalidTokenDialog}>
        <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">Invalid Access URL</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              The URL you're trying to access is invalid or has expired. Please contact your college administrator 
              for a valid registration link, or visit the main StudentPath website to get started.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => window.location.href = '/'}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Go to Homepage
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}