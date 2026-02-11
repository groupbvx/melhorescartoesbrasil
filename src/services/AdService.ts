import { config } from '@/lib/config';

/**
 * AdService - Gerenciamento de anúncios Revive
 */
export const AdService = {
    initialize: () => {
        if (typeof window === 'undefined') return;

        const reviveUrl = config.reviveUrl || import.meta.env.VITE_REVIVE_URL;
        if (!reviveUrl) {
            console.warn('[AdService] Revive URL não configurado');
            return;
        }

        const baseUrl = reviveUrl.replace(/^https?:\/\//, '').replace(/^\/\//, '');
        const scriptUrl = `//${baseUrl}/delivery/asyncjs.php`;

        if (document.querySelector(`script[src="${scriptUrl}"]`)) {
            console.log('[AdService] Script do Revive já carregado');
            return;
        }

        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        document.head.appendChild(script);
        console.log('[AdService] Script do Revive carregado:', scriptUrl);
    },
};
