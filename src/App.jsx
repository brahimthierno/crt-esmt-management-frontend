// import React, { useState, useEffect } from 'react';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import LoginPage from './components/auth/LoginPage';
// import Header from './components/layout/Header';
// import Sidebar from './components/layout/Sidebar';
// import Dashboard from './components/views/Dashboard';
// import InterventionsView from './components/views/InterventionsView';
// import PlanningView from './components/views/PlanningView';
// import StockView from './components/views/StockView';
// import UsersView from './components/views/UsersView';

// // Importation des services
// import * as interventionService from './services/interventionService';
// import * as userService from './services/userService';
// import * as stockService from './services/stockService';
// import * as empruntService from './services/empruntService';

// const AppContent = () => {
//   const { currentUser, logout, loading: authLoading } = useAuth();
  
//   const [interventions, setInterventions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [stock, setStock] = useState([]);
//   const [emprunts, setEmprunts] = useState([]);
  
//   const [activeView, setActiveView] = useState('dashboard');
//   const [filterDate, setFilterDate] = useState('');
//   const [filterStatut, setFilterStatut] = useState('');
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Charger les données au montage du composant
//   useEffect(() => {
//     if (currentUser) {
//       loadAllData();
//     }
//   }, [currentUser]);

//   const loadAllData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const [interventionsData, usersData, stockData, empruntsData] = await Promise.all([
//         interventionService.getInterventions(),
//         currentUser.role === 'admin' ? userService.getUsers() : Promise.resolve([]),
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);

//       setInterventions(interventionsData);
//       setUsers(usersData);
//       setStock(stockData);
//       setEmprunts(empruntsData);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Erreur lors du chargement des données');
//       console.error('Erreur:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Gestion des interventions
//   const addIntervention = async (intervention) => {
//     try {
//       const newIntervention = await interventionService.createIntervention(intervention);
//       setInterventions([...interventions, newIntervention]);
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la création' 
//       };
//     }
//   };

//   const updateIntervention = async (id, updatedData) => {
//     try {
//       const updated = await interventionService.updateIntervention(id, updatedData);
//       setInterventions(interventions.map(i => i._id === id ? updated : i));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la mise à jour' 
//       };
//     }
//   };

//   const deleteIntervention = async (id) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
//       try {
//         await interventionService.deleteIntervention(id);
//         setInterventions(interventions.filter(i => i._id !== id));
//         return { success: true };
//       } catch (err) {
//         return { 
//           success: false, 
//           message: err.response?.data?.message || 'Erreur lors de la suppression' 
//         };
//       }
//     }
//   };

//   // Gestion du stock
//   const updateStock = async (id, quantity) => {
//     try {
//       const updated = await stockService.updateMateriel(id, { quantite: quantity });
//       setStock(stock.map(s => s._id === id ? updated : s));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la mise à jour' 
//       };
//     }
//   };

//   const addEmprunt = async (emprunt) => {
//     try {
//       const newEmprunt = await empruntService.createEmprunt(emprunt);
//       setEmprunts([...emprunts, newEmprunt]);
      
//       // Mettre à jour le stock
//       await loadAllData();
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la création de l\'emprunt' 
//       };
//     }
//   };

//   const retournerEmprunt = async (empruntId) => {
//     try {
//       const updated = await empruntService.retournerEmprunt(empruntId);
//       setEmprunts(emprunts.map(e => e._id === empruntId ? updated : e));
      
//       // Mettre à jour le stock
//       await loadAllData();
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors du retour' 
//       };
//     }
//   };

//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl">Chargement...</div>
//       </div>
//     );
//   }

//   if (!currentUser) {
//     return <LoginPage />;
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl">Chargement des données...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl text-red-600">Erreur: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header currentUser={currentUser} onLogout={logout} />

//       <div className="container mx-auto px-4 py-6 flex gap-6">
//         <Sidebar 
//           activeView={activeView} 
//           setActiveView={setActiveView}
//           currentUser={currentUser}
//         />

//         <main className="flex-1">
//           {activeView === 'dashboard' && (
//             <Dashboard 
//               currentUser={currentUser}
//               interventions={interventions}
//               stock={stock}
//               emprunts={emprunts}
//             />
//           )}
          
//           {activeView === 'interventions' && (
//             <InterventionsView
//               currentUser={currentUser}
//               interventions={interventions}
//               users={users}
//               onAdd={addIntervention}
//               onUpdate={updateIntervention}
//               onDelete={deleteIntervention}
//               filterDate={filterDate}
//               setFilterDate={setFilterDate}
//               filterStatut={filterStatut}
//               setFilterStatut={setFilterStatut}
//             />
//           )}
          
//           {activeView === 'planning' && (
//             <PlanningView
//               interventions={interventions}
//               users={users}
//               currentUser={currentUser}
//             />
//           )}
          
//           {activeView === 'stock' && (
//             <StockView
//               stock={stock}
//               emprunts={emprunts}
//               onUpdateStock={updateStock}
//               onAddEmprunt={addEmprunt}
//               onRetourner={retournerEmprunt}
//               currentUser={currentUser}
//             />
//           )}
          
//           {activeView === 'users' && currentUser.role === 'admin' && (
//             <UsersView
//               users={users}
//               setUsers={setUsers}
//             />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// };

// export default App;


// VERSION DEEPSEEK 1


import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/auth/LoginPage';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/views/Dashboard';
import InterventionsView from './components/views/InterventionsView';
import PlanningView from './components/views/PlanningView';
import StockView from './components/views/StockView';
import UsersView from './components/views/UsersView';

// Importation des services
import * as interventionService from './services/interventionService';
import * as userService from './services/userService';
import * as stockService from './services/stockService';
import * as empruntService from './services/empruntService';

const AppContent = () => {
  const { currentUser, logout, loading: authLoading } = useAuth();
  
  const [interventions, setInterventions] = useState([]);
  const [users, setUsers] = useState([]);
  const [stock, setStock] = useState([]);
  const [emprunts, setEmprunts] = useState([]);
  
  const [activeView, setActiveView] = useState('dashboard');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les données au montage du composant
  useEffect(() => {
    if (currentUser) {
      loadAllData();
    }
  }, [currentUser]);

  const loadAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [interventionsData, usersData, stockData, empruntsData] = await Promise.all([
        interventionService.getInterventions(),
        currentUser.role === 'admin' ? userService.getUsers() : Promise.resolve([]),
        stockService.getStock(),
        empruntService.getEmprunts()
      ]);

      setInterventions(interventionsData);
      setUsers(usersData);
      setStock(stockData);
      setEmprunts(empruntsData);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des données');
      console.error('Erreur:', err);
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
      
      // Mettre à jour le stock
      await loadAllData();
      
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
      
      // Mettre à jour le stock
      await loadAllData();
      
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
      
      // Mettre à jour le stock
      await loadAllData();
      
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erreur lors de la modification de l\'emprunt' 
      };
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginPage />;
  }

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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} onLogout={logout} />

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
              onUpdateStock={updateMateriel} // Maintenant on utilise updateMateriel
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
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;