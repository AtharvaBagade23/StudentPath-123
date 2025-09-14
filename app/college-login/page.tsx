"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Eye, 
  EyeOff, 
  Building, 
  Shield,
  Settings,
  BarChart3,
  Users,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

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
          className="absolute w-1 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"
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

// College Shield Loading Animation
const CollegeLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative">
        <div className="animate-pulse">
          <Building className="w-12 h-12 text-green-400 drop-shadow-lg" 
            style={{
              filter: 'drop-shadow(0 0 15px rgba(34, 197, 94, 0.6))'
            }}
          />
        </div>
        <div className="absolute inset-0 animate-ping">
          <Building className="w-12 h-12 text-green-400/30" />
        </div>
      </div>
      <p className="text-white/80 text-sm mt-4 animate-pulse">Accessing college portal...</p>
    </div>
  );
};

export default function CollegeLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
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
      const response = await fetch('/api/auth/login-college', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Instead of using localStorage, we now use cookies (set by the API)
        // Redirect to admin dashboard
        window.location.href = '/admin';
      } else {
        setErrors({ email: data.error || 'Login failed' });
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ email: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const collegeTestimonials = [
    { name: "Dr. Rajesh Kumar", text: "Managing student data has never been easier!", position: "Academic Director" },
    { name: "Prof. Meera Singh", text: "Excellent analytics and reporting features.", position: "Department Head" },
    { name: "Admin Team Lead", text: "Streamlined our entire academic workflow!", position: "Operations Manager" },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % collegeTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [collegeTestimonials.length]);

  return (
    <div className="min-h-screen flex bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.2) 25%, transparent 50%)`,
            transition: 'background 0.5s ease'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-green-900/20 to-emerald-600/20" />
        <AnimatedBackground />
      </div>

      {/* Content Container */}
      <div className="flex w-full">
        
        {/* Left Side - Branding & Hero Content */}
        <div className="hidden lg:flex lg:w-2/5 relative z-10 p-12 flex-col justify-between">
          <div
            className="absolute inset-0 h-screen bg-cover bg-center animate-[spin_60s_linear_infinite] scale-[2.0] translate-x-[-100px]"
            style={{ backgroundImage: "url('/moon.png')" }}
          />
          <div className="relative z-20">
            <div className="mb-16 mt-20">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Manage Your Institution,{" "}<br/>
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Empower Students
                </span>
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Comprehensive administrative tools for managing students, courses, and academic programs with powerful analytics and insights.
              </p>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative z-20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-green-400" />
              <span className="text-sm text-white/90 font-medium">College Success Stories</span>
            </div>
            <div className="mb-4 transition-all duration-500">
              <p className="text-white/90 italic text-lg">"{collegeTestimonials[currentTestimonial].text}"</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{collegeTestimonials[currentTestimonial].name}</p>
                <p className="text-gray-400 text-sm">
                  {collegeTestimonials[currentTestimonial].position}
                </p>
              </div>
              <div className="flex gap-2">
                {collegeTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-green-400 w-6' 
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 relative z-10">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-200">
                  StudentPath College
                </h1>
              </div>
            </div>

            {/* Login Card */}
            <Card className="border-0 shadow-2xl backdrop-blur-xl border bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-white mb-2">
                  College Portal
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Access your administrative dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center min-h-[300px]">
                    <CollegeLoader />
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
                        placeholder="admin@college.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
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
                          className="pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
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
                          className="border-white/20 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-300">
                          Remember me
                        </Label>
                      </div>
                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-green-400 hover:text-green-300"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="w-full font-semibold py-3 rounded-xl transform hover:scale-[1.02] transition-all duration-300 shadow-2xl group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                      disabled={isLoading}
                    >
                      <Shield className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      {isLoading ? "Accessing Portal..." : "Access Portal"}
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

                    <div className="text-center">
                      <p className="text-sm text-gray-400">
                        Don't have a college account?{" "}
                        <Link href="/register-other" className="text-green-400 hover:text-green-300 font-medium underline">
                          Register your college
                        </Link>
                      </p>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
