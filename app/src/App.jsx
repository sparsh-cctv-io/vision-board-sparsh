import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SearchPage from './pages/SearchPage';
import PortfolioItem from './pages/PortfolioItem';
import AdminPage from './pages/AdminPage';
import { ContentProvider } from './contexts/ContentContext';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ContentProvider>
        <div className="min-h-screen bg-surface text-on-surface">
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:slug" element={<PortfolioItem />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <ChatBot />
          <WhatsAppButton />
        </div>
      </ContentProvider>
    </BrowserRouter>
  );
};

export default App;
