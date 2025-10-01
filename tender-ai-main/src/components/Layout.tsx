import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MagnifyingGlassIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-sm sm:text-lg font-bold">T</span>
              </div>
              <span className="text-lg sm:text-xl font-bold gradient-text">TenderAI</span>
            </motion.div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {!isHomePage && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/')}
                  className="text-xs sm:text-sm"
                >
                  Home
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/search')}
                className="hidden sm:flex text-xs sm:text-sm"
              >
                <MagnifyingGlassIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden md:inline">Search Tenders</span>
                <span className="md:hidden">Search</span>
              </Button>
              
              {/* Mobile Search Button */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/search')}
                className="sm:hidden p-2"
              >
                <MagnifyingGlassIcon className="w-4 h-4" />
              </Button>

              {user ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={signOut}
                  className="text-xs sm:text-sm border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
                >
                  <ArrowRightOnRectangleIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              ) : (
                <Button 
                  variant="hero" 
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="text-xs sm:text-sm"
                >
                  <UserCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Get Started</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-16 sm:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-glass-border mt-12 sm:mt-20">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-hero rounded"></div>
                <span className="font-bold gradient-text">TenderAI</span>
              </div>
              <p className="text-muted-foreground text-sm">
                AI-powered tender aggregation and analysis platform for modern businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm sm:text-base">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Search</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Alerts</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm sm:text-base">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm sm:text-base">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-glass-border mt-6 sm:mt-8 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-muted-foreground">
            <p>&copy; 2024 TenderAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;