/**
 * Configuração centralizada do site
 * Todas as variáveis de ambiente em um único lugar
 */
export const config = {
    // Site
    siteId: import.meta.env.VITE_SITE_ID || '3d6c918d-5c39-47e9-8109-be79b2e8c302',
    siteName: import.meta.env.VITE_SITE_NAME || 'Melhores Cartões Brasil',
    siteUrl: import.meta.env.VITE_SITE_URL || 'https://melhorescartoesbrasil.com',
    
    // API
    apiUrl: import.meta.env.VITE_API_URL || '/api-proxy',
    contentApiUrl: import.meta.env.VITE_CONTENT_API_BASE_URL || 'https://digitalreach.app',

    // Analytics (PostHog)
    posthogKey: import.meta.env.VITE_POSTHOG_KEY || 'phc_tmnwesKVzb8WFwDlML8X6dzWatvIYq3VDA7SFLL6Xle',
    posthogHost: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',

    // Ads (Revive)
    reviveUrl: import.meta.env.VITE_REVIVE_URL || 'ads.digitalreach.app',
    reviveId: import.meta.env.VITE_REVIVE_ID || 'de1a7c3bde108ab03e267c6d9e64583d',
    reviveZoneHeader: import.meta.env.VITE_REVIVE_ZONE_HEADER || '632',
    reviveZoneSidebar: import.meta.env.VITE_REVIVE_ZONE_SIDEBAR || '633',
    reviveZoneInArticle1: import.meta.env.VITE_REVIVE_ZONE_INARTICLE_1 || '634',
    reviveZoneInArticle2: import.meta.env.VITE_REVIVE_ZONE_INARTICLE_2 || '635',
    reviveZoneStickyFooter: import.meta.env.VITE_REVIVE_ZONE_STICKY_FOOTER || '636',

    // Newsletter
    newsletterEndpoint: import.meta.env.VITE_NEWSLETTER_ENDPOINT || '',

    // Locale
    locale: import.meta.env.VITE_LOCALE || 'pt-BR',
} as const;

export type Config = typeof config;

/**
 * Valida se as variáveis críticas estão configuradas
 */
export function validateConfig(): { valid: boolean; missing: string[] } {
    const missing: string[] = [];
    if (!config.siteId) missing.push('VITE_SITE_ID');
    if (!config.apiUrl) missing.push('VITE_API_URL');
    return { valid: missing.length === 0, missing };
}
