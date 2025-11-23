"use client"

import { useState } from "react"
import { MessageCircle, Lock, Sparkles, Shield, Zap, Users, Mail, Hash } from "lucide-react"

// In-memory store for usernames (replace with database in production)
const reservedUsernames = new Set<string>();

type UserProfile = {
  username: string;
  discordUsername: string;
  email: string;
};

export default function Home() {
  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [formData, setFormData] = useState<UserProfile>({
    username: "",
    discordUsername: "",
    email: ""
  })
  const [secured, setSecured] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleJoinCommunity = () => {
    alert("Coming Soon")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      setError("Username is required")
      return false
    }
    if (!formData.discordUsername.trim()) {
      setError("Discord username is required")
      return false
    }
    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }
    return true
  }

  const handleSecureUsername = async () => {
    if (!validateForm()) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      // Check username availability
      const { available, message } = await checkUsernameAvailability(formData.username)
      
      if (!available) {
        setError(message || "This username is not available")
        return
      }
      
      // In a real app, save to database here
      // For now, we'll just add to our in-memory set
      reservedUsernames.add(formData.username.toLowerCase())
      
      // Show success state
      setSecured(true)
      
      // Reset form after delay
      setTimeout(() => {
        setShowUsernameModal(false)
        setFormData({ username: "", discordUsername: "", email: "" })
        setSecured(false)
      }, 2500)
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error("Error securing username:", err)
    } finally {
      setIsLoading(false)
    }
  }
  
  // Check if username is available
  const checkUsernameAvailability = async (username: string): Promise<{ available: boolean; message?: string }> => {
    // Basic validation
    if (!username) {
      return { available: false, message: "Username is required" };
    }
    
    // Check length
    if (username.length < 3) {
      return { available: false, message: "Username must be at least 3 characters" };
    }
    
    // Check for valid characters (letters, numbers, underscores)
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return { available: false, message: "Only letters, numbers, and underscores are allowed" };
    }
    
    // Check if username is already taken
    const isTaken = reservedUsernames.has(username.toLowerCase());
    
    return {
      available: !isTaken,
      message: isTaken ? "This username is already taken" : undefined
    };
  }

  return (
    <>
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-20"></div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="animated-blob blob-1"></div>
        <div className="animated-blob blob-2"></div>
        <div className="animated-blob blob-3"></div>
      </div>

      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-3xl w-full container">
          <div className="mb-8 flex justify-center items-center gap-3 logo">
            <div className="relative">
              <span className="text-4xl font-black text-white tracking-tight logo-text">homicide.lol</span>
              <div className="absolute -inset-1 bg-white/20 blur-xl rounded-full -z-10"></div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white/90 backdrop-blur-sm">
              <Sparkles size={12} />
              BETA
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-4 title gradient-text leading-tight">
            Build Your Perfect Profile
          </h1>

          <p className="text-xl text-white/60 mb-8 font-medium subtitle">Your digital identity, your way</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 features">
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={24} />
              </div>
              <h3 className="font-semibold text-white mb-1">Secure</h3>
              <p className="text-sm text-white/60">Protected username reservation</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={24} />
              </div>
              <h3 className="font-semibold text-white mb-1">Instant</h3>
              <p className="text-sm text-white/60">Get started in seconds</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h3 className="font-semibold text-white mb-1">Community</h3>
              <p className="text-sm text-white/60">Join thousands of creators</p>
            </div>
          </div>

          <div className="cta-section">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 buttons">
              <button onClick={handleJoinCommunity} className="secondary-button group">
                <span className="icon">
                  <MessageCircle size={18} aria-hidden="true" />
                </span>
                <span>Join Community</span>
                <svg
                  className="ml-1 transition-transform group-hover:translate-x-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button onClick={() => setShowUsernameModal(true)} className="cta-button group">
                <span className="icon">
                  <Lock size={18} aria-hidden="true" />
                </span>
                <span>Secure Your Username</span>
                <svg
                  className="ml-1 transition-transform group-hover:translate-x-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <p className="text-xs text-white/40 mt-6">Trusted worldwide. </p>
          </div>
        </div>
      </div>

      {showUsernameModal && (
        <div className="modal-overlay" onClick={() => !secured && setShowUsernameModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-content">
                <h2 className="modal-title">{secured ? "Username Secured!" : "Reserve Your Username"}</h2>
                <p className="modal-description">
                  {secured
                    ? `@${formData.username} has been successfully reserved!`
                    : "Enter your details to secure your username"}
                </p>
              </div>
              {!secured && (
                <button className="modal-close-button" onClick={() => setShowUsernameModal(false)} aria-label="Close">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="modal-content">
              {!secured ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm mb-2 text-white/80">
                      Username
                    </label>
                    <div className="relative">
                      <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-900/50">
                        <span className="px-3 py-2 text-gray-400 border-r border-gray-700 bg-gray-800/50">homicide.lol/</span>
                        <input
                          id="username"
                          name="username"
                          type="text"
                          value={formData.username}
                          onChange={handleInputChange}
                          onKeyDown={(e) => e.key === "Enter" && handleSecureUsername()}
                          placeholder="yourname"
                          className="w-full px-3 py-2 bg-transparent border-0 focus:ring-0 focus:outline-none"
                          autoFocus
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="discordUsername" className="block text-sm mb-2 text-white/80">
                      Discord Username
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 text-gray-400 pointer-events-none">
                        <Hash className="h-4 w-4" />
                      </div>
                      <input
                        id="discordUsername"
                        name="discordUsername"
                        type="text"
                        value={formData.discordUsername}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === "Enter" && handleSecureUsername()}
                        placeholder="username#1234"
                        className="username-input w-full pl-10"
                        style={{ textIndent: '1.5rem' }}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 text-white/80">
                      Email Address
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 text-gray-400 pointer-events-none">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === "Enter" && handleSecureUsername()}
                        placeholder="your@email.com"
                        className="username-input w-full pl-10"
                        style={{ textIndent: '1.5rem' }}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <div className="text-red-400 text-sm mt-2">
                      {error}
                    </div>
                  )}

                  <button 
                    onClick={handleSecureUsername} 
                    disabled={isLoading || !formData.username.trim() || !formData.discordUsername.trim() || !formData.email.trim()}
                    className="main-button w-full flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Securing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        <span>Secure Username</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-4 flex justify-center">
                    <svg
                      className="success-checkmark"
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="text-lg text-white/90">You're all set! Welcome to homicide.lol</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
