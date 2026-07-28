import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-700.css';
import './styles.css';
import Layout from './components/Layout';
import { About, Camps, Classes, Contact, DanceTeams, Dates, Home, MusicalTheatre, NotFound, Parties, Pricing } from './pages/Pages';

const Router = import.meta.env.BASE_URL === '/' ? BrowserRouter : HashRouter;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dance-teams" element={<DanceTeams />} />
          <Route path="/musical-theatre" element={<MusicalTheatre />} />
          <Route path="/summer-camp" element={<Camps />} />
          <Route path="/camps-performances" element={<Navigate to="/summer-camp" replace />} />
          <Route path="/parties-rentals" element={<Parties />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/important-dates" element={<Dates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>,
);
