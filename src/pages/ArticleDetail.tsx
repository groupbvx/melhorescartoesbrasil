import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Share2, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import { ReviveInArticle, ReviveSidebar } from '../components/ReviveAd';
import { ArticleService, type Article } from '../services';

// Fallback article content
const FALLBACK_ARTICLES: Record<string, Article & { cardInfo?: any }> = {
    'nubank-ultravioleta': {
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
        mainImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80',
        publishedAt: '10 Fev 2026',
        readingTime: '5 min',
        cardInfo: {
            name: 'Nubank Ultravioleta',
            color: '#820AD1',
            annualFee: 'R$ 490/ano',
            benefits: ['Metal premium', 'Atendimento prioritário', 'Saques internacionais Grátis', 'Lounge Nubank'],
        },
    },
    'melhores-cartoes-sem-anuidade': {
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
        mainImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
        publishedAt: '8 Fev 2026',
        readingTime: '8 min',
    },
    'como-escolher-cartao': {
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
        mainImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
        publishedAt: '5 Fev 2026',
        readingTime: '6 min',
    },
};

export function ArticleDetail() {
    const { slug } = useParams();
    const [article, setArticle] = useState<Article & { cardInfo?: any } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadArticle() {
            if (!slug) return;
            
            try {
                const data = await ArticleService.getArticleBySlug(slug);
                if (data) {
                    // Check if there's additional cardInfo
                    const fullData = FALLBACK_ARTICLES[slug] || data;
                    setArticle(fullData as Article & { cardInfo?: any });
                } else {
                    // Try fallback
                    const fallback = FALLBACK_ARTICLES[slug];
                    if (fallback) setArticle(fallback);
                }
            } catch (error) {
                console.warn('[ArticleDetail] Erro, usando fallback');
                const fallback = FALLBACK_ARTICLES[slug];
                if (fallback) setArticle(fallback);
            } finally {
                setLoading(false);
            }
        }
        loadArticle();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-500">Carregando artigo...</p>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Artigo não encontrado</h1>
                    <Link to="/blog" className="text-blue-600 hover:text-blue-700">
                        Voltar ao blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Image */}
            <div 
                className="relative h-96 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden"
                style={{
                    backgroundImage: `url(${article.image || article.mainImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                
                {/* Back Button */}
                <div className="absolute top-6 left-6 z-10">
                    <Link 
                        to="/blog"
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                    </Link>
                </div>

                <div className="relative h-full max-w-4xl mx-auto px-4 flex items-end pb-12">
                    <div>
                        <span className="bg-yellow-500 text-blue-900 text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                            Artigo Completo
                        </span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-bold text-white mb-4"
                        >
                            {article.title}
                        </motion.h1>
                        <div className="flex items-center gap-6 text-white/90">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                {article.publishedAt}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                {article.readingTime}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content with Sidebar */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <article>
                            {/* Card Info */}
                            {'cardInfo' in article && article.cardInfo && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div 
                                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                                            style={{ background: article.cardInfo.color }}
                                        >
                                            <CreditCard className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">
                                                {article.cardInfo.name}
                                            </h3>
                                            <p className="text-gray-600">{article.cardInfo.annualFee}</p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600 text-sm mb-1">Anuidade</p>
                                            <p className="font-semibold text-lg">{article.cardInfo.annualFee}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 text-sm mb-2">Benefícios</p>
                                            <ul className="space-y-2">
                                                {article.cardInfo.benefits.map((benefit: string, i: number) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                        <span>{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* In-Article Ad 1 */}
                            <ReviveInArticle position={1} />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="prose prose-lg max-w-none"
                            >
                                {article.content.split('\n\n').map((paragraph, i) => {
                                    if (paragraph.startsWith('## ')) {
                                        return <h2 key={i} className="text-2xl font-bold mt-10 mb-5 text-gray-800">{paragraph.slice(3)}</h2>;
                                    }
                                    if (paragraph.startsWith('### ')) {
                                        return <h3 key={i} className="text-xl font-semibold mt-8 mb-4 text-gray-800">{paragraph.slice(4)}</h3>;
                                    }
                                    if (paragraph.startsWith('- ')) {
                                        return (
                                            <ul key={i} className="list-none pl-0 my-6 space-y-3">
                                                {paragraph.split('\n').map((item, j) => {
                                                    const cleanItem = item.replace(/^- /, '').trim();
                                                    if (!cleanItem) return null;
                                                    return (
                                                        <li key={j} className="flex items-start gap-3">
                                                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                <CheckCircle className="w-4 h-4 text-blue-600" />
                                                            </div>
                                                            <span className="text-gray-700">{cleanItem}</span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        );
                                    }
                                    return <p key={i} className="text-gray-700 leading-relaxed my-4">{paragraph}</p>;
                                })}
                            </motion.div>

                            {/* In-Article Ad 2 */}
                            <ReviveInArticle position={2} />

                            {/* Share */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-12 pt-8 border-t"
                            >
                                <button className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-lg">
                                    <Share2 className="w-5 h-5" />
                                    Compartilhar artigo
                                </button>
                            </motion.div>

                            {/* Related Articles */}
                            <div className="mt-12 pt-8 border-t">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Artigos Relacionados</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Link 
                                        to="/artigo/melhores-cartoes-sem-anuidade"
                                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                            <CreditCard className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Top 10 sem Anuidade</h4>
                                            <p className="text-sm text-gray-500">Comparativos</p>
                                        </div>
                                    </Link>
                                    <Link 
                                        to="/artigo/inter-x-nubank"
                                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                                            <CreditCard className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Inter vs Nubank</h4>
                                            <p className="text-sm text-gray-500">Comparativos</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Sidebar Ad */}
                    <aside>
                        <ReviveSidebar />
                    </aside>
                </div>
            </div>
        </div>
    );
}
