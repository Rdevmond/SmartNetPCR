import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { dbService } from './services/dbService';

// Lazy load pages for performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const PredictForm = lazy(() => import('./pages/PredictForm'));
const Predictprecision = lazy(() => import('./pages/PredictPrecision'));
const PredictResult = lazy(() => import('./pages/PredictResult'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DecisionTree = lazy(() => import('./pages/DecisionTree'));
const About = lazy(() => import('./pages/About'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-[#003366] rounded-full animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-[#003366]">PCR</div>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    dbService.init();
  }, []);

  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/predict" element={<PredictForm />} />
            <Route path="/predict-precision" element={<Predictprecision />} />
            <Route path="/result/:id" element={<PredictResult />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tree" element={<DecisionTree />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
