import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

export function Privacidade() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Política de Privacidade
          </h1>
          <p className="text-blue-100 text-lg">
            Como protegemos seus dados pessoais
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-gray-600 mb-8">
            Última atualização: Fevereiro 2026
          </p>

          <h2>1. Introdução</h2>
          <p>
            A Melhores Cartões Brasil ("nós", "nosso" ou "nossa") está comprometida em proteger sua privacidade. 
            Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações 
            quando você visita nosso site.
          </p>

          <h2>2. Informações que Coletamos</h2>
          <p>Podemos coletar as seguintes informações:</p>
          <ul>
            <li><strong>Informações pessoais:</strong> nome, endereço de e-mail, número de telefone quando você se cadastra em nossa newsletter</li>
            <li><strong>Informações de uso:</strong> páginas visitadas, tempo gasto no site, links clicados</li>
            <li><strong>Informações técnicas:</strong> endereço IP, tipo de navegador, sistema operacional</li>
          </ul>

          <h2>3. Como Usamos suas Informações</h2>
          <p>Utilizamos suas informações para:</p>
          <ul>
            <li>Fornecer e melhorar nossos serviços</li>
            <li>Personalizar sua experiência no site</li>
            <li>Enviar comunicações de marketing (com seu consentimento)</li>
            <li>Analisar tendências e padrões de uso</li>
            <li>Prevenir fraudes e garantir a segurança do site</li>
          </ul>

          <h2>4. Cookies e Tecnologias Semelhantes</h2>
          <p>
            Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência. Cookies são pequenos arquivos 
            de dados armazenados em seu dispositivo. Você pode desativar cookies nas configurações do seu navegador.
          </p>

          <h2>5. Compartilhamento de Informações</h2>
          <p>
            Não vendemos ou alugamos suas informações pessoais a terceiros. Podemos compartilhar informações com:
          </p>
          <ul>
            <li>Prestadores de serviços que nos ajudam a operar o site</li>
            <li>Parceiros de análise de tráfego (como PostHog)</li>
            <li>Autoridades legais quando exigido por lei</li>
          </ul>

          <h2>6. Segurança das Informações</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais 
            contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>

          <h2>7. Seus Direitos</h2>
          <p>Você tem o direito de:</p>
          <ul>
            <li>Acessar suas informações pessoais</li>
            <li>Corrigir informações imprecisas</li>
            <li>Solicitar exclusão de suas informações</li>
            <li>Optar por não receber comunicações de marketing</li>
          </ul>

          <h2>8. Contato</h2>
          <p>
            Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através da 
            página de <Link to="/contato">Contato</Link>.
          </p>

          <h2>9. Alterações nesta Política</h2>
          <p>
            Reservamo-nos o direito de modificar esta política a qualquer momento. Alterações serão publicadas 
            nesta página com a data de atualização.
          </p>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-8 px-4 bg-gray-50">
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
