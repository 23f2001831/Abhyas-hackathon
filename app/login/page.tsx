"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/components/auth-provider"
import { VoiceGuide } from "@/components/voice-guide"
import {
  ArrowRight,
  Github,
  Mail,
  Key,
  User,
  Rocket,
  Code,
  Music,
  Palette,
  Brain,
  BookOpen,
  Sparkles,
} from "lucide-react"

// Career icons mapping
const careerIcons = {
  developer: <Code className="h-6 w-6" />,
  musician: <Music className="h-6 w-6" />,
  artist: <Palette className="h-6 w-6" />,
  researcher: <Brain className="h-6 w-6" />,
  educator: <BookOpen className="h-6 w-6" />,
  entrepreneur: <Rocket className="h-6 w-6" />,
}

// Career welcome messages
const careerWelcomeMessages = {
  developer: "Welcome, Developer! Ready to code your future?",
  musician: "Welcome, Musician! Ready to compose your journey?",
  artist: "Welcome, Artist! Ready to create your masterpiece?",
  researcher: "Welcome, Researcher! Ready to discover new knowledge?",
  educator: "Welcome, Educator! Ready to inspire the next generation?",
  entrepreneur: "Welcome, Entrepreneur! Ready to build your venture?",
  default: "Welcome to Em-Sphere! Your journey begins here.",
}

// Career-specific voice guide messages
const careerVoiceMessages = {
  developer:
    "Welcome to Em-Sphere for Developers! I'll be your coding companion, helping you master programming languages, build amazing applications, and connect with other developers. Let's start by logging in or creating an account.",
  musician:
    "Welcome to Em-Sphere for Musicians! I'll be your musical guide, helping you improve your composition skills, master your instruments, and connect with other musicians. Let's start by logging in or creating an account.",
  artist:
    "Welcome to Em-Sphere for Artists! I'll be your creative companion, helping you refine your techniques, explore new mediums, and showcase your work. Let's start by logging in or creating an account.",
  researcher:
    "Welcome to Em-Sphere for Researchers! I'll be your academic guide, helping you explore new fields, analyze data, and publish your findings. Let's start by logging in or creating an account.",
  educator:
    "Welcome to Em-Sphere for Educators! I'll be your teaching assistant, helping you develop curriculum, engage students, and implement effective teaching strategies. Let's start by logging in or creating an account.",
  entrepreneur:
    "Welcome to Em-Sphere for Entrepreneurs! I'll be your business companion, helping you develop your ideas, create business plans, and connect with investors. Let's start by logging in or creating an account.",
  default:
    "Welcome to Em-Sphere! I'm your AI guide, here to help you navigate your learning journey. Let's start by logging in or creating an account.",
}

// Career background gradients (neon / cyberpunk)
const careerBackgrounds = {
  developer: "from-[#050912] via-[#0b1f3a] to-[#111b4d]",
  musician: "from-[#0f0b2e] via-[#261149] to-[#3b0f52]",
  artist: "from-[#2a0b1f] via-[#4a0f3b] to-[#6a0f4f]",
  researcher: "from-[#0a1d1d] via-[#0f2f3a] to-[#153a4d]",
  educator: "from-[#1b0c1b] via-[#2d0f2f] to-[#3d0f3d]",
  entrepreneur: "from-[#0a1230] via-[#0d1f4a] to-[#0f2f5a]",
  default: "from-[#05060f] via-[#0a102a] to-[#121b3f]",
}

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [showReset, setShowReset] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [showVoiceGuide, setShowVoiceGuide] = useState(false)
  const [career, setCareer] = useState("default")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, signup, demoLogin } = useAuth()

  useEffect(() => {
    // Get career from URL params or localStorage (client-side only)
    const urlCareer = searchParams.get("career")
    if (urlCareer) {
      setCareer(urlCareer)
    } else if (typeof window !== "undefined") {
      const storedCareer = localStorage.getItem("selectedCareer")
      if (storedCareer) {
        setCareer(storedCareer)
      }
    }

    // Show voice guide after 1 second
    const timer = setTimeout(() => {
      setShowVoiceGuide(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchParams])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Call the login function from AuthProvider
      await login(email, password)

      // Navigate to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Call the signup function from AuthProvider
      await signup(name, email, password)
    } catch (error) {
      console.error("Signup failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setResetSent(true)
    } catch (error) {
      console.error("Password reset failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)

    try {
      await demoLogin()
      router.push("/dashboard")
    } catch (error) {
      console.error("Demo login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br ${
        careerBackgrounds[career] || careerBackgrounds.default
      }`}
    >
      {/* Neon overlays */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-[#7c3aed]/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-[#06b6d4]/40 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 h-32 w-32 rounded-full bg-[#f97316]/30 blur-2xl" />
      </div>

      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md relative">
          <motion.div
            className="inline-block mb-8 w-full flex justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#f59e0b] opacity-70 blur-2xl" />
              <div className="absolute inset-3 rounded-2xl bg-black/60 border border-cyan-400/30 shadow-[0_0_30px_rgba(6,182,212,0.35)] backdrop-blur-xl flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-cyan-100" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.35)]">
              {careerWelcomeMessages[career] || careerWelcomeMessages.default}
            </h1>
          </motion.div>

          <AnimatePresence mode="wait">
            {showReset ? (
              <motion.div
                key="reset"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-cyan-400/30 bg-black/60 backdrop-blur-xl shadow-[0_0_25px_rgba(34,211,238,0.25)]">
                  <CardHeader>
                    <CardTitle className="text-cyan-100">Reset Password</CardTitle>
                    <CardDescription className="text-cyan-200/70">
                      {resetSent
                        ? "Check your email for a password reset link"
                        : "Enter your email to receive a password reset link"}
                    </CardDescription>
                  </CardHeader>
                  {!resetSent ? (
                    <form onSubmit={handlePasswordReset}>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="reset-email" className="text-cyan-100">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-cyan-300/60" />
                            <Input
                              id="reset-email"
                              type="email"
                              placeholder="your.email@example.com"
                              className="pl-10 bg-[#0b1427] border-cyan-400/30 text-cyan-100 placeholder:text-cyan-200/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                              value={resetEmail}
                              onChange={(e) => setResetEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2">
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-400 text-black font-semibold shadow-[0_0_20px_rgba(244,114,182,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.45)]"
                          disabled={isLoading}
                        >
                          {isLoading ? "Sending..." : "Send Reset Link"}
                        </Button>
                        <Button
                          variant="ghost"
                          type="button"
                          className="w-full text-cyan-100 hover:bg-white/10"
                          onClick={() => {
                            setShowReset(false)
                            setResetSent(false)
                          }}
                          disabled={isLoading}
                        >
                          Back to Login
                        </Button>
                      </CardFooter>
                    </form>
                  ) : (
                    <CardContent className="space-y-4">
                      <div className="rounded-lg bg-white/10 p-4 text-center">
                        <p className="text-sm text-white">
                          We've sent a password reset link to <strong>{resetEmail}</strong>. Please check your inbox.
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full text-white hover:bg-white/10"
                        onClick={() => {
                          setShowReset(false)
                          setResetSent(false)
                        }}
                      >
                        Back to Login
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="auth"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-cyan-400/30 bg-black/70 backdrop-blur-2xl shadow-[0_0_35px_rgba(6,182,212,0.25)]">
                  <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#f59e0b] drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                      Em-Sphere
                    </CardTitle>
                    <CardDescription className="text-center text-cyan-100/80">
                      Neon gateway to your personalized learning universe
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-cyan-400/30 rounded-full p-1 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                        <TabsTrigger
                          value="login"
                          className="text-cyan-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#22d3ee] data-[state=active]:via-[#a855f7] data-[state=active]:to-[#f59e0b] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(168,85,247,0.45)]"
                        >
                          Login
                        </TabsTrigger>
                        <TabsTrigger
                          value="signup"
                          className="text-cyan-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#22d3ee] data-[state=active]:via-[#a855f7] data-[state=active]:to-[#f59e0b] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(168,85,247,0.45)]"
                        >
                          Sign Up
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="mt-6">
                        <form onSubmit={handleLogin} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-cyan-100">
                              Email
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-cyan-300/70" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                className="pl-10 bg-[#0b1427] border-cyan-400/30 text-cyan-100 placeholder:text-cyan-200/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="password" className="text-cyan-100">
                                Password
                              </Label>
                              <Button
                                variant="link"
                                className="h-auto p-0 text-xs text-cyan-200/80 hover:text-cyan-100"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setShowReset(true)
                                }}
                              >
                                Forgot password?
                              </Button>
                            </div>
                            <div className="relative">
                              <Key className="absolute left-3 top-3 h-4 w-4 text-cyan-300/70" />
                              <Input
                                id="password"
                                type="password"
                                className="pl-10 bg-[#0b1427] border-cyan-400/30 text-cyan-100 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="remember"
                              className="border-white/50 data-[state=checked]:bg-white/80 data-[state=checked]:text-black"
                            />
                            <Label htmlFor="remember" className="text-sm text-white">
                              Remember me
                            </Label>
                          </div>
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#f59e0b] text-black font-semibold shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                            disabled={isLoading}
                          >
                            {isLoading ? "Logging in..." : "Login"}
                          </Button>
                        </form>
                      </TabsContent>
                      <TabsContent value="signup" className="mt-6">
                        <form onSubmit={handleSignup} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-cyan-100">
                              Name
                            </Label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-cyan-300/70" />
                              <Input
                                id="name"
                                placeholder="Your Name"
                                className="pl-10 bg-[#0b1427] border-cyan-400/30 text-cyan-100 placeholder:text-cyan-200/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-email" className="text-cyan-100">
                              Email
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-cyan-300/70" />
                              <Input
                                id="signup-email"
                                type="email"
                                placeholder="your.email@example.com"
                                className="pl-10 bg-[#0b1427] border-cyan-400/30 text-cyan-100 placeholder:text-cyan-200/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-password" className="text-cyan-100">
                              Password
                            </Label>
                            <div className="relative">
                              <Key className="absolute left-3 top-3 h-4 w-4 text-cyan-300/70" />
                              <Input
                                id="signup-password"
                                type="password"
                                className="pl-10 bg-[#0b1427] border-cyan-400/30 text-cyan-100 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#f59e0b] text-black font-semibold shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                            disabled={isLoading}
                          >
                            {isLoading ? "Creating account..." : "Create Account"}
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-cyan-400/30"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-black/40 px-3 py-1 rounded-full text-cyan-100/80 border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          className="w-full border-cyan-400/30 bg-[#0b1427] text-cyan-100 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                          disabled={isLoading}
                          onClick={() => {
                            // GitHub OAuth would be implemented here
                            window.open("https://github.com", "_blank")
                          }}
                        >
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-cyan-400/30 bg-[#0b1427] text-cyan-100 hover:border-fuchsia-400 hover:shadow-[0_0_20px_rgba(232,121,249,0.35)]"
                          onClick={handleDemoLogin}
                          disabled={isLoading}
                        >
                          <Rocket className="mr-2 h-4 w-4" />
                          Demo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button
                      variant="link"
                      asChild
                      className="text-cyan-100 hover:text-cyan-200 underline-offset-4"
                    >
                      <a href="/home" className="flex items-center text-xs">
                        <ArrowRight className="mr-1 h-3 w-3" />
                        Back to Home
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center">
            <p className="text-sm text-cyan-100/70">
              By signing in, you agree to our{" "}
              <a href="#" className="underline underline-offset-2 hover:text-cyan-100">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2 hover:text-cyan-100">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Voice Guide */}
      {showVoiceGuide && (
        <VoiceGuide
          message={careerVoiceMessages[career] || careerVoiceMessages.default}
          onClose={() => setShowVoiceGuide(false)}
        />
      )}
    </div>
  )
}
