import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  MagnifyingGlassIcon, 
  ChartBarIcon, 
  BellIcon, 
  CubeTransparentIcon,
  ArrowRightIcon,
  SparklesIcon,
  UserCircleIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: "Smart Search",
      description: "AI-powered search across thousands of tenders with intelligent filtering and matching.",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: ChartBarIcon,
      title: "Analytics Dashboard",
      description: "Real-time insights, market trends, and competitive analysis to maximize your success rate.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BellIcon,
      title: "Smart Alerts",
      description: "Get notified instantly when new tenders match your criteria and expertise.",
      color: "from-cyan-500 to-green-500"
    },
    {
      icon: RocketLaunchIcon,
      title: "AI Acceleration",
      description: "Leverage machine learning to predict winning strategies and optimize your proposals.",
      color: "from-green-500 to-yellow-500"
    },
    {
      icon: LightBulbIcon,
      title: "Smart Insights",
      description: "Get personalized recommendations and market intelligence to stay ahead.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: GlobeAltIcon,
      title: "Global Reach",
      description: "Access international tenders and expand your business opportunities worldwide.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Tenders", icon: CubeTransparentIcon },
    { value: "12K+", label: "Organizations", icon: UserCircleIcon },
    { value: "$2.5B+", label: "Total Value", icon: ChartBarIcon },
    { value: "95%", label: "Success Rate", icon: SparklesIcon }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-6 min-h-screen flex items-center">
        {/* 3D Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Enhanced gradient orbs */}
          <motion.div 
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/30 via-blue-500/20 to-cyan-500/30 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-500/30 via-purple-500/20 to-blue-500/30 rounded-full blur-2xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 40, 0],
              scale: [1, 0.8, 1],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/25 via-green-500/15 to-yellow-500/25 rounded-full blur-xl"
            animate={{
              x: [0, 60, -60, 0],
              y: [0, -40, 40, 0],
              scale: [1, 1.3, 0.7, 1],
              rotate: [0, 120, 240, 360],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="max-w-5xl mx-auto"
            style={{ y, opacity }}
          >
            {/* Animated badge */}
            <motion.div
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <SparklesIcon className="w-5 h-5 text-purple-400" />
              </motion.div>
              <span className="text-purple-300 text-sm font-semibold tracking-wide">
                AI-Powered Tender Intelligence Platform
              </span>
            </motion.div>

            {/* Main heading with enhanced animations */}
            <motion.h1 
              className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <motion.span 
                className="block gradient-text"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Discover
              </motion.span>
              <motion.span 
                className="block gradient-text"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Tomorrow's
              </motion.span>
              <motion.span 
                className="block gradient-text"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Opportunities
              </motion.span>
              <motion.span 
                className="block gradient-text"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Today
              </motion.span>
            </motion.h1>

            {/* Enhanced description */}
            <motion.p 
              className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Navigate the complex world of tenders with our{" "}
              <span className="text-purple-400 font-semibold">AI-powered platform</span>.
              Find, analyze, and win the contracts that matter to your business with{" "}
              <span className="text-blue-400 font-semibold">unprecedented precision</span>.
            </motion.p>

            {/* Enhanced CTA buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {user ? (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={() => navigate('/search')}
                      className="px-10 py-4 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 rounded-2xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 min-w-[220px]"
                    >
                      <RocketLaunchIcon className="w-6 h-6 mr-3" />
                      Explore Tenders
                      <ArrowRightIcon className="w-5 h-5 ml-3" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      onClick={signOut}
                      className="px-8 py-4 text-lg border-white/20 text-white hover:bg-white/10 hover:border-white/40 rounded-2xl backdrop-blur-sm transition-all duration-300 min-w-[180px]"
                    >
                      <UserCircleIcon className="w-6 h-6 mr-3" />
                      Logout
                    </Button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={() => navigate('/auth')}
                      className="px-10 py-4 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 rounded-2xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 min-w-[220px]"
                    >
                      <SparklesIcon className="w-6 h-6 mr-3" />
                      Get Started Free
                      <ArrowRightIcon className="w-5 h-5 ml-3" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/auth')}
                      className="px-8 py-4 text-lg border-white/20 text-white hover:bg-white/10 hover:border-white/40 rounded-2xl backdrop-blur-sm transition-all duration-300 min-w-[180px]"
                    >
                      Sign In
                      <ArrowRightIcon className="w-5 h-5 ml-3" />
                    </Button>
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 px-6 relative bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="container mx-auto">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-8 h-8 text-purple-400" />
                  </motion.div>
                  <motion.div 
                    className="text-4xl lg:text-5xl font-bold gradient-text-animated mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-gray-400 font-medium text-lg">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-purple-900/10 to-transparent">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Powered by <span className="gradient-text-animated">AI Innovation</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our advanced AI algorithms analyze millions of data points to bring you the most relevant opportunities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative bg-gradient-to-br from-slate-900/40 via-purple-900/20 to-blue-900/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500 h-full">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                    
                    <motion.div
                      className="relative z-10"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <IconComponent className="w-8 h-8 text-purple-400" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-transparent via-blue-900/10 to-transparent">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Scale your tender discovery with our flexible pricing options
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$49",
                period: "/month",
                description: "Perfect for small businesses starting their tender journey",
                features: [
                  "Up to 100 tender searches/month",
                  "Basic AI filtering",
                  "Email notifications",
                  "Standard support",
                  "Access to public tenders"
                ],
                popular: false,
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                name: "Professional",
                price: "$149",
                period: "/month",
                description: "Ideal for growing companies seeking competitive advantage",
                features: [
                  "Unlimited tender searches",
                  "Advanced AI analytics",
                  "Real-time alerts",
                  "Priority support",
                  "Private tender access",
                  "Market intelligence reports",
                  "Custom filters"
                ],
                popular: true,
                gradient: "from-purple-500 to-pink-500"
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "Tailored solutions for large organizations",
                features: [
                  "Everything in Professional",
                  "Dedicated account manager",
                  "Custom integrations",
                  "White-label options",
                  "Advanced security",
                  "SLA guarantees",
                  "Training & onboarding"
                ],
                popular: false,
                gradient: "from-green-500 to-yellow-500"
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative group ${plan.popular ? 'md:-mt-4' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`relative bg-gradient-to-br from-slate-900/40 via-purple-900/20 to-blue-900/40 backdrop-blur-2xl rounded-3xl border ${plan.popular ? 'border-purple-500/50' : 'border-white/10'} p-8 shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500 h-full`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                    <p className="text-gray-400 mb-6">{plan.description}</p>
                    
                    <div className="mb-8">
                      <span className={`text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                        {plan.price}
                      </span>
                      <span className="text-gray-400 text-lg">{plan.period}</span>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        className={`w-full py-3 text-lg font-semibold ${plan.popular 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white' 
                          : 'border border-white/20 text-white hover:bg-white/10 bg-transparent'
                        } rounded-2xl transition-all duration-300`}
                        onClick={() => navigate('/auth')}
                      >
                        {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-1">
              <motion.div 
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">TenderAI</span>
              </motion.div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Revolutionizing tender discovery with AI-powered intelligence for businesses worldwide.
              </p>
              <div className="flex gap-4">
                {['twitter', 'linkedin', 'github'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="capitalize">{social[0]}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'API', 'Documentation', 'Integrations'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Press', 'Partners'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-3">
                {['Help Center', 'Contact', 'Privacy', 'Terms', 'Security'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <motion.div 
            className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400">
              © 2025 TenderAI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;