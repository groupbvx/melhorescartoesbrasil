import { AdService } from '../services/AdService';

export function AdSpot({ zoneId }: { zoneId: string }) {
  useEffect(() => {
    AdService.initialize();
  }, []);

  return (
    <div 
      id={`ad-zone-${zoneId}`}
      className="ad-spot min-h-[100px] flex items-center justify-center bg-gray-50 rounded-lg"
    >
      <span className="text-gray-400 text-sm">Anúncio {zoneId}</span>
    </div>
  );
}

import { useEffect } from 'react';
