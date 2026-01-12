"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VoiceGuide } from "@/components/voice-guide"
import { Sparkles, Code, Music, Palette, Brain, BookOpen, Users, Rocket, ArrowRight, Github, Mail } from "lucide-react"

const inspirationalQuotes = [
  "The future belongs to those who believe in the beauty of their dreams.",
  "Education is not the filling of a pail, but the lighting of a fire.",
  "The only way to do great work is to love what you do.",
  "Your attitude, not your aptitude, will determine your altitude.",
  "The best way to predict the future is to create it.",
]

const careerPaths = [
  {
    id: "developer",
    name: "Developer",
    icon: <Code className="h-8 w-8" />,
    description: "Master coding, build applications, and shape the digital world",
    color: "from-blue-500 to-cyan-400",
    skills: ["JavaScript", "React", "Node.js", "Python", "Database Design"],
  },
  {
    id: "musician",
    name: "Musician",
    icon: <Music className="h-8 w-8" />,
    description: "Compose, perform, and produce music across various genres",
    color: "from-purple-500 to-pink-400",
    skills: ["Music Theory", "Composition", "Performance", "Production", "Arrangement"],
  },
  {
    id: "artist",
    name: "Artist",
    icon: <Palette className="h-8 w-8" />,
    description: "Create visual art, illustrations, and designs that inspire",
    color: "from-orange-500 to-yellow-400",
    skills: ["Drawing", "Painting", "Digital Art", "Color Theory", "Composition"],
  },
  {
    id: "researcher",
    name: "Researcher",
    icon: <Brain className="h-8 w-8" />,
    description: "Explore, analyze, and discover new knowledge in your field",
    color: "from-green-500 to-emerald-400",
    skills: ["Research Methods", "Data Analysis", "Critical Thinking", "Academic Writing", "Statistics"],
  },
  {
    id: "educator",
    name: "Educator",
    icon: <BookOpen className="h-8 w-8" />,
    description: "Teach, mentor, and inspire the next generation of learners",
    color: "from-red-500 to-orange-400",
    skills: ["Pedagogy", "Curriculum Design", "Assessment", "Educational Technology", "Communication"],
  },
  {
    id: "entrepreneur",
    name: "Entrepreneur",
    icon: <Rocket className="h-8 w-8" />,
    description: "Build ventures, innovate, and create value in the market",
    color: "from-indigo-500 to-blue-400",
    skills: ["Business Strategy", "Marketing", "Finance", "Leadership", "Innovation"],
  },
]

export default function HomePage() {
  const [quote, setQuote] = useState(inspirationalQuotes[0])
  const [showVoiceGuide, setShowVoiceGuide] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Rotate quotes
    const quoteInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length)
      setQuote(inspirationalQuotes[randomIndex])
    }, 8000)

    // Show voice guide after 2 seconds
    const voiceGuideTimer = setTimeout(() => {
      setShowVoiceGuide(true)
    }, 2000)

    return () => {
      clearInterval(quoteInterval)
      clearTimeout(voiceGuideTimer)
    }
  }, [])

  const handleCareerSelect = (careerId: string) => {
    setSelectedCareer(careerId)
    localStorage.setItem("selectedCareer", careerId)
  }

  const handleGetStarted = () => {
    if (selectedCareer) {
      router.push(`/login?career=${selectedCareer}`)
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#05060f] via-[#0a102a] to-[#121b3f]">
      {/* Neon glows */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-[#22d3ee]/30 blur-3xl" />
        <div className="absolute -bottom-48 -right-24 h-96 w-96 rounded-full bg-[#a855f7]/25 blur-[90px]" />
        <div className="absolute top-1/4 right-1/3 h-64 w-64 rounded-full bg-[#f59e0b]/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_35%)]" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#f59e0b] opacity-70 blur-2xl" />
              <div className="absolute inset-3 rounded-2xl bg-black/60 border border-cyan-400/30 shadow-[0_0_30px_rgba(6,182,212,0.35)] backdrop-blur-xl flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-cyan-100" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#f59e0b] drop-shadow-[0_0_25px_rgba(168,85,247,0.45)] mb-6">
            Abhyas
          </h1>

          <motion.p
            className="text-xl md:text-2xl text-cyan-100/90 mb-8"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Where Hardwork meet Learning
          </motion.p>

          <motion.p
            className="text-lg text-cyan-100/80 max-w-2xl mx-auto mb-12 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            "{quote}"
          </motion.p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#f59e0b] hover:from-[#0ea5e9] hover:via-[#9333ea] hover:to-[#fbbf24] text-black font-semibold px-8 py-6 text-lg rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="bg-[#0b1427]/70 backdrop-blur-lg border border-cyan-400/30 text-cyan-100 hover:border-fuchsia-400 hover:shadow-[0_0_20px_rgba(232,121,249,0.35)] px-8 py-6 text-lg rounded-xl transition-all duration-300"
                onClick={() => {
                  // Scroll to features section
                  const featuresSection = document.getElementById("features")
                  if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#f59e0b] text-center mb-8 drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]">
            Choose Your Career Path
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerPaths.map((career, idx) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`cursor-pointer ${selectedCareer === career.id ? "ring-4 ring-[#22d3ee]/40" : ""}`}
                onClick={() => handleCareerSelect(career.id)}
              >
                <Card className="bg-[#0b1427]/70 backdrop-blur-xl border border-cyan-400/25 overflow-hidden h-full hover:border-fuchsia-400/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-300">
                  <div className={`h-2 bg-gradient-to-r ${career.color}`}></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-4 rounded-full bg-gradient-to-r ${career.color} mb-4 shadow-[0_0_20px_rgba(255,255,255,0.15)]`}>
                        {career.icon}
                      </div>
                      <h3 className="text-xl font-bold text-cyan-100 mb-2">{career.name}</h3>
                      <p className="text-cyan-100/70 mb-4">{career.description}</p>
                      <div className="flex flex-wrap justify-center gap-2 mt-auto">
                        {career.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-xs text-cyan-100/80 border border-cyan-400/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mb-16" id="features">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#f59e0b] mb-8 drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]">
            Why Abhyas?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Emotional Learning",
                description: "Learn based on your emotional state for maximum effectiveness",
                icon: <Brain className="h-10 w-10" />,
                color: "from-blue-500 to-cyan-400",
              },
              {
                title: "Career-Specific",
                description: "Personalized content tailored to your career path",
                icon: <Rocket className="h-10 w-10" />,
                color: "from-purple-500 to-pink-400",
              },
              {
                title: "AI Guidance",
                description: "Intelligent voice assistant to help you on your journey",
                icon: <Sparkles className="h-10 w-10" />,
                color: "from-green-500 to-emerald-400",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index + 0.5 }}
                className="bg-[#0b1427]/70 backdrop-blur-xl p-6 rounded-2xl border border-cyan-400/25 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:border-fuchsia-400/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-300"
              >
                <div
                  className={`p-4 rounded-full bg-gradient-to-r ${feature.color} mx-auto mb-4 w-20 h-20 flex items-center justify-center shadow-[0_0_18px_rgba(255,255,255,0.12)]`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-cyan-100 mb-2">{feature.title}</h3>
                <p className="text-cyan-100/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#a855f7] to-[#f59e0b] mb-8 drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]">
            Join Our Community
          </h2>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="bg-[#0b1427]/70 backdrop-blur-lg border border-cyan-400/30 text-cyan-100 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] px-6 py-2 rounded-xl transition-all duration-300"
              onClick={() => window.open("https://github.com", "_blank")}
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="bg-[#0b1427]/70 backdrop-blur-lg border border-cyan-400/30 text-cyan-100 hover:border-fuchsia-300 hover:shadow-[0_0_20px_rgba(232,121,249,0.35)] px-6 py-2 rounded-xl transition-all duration-300"
              onClick={() => {
                const email = prompt("Enter your email to subscribe to our newsletter:")
                if (email) {
                  alert(`Thank you! We'll send updates to ${email}`)
                }
              }}
            >
              <Mail className="mr-2 h-5 w-5" />
              Newsletter
            </Button>
            <Button
              variant="outline"
              className="bg-[#0b1427]/70 backdrop-blur-lg border border-cyan-400/30 text-cyan-100 hover:border-amber-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] px-6 py-2 rounded-xl transition-all duration-300"
              onClick={() => router.push("/teams")}
            >
              <Users className="mr-2 h-5 w-5" />
              Community
            </Button>
          </div>
        </div>
      </div>

      {/* Voice Guide */}
      {showVoiceGuide && (
        <VoiceGuide
          message="Welcome to Abhyas! I'm your AI guide. Choose a career path to get personalized learning content, or click Get Started to begin your journey."
          onClose={() => setShowVoiceGuide(false)}
        />
      )}
    </div>
  )
}
