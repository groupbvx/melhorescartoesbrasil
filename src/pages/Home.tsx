import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { NewsletterSection } from '../components/NewsletterSection';

export function Home() {
  const creditCards = [
    {
      name: 'Nubank',
      color: '#820AD1',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
      annualFee: 'Grátis',
      highlight: true,
    },
    {
      name: 'Inter',
      color: '#FF7A00',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
      annualFee: 'Grátis',
      highlight: false,
    },
    {
      name: 'C6 Bank',
      color: '#000000',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80',
      annualFee: 'Grátis',
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 px-4 overflow-hidden"
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Encontre o <span className="text-yellow-400">Melhor Cartão</span> para Você
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto"
          >
            Compare cartões de crédito, descubra benefícios e faça a escolha certa para suas finanças.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl shadow-yellow-500/20"
            >
              Comparar Cartões
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Cartões em Análise
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Principais cartões disponíveis no mercado brasileiro
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {creditCards.map((card, index) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  card.highlight ? 'ring-2 ring-yellow-400' : ''
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {card.highlight && (
                    <span className="absolute top-4 left-4 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
                      ⭐ Recomendado
                    </span>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{card.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-semibold">{card.annualFee}</span>
                  </div>
                  <Link 
                    to={`/artigo/${card.name.toLowerCase().replace(' ', '-')}`}
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">100% Seguro</h3>
              <p className="text-gray-600">Todas as análises são verificadas e atualizadas constantemente</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Análise Imparcial</h3>
              <p className="text-gray-600">Comparativos transparentes sem viés comercial</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Atualizado</h3>
              <p className="text-gray-600">Informações sempre atuais com as últimas mudanças</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterSection variant="cta" />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quer comparar cartões?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Acesse nossa página de comparativos e análises detalhadas
          </p>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-3 bg-white text-blue-600 font-bold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl"
          >
            Ver Todos os Cartões
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
