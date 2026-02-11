import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const cards = [
  {
    name: 'Nubank',
    color: '#820AD1',
    annualFee: 'Grátis',
    rating: 4.8,
    reviews: 12500,
    benefits: ['Anuidade Grátis', 'App Completo', 'Atendimento 24h'],
    highlight: true,
  },
  {
    name: 'Inter',
    color: '#FF7A00',
    annualFee: 'Grátis',
    rating: 4.6,
    reviews: 8200,
    benefits: ['Conta Digital', 'Empréstimos', 'Investimentos'],
    highlight: false,
  },
  {
    name: 'C6 Bank',
    color: '#000000',
    annualFee: 'Grátis',
    rating: 4.5,
    reviews: 6500,
    benefits: ['Programa Átomos', 'C6 Iron', 'Crédito Pessoal'],
    highlight: false,
  },
  {
    name: 'Banco Pan',
    color: '#E31B1B',
    annualFee: 'R$ 190/ano',
    rating: 4.2,
    reviews: 3200,
    benefits: ['Parcelamento', 'Consignado', 'Cartão Consignado'],
    highlight: false,
  },
  {
    name: 'Santander',
    color: '#EC0000',
    annualFee: 'R$ 530/ano',
    rating: 4.4,
    reviews: 9800,
    benefits: ['Ultravioleta', 'Passaporte', 'Santander On'],
    highlight: false,
  },
  {
    name: 'Itaú',
    color: '#FD6D00',
    annualFee: 'R$ 590/ano',
    rating: 4.3,
    reviews: 11200,
    benefits: ['Itaú Shop', 'Programa de Pontos', 'Seguro Viagem'],
    highlight: false,
  },
];

export function CompareCards() {
  return (
    <div className="min-h-screen bg-white">
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
            Comparar Cartões de Crédito
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Encontre o cartão perfeito para seu perfil. Compare taxas, benefícios e avaliações.
          </motion.p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Cartão</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Anuidade</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Avaliação</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Benefícios</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Ação</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card, index) => (
                  <motion.tr
                    key={card.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${card.highlight ? 'bg-yellow-50' : ''}`}
                  >
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                          style={{ background: card.color }}
                        >
                          {card.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-800">{card.name}</h3>
                            {card.highlight && (
                              <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-0.5 rounded-full">⭐ Top</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{card.reviews.toLocaleString()} avaliações</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-6 px-4">
                      <span className={`font-semibold ${card.annualFee === 'Grátis' ? 'text-green-600' : 'text-gray-800'}`}>
                        {card.annualFee}
                      </span>
                    </td>
                    <td className="text-center py-6 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-bold text-yellow-500">★</span>
                        <span className="font-semibold">{card.rating}</span>
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex flex-wrap justify-center gap-2">
                        {card.benefits.map((benefit) => (
                          <span key={benefit} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="text-center py-6 px-4">
                      <Link 
                        to={`/artigo/${card.name.toLowerCase().replace(' ', '-')}`}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                      >
                        Ver Detalhes
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Não encontrou o que procura?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Entre em contato e vamos ajudá-lo a encontrar o cartão ideal.
          </p>
          <Link 
            to="/contato"
            className="inline-flex items-center gap-3 bg-white text-blue-600 font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl"
          >
            Fale Conosco
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
