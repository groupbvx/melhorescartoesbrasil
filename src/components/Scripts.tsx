import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AdService } from '@/services/AdService';
import { AnalyticsService } from '@/services/AnalyticsService';

export function Scripts() {
  const location = useLocation();

  useEffect(() => {
    AnalyticsService.initialize();
    AdService.initialize();
  }, []);

  useEffect(() => {
    AnalyticsService.trackPageView(location.pathname);
  }, [location]);

  return null;
}
