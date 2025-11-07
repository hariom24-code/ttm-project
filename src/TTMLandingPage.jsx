import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Truck, MapPin, FileText, TrendingUp, BarChart3, Shield, Clock, DollarSign, Users, ChevronRight, Mail, Phone, Linkedin, Twitter } from 'lucide-react'

const TTMLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    fleetSize: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [counters, setCounters] = useState({ uptime: 0, savings: 0, fleets: 0 })
  const gsapRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // dynamic import GSAP + ScrollToPlugin — if available we'll use it for smooth scrolling
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const gsapModule = await import('gsap')
        // ScrollToPlugin is a separate path
        const scrollToModule = await import('gsap/ScrollToPlugin')
        const gsap = gsapModule.gsap || gsapModule.default || gsapModule
        const ScrollToPlugin = scrollToModule.ScrollToPlugin || scrollToModule.default || scrollToModule
        if (gsap && ScrollToPlugin && mounted) {
          gsap.registerPlugin && gsap.registerPlugin(ScrollToPlugin)
          gsapRef.current = gsap
        }
      } catch (e) {
        // dynamic import failed — fallback to native smooth scrolling
      }
    })()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = duration / steps
    
    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      setCounters({
        uptime: Math.min(99.9, (99.9 * currentStep) / steps),
        savings: Math.min(25, (25 * currentStep) / steps),
        fleets: Math.min(500, (500 * currentStep) / steps)
      })
      
      if (currentStep >= steps) clearInterval(timer)
    }, increment)
    
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ type: 'loading', message: 'Submitting...' })
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus({ 
        type: 'success', 
        message: "Thank you! We'll be in touch within 24 hours." 
      })
      setFormData({ name: '', email: '', company: '', fleetSize: '', message: '' })
    }, 1000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const scrollToSection = (id) => {
    setIsMenuOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    if (gsapRef.current && gsapRef.current.to) {
      try {
        // use ScrollToPlugin for smooth animated scrolling
        gsapRef.current.to(window, { duration: 1, scrollTo: { y: el, offsetY: 80 }, ease: 'power2.out' })
        return
      } catch (e) {
        // fall through to native
      }
    }
    el.scrollIntoView({ behavior: 'smooth' })
  }

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Real-Time GPS Tracking',
      description: 'Monitor your entire fleet with live location updates, geofencing, and route visualization for complete operational visibility.'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'ELD & Compliance Automation',
      description: 'Stay compliant with automated FMCSA reporting, HOS tracking, and DVIR management that eliminates paperwork and reduces violations.'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Driver Performance Analytics',
      description: 'Track driver behavior, safety scores, and performance metrics to improve safety culture and reduce accident risk.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Route Optimization & Fuel Insights',
      description: 'Reduce fuel costs and improve efficiency with AI-powered route planning and real-time fuel consumption analytics.'
    }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-2">
              <Truck className={`w-8 h-8 ${scrolled ? 'text-blue-600' : 'text-white'}`} />
              <span className={`text-xl lg:text-2xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                TTM
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`hover:text-blue-600 transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className={`hover:text-blue-600 transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('benefits')}
                className={`hover:text-blue-600 transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}
              >
                Solutions
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`hover:text-blue-600 transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}
              >
                Contact
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Request Demo
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 hover:text-blue-600">Home</button>
              <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 hover:text-blue-600">Features</button>
              <button onClick={() => scrollToSection('benefits')} className="block w-full text-left py-2 hover:text-blue-600">Solutions</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 hover:text-blue-600">Contact</button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
              >
                Request Demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-16 lg:pt-20 min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Smarter, Safer, Data-Driven Fleet Management
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              TTM connects your fleet, drivers, and data in real time — for seamless, compliant, and efficient operations.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all transform inline-flex items-center justify-center"
              >
                Request Demo
                <ChevronRight className="ml-2 w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('features')}
                whileHover={{ scale: 1.02 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Fleets
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed to optimize every aspect of your fleet operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.12, duration: 0.6 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Leading Fleets Choose TTM
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by hundreds of fleets across North America for reliability and results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {counters.uptime.toFixed(1)}%
              </div>
              <div className="text-gray-600 font-medium">Uptime Guarantee</div>
            </div>

            <div className="text-center p-6">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Expert Support</div>
            </div>

            <div className="text-center p-6">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <DollarSign className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {Math.round(counters.savings)}%
              </div>
              <div className="text-gray-600 font-medium">Lower Costs</div>
            </div>

            <div className="text-center p-6">
              <div className="bg-gradient-to-br from-orange-600 to-red-600 w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {Math.round(counters.fleets)}+
              </div>
              <div className="text-gray-600 font-medium">Trusted Fleets</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Request a Demo
              </h2>
              <p className="text-lg text-gray-600">
                See how TTM can transform your fleet operations. Fill out the form and our team will contact you within 24 hours.
              </p>
            </div>

            <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="fleetSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Fleet Size *
                  </label>
                  <select
                    id="fleetSize"
                    name="fleetSize"
                    required
                    value={formData.fleetSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select fleet size</option>
                    <option value="1-10">1-10 vehicles</option>
                    <option value="11-50">11-50 vehicles</option>
                    <option value="51-100">51-100 vehicles</option>
                    <option value="100+">100+ vehicles</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none"
                  placeholder="Tell us about your fleet management needs..."
                ></textarea>
              </div>

              {formStatus.message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  formStatus.type === 'success' ? 'bg-green-100 text-green-800' : 
                  formStatus.type === 'error' ? 'bg-red-100 text-red-800' : 
                  'bg-blue-100 text-blue-800'
                }`}>
                  {formStatus.message}
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Truck className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold text-white">TTM</span>
              </div>
              <p className="text-gray-400 mb-4">
                Total Transport Management - Connecting fleets with intelligent technology.
              </p>
              <p className="text-sm text-gray-500">
                Oak Hills, CA, USA
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-blue-400 transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('benefits')} className="hover:text-blue-400 transition-colors">Solutions</button></li>
                <li><a href="#privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <a href="mailto:support@ttmkonnect.com" className="hover:text-blue-400 transition-colors">
                    support@ttmkonnect.com
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span>24/7 Support Available</span>
                </li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <a href="#linkedin" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#twitter" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 TTM (Total Transport Management). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TTMLandingPage
