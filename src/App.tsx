import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { HomePage } from './routes/HomePage';
import {
  AboutPage,
  ServicesPage,
  DigitalMarketingPage,
  OutdoorMarketingPage,
  WorkPage,
  ContactPage,
} from './routes/stubs';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
          <Route path="/services/outdoor-marketing" element={<OutdoorMarketingPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Clean Redirects for Legacy / Alternative URLs */}
          <Route
            path="/services/outdoor-advertising"
            element={<Navigate to="/services/outdoor-marketing" replace />}
          />
          <Route
            path="/services/creative-branding"
            element={<Navigate to="/services/digital-marketing" replace />}
          />
          <Route
            path="/services/website-development"
            element={<Navigate to="/services/digital-marketing" replace />}
          />
          <Route path="/clients" element={<Navigate to="/work" replace />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
