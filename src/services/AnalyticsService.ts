import { config } from '@/lib/config';

/**
 * AnalyticsService - PostHog tracking
 */
export const AnalyticsService = {
    initialize: () => {
        if (typeof window === 'undefined') return;
        
        const posthogKey = config.posthogKey;
        if (!posthogKey) {
            console.warn('[Analytics] PostHog não configurado');
            return;
        }

        // Inicializar PostHog se disponível
        if ((window as any).posthog) {
            (window as any).posthog.init(posthogKey, {
                host: config.posthogHost,
                loaded: () => console.log('[Analytics] PostHog carregado'),
            });
        }
    },

    trackPageView: (pageName: string) => {
        if ((window as any).posthog) {
            (window as any).posthog.capture('$pageview', { page: pageName });
        }
    },

    trackEvent: (eventName: string, properties?: Record<string, unknown>) => {
        if ((window as any).posthog) {
            (window as any).posthog.capture(eventName, properties);
        }
    },
};
