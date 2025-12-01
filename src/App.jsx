
// NOUVELLE VERSION AVEC DEEPSEEK POUR LE SYSTEME DE NOTIFICATIONS


// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from './context/AuthContext';
// import { NotificationProvider } from './context/NotificationContext';
// import Header from './components/layout/Header';
// import Sidebar from './components/layout/Sidebar';
// import Dashboard from './components/views/Dashboard';
// import InterventionsView from './components/views/InterventionsView';
// import PlanningView from './components/views/PlanningView';
// import StockView from './components/views/StockView';
// import UsersView from './components/views/UsersView';
// import DemandesView from './components/views/DemandesView';
// import SettingsView from './components/views/SettingsView';
// import ProfileView from './components/views/ProfileView';
// import NotificationContainer from './components/NotificationContainer';
// import HistoriqueEmpruntsView from './components/views/HistoriqueEmpruntsView';


// // Importation des services
// import * as interventionService from './services/interventionService';
// import * as userService from './services/userService';
// import * as stockService from './services/stockService';
// import * as empruntService from './services/empruntService';

// const App = () => {
//   const { currentUser, logout, updateCurrentUser } = useAuth();
  
//   const [interventions, setInterventions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [stock, setStock] = useState([]);
//   const [emprunts, setEmprunts] = useState([]);
  
//   const [activeView, setActiveView] = useState('dashboard');
//   const [filterDate, setFilterDate] = useState('');
//   const [filterStatut, setFilterStatut] = useState('');
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Utiliser useRef pour éviter la boucle infinie
//   const hasLoadedData = useRef(false);

//   // Fonction pour récupérer le token
//   const getAuthToken = () => {
//     return localStorage.getItem('authToken') || localStorage.getItem('token');
//   };

//   // Charger les données au montage du composant UNIQUEMENT
//   useEffect(() => {
//     if (currentUser && !hasLoadedData.current) {
//       hasLoadedData.current = true;
//       loadAllData();
//     }
//   }, [currentUser]);

//   const loadAllData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       console.log('🔄 Début du chargement des données...');
      
//       const token = getAuthToken();
//       if (!token) {
//         console.warn('⚠️ Token non trouvé dans le localStorage');
//         setError('Erreur d\'authentification. Veuillez vous reconnecter.');
//         hasLoadedData.current = false;
//         return;
//       }
      
//       // 1️⃣ Charger les informations de l'utilisateur actuel via /api/auth/me
//       try {
//         const userResponse = await fetch('http://localhost:5000/api/auth/me', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
          
//           if (userData.success && userData.data) {
//             // ✅ NE PAS appeler updateCurrentUser ici pour éviter la boucle
//             // Les données de currentUser sont déjà à jour via le contexte Auth
//             console.log('✅ Données utilisateur vérifiées:', userData.data);
//           }
//         } else {
//           console.warn('⚠️ Impossible de charger les données utilisateur:', userResponse.status);
//         }
//       } catch (err) {
//         console.warn('⚠️ Erreur lors du chargement des données utilisateur:', err);
//         // On continue même si ça échoue
//       }

//       // 2️⃣ Charger les autres données avec gestion d'erreur individuelle
//       const dataPromises = [
//         interventionService.getInterventions().catch(err => {
//           console.error('❌ Erreur interventions:', err);
//           return [];
//         }),
//         currentUser.role === 'admin' 
//           ? userService.getUsers().catch(err => {
//               console.error('❌ Erreur users:', err);
//               return [];
//             })
//           : Promise.resolve([]),
//         stockService.getStock().catch(err => {
//           console.error('❌ Erreur stock:', err);
//           return [];
//         }),
//         empruntService.getEmprunts().catch(err => {
//           console.error('❌ Erreur emprunts:', err);
//           return [];
//         })
//       ];

//       const [interventionsData, usersData, stockData, empruntsData] = await Promise.all(dataPromises);

//       setInterventions(interventionsData);
//       setUsers(usersData);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       console.log('✅ Toutes les données chargées avec succès');
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Erreur lors du chargement des données');
//       console.error('❌ Erreur:', err);
//       hasLoadedData.current = false;
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

//   // Gestion du stock - FONCTION EXISTANTE (gardée pour compatibilité)
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

//   // NOUVELLES FONCTIONS POUR LA GESTION COMPLÈTE DES MATÉRIELS
//   const addMateriel = async (materielData) => {
//     try {
//       const newMateriel = await stockService.createMateriel(materielData);
//       setStock([...stock, newMateriel]);
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de l\'ajout du matériel' 
//       };
//     }
//   };

//   const updateMateriel = async (id, updatedData) => {
//     try {
//       const updated = await stockService.updateMateriel(id, updatedData);
//       setStock(stock.map(s => s._id === id ? updated : s));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la mise à jour du matériel' 
//       };
//     }
//   };

//   const deleteMateriel = async (id) => {
//     try {
//       await stockService.deleteMateriel(id);
//       setStock(stock.filter(s => s._id !== id));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la suppression du matériel' 
//       };
//     }
//   };

//   // Gestion des emprunts
//   const addEmprunt = async (emprunt) => {
//     try {
//       const newEmprunt = await empruntService.createEmprunt(emprunt);
//       setEmprunts([...emprunts, newEmprunt]);
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
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
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors du retour' 
//       };
//     }
//   };

//   // NOUVELLE FONCTION POUR MODIFIER LES EMPRUNTS
//   const updateEmprunt = async (empruntId, updatedData) => {
//     try {
//       const updated = await empruntService.updateEmprunt(empruntId, updatedData);
//       setEmprunts(emprunts.map(e => e._id === empruntId ? updated : e));
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la modification de l\'emprunt' 
//       };
//     }
//   };

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
//         <button 
//           onClick={() => {
//             hasLoadedData.current = false;
//             window.location.reload();
//           }} 
//           className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Réessayer
//         </button>
//       </div>
//     );
//   }

//   return (
//     <NotificationProvider>
//       <div className="min-h-screen bg-gray-50">
//         <Header 
//           currentUser={currentUser} 
//           onLogout={logout}
//           setActiveView={setActiveView}
//         />

//         <div className="container mx-auto px-4 py-6 flex gap-6">
//           <Sidebar 
//             activeView={activeView} 
//             setActiveView={setActiveView}
//             currentUser={currentUser}
//           />

//           <main className="flex-1">
//             {activeView === 'dashboard' && (
//               <Dashboard 
//                 currentUser={currentUser}
//                 interventions={interventions}
//                 stock={stock}
//                 emprunts={emprunts}
//               />
//             )}

//             {activeView === 'historique-emprunts' && (
//               <HistoriqueEmpruntsView
//                 emprunts={emprunts}
//                 stock={stock}
//                 currentUser={currentUser}
//               />
//             )}
            
//             {activeView === 'interventions' && (
//               <InterventionsView
//                 currentUser={currentUser}
//                 interventions={interventions}
//                 users={users}
//                 onAdd={addIntervention}
//                 onUpdate={updateIntervention}
//                 onDelete={deleteIntervention}
//                 filterDate={filterDate}
//                 setFilterDate={setFilterDate}
//                 filterStatut={filterStatut}
//                 setFilterStatut={setFilterStatut}
//               />
//             )}
            
//             {activeView === 'planning' && (
//               <PlanningView
//                 interventions={interventions}
//                 users={users}
//                 currentUser={currentUser}
//               />
//             )}
            
//             {activeView === 'stock' && (
//               <StockView
//                 stock={stock}
//                 emprunts={emprunts}
//                 onUpdateStock={updateMateriel}
//                 onAddEmprunt={addEmprunt}
//                 onRetourner={retournerEmprunt}
//                 onUpdateEmprunt={updateEmprunt}
//                 onDeleteMateriel={deleteMateriel}
//                 onAddMateriel={addMateriel}
//                 currentUser={currentUser}
//               />
//             )}
            
//             {activeView === 'users' && currentUser.role === 'admin' && (
//               <UsersView
//                 users={users}
//                 setUsers={setUsers}
//               />
//             )}

//             {activeView === 'demandes' && currentUser.role === 'admin' && (
//               <DemandesView />
//             )}

//             {activeView === 'settings' && (
//               <SettingsView 
//                 currentUser={currentUser} 
//                 onLogout={logout}
//               />
//             )}

//             {activeView === 'profile' && (
//               <ProfileView 
//                 currentUser={currentUser}
//                 setActiveView={setActiveView}
//                 onProfileUpdate={async () => {
//                   // Recharger uniquement les données nécessaires
//                   const [stockData, empruntsData, interventionsData] = await Promise.all([
//                     stockService.getStock(),
//                     empruntService.getEmprunts(),
//                     interventionService.getInterventions()
//                   ]);
//                   setStock(stockData);
//                   setEmprunts(empruntsData);
//                   setInterventions(interventionsData);
//                 }}
//               />
//             )}
//           </main>
//         </div>

//         {/* Container pour les notifications */}
//         <NotificationContainer />
//       </div>
//     </NotificationProvider>
//   );
// };

// export default App;


// VERSION AVEC LE MODE SOMBRE


// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from './context/AuthContext';
// import { NotificationProvider } from './context/NotificationContext';
// import { ThemeProvider } from './context/ThemeContext';
// import Header from './components/layout/Header';
// import Sidebar from './components/layout/Sidebar';
// import Dashboard from './components/views/Dashboard';
// import InterventionsView from './components/views/InterventionsView';
// import PlanningView from './components/views/PlanningView';
// import StockView from './components/views/StockView';
// import UsersView from './components/views/UsersView';
// import DemandesView from './components/views/DemandesView';
// import SettingsView from './components/views/SettingsView';
// import ProfileView from './components/views/ProfileView';
// import NotificationContainer from './components/NotificationContainer';
// import HistoriqueEmpruntsView from './components/views/HistoriqueEmpruntsView';

// // Importation des services
// import * as interventionService from './services/interventionService';
// import * as userService from './services/userService';
// import * as stockService from './services/stockService';
// import * as empruntService from './services/empruntService';

// const App = () => {
//   const { currentUser, logout, updateCurrentUser } = useAuth();
  
//   const [interventions, setInterventions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [stock, setStock] = useState([]);
//   const [emprunts, setEmprunts] = useState([]);
  
//   const [activeView, setActiveView] = useState('dashboard');
//   const [filterDate, setFilterDate] = useState('');
//   const [filterStatut, setFilterStatut] = useState('');
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Utiliser useRef pour éviter la boucle infinie
//   const hasLoadedData = useRef(false);

//   // Fonction pour récupérer le token
//   const getAuthToken = () => {
//     return localStorage.getItem('authToken') || localStorage.getItem('token');
//   };

//   // Charger les données au montage du composant UNIQUEMENT
//   useEffect(() => {
//     if (currentUser && !hasLoadedData.current) {
//       hasLoadedData.current = true;
//       loadAllData();
//     }
//   }, [currentUser]);

//   const loadAllData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       console.log('🔄 Début du chargement des données...');
      
//       const token = getAuthToken();
//       if (!token) {
//         console.warn('⚠️ Token non trouvé dans le localStorage');
//         setError('Erreur d\'authentification. Veuillez vous reconnecter.');
//         hasLoadedData.current = false;
//         return;
//       }
      
//       // 1️⃣ Charger les informations de l'utilisateur actuel via /api/auth/me
//       try {
//         const userResponse = await fetch('http://localhost:5000/api/auth/me', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
          
//           if (userData.success && userData.data) {
//             // ✅ NE PAS appeler updateCurrentUser ici pour éviter la boucle
//             // Les données de currentUser sont déjà à jour via le contexte Auth
//             console.log('✅ Données utilisateur vérifiées:', userData.data);
//           }
//         } else {
//           console.warn('⚠️ Impossible de charger les données utilisateur:', userResponse.status);
//         }
//       } catch (err) {
//         console.warn('⚠️ Erreur lors du chargement des données utilisateur:', err);
//         // On continue même si ça échoue
//       }

//       // 2️⃣ Charger les autres données avec gestion d'erreur individuelle
//       const dataPromises = [
//         interventionService.getInterventions().catch(err => {
//           console.error('❌ Erreur interventions:', err);
//           return [];
//         }),
//         currentUser.role === 'admin' 
//           ? userService.getUsers().catch(err => {
//               console.error('❌ Erreur users:', err);
//               return [];
//             })
//           : Promise.resolve([]),
//         stockService.getStock().catch(err => {
//           console.error('❌ Erreur stock:', err);
//           return [];
//         }),
//         empruntService.getEmprunts().catch(err => {
//           console.error('❌ Erreur emprunts:', err);
//           return [];
//         })
//       ];

//       const [interventionsData, usersData, stockData, empruntsData] = await Promise.all(dataPromises);

//       setInterventions(interventionsData);
//       setUsers(usersData);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       console.log('✅ Toutes les données chargées avec succès');
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Erreur lors du chargement des données');
//       console.error('❌ Erreur:', err);
//       hasLoadedData.current = false;
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

//   // Gestion du stock - FONCTION EXISTANTE (gardée pour compatibilité)
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

//   // NOUVELLES FONCTIONS POUR LA GESTION COMPLÈTE DES MATÉRIELS
//   const addMateriel = async (materielData) => {
//     try {
//       const newMateriel = await stockService.createMateriel(materielData);
//       setStock([...stock, newMateriel]);
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de l\'ajout du matériel' 
//       };
//     }
//   };

//   const updateMateriel = async (id, updatedData) => {
//     try {
//       const updated = await stockService.updateMateriel(id, updatedData);
//       setStock(stock.map(s => s._id === id ? updated : s));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la mise à jour du matériel' 
//       };
//     }
//   };

//   const deleteMateriel = async (id) => {
//     try {
//       await stockService.deleteMateriel(id);
//       setStock(stock.filter(s => s._id !== id));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la suppression du matériel' 
//       };
//     }
//   };

//   // Gestion des emprunts
//   const addEmprunt = async (emprunt) => {
//     try {
//       const newEmprunt = await empruntService.createEmprunt(emprunt);
//       setEmprunts([...emprunts, newEmprunt]);
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
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
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors du retour' 
//       };
//     }
//   };

//   // NOUVELLE FONCTION POUR MODIFIER LES EMPRUNTS
//   const updateEmprunt = async (empruntId, updatedData) => {
//     try {
//       const updated = await empruntService.updateEmprunt(empruntId, updatedData);
//       setEmprunts(emprunts.map(e => e._id === empruntId ? updated : e));
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la modification de l\'emprunt' 
//       };
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-xl dark:text-white">Chargement des données...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-xl text-red-600 dark:text-red-400">Erreur: {error}</div>
//         <button 
//           onClick={() => {
//             hasLoadedData.current = false;
//             window.location.reload();
//           }} 
//           className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
//         >
//           Réessayer
//         </button>
//       </div>
//     );
//   }

//   return (
//     <ThemeProvider>
//       <NotificationProvider>
//         <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//           <Header 
//             currentUser={currentUser} 
//             onLogout={logout}
//             setActiveView={setActiveView}
//           />

//           <div className="container mx-auto px-4 py-6 flex gap-6">
//             <Sidebar 
//               activeView={activeView} 
//               setActiveView={setActiveView}
//               currentUser={currentUser}
//             />

//             <main className="flex-1">
//               {activeView === 'dashboard' && (
//                 <Dashboard 
//                   currentUser={currentUser}
//                   interventions={interventions}
//                   stock={stock}
//                   emprunts={emprunts}
//                 />
//               )}

//               {activeView === 'historique-emprunts' && (
//                 <HistoriqueEmpruntsView
//                   emprunts={emprunts}
//                   stock={stock}
//                   currentUser={currentUser}
//                 />
//               )}
              
//               {activeView === 'interventions' && (
//                 <InterventionsView
//                   currentUser={currentUser}
//                   interventions={interventions}
//                   users={users}
//                   onAdd={addIntervention}
//                   onUpdate={updateIntervention}
//                   onDelete={deleteIntervention}
//                   filterDate={filterDate}
//                   setFilterDate={setFilterDate}
//                   filterStatut={filterStatut}
//                   setFilterStatut={setFilterStatut}
//                 />
//               )}
              
//               {activeView === 'planning' && (
//                 <PlanningView
//                   interventions={interventions}
//                   users={users}
//                   currentUser={currentUser}
//                 />
//               )}
              
//               {activeView === 'stock' && (
//                 <StockView
//                   stock={stock}
//                   emprunts={emprunts}
//                   onUpdateStock={updateMateriel}
//                   onAddEmprunt={addEmprunt}
//                   onRetourner={retournerEmprunt}
//                   onUpdateEmprunt={updateEmprunt}
//                   onDeleteMateriel={deleteMateriel}
//                   onAddMateriel={addMateriel}
//                   currentUser={currentUser}
//                 />
//               )}
              
//               {activeView === 'users' && currentUser.role === 'admin' && (
//                 <UsersView
//                   users={users}
//                   setUsers={setUsers}
//                 />
//               )}

//               {activeView === 'demandes' && currentUser.role === 'admin' && (
//                 <DemandesView />
//               )}

//               {activeView === 'settings' && (
//                 <SettingsView 
//                   currentUser={currentUser} 
//                   onLogout={logout}
//                 />
//               )}

//               {activeView === 'profile' && (
//                 <ProfileView 
//                   currentUser={currentUser}
//                   setActiveView={setActiveView}
//                   onProfileUpdate={async () => {
//                     // Recharger uniquement les données nécessaires
//                     const [stockData, empruntsData, interventionsData] = await Promise.all([
//                       stockService.getStock(),
//                       empruntService.getEmprunts(),
//                       interventionService.getInterventions()
//                     ]);
//                     setStock(stockData);
//                     setEmprunts(empruntsData);
//                     setInterventions(interventionsData);
//                   }}
//                 />
//               )}
//             </main>
//           </div>

//           {/* Container pour les notifications */}
//           <NotificationContainer />
//         </div>
//       </NotificationProvider>
//     </ThemeProvider>
//   );
// };

// export default App;


// INTEGRATION DE UPLOADS DE FICHIERS


// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from './context/AuthContext';
// import { NotificationProvider } from './context/NotificationContext';
// import { ThemeProvider } from './context/ThemeContext';
// import Header from './components/layout/Header';
// import Sidebar from './components/layout/Sidebar';
// import Dashboard from './components/views/Dashboard';
// import InterventionsView from './components/views/InterventionsView';
// import PlanningView from './components/views/PlanningView';
// import StockView from './components/views/StockView';
// import UsersView from './components/views/UsersView';
// import DemandesView from './components/views/DemandesView';
// import SettingsView from './components/views/SettingsView';
// import ProfileView from './components/views/ProfileView';
// import NotificationContainer from './components/NotificationContainer';
// import HistoriqueEmpruntsView from './components/views/HistoriqueEmpruntsView';


// // Importation des services
// import * as interventionService from './services/interventionService';
// import * as userService from './services/userService';
// import * as stockService from './services/stockService';
// import * as empruntService from './services/empruntService';

// const App = () => {
//   const { currentUser, logout, updateCurrentUser } = useAuth();
  
//   const [interventions, setInterventions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [stock, setStock] = useState([]);
//   const [emprunts, setEmprunts] = useState([]);
  
//   const [activeView, setActiveView] = useState('dashboard');
//   const [filterDate, setFilterDate] = useState('');
//   const [filterStatut, setFilterStatut] = useState('');
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Utiliser useRef pour éviter la boucle infinie
//   const hasLoadedData = useRef(false);

//   // Fonction pour récupérer le token
//   const getAuthToken = () => {
//     return localStorage.getItem('authToken') || localStorage.getItem('token');
//   };

//   // Charger les données au montage du composant UNIQUEMENT
//   useEffect(() => {
//     if (currentUser && !hasLoadedData.current) {
//       hasLoadedData.current = true;
//       loadAllData();
//     }
//   }, [currentUser]);

//   const loadAllData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       console.log('🔄 Début du chargement des données...');
      
//       const token = getAuthToken();
//       if (!token) {
//         console.warn('⚠️ Token non trouvé dans le localStorage');
//         setError('Erreur d\'authentification. Veuillez vous reconnecter.');
//         hasLoadedData.current = false;
//         return;
//       }
      
//       // 1️⃣ Charger les informations de l'utilisateur actuel via /api/auth/me
//       try {
//         const userResponse = await fetch('http://localhost:5000/api/auth/me', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
          
//           if (userData.success && userData.data) {
//             console.log('✅ Données utilisateur vérifiées:', userData.data);
//           }
//         } else {
//           console.warn('⚠️ Impossible de charger les données utilisateur:', userResponse.status);
//         }
//       } catch (err) {
//         console.warn('⚠️ Erreur lors du chargement des données utilisateur:', err);
//         // On continue même si ça échoue
//       }

//       // 2️⃣ Charger les autres données avec gestion d'erreur individuelle
//       const dataPromises = [
//         interventionService.getInterventions().catch(err => {
//           console.error('❌ Erreur interventions:', err);
//           return [];
//         }),
//         currentUser.role === 'admin' 
//           ? userService.getUsers().catch(err => {
//               console.error('❌ Erreur users:', err);
//               return [];
//             })
//           : Promise.resolve([]),
//         stockService.getStock().catch(err => {
//           console.error('❌ Erreur stock:', err);
//           return [];
//         }),
//         empruntService.getEmprunts().catch(err => {
//           console.error('❌ Erreur emprunts:', err);
//           return [];
//         })
//       ];

//       const [interventionsData, usersData, stockData, empruntsData] = await Promise.all(dataPromises);

//       setInterventions(interventionsData);
//       setUsers(usersData);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       console.log('✅ Toutes les données chargées avec succès');
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Erreur lors du chargement des données');
//       console.error('❌ Erreur:', err);
//       hasLoadedData.current = false;
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

//   // Gestion du stock - FONCTION EXISTANTE (gardée pour compatibilité)
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

//   // NOUVELLES FONCTIONS POUR LA GESTION COMPLÈTE DES MATÉRIELS
//   const addMateriel = async (materielData) => {
//     try {
//       const newMateriel = await stockService.createMateriel(materielData);
//       setStock([...stock, newMateriel]);
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de l\'ajout du matériel' 
//       };
//     }
//   };

//   const updateMateriel = async (id, updatedData) => {
//     try {
//       const updated = await stockService.updateMateriel(id, updatedData);
//       setStock(stock.map(s => s._id === id ? updated : s));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la mise à jour du matériel' 
//       };
//     }
//   };

//   const deleteMateriel = async (id) => {
//     try {
//       await stockService.deleteMateriel(id);
//       setStock(stock.filter(s => s._id !== id));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la suppression du matériel' 
//       };
//     }
//   };

//   // Gestion des emprunts
//   const addEmprunt = async (emprunt) => {
//     try {
//       const newEmprunt = await empruntService.createEmprunt(emprunt);
//       setEmprunts([...emprunts, newEmprunt]);
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
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
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors du retour' 
//       };
//     }
//   };

//   // NOUVELLE FONCTION POUR MODIFIER LES EMPRUNTS
//   const updateEmprunt = async (empruntId, updatedData) => {
//     try {
//       const updated = await empruntService.updateEmprunt(empruntId, updatedData);
//       setEmprunts(emprunts.map(e => e._id === empruntId ? updated : e));
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la modification de l\'emprunt' 
//       };
//     }
//   };

//   // 🔄 FONCTION POUR RECHARGER LES DONNÉES SPÉCIFIQUES
//   const reloadData = async (dataTypes = ['all']) => {
//     try {
//       console.log('🔄 Rechargement des données:', dataTypes);
      
//       const promises = [];
      
//       if (dataTypes.includes('all') || dataTypes.includes('interventions')) {
//         promises.push(
//           interventionService.getInterventions()
//             .then(data => setInterventions(data))
//             .catch(err => console.error('❌ Erreur rechargement interventions:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('stock')) {
//         promises.push(
//           stockService.getStock()
//             .then(data => setStock(data))
//             .catch(err => console.error('❌ Erreur rechargement stock:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('emprunts')) {
//         promises.push(
//           empruntService.getEmprunts()
//             .then(data => setEmprunts(data))
//             .catch(err => console.error('❌ Erreur rechargement emprunts:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('users') && currentUser.role === 'admin') {
//         promises.push(
//           userService.getUsers()
//             .then(data => setUsers(data))
//             .catch(err => console.error('❌ Erreur rechargement users:', err))
//         );
//       }
      
//       await Promise.all(promises);
//       console.log('✅ Données rechargées avec succès');
      
//     } catch (err) {
//       console.error('❌ Erreur lors du rechargement des données:', err);
//     }
//   };

//   // 🔄 FONCTION POUR RECHARGER UNE INTERVENTION SPÉCIFIQUE
//   const reloadIntervention = async (interventionId) => {
//     try {
//       const updatedIntervention = await interventionService.getIntervention(interventionId);
//       setInterventions(interventions.map(i => 
//         i._id === interventionId ? updatedIntervention : i
//       ));
//       return { success: true };
//     } catch (err) {
//       console.error('❌ Erreur rechargement intervention:', err);
//       return { success: false };
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <div className="text-xl dark:text-white">Chargement des données...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-center max-w-md">
//           <div className="text-6xl mb-4">⚠️</div>
//           <div className="text-xl text-red-600 dark:text-red-400 mb-4">Erreur: {error}</div>
//           <div className="flex gap-4 justify-center">
//             <button 
//               onClick={() => {
//                 hasLoadedData.current = false;
//                 loadAllData();
//               }} 
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
//             >
//               Réessayer
//             </button>
//             <button 
//               onClick={() => {
//                 hasLoadedData.current = false;
//                 window.location.reload();
//               }} 
//               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
//             >
//               Actualiser
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ThemeProvider>
//       <NotificationProvider>
//         <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//           <Header 
//             currentUser={currentUser} 
//             onLogout={logout}
//             setActiveView={setActiveView}
//           />

//           <div className="container mx-auto px-4 py-6 flex gap-6">
//             <Sidebar 
//               activeView={activeView} 
//               setActiveView={setActiveView}
//               currentUser={currentUser}
//             />

//             <main className="flex-1">
//               {activeView === 'dashboard' && (
//                 <Dashboard 
//                   currentUser={currentUser}
//                   interventions={interventions}
//                   stock={stock}
//                   emprunts={emprunts}
//                   onReloadData={reloadData}
//                 />
//               )}

//               {activeView === 'historique-emprunts' && (
//                 <HistoriqueEmpruntsView
//                   emprunts={emprunts}
//                   stock={stock}
//                   currentUser={currentUser}
//                 />
//               )}
              
//               {activeView === 'interventions' && (
//                 <InterventionsView
//                   currentUser={currentUser}
//                   interventions={interventions}
//                   users={users}
//                   onAdd={addIntervention}
//                   onUpdate={updateIntervention}
//                   onDelete={deleteIntervention}
//                   filterDate={filterDate}
//                   setFilterDate={setFilterDate}
//                   filterStatut={filterStatut}
//                   setFilterStatut={setFilterStatut}
//                   onReloadIntervention={reloadIntervention}
//                 />
//               )}
              
//               {activeView === 'planning' && (
//                 <PlanningView
//                   interventions={interventions}
//                   users={users}
//                   currentUser={currentUser}
//                 />
//               )}
              
//               {activeView === 'stock' && (
//                 <StockView
//                   stock={stock}
//                   emprunts={emprunts}
//                   onUpdateStock={updateMateriel}
//                   onAddEmprunt={addEmprunt}
//                   onRetourner={retournerEmprunt}
//                   onUpdateEmprunt={updateEmprunt}
//                   onDeleteMateriel={deleteMateriel}
//                   onAddMateriel={addMateriel}
//                   currentUser={currentUser}
//                   onReloadData={reloadData}
//                 />
//               )}
              
//               {activeView === 'users' && currentUser.role === 'admin' && (
//                 <UsersView
//                   users={users}
//                   setUsers={setUsers}
//                   onReloadData={reloadData}
//                 />
//               )}

//               {activeView === 'demandes' && currentUser.role === 'admin' && (
//                 <DemandesView />
//               )}

//               {activeView === 'settings' && (
//                 <SettingsView 
//                   currentUser={currentUser} 
//                   onLogout={logout}
//                 />
//               )}

//               {activeView === 'profile' && (
//                 <ProfileView 
//                   currentUser={currentUser}
//                   setActiveView={setActiveView}
//                   onProfileUpdate={async () => {
//                     // Recharger uniquement les données nécessaires
//                     await reloadData(['interventions', 'stock', 'emprunts']);
//                   }}
//                 />
//               )}
//             </main>
//           </div>

//           {/* Container pour les notifications */}
//           <NotificationContainer />
//         </div>
//       </NotificationProvider>
//     </ThemeProvider>
//   );
// };

// export default App;


// NOUVELLE VERSION CLAUDE AVEC AJOUT DES STATISTIQUES DES INTERVENTIONS


// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from './context/AuthContext';
// import { NotificationProvider } from './context/NotificationContext';
// import { ThemeProvider } from './context/ThemeContext';
// import Header from './components/layout/Header';
// import Sidebar from './components/layout/Sidebar';
// import Dashboard from './components/views/Dashboard';
// import InterventionsView from './components/views/InterventionsView';
// import PlanningView from './components/views/PlanningView';
// import StockView from './components/views/StockView';
// import UsersView from './components/views/UsersView';
// import DemandesView from './components/views/DemandesView';
// import SettingsView from './components/views/SettingsView';
// import ProfileView from './components/views/ProfileView';
// import NotificationContainer from './components/NotificationContainer';
// import HistoriqueEmpruntsView from './components/views/HistoriqueEmpruntsView';
// import StatistiquesView from './components/views/StatistiquesView';  // ✅ AJOUT

// // Importation des services
// import * as interventionService from './services/interventionService';
// import * as userService from './services/userService';
// import * as stockService from './services/stockService';
// import * as empruntService from './services/empruntService';

// const App = () => {
//   const { currentUser, logout, updateCurrentUser } = useAuth();
  
//   const [interventions, setInterventions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [stock, setStock] = useState([]);
//   const [emprunts, setEmprunts] = useState([]);
  
//   const [activeView, setActiveView] = useState('dashboard');
//   const [filterDate, setFilterDate] = useState('');
//   const [filterStatut, setFilterStatut] = useState('');
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Utiliser useRef pour éviter la boucle infinie
//   const hasLoadedData = useRef(false);

//   // Fonction pour récupérer le token
//   const getAuthToken = () => {
//     return localStorage.getItem('authToken') || localStorage.getItem('token');
//   };

//   // Charger les données au montage du composant UNIQUEMENT
//   useEffect(() => {
//     if (currentUser && !hasLoadedData.current) {
//       hasLoadedData.current = true;
//       loadAllData();
//     }
//   }, [currentUser]);

//   const loadAllData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       console.log('🔄 Début du chargement des données...');
      
//       const token = getAuthToken();
//       if (!token) {
//         console.warn('⚠️ Token non trouvé dans le localStorage');
//         setError('Erreur d\'authentification. Veuillez vous reconnecter.');
//         hasLoadedData.current = false;
//         return;
//       }
      
//       // 1️⃣ Charger les informations de l'utilisateur actuel via /api/auth/me
//       try {
//         const userResponse = await fetch('http://localhost:5000/api/auth/me', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
          
//           if (userData.success && userData.data) {
//             console.log('✅ Données utilisateur vérifiées:', userData.data);
//           }
//         } else {
//           console.warn('⚠️ Impossible de charger les données utilisateur:', userResponse.status);
//         }
//       } catch (err) {
//         console.warn('⚠️ Erreur lors du chargement des données utilisateur:', err);
//         // On continue même si ça échoue
//       }

//       // 2️⃣ Charger les autres données avec gestion d'erreur individuelle
//       const dataPromises = [
//         interventionService.getInterventions().catch(err => {
//           console.error('❌ Erreur interventions:', err);
//           return [];
//         }),
//         currentUser.role === 'admin' 
//           ? userService.getUsers().catch(err => {
//               console.error('❌ Erreur users:', err);
//               return [];
//             })
//           : Promise.resolve([]),
//         stockService.getStock().catch(err => {
//           console.error('❌ Erreur stock:', err);
//           return [];
//         }),
//         empruntService.getEmprunts().catch(err => {
//           console.error('❌ Erreur emprunts:', err);
//           return [];
//         })
//       ];

//       const [interventionsData, usersData, stockData, empruntsData] = await Promise.all(dataPromises);

//       setInterventions(interventionsData);
//       setUsers(usersData);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       console.log('✅ Toutes les données chargées avec succès');
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Erreur lors du chargement des données');
//       console.error('❌ Erreur:', err);
//       hasLoadedData.current = false;
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

//   // Gestion du stock - FONCTION EXISTANTE (gardée pour compatibilité)
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

//   // NOUVELLES FONCTIONS POUR LA GESTION COMPLÈTE DES MATÉRIELS
//   const addMateriel = async (materielData) => {
//     try {
//       const newMateriel = await stockService.createMateriel(materielData);
//       setStock([...stock, newMateriel]);
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de l\'ajout du matériel' 
//       };
//     }
//   };

//   const updateMateriel = async (id, updatedData) => {
//     try {
//       const updated = await stockService.updateMateriel(id, updatedData);
//       setStock(stock.map(s => s._id === id ? updated : s));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la mise à jour du matériel' 
//       };
//     }
//   };

//   const deleteMateriel = async (id) => {
//     try {
//       await stockService.deleteMateriel(id);
//       setStock(stock.filter(s => s._id !== id));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la suppression du matériel' 
//       };
//     }
//   };

//   // Gestion des emprunts
//   const addEmprunt = async (emprunt) => {
//     try {
//       const newEmprunt = await empruntService.createEmprunt(emprunt);
//       setEmprunts([...emprunts, newEmprunt]);
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
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
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors du retour' 
//       };
//     }
//   };

//   // NOUVELLE FONCTION POUR MODIFIER LES EMPRUNTS
//   const updateEmprunt = async (empruntId, updatedData) => {
//     try {
//       const updated = await empruntService.updateEmprunt(empruntId, updatedData);
//       setEmprunts(emprunts.map(e => e._id === empruntId ? updated : e));
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la modification de l\'emprunt' 
//       };
//     }
//   };

//   // 🔄 FONCTION POUR RECHARGER LES DONNÉES SPÉCIFIQUES
//   const reloadData = async (dataTypes = ['all']) => {
//     try {
//       console.log('🔄 Rechargement des données:', dataTypes);
      
//       const promises = [];
      
//       if (dataTypes.includes('all') || dataTypes.includes('interventions')) {
//         promises.push(
//           interventionService.getInterventions()
//             .then(data => setInterventions(data))
//             .catch(err => console.error('❌ Erreur rechargement interventions:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('stock')) {
//         promises.push(
//           stockService.getStock()
//             .then(data => setStock(data))
//             .catch(err => console.error('❌ Erreur rechargement stock:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('emprunts')) {
//         promises.push(
//           empruntService.getEmprunts()
//             .then(data => setEmprunts(data))
//             .catch(err => console.error('❌ Erreur rechargement emprunts:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('users') && currentUser.role === 'admin') {
//         promises.push(
//           userService.getUsers()
//             .then(data => setUsers(data))
//             .catch(err => console.error('❌ Erreur rechargement users:', err))
//         );
//       }
      
//       await Promise.all(promises);
//       console.log('✅ Données rechargées avec succès');
      
//     } catch (err) {
//       console.error('❌ Erreur lors du rechargement des données:', err);
//     }
//   };

//   // 🔄 FONCTION POUR RECHARGER UNE INTERVENTION SPÉCIFIQUE
//   const reloadIntervention = async (interventionId) => {
//     try {
//       const updatedIntervention = await interventionService.getIntervention(interventionId);
//       setInterventions(interventions.map(i => 
//         i._id === interventionId ? updatedIntervention : i
//       ));
//       return { success: true };
//     } catch (err) {
//       console.error('❌ Erreur rechargement intervention:', err);
//       return { success: false };
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <div className="text-xl dark:text-white">Chargement des données...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-center max-w-md">
//           <div className="text-6xl mb-4">⚠️</div>
//           <div className="text-xl text-red-600 dark:text-red-400 mb-4">Erreur: {error}</div>
//           <div className="flex gap-4 justify-center">
//             <button 
//               onClick={() => {
//                 hasLoadedData.current = false;
//                 loadAllData();
//               }} 
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
//             >
//               Réessayer
//             </button>
//             <button 
//               onClick={() => {
//                 hasLoadedData.current = false;
//                 window.location.reload();
//               }} 
//               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
//             >
//               Actualiser
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ThemeProvider>
//       <NotificationProvider>
//         <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//           <Header 
//             currentUser={currentUser} 
//             onLogout={logout}
//             setActiveView={setActiveView}
//           />

//           <div className="container mx-auto px-4 py-6 flex gap-6">
//             <Sidebar 
//               activeView={activeView} 
//               setActiveView={setActiveView}
//               currentUser={currentUser}
//             />

//             <main className="flex-1">
//               {activeView === 'dashboard' && (
//                 <Dashboard 
//                   currentUser={currentUser}
//                   interventions={interventions}
//                   stock={stock}
//                   emprunts={emprunts}
//                   onReloadData={reloadData}
//                 />
//               )}

//               {activeView === 'historique-emprunts' && (
//                 <HistoriqueEmpruntsView
//                   emprunts={emprunts}
//                   stock={stock}
//                   currentUser={currentUser}
//                 />
//               )}
              
//               {activeView === 'interventions' && (
//                 <InterventionsView
//                   currentUser={currentUser}
//                   interventions={interventions}
//                   users={users}
//                   onAdd={addIntervention}
//                   onUpdate={updateIntervention}
//                   onDelete={deleteIntervention}
//                   filterDate={filterDate}
//                   setFilterDate={setFilterDate}
//                   filterStatut={filterStatut}
//                   setFilterStatut={setFilterStatut}
//                   onReloadIntervention={reloadIntervention}
//                 />
//               )}
              
//               {activeView === 'planning' && (
//                 <PlanningView
//                   interventions={interventions}
//                   users={users}
//                   currentUser={currentUser}
//                 />
//               )}
              
//               {activeView === 'stock' && (
//                 <StockView
//                   stock={stock}
//                   emprunts={emprunts}
//                   onUpdateStock={updateMateriel}
//                   onAddEmprunt={addEmprunt}
//                   onRetourner={retournerEmprunt}
//                   onUpdateEmprunt={updateEmprunt}
//                   onDeleteMateriel={deleteMateriel}
//                   onAddMateriel={addMateriel}
//                   currentUser={currentUser}
//                   onReloadData={reloadData}
//                 />
//               )}
              
//               {activeView === 'users' && currentUser.role === 'admin' && (
//                 <UsersView
//                   users={users}
//                   setUsers={setUsers}
//                   onReloadData={reloadData}
//                 />
//               )}

//               {activeView === 'demandes' && currentUser.role === 'admin' && (
//                 <DemandesView />
//               )}

//               {/* ✅ NOUVELLE SECTION STATISTIQUES */}
//               {activeView === 'statistiques' && (
//                 <StatistiquesView currentUser={currentUser} />
//               )}

//               {activeView === 'settings' && (
//                 <SettingsView 
//                   currentUser={currentUser} 
//                   onLogout={logout}
//                 />
//               )}

//               {activeView === 'profile' && (
//                 <ProfileView 
//                   currentUser={currentUser}
//                   setActiveView={setActiveView}
//                   onProfileUpdate={async () => {
//                     // Recharger uniquement les données nécessaires
//                     await reloadData(['interventions', 'stock', 'emprunts']);
//                   }}
//                 />
//               )}
//             </main>
//           </div>

//           {/* Container pour les notifications */}
//           <NotificationContainer />
//         </div>
//       </NotificationProvider>
//     </ThemeProvider>
//   );
// };

// export default App;


// NOUVELLE VERSION DEEPSEEK POUR INTEGRER LA FONCTION "VALIDER L'INTERVENTION"




// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from './context/AuthContext';
// import { NotificationProvider } from './context/NotificationContext';
// import { ThemeProvider } from './context/ThemeContext';
// import Header from './components/layout/Header';
// import Sidebar from './components/layout/Sidebar';
// import Dashboard from './components/views/Dashboard';
// import InterventionsView from './components/views/InterventionsView';
// import PlanningView from './components/views/PlanningView';
// import StockView from './components/views/StockView';
// import UsersView from './components/views/UsersView';
// import DemandesView from './components/views/DemandesView';
// import SettingsView from './components/views/SettingsView';
// import ProfileView from './components/views/ProfileView';
// import NotificationContainer from './components/NotificationContainer';
// import HistoriqueEmpruntsView from './components/views/HistoriqueEmpruntsView';
// import StatistiquesView from './components/views/StatistiquesView';

// // Importation des services
// import * as interventionService from './services/interventionService';
// import * as userService from './services/userService';
// import * as stockService from './services/stockService';
// import * as empruntService from './services/empruntService';

// const App = () => {
//   const { currentUser, logout, updateCurrentUser } = useAuth();
  
//   const [interventions, setInterventions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [stock, setStock] = useState([]);
//   const [emprunts, setEmprunts] = useState([]);
  
//   const [activeView, setActiveView] = useState('dashboard');
//   const [filterDate, setFilterDate] = useState('');
//   const [filterStatut, setFilterStatut] = useState('');
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Utiliser useRef pour éviter la boucle infinie
//   const hasLoadedData = useRef(false);

//   // Fonction pour récupérer le token
//   const getAuthToken = () => {
//     return localStorage.getItem('authToken') || localStorage.getItem('token');
//   };

//   // Charger les données au montage du composant UNIQUEMENT
//   useEffect(() => {
//     if (currentUser && !hasLoadedData.current) {
//       hasLoadedData.current = true;
//       loadAllData();
//     }
//   }, [currentUser]);

//   const loadAllData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       console.log('🔄 Début du chargement des données...');
      
//       const token = getAuthToken();
//       if (!token) {
//         console.warn('⚠️ Token non trouvé dans le localStorage');
//         setError('Erreur d\'authentification. Veuillez vous reconnecter.');
//         hasLoadedData.current = false;
//         return;
//       }
      
//       // 1️⃣ Charger les informations de l'utilisateur actuel via /api/auth/me
//       try {
//         const userResponse = await fetch('http://localhost:5000/api/auth/me', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
          
//           if (userData.success && userData.data) {
//             console.log('✅ Données utilisateur vérifiées:', userData.data);
//           }
//         } else {
//           console.warn('⚠️ Impossible de charger les données utilisateur:', userResponse.status);
//         }
//       } catch (err) {
//         console.warn('⚠️ Erreur lors du chargement des données utilisateur:', err);
//         // On continue même si ça échoue
//       }

//       // 2️⃣ Charger les autres données avec gestion d'erreur individuelle
//       const dataPromises = [
//         interventionService.getInterventions().catch(err => {
//           console.error('❌ Erreur interventions:', err);
//           return [];
//         }),
//         currentUser.role === 'admin' 
//           ? userService.getUsers().catch(err => {
//               console.error('❌ Erreur users:', err);
//               return [];
//             })
//           : Promise.resolve([]),
//         stockService.getStock().catch(err => {
//           console.error('❌ Erreur stock:', err);
//           return [];
//         }),
//         empruntService.getEmprunts().catch(err => {
//           console.error('❌ Erreur emprunts:', err);
//           return [];
//         })
//       ];

//       const [interventionsData, usersData, stockData, empruntsData] = await Promise.all(dataPromises);

//       setInterventions(interventionsData);
//       setUsers(usersData);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       console.log('✅ Toutes les données chargées avec succès');
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Erreur lors du chargement des données');
//       console.error('❌ Erreur:', err);
//       hasLoadedData.current = false;
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

//   // ✅ NOUVELLE FONCTION : Valider une intervention (admin uniquement)
//   const validerIntervention = async (interventionId) => {
//     try {
//       console.log('🔄 Validation intervention ID:', interventionId);
      
//       // Utiliser le service existant
//       const response = await interventionService.validerIntervention(interventionId);
      
//       // Mettre à jour l'état local
//       setInterventions(interventions.map(i => 
//         i._id === interventionId ? response : i
//       ));
      
//       return { success: true, data: response };
//     } catch (err) {
//       console.error('❌ Erreur validation intervention:', err);
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la validation' 
//       };
//     }
//   };

//   // Gestion du stock - FONCTION EXISTANTE (gardée pour compatibilité)
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

//   // NOUVELLES FONCTIONS POUR LA GESTION COMPLÈTE DES MATÉRIELS
//   const addMateriel = async (materielData) => {
//     try {
//       const newMateriel = await stockService.createMateriel(materielData);
//       setStock([...stock, newMateriel]);
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de l\'ajout du matériel' 
//       };
//     }
//   };

//   const updateMateriel = async (id, updatedData) => {
//     try {
//       const updated = await stockService.updateMateriel(id, updatedData);
//       setStock(stock.map(s => s._id === id ? updated : s));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la mise à jour du matériel' 
//       };
//     }
//   };

//   const deleteMateriel = async (id) => {
//     try {
//       await stockService.deleteMateriel(id);
//       setStock(stock.filter(s => s._id !== id));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la suppression du matériel' 
//       };
//     }
//   };

//   // Gestion des emprunts
//   const addEmprunt = async (emprunt) => {
//     try {
//       const newEmprunt = await empruntService.createEmprunt(emprunt);
//       setEmprunts([...emprunts, newEmprunt]);
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
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
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors du retour' 
//       };
//     }
//   };

//   // NOUVELLE FONCTION POUR MODIFIER LES EMPRUNTS
//   const updateEmprunt = async (empruntId, updatedData) => {
//     try {
//       const updated = await empruntService.updateEmprunt(empruntId, updatedData);
//       setEmprunts(emprunts.map(e => e._id === empruntId ? updated : e));
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la modification de l\'emprunt' 
//       };
//     }
//   };

//   // 🔄 FONCTION POUR RECHARGER LES DONNÉES SPÉCIFIQUES
//   const reloadData = async (dataTypes = ['all']) => {
//     try {
//       console.log('🔄 Rechargement des données:', dataTypes);
      
//       const promises = [];
      
//       if (dataTypes.includes('all') || dataTypes.includes('interventions')) {
//         promises.push(
//           interventionService.getInterventions()
//             .then(data => setInterventions(data))
//             .catch(err => console.error('❌ Erreur rechargement interventions:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('stock')) {
//         promises.push(
//           stockService.getStock()
//             .then(data => setStock(data))
//             .catch(err => console.error('❌ Erreur rechargement stock:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('emprunts')) {
//         promises.push(
//           empruntService.getEmprunts()
//             .then(data => setEmprunts(data))
//             .catch(err => console.error('❌ Erreur rechargement emprunts:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('users') && currentUser.role === 'admin') {
//         promises.push(
//           userService.getUsers()
//             .then(data => setUsers(data))
//             .catch(err => console.error('❌ Erreur rechargement users:', err))
//         );
//       }
      
//       await Promise.all(promises);
//       console.log('✅ Données rechargées avec succès');
      
//     } catch (err) {
//       console.error('❌ Erreur lors du rechargement des données:', err);
//     }
//   };

//   // 🔄 FONCTION POUR RECHARGER UNE INTERVENTION SPÉCIFIQUE
//   const reloadIntervention = async (interventionId) => {
//     try {
//       const updatedIntervention = await interventionService.getIntervention(interventionId);
//       setInterventions(interventions.map(i => 
//         i._id === interventionId ? updatedIntervention : i
//       ));
//       return { success: true };
//     } catch (err) {
//       console.error('❌ Erreur rechargement intervention:', err);
//       return { success: false };
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <div className="text-xl dark:text-white">Chargement des données...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-center max-w-md">
//           <div className="text-6xl mb-4">⚠️</div>
//           <div className="text-xl text-red-600 dark:text-red-400 mb-4">Erreur: {error}</div>
//           <div className="flex gap-4 justify-center">
//             <button 
//               onClick={() => {
//                 hasLoadedData.current = false;
//                 loadAllData();
//               }} 
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
//             >
//               Réessayer
//             </button>
//             <button 
//               onClick={() => {
//                 hasLoadedData.current = false;
//                 window.location.reload();
//               }} 
//               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
//             >
//               Actualiser
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ThemeProvider>
//       <NotificationProvider>
//         <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//           <Header 
//             currentUser={currentUser} 
//             onLogout={logout}
//             setActiveView={setActiveView}
//           />

//           <div className="container mx-auto px-4 py-6 flex gap-6">
//             <Sidebar 
//               activeView={activeView} 
//               setActiveView={setActiveView}
//               currentUser={currentUser}
//             />

//             <main className="flex-1">
//               {activeView === 'dashboard' && (
//                 <Dashboard 
//                   currentUser={currentUser}
//                   interventions={interventions}
//                   stock={stock}
//                   emprunts={emprunts}
//                   onReloadData={reloadData}
//                 />
//               )}

//               {activeView === 'historique-emprunts' && (
//                 <HistoriqueEmpruntsView
//                   emprunts={emprunts}
//                   stock={stock}
//                   currentUser={currentUser}
//                 />
//               )}
              
//               {activeView === 'interventions' && (
//                 <InterventionsView
//                   currentUser={currentUser}
//                   interventions={interventions}
//                   users={users}
//                   onAdd={addIntervention}
//                   onUpdate={updateIntervention}
//                   onDelete={deleteIntervention}
//                   onValider={validerIntervention} // ✅ AJOUT DE LA PROP
//                   filterDate={filterDate}
//                   setFilterDate={setFilterDate}
//                   filterStatut={filterStatut}
//                   setFilterStatut={setFilterStatut}
//                   onReloadIntervention={reloadIntervention}
//                 />
//               )}
              
//               {activeView === 'planning' && (
//                 <PlanningView
//                   interventions={interventions}
//                   users={users}
//                   currentUser={currentUser}
//                 />
//               )}
              
//               {activeView === 'stock' && (
//                 <StockView
//                   stock={stock}
//                   emprunts={emprunts}
//                   onUpdateStock={updateMateriel}
//                   onAddEmprunt={addEmprunt}
//                   onRetourner={retournerEmprunt}
//                   onUpdateEmprunt={updateEmprunt}
//                   onDeleteMateriel={deleteMateriel}
//                   onAddMateriel={addMateriel}
//                   currentUser={currentUser}
//                   onReloadData={reloadData}
//                 />
//               )}
              
//               {activeView === 'users' && currentUser.role === 'admin' && (
//                 <UsersView
//                   users={users}
//                   setUsers={setUsers}
//                   onReloadData={reloadData}
//                 />
//               )}

//               {activeView === 'demandes' && currentUser.role === 'admin' && (
//                 <DemandesView />
//               )}

//               {/* ✅ NOUVELLE SECTION STATISTIQUES */}
//               {activeView === 'statistiques' && (
//                 <StatistiquesView currentUser={currentUser} />
//               )}

//               {activeView === 'settings' && (
//                 <SettingsView 
//                   currentUser={currentUser} 
//                   onLogout={logout}
//                 />
//               )}

//               {activeView === 'profile' && (
//                 <ProfileView 
//                   currentUser={currentUser}
//                   setActiveView={setActiveView}
//                   onProfileUpdate={async () => {
//                     // Recharger uniquement les données nécessaires
//                     await reloadData(['interventions', 'stock', 'emprunts']);
//                   }}
//                 />
//               )}
//             </main>
//           </div>

//           {/* Container pour les notifications */}
//           <NotificationContainer />
//         </div>
//       </NotificationProvider>
//     </ThemeProvider>
//   );
// };

// export default App;


// NOUVELLE VERSION POUR REGLER L'ACTUALISATION DU FILEMODAL



// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from './context/AuthContext';
// import { NotificationProvider } from './context/NotificationContext';
// import { ThemeProvider } from './context/ThemeContext';
// import Header from './components/layout/Header';
// import Sidebar from './components/layout/Sidebar';
// import Dashboard from './components/views/Dashboard';
// import InterventionsView from './components/views/InterventionsView';
// import PlanningView from './components/views/PlanningView';
// import StockView from './components/views/StockView';
// import UsersView from './components/views/UsersView';
// import DemandesView from './components/views/DemandesView';
// import SettingsView from './components/views/SettingsView';
// import ProfileView from './components/views/ProfileView';
// import NotificationContainer from './components/NotificationContainer';
// import HistoriqueEmpruntsView from './components/views/HistoriqueEmpruntsView';
// import StatistiquesView from './components/views/StatistiquesView';

// // Importation des services
// import * as interventionService from './services/interventionService';
// import * as userService from './services/userService';
// import * as stockService from './services/stockService';
// import * as empruntService from './services/empruntService';

// const App = () => {
//   const { currentUser, logout, updateCurrentUser } = useAuth();
  
//   const [interventions, setInterventions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [stock, setStock] = useState([]);
//   const [emprunts, setEmprunts] = useState([]);
  
//   const [activeView, setActiveView] = useState('dashboard');
//   const [filterDate, setFilterDate] = useState('');
//   const [filterStatut, setFilterStatut] = useState('');
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Utiliser useRef pour éviter la boucle infinie
//   const hasLoadedData = useRef(false);

//   // ✅ NOUVEAU : État pour suivre les modifications de fichiers
//   const [fileUpdates, setFileUpdates] = useState(0);

//   // Fonction pour récupérer le token
//   const getAuthToken = () => {
//     return localStorage.getItem('authToken') || localStorage.getItem('token');
//   };

//   // Charger les données au montage du composant UNIQUEMENT
//   useEffect(() => {
//     if (currentUser && !hasLoadedData.current) {
//       hasLoadedData.current = true;
//       loadAllData();
//     }
//   }, [currentUser]);

//   const loadAllData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       console.log('🔄 Début du chargement des données...');
      
//       const token = getAuthToken();
//       if (!token) {
//         console.warn('⚠️ Token non trouvé dans le localStorage');
//         setError('Erreur d\'authentification. Veuillez vous reconnecter.');
//         hasLoadedData.current = false;
//         return;
//       }
      
//       // 1️⃣ Charger les informations de l'utilisateur actuel via /api/auth/me
//       try {
//         const userResponse = await fetch('http://localhost:5000/api/auth/me', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
          
//           if (userData.success && userData.data) {
//             console.log('✅ Données utilisateur vérifiées:', userData.data);
//           }
//         } else {
//           console.warn('⚠️ Impossible de charger les données utilisateur:', userResponse.status);
//         }
//       } catch (err) {
//         console.warn('⚠️ Erreur lors du chargement des données utilisateur:', err);
//         // On continue même si ça échoue
//       }

//       // 2️⃣ Charger les autres données avec gestion d'erreur individuelle
//       const dataPromises = [
//         interventionService.getInterventions().catch(err => {
//           console.error('❌ Erreur interventions:', err);
//           return [];
//         }),
//         currentUser.role === 'admin' 
//           ? userService.getUsers().catch(err => {
//               console.error('❌ Erreur users:', err);
//               return [];
//             })
//           : Promise.resolve([]),
//         stockService.getStock().catch(err => {
//           console.error('❌ Erreur stock:', err);
//           return [];
//         }),
//         empruntService.getEmprunts().catch(err => {
//           console.error('❌ Erreur emprunts:', err);
//           return [];
//         })
//       ];

//       const [interventionsData, usersData, stockData, empruntsData] = await Promise.all(dataPromises);

//       setInterventions(interventionsData);
//       setUsers(usersData);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       console.log('✅ Toutes les données chargées avec succès');
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Erreur lors du chargement des données');
//       console.error('❌ Erreur:', err);
//       hasLoadedData.current = false;
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

//   // ✅ NOUVELLE FONCTION : Valider une intervention (admin uniquement)
//   const validerIntervention = async (interventionId) => {
//     try {
//       console.log('🔄 Validation intervention ID:', interventionId);
      
//       // Utiliser le service existant
//       const response = await interventionService.validerIntervention(interventionId);
      
//       // Mettre à jour l'état local
//       setInterventions(interventions.map(i => 
//         i._id === interventionId ? response : i
//       ));
      
//       return { success: true, data: response };
//     } catch (err) {
//       console.error('❌ Erreur validation intervention:', err);
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la validation' 
//       };
//     }
//   };

//   // Gestion du stock - FONCTION EXISTANTE (gardée pour compatibilité)
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

//   // NOUVELLES FONCTIONS POUR LA GESTION COMPLÈTE DES MATÉRIELS
//   const addMateriel = async (materielData) => {
//     try {
//       const newMateriel = await stockService.createMateriel(materielData);
//       setStock([...stock, newMateriel]);
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de l\'ajout du matériel' 
//       };
//     }
//   };

//   const updateMateriel = async (id, updatedData) => {
//     try {
//       const updated = await stockService.updateMateriel(id, updatedData);
//       setStock(stock.map(s => s._id === id ? updated : s));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la mise à jour du matériel' 
//       };
//     }
//   };

//   const deleteMateriel = async (id) => {
//     try {
//       await stockService.deleteMateriel(id);
//       setStock(stock.filter(s => s._id !== id));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la suppression du matériel' 
//       };
//     }
//   };

//   // Gestion des emprunts
//   const addEmprunt = async (emprunt) => {
//     try {
//       const newEmprunt = await empruntService.createEmprunt(emprunt);
//       setEmprunts([...emprunts, newEmprunt]);
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
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
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors du retour' 
//       };
//     }
//   };

//   // NOUVELLE FONCTION POUR MODIFIER LES EMPRUNTS
//   const updateEmprunt = async (empruntId, updatedData) => {
//     try {
//       const updated = await empruntService.updateEmprunt(empruntId, updatedData);
//       setEmprunts(emprunts.map(e => e._id === empruntId ? updated : e));
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la modification de l\'emprunt' 
//       };
//     }
//   };

//   // 🔄 FONCTION POUR RECHARGER LES DONNÉES SPÉCIFIQUES
//   const reloadData = async (dataTypes = ['all']) => {
//     try {
//       console.log('🔄 Rechargement des données:', dataTypes);
      
//       const promises = [];
      
//       if (dataTypes.includes('all') || dataTypes.includes('interventions')) {
//         promises.push(
//           interventionService.getInterventions()
//             .then(data => setInterventions(data))
//             .catch(err => console.error('❌ Erreur rechargement interventions:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('stock')) {
//         promises.push(
//           stockService.getStock()
//             .then(data => setStock(data))
//             .catch(err => console.error('❌ Erreur rechargement stock:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('emprunts')) {
//         promises.push(
//           empruntService.getEmprunts()
//             .then(data => setEmprunts(data))
//             .catch(err => console.error('❌ Erreur rechargement emprunts:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('users') && currentUser.role === 'admin') {
//         promises.push(
//           userService.getUsers()
//             .then(data => setUsers(data))
//             .catch(err => console.error('❌ Erreur rechargement users:', err))
//         );
//       }
      
//       await Promise.all(promises);
//       console.log('✅ Données rechargées avec succès');
      
//     } catch (err) {
//       console.error('❌ Erreur lors du rechargement des données:', err);
//     }
//   };

//   // 🔄 FONCTION POUR RECHARGER UNE INTERVENTION SPÉCIFIQUE
//   const reloadIntervention = async (interventionId) => {
//     try {
//       const updatedIntervention = await interventionService.getIntervention(interventionId);
//       setInterventions(interventions.map(i => 
//         i._id === interventionId ? updatedIntervention : i
//       ));
      
//       // ✅ INCREMENTER LE COMPTEUR DE MISES À JOUR DE FICHIERS
//       setFileUpdates(prev => prev + 1);
      
//       return { success: true };
//     } catch (err) {
//       console.error('❌ Erreur rechargement intervention:', err);
//       return { success: false };
//     }
//   };

//   // ✅ NOUVELLE FONCTION : Gérer l'upload/suppression de fichiers
//   const handleFileUploaded = async (interventionId) => {
//   try {
//     // Recharger l'intervention spécifique
//     if (reloadIntervention) {
//       await reloadIntervention(interventionId);
//     }
//   } catch (err) {
//     console.error('❌ Erreur lors du rechargement après opération sur fichiers:', err);
//   }
// };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <div className="text-xl dark:text-white">Chargement des données...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-center max-w-md">
//           <div className="text-6xl mb-4">⚠️</div>
//           <div className="text-xl text-red-600 dark:text-red-400 mb-4">Erreur: {error}</div>
//           <div className="flex gap-4 justify-center">
//             <button 
//               onClick={() => {
//                 hasLoadedData.current = false;
//                 loadAllData();
//               }} 
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
//             >
//               Réessayer
//             </button>
//             <button 
//               onClick={() => {
//                 hasLoadedData.current = false;
//                 window.location.reload();
//               }} 
//               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
//             >
//               Actualiser
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ThemeProvider>
//       <NotificationProvider>
//         <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//           <Header 
//             currentUser={currentUser} 
//             onLogout={logout}
//             setActiveView={setActiveView}
//           />

//           <div className="container mx-auto px-4 py-6 flex gap-6">
//             <Sidebar 
//               activeView={activeView} 
//               setActiveView={setActiveView}
//               currentUser={currentUser}
//             />

//             <main className="flex-1">
//               {activeView === 'dashboard' && (
//                 <Dashboard 
//                   currentUser={currentUser}
//                   interventions={interventions}
//                   stock={stock}
//                   emprunts={emprunts}
//                   onReloadData={reloadData}
//                 />
//               )}

//               {activeView === 'historique-emprunts' && (
//                 <HistoriqueEmpruntsView
//                   emprunts={emprunts}
//                   stock={stock}
//                   currentUser={currentUser}
//                 />
//               )}
              
//               {activeView === 'interventions' && (
//                 <InterventionsView
//                   currentUser={currentUser}
//                   interventions={interventions}
//                   users={users}
//                   onAdd={addIntervention}
//                   onUpdate={updateIntervention}
//                   onDelete={deleteIntervention}
//                   onValider={validerIntervention} // ✅ AJOUT DE LA PROP
//                   filterDate={filterDate}
//                   setFilterDate={setFilterDate}
//                   filterStatut={filterStatut}
//                   setFilterStatut={setFilterStatut}
//                   onReloadIntervention={reloadIntervention}
//                   // ✅ AJOUT DES NOUVELLES PROPS POUR LA GESTION DES FICHIERS
//                   onFileUploaded={handleFileUploaded}
//                   fileUpdates={fileUpdates}
//                 />
//               )}
              
//               {activeView === 'planning' && (
//                 <PlanningView
//                   interventions={interventions}
//                   users={users}
//                   currentUser={currentUser}
//                 />
//               )}
              
//               {activeView === 'stock' && (
//                 <StockView
//                   stock={stock}
//                   emprunts={emprunts}
//                   onUpdateStock={updateMateriel}
//                   onAddEmprunt={addEmprunt}
//                   onRetourner={retournerEmprunt}
//                   onUpdateEmprunt={updateEmprunt}
//                   onDeleteMateriel={deleteMateriel}
//                   onAddMateriel={addMateriel}
//                   currentUser={currentUser}
//                   onReloadData={reloadData}
//                 />
//               )}
              
//               {activeView === 'users' && currentUser.role === 'admin' && (
//                 <UsersView
//                   users={users}
//                   setUsers={setUsers}
//                   onReloadData={reloadData}
//                 />
//               )}

//               {activeView === 'demandes' && currentUser.role === 'admin' && (
//                 <DemandesView />
//               )}

//               {/* ✅ NOUVELLE SECTION STATISTIQUES */}
//               {activeView === 'statistiques' && (
//                 <StatistiquesView currentUser={currentUser} />
//               )}

//               {activeView === 'settings' && (
//                 <SettingsView 
//                   currentUser={currentUser} 
//                   onLogout={logout}
//                 />
//               )}

//               {activeView === 'profile' && (
//                 <ProfileView 
//                   currentUser={currentUser}
//                   setActiveView={setActiveView}
//                   onProfileUpdate={async () => {
//                     // Recharger uniquement les données nécessaires
//                     await reloadData(['interventions', 'stock', 'emprunts']);
//                   }}
//                 />
//               )}
//             </main>
//           </div>

//           {/* Container pour les notifications */}
//           <NotificationContainer />
//         </div>
//       </NotificationProvider>
//     </ThemeProvider>
//   );
// };

// export default App;


// NOUVELLE VERSION CLAUDE POUR REGLER LE MENU UTILISATEUR DANS LE HEADER (POUR QU'IL S'ACTUALISE INSTANTANNEMENT APRES MODIFICATION DU PROFIL)

// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from './context/AuthContext';
// import { NotificationProvider } from './context/NotificationContext';
// import { ThemeProvider } from './context/ThemeContext';
// import { UserProvider } from './context/UserContext'; // ✅ NOUVEAU
// import Header from './components/layout/Header';
// import Sidebar from './components/layout/Sidebar';
// import Dashboard from './components/views/Dashboard';
// import InterventionsView from './components/views/InterventionsView';
// import PlanningView from './components/views/PlanningView';
// import StockView from './components/views/StockView';
// import UsersView from './components/views/UsersView';
// import DemandesView from './components/views/DemandesView';
// import SettingsView from './components/views/SettingsView';
// import ProfileView from './components/views/ProfileView';
// import NotificationContainer from './components/NotificationContainer';
// import HistoriqueEmpruntsView from './components/views/HistoriqueEmpruntsView';
// import StatistiquesView from './components/views/StatistiquesView';

// // Importation des services
// import * as interventionService from './services/interventionService';
// import * as userService from './services/userService';
// import * as stockService from './services/stockService';
// import * as empruntService from './services/empruntService';

// const App = () => {
//   const { currentUser, logout, updateCurrentUser } = useAuth();
  
//   const [interventions, setInterventions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [stock, setStock] = useState([]);
//   const [emprunts, setEmprunts] = useState([]);
  
//   const [activeView, setActiveView] = useState('dashboard');
//   const [filterDate, setFilterDate] = useState('');
//   const [filterStatut, setFilterStatut] = useState('');
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Utiliser useRef pour éviter la boucle infinie
//   const hasLoadedData = useRef(false);

//   // ✅ NOUVEAU : État pour suivre les modifications de fichiers
//   const [fileUpdates, setFileUpdates] = useState(0);

//   // Fonction pour récupérer le token
//   const getAuthToken = () => {
//     return localStorage.getItem('authToken') || localStorage.getItem('token');
//   };

//   // Charger les données au montage du composant UNIQUEMENT
//   useEffect(() => {
//     if (currentUser && !hasLoadedData.current) {
//       hasLoadedData.current = true;
//       loadAllData();
//     }
//   }, [currentUser]);

//   const loadAllData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       console.log('🔄 Début du chargement des données...');
      
//       const token = getAuthToken();
//       if (!token) {
//         console.warn('⚠️ Token non trouvé dans le localStorage');
//         setError('Erreur d\'authentification. Veuillez vous reconnecter.');
//         hasLoadedData.current = false;
//         return;
//       }
      
//       // 1️⃣ Charger les informations de l'utilisateur actuel via /api/auth/me
//       try {
//         const userResponse = await fetch('http://localhost:5000/api/auth/me', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
          
//           if (userData.success && userData.data) {
//             console.log('✅ Données utilisateur vérifiées:', userData.data);
//           }
//         } else {
//           console.warn('⚠️ Impossible de charger les données utilisateur:', userResponse.status);
//         }
//       } catch (err) {
//         console.warn('⚠️ Erreur lors du chargement des données utilisateur:', err);
//         // On continue même si ça échoue
//       }

//       // 2️⃣ Charger les autres données avec gestion d'erreur individuelle
//       const dataPromises = [
//         interventionService.getInterventions().catch(err => {
//           console.error('❌ Erreur interventions:', err);
//           return [];
//         }),
//         currentUser.role === 'admin' 
//           ? userService.getUsers().catch(err => {
//               console.error('❌ Erreur users:', err);
//               return [];
//             })
//           : Promise.resolve([]),
//         stockService.getStock().catch(err => {
//           console.error('❌ Erreur stock:', err);
//           return [];
//         }),
//         empruntService.getEmprunts().catch(err => {
//           console.error('❌ Erreur emprunts:', err);
//           return [];
//         })
//       ];

//       const [interventionsData, usersData, stockData, empruntsData] = await Promise.all(dataPromises);

//       setInterventions(interventionsData);
//       setUsers(usersData);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       console.log('✅ Toutes les données chargées avec succès');
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Erreur lors du chargement des données');
//       console.error('❌ Erreur:', err);
//       hasLoadedData.current = false;
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

//   // ✅ NOUVELLE FONCTION : Valider une intervention (admin uniquement)
//   const validerIntervention = async (interventionId) => {
//     try {
//       console.log('🔄 Validation intervention ID:', interventionId);
      
//       // Utiliser le service existant
//       const response = await interventionService.validerIntervention(interventionId);
      
//       // Mettre à jour l'état local
//       setInterventions(interventions.map(i => 
//         i._id === interventionId ? response : i
//       ));
      
//       return { success: true, data: response };
//     } catch (err) {
//       console.error('❌ Erreur validation intervention:', err);
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la validation' 
//       };
//     }
//   };

//   // Gestion du stock - FONCTION EXISTANTE (gardée pour compatibilité)
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

//   // NOUVELLES FONCTIONS POUR LA GESTION COMPLÈTE DES MATÉRIELS
//   const addMateriel = async (materielData) => {
//     try {
//       const newMateriel = await stockService.createMateriel(materielData);
//       setStock([...stock, newMateriel]);
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de l\'ajout du matériel' 
//       };
//     }
//   };

//   const updateMateriel = async (id, updatedData) => {
//     try {
//       const updated = await stockService.updateMateriel(id, updatedData);
//       setStock(stock.map(s => s._id === id ? updated : s));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la mise à jour du matériel' 
//       };
//     }
//   };

//   const deleteMateriel = async (id) => {
//     try {
//       await stockService.deleteMateriel(id);
//       setStock(stock.filter(s => s._id !== id));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la suppression du matériel' 
//       };
//     }
//   };

//   // Gestion des emprunts
//   const addEmprunt = async (emprunt) => {
//     try {
//       const newEmprunt = await empruntService.createEmprunt(emprunt);
//       setEmprunts([...emprunts, newEmprunt]);
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
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
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors du retour' 
//       };
//     }
//   };

//   // NOUVELLE FONCTION POUR MODIFIER LES EMPRUNTS
//   const updateEmprunt = async (empruntId, updatedData) => {
//     try {
//       const updated = await empruntService.updateEmprunt(empruntId, updatedData);
//       setEmprunts(emprunts.map(e => e._id === empruntId ? updated : e));
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la modification de l\'emprunt' 
//       };
//     }
//   };

//   // 🔄 FONCTION POUR RECHARGER LES DONNÉES SPÉCIFIQUES
//   const reloadData = async (dataTypes = ['all']) => {
//     try {
//       console.log('🔄 Rechargement des données:', dataTypes);
      
//       const promises = [];
      
//       if (dataTypes.includes('all') || dataTypes.includes('interventions')) {
//         promises.push(
//           interventionService.getInterventions()
//             .then(data => setInterventions(data))
//             .catch(err => console.error('❌ Erreur rechargement interventions:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('stock')) {
//         promises.push(
//           stockService.getStock()
//             .then(data => setStock(data))
//             .catch(err => console.error('❌ Erreur rechargement stock:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('emprunts')) {
//         promises.push(
//           empruntService.getEmprunts()
//             .then(data => setEmprunts(data))
//             .catch(err => console.error('❌ Erreur rechargement emprunts:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('users') && currentUser.role === 'admin') {
//         promises.push(
//           userService.getUsers()
//             .then(data => setUsers(data))
//             .catch(err => console.error('❌ Erreur rechargement users:', err))
//         );
//       }
      
//       await Promise.all(promises);
//       console.log('✅ Données rechargées avec succès');
      
//     } catch (err) {
//       console.error('❌ Erreur lors du rechargement des données:', err);
//     }
//   };

//   // 🔄 FONCTION POUR RECHARGER UNE INTERVENTION SPÉCIFIQUE
//   const reloadIntervention = async (interventionId) => {
//     try {
//       const updatedIntervention = await interventionService.getIntervention(interventionId);
//       setInterventions(interventions.map(i => 
//         i._id === interventionId ? updatedIntervention : i
//       ));
      
//       // ✅ INCREMENTER LE COMPTEUR DE MISES À JOUR DE FICHIERS
//       setFileUpdates(prev => prev + 1);
      
//       return { success: true };
//     } catch (err) {
//       console.error('❌ Erreur rechargement intervention:', err);
//       return { success: false };
//     }
//   };

//   // ✅ NOUVELLE FONCTION : Gérer l'upload/suppression de fichiers
//   const handleFileUploaded = async (interventionId) => {
//     try {
//       // Recharger l'intervention spécifique
//       if (reloadIntervention) {
//         await reloadIntervention(interventionId);
//       }
//     } catch (err) {
//       console.error('❌ Erreur lors du rechargement après opération sur fichiers:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <div className="text-xl dark:text-white">Chargement des données...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-center max-w-md">
//           <div className="text-6xl mb-4">⚠️</div>
//           <div className="text-xl text-red-600 dark:text-red-400 mb-4">Erreur: {error}</div>
//           <div className="flex gap-4 justify-center">
//             <button 
//               onClick={() => {
//                 hasLoadedData.current = false;
//                 loadAllData();
//               }} 
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
//             >
//               Réessayer
//             </button>
//             <button 
//               onClick={() => {
//                 hasLoadedData.current = false;
//                 window.location.reload();
//               }} 
//               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
//             >
//               Actualiser
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ThemeProvider>
//       <UserProvider initialUser={currentUser} onLogout={logout}> {/* ✅ WRAP AVEC UserProvider */}
//         <NotificationProvider>
//           <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//             <Header 
//               setActiveView={setActiveView}
//             />

//             <div className="container mx-auto px-4 py-6 flex gap-6">
//               <Sidebar 
//                 activeView={activeView} 
//                 setActiveView={setActiveView}
//                 currentUser={currentUser}
//               />

//               <main className="flex-1">
//                 {activeView === 'dashboard' && (
//                   <Dashboard 
//                     currentUser={currentUser}
//                     interventions={interventions}
//                     stock={stock}
//                     emprunts={emprunts}
//                     onReloadData={reloadData}
//                   />
//                 )}

//                 {activeView === 'historique-emprunts' && (
//                   <HistoriqueEmpruntsView
//                     emprunts={emprunts}
//                     stock={stock}
//                     currentUser={currentUser}
//                   />
//                 )}
                
//                 {activeView === 'interventions' && (
//                   <InterventionsView
//                     currentUser={currentUser}
//                     interventions={interventions}
//                     users={users}
//                     onAdd={addIntervention}
//                     onUpdate={updateIntervention}
//                     onDelete={deleteIntervention}
//                     onValider={validerIntervention}
//                     filterDate={filterDate}
//                     setFilterDate={setFilterDate}
//                     filterStatut={filterStatut}
//                     setFilterStatut={setFilterStatut}
//                     onReloadIntervention={reloadIntervention}
//                     onFileUploaded={handleFileUploaded}
//                     fileUpdates={fileUpdates}
//                   />
//                 )}
                
//                 {activeView === 'planning' && (
//                   <PlanningView
//                     interventions={interventions}
//                     users={users}
//                     currentUser={currentUser}
//                   />
//                 )}
                
//                 {activeView === 'stock' && (
//                   <StockView
//                     stock={stock}
//                     emprunts={emprunts}
//                     onUpdateStock={updateMateriel}
//                     onAddEmprunt={addEmprunt}
//                     onRetourner={retournerEmprunt}
//                     onUpdateEmprunt={updateEmprunt}
//                     onDeleteMateriel={deleteMateriel}
//                     onAddMateriel={addMateriel}
//                     currentUser={currentUser}
//                     onReloadData={reloadData}
//                   />
//                 )}
                
//                 {activeView === 'users' && currentUser.role === 'admin' && (
//                   <UsersView
//                     users={users}
//                     setUsers={setUsers}
//                     onReloadData={reloadData}
//                   />
//                 )}

//                 {activeView === 'demandes' && currentUser.role === 'admin' && (
//                   <DemandesView />
//                 )}

//                 {activeView === 'statistiques' && (
//                   <StatistiquesView currentUser={currentUser} />
//                 )}

//                 {activeView === 'settings' && (
//                   <SettingsView 
//                     currentUser={currentUser} 
//                     onLogout={logout}
//                   />
//                 )}

//                 {activeView === 'profile' && (
//                   <ProfileView 
//                     setActiveView={setActiveView}
//                     onProfileUpdate={async () => {
//                       // Recharger uniquement les données nécessaires
//                       await reloadData(['interventions', 'stock', 'emprunts']);
//                     }}
//                   />
//                 )}
//               </main>
//             </div>

//             {/* Container pour les notifications */}
//             <NotificationContainer />
//           </div>
//         </NotificationProvider>
//       </UserProvider>
//     </ThemeProvider>
//   );
// };

// export default App;


// NOUVELLE VERSION AVEC DE LOGS


// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from './context/AuthContext';
// import { NotificationProvider } from './context/NotificationContext';
// import { ThemeProvider } from './context/ThemeContext';
// import { UserProvider } from './context/UserContext'; // ✅ NOUVEAU
// import Header from './components/layout/Header';
// import Sidebar from './components/layout/Sidebar';
// import Dashboard from './components/views/Dashboard';
// import InterventionsView from './components/views/InterventionsView';
// import PlanningView from './components/views/PlanningView';
// import StockView from './components/views/StockView';
// import UsersView from './components/views/UsersView';
// import DemandesView from './components/views/DemandesView';
// import SettingsView from './components/views/SettingsView';
// import ProfileView from './components/views/ProfileView';
// import NotificationContainer from './components/NotificationContainer';
// import HistoriqueEmpruntsView from './components/views/HistoriqueEmpruntsView';
// import StatistiquesView from './components/views/StatistiquesView';

// // Importation des services
// import * as interventionService from './services/interventionService';
// import * as userService from './services/userService';
// import * as stockService from './services/stockService';
// import * as empruntService from './services/empruntService';

// const App = () => {
//   const { currentUser, logout, updateCurrentUser } = useAuth();
  
//   const [interventions, setInterventions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [stock, setStock] = useState([]);
//   const [emprunts, setEmprunts] = useState([]);
  
//   const [activeView, setActiveView] = useState('dashboard');
//   const [filterDate, setFilterDate] = useState('');
//   const [filterStatut, setFilterStatut] = useState('');
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Utiliser useRef pour éviter la boucle infinie
//   const hasLoadedData = useRef(false);

//   // ✅ NOUVEAU : État pour suivre les modifications de fichiers
//   const [fileUpdates, setFileUpdates] = useState(0);

//   // Fonction pour récupérer le token
//   const getAuthToken = () => {
//     return localStorage.getItem('authToken') || localStorage.getItem('token');
//   };

//   // Charger les données au montage du composant UNIQUEMENT
//   useEffect(() => {
//     if (currentUser && !hasLoadedData.current) {
//       hasLoadedData.current = true;
//       loadAllData();
//     }
//   }, [currentUser]);

//   const loadAllData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       console.log('🔄 Début du chargement des données...');
      
//       const token = getAuthToken();
//       if (!token) {
//         console.warn('⚠️ Token non trouvé dans le localStorage');
//         setError('Erreur d\'authentification. Veuillez vous reconnecter.');
//         hasLoadedData.current = false;
//         return;
//       }
      
//       // 1️⃣ Charger les informations de l'utilisateur actuel via /api/auth/me
//       try {
//         const userResponse = await fetch('http://localhost:5000/api/auth/me', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
          
//           if (userData.success && userData.data) {
//             console.log('✅ Données utilisateur vérifiées:', userData.data);
//             // ✅ METTRE À JOUR LE CURRENTUSER AVEC LES DONNÉES DU SERVEUR
//             updateCurrentUser(userData.data);
//           }
//         } else {
//           console.warn('⚠️ Impossible de charger les données utilisateur:', userResponse.status);
//         }
//       } catch (err) {
//         console.warn('⚠️ Erreur lors du chargement des données utilisateur:', err);
//         // On continue même si ça échoue
//       }

//       // 2️⃣ Charger les autres données avec gestion d'erreur individuelle
//       const dataPromises = [
//         interventionService.getInterventions().catch(err => {
//           console.error('❌ Erreur interventions:', err);
//           return [];
//         }),
//         currentUser.role === 'admin' 
//           ? userService.getUsers().catch(err => {
//               console.error('❌ Erreur users:', err);
//               return [];
//             })
//           : Promise.resolve([]),
//         stockService.getStock().catch(err => {
//           console.error('❌ Erreur stock:', err);
//           return [];
//         }),
//         empruntService.getEmprunts().catch(err => {
//           console.error('❌ Erreur emprunts:', err);
//           return [];
//         })
//       ];

//       const [interventionsData, usersData, stockData, empruntsData] = await Promise.all(dataPromises);

//       setInterventions(interventionsData);
//       setUsers(usersData);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       console.log('✅ Toutes les données chargées avec succès');
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Erreur lors du chargement des données');
//       console.error('❌ Erreur:', err);
//       hasLoadedData.current = false;
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

//   // ✅ NOUVELLE FONCTION : Valider une intervention (admin uniquement)
//   const validerIntervention = async (interventionId) => {
//     try {
//       console.log('🔄 Validation intervention ID:', interventionId);
      
//       // Utiliser le service existant
//       const response = await interventionService.validerIntervention(interventionId);
      
//       // Mettre à jour l'état local
//       setInterventions(interventions.map(i => 
//         i._id === interventionId ? response : i
//       ));
      
//       return { success: true, data: response };
//     } catch (err) {
//       console.error('❌ Erreur validation intervention:', err);
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la validation' 
//       };
//     }
//   };

//   // Gestion du stock - FONCTION EXISTANTE (gardée pour compatibilité)
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

//   // NOUVELLES FONCTIONS POUR LA GESTION COMPLÈTE DES MATÉRIELS
//   const addMateriel = async (materielData) => {
//     try {
//       const newMateriel = await stockService.createMateriel(materielData);
//       setStock([...stock, newMateriel]);
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de l\'ajout du matériel' 
//       };
//     }
//   };

//   const updateMateriel = async (id, updatedData) => {
//     try {
//       const updated = await stockService.updateMateriel(id, updatedData);
//       setStock(stock.map(s => s._id === id ? updated : s));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la mise à jour du matériel' 
//       };
//     }
//   };

//   const deleteMateriel = async (id) => {
//     try {
//       await stockService.deleteMateriel(id);
//       setStock(stock.filter(s => s._id !== id));
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la suppression du matériel' 
//       };
//     }
//   };

//   // Gestion des emprunts
//   const addEmprunt = async (emprunt) => {
//     try {
//       const newEmprunt = await empruntService.createEmprunt(emprunt);
//       setEmprunts([...emprunts, newEmprunt]);
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
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
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors du retour' 
//       };
//     }
//   };

//   // NOUVELLE FONCTION POUR MODIFIER LES EMPRUNTS
//   const updateEmprunt = async (empruntId, updatedData) => {
//     try {
//       const updated = await empruntService.updateEmprunt(empruntId, updatedData);
//       setEmprunts(emprunts.map(e => e._id === empruntId ? updated : e));
      
//       // Recharger uniquement le stock et les emprunts
//       const [stockData, empruntsData] = await Promise.all([
//         stockService.getStock(),
//         empruntService.getEmprunts()
//       ]);
//       setStock(stockData);
//       setEmprunts(empruntsData);
      
//       return { success: true };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || 'Erreur lors de la modification de l\'emprunt' 
//       };
//     }
//   };

//   // 🔄 FONCTION POUR RECHARGER LES DONNÉES SPÉCIFIQUES
//   const reloadData = async (dataTypes = ['all']) => {
//     try {
//       console.log('🔄 Rechargement des données:', dataTypes);
      
//       const promises = [];
      
//       if (dataTypes.includes('all') || dataTypes.includes('interventions')) {
//         promises.push(
//           interventionService.getInterventions()
//             .then(data => setInterventions(data))
//             .catch(err => console.error('❌ Erreur rechargement interventions:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('stock')) {
//         promises.push(
//           stockService.getStock()
//             .then(data => setStock(data))
//             .catch(err => console.error('❌ Erreur rechargement stock:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('emprunts')) {
//         promises.push(
//           empruntService.getEmprunts()
//             .then(data => setEmprunts(data))
//             .catch(err => console.error('❌ Erreur rechargement emprunts:', err))
//         );
//       }
      
//       if (dataTypes.includes('all') || dataTypes.includes('users') && currentUser.role === 'admin') {
//         promises.push(
//           userService.getUsers()
//             .then(data => setUsers(data))
//             .catch(err => console.error('❌ Erreur rechargement users:', err))
//         );
//       }
      
//       await Promise.all(promises);
//       console.log('✅ Données rechargées avec succès');
      
//     } catch (err) {
//       console.error('❌ Erreur lors du rechargement des données:', err);
//     }
//   };

//   // 🔄 FONCTION POUR RECHARGER UNE INTERVENTION SPÉCIFIQUE
//   const reloadIntervention = async (interventionId) => {
//     try {
//       const updatedIntervention = await interventionService.getIntervention(interventionId);
//       setInterventions(interventions.map(i => 
//         i._id === interventionId ? updatedIntervention : i
//       ));
      
//       // ✅ INCREMENTER LE COMPTEUR DE MISES À JOUR DE FICHIERS
//       setFileUpdates(prev => prev + 1);
      
//       return { success: true };
//     } catch (err) {
//       console.error('❌ Erreur rechargement intervention:', err);
//       return { success: false };
//     }
//   };

//   // ✅ NOUVELLE FONCTION : Gérer l'upload/suppression de fichiers
//   const handleFileUploaded = async (interventionId) => {
//     try {
//       // Recharger l'intervention spécifique
//       if (reloadIntervention) {
//         await reloadIntervention(interventionId);
//       }
//     } catch (err) {
//       console.error('❌ Erreur lors du rechargement après opération sur fichiers:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <div className="text-xl dark:text-white">Chargement des données...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//         <div className="text-center max-w-md">
//           <div className="text-6xl mb-4">⚠️</div>
//           <div className="text-xl text-red-600 dark:text-red-400 mb-4">Erreur: {error}</div>
//           <div className="flex gap-4 justify-center">
//             <button 
//               onClick={() => {
//                 hasLoadedData.current = false;
//                 loadAllData();
//               }} 
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
//             >
//               Réessayer
//             </button>
//             <button 
//               onClick={() => {
//                 hasLoadedData.current = false;
//                 window.location.reload();
//               }} 
//               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
//             >
//               Actualiser
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ThemeProvider>
//       <UserProvider initialUser={currentUser} onLogout={logout}> {/* ✅ WRAP AVEC UserProvider */}
//         <NotificationProvider>
//           <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//             <Header 
//               setActiveView={setActiveView}
//             />

//             <div className="container mx-auto px-4 py-6 flex gap-6">
//               <Sidebar 
//                 activeView={activeView} 
//                 setActiveView={setActiveView}
//                 currentUser={currentUser}
//               />

//               <main className="flex-1">
//                 {activeView === 'dashboard' && (
//                   <Dashboard 
//                     currentUser={currentUser}
//                     interventions={interventions}
//                     stock={stock}
//                     emprunts={emprunts}
//                     onReloadData={reloadData}
//                   />
//                 )}

//                 {activeView === 'historique-emprunts' && (
//                   <HistoriqueEmpruntsView
//                     emprunts={emprunts}
//                     stock={stock}
//                     currentUser={currentUser}
//                   />
//                 )}
                
//                 {activeView === 'interventions' && (
//                   <InterventionsView
//                     currentUser={currentUser}
//                     interventions={interventions}
//                     users={users}
//                     onAdd={addIntervention}
//                     onUpdate={updateIntervention}
//                     onDelete={deleteIntervention}
//                     onValider={validerIntervention}
//                     filterDate={filterDate}
//                     setFilterDate={setFilterDate}
//                     filterStatut={filterStatut}
//                     setFilterStatut={setFilterStatut}
//                     onReloadIntervention={reloadIntervention}
//                     onFileUploaded={handleFileUploaded}
//                     fileUpdates={fileUpdates}
//                   />
//                 )}
                
//                 {activeView === 'planning' && (
//                   <PlanningView
//                     interventions={interventions}
//                     users={users}
//                     currentUser={currentUser}
//                   />
//                 )}
                
//                 {activeView === 'stock' && (
//                   <StockView
//                     stock={stock}
//                     emprunts={emprunts}
//                     onUpdateStock={updateMateriel}
//                     onAddEmprunt={addEmprunt}
//                     onRetourner={retournerEmprunt}
//                     onUpdateEmprunt={updateEmprunt}
//                     onDeleteMateriel={deleteMateriel}
//                     onAddMateriel={addMateriel}
//                     currentUser={currentUser}
//                     onReloadData={reloadData}
//                   />
//                 )}
                
//                 {activeView === 'users' && currentUser.role === 'admin' && (
//                   <UsersView
//                     users={users}
//                     setUsers={setUsers}
//                     onReloadData={reloadData}
//                   />
//                 )}

//                 {activeView === 'demandes' && currentUser.role === 'admin' && (
//                   <DemandesView />
//                 )}

//                 {activeView === 'statistiques' && (
//                   <StatistiquesView currentUser={currentUser} />
//                 )}

//                 {activeView === 'settings' && (
//                   <SettingsView 
//                     currentUser={currentUser} 
//                     onLogout={logout}
//                   />
//                 )}

//                 {activeView === 'profile' && (
//                   <ProfileView 
//                     setActiveView={setActiveView}
//                     onProfileUpdate={async () => {
//                       // Recharger uniquement les données nécessaires
//                       await reloadData(['interventions', 'stock', 'emprunts', 'users']);
//                     }}
//                   />
//                 )}
//               </main>
//             </div>

//             {/* Container pour les notifications */}
//             <NotificationContainer />
//           </div>
//         </NotificationProvider>
//       </UserProvider>
//     </ThemeProvider>
//   );
// };

// export default App;



// NOUVELLE VERSION POUR LE BOUTON "RETOUR" ET "ANNULER"



import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
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
import StatistiquesView from './components/views/StatistiquesView';

// Importation des services
import * as interventionService from './services/interventionService';
import * as userService from './services/userService';
import * as stockService from './services/stockService';
import * as empruntService from './services/empruntService';
// import * as demandeService from './services/demandeService';
// import * as statsService from './services/statsService';


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

  // ✅ État pour contrôler l'affichage du menu utilisateur
  const [showUserMenu, setShowUserMenu] = useState(false);

  // ✅ Utiliser useRef pour éviter la boucle infinie
  const hasLoadedData = useRef(false);

  // ✅ État pour suivre les modifications de fichiers
  const [fileUpdates, setFileUpdates] = useState(0);

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
            console.log('✅ Données utilisateur vérifiées:', userData.data);
            updateCurrentUser(userData.data);
          }
        } else {
          console.warn('⚠️ Impossible de charger les données utilisateur:', userResponse.status);
        }
      } catch (err) {
        console.warn('⚠️ Erreur lors du chargement des données utilisateur:', err);
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

  const validerIntervention = async (interventionId) => {
    try {
      console.log('🔄 Validation intervention ID:', interventionId);
      const response = await interventionService.validerIntervention(interventionId);
      setInterventions(interventions.map(i => 
        i._id === interventionId ? response : i
      ));
      return { success: true, data: response };
    } catch (err) {
      console.error('❌ Erreur validation intervention:', err);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erreur lors de la validation' 
      };
    }
  };

  // Gestion du stock
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

  const updateEmprunt = async (empruntId, updatedData) => {
    try {
      const updated = await empruntService.updateEmprunt(empruntId, updatedData);
      setEmprunts(emprunts.map(e => e._id === empruntId ? updated : e));
      
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

  // 🔄 FONCTION POUR RECHARGER LES DONNÉES SPÉCIFIQUES
  const reloadData = async (dataTypes = ['all']) => {
    try {
      console.log('🔄 Rechargement des données:', dataTypes);
      
      const promises = [];
      
      if (dataTypes.includes('all') || dataTypes.includes('interventions')) {
        promises.push(
          interventionService.getInterventions()
            .then(data => setInterventions(data))
            .catch(err => console.error('❌ Erreur rechargement interventions:', err))
        );
      }
      
      if (dataTypes.includes('all') || dataTypes.includes('stock')) {
        promises.push(
          stockService.getStock()
            .then(data => setStock(data))
            .catch(err => console.error('❌ Erreur rechargement stock:', err))
        );
      }
      
      if (dataTypes.includes('all') || dataTypes.includes('emprunts')) {
        promises.push(
          empruntService.getEmprunts()
            .then(data => setEmprunts(data))
            .catch(err => console.error('❌ Erreur rechargement emprunts:', err))
        );
      }
      
      if (dataTypes.includes('all') || dataTypes.includes('users') && currentUser.role === 'admin') {
        promises.push(
          userService.getUsers()
            .then(data => setUsers(data))
            .catch(err => console.error('❌ Erreur rechargement users:', err))
        );
      }
      
      await Promise.all(promises);
      console.log('✅ Données rechargées avec succès');
      
    } catch (err) {
      console.error('❌ Erreur lors du rechargement des données:', err);
    }
  };

  const reloadIntervention = async (interventionId) => {
    try {
      const updatedIntervention = await interventionService.getIntervention(interventionId);
      setInterventions(interventions.map(i => 
        i._id === interventionId ? updatedIntervention : i
      ));
      setFileUpdates(prev => prev + 1);
      return { success: true };
    } catch (err) {
      console.error('❌ Erreur rechargement intervention:', err);
      return { success: false };
    }
  };

  const handleFileUploaded = async (interventionId) => {
    try {
      if (reloadIntervention) {
        await reloadIntervention(interventionId);
      }
    } catch (err) {
      console.error('❌ Erreur lors du rechargement après opération sur fichiers:', err);
    }
  };

  // ✅ FONCTION : Afficher le menu utilisateur
  const handleShowUserMenu = () => {
    console.log('🔄 Affichage du menu utilisateur depuis App');
    setShowUserMenu(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl dark:text-white">Chargement des données...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-xl text-red-600 dark:text-red-400 mb-4">Erreur: {error}</div>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => {
                hasLoadedData.current = false;
                loadAllData();
              }} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Réessayer
            </button>
            <button 
              onClick={() => {
                hasLoadedData.current = false;
                window.location.reload();
              }} 
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Actualiser
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <UserProvider initialUser={currentUser} onLogout={logout}>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
            <Header 
              setActiveView={setActiveView}
              showUserMenu={showUserMenu}
              setShowUserMenu={setShowUserMenu}
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
                    onReloadData={reloadData}
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
                    onValider={validerIntervention}
                    filterDate={filterDate}
                    setFilterDate={setFilterDate}
                    filterStatut={filterStatut}
                    setFilterStatut={setFilterStatut}
                    onReloadIntervention={reloadIntervention}
                    onFileUploaded={handleFileUploaded}
                    fileUpdates={fileUpdates}
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
                    onReloadData={reloadData}
                  />
                )}
                
                {activeView === 'users' && currentUser.role === 'admin' && (
                  <UsersView
                    users={users}
                    setUsers={setUsers}
                    onReloadData={reloadData}
                  />
                )}

                {activeView === 'demandes' && currentUser.role === 'admin' && (
                  <DemandesView />
                )}

                {activeView === 'statistiques' && (
                  <StatistiquesView currentUser={currentUser} />
                )}

                {activeView === 'settings' && (
                  <SettingsView 
                    currentUser={currentUser} 
                    onLogout={logout}
                  />
                )}

                {activeView === 'profile' && (
                  <ProfileView 
                    setActiveView={setActiveView}
                    onProfileUpdate={async () => {
                      await reloadData(['interventions', 'stock', 'emprunts', 'users']);
                    }}
                    onShowUserMenu={handleShowUserMenu} // ✅ PROP POUR AFFICHER LE MENU
                  />
                )}
              </main>
            </div>

            <NotificationContainer />
          </div>
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;