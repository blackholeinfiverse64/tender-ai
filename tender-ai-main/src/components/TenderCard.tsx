import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPinIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { format, isAfter, addDays } from 'date-fns';

export interface Tender {
  tender_id: string;
  organization: string;
  category: string;
  location: string;
  value: number;
  deadline: string;
  description: string;
  link: string;
}

interface TenderCardProps {
  tender: Tender;
  onViewDetails: (id: string) => void;
  index?: number;
  showDetails?: boolean;
}

const TenderCard = ({ tender, onViewDetails, index = 0, showDetails = false }: TenderCardProps) => {
  const deadlineDate = new Date(tender.deadline);
  const isUrgent = isAfter(new Date(), addDays(deadlineDate, -7)); // Urgent if deadline is within 7 days
  
  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <motion.div
      className={`glass rounded-xl p-6 border transition-all duration-300 hover:shadow-float hover:scale-[1.02] cursor-pointer ${
        isUrgent ? 'border-urgent shadow-glow' : 'border-glass-border'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded-full">
              {tender.category}
            </span>
            {isUrgent && (
              <span className="text-xs font-medium bg-urgent/20 text-urgent px-2 py-1 rounded-full animate-pulse">
                Urgent
              </span>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {tender.organization}
          </h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold gradient-text">
            {formatValue(tender.value)}
          </div>
          <div className="text-xs text-muted-foreground">Est. Value</div>
        </div>
      </div>

      <p className={`text-muted-foreground text-sm mb-4 ${showDetails ? '' : 'line-clamp-3'}`}>
        {showDetails ? tender.description : (
          tender.description.length > 120 
            ? `${tender.description.substring(0, 120)}...` 
            : tender.description
        )}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPinIcon className="w-4 h-4 mr-2" />
          {tender.location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="w-4 h-4 mr-2" />
          Deadline: {format(deadlineDate, 'MMM dd, yyyy')}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <BuildingOffice2Icon className="w-4 h-4 mr-2" />
          ID: {tender.tender_id}
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          variant={isUrgent ? "urgent" : "default"} 
          size="sm" 
          className="flex-1"
          onClick={() => onViewDetails(tender.tender_id)}
        >
          View Details
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open(tender.link, '_blank')}
        >
          External Link
        </Button>
      </div>
    </motion.div>
  );
};

export default TenderCard;