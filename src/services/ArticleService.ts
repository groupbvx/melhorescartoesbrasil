import { config } from '@/lib/config';

// Article interface
export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    mainImage?: string;
    image?: string; // Alias for mainImage
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
        content: `O **Nubank Ultravioleta** é o cartão premium do Nubank.

## O que diferencia o Ultravioleta?

Este cartão traz benefícios exclusivos:

- Metal Premium: Aço inoxidável e tungstênio
- Atendimento Prioritário: Time dedicado
- Saques Grátis: Ilimitados internacionalmente
- Lounge Nubank: Acesso em Guarulhos

## Vale a Pena?

Depende do seu perfil. Viajantes podem se beneficiar.`,
        mainImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
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
        content: `A busca por cartões sem anuidade continua forte.

## Ranking dos Melhores

1. **Nubank**: O líder do mercado
2. **Inter**: Benefícios digitais
3. **C6 Bank**: Programa de pontos

## Como Escolher?

Avalie taxas, benefícios e qualidade do app.`,
        mainImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
        publishedAt: '8 Fev 2026',
        readingTime: '8 min',
        category: 'Comparativos',
        tags: ['sem anuidade', 'rankings'],
    },
    {
        id: '3',
        slug: 'como-escolher-cartao',
        title: 'Como Escolher o Cartão Ideal',
        excerpt: 'Guia completo para escolher seu cartão',
        content: `Escolher o cartão ideal pode parecer complicado!

## Critérios Importantes

### 1. Anuidade
Cartões sem anuidade são ideais.

### 2. Programa de Pontos
Para quem viaja, priorize milhas.

### 3. Taxas de Juros
Sempre negocie à vista.`,
        mainImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
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
        console.log('[ArticleService] Inicializado com fallback para mock');
    }

    public static getInstance(): ArticleServiceClass {
        if (!ArticleServiceClass.instance) {
            ArticleServiceClass.instance = new ArticleServiceClass();
        }
        return ArticleServiceClass.instance;
    }

    async getArticles(params: { limit?: number; offset?: number } = {}): Promise<Article[]> {
        const { limit = 10, offset = 0 } = params;

        try {
            const articles = await this.fetchFromAPI(params);
            if (articles.length > 0) {
                console.log('[ArticleService] Artigos carregados da API');
                return articles;
            }
        } catch (error) {
            console.warn('[ArticleService] API falhou, usando fallback:', (error as Error).message);
        }

        console.log('[ArticleService] Usando dados mockados');
        return MOCK_ARTICLES.slice(offset, offset + limit);
    }

    private async fetchFromAPI(params: { limit?: number; offset?: number }): Promise<Article[]> {
        const { limit = 10, offset = 0 } = params;

        try {
            const queryParams = new URLSearchParams({
                limit: String(limit),
                offset: String(offset),
                locale: config.locale,
            });

            const response = await fetch(
                `${config.apiUrl}/api/headless/sites-by-id/${config.siteId}?${queryParams}`
            );

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            return this.mapSnapshotsToArticles(data.articles || []);
        } catch (error) {
            throw error;
        }
    }

    private mapSnapshotsToArticles(snapshots: any[]): Article[] {
        return snapshots.map((snapshot: any) => {
            const localeData = snapshot.locales?.find(
                (l: any) => l.locale.toLowerCase() === config.locale.toLowerCase()
            ) || snapshot.locales?.[0] || {};

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
        const cacheKey = `article:${slug}`;
        const cached = this.getFromCache<Article>(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch(
                `${config.apiUrl}/api/headless/sites-by-id/${config.siteId}/articles/${slug}?locale=${config.locale}`
            );

            if (!response.ok) {
                if (response.status === 404) return this.getMockArticle(slug);
                throw new Error(`HTTP ${response.status}`);
            }

            const snapshot = await response.json();
            const article = this.mapSnapshotsToArticles([snapshot])[0];
            this.setCache(cacheKey, article);
            return article;
        } catch {
            console.warn('[ArticleService] API falhar, buscando mock');
            return this.getMockArticle(slug);
        }
    }

    private getMockArticle(slug: string): Article | null {
        return MOCK_ARTICLES.find(a => a.slug === slug) || null;
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
