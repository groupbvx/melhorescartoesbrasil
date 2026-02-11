import { Link } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';

export function Termos() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Termos de Uso
          </h1>
          <p className="text-gray-300 text-lg">
            Regras e condições para uso do site
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-gray-600 mb-8">
            Última atualização: Fevereiro 2026
          </p>

          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e usar o site Melhores Cartões Brasil, você aceita e concorda em cumprir estes 
            Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nosso site.
          </p>

          <h2>2. Uso do Site</h2>
          <p>Você concorda em usar o site apenas para fins legais e de acordo com estes Termos:</p>
          <ul>
            <li>Não usar o site de forma que possa danificá-lo ou torná-lo inacessível</li>
            <li>Não tentar obter acesso não autorizado a qualquer parte do site</li>
            <li>Não usar o site para qualquer finalidade ilegal ou não autorizada</li>
            <li>Não transmitir vírus, worms ou qualquer outro código malicioso</li>
          </ul>

          <h2>3. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo do site, incluindo textos, gráficos, logos, imagens, vídeos e software, 
            é de propriedade da Melhores Cartões Brasil ou de seus licenciadores e é protegido por leis 
            de propriedade intelectual. Você pode usar o conteúdo apenas para fins pessoais e não comerciais.
          </p>

          <h2>4. Isenção de Responsabilidade</h2>
          <p>
            <strong>Importante:</strong> As informações fornecidas no site são apenas para fins informativos. 
            Não garantimos a precisão, completude ou atualidade das informações. As taxas, benefícios e 
            condições dos cartões de crédito podem mudar sem aviso prévio.
          </p>
          <p>
            As comparações e rankings são baseados em nossa análise e não constituem recomendação formal. 
            Recomendamos que você verifique as informações diretamente com as instituições financeiras.
          </p>

          <h2>5. Links para Terceiros</h2>
          <p>
            O site pode conter links para sites de terceiros. Não temos controle sobre o conteúdo 
            ou práticas de sites de terceiros e não somos responsáveis por eles. A inclusão de links 
            não implica endosso ou associação.
          </p>

          <h2>6. Publicidade e Afiliados</h2>
          <p>
            O site pode exibir publicidade e links de afiliados. Podemos receber comissões por compras 
            feitas através de links de afiliados, sem custo adicional para você. Isso nos ajuda a 
            manter o site funcionando.
          </p>

          <h2>7. Limitação de Responsabilidade</h2>
          <p>
            Em nenhuma circunstância a Melhores Cartões Brasil, seus diretores, funcionários ou afiliados 
            serão responsáveis por quaisquer danos diretos, indiretos, incidentais, consequenciais 
            ou punitivos decorrentes do uso ou incapacidade de usar o site.
          </p>

          <h2>8. Modificações</h2>
          <p>
            Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspecto do site 
            a qualquer momento. Estes Termos podem ser modificados a qualquer momento. O uso contínuo 
            do site após alterações constitui aceitação dos novos termos.
          </p>

          <h2>9. Lei Aplicável</h2>
          <p>
            Estes Termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos 
            tribunais competentes da cidade de São Paulo, São Paulo.
          </p>

          <h2>10. Contato</h2>
          <p>
            Para questões sobre estes Termos, entre em contato através da página de 
            <Link to="/contato">Contato</Link>.
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
