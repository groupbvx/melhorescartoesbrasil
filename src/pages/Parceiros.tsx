import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const banks = [
  {
    name: 'Nubank',
    logo: 'NU',
    color: '#820AD1',
    type: 'Banco Digital',
    description: 'Pertence ao Grupo Nubank, maior banco digital independente do mundo.',
  },
  {
    name: 'Inter',
    logo: 'IN',
    color: '#FF7A00',
    type: 'Banco Digital',
    description: 'Banco digital completo com conta corrente e cartão de crédito.',
  },
  {
    name: 'C6 Bank',
    logo: 'C6',
    color: '#000000',
    type: 'Banco Digital',
    description: 'Banco digital brasileiro com foco em crédito e investimentos.',
  },
  {
    name: 'Santander',
    logo: 'SA',
    color: '#EC0000',
    type: 'Banco Tradicional',
    description: 'Um dos maiores bancos do sistema financeiro brasileiro.',
  },
  {
    name: 'Itaú',
    logo: 'IT',
    color: '#FD6D00',
    type: 'Banco Tradicional',
    description: 'Maior banco privado da América Latina.',
  },
  {
    name: 'Banco Pan',
    logo: 'BP',
    color: '#E31B1B',
    type: 'Banco',
    description: 'Instituição especializada em crédito e serviços financeiros.',
  },
];

export function Parceiros() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Instituições Analisadas
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            As principais instituições financeiras do Brasil cujos cartões 
            são objeto de análise em nosso conteúdo.
          </p>
        </div>
      </section>

      {/* Info */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700 text-lg">
            Este site analisa cartões de crédito das principais instituições 
            financeiras operando no Brasil. As informações são públicas e 
            disponíveis nos websites oficiais de cada banco.
          </p>
        </div>
      </section>

      {/* Banks Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {banks.map((bank, index) => (
              <motion.div
                key={bank.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div 
                  className="h-24 flex items-center justify-center"
                  style={{ background: bank.color }}
                >
                  <span className="text-3xl font-bold text-white">{bank.logo}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{bank.name}</h3>
                  </div>
                  <p className="text-blue-600 text-sm font-medium mb-3">{bank.type}</p>
                  <p className="text-gray-600 text-sm">{bank.description}</p>
                  <Link 
                    to={`/artigo/${bank.name.toLowerCase().replace(' ', '-')}`}
                    className="mt-4 block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition-colors text-sm"
                  >
                    Ver análises
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Aviso de Independência</h2>
          <p className="text-gray-600 text-sm mb-4">
            As análises publicadas neste site são independentes e não sofrem influência 
            das instituições financeiras mencionadas. Não temos vínculo societário, 
            participação acionária ou acordos comerciais com os bancos listados.
          </p>
          <p className="text-gray-600 text-sm">
            <strong>Importante:</strong> Este site não intermediária operações de crédito, 
            não cobra taxas pela análise de propostas e não recomenda a contratação 
            de produtos específicos. Todas as decisões de contratação são de 
            responsabilidade exclusiva do consumidor.
          </p>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para a página inicial
          </Link>
        </div>
      </section>
    </div>
  );
}
