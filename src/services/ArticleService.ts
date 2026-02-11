import { config } from '@/lib/config';

// Article interface
export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    mainImage?: string;
    image?: string;
    author?: string;
    publishedAt: string;
    readingTime?: string;
    tags?: string[];
    category?: string;
}

// Mock articles
const MOCK_ARTICLES: Article[] = [
    {
        id: '1',
        slug: 'nubank-ultravioleta',
        title: 'Nubank Ultravioleta: Vale a Pena?',
        excerpt: 'Análise completa do cartão premium do Nubank',
        content: 'Conteúdo completo do artigo...',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
        publishedAt: '10 Fev 2026',
        readingTime: '5 min',
        category: 'Reviews',
        tags: ['nubank', 'cartão premium'],
    },
    {
        id: '2',
        slug: 'melhores-cartoes-sem-anuidade',
        title: 'Top 10 Cartões sem Anuidade 2026',
        excerpt: 'Os melhores cartões que não cobram anuidade',
        content: 'Conteúdo completo do artigo...',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
        publishedAt: '8 Fev 2026',
        readingTime: '8 min',
        category: 'Comparativos',
        tags: ['sem anuidade', 'rankings'],
    },
    {
        id: '3',
        slug: 'como-escolher-cartao',
        title: 'Como Escolher o Cartão Ideal',
        excerpt: 'Guia completo para escolher seu cartão de crédito',
        content: 'Conteúdo completo do artigo...',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
        publishedAt: '5 Fev 2026',
        readingTime: '6 min',
        category: 'Guias',
        tags: ['guia', 'dicas'],
    },
];

/**
 * ArticleService - Busca artigos com fallback para mock
 */
class ArticleServiceClass {
    private static instance: ArticleServiceClass;
    private cache: Map<string, { data: unknown; timestamp: number }> = new Map();
    private cacheTTL = 5 * 60 * 1000;

    private constructor() {
        console.log('[ArticleService] 🔧 Inicializado');
        console.log('[ArticleService] 📡 API URL:', config.apiUrl);
        console.log('[ArticleService] 🏷️ Site ID:', config.siteId);
    }

    public static getInstance(): ArticleServiceClass {
        if (!ArticleServiceClass.instance) {
            ArticleServiceClass.instance = new ArticleServiceClass();
        }
        return ArticleServiceClass.instance;
    }

    async getArticles(params: { limit?: number; offset?: number } = {}): Promise<Article[]> {
        const { limit = 10, offset = 0 } = params;

        console.log('[ArticleService] 📥 getArticles() chamado - tentando API...');
        
        try {
            const articles = await this.fetchFromAPI(params);
            if (articles.length > 0) {
                console.log('[ArticleService] ✅ Artigos carregados da API:', articles.length);
                return articles;
            }
            console.log('[ArticleService] ⚠️ API retornou vazio, usando fallback');
        } catch (error) {
            console.warn('[ArticleService] ❌ API falhou:', (error as Error).message);
        }

        console.log('[ArticleService] 📋 Usando dados mockados');
        return MOCK_ARTICLES.slice(offset, offset + limit);
    }

    private async fetchFromAPI(params: { limit?: number; offset?: number }): Promise<Article[]> {
        const { limit = 10, offset = 0 } = params;

        const queryParams = new URLSearchParams({
            limit: String(limit),
            offset: String(offset),
            locale: config.locale,
        });

        const apiUrl = `${config.apiUrl}/api/headless/sites-by-id/${config.siteId}?${queryParams}`;
        console.log('[ArticleService] 🌐 Fetch URL:', apiUrl);

        try {
            const response = await fetch(apiUrl);
            console.log('[ArticleService] 📊 Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            console.log('[ArticleService] 📄 Content-Type:', contentType);

            const data = await response.json();
            console.log('[ArticleService] 📦 Data received:', JSON.stringify(data).substring(0, 200));
            
            return this.mapSnapshotsToArticles(data.articles || []);
        } catch (error) {
            console.error('[ArticleService] 🚨 Fetch error:', error);
            throw error;
        }
    }

    private mapSnapshotsToArticles(snapshots: any[]): Article[] {
        console.log('[ArticleService] 🔄 Mapeando', snapshots.length, 'artigos');
        
        return snapshots.map((snapshot: any, index: number) => {
            const localeData = snapshot.locales?.find(
                (l: any) => l.locale.toLowerCase() === config.locale.toLowerCase()
            ) || snapshot.locales?.[0] || {};

            console.log(`[ArticleService] 📄 Artigo ${index + 1}:`, snapshot.slug);

            return {
                id: snapshot.id,
                slug: snapshot.slug,
                title: localeData.title || snapshot.slug,
                excerpt: localeData.summary || '',
                content: localeData.body || '',
                mainImage: localeData.mainImage || null,
                publishedAt: snapshot.publishedAt || new Date().toISOString(),
                readingTime: this.calculateReadingTime(localeData.body || ''),
                category: snapshot.category || null,
                tags: snapshot.tags || [],
            };
        });
    }

    private calculateReadingTime(content: string): string {
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / 200) || 1;
        return `${minutes} min`;
    }

    async getArticleBySlug(slug: string): Promise<Article | null> {
        console.log('[ArticleService] 🔍 getArticleBySlug:', slug);
        
        const cacheKey = `article:${slug}`;
        const cached = this.getFromCache<Article>(cacheKey);
        if (cached) {
            console.log('[ArticleService] 💨 Retornando do cache:', slug);
            return cached;
        }

        const apiUrl = `${config.apiUrl}/api/headless/sites-by-id/${config.siteId}/articles/${slug}?locale=${config.locale}`;
        console.log('[ArticleService] 🌐 Fetch URL:', apiUrl);

        try {
            const response = await fetch(apiUrl);
            console.log('[ArticleService] 📊 Response status:', response.status);

            if (!response.ok) {
                if (response.status === 404) {
                    console.log('[ArticleService] ⚠️ Artigo não encontrado na API');
                    return this.getMockArticle(slug);
                }
                throw new Error(`HTTP ${response.status}`);
            }

            const snapshot = await response.json();
            const article = this.mapSnapshotsToArticles([snapshot])[0];
            this.setCache(cacheKey, article);
            console.log('[ArticleService] ✅ Artigo carregado da API:', slug);
            return article;
        } catch (error) {
            console.warn('[ArticleService] ❌ API falhou, buscando mock:', (error as Error).message);
            return this.getMockArticle(slug);
        }
    }

    private getMockArticle(slug: string): Article | null {
        const article = MOCK_ARTICLES.find(a => a.slug === slug) || null;
        if (article) {
            console.log('[ArticleService] 📋 Artigo encontrado no mock:', slug);
        } else {
            console.log('[ArticleService] ⚠️ Artigo NÃO encontrado no mock:', slug);
        }
        return article;
    }

    private getFromCache<T>(key: string): T | null {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
            return cached.data as T;
        }
        return null;
    }

    private setCache(key: string, data: unknown): void {
        this.cache.set(key, { data, timestamp: Date.now() });
    }
}

export const ArticleService = ArticleServiceClass.getInstance();
