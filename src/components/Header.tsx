import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, CreditCard } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/blog', label: 'Blog' },
    { path: '/artigo/comparar-cartoes', label: 'Comparar' },
    { path: '/artigo/ranking', label: 'Ranking' },
    { path: '/artigo/simular', label: 'Simular' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800 hidden sm:block">
              Melhores<span className="text-blue-600">Cartões</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              to="/blog"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-blue-500/20"
            >
              Comparar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-3 font-medium ${
                  location.pathname === link.path 
                    ? 'text-blue-600' 
                    : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/blog"
              className="block mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center font-semibold px-5 py-3 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Comparar Cartões
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
