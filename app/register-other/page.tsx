"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  User,
  GraduationCap,
  Target,
  Award,
  MapPin,
  Calendar,
  Rocket,
  Briefcase,
  Users,
  Building,
  TrendingUp,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// === Animated Background ===
const AnimatedBackground = () => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: "3s",
          }}
        />
      ))}
    </div>
  );
};

// === User Type Selection Component ===
const UserTypeSelection = ({ onSelect }: { onSelect: (type: 'professional' | 'college') => void }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <img
            src="/logo.png"
            alt="StudentPath Logo"
            className="h-20 w-auto mx-auto mb-8"
          />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Welcome to Your Journey
          </h1>
          <p className="text-xl text-gray-400">
            Choose your path to personalized learning and career growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* College Card */}
          <Card
            className={`relative cursor-pointer transition-all duration-500 transform hover:scale-105 border-2 ${
              hoveredCard === 'college' 
                ? 'border-green-400 shadow-2xl shadow-green-500/20' 
                : 'border-white/20 hover:border-white/30'
            } bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl overflow-hidden group`}
            onMouseEnter={() => setHoveredCard('college')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardContent className="p-8 relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl group-hover:animate-pulse">
                  <Building className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                I'm a College
              </h2>
              
              <p className="text-gray-300 text-center mb-6">
                Educational institution looking to manage students and provide career guidance
              </p>
              
              <Button 
                className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-6 text-lg group-hover:shadow-xl transition-all duration-300"
                onClick={() => onSelect('college')}
              >
                Continue as College
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-gray-400 pt-4 text-sm text-center">
                Already have an account?{" "}
                <Link href="/college-login" className="text-indigo-400 hover:text-indigo-300 underline">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
          {/* Professinal Card */}
          <Card
            className={`relative cursor-pointer transition-all duration-500 transform hover:scale-105 border-2 ${
              hoveredCard === 'college' 
                ? 'border-orange-400 shadow-2xl shadow-orange-500/20' 
                : 'border-white/20 hover:border-white/30'
            } bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl overflow-hidden group`}
            onMouseEnter={() => setHoveredCard('college')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardContent className="p-8 relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl group-hover:animate-pulse">
                  <Building className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
                I'm a Professional
              </h2>
              
              <p className="text-gray-300 text-center mb-6">
                Professional looking to improve skills and manage career
              </p>
              
              <Button 
                className="w-full mt-8 bg-gradient-to-r  from-yellow-500 to-orange-600  text-white font-semibold py-6 text-lg group-hover:shadow-xl transition-all duration-300"
                onClick={() => onSelect('professional')}
              >
                Continue as Professional
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-gray-400 pt-4 text-sm text-center">
                Already have an account?{" "}
                <Link href="/professional-login" className="text-indigo-400 hover:text-indigo-300 underline">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// === Rocket Progress ===
const RocketProgress = ({ progress }: { progress: number }) => {
  return (
    <div className="relative w-full mt-3">
      <div className="absolute top-0 left-0 w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-500 to-yellow-500 rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full animate-pulse" />
        </div>
      </div>
      <div
        className="absolute top-[-8px] transition-all duration-500 ease-out"
        style={{ left: `${Math.min(progress, 95)}%` }}
      >
        <Rocket className="w-6 h-6 text-yellow-400 animate-bounce" />
      </div>
    </div>
  );
};

// === Transition Wrapper ===
const StepTransition = ({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive: boolean;
}) => (
  <div
    className={`transition-all duration-500 ${
      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
  >
    {children}
  </div>
);

// === Rocket Launch Loader ===
const RocketLaunchLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative mb-8">
        <div className="animate-bounce" style={{ animationDuration: "2s" }}>
          <Rocket className="w-24 h-24 text-indigo-500" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
          Launching Your Journey...
        </h3>
        <p className="text-gray-400 animate-pulse">Creating your personalized path</p>
      </div>
    </div>
  );
};

// Common data
const colleges = [
  "IIT Delhi",
  "IIT Bombay",
  "IIT Madras",
  "IIT Kanpur",
  "IIT Kharagpur",
  "BITS Pilani",
  "NIT Warangal",
  "NIT Trichy",
  "IIIT Hyderabad",
  "VIT Vellore",
];

const programs = [
  "Computer Science Engineering",
  "Information Technology",
  "Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Economics",
];

const academicInterestOptions = [
  "Artificial Intelligence",
  "Web Development",
  "Data Science",
  "Cybersecurity",
  "Mobile Development",
  "Cloud Computing",
  "Machine Learning",
  "Blockchain",
  "UI/UX Design",
  "Digital Marketing",
  "Finance",
  "Management",
];
const careerQuestions = [
  {
    id: "work_environment",
    question: "What type of work environment ignites your passion?",
    options: [
      { value: "startup", label: "Fast-paced startup environment", icon: "🚀" },
      { value: "corporate", label: "Structured corporate setting", icon: "🏢" },
      { value: "remote", label: "Remote/flexible work", icon: "🏠" },
      { value: "research", label: "Research and academic institutions", icon: "🔬" },
    ],
  },
  {
    id: "problem_solving",
    question: "How do you prefer to conquer challenges?",
    options: [
      { value: "analytical", label: "Through data and analysis", icon: "📊" },
      { value: "creative", label: "Through creative thinking", icon: "🎨" },
      { value: "collaborative", label: "Through team collaboration", icon: "👥" },
      { value: "systematic", label: "Through systematic processes", icon: "⚙️" },
    ],
  },
  {
    id: "career_focus",
    question: "What drives your career ambitions most?",
    options: [
      { value: "impact", label: "Making a positive impact", icon: "🌟" },
      { value: "growth", label: "Rapid career growth", icon: "📈" },
      { value: "stability", label: "Job security and stability", icon: "🛡️" },
      { value: "innovation", label: "Working on cutting-edge technology", icon: "💡" },
    ],
  },
];

const technicalSkillsList = [
  "Python",
  "JavaScript",
  "Java",
  "C++",
  "React",
  "Node.js",
  "SQL",
  "Git",
  "AWS",
  "Docker",
  "Machine Learning",
  "Data Analysis",
];

const softSkillsList = [
  "Communication",
  "Leadership",
  "Time Management",
  "Problem Solving",
  "Teamwork",
  "Adaptability",
  "Critical Thinking",
  "Project Management",
];

const languagesList = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Bengali",
  "Marathi",
  "Gujarati",
];

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Apple",
  "Meta",
  "Netflix",
  "Adobe",
  "Salesforce",
  "IBM",
  "Oracle",
  "Accenture",
  "TCS",
  "Infosys",
  "Wipro",
  "Other",
];

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Manufacturing",
  "Consulting",
  "Media & Entertainment",
  "Telecommunications",
  "Energy",
];

// === Student Registration Component ===
const StudentRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
      studentId: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
      college: "",
      program: "",
      currentYear: "",
      currentSemester: "",
      enrollmentYear: "",
      currentGPA: [7.5],
      academicInterests: [] as string[],
    firstName: "",  
    lastName: "",
    email: "",
    phone: "",

    careerQuizAnswers: {} as { [key: string]: string },

    technicalSkills: {},
    softSkills: {},
    languageSkills: {},

    primaryGoal: "",
    secondaryGoal: "",
    timeline: "",
    locationPreference: "",
    industryFocus: [] as string[],

    intensityLevel: "moderate",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;
  
  const [error, setError] = useState<string>("")
  const updateFormData = (updates: any) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        throw new Error("Please fill in all required fields")
      }

      if (!formData.agreeToTerms) {
        throw new Error("Please agree to the terms and conditions")
      }

      // Get college token from URL
      const urlParams = new URLSearchParams(window.location.search);
      const collegeToken = urlParams.get('token');

      // Make API call to register user
      const response = await fetch("/api/auth/register-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          college: formData.college,
          program: formData.program,
          currentYear: formData.currentYear,
          studentId: formData.studentId,
          phone: formData.phone,
          academicInterests: formData.academicInterests,
          primaryGoal: formData.primaryGoal,
          timeline: formData.timeline,
          intensityLevel: formData.intensityLevel,
          collegeToken: collegeToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      // Registration successful - redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  };

  const renderStep = () => {
    switch (currentStep as number) {
      case 1:
        return (
          <StepTransition isActive>
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-600 rounded-2xl mb-4 shadow-2xl">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Basic Information
                </h2>
                <p className="text-gray-400 mt-2">
                  Let's start with your basic details
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="college" className="text-white font-medium">
                    College/University *
                  </Label>
                  <Select
                    value={formData.college}
                    onValueChange={(value) => updateFormData({ college: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select your college" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {colleges.map((c) => (
                        <SelectItem
                          key={c}
                          value={c}
                          className="text-white hover:bg-white/10"
                        >
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-white font-medium">
                    Student ID *
                  </Label>
                  <Input
                    id="studentId"
                    placeholder="Your student ID"
                    value={formData.studentId}
                    onChange={(e) =>
                      updateFormData({ studentId: e.target.value })
                    }
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={(e) =>
                      updateFormData({ firstName: e.target.value })
                    }
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white font-medium">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Your last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      updateFormData({ lastName: e.target.value })
                    }
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@college.edu"
                    value={formData.email}
                    onChange={(e) =>
                      updateFormData({ email: e.target.value })
                    }
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) =>
                      updateFormData({ phone: e.target.value })
                    }
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="dateOfBirth"
                    className="text-white font-medium"
                  >
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      updateFormData({ dateOfBirth: e.target.value })
                    }
                    className="bg-white/5 border-white/20 text-white focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white font-medium">
                    Gender (Optional)
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => updateFormData({ gender: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem
                        value="male"
                        className="text-white hover:bg-white/10"
                      >
                        Male
                      </SelectItem>
                      <SelectItem
                        value="female"
                        className="text-white hover:bg-white/10"
                      >
                        Female
                      </SelectItem>
                      <SelectItem
                        value="non-binary"
                        className="text-white hover:bg-white/10"
                      >
                        Non-binary
                      </SelectItem>
                      <SelectItem
                        value="prefer-not-to-say"
                        className="text-white hover:bg-white/10"
                      >
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-medium">
                    Password *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) =>
                      updateFormData({ password: e.target.value })
                    }
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-white font-medium"
                  >
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      updateFormData({ confirmPassword: e.target.value })
                    }
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    updateFormData({ agreeToTerms: checked as boolean })
                  }
                  className="border-white/20 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                />
                <Label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-indigo-400 hover:text-indigo-300 underline"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-indigo-400 hover:text-indigo-300 underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </div>
          </StepTransition>
        );

      case 2:
        return (
          <StepTransition isActive>
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-600 rounded-2xl mb-4 shadow-2xl">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Academic Information
                </h2>
                <p className="text-gray-400 mt-2">Tell us about your academic journey</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white font-medium">Program/Course *</Label>
                  <Select
                    value={formData.program}
                    onValueChange={(value) => updateFormData({ program: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select your program" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {programs.map((program) => (
                        <SelectItem
                          key={program}
                          value={program}
                          className="text-white hover:bg-white/10"
                        >
                          {program}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white font-medium">Current Year *</Label>
                  <Select
                    value={formData.currentYear}
                    onValueChange={(value) => updateFormData({ currentYear: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="1" className="text-white hover:bg-white/10">
                        1st Year
                      </SelectItem>
                      <SelectItem value="2" className="text-white hover:bg-white/10">
                        2nd Year
                      </SelectItem>
                      <SelectItem value="3" className="text-white hover:bg-white/10">
                        3rd Year
                      </SelectItem>
                      <SelectItem value="4" className="text-white hover:bg-white/10">
                        4th Year
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white font-medium">Current Semester</Label>
                  <Select
                    value={formData.currentSemester}
                    onValueChange={(value) =>
                      updateFormData({ currentSemester: value })
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {Array.from({ length: 8 }, (_, i) => i + 1).map((sem) => (
                        <SelectItem
                          key={sem}
                          value={String(sem)}
                          className="text-white hover:bg-white/10"
                        >
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white font-medium">Enrollment Year</Label>
                  <Select
                    value={formData.enrollmentYear}
                    onValueChange={(value) =>
                      updateFormData({ enrollmentYear: value })
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {["2024", "2023", "2022", "2021"].map((year) => (
                        <SelectItem
                          key={year}
                          value={year}
                          className="text-white hover:bg-white/10"
                        >
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/20 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <Label className="text-white font-medium">Current GPA (Optional)</Label>
                    <div className="mt-4">
                      <Slider
                        value={formData.currentGPA}
                        onValueChange={(value) =>
                          updateFormData({ currentGPA: value })
                        }
                        max={10}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>0.0</span>
                        <span className="font-medium text-indigo-400 text-lg">
                          {formData.currentGPA[0].toFixed(1)} CGPA
                        </span>
                        <span>10.0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/20 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <Label className="text-white font-medium mb-4">
                      Academic Interests (Select multiple)
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                      {academicInterestOptions.map((interest) => {
                        const checked = formData.academicInterests.includes(interest);
                        return (
                          <label
                            key={interest}
                            htmlFor={interest}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                              checked
                                ? "bg-indigo-500/10 border-indigo-400/40"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                          >
                            <Checkbox
                              id={interest}
                              checked={checked}
                              onCheckedChange={(isChecked) => {
                                if (isChecked) {
                                  updateFormData({
                                    academicInterests: [
                                      ...formData.academicInterests,
                                      interest,
                                    ],
                                  });
                                } else {
                                  updateFormData({
                                    academicInterests:
                                      formData.academicInterests.filter(
                                        (i) => i !== interest
                                      ),
                                  });
                                }
                              }}
                              className="border-white/30 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                            />
                            <span className="text-white/90 text-sm">{interest}</span>
                          </label>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </StepTransition>
        );

      case 3: {
        const currentQuestion = careerQuestions[currentQuestionIndex];
        const quizProgress =
          ((currentQuestionIndex + 1) / careerQuestions.length) * 100;

        return (
          <StepTransition isActive>
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-600 rounded-2xl mb-4 shadow-2xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Career Interest Assessment
                </h2>
                <p className="text-gray-400 mt-2">
                  Help us understand your career preferences
                </p>
              </div>

              <div className="text-center mb-2">
                <div className="text-sm text-gray-400 mb-2">
                  Question {currentQuestionIndex + 1} of {careerQuestions.length}
                </div>
                <Progress value={quizProgress} className="w-full" />
              </div>

              <Card className="bg-white/5 border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6 text-center text-white/90">
                    {currentQuestion.question}
                  </h3>
                  <RadioGroup
                    value={formData.careerQuizAnswers[currentQuestion.id] || ""}
                    onValueChange={(value) =>
                      updateFormData({
                        careerQuizAnswers: {
                          ...formData.careerQuizAnswers,
                          [currentQuestion.id]: value,
                        },
                      })
                    }
                    className="space-y-4"
                  >
                    {currentQuestion.options.map((option) => {
                      const selected =
                        formData.careerQuizAnswers[currentQuestion.id] ===
                        option.value;
                      return (
                        <label
                          key={option.value}
                          htmlFor={option.value}
                          className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition ${
                            selected
                              ? "bg-indigo-500/10 border-indigo-400/40"
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <span className="text-2xl">{option.icon}</span>
                          <span className="text-white/90">{option.label}</span>
                        </label>
                      );
                    })}
                  </RadioGroup>

                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentQuestionIndex((idx) => Math.max(0, idx - 1))
                      }
                      disabled={currentQuestionIndex === 0}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={() => {
                        if (currentQuestionIndex < careerQuestions.length - 1) {
                          setCurrentQuestionIndex((idx) => idx + 1);
                        } else {
                          nextStep();
                        }
                      }}
                      disabled={!formData.careerQuizAnswers[currentQuestion.id]}
                      className="bg-gradient-to-r from-red-600 to-yellow-600 text-black hover:from-blue-500 hover:to-white"
                    >
                      {currentQuestionIndex === careerQuestions.length - 1
                        ? "Continue"
                        : "Next"}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </StepTransition>
        );
      }

      case 4:
        return (
          <StepTransition isActive>
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-600 rounded-2xl mb-4 shadow-2xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Skills Assessment
                </h2>
                <p className="text-gray-400 mt-2">Rate your current skill levels</p>
              </div>

              <div className="space-y-6">
                <Card className="bg-white/5 border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-white/90">
                      Technical Skills
                    </h3>
                    <div className="space-y-4">
                      {technicalSkillsList.map((skill) => (
                        <div key={skill} className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-white/90">{skill}</Label>
                            <span className="text-sm text-gray-400">
                              {(formData.technicalSkills && ((formData.technicalSkills as Record<string, number>)[skill])) ?? 0}/5
                            </span>
                          </div>
                          <Slider
                            value={[(formData.technicalSkills && ((formData.technicalSkills as Record<string, number>)[skill])) ?? 0]}
                            onValueChange={(value) =>
                              updateFormData({
                                technicalSkills: {
                                  ...formData.technicalSkills,
                                  [skill]: value[0],
                                },
                              })
                            }
                            max={5}
                            min={0}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-white/90">
                      Soft Skills
                    </h3>
                    <div className="space-y-4">
                      {softSkillsList.map((skill) => (
                        <div key={skill} className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-white/90">{skill}</Label>
                            <span className="text-sm text-gray-400">
                              {(formData.softSkills && ((formData.softSkills as Record<string, number>)[skill])) ?? 0}/5
                            </span>
                          </div>
                          <Slider
                            value={[(formData.softSkills && ((formData.softSkills as Record<string, number>)[skill])) ?? 0]}
                            onValueChange={(value) =>
                              updateFormData({
                                softSkills: {
                                  ...formData.softSkills,
                                  [skill]: value[0],
                                },
                              })
                            }
                            max={5}
                            min={0}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-white/90">
                      Language Skills
                    </h3>
                    <div className="space-y-4">
                      {languagesList.map((lang) => (
                        <div key={lang} className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-white/90">{lang}</Label>
                            <span className="text-sm text-gray-400">
                              {(formData.languageSkills && (formData.languageSkills as Record<string, number>)[lang]) ?? 0}/5
                            </span>
                          </div>
                          <Slider
                            value={[(formData.languageSkills && (formData.languageSkills as Record<string, number>)[lang]) ?? 0]}
                            onValueChange={(value) =>
                              updateFormData({
                                languageSkills: {
                                  ...formData.languageSkills,
                                  [lang]: value[0],
                                },
                              })
                            }
                            max={5}
                            min={0}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </StepTransition>
        );

      case 5:
        return (
          <StepTransition isActive>
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-600 rounded-2xl mb-4 shadow-2xl">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Career Goals
                </h2>
                <p className="text-gray-400 mt-2">Define your career aspirations</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-white/90">
                      Primary Career Goal
                    </h3>
                    <Select
                      value={formData.primaryGoal}
                      onValueChange={(value) =>
                        updateFormData({ primaryGoal: value })
                      }
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select primary goal" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20">
                        <SelectItem value="software-engineer" className="text-white hover:bg-white/10">
                          Software Engineer
                        </SelectItem>
                        <SelectItem value="data-scientist" className="text-white hover:bg-white/10">
                          Data Scientist
                        </SelectItem>
                        <SelectItem value="product-manager" className="text-white hover:bg-white/10">
                          Product Manager
                        </SelectItem>
                        <SelectItem value="entrepreneur" className="text-white hover:bg-white/10">
                          Entrepreneur
                        </SelectItem>
                        <SelectItem value="researcher" className="text-white hover:bg-white/10">
                          Researcher
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="mt-6">
                      <h4 className="text-sm text-white/80 mb-2">
                        Secondary Goal (Optional)
                      </h4>
                      <Select
                        value={formData.secondaryGoal}
                        onValueChange={(value) =>
                          updateFormData({ secondaryGoal: value })
                        }
                      >
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue placeholder="Select secondary goal" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20">
                          <SelectItem value="full-stack" className="text-white hover:bg-white/10">
                            Full-Stack Developer
                          </SelectItem>
                          <SelectItem value="cloud-engineer" className="text-white hover:bg-white/10">
                            Cloud Engineer
                          </SelectItem>
                          <SelectItem value="ai-ml" className="text-white hover:bg-white/10">
                            AI/ML Engineer
                          </SelectItem>
                          <SelectItem value="cybersec" className="text-white hover:bg-white/10">
                            Cybersecurity
                          </SelectItem>
                          <SelectItem value="ui-ux" className="text-white hover:bg-white/10">
                            UI/UX
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-white/90">
                      Timeline
                    </h3>
                    <RadioGroup
                      value={formData.timeline}
                      onValueChange={(value) => updateFormData({ timeline: value })}
                      className="space-y-3"
                    >
                      <label htmlFor="2-years" className="flex items-center gap-3 p-3 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                        <RadioGroupItem value="2-years" id="2-years" />
                        <span className="text-white/90">Within 2 years</span>
                      </label>
                      <label htmlFor="4-years" className="flex items-center gap-3 p-3 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                        <RadioGroupItem value="4-years" id="4-years" />
                        <span className="text-white/90">Within 4 years</span>
                      </label>
                      <label htmlFor="after-graduation" className="flex items-center gap-3 p-3 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                        <RadioGroupItem value="after-graduation" id="after-graduation" />
                        <span className="text-white/90">After graduation</span>
                      </label>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-white/90">
                      Location Preference
                    </h3>
                    <Select
                      value={formData.locationPreference}
                      onValueChange={(value) =>
                        updateFormData({ locationPreference: value })
                      }
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20">
                        <SelectItem value="india" className="text-white hover:bg-white/10">
                          India
                        </SelectItem>
                        <SelectItem value="international" className="text-white hover:bg-white/10">
                          International
                        </SelectItem>
                        <SelectItem value="remote" className="text-white hover:bg-white/10">
                          Remote
                        </SelectItem>
                        <SelectItem value="flexible" className="text-white hover:bg-white/10">
                          Flexible
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-white/90">
                      Industry Focus
                    </h3>
                    <div className="space-y-3">
                      {(
                        [
                          "Technology",
                          "Finance",
                          "Healthcare",
                          "Education",
                          "Startup",
                        ] as readonly string[]
                      ).map((industry) => {
                        const checked = formData.industryFocus.includes(industry);
                        return (
                          <label
                            key={industry}
                            htmlFor={industry}
                              className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                                checked
                                  ? "bg-indigo-500/10 border-indigo-400/40"
                                  : "bg-white/5 border-white/10 hover:bg-white/10"
                              }`}
                            >
                              <Checkbox
                                id={industry}
                                checked={checked}
                                onCheckedChange={(isChecked) => {
                                  if (isChecked) {
                                    updateFormData({
                                      industryFocus: [
                                        ...formData.industryFocus,
                                        industry,
                                      ],
                                    });
                                  } else {
                                    updateFormData({
                                      industryFocus: formData.industryFocus.filter(
                                        (i) => i !== industry
                                      ),
                                    });
                                  }
                                }}
                                className="border-white/30 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                              />
                              <span className="text-white/90">{industry}</span>
                            </label>
                          );
                        }
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </StepTransition>
        );

      case 6:
        return (
          <StepTransition isActive>
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-600 rounded-2xl mb-4 shadow-2xl">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Personalized Roadmap
                </h2>
                <p className="text-gray-400 mt-2">
                  Your customized learning path is ready!
                </p>
              </div>

              <Card className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-yellow-300">
                    Congratulations{formData.firstName ? `, ${formData.firstName}` : ""}! 🎉
                  </h3>
                  <p className="text-gray-300">
                    Based on your responses, we've created a personalized roadmap
                    for your journey to become a{" "}
                    <span className="text-indigo-300">
                      {formData.primaryGoal
                        ? formData.primaryGoal.replace("-", " ")
                        : "top professional"}
                    </span>
                    .
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-red-300">85%</div>
                    <div className="text-sm text-gray-400">Goal Alignment</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-yellow-300">12</div>
                    <div className="text-sm text-gray-400">Skills to Develop</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-red-300">24</div>
                    <div className="text-sm text-gray-400">Months to Goal</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-white/90">
                    Your Learning Path Highlights:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      ["Foundation Building", "Core programming skills"],
                      ["Specialization", "Advanced technical skills"],
                      ["Project Experience", "Real-world applications"],
                      ["Career Preparation", "Interview & job readiness"],
                    ].map(([title, sub], i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-yellow-600 rounded-full flex items-center justify-center text-black text-sm font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <div className="font-medium text-white/90">{title}</div>
                          <div className="text-sm text-gray-400">{sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/5 border-white/20">
                <h4 className="font-semibold mb-4 text-white/90">
                  Customize Your Experience
                </h4>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white/90">Learning Intensity</Label>
                    <RadioGroup
                      value={formData.intensityLevel}
                      onValueChange={(value) =>
                        updateFormData({ intensityLevel: value })
                      }
                      className="mt-3 space-y-3"
                    >
                      <label
                        htmlFor="light"
                        className="flex items-center gap-3 p-3 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer"
                      >
                        <RadioGroupItem value="light" id="light" />
                        <span className="text-white/90">Light (5–10 hrs/week)</span>
                      </label>
                      <label
                        htmlFor="moderate"
                        className="flex items-center gap-3 p-3 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer"
                      >
                        <RadioGroupItem value="moderate" id="moderate" />
                        <span className="text-white/90">Moderate (10–15 hrs/week)</span>
                      </label>
                      <label
                        htmlFor="intensive"
                        className="flex items-center gap-3 p-3 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer"
                      >
                        <RadioGroupItem value="intensive" id="intensive" />
                        <span className="text-white/90">Intensive (15+ hrs/week)</span>
                      </label>
                    </RadioGroup>
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Make Adjustments
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-red-600 to-yellow-600 hover:from-blue-500 hover:to-white text-black"
                >
                  {isLoading ? "Creating Account..." : "Create My Account"}
                </Button>
              </div>
              {error && (
                <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">
                  {error}
                </div>
              )}
            </div>
          </StepTransition>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {isLoading ? <RocketLaunchLoader /> : renderStep()}
      
      {currentStep < totalSteps && !isLoading && (
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={nextStep}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

// === College Registration Component ===
const CollegeRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    collegeName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    website: "",
    establishedYear: "",
    collegeType: "",
    accreditation: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    contactPerson: "",
    contactPersonEmail: "",
    contactPersonPhone: "",
    totalStudents: "",
    programs: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const countries = [
    "India", "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "China", "Singapore"
  ];

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const collegeTypes = [
    "Public University", "Private University", "Government College", "Private College", 
    "Institute of Technology", "Medical College", "Engineering College", "Business School", "Arts College"
  ];

  const availablePrograms = [
    "Computer Science Engineering", "Information Technology", "Electronics Engineering", 
    "Mechanical Engineering", "Civil Engineering", "Business Administration", "Economics",
    "Medicine", "Law", "Arts", "Science", "Commerce", "Pharmacy", "Architecture"
  ];

  const updateFormData = (updates: any) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Validate required fields
      if (!formData.collegeName || !formData.email || !formData.password) {
        throw new Error("Please fill in all required fields");
      }

      if (!formData.agreeToTerms) {
        throw new Error("Please agree to the terms and conditions");
      }

      // Generate a unique token for the college
      const collegeToken = generateCollegeToken();

      // Make API call to register college
      const response = await fetch("/api/auth/register-college", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          collegeToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Redirect to college login page
      router.push("/college-login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateCollegeToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepTransition isActive>
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-2xl">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  College Information
                </h2>
                <p className="text-gray-400 mt-2">
                  Tell us about your educational institution
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="collegeName" className="text-white font-medium">
                    College/University Name *
                  </Label>
                  <Input
                    id="collegeName"
                    placeholder="Enter college name"
                    value={formData.collegeName}
                    onChange={(e) => updateFormData({ collegeName: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">
                    Official Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@college.edu"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white font-medium">Country *</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => updateFormData({ country: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {countries.map((country) => (
                        <SelectItem
                          key={country}
                          value={country}
                          className="text-white hover:bg-white/10"
                        >
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.country === "India" && (
                  <div className="space-y-2">
                    <Label className="text-white font-medium">State *</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => updateFormData({ state: value })}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20">
                        {indianStates.map((state) => (
                          <SelectItem
                            key={state}
                            value={state}
                            className="text-white hover:bg-white/10"
                          >
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white font-medium">
                    City *
                  </Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={(e) => updateFormData({ city: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white font-medium">
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="Enter full address"
                    value={formData.address}
                    onChange={(e) => updateFormData({ address: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white font-medium">
                    Website
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://www.college.edu"
                    value={formData.website}
                    onChange={(e) => updateFormData({ website: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                  />
                </div>
              </div>
            </div>
          </StepTransition>
        );

      case 2:
        return (
          <StepTransition isActive>
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-2xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Institution Details
                </h2>
                <p className="text-gray-400 mt-2">
                  Additional information about your institution
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white font-medium">College Type *</Label>
                  <Select
                    value={formData.collegeType}
                    onValueChange={(value) => updateFormData({ collegeType: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select college type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {collegeTypes.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="text-white hover:bg-white/10"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="establishedYear" className="text-white font-medium">
                    Established Year
                  </Label>
                  <Input
                    id="establishedYear"
                    placeholder="e.g., 1995"
                    value={formData.establishedYear}
                    onChange={(e) => updateFormData({ establishedYear: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accreditation" className="text-white font-medium">
                    Accreditation
                  </Label>
                  <Input
                    id="accreditation"
                    placeholder="e.g., NAAC, NBA, AICTE"
                    value={formData.accreditation}
                    onChange={(e) => updateFormData({ accreditation: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalStudents" className="text-white font-medium">
                    Total Students
                  </Label>
                  <Input
                    id="totalStudents"
                    placeholder="e.g., 5000"
                    value={formData.totalStudents}
                    onChange={(e) => updateFormData({ totalStudents: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPerson" className="text-white font-medium">
                    Contact Person Name
                  </Label>
                  <Input
                    id="contactPerson"
                    placeholder="Enter contact person name"
                    value={formData.contactPerson}
                    onChange={(e) => updateFormData({ contactPerson: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPersonEmail" className="text-white font-medium">
                    Contact Person Email
                  </Label>
                  <Input
                    id="contactPersonEmail"
                    type="email"
                    placeholder="contact@college.edu"
                    value={formData.contactPersonEmail}
                    onChange={(e) => updateFormData({ contactPersonEmail: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                  />
                </div>
              </div>

              <Card className="bg-white/5 border-white/20">
                <CardContent className="p-6">
                  <Label className="text-white font-medium mb-4">
                    Available Programs (Select multiple)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    {availablePrograms.map((program) => {
                      const checked = formData.programs.includes(program);
                      return (
                        <label
                          key={program}
                          htmlFor={program}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                            checked
                              ? "bg-green-500/10 border-green-400/40"
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <Checkbox
                            id={program}
                            checked={checked}
                            onCheckedChange={(isChecked) => {
                              if (isChecked) {
                                updateFormData({
                                  programs: [...formData.programs, program],
                                });
                              } else {
                                updateFormData({
                                  programs: formData.programs.filter((p) => p !== program),
                                });
                              }
                            }}
                            className="border-white/30 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <span className="text-white/90 text-sm">{program}</span>
                        </label>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </StepTransition>
        );

      case 3:
        return (
          <StepTransition isActive>
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-2xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Security & Access
                </h2>
                <p className="text-gray-400 mt-2">
                  Set up your account credentials
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-medium">
                    Password *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => updateFormData({ password: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white font-medium">
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                  />
                </div>
              </div>

              <Card className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-300">
                    Almost Ready! 🎉
                  </h3>
                  <p className="text-gray-300">
                    After registration, you'll receive a unique token to share with your students 
                    for easy registration and access to your college's platform.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-white/90">
                    What happens next:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      ["Token Generation", "Unique access token created"],
                      ["Student Access", "Share token with students"],
                      ["Dashboard Setup", "Access your admin panel"],
                      ["Student Management", "Manage student registrations"],
                    ].map(([title, sub], i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <div className="font-medium text-white/90">{title}</div>
                          <div className="text-sm text-gray-400">{sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Checkbox
                  id="terms-college"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    updateFormData({ agreeToTerms: checked as boolean })
                  }
                  className="border-white/20 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label htmlFor="terms-college" className="text-sm text-gray-300">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-green-400 hover:text-green-300 underline"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-green-400 hover:text-green-300 underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white"
                >
                  {isLoading ? "Creating Account..." : "Create College Account"}
                </Button>
              </div>
              {error && (
                <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">
                  {error}
                </div>
              )}
            </div>
          </StepTransition>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {isLoading ? <RocketLaunchLoader /> : renderStep()}
      
      {currentStep < totalSteps && !isLoading && (
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={nextStep}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

// === Professional Registration Component ===
const ProfessionalRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    industry: "",
    experience: "",
    currentSalary: "",
    expectedSalary: "",
    linkedin: "",
    github: "",
    portfolio: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    skills: [] as string[],
    certifications: "" as string,
    careerGoals: "" as string,
    preferredLearningStyle: "" as string,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (updates: any) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("Professional registration completed:", formData);
      // router.push("/dashboard");
    } catch (e) {
      console.error("Registration failed:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepTransition isActive>
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mb-4 shadow-2xl">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Personal Information
                </h2>
                <p className="text-gray-400 mt-2">Let's start with your basic details</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={(e) => updateFormData({ firstName: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white font-medium">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Your last name"
                    value={formData.lastName}
                    onChange={(e) => updateFormData({ lastName: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@company.com"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-white font-medium">
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="linkedin.com/in/yourprofile"
                    value={formData.linkedin}
                    onChange={(e) => updateFormData({ linkedin: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio" className="text-white font-medium">
                    Portfolio Website
                  </Label>
                  <Input
                    id="portfolio"
                    placeholder="yourportfolio.com"
                    value={formData.portfolio}
                    onChange={(e) => updateFormData({ portfolio: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-medium">
                    Password *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => updateFormData({ password: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white font-medium">
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </StepTransition>
        );

      case 2:
        return (
          <StepTransition isActive>
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mb-4 shadow-2xl">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Professional Information
                </h2>
                <p className="text-gray-400 mt-2">Tell us about your professional experience</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white font-medium">Current Company *</Label>
                  <Select
                    value={formData.company}
                    onValueChange={(value) => updateFormData({ company: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select your company" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {companies.map((company) => (
                        <SelectItem key={company} value={company} className="text-white hover:bg-white/10">
                          {company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation" className="text-white font-medium">
                    Current Designation *
                  </Label>
                  <Input
                    id="designation"
                    placeholder="e.g., Senior Software Engineer"
                    value={formData.designation}
                    onChange={(e) => updateFormData({ designation: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white font-medium">Industry *</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => updateFormData({ industry: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry} className="text-white hover:bg-white/10">
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white font-medium">Years of Experience *</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => updateFormData({ experience: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="0-2" className="text-white hover:bg-white/10">0-2 years</SelectItem>
                      <SelectItem value="2-5" className="text-white hover:bg-white/10">2-5 years</SelectItem>
                      <SelectItem value="5-10" className="text-white hover:bg-white/10">5-10 years</SelectItem>
                      <SelectItem value="10-15" className="text-white hover:bg-white/10">10-15 years</SelectItem>
                      <SelectItem value="15+" className="text-white hover:bg-white/10">15+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentSalary" className="text-white font-medium">
                    Current CTC (Optional)
                  </Label>
                  <Input
                    id="currentSalary"
                    placeholder="e.g., 15 LPA"
                    value={formData.currentSalary}
                    onChange={(e) => updateFormData({ currentSalary: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedSalary" className="text-white font-medium">
                    Expected CTC (Optional)
                  </Label>
                  <Input
                    id="expectedSalary"
                    placeholder="e.g., 25 LPA"
                    value={formData.expectedSalary}
                    onChange={(e) => updateFormData({ expectedSalary: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certifications" className="text-white font-medium">
                  Certifications (Optional)
                </Label>
                <Input
                  id="certifications"
                  placeholder="e.g., AWS Certified, PMP, Scrum Master"
                  value={formData.certifications}
                  onChange={(e) => updateFormData({ certifications: e.target.value })}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </StepTransition>
        );

      case 3:
        return (
          <StepTransition isActive>
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mb-4 shadow-2xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Career Goals & Preferences
                </h2>
                <p className="text-gray-400 mt-2">Help us understand your career aspirations</p>
              </div>

              <Card className="bg-white/5 border-white/20">
                <CardContent className="p-6">
                  <Label className="text-white font-medium mb-4">Top Skills (Select multiple)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    {academicInterestOptions.map((skill) => {
                      const checked = formData.skills.includes(skill);
                      return (
                        <label
                          key={skill}
                          htmlFor={skill}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition cursor-pointer ${
                            checked
                              ? "bg-yellow-500/10 border-yellow-400/40"
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <Checkbox
                            id={skill}
                            checked={checked}
                            onCheckedChange={(isChecked) => {
                              if (isChecked) {
                                updateFormData({
                                  skills: [...formData.skills, skill],
                                });
                              } else {
                                updateFormData({
                                  skills: formData.skills.filter((s) => s !== skill),
                                });
                              }
                            }}
                            className="border-white/30"
                          />
                          <span className="text-white/90 text-sm">{skill}</span>
                        </label>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="careerGoals" className="text-white font-medium">
                  Career Goals (Brief Description) *
                </Label>
                <textarea
                  id="careerGoals"
                  placeholder="Describe your short-term and long-term career goals..."
                  value={formData.careerGoals}
                  onChange={(e) => updateFormData({ careerGoals: e.target.value })}
                  className="w-full min-h-[100px] p-3 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white font-medium">Preferred Learning Style</Label>
                <RadioGroup
                  value={formData.preferredLearningStyle}
                  onValueChange={(value) => updateFormData({ preferredLearningStyle: value })}
                  className="space-y-3"
                >
                  <label htmlFor="self-paced" className="flex items-center gap-3 p-3 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                    <RadioGroupItem value="self-paced" id="self-paced" />
                    <span className="text-white/90">Self-paced online courses</span>
                  </label>
                  <label htmlFor="live-sessions" className="flex items-center gap-3 p-3 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                    <RadioGroupItem value="live-sessions" id="live-sessions" />
                    <span className="text-white/90">Live instructor-led sessions</span>
                  </label>
                  <label htmlFor="hybrid" className="flex items-center gap-3 p-3 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                    <RadioGroupItem value="hybrid" id="hybrid" />
                    <span className="text-white/90">Hybrid (mix of both)</span>
                  </label>
                  <label htmlFor="mentorship" className="flex items-center gap-3 p-3 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer">
                    <RadioGroupItem value="mentorship" id="mentorship" />
                    <span className="text-white/90">1-on-1 mentorship</span>
                  </label>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Checkbox
                  id="terms-prof"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => updateFormData({ agreeToTerms: checked as boolean })}
                  className="border-white/20"
                />
                <Label htmlFor="terms-prof" className="text-sm text-gray-300">
                  I agree to the Terms and Conditions and Privacy Policy
                </Label>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white"
              >
                {isLoading ? "Creating Account..." : "Complete Registration"}
              </Button>
            </div>
          </StepTransition>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {isLoading ? <RocketLaunchLoader /> : renderStep()}
      
      {currentStep !== 3 && !isLoading && (
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={nextStep}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

// === Main Register Component ===
export default function RegisterPage() {
  const [userType, setUserType] = useState<'professional' | 'college' | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!userType) {
    return (
      <div
        className="dark min-h-screen relative text-white"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 0%, rgba(99,102,241,0.15), transparent 40%), radial-gradient(800px 400px at 100% 20%, rgba(168,85,247,0.12), transparent 40%), #0b0f1a",
        }}
      >
        <UserTypeSelection onSelect={setUserType} />
      </div>
    );
  }

  const isCollege = userType === 'college';
  const currentProgress = isCollege ? 33 : 33; // Simplified progress for demo

  return (
    <div
      className="dark min-h-screen relative text-white"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% 0%, rgba(99,102,241,0.15), transparent 40%), radial-gradient(800px 400px at 100% 20%, rgba(168,85,247,0.12), transparent 40%), #0b0f1a",
      }}
    >
      <AnimatedBackground />

      {/* Mouse-follow spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(300px 200px at ${mousePosition.x}% ${mousePosition.y}%, rgba(99,102,241,0.12), rgba(0,0,0,0) 60%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-white/10 bg-black/30 backdrop-blur">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setUserType(null)}
                  className="text-white hover:bg-white/10"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Change Path
                </Button>
                <img
                  src="/logo.png"
                  alt="StudentPath Logo"
                  className="h-15 w-auto"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isCollege
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                }`}>
                  {isCollege ? 'College' : 'Professional'} Registration
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Card className="border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl">
            <CardContent className="p-8">
              {isCollege ? <CollegeRegistration /> : <ProfessionalRegistration />}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 bg-black/30 mt-12">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center">
            <p className="text-sm text-gray-300">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-300 hover:text-indigo-200 font-medium underline-offset-4 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

