import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  CalendarIcon, 
  MapPinIcon, 
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { format, isAfter, addDays } from 'date-fns';
import { Tender } from '@/components/TenderCard';

const TenderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockTenderDetails: Record<string, Tender> = {
    "GOV001": {
      tender_id: "GOV001",
      organization: "Department of Transportation",
      category: "Infrastructure",
      location: "California, USA",
      value: 2500000,
      deadline: "2024-12-15",
      description: "Smart traffic management system implementation for major highways in California. This comprehensive project involves the deployment of AI-powered traffic flow optimization systems, real-time monitoring infrastructure, and integration with existing traffic management systems. The solution must include advanced sensors, machine learning algorithms for traffic prediction, automated incident detection, and a centralized control system. The project will cover Interstate 5, Interstate 405, and Highway 101 corridors, affecting over 2 million daily commuters. Requirements include 24/7 system availability, sub-second response times, and seamless integration with emergency services. The successful vendor will be responsible for system design, hardware procurement, software development, installation, testing, and 5-year maintenance support.",
      link: "https://example.com/tender/1"
    },
    "T001": {
      tender_id: "T001",
      organization: "Department of Transportation",
      category: "Infrastructure",
      location: "California, USA",
      value: 2500000,
      deadline: "2024-12-15",
      description: "Smart traffic management system implementation for major highways in California. Includes AI-powered traffic flow optimization and real-time monitoring systems.",
      link: "https://example.com/tender/1"
    },
    "T002": {
      tender_id: "T002",
      organization: "Ministry of Health",
      category: "Healthcare",
      location: "Ontario, Canada",
      value: 1800000,
      deadline: "2024-11-30",
      description: "Digital health records modernization project. Requires expertise in cloud computing, data security, and healthcare compliance standards.",
      link: "https://example.com/tender/2"
    },
    "T003": {
      tender_id: "T003",
      organization: "City of Austin",
      category: "Energy",
      location: "Texas, USA",
      value: 4200000,
      deadline: "2024-10-20",
      description: "Solar energy infrastructure development for municipal buildings. Focus on sustainable energy solutions and smart grid integration.",
      link: "https://example.com/tender/3"
    }
  };

  useEffect(() => {
    const fetchTenderDetails = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (id && mockTenderDetails[id]) {
          setTender(mockTenderDetails[id]);
        } else {
          // Tender not found
          setTender(null);
        }
      } catch (error) {
        console.error('Failed to fetch tender details:', error);
        setTender(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTenderDetails();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground">Loading tender details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!tender) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentTextIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Tender Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The tender you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/search')}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const deadlineDate = new Date(tender.deadline);
  const isUrgent = isAfter(new Date(), addDays(deadlineDate, -7));
  const daysRemaining = Math.ceil((deadlineDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const formatValue = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const additionalDetails = [
    {
      title: "Submission Requirements",
      content: "All proposals must include technical specifications, implementation timeline, cost breakdown, team qualifications, and reference projects. Submissions must be made through the official procurement portal."
    },
    {
      title: "Evaluation Criteria",
      content: "Proposals will be evaluated based on technical merit (40%), cost effectiveness (30%), experience and qualifications (20%), and innovation (10%). Minimum experience of 5 years in similar projects required."
    },
    {
      title: "Contract Duration",
      content: "Initial contract term of 3 years with option for 2-year extension. Performance reviews will be conducted annually with key performance indicators clearly defined."
    },
    {
      title: "Key Milestones",
      content: "Project planning and design (90 days), procurement and installation (180 days), testing and commissioning (60 days), training and documentation (30 days), go-live and support (ongoing)."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate('/search')}
            className="hover:bg-card-hover"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="glass rounded-xl p-8 border border-glass-border mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium bg-primary/20 text-primary px-3 py-1 rounded-full">
                      {tender.category}
                    </span>
                    {isUrgent && (
                      <span className="text-sm font-medium bg-urgent/20 text-urgent px-3 py-1 rounded-full animate-pulse">
                        Urgent - {daysRemaining} days left
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                    {tender.organization}
                  </h1>
                  <p className="text-muted-foreground">
                    Tender ID: {tender.tender_id}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <CurrencyDollarIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text">
                      {formatValue(tender.value)}
                    </div>
                    <div className="text-xs text-muted-foreground">Estimated Value</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold">{format(deadlineDate, 'MMM dd, yyyy')}</div>
                    <div className="text-xs text-muted-foreground">Deadline</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <MapPinIcon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">{tender.location}</div>
                    <div className="text-xs text-muted-foreground">Location</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted/20 rounded-lg flex items-center justify-center">
                    <ClockIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">{daysRemaining} days</div>
                    <div className="text-xs text-muted-foreground">Remaining</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="glass rounded-xl p-8 border border-glass-border mb-6">
              <h2 className="text-2xl font-semibold mb-4">Project Description</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {tender.description}
              </p>
            </div>

            {/* Additional Details */}
            <div className="space-y-6">
              {additionalDetails.map((detail, index) => (
                <motion.div
                  key={detail.title}
                  className="glass rounded-xl p-6 border border-glass-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <h3 className="text-xl font-semibold mb-3">{detail.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {detail.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Quick Actions */}
            <div className="glass rounded-xl p-6 border border-glass-border">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  variant={isUrgent ? "urgent" : "hero"}
                  onClick={() => window.open(tender.link, '_blank')}
                >
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
                  View Original Tender
                </Button>
                <Button variant="outline" className="w-full">
                  <DocumentTextIcon className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="ghost" className="w-full">
                  Save to Favorites
                </Button>
              </div>
            </div>

            {/* Organization Info */}
            <div className="glass rounded-xl p-6 border border-glass-border">
              <h3 className="text-xl font-semibold mb-4">Organization Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <BuildingOffice2Icon className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">{tender.organization}</div>
                    <div className="text-sm text-muted-foreground">Government Entity</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">{tender.location}</div>
                    <div className="text-sm text-muted-foreground">Primary Location</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="glass rounded-xl p-6 border border-glass-border">
              <h3 className="text-xl font-semibold mb-4">Key Dates</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Publication</span>
                  <span className="font-medium">Oct 15, 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Q&A Deadline</span>
                  <span className="font-medium">Nov 30, 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Submission</span>
                  <span className={`font-medium ${isUrgent ? 'text-urgent' : 'text-primary'}`}>
                    {format(deadlineDate, 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Award Expected</span>
                  <span className="font-medium">Jan 15, 2025</span>
                </div>
              </div>
            </div>

            {/* Related Tenders */}
            <div className="glass rounded-xl p-6 border border-glass-border">
              <h3 className="text-xl font-semibold mb-4">Related Opportunities</h3>
              <div className="space-y-3">
                <div className="p-3 bg-card/50 rounded-lg cursor-pointer hover:bg-card-hover transition-colors">
                  <div className="font-medium text-sm">Infrastructure Project #2</div>
                  <div className="text-xs text-muted-foreground">$1.8M • Dec 2024</div>
                </div>
                <div className="p-3 bg-card/50 rounded-lg cursor-pointer hover:bg-card-hover transition-colors">
                  <div className="font-medium text-sm">Smart City Initiative</div>
                  <div className="text-xs text-muted-foreground">$3.2M • Jan 2025</div>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  View All Related
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default TenderDetailPage;