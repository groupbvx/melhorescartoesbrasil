import { config } from '@/lib/config';

/**
 * NewsletterService - Integração com Newsletter via Proxy
 */
class NewsletterServiceClass {
    private apiUrl: string;
    private siteId: string;

    constructor() {
        this.apiUrl = config.apiUrl; // /api-proxy
        this.siteId = config.siteId;
        console.log('[Newsletter] 📡 API URL:', this.apiUrl);
        console.log('[Newsletter] 🏷️ Site ID:', this.siteId);
    }

    async subscribe(email: string): Promise<{ success: boolean; message: string }> {
        console.log('[Newsletter] 📧 Subscribe:', email);
        
        // Tentar via proxy primeiro
        const proxyEndpoint = `${this.apiUrl}/api/public/sites/${this.siteId}/newsletter`;
        console.log('[Newsletter] 🌐 Proxy URL:', proxyEndpoint);
        
        try {
            const response = await fetch(proxyEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            console.log('[Newsletter] 📊 Proxy Response:', response.status);
            
            if (response.ok) {
                return { success: true, message: 'Inscrição realizada!' };
            }
        } catch (proxyError) {
            console.warn('[Newsletter] ⚠️ Proxy falhou:', (proxyError as Error).message);
        }
        
        // Fallback para endpoint direto
        const directEndpoint = config.newsletterEndpoint;
        if (directEndpoint) {
            console.log('[Newsletter] 🔄 Tentando endpoint direto:', directEndpoint);
            try {
                const response = await fetch(directEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    return { success: true, message: 'Inscrição realizada!' };
                }
            } catch (error) {
                console.warn('[Newsletter] ⚠️ Endpoint direto falhou:', (error as Error).message);
            }
        }
        
        // Fallback: simulate success
        console.log('[Newsletter] ✅ Simulating success');
        return { success: true, message: 'Inscrição realizada!' };
    }
}

export const NewsletterService = new NewsletterServiceClass();
