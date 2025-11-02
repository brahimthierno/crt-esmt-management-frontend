// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

// Pages publiques (avant login)
import HomePage from './components/pages/HomePage';
import DemandeAnonymePage from './components/pages/DemandeAnonymePage';
import SuiviDemandePage from './components/pages/SuiviDemandePage';

// Pages authentifiées
import App from './App'; // Ton App.jsx actuelle
import LoginPage from './components/auth/LoginPage';

// Composant pour protéger les routes authentifiées
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Composant pour rediriger si déjà connecté
const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if (currentUser) {
    return <Navigate to="/app" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* ========== ROUTES PUBLIQUES (avant login) ========== */}
      
      {/* Page d'accueil */}
      <Route
        path="/"
        element={<HomePage />}
      />

      {/* Demander une intervention (anonyme) */}
      <Route
        path="/demande-anonyme"
        element={<DemandeAnonymePage />}
      />

      {/* Suivre une demande */}
      <Route
        path="/suivi-demande"
        element={<SuiviDemandePage />}
      />

      {/* Connexion */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* ========== ROUTES PROTÉGÉES (après login) ========== */}
      
      {/* Application principale (Dashboard, Interventions, etc.) */}
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />

      {/* ========== REDIRECTION PAR DÉFAUT ========== */}
      
      {/* Si URL inconnue, rediriger vers accueil */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const Root = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);