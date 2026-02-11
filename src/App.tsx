import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { ReviveStickyFooter } from './components/ReviveAd';
import { AdService, AnalyticsService, config } from './services';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { ArticleDetail } from './pages/ArticleDetail';
import { CompareCards } from './pages/CompareCards';
import { Ranking } from './pages/Ranking';
import { Simular } from './pages/Simular';
import { Privacidade } from './pages/Privacidade';
import { Termos } from './pages/Termos';
import { Contato } from './pages/Contato';
import { Sobre } from './pages/Sobre';
import { Parceiros } from './pages/Parceiros';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

// Initialize services on app load
function initializeServices() {
  if (typeof window !== 'undefined') {
    console.log('[App] Inicializando serviços...', { siteId: config.siteId });
    AdService.initialize();
    AnalyticsService.initialize();
  }
}

function App() {
  useEffect(() => {
    initializeServices();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          {/* Script para PostHog se configurado */}
          {config.posthogKey && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(t,s,i){function a(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0===i?u=e:i instanceof Array)u[i]=e[i];e._i.push([t,s,i])},e.__SV=1.1,o=e.integrations||[],o.register&&o.register(t,window.posthog)}(document,window.posthog||[]);
                  posthog.init('${config.posthogKey}', { host: '${config.posthogHost}' });
                `,
              }}
            />
          )}
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/artigo/:slug" element={<ArticleDetail />} />
                <Route path="/artigo/comparar-cartoes" element={<CompareCards />} />
                <Route path="/artigo/ranking" element={<Ranking />} />
                <Route path="/artigo/simular" element={<Simular />} />
                <Route path="/privacidade" element={<Privacidade />} />
                <Route path="/termos" element={<Termos />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/parceiros" element={<Parceiros />} />
              </Routes>
            </main>
            <Footer />
            {/* Lead Capture Forms */}
            <LeadCaptureForm 
              source="popup-home" 
              title="Encontre o Melhor Cartão!"
              subtitle="Compare ofertas personalizadas em segundos"
              buttonText="Comparar Agora"
            />
            {/* Sticky Footer Ad */}
            <ReviveStickyFooter />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
