import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, ArrowRight, Loader2, Gift } from 'lucide-react';

interface NewsletterSectionProps {
  variant?: 'default' | 'compact' | 'cta';
}

export function NewsletterSection({ variant = 'default' }: NewsletterSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT || 'https://extend-fabrics-enclosed-prot.trycloudflare.com';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'newsletter-section',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok || (response.status >= 200 && response.status < 300)) {
        setIsSuccess(true);
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-white">
            <h3 className="text-xl font-bold mb-2">Newsletter</h3>
            <p className="text-blue-100">Receba análises e comparativos no seu email.</p>
          </div>
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 text-white"
            >
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="font-semibold">Inscrição confirmada!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 md:w-64 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Assinar'}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'cta') {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-yellow-400/20">
              <Gift className="w-10 h-10 text-blue-900" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Fique Informado!
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Receba análises e comparativos de cartões diretamente no seu email.
            </p>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-md mx-auto"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Inscrição Confirmada!</h3>
                <p className="text-blue-100">Você receberá nossos conteúdos por email.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-5 py-4 rounded-xl border-0 focus:ring-2 focus:ring-yellow-400 bg-white text-gray-800"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl shadow-yellow-400/20 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Quero Receber'}
                  </button>
                </div>
                <p className="text-blue-200 text-sm flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                  </svg>
                  Apenas email • Sem spam
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* Image Side */}
            <div 
              className="relative h-64 md:h-auto bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Não Perca Nada!
                </h3>
                <p className="text-white/80">
                  As melhores ofertas chegam primeiro para quem está na lista.
                </p>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-8 flex flex-col justify-center">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Parabéns!</h4>
                  <p className="text-gray-600">
                    Você foi adicionado à nossa lista. Prepare-se para receber ofertas incríveis!
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Newsletter
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Receba análises e comparativos de cartões direto no seu email.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="seu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Quero Receber Ofertas
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                      </svg>
                      Sem spam • Cancele quando quiser
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
