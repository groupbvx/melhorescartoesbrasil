import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, DollarSign, TrendingUp } from 'lucide-react';
import { NewsletterSection } from '../components/NewsletterSection';

interface SimulationResult {
  name: string;
  color: string;
  limit: string;
  fee: string;
  score: number;
}

export function Simular() {
  const [monthlySpend, setMonthlySpend] = useState(3000);
  const [creditScore, setCreditScore] = useState('good');
  const [isEmployee, setIsEmployee] = useState(false);
  const [hasIncome, setHasIncome] = useState(false);

  const simulateLimit = (spend: number, score: string, isEmp: boolean, hasInc: boolean) => {
    let multiplier = 2;
    if (score === 'excellent') multiplier = 3;
    else if (score === 'good') multiplier = 2.5;
    else if (score === 'fair') multiplier = 1.5;
    
    if (isEmp) multiplier *= 1.2;
    if (hasInc) multiplier *= 1.1;
    
    return (spend * multiplier).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    });
  };

  const results: SimulationResult[] = [
    { name: 'Nubank', color: '#820AD1', limit: simulateLimit(monthlySpend, creditScore, isEmployee, hasIncome), fee: 'Grátis', score: 95 },
    { name: 'Inter', color: '#FF7A00', limit: simulateLimit(monthlySpend, creditScore, isEmployee, hasIncome), fee: 'Grátis', score: 88 },
    { name: 'C6 Bank', color: '#000000', limit: simulateLimit(monthlySpend, creditScore, isEmployee, hasIncome), fee: 'Grátis', score: 85 },
    { name: 'Santander', color: '#EC0000', limit: simulateLimit(monthlySpend, creditScore, isEmployee, hasIncome), fee: 'R$ 530/ano', score: 82 },
    { name: 'Itaú', color: '#FD6D00', limit: simulateLimit(monthlySpend, creditScore, isEmployee, hasIncome), fee: 'R$ 590/ano', score: 80 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section 
        className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-16 px-4 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/85 to-purple-900/80" />
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
              <Calculator className="w-10 h-10 text-blue-600" />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Simule seu Cartão
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Descubra qual cartão você pode conseguir e qual limite de crédito!
          </motion.p>
        </div>
      </section>

      {/* Simulator */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Preencha seus dados</h2>

            {/* Monthly Spend */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quanto você gasta por mês?
              </label>
              <div className="flex items-center gap-4">
                <DollarSign className="w-6 h-6 text-gray-400" />
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="500"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xl font-bold text-blue-600 min-w-[120px]">
                  {monthlySpend.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>

            {/* Credit Score */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qual é seu score de crédito?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: 'excellent', label: 'Excelente', color: 'bg-green-500' },
                  { value: 'good', label: 'Bom', color: 'bg-blue-500' },
                  { value: 'fair', label: 'Regular', color: 'bg-yellow-500' },
                  { value: 'poor', label: 'Ruim', color: 'bg-red-500' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCreditScore(option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      creditScore === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 ${option.color} rounded-full mx-auto mb-2 ${creditScore === option.value ? 'ring-2 ring-blue-500' : ''}`} />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isEmployee ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="checkbox"
                  checked={isEmployee}
                  onChange={(e) => setIsEmployee(e.target.checked)}
                  className="w-5 h-5 text-blue-600"
                />
                <div>
                  <span className="font-medium text-gray-800">CLT / Empresário</span>
                  <p className="text-sm text-gray-500">Renda fixa comprovada</p>
                </div>
              </label>

              <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                hasIncome ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="checkbox"
                  checked={hasIncome}
                  onChange={(e) => setHasIncome(e.target.checked)}
                  className="w-5 h-5 text-blue-600"
                />
                <div>
                  <span className="font-medium text-gray-800">Recebe no mesmo banco</span>
                  <p className="text-sm text-gray-500">Salário/débito automático</p>
                </div>
              </label>
            </div>

            {/* Results */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-500" />
                Resultados da Simulação
              </h3>

              <div className="space-y-4">
                {results.map((card, index) => (
                  <motion.div
                    key={card.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                        style={{ background: card.color }}
                      >
                        {card.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{card.name}</h4>
                        <p className="text-sm text-gray-500">Anuidade: {card.fee}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">{card.limit}</p>
                      <p className="text-xs text-gray-500">limite estimado</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Gostou dos resultados?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Solicite seu cartão agora mesmo!
          </p>
          <a 
            href="#"
            className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl"
          >
            Solicitar Cartão
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <NewsletterSection variant="compact" />
    </div>
  );
}
