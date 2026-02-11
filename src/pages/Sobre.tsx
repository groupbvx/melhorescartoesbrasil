import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function Sobre() {
  const values = [
    {
      title: 'Informação',
      description: 'Fornecemos análises detalhadas e comparativos imparciais de cartões de crédito para ajudar você a tomar decisões financeiras informadas.',
    },
    {
      title: 'Transparência',
      description: 'Nossa metodologia é pública e independente. Não influenciamos análises por parcerias ou interesses comerciais.',
    },
    {
      title: 'Atualização',
      description: 'Mantemos nosso conteúdo sempre atualizado com as últimas informações sobre cartões, taxas e benefícios.',
    },
  ];

  const stats = [
    { value: '50+', label: 'Cartões Analisados' },
    { value: '100K+', label: 'Visitas Mensais' },
    { value: '5M+', label: 'Leitores Atendidos' },
    { value: '2020', label: 'Ano de Fundação' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-gray-900/90" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Sobre o Melhores Cartões
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Um guia completo e independente para ajudar você a entender melhor 
            o mercado de cartões de crédito no Brasil.
          </motion.p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Nossa Missão
              </h2>
              <p className="text-gray-600 mb-4">
                Fundado em 2020, o Melhores Cartões Brasil nasceu com o objetivo de 
                simplificar a compreensão do mercado de cartões de crédito para os brasileiros.
              </p>
              <p className="text-gray-600">
                Com a crescente complexidade das ofertas financeiras, percebemos a 
                necessidade de um recurso independente que ajudasse os consumidores 
                a comparar opções de forma clara e objetiva.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8">
              <p className="text-gray-600 italic text-lg">
                "Nosso compromisso é fornecer informação clara e acessível, 
                ajudando você a fazer a melhor escolha para suas necessidades."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Nossa Abordagem
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metodologia */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Nossa Metodologia
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            As análises publicadas em nosso site são baseadas em informações públicas 
            disponíveis nas websites das instituições financeiras, regulamentos do Banco Central 
            e feedback de usuários. Nossa independência editorial é fundamental.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-2">Fontes de Dados</h3>
              <p className="text-gray-600 text-sm">
                Informações públicas das instituições, reguladores oficiais 
                e experiências documentadas de usuários.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-2">Atualização</h3>
              <p className="text-gray-600 text-sm">
                Conteúdo revisado periodicamente para garantir precisão 
                e atualidade das informações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            <strong>Aviso Importante:</strong> Este site é meramente informativo. 
            Não somos instituição financeira, não intermediamos operações de crédito 
            e não recomendamos a contratação de produtos específicos. 
            Sempre verifique as condições atuais diretamente com a instituição.
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
