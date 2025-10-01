import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ParticleBackground from '@/components/ParticleBackground';
import SearchFilters, { FilterState } from '@/components/SearchFilters';
import TenderCard, { Tender } from '@/components/TenderCard';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const SearchPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    organization: '',
    category: '',
    location: '',
    minValue: '',
    maxValue: '',
    deadline: '',
  });
  
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const tendersPerPage = 12;

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Mock data for demonstration (replace with actual API calls)
  const mockTenders: Tender[] = [
    {
      tender_id: "GOV001",
      organization: "Department of Transportation",
      category: "Infrastructure",
      location: "California, USA",
      value: 2500000,
      deadline: "2024-12-15",
      description: "Smart traffic management system implementation for major highways in California. Includes AI-powered traffic flow optimization, real-time monitoring systems, and integration with existing infrastructure.",
      link: "https://example.com/tender/1"
    },
    {
      tender_id: "MED002",
      organization: "Ministry of Health",
      category: "Healthcare",
      location: "Ontario, Canada",
      value: 1800000,
      deadline: "2024-10-25",
      description: "Digital health records modernization project. Requires expertise in cloud computing, data security, healthcare compliance standards, and patient data management systems.",
      link: "https://example.com/tender/2"
    },
    {
      tender_id: "ENR003",
      organization: "City of Austin",
      category: "Energy",
      location: "Texas, USA",
      value: 4200000,
      deadline: "2024-10-20",
      description: "Solar energy infrastructure development for municipal buildings. Focus on sustainable energy solutions, smart grid integration, and renewable energy management systems.",
      link: "https://example.com/tender/3"
    },
    {
      tender_id: "IT004",
      organization: "Federal IT Services",
      category: "IT Services",
      location: "Washington, DC",
      value: 3100000,
      deadline: "2024-11-08",
      description: "Cybersecurity enhancement program for government agencies. Implementation of advanced threat detection, incident response systems, and security training programs.",
      link: "https://example.com/tender/4"
    },
    {
      tender_id: "EDU005",
      organization: "University of California",
      category: "Education",
      location: "California, USA",
      value: 890000,
      deadline: "2024-12-01",
      description: "Campus-wide digital learning platform development. Integration of virtual reality, AI tutoring systems, and comprehensive learning management solutions.",
      link: "https://example.com/tender/5"
    },
    {
      tender_id: "DEF006",
      organization: "Department of Defense",
      category: "Defense",
      location: "Virginia, USA",
      value: 8500000,
      deadline: "2024-11-15",
      description: "Advanced military communication systems upgrade. Secure satellite communications, encrypted data transmission, and battlefield management systems.",
      link: "https://example.com/tender/6"
    },
    {
      tender_id: "ENV007",
      organization: "Environmental Protection Agency",
      category: "Environmental",
      location: "Colorado, USA",
      value: 1200000,
      deadline: "2024-10-30",
      description: "Water quality monitoring and management system. Real-time environmental sensors, data analytics platform, and automated reporting systems.",
      link: "https://example.com/tender/7"
    },
    {
      tender_id: "TRS008",
      organization: "Metro Transit Authority",
      category: "Transportation",
      location: "New York, USA",
      value: 6700000,
      deadline: "2024-11-20",
      description: "Smart public transportation management system. Real-time tracking, predictive maintenance, passenger information systems, and route optimization.",
      link: "https://example.com/tender/8"
    }
  ];

  const searchTenders = async () => {
    setLoading(true);
    try {
      let query = supabase.from('tenders').select('*');

      // Apply filters
      if (filters.keyword) {
        query = query.or(`description.ilike.%${filters.keyword}%,organization.ilike.%${filters.keyword}%`);
      }
      if (filters.organization) {
        query = query.ilike('organization', `%${filters.organization}%`);
      }
      if (filters.category) {
        query = query.ilike('category', `%${filters.category}%`);
      }
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      if (filters.minValue) {
        query = query.gte('value', parseInt(filters.minValue));
      }
      if (filters.maxValue) {
        query = query.lte('value', parseInt(filters.maxValue));
      }
      if (filters.deadline) {
        query = query.lte('deadline', filters.deadline);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching tenders:', error);
        setTenders([]);
      } else {
        setTenders(data || []);
        setTotalPages(Math.ceil((data?.length || 0) / tendersPerPage));
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setTenders([]);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPageTenders = () => {
    const startIndex = (currentPage - 1) * tendersPerPage;
    const endIndex = startIndex + tendersPerPage;
    return tenders.slice(startIndex, endIndex);
  };

  useEffect(() => {
    // Initial load with all tenders
    searchTenders();
  }, []);

  return (
    <Layout>
      {/* Particle Background */}
      <ParticleBackground />
      
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2 sm:mb-4">
            Search Tenders
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Find the perfect tenders for your business with our AI-powered search
          </p>
        </motion.div>

        {/* Search Filters */}
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={searchTenders}
          isLoading={loading}
        />

        {/* Results Section */}
        <motion.div
          className="mt-6 sm:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground text-sm sm:text-base">Searching tenders...</p>
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    {tenders.length} {tenders.length === 1 ? 'Tender' : 'Tenders'} Found
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
              </div>

              {/* Results Grid */}
              {tenders.length > 0 ? (
                <>
                   <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                     {getCurrentPageTenders().map((tender, index) => (
                       <TenderCard
                         key={tender.tender_id}
                         tender={tender}
                         onViewDetails={(id) => navigate(`/tender/${id}`)}
                         index={index}
                         showDetails={true}
                       />
                     ))}
                   </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
                      <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <ChevronLeftIcon className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      
                      <div className="flex gap-1 sm:gap-2 overflow-x-auto">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={page === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm flex-shrink-0"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        Next
                        <ChevronRightIcon className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 sm:py-16">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl sm:text-3xl">🔍</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">No tenders found</h3>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button variant="outline" onClick={() => setFilters({
                    keyword: '',
                    organization: '',
                    category: '',
                    location: '',
                    minValue: '',
                    maxValue: '',
                    deadline: '',
                  })} size="sm">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default SearchPage;