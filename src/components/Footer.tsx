import { Link } from 'react-router-dom';
import { CreditCard, Shield } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">Melhores<span className="text-blue-400">Cartões</span></span>
            </Link>
            <p className="text-gray-400 max-w-md mb-6">
              Guia informativo sobre cartões de crédito no Brasil. 
              Análises imparciais para ajudar em sua decisão.
            </p>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-green-400 text-sm">Conteúdo informativo e independente</span>
            </div>
          </div>

          {/* Links Principais */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navegação</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/artigo/comparar-cartoes" className="hover:text-white transition-colors">Comparar</Link></li>
              <li><Link to="/artigo/ranking" className="hover:text-white transition-colors">Ranking</Link></li>
              <li><Link to="/artigo/simular" className="hover:text-white transition-colors">Simular</Link></li>
            </ul>
          </div>

          {/* Links Secundários */}
          <div>
            <h4 className="font-semibold text-white mb-4">Informações</h4>
            <ul className="space-y-3">
              <li><Link to="/privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
              <li><Link to="/termos" className="hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre</Link></li>
              <li><Link to="/parceiros" className="hover:text-white transition-colors">Instituições</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Melhores Cartões Brasil. Conteúdo meramente informativo.
            </p>
            <p className="text-gray-500 text-sm text-center md:text-right">
              Este site utiliza cookies. Ao continuar, você aceita nossa{' '}
              <Link to="/privacidade" className="text-blue-400 hover:text-blue-300">política de privacidade</Link>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
