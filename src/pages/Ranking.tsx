import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, TrendingUp } from 'lucide-react';
import { NewsletterSection } from '../components/NewsletterSection';

const rankings = [
  {
    position: 1,
    name: 'Nubank',
    color: '#820AD1',
    score: 95,
    highlights: ['Anuidade Grátis', 'Melhor App', 'Atendimento 24h'],
    description: 'O líder absoluto do mercado de cartões digitais no Brasil.',
    highlight: true,
  },
  {
    position: 2,
    name: 'Inter',
    color: '#FF7A00',
    score: 89,
    highlights: ['Conta Digital', 'Investimentos', 'Empréstimos'],
    description: 'Excelente opção para quem busca um banco digital completo.',
    highlight: false,
  },
  {
    position: 3,
    name: 'C6 Bank',
    color: '#000000',
    score: 86,
    highlights: ['Programa Átomos', 'C6 Iron', 'Crédito Pessoal'],
    description: 'Bank digital com ótimas opções de crédito e pontos.',
    highlight: false,
  },
  {
    position: 4,
    name: 'Santander',
    color: '#EC0000',
    score: 82,
    highlights: ['Ultravioleta', 'Passaporte', 'Santander On'],
    description: 'Opções para todos os perfis, do básico ao premium.',
    highlight: false,
  },
  {
    position: 5,
    name: 'Itaú',
    color: '#FD6D00',
    score: 80,
    highlights: ['Itaú Shop', 'Programa de Pontos', 'Seguro Viagem'],
    description: 'Banco tradicional com ótimas opções digitais.',
    highlight: false,
  },
  {
    position: 6,
    name: 'Banco Pan',
    color: '#E31B1B',
    score: 75,
    highlights: ['Consignado', 'Parcelamento', 'Crédito Pessoal'],
    description: 'Especialista em crédito consignado e pessoal.',
    highlight: false,
  },
  {
    position: 7,
    name: 'Nubank Ultravioleta',
    color: '#820AD1',
    score: 88,
    highlights: ['Metal Premium', 'Atendimento VIP', 'Lounge Nubank'],
    description: 'Cartão premium para clientes de alto padrão.',
    highlight: false,
  },
  {
    position: 8,
    name: 'C6 Iron',
    color: '#000000',
    score: 78,
    highlights: ['Metal', 'Black', 'Benefícios Exclusivos'],
    description: 'Cartão premium do C6 Bank com benefícios exclusivos.',
    highlight: false,
  },
];

export function Ranking() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section 
        className="relative bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600 py-16 px-4 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/80 via-amber-500/75 to-orange-600/80" />
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
              <Trophy className="w-10 h-10 text-yellow-500" />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Ranking dos Melhores Cartões
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Os cartões mais bem avaliados do Brasil em 2026
          </motion.p>
        </div>
      </section>

      {/* Rankings List */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {rankings.map((card, index) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                card.highlight ? 'ring-4 ring-yellow-400' : ''
              } ${card.position <= 3 ? 'bg-gradient-to-r from-yellow-50 to-white' : ''}`}
            >
              {/* Position Badge */}
              <div className={`absolute left-0 top-0 bottom-0 w-2 ${card.position === 1 ? 'bg-yellow-400' : card.position === 2 ? 'bg-gray-300' : card.position === 3 ? 'bg-orange-400' : 'bg-gray-200'}`} />
              
              <div className="flex flex-col md:flex-row items-center gap-6 p-6 ml-2 md:ml-4">
                {/* Position */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${card.position <= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                    #{card.position}
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                    style={{ background: card.color }}
                  >
                    {card.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-800">{card.name}</h3>
                      {card.highlight && (
                        <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-0.5 rounded-full">🏆 Melhor Overall</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </div>
                </div>

                {/* Score */}
                <div className="flex-shrink-0 text-center">
                  <div className="flex items-center gap-1 mb-1">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-2xl font-bold text-gray-800">{card.score}</span>
                  </div>
                  <span className="text-xs text-gray-500">/ 100 pontos</span>
                </div>

                {/* Highlights */}
                <div className="flex-shrink-0 hidden md:block">
                  <div className="flex flex-wrap gap-2">
                    {card.highlights.slice(0, 2).map((highlight) => (
                      <span key={highlight} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="flex-shrink-0">
                  <Link 
                    to={`/artigo/${card.name.toLowerCase().replace(' ', '-')}`}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Ver Detalhes
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection variant="cta" />
    </div>
  );
}
