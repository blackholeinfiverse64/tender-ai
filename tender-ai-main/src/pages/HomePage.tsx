import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import ParticleBackground from '@/components/ParticleBackground';
import { 
  MagnifyingGlassIcon, 
  ChartBarIcon, 
  BellIcon, 
  RocketLaunchIcon,
  SparklesIcon,
  UserCircleIcon,
  LightBulbIcon,
  GlobeAltIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: "Smart Search",
      description: "AI-powered search across thousands of tenders with intelligent filtering and matching.",
      color: "primary"
    },
    {
      icon: ChartBarIcon,
      title: "Analytics Dashboard", 
      description: "Real-time insights, market trends, and competitive analysis to maximize your success rate.",
      color: "secondary"
    },
    {
      icon: BellIcon,
      title: "Smart Alerts",
      description: "Get notified instantly when new tenders match your criteria and expertise.",
      color: "accent"
    },
    {
      icon: RocketLaunchIcon,
      title: "AI Acceleration",
      description: "Leverage machine learning to predict winning strategies and optimize your proposals.",
      color: "primary"
    }
  ];

  const stats = [
    { label: "Active Tenders", value: "50K+", icon: GlobeAltIcon },
    { label: "Success Rate", value: "94%", icon: ChartBarIcon },
    { label: "AI Insights", value: "1M+", icon: LightBulbIcon },
    { label: "Happy Users", value: "25K+", icon: UserCircleIcon }
  ];

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Hero Section */}
        <section className="relative py-32 px-6 z-10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-8 gradient-text">
              TenderAI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover, analyze, and win government tenders with the power of artificial intelligence.
              Your competitive advantage in the digital age.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {user ? (
              <div className="flex gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/search')}
                  className="bg-primary text-primary-foreground hover:bg-primary/80 glow-primary px-8 py-4 text-lg"
                >
                  <MagnifyingGlassIcon className="w-6 h-6 mr-2" />
                  Search Tenders
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={signOut}
                  className="border-border text-foreground hover:bg-muted px-8 py-4 text-lg"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/auth')}
                  className="bg-primary text-primary-foreground hover:bg-primary/80 glow-primary px-8 py-4 text-lg"
                >
                  <RocketLaunchIcon className="w-6 h-6 mr-2" />
                  Get Started
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/search')}
                  className="border-border text-foreground hover:bg-muted hover-glow px-8 py-4 text-lg"
                >
                  <MagnifyingGlassIcon className="w-6 h-6 mr-2" />
                  Explore Demo
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass hover-glow bg-card text-center p-6 rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Powered by AI
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of tender discovery with our advanced artificial intelligence platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass hover-glow bg-card p-8 rounded-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-12 h-12 bg-${feature.color} rounded-lg flex items-center justify-center mb-6 glow-${feature.color}`}>
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
          <motion.div
            className="glass bg-card rounded-lg p-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SparklesIcon className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using TenderAI to discover and win more contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-primary text-primary-foreground hover:bg-primary/80 glow-primary px-8 py-4 text-lg"
              >
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/search')}
                className="border-border text-foreground hover:bg-muted hover-glow px-8 py-4 text-lg"
              >
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </Layout>
  );
};

export default HomePage;