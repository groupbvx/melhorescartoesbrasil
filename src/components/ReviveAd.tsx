import { useEffect, useState } from 'react';
import { config } from '@/lib/config';

interface ReviveAdProps {
    zoneId?: string;
    width?: number;
    height?: number;
    className?: string;
    placeholder?: string;
    testMode?: boolean;
}

export function ReviveAd({
    zoneId = 'ad',
    width = 300,
    height = 250,
    className = '',
    placeholder = 'Anúncio',
    testMode = true
}: ReviveAdProps) {
    const [reviveUrl, setReviveUrl] = useState<string | null>(null);

    useEffect(() => {
        const url = config.reviveUrl || import.meta.env.VITE_REVIVE_URL;
        setReviveUrl(url);

        const initializeRevive = () => {
            if (typeof window === 'undefined') return;
            
            const baseUrl = url?.replace(/^https?:\/\//, '').replace(/^\/\//, '');
            const scriptUrl = `//${baseUrl}/delivery/asyncjs.php`;
            
            if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
                const script = document.createElement('script');
                script.src = scriptUrl;
                script.async = true;
                document.head.appendChild(script);
            }
        };

        initializeRevive();
    }, []);

    // Test mode - show placeholder
    if (testMode || !reviveUrl) {
        return (
            <div 
                id={`ad-zone-${zoneId}`}
                className={`ad-spot bg-gray-50 rounded-lg overflow-hidden flex flex-col items-center justify-center border border-gray-200 ${className}`}
                style={{ width: width > 0 ? `${width}px` : '100%', minHeight: height > 0 ? `${height}px` : '100px' }}
            >
                <div className="text-center p-4">
                    <span className="text-gray-400 text-xs font-medium mb-2 block">
                        {placeholder}
                    </span>
                    <div 
                        className="bg-gray-200 rounded flex items-center justify-center"
                        style={{ width: Math.min(width - 20, 200), height: Math.min(height - 30, 50) }}
                    >
                        <span className="text-gray-500 text-xs">{zoneId}</span>
                    </div>
                </div>
                <div 
                    className="revive-ad-container"
                    data-zone={zoneId}
                    style={{ display: 'none' }}
                />
            </div>
        );
    }

    // Production mode
    return (
        <div className={`ad-wrapper ${className}`} style={{ width: width > 0 ? `${width}px` : '100%' }}>
            <div 
                id={`ad-zone-${zoneId}`}
                className="revive-ad-container"
                data-zone={zoneId}
                style={{ width: '100%', minHeight: height > 0 ? `${height}px` : '100px' }}
            />
        </div>
    );
}

// Banner Ad (Leaderboard) - 728x90
export function ReviveBanner({ zoneId }: { zoneId?: string }) {
    return (
        <div className="w-full">
            <ReviveAd
                zoneId={zoneId || config.reviveZoneHeader}
                width={728}
                height={90}
                className="mx-auto"
                placeholder="PUBLICIDADE"
            />
        </div>
    );
}

// Sidebar Ad (Retângulo) - 300x250
export function ReviveSidebar({ zoneId }: { zoneId?: string }) {
    return (
        <div className="my-6">
            <ReviveAd
                zoneId={zoneId || config.reviveZoneSidebar}
                width={300}
                height={250}
                className="mx-auto"
                placeholder="ANÚNCIO"
            />
        </div>
    );
}

// In-Article Ad - 650x100
export function ReviveInArticle({ zoneId, position = 1 }: { zoneId?: string; position?: number }) {
    return (
        <div className="my-6 py-4 border-t border-b border-gray-100">
            <ReviveAd
                zoneId={zoneId || `${config.reviveZoneInArticle1}-${position}`}
                width={650}
                height={100}
                className="mx-auto"
                placeholder="Anúncio"
            />
        </div>
    );
}

// Sticky Footer Ad
export function ReviveStickyFooter({ zoneId }: { zoneId?: string }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
            
            if (scrollPosition > pageHeight - 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div 
            className={`fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-100 z-50 transform transition-transform duration-300 ${
                isVisible ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
            <div className="max-w-md mx-auto p-3 relative">
                <button 
                    className="absolute -top-3 -right-3 w-7 h-7 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-lg hover:bg-gray-300 transition-colors"
                    onClick={() => setIsVisible(false)}
                >
                    ×
                </button>
                <ReviveAd
                    zoneId={zoneId || config.reviveZoneStickyFooter}
                    width={320}
                    height={50}
                    placeholder=""
                    className="bg-gray-50 rounded-lg"
                />
            </div>
        </div>
    );
}

// Native Ad Card
export function NativeAdCard({ zoneId }: { zoneId?: string }) {
    return (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-gray-400">Anúncio</span>
            </div>
            <ReviveAd
                zoneId={zoneId || 'native'}
                width={500}
                height={150}
                placeholder=""
                className="bg-white rounded"
            />
        </div>
    );
}
