import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { ReviveBanner } from '../components/ReviveAd';
import { NewsletterSection } from '../components/NewsletterSection';
import { ArticleService, type Article } from '../services';

// Fallback articles
const FALLBACK_ARTICLES: Article[] = [
    {
        id: '1',
        slug: 'nubank-ultravioleta',
        title: 'Nubank Ultravioleta: Vale a Pena?',
        excerpt: 'Análise completa do cartão Nubank Ultravioleta',
        content: 'Conteúdo completo do artigo...',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
        publishedAt: '10 Fev 2026',
        readingTime: '5 min',
        category: 'Reviews',
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
    },
];

export function Blog() {
    const [articles, setArticles] = useState<Article[]>(FALLBACK_ARTICLES);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadArticles() {
            try {
                const data = await ArticleService.getArticles({ limit: 10 });
                if (data.length > 0) {
                    setArticles(data);
                }
            } catch (error) {
                console.warn('[Blog] Usando fallback');
            } finally {
                setLoading(false);
            }
        }
        loadArticles();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero */}
            <section 
                className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-16 px-4 overflow-hidden"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/85 to-purple-900/80" />
                <div className="relative max-w-6xl mx-auto text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Blog de Cartões
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-blue-100 max-w-2xl mx-auto"
                    >
                        Reviews, comparativos e guias completos para você escolher o melhor cartão de crédito.
                    </motion.p>
                </div>
            </section>

            {/* Banner Ad */}
            <section className="py-8 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ReviveBanner />
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Carregando artigos...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article, index) => (
                                <motion.article
                                    key={article.slug}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                                >
                                    <Link to={`/artigo/${article.slug}`} className="block">
                                        <div className="relative h-52 overflow-hidden">
                                            <img 
                                                src={article.image || article.mainImage} 
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-blue-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                                <Tag className="w-3 h-3" />
                                                {article.category || 'Artigo'}
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                {article.title}
                                            </h2>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center gap-4 text-gray-500 text-sm mb-0">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {article.publishedAt}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {article.readingTime}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Banner Ad */}
            <section className="py-8 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <ReviveBanner />
                </div>
            </section>

            {/* Newsletter */}
            <NewsletterSection variant="cta" />
        </div>
    );
}
