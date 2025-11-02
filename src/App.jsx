
// NOUVELLE VERSION AVEC DEEPSEEK POUR LE SYSTEME DE NOTIFICATIONS


import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/views/Dashboard';
import InterventionsView from './components/views/InterventionsView';
import PlanningView from './components/views/PlanningView';
import StockView from './components/views/StockView';
import UsersView from './components/views/UsersView';
import DemandesView from './components/views/DemandesView';
import SettingsView from './components/views/SettingsView';
import ProfileView from './components/views/ProfileView';
import NotificationContainer from './components/NotificationContainer';
import HistoriqueEmpruntsView from './components/views/HistoriqueEmpruntsView';


// Importation des services
import * as interventionService from './services/interventionService';
import * as userService from './services/userService';
import * as stockService from './services/stockService';
import * as empruntService from './services/empruntService';

const App = () => {
  const { currentUser, logout, updateCurrentUser } = useAuth();
  
  const [interventions, setInterventions] = useState([]);
  const [users, setUsers] = useState([]);
  const [stock, setStock] = useState([]);
  const [emprunts, setEmprunts] = useState([]);
  
  const [activeView, setActiveView] = useState('dashboard');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Utiliser useRef pour éviter la boucle infinie
  const hasLoadedData = useRef(false);

  // Fonction pour récupérer le token
  const getAuthToken = () => {
    return localStorage.getItem('authToken') || localStorage.getItem('token');
  };

  // Charger les données au montage du composant UNIQUEMENT
  useEffect(() => {
    if (currentUser && !hasLoadedData.current) {
      hasLoadedData.current = true;
      loadAllData();
    }
  }, [currentUser]);

  const loadAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Début du chargement des données...');
      
      const token = getAuthToken();
      if (!token) {
        console.warn('⚠️ Token non trouvé dans le localStorage');
        setError('Erreur d\'authentification. Veuillez vous reconnecter.');
        hasLoadedData.current = false;
        return;
      }
      
      // 1️⃣ Charger les informations de l'utilisateur actuel via /api/auth/me
      try {
        const userResponse = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          
          if (userData.success && userData.data) {
            // ✅ NE PAS appeler updateCurrentUser ici pour éviter la boucle
            // Les données de currentUser sont déjà à jour via le contexte Auth
            console.log('✅ Données utilisateur vérifiées:', userData.data);
          }
        } else {
          console.warn('⚠️ Impossible de charger les données utilisateur:', userResponse.status);
        }
      } catch (err) {
        console.warn('⚠️ Erreur lors du chargement des données utilisateur:', err);
        // On continue même si ça échoue
      }

      // 2️⃣ Charger les autres données avec gestion d'erreur individuelle
      const dataPromises = [
        interventionService.getInterventions().catch(err => {
          console.error('❌ Erreur interventions:', err);
          return [];
        }),
        currentUser.role === 'admin' 
          ? userService.getUsers().catch(err => {
              console.error('❌ Erreur users:', err);
              return [];
            })
          : Promise.resolve([]),
        stockService.getStock().catch(err => {
          console.error('❌ Erreur stock:', err);
          return [];
        }),
        empruntService.getEmprunts().catch(err => {
          console.error('❌ Erreur emprunts:', err);
          return [];
        })
      ];

      const [interventionsData, usersData, stockData, empruntsData] = await Promise.all(dataPromises);

      setInterventions(interventionsData);
      setUsers(usersData);
      setStock(stockData);
      setEmprunts(empruntsData);
      
      console.log('✅ Toutes les données chargées avec succès');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erreur lors du chargement des données');
      console.error('❌ Erreur:', err);
      hasLoadedData.current = false;
    } finally {
      setLoading(false);
    }
  };

  // Gestion des interventions
  const addIntervention = async (intervention) => {
    try {
      const newIntervention = await interventionService.createIntervention(intervention);
      setInterventions([...interventions, newIntervention]);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erreur lors de la création' 
      };
    }
  };

  const updateIntervention = async (id, updatedData) => {
    try {
      const updated = await interventionService.updateIntervention(id, updatedData);
      setInterventions(interventions.map(i => i._id === id ? updated : i));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erreur lors de la mise à jour' 
      };
    }
  };

  const deleteIntervention = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
      try {
        await interventionService.deleteIntervention(id);
        setInterventions(interventions.filter(i => i._id !== id));
        return { success: true };
      } catch (err) {
        return { 
          success: false, 
          message: err.response?.data?.message || 'Erreur lors de la suppression' 
        };
      }
    }
  };

  // Gestion du stock - FONCTION EXISTANTE (gardée pour compatibilité)
  const updateStock = async (id, quantity) => {
    try {
      const updated = await stockService.updateMateriel(id, { quantite: quantity });
      setStock(stock.map(s => s._id === id ? updated : s));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erreur lors de la mise à jour' 
      };
    }
  };

  // NOUVELLES FONCTIONS POUR LA GESTION COMPLÈTE DES MATÉRIELS
  const addMateriel = async (materielData) => {
    try {
      const newMateriel = await stockService.createMateriel(materielData);
      setStock([...stock, newMateriel]);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erreur lors de l\'ajout du matériel' 
      };
    }
  };

  const updateMateriel = async (id, updatedData) => {
    try {
      const updated = await stockService.updateMateriel(id, updatedData);
      setStock(stock.map(s => s._id === id ? updated : s));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erreur lors de la mise à jour du matériel' 
      };
    }
  };

  const deleteMateriel = async (id) => {
    try {
      await stockService.deleteMateriel(id);
      setStock(stock.filter(s => s._id !== id));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erreur lors de la suppression du matériel' 
      };
    }
  };

  // Gestion des emprunts
  const addEmprunt = async (emprunt) => {
    try {
      const newEmprunt = await empruntService.createEmprunt(emprunt);
      setEmprunts([...emprunts, newEmprunt]);
      
      // Recharger uniquement le stock et les emprunts
      const [stockData, empruntsData] = await Promise.all([
        stockService.getStock(),
        empruntService.getEmprunts()
      ]);
      setStock(stockData);
      setEmprunts(empruntsData);
      
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erreur lors de la création de l\'emprunt' 
      };
    }
  };

  const retournerEmprunt = async (empruntId) => {
    try {
      const updated = await empruntService.retournerEmprunt(empruntId);
      setEmprunts(emprunts.map(e => e._id === empruntId ? updated : e));
      
      // Recharger uniquement le stock et les emprunts
      const [stockData, empruntsData] = await Promise.all([
        stockService.getStock(),
        empruntService.getEmprunts()
      ]);
      setStock(stockData);
      setEmprunts(empruntsData);
      
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erreur lors du retour' 
      };
    }
  };

  // NOUVELLE FONCTION POUR MODIFIER LES EMPRUNTS
  const updateEmprunt = async (empruntId, updatedData) => {
    try {
      const updated = await empruntService.updateEmprunt(empruntId, updatedData);
      setEmprunts(emprunts.map(e => e._id === empruntId ? updated : e));
      
      // Recharger uniquement le stock et les emprunts
      const [stockData, empruntsData] = await Promise.all([
        stockService.getStock(),
        empruntService.getEmprunts()
      ]);
      setStock(stockData);
      setEmprunts(empruntsData);
      
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erreur lors de la modification de l\'emprunt' 
      };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement des données...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Erreur: {error}</div>
        <button 
          onClick={() => {
            hasLoadedData.current = false;
            window.location.reload();
          }} 
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          currentUser={currentUser} 
          onLogout={logout}
          setActiveView={setActiveView}
        />

        <div className="container mx-auto px-4 py-6 flex gap-6">
          <Sidebar 
            activeView={activeView} 
            setActiveView={setActiveView}
            currentUser={currentUser}
          />

          <main className="flex-1">
            {activeView === 'dashboard' && (
              <Dashboard 
                currentUser={currentUser}
                interventions={interventions}
                stock={stock}
                emprunts={emprunts}
              />
            )}

            {activeView === 'historique-emprunts' && (
              <HistoriqueEmpruntsView
                emprunts={emprunts}
                stock={stock}
                currentUser={currentUser}
              />
            )}
            
            {activeView === 'interventions' && (
              <InterventionsView
                currentUser={currentUser}
                interventions={interventions}
                users={users}
                onAdd={addIntervention}
                onUpdate={updateIntervention}
                onDelete={deleteIntervention}
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                filterStatut={filterStatut}
                setFilterStatut={setFilterStatut}
              />
            )}
            
            {activeView === 'planning' && (
              <PlanningView
                interventions={interventions}
                users={users}
                currentUser={currentUser}
              />
            )}
            
            {activeView === 'stock' && (
              <StockView
                stock={stock}
                emprunts={emprunts}
                onUpdateStock={updateMateriel}
                onAddEmprunt={addEmprunt}
                onRetourner={retournerEmprunt}
                onUpdateEmprunt={updateEmprunt}
                onDeleteMateriel={deleteMateriel}
                onAddMateriel={addMateriel}
                currentUser={currentUser}
              />
            )}
            
            {activeView === 'users' && currentUser.role === 'admin' && (
              <UsersView
                users={users}
                setUsers={setUsers}
              />
            )}

            {activeView === 'demandes' && currentUser.role === 'admin' && (
              <DemandesView />
            )}

            {activeView === 'settings' && (
              <SettingsView 
                currentUser={currentUser} 
                onLogout={logout}
              />
            )}

            {activeView === 'profile' && (
              <ProfileView 
                currentUser={currentUser}
                setActiveView={setActiveView}
                onProfileUpdate={async () => {
                  // Recharger uniquement les données nécessaires
                  const [stockData, empruntsData, interventionsData] = await Promise.all([
                    stockService.getStock(),
                    empruntService.getEmprunts(),
                    interventionService.getInterventions()
                  ]);
                  setStock(stockData);
                  setEmprunts(empruntsData);
                  setInterventions(interventionsData);
                }}
              />
            )}
          </main>
        </div>

        {/* Container pour les notifications */}
        <NotificationContainer />
      </div>
    </NotificationProvider>
  );
};

export default App;