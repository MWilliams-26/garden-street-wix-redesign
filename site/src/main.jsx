import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-700.css';
import './styles.css';
import Layout from './components/Layout';
import { About, Camps, Classes, Contact, Dates, Home, MusicalTheatre, NotFound, Parties } from './pages/Pages';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/musical-theatre" element={<MusicalTheatre />} />
          <Route path="/camps-performances" element={<Camps />} />
          <Route path="/parties-rentals" element={<Parties />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/important-dates" element={<Dates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
);
