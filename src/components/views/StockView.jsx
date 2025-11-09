
// NOUVELLE VERSION DEEPSEEK AVEC INTEGRATION DU SYSTEME DE NOTIFICATIONS


// import React, { useState, useEffect, useRef } from 'react';
// import { Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
// import EmpruntModal from '../modals/EmpruntModal';
// import { useNotifications } from '../../context/NotificationContext';

// const StockView = ({ stock, emprunts, onUpdateStock, onAddEmprunt, onRetourner, onUpdateEmprunt, onDeleteMateriel, onAddMateriel, currentUser, onReloadData }) => {
//   const [showEmpruntModal, setShowEmpruntModal] = useState(false);
//   const [showMaterielModal, setShowMaterielModal] = useState(false);
//   const [editingEmprunt, setEditingEmprunt] = useState(null);
//   const [editingMateriel, setEditingMateriel] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { showSuccess, showError, showWarning, showInfo } = useNotifications();
//   const prevEmpruntsRef = useRef([]);

//   const empruntsActifs = emprunts.filter(e => e.statut === 'en_cours');

//   // DEBUG: Afficher la structure complète de currentUser
//   console.log('=== CURRENT USER STRUCTURE ===', currentUser);

//   // Fonction pour obtenir l'ID de l'utilisateur (gère différents formats)
//   const getUserId = () => {
//     // Essayer différentes propriétés possibles pour l'ID
//     return currentUser?.id || 
//            currentUser?._id || 
//            currentUser?.user?.id || 
//            currentUser?.user?._id ||
//            currentUser?.data?.id ||
//            currentUser?.data?._id;
//   };

//   const userId = getUserId();
//   console.log('User ID trouvé:', userId);

//   // Fonction pour vérifier si l'utilisateur peut gérer les emprunts
//   const canManageEmprunts = () => {
//     const userRole = currentUser?.role || currentUser?.user?.role;
//     return ['admin', 'informaticien', 'electricien'].includes(userRole);
//   };

//   // Fonction pour vérifier si l'utilisateur peut gérer le stock
//   const canManageStock = () => {
//     const userRole = currentUser?.role || currentUser?.user?.role;
//     return userRole === 'admin';
//   };

//   // Fonction pour vérifier si l'utilisateur peut modifier/supprimer un emprunt spécifique
//   const canModifyEmprunt = (emprunt) => {
//     const userRole = currentUser?.role || currentUser?.user?.role;
    
//     if (userRole === 'admin') {
//       console.log('Admin peut modifier tous les emprunts');
//       return true;
//     }
    
//     // Vérifier si le technicien est le responsable de cet emprunt
//     // Gérer les différents formats de responsable (ObjectId string ou objet populate)
//     const responsableId = 
//       emprunt.responsable?._id ? emprunt.responsable._id.toString() : // Si c'est un objet populate
//       emprunt.responsable ? emprunt.responsable.toString() : // Si c'est un ObjectId string
//       null;
    
//     const userCanModify = responsableId === userId;
    
//     console.log('Responsable ID:', responsableId);
//     console.log('Current User ID:', userId);
//     console.log('User can modify:', userCanModify);
    
//     return userCanModify;
//   };

//   // Détecter les nouveaux emprunts en retard
//   useEffect(() => {
//     const empruntsActifsPrecedents = prevEmpruntsRef.current.filter(e => e.statut === 'en_cours');
//     const empruntsActifsActuels = emprunts.filter(e => e.statut === 'en_cours');
    
//     const aujourdhui = new Date();
    
//     // Vérifier les nouveaux retards
//     empruntsActifsActuels.forEach(emprunt => {
//       const dateRetour = new Date(emprunt.dateRetourPrevue);
//       const etaitEnRetard = empruntsActifsPrecedents.some(
//         e => e._id === emprunt._id && new Date(e.dateRetourPrevue) < aujourdhui
//       );
      
//       const estEnRetard = dateRetour < aujourdhui;
      
//       if (estEnRetard && !etaitEnRetard) {
//         const joursRetard = Math.ceil((aujourdhui - dateRetour) / (1000 * 60 * 60 * 24));
//         showWarning(
//           'Emprunt en retard',
//           `L'emprunt de "${emprunt.materiel?.nom}" est en retard de ${joursRetard} jour(s)`
//         );
//       }
//     });
    
//     prevEmpruntsRef.current = emprunts;
//   }, [emprunts, showWarning]);

//   const handleAddEmprunt = async (data, empruntId = null) => {
//     setLoading(true);
//     let result;
    
//     try {
//       if (empruntId && onUpdateEmprunt) {
//         result = await onUpdateEmprunt(empruntId, data);
//         if (result.success) {
//           showSuccess('Emprunt modifié', 'L\'emprunt a été modifié avec succès');
//         }
//       } else {
//         result = await onAddEmprunt(data);
//         if (result.success) {
//           showSuccess('Emprunt créé', 'Le nouvel emprunt a été créé avec succès');
//         }
//       }
      
//       setLoading(false);

//       if (result.success) {
//         setShowEmpruntModal(false);
//         setEditingEmprunt(null);
        
//         // ✅ RECHARGER LES DONNÉES EMPRUNTS ET STOCK
//         if (onReloadData) {
//           await onReloadData(['emprunts', 'stock']);
//         }
//       } else {
//         showError('Erreur', result.message || 'Erreur lors de l\'opération');
//       }
//     } catch (error) {
//       setLoading(false);
//       showError('Erreur', 'Une erreur est survenue lors de l\'opération');
//     }
//   };

//   const handleEditEmprunt = (emprunt) => {
//     setEditingEmprunt(emprunt);
//     setShowEmpruntModal(true);
//   };

//   const handleRetourner = async (empruntId) => {
//     const emprunt = emprunts.find(e => e._id === empruntId);
//     if (!emprunt) return;
    
//     const confirmation = window.confirm(
//       `Êtes-vous sûr de vouloir retourner l'emprunt de "${emprunt.materiel?.nom}" ?\n` +
//       `Emprunteur: ${emprunt.emprunteur}\n` +
//       `Quantité: ${emprunt.quantite}`
//     );
    
//     if (!confirmation) {
//       showInfo('Retour annulé', 'Le retour a été annulé');
//       return;
//     }

//     try {
//       const result = await onRetourner(empruntId);
//       if (result.success) {
//         showSuccess(
//           'Retour confirmé',
//           `L'emprunt de "${emprunt.materiel?.nom}" a été retourné avec succès`
//         );
        
//         // ✅ RECHARGER LES DONNÉES EMPRUNTS ET STOCK
//         if (onReloadData) {
//           await onReloadData(['emprunts', 'stock']);
//         }
//       } else {
//         showError(
//           'Erreur lors du retour',
//           result.message || 'Une erreur est survenue lors du retour'
//         );
//       }
//     } catch (error) {
//       showError(
//         'Erreur',
//         'Une erreur est survenue lors du retour de l\'emprunt'
//       );
//     }
//   };

//   const handleEditMateriel = (materiel) => {
//     setEditingMateriel(materiel);
//     setShowMaterielModal(true);
//   };

//   const handleDeleteMateriel = async (materielId) => {
//     if (!onDeleteMateriel) {
//       alert('Fonction de suppression non disponible');
//       return;
//     }

//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce matériel ?')) {
//       const result = await onDeleteMateriel(materielId);
//       if (result.success) {
//         // ✅ RECHARGER LES DONNÉES STOCK
//         if (onReloadData) {
//           await onReloadData(['stock']);
//         }
//       } else {
//         alert(result.message || 'Erreur lors de la suppression');
//       }
//     }
//   };

//   const handleSaveMateriel = async (materielData) => {
//     setLoading(true);
//     let result;
    
//     if (editingMateriel && onUpdateStock) {
//       result = await onUpdateStock(editingMateriel._id, materielData);
//     } else if (onAddMateriel) {
//       result = await onAddMateriel(materielData);
//     } else {
//       alert('Fonction non disponible');
//       return;
//     }
    
//     setLoading(false);

//     if (result.success) {
//       setShowMaterielModal(false);
//       setEditingMateriel(null);
      
//       // ✅ RECHARGER LES DONNÉES STOCK
//       if (onReloadData) {
//         await onReloadData(['stock']);
//       }
//     } else {
//       alert(result.message || 'Erreur lors de l\'opération');
//     }
//   };

//   const handleNewMateriel = () => {
//     setEditingMateriel(null);
//     setShowMaterielModal(true);
//   };

//   const handleNewEmprunt = () => {
//     setEditingEmprunt(null);
//     setShowEmpruntModal(true);
//   };

//   // Obtenir le rôle affichable
//   const getUserRoleDisplay = () => {
//     return currentUser?.role || currentUser?.user?.role || 'Non défini';
//   };

//   // Fonction pour vérifier les emprunts en retard
//   const getEmpruntsEnRetard = () => {
//     const aujourdhui = new Date();
//     return empruntsActifs.filter(emprunt => {
//       const dateRetour = new Date(emprunt.dateRetourPrevue);
//       return dateRetour < aujourdhui;
//     });
//   };

//   // Composant pour afficher les alertes de retard
//   const AfficherAlertesRetard = () => {
//     const empruntsRetard = getEmpruntsEnRetard();
    
//     if (empruntsRetard.length === 0) {
//       return null;
//     }

//     return (
//       <div className="mb-6">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//           <div className="flex items-center gap-2 mb-3">
//             <AlertTriangle className="w-5 h-5 text-red-500" />
//             <h3 className="text-lg font-semibold text-red-800">
//               Emprunts en retard ({empruntsRetard.length})
//             </h3>
//           </div>
//           <div className="space-y-2">
//             {empruntsRetard.map(emprunt => {
//               const materiel = stock.find(s => s._id === emprunt.materiel?._id);
//               const joursRetard = Math.ceil(
//                 (new Date() - new Date(emprunt.dateRetourPrevue)) / (1000 * 60 * 60 * 24)
//               );
              
//               return (
//                 <div key={emprunt._id} className="flex justify-between items-center p-3 bg-red-100 rounded">
//                   <div>
//                     <p className="font-medium text-red-800">
//                       {emprunt.materiel?.nom || materiel?.nom}
//                     </p>
//                     <p className="text-sm text-red-600">
//                       Emprunteur: {emprunt.emprunteur} • 
//                       Retard: {joursRetard} jour(s) • 
//                       Responsable: {emprunt.responsable?.nom || 'Non défini'}
//                     </p>
//                   </div>
//                   {canModifyEmprunt(emprunt) && (
//                     <button
//                       onClick={() => handleRetourner(emprunt._id)}
//                       className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
//                     >
//                       Retourner
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Gestion du Stock</h2>
//         <div className="flex gap-3">
//           {/* Bouton Ajouter matériel - Admin seulement */}
//           {canManageStock() && (
//             <button
//               onClick={handleNewMateriel}
//               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//             >
//               <Plus size={18} />
//               Ajouter matériel
//             </button>
//           )}
          
//           {/* Bouton Nouvel emprunt - Admin et Techniciens */}
//           {canManageEmprunts() && (
//             <button
//               onClick={handleNewEmprunt}
//               className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
//             >
//               <Plus size={18} />
//               Nouvel emprunt
//             </button>
//           )}
//         </div>
//       </div>

//       {/* DEBUG: Afficher le rôle de l'utilisateur */}
//       <div className="bg-blue-50 p-3 rounded-lg">
//         <p className="text-sm text-blue-800">
//           <strong>Rôle actuel:</strong> {getUserRoleDisplay()} | 
//           <strong> ID:</strong> {userId || 'Non trouvé'} |
//           <strong> Peut gérer les emprunts:</strong> {canManageEmprunts() ? 'OUI' : 'NON'} |
//           <strong> Peut gérer le stock:</strong> {canManageStock() ? 'OUI' : 'NON'}
//         </p>
//       </div>

//       {/* Alertes pour les emprunts en retard */}
//       <AfficherAlertesRetard />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Section Stock */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-semibold">Matériels disponibles</h3>
//           </div>
//           <div className="space-y-3">
//             {stock.map(materiel => (
//               <div key={materiel._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//                 <div className="flex-1">
//                   <p className="font-semibold">{materiel.nom}</p>
//                   <p className="text-sm text-gray-600 capitalize">{materiel.categorie}</p>
//                 </div>
//                 <div className="text-right mr-4">
//                   <p className="text-lg font-bold text-blue-600">{materiel.disponible} / {materiel.quantite}</p>
//                   <p className="text-xs text-gray-500">disponibles</p>
//                 </div>
//                 {/* Boutons gestion matériel - Admin seulement */}
//                 {canManageStock() && (
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEditMateriel(materiel)}
//                       className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded transition"
//                       title="Modifier"
//                     >
//                       <Edit size={16} />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteMateriel(materiel._id)}
//                       className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded transition"
//                       title="Supprimer"
//                       disabled={!onDeleteMateriel}
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//             {stock.length === 0 && (
//               <p className="text-center text-gray-500 py-8">Aucun matériel en stock</p>
//             )}
//           </div>
//         </div>

//         {/* Section Emprunts */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-xl font-semibold mb-4">Emprunts en cours</h3>
//           <div className="space-y-3">
//             {empruntsActifs.map(emprunt => {
//               const materiel = stock.find(s => s._id === emprunt.materiel?._id);
//               const userCanModify = canModifyEmprunt(emprunt);
              
//               console.log(`Emprunt ${emprunt._id} - Peut modifier: ${userCanModify}`);
              
//               return (
//                 <div key={emprunt._id} className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <p className="font-semibold">{emprunt.materiel?.nom || materiel?.nom}</p>
//                       <p className="text-sm text-gray-600">Emprunteur: {emprunt.emprunteur}</p>
//                       <p className="text-sm text-gray-600">Quantité: {emprunt.quantite}</p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Emprunté le: {new Date(emprunt.dateEmprunt).toLocaleDateString('fr-FR')}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         Retour prévu: {new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR')}
//                       </p>
//                       {/* Afficher le responsable */}
//                       {emprunt.responsable && (
//                         <p className="text-xs text-blue-600 mt-1">
//                           Responsable: {emprunt.responsable.nom || emprunt.responsable} {emprunt.responsable.prenom || ''}
//                         </p>
//                       )}
//                       {/* DEBUG: Afficher si l'utilisateur peut modifier */}
//                       <p className={`text-xs mt-1 ${userCanModify ? 'text-green-600' : 'text-red-600'}`}>
//                         {userCanModify ? '✓ Vous pouvez modifier cet emprunt' : '✗ Vous ne pouvez pas modifier cet emprunt'}
//                       </p>
//                     </div>
                    
//                     {/* Boutons gestion emprunt - Admin et technicien propriétaire */}
//                     {userCanModify && canManageEmprunts() && (
//                       <div className="flex gap-2 ml-4">
//                         <button
//                           onClick={() => handleEditEmprunt(emprunt)}
//                           className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
//                           disabled={!onUpdateEmprunt}
//                         >
//                           Modifier
//                         </button>
//                         <button
//                           onClick={() => handleRetourner(emprunt._id)}
//                           className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition"
//                         >
//                           Retourner
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//             {empruntsActifs.length === 0 && (
//               <p className="text-center text-gray-500 py-8">Aucun emprunt en cours</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modal pour ajouter/modifier un emprunt */}
//       {showEmpruntModal && (
//         <EmpruntModal
//           stock={stock}
//           onSave={handleAddEmprunt}
//           onClose={() => {
//             setShowEmpruntModal(false);
//             setEditingEmprunt(null);
//           }}
//           loading={loading}
//           empruntToEdit={editingEmprunt}
//         />
//       )}

//       {/* Modal pour ajouter/modifier un matériel */}
//       {showMaterielModal && (
//         <MaterielModal
//           materiel={editingMateriel}
//           onSave={handleSaveMateriel}
//           onClose={() => {
//             setShowMaterielModal(false);
//             setEditingMateriel(null);
//           }}
//           loading={loading}
//         />
//       )}
//     </div>
//   );
// };

// // Composant Modal pour ajouter/modifier un matériel (inchangé)
// const MaterielModal = ({ materiel, onSave, onClose, loading }) => {
//   const isEditing = !!materiel;
  
//   const [formData, setFormData] = useState({
//     nom: materiel?.nom || '',
//     categorie: materiel?.categorie || '',
//     quantite: materiel?.quantite || 1,
//     disponible: materiel?.disponible || 1
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({
//       nom: formData.nom,
//       categorie: formData.categorie,
//       quantite: parseInt(formData.quantite) || 1,
//       disponible: parseInt(formData.disponible) || 0
//     });
//   };

//   const handleChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleQuantiteChange = (value) => {
//     const quantite = parseInt(value) || 1;
//     setFormData(prev => ({
//       ...prev,
//       quantite: quantite,
//       disponible: Math.min(prev.disponible, quantite)
//     }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <h3 className="text-xl font-bold mb-4">
//           {isEditing ? 'Modifier le matériel' : 'Nouveau matériel'}
//         </h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Nom du matériel</label>
//             <input
//               type="text"
//               value={formData.nom}
//               onChange={(e) => handleChange('nom', e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Nom du matériel"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Catégorie</label>
//             <input
//               type="text"
//               value={formData.categorie}
//               onChange={(e) => handleChange('categorie', e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Catégorie"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Quantité totale</label>
//             <input
//               type="number"
//               min="1"
//               value={formData.quantite}
//               onChange={(e) => handleQuantiteChange(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Quantité disponible</label>
//             <input
//               type="number"
//               min="0"
//               max={formData.quantite}
//               value={formData.disponible}
//               onChange={(e) => handleChange('disponible', parseInt(e.target.value) || 0)}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading}
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Maximum: {formData.quantite}
//             </p>
//           </div>

//           <div className="flex gap-3 justify-end pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50"
//               disabled={loading}
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
//               disabled={loading}
//             >
//               {loading ? 'Enregistrement...' : isEditing ? 'Modifier' : 'Ajouter'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StockView;


// NOUVELLE VERSION DEEPSEEK AVEC INTEGRATION DU SYSTEME DE NOTIFICATIONS REDESIGNEE


import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, AlertTriangle, Package, Users, TrendingUp, CheckCircle, X } from 'lucide-react';
import EmpruntModal from '../modals/EmpruntModal';
import { useNotifications } from '../../context/NotificationContext';

const StockView = ({ stock, emprunts, onUpdateStock, onAddEmprunt, onRetourner, onUpdateEmprunt, onDeleteMateriel, onAddMateriel, currentUser, onReloadData }) => {
  const [showEmpruntModal, setShowEmpruntModal] = useState(false);
  const [showMaterielModal, setShowMaterielModal] = useState(false);
  const [editingEmprunt, setEditingEmprunt] = useState(null);
  const [editingMateriel, setEditingMateriel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nom');

  const { showSuccess, showError, showWarning, showInfo } = useNotifications();
  const prevEmpruntsRef = useRef([]);

  const empruntsActifs = emprunts.filter(e => e.statut === 'en_cours');

  // Fonctions utilitaires
  const getUserId = () => {
    return currentUser?.id || currentUser?._id || currentUser?.user?.id || currentUser?.user?._id;
  };

  const userId = getUserId();

  const canManageEmprunts = () => {
    const userRole = currentUser?.role || currentUser?.user?.role;
    return ['admin', 'informaticien', 'electricien'].includes(userRole);
  };

  const canManageStock = () => {
    const userRole = currentUser?.role || currentUser?.user?.role;
    return userRole === 'admin';
  };

  const canModifyEmprunt = (emprunt) => {
    const userRole = currentUser?.role || currentUser?.user?.role;
    if (userRole === 'admin') return true;
    
    const responsableId = 
      emprunt.responsable?._id ? emprunt.responsable._id.toString() :
      emprunt.responsable ? emprunt.responsable.toString() : null;
    
    return responsableId === userId;
  };

  // Filtrage et tri
  const filteredStock = stock
    .filter(materiel => 
      materiel.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      materiel.categorie.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'nom': return a.nom.localeCompare(b.nom);
        case 'categorie': return a.categorie.localeCompare(b.categorie);
        case 'disponible': return b.disponible - a.disponible;
        case 'quantite': return b.quantite - a.quantite;
        default: return 0;
      }
    });

  const filteredEmprunts = empruntsActifs.filter(emprunt =>
    emprunt.materiel?.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emprunt.emprunteur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Détection des retards
  useEffect(() => {
    const empruntsActifsPrecedents = prevEmpruntsRef.current.filter(e => e.statut === 'en_cours');
    const empruntsActifsActuels = emprunts.filter(e => e.statut === 'en_cours');
    
    const aujourdhui = new Date();
    
    empruntsActifsActuels.forEach(emprunt => {
      const dateRetour = new Date(emprunt.dateRetourPrevue);
      const etaitEnRetard = empruntsActifsPrecedents.some(
        e => e._id === emprunt._id && new Date(e.dateRetourPrevue) < aujourdhui
      );
      
      const estEnRetard = dateRetour < aujourdhui;
      
      if (estEnRetard && !etaitEnRetard) {
        const joursRetard = Math.ceil((aujourdhui - dateRetour) / (1000 * 60 * 60 * 24));
        showWarning(
          'Emprunt en retard',
          `L'emprunt de "${emprunt.materiel?.nom}" est en retard de ${joursRetard} jour(s)`
        );
      }
    });
    
    prevEmpruntsRef.current = emprunts;
  }, [emprunts, showWarning]);

  // Gestion des emprunts
  const handleAddEmprunt = async (data, empruntId = null) => {
    setLoading(true);
    let result;
    
    try {
      if (empruntId && onUpdateEmprunt) {
        result = await onUpdateEmprunt(empruntId, data);
        if (result.success) showSuccess('Emprunt modifié', 'L\'emprunt a été modifié avec succès');
      } else {
        result = await onAddEmprunt(data);
        if (result.success) showSuccess('Emprunt créé', 'Le nouvel emprunt a été créé avec succès');
      }
      
      setLoading(false);

      if (result.success) {
        setShowEmpruntModal(false);
        setEditingEmprunt(null);
        if (onReloadData) await onReloadData(['emprunts', 'stock']);
      } else {
        showError('Erreur', result.message || 'Erreur lors de l\'opération');
      }
    } catch (error) {
      setLoading(false);
      showError('Erreur', 'Une erreur est survenue lors de l\'opération');
    }
  };

  const handleEditEmprunt = (emprunt) => {
    setEditingEmprunt(emprunt);
    setShowEmpruntModal(true);
  };

  const handleRetourner = async (empruntId) => {
    const emprunt = emprunts.find(e => e._id === empruntId);
    if (!emprunt) return;
    
    const confirmation = window.confirm(
      `Êtes-vous sûr de vouloir retourner l'emprunt de "${emprunt.materiel?.nom}" ?\n` +
      `Emprunteur: ${emprunt.emprunteur}\n` +
      `Quantité: ${emprunt.quantite}`
    );
    
    if (!confirmation) {
      showInfo('Retour annulé', 'Le retour a été annulé');
      return;
    }

    try {
      const result = await onRetourner(empruntId);
      if (result.success) {
        showSuccess('Retour confirmé', `L'emprunt de "${emprunt.materiel?.nom}" a été retourné avec succès`);
        if (onReloadData) await onReloadData(['emprunts', 'stock']);
      } else {
        showError('Erreur lors du retour', result.message || 'Une erreur est survenue lors du retour');
      }
    } catch (error) {
      showError('Erreur', 'Une erreur est survenue lors du retour de l\'emprunt');
    }
  };

  // Gestion des matériels
  const handleEditMateriel = (materiel) => {
    setEditingMateriel(materiel);
    setShowMaterielModal(true);
  };

  const handleDeleteMateriel = async (materielId) => {
    if (!onDeleteMateriel) {
      alert('Fonction de suppression non disponible');
      return;
    }

    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce matériel ?')) {
      const result = await onDeleteMateriel(materielId);
      if (result.success) {
        if (onReloadData) {
          await onReloadData(['stock']);
        }
      } else {
        alert(result.message || 'Erreur lors de la suppression');
      }
    }
  };

  const handleSaveMateriel = async (materielData) => {
    setLoading(true);
    let result;
    
    if (editingMateriel && onUpdateStock) {
      result = await onUpdateStock(editingMateriel._id, materielData);
    } else if (onAddMateriel) {
      result = await onAddMateriel(materielData);
    } else {
      alert('Fonction non disponible');
      return;
    }
    
    setLoading(false);

    if (result.success) {
      setShowMaterielModal(false);
      setEditingMateriel(null);
      
      if (onReloadData) {
        await onReloadData(['stock']);
      }
    } else {
      alert(result.message || 'Erreur lors de l\'opération');
    }
  };

  const handleNewMateriel = () => {
    setEditingMateriel(null);
    setShowMaterielModal(true);
  };

  const handleNewEmprunt = () => {
    setEditingEmprunt(null);
    setShowEmpruntModal(true);
  };

  // Composant pour les alertes de retard
  const AfficherAlertesRetard = () => {
    const empruntsRetard = empruntsActifs.filter(emprunt => {
      const dateRetour = new Date(emprunt.dateRetourPrevue);
      return dateRetour < new Date();
    });
    
    if (empruntsRetard.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                Emprunts en retard ({empruntsRetard.length})
              </h3>
              <p className="text-red-100 text-sm">Action requise</p>
            </div>
          </div>
          <div className="space-y-3">
            {empruntsRetard.map(emprunt => {
              const materiel = stock.find(s => s._id === emprunt.materiel?._id);
              const joursRetard = Math.ceil(
                (new Date() - new Date(emprunt.dateRetourPrevue)) / (1000 * 60 * 60 * 24)
              );
              
              return (
                <div key={emprunt._id} className="flex justify-between items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="flex-1">
                    <p className="font-semibold">{emprunt.materiel?.nom || materiel?.nom}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-red-100 mt-1">
                      <span>👤 {emprunt.emprunteur}</span>
                      <span>📦 {emprunt.quantite} unité(s)</span>
                      <span>⏰ {joursRetard} jour(s) de retard</span>
                      <span>👨‍💼 {emprunt.responsable?.nom || 'Non défini'}</span>
                    </div>
                  </div>
                  {canModifyEmprunt(emprunt) && (
                    <button
                      onClick={() => handleRetourner(emprunt._id)}
                      className="px-4 py-2 bg-white text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-semibold hover:scale-105"
                    >
                      Retourner
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      {/* Header avec statistiques */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gestion du Stock & Emprunts
            </h1>
            <p className="text-gray-600 mt-2">
              Gérez votre inventaire et suivez les emprunts en temps réel
            </p>
          </div>
          
          <div className="flex gap-3">
            {canManageStock() && (
              <button
                onClick={handleNewMateriel}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold group"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                Nouveau matériel
              </button>
            )}
            
            {canManageEmprunts() && (
              <button
                onClick={handleNewEmprunt}
                className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold group"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                Nouvel emprunt
              </button>
            )}
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Matériels</p>
                <p className="text-2xl font-bold text-gray-900">{stock.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Package size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emprunts Actifs</p>
                <p className="text-2xl font-bold text-blue-600">{empruntsActifs.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Retard</p>
                <p className="text-2xl font-bold text-red-600">
                  {empruntsActifs.filter(e => new Date(e.dateRetourPrevue) < new Date()).length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disponibilité</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round((stock.reduce((acc, m) => acc + m.disponible, 0) / stock.reduce((acc, m) => acc + m.quantite, 0)) * 100)}%
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher un matériel ou emprunteur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="nom">Trier par nom</option>
              <option value="categorie">Trier par catégorie</option>
              <option value="disponible">Trier par disponibilité</option>
              <option value="quantite">Trier par quantité</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alertes de retard */}
      <AfficherAlertesRetard />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Section Stock */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Inventaire des Matériels</h3>
                <p className="text-gray-600 text-sm">{stock.length} matériel(s) au total</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
            {filteredStock.map(materiel => (
              <div key={materiel._id} className="group p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{materiel.nom}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        {materiel.categorie}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Disponible: {materiel.disponible}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">Total: {materiel.quantite}</span>
                      </div>
                    </div>
                    
                    {/* Barre de progression */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(materiel.disponible / materiel.quantite) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {canManageStock() && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleEditMateriel(materiel)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl transition-all duration-200 hover:scale-110"
                        title="Modifier"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteMateriel(materiel._id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-all duration-200 hover:scale-110"
                        title="Supprimer"
                        disabled={!onDeleteMateriel}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {filteredStock.length === 0 && (
              <div className="text-center py-12">
                <Package size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">Aucun matériel trouvé</p>
                {searchTerm && (
                  <p className="text-gray-400 text-sm mt-2">Aucun résultat pour "{searchTerm}"</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Section Emprunts */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Emprunts en Cours</h3>
                <p className="text-gray-600 text-sm">{empruntsActifs.length} emprunt(s) actif(s)</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
            {filteredEmprunts.map(emprunt => {
              const materiel = stock.find(s => s._id === emprunt.materiel?._id);
              const userCanModify = canModifyEmprunt(emprunt);
              const estEnRetard = new Date(emprunt.dateRetourPrevue) < new Date();
              
              return (
                <div key={emprunt._id} className={`p-4 rounded-xl border-l-4 transition-all duration-300 ${
                  estEnRetard 
                    ? 'bg-red-50 border-red-500 hover:shadow-md' 
                    : 'bg-yellow-50 border-yellow-500 hover:shadow-md'
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{emprunt.materiel?.nom || materiel?.nom}</h4>
                        {estEnRetard && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium flex items-center gap-1">
                            <AlertTriangle size={12} />
                            En retard
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-gray-400" />
                          <span>{emprunt.emprunteur}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package size={14} className="text-gray-400" />
                          <span>{emprunt.quantite} unité(s)</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Emprunté le:</span>
                          <br />
                          {new Date(emprunt.dateEmprunt).toLocaleDateString('fr-FR')}
                        </div>
                        <div>
                          <span className="font-medium">Retour prévu:</span>
                          <br />
                          {new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      
                      {emprunt.responsable && (
                        <div className="mt-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            👨‍💼 {emprunt.responsable.nom || emprunt.responsable} {emprunt.responsable.prenom || ''}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {userCanModify && canManageEmprunts() && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditEmprunt(emprunt)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 hover:scale-105 font-medium text-sm"
                          disabled={!onUpdateEmprunt}
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleRetourner(emprunt._id)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 hover:scale-105 font-medium text-sm"
                        >
                          Retourner
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            {filteredEmprunts.length === 0 && (
              <div className="text-center py-12">
                <Users size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">Aucun emprunt en cours</p>
                {searchTerm && (
                  <p className="text-gray-400 text-sm mt-2">Aucun résultat pour "{searchTerm}"</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEmpruntModal && (
        <EmpruntModal
          stock={stock}
          onSave={handleAddEmprunt}
          onClose={() => {
            setShowEmpruntModal(false);
            setEditingEmprunt(null);
          }}
          loading={loading}
          empruntToEdit={editingEmprunt}
        />
      )}

      {showMaterielModal && (
        <MaterielModal
          materiel={editingMateriel}
          onSave={handleSaveMateriel}
          onClose={() => {
            setShowMaterielModal(false);
            setEditingMateriel(null);
          }}
          loading={loading}
        />
      )}
    </div>
  );
};

// Composant Modal Materiel Redesigné
const MaterielModal = ({ materiel, onSave, onClose, loading }) => {
  const isEditing = !!materiel;
  
  const [formData, setFormData] = useState({
    nom: materiel?.nom || '',
    categorie: materiel?.categorie || '',
    quantite: materiel?.quantite || 1,
    disponible: materiel?.disponible || 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      nom: formData.nom,
      categorie: formData.categorie,
      quantite: parseInt(formData.quantite) || 1,
      disponible: parseInt(formData.disponible) || 0
    });
  };

  const handleQuantiteChange = (value) => {
    const quantite = parseInt(value) || 1;
    setFormData(prev => ({
      ...prev,
      quantite: quantite,
      disponible: Math.min(prev.disponible, quantite)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl border border-gray-200/80 shadow-2xl w-full max-w-md">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">
                {isEditing ? 'Modifier le matériel' : 'Nouveau matériel'}
              </h3>
              <p className="text-blue-100 text-sm mt-1">
                {isEditing ? 'Mettez à jour les informations du matériel' : 'Ajoutez un nouveau matériel à l\'inventaire'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 group"
            >
              <X size={20} className="text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Nom du matériel
            </label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData(prev => ({...prev, nom: e.target.value}))}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="Nom du matériel"
              required
              disabled={loading}
            />
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Catégorie
            </label>
            <input
              type="text"
              value={formData.categorie}
              onChange={(e) => setFormData(prev => ({...prev, categorie: e.target.value}))}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="Catégorie"
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Quantité totale
              </label>
              <input
                type="number"
                min="1"
                value={formData.quantite}
                onChange={(e) => handleQuantiteChange(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                required
                disabled={loading}
              />
            </div>

            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Disponible
              </label>
              <input
                type="number"
                min="0"
                max={formData.quantite}
                value={formData.disponible}
                onChange={(e) => setFormData(prev => ({...prev, disponible: parseInt(e.target.value) || 0}))}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md"
                required
                disabled={loading}
              />
            </div>
          </div>

          {formData.quantite > 0 && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-xs text-blue-700">
                  <strong>Taux de disponibilité:</strong> {Math.round((formData.disponible / formData.quantite) * 100)}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(formData.disponible / formData.quantite) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-semibold"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Enregistrement...
                </div>
              ) : (
                <>
                  <CheckCircle size={18} />
                  {isEditing ? 'Modifier' : 'Ajouter'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockView;




// NOUVELLE VERSION DEEPSEEK AVEC INTEGRATION DE UPLOADS DE FICHIERS


// import React, { useState, useEffect, useRef } from 'react';
// import { Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
// import EmpruntModal from '../modals/EmpruntModal';
// import { useNotifications } from '../../context/NotificationContext';

// const StockView = ({ stock, emprunts, onUpdateStock, onAddEmprunt, onRetourner, onUpdateEmprunt, onDeleteMateriel, onAddMateriel, currentUser, onReloadData }) => {
//   const [showEmpruntModal, setShowEmpruntModal] = useState(false);
//   const [showMaterielModal, setShowMaterielModal] = useState(false);
//   const [editingEmprunt, setEditingEmprunt] = useState(null);
//   const [editingMateriel, setEditingMateriel] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { showSuccess, showError, showWarning, showInfo } = useNotifications();
//   const prevEmpruntsRef = useRef([]);

//   const empruntsActifs = emprunts.filter(e => e.statut === 'en_cours');

//   // Fonction pour obtenir l'ID de l'utilisateur (gère différents formats)
//   const getUserId = () => {
//     return currentUser?.id || 
//            currentUser?._id || 
//            currentUser?.user?.id || 
//            currentUser?.user?._id ||
//            currentUser?.data?.id ||
//            currentUser?.data?._id;
//   };

//   const userId = getUserId();

//   // Fonction pour vérifier si l'utilisateur peut gérer les emprunts
//   const canManageEmprunts = () => {
//     const userRole = currentUser?.role || currentUser?.user?.role;
//     return ['admin', 'informaticien', 'electricien'].includes(userRole);
//   };

//   // Fonction pour vérifier si l'utilisateur peut gérer le stock
//   const canManageStock = () => {
//     const userRole = currentUser?.role || currentUser?.user?.role;
//     return userRole === 'admin';
//   };

//   // Fonction pour vérifier si l'utilisateur peut modifier/supprimer un emprunt spécifique
//   const canModifyEmprunt = (emprunt) => {
//     const userRole = currentUser?.role || currentUser?.user?.role;
    
//     if (userRole === 'admin') {
//       return true;
//     }
    
//     // Vérifier si le technicien est le responsable de cet emprunt
//     const responsableId = 
//       emprunt.responsable?._id ? emprunt.responsable._id.toString() :
//       emprunt.responsable ? emprunt.responsable.toString() :
//       null;
    
//     return responsableId === userId;
//   };

//   // Détecter les nouveaux emprunts en retard
//   useEffect(() => {
//     const empruntsActifsPrecedents = prevEmpruntsRef.current.filter(e => e.statut === 'en_cours');
//     const empruntsActifsActuels = emprunts.filter(e => e.statut === 'en_cours');
    
//     const aujourdhui = new Date();
    
//     // Vérifier les nouveaux retards
//     empruntsActifsActuels.forEach(emprunt => {
//       const dateRetour = new Date(emprunt.dateRetourPrevue);
//       const etaitEnRetard = empruntsActifsPrecedents.some(
//         e => e._id === emprunt._id && new Date(e.dateRetourPrevue) < aujourdhui
//       );
      
//       const estEnRetard = dateRetour < aujourdhui;
      
//       if (estEnRetard && !etaitEnRetard) {
//         const joursRetard = Math.ceil((aujourdhui - dateRetour) / (1000 * 60 * 60 * 24));
//         showWarning(
//           'Emprunt en retard',
//           `L'emprunt de "${emprunt.materiel?.nom}" est en retard de ${joursRetard} jour(s)`
//         );
//       }
//     });
    
//     prevEmpruntsRef.current = emprunts;
//   }, [emprunts, showWarning]);

//   const handleAddEmprunt = async (data, empruntId = null) => {
//     setLoading(true);
//     let result;
    
//     try {
//       if (empruntId && onUpdateEmprunt) {
//         result = await onUpdateEmprunt(empruntId, data);
//         if (result.success) {
//           showSuccess('Emprunt modifié', 'L\'emprunt a été modifié avec succès');
//         }
//       } else {
//         result = await onAddEmprunt(data);
//         if (result.success) {
//           showSuccess('Emprunt créé', 'Le nouvel emprunt a été créé avec succès');
//         }
//       }
      
//       setLoading(false);

//       if (result.success) {
//         setShowEmpruntModal(false);
//         setEditingEmprunt(null);
        
//         // ✅ RECHARGER LES DONNÉES EMPRUNTS ET STOCK
//         if (onReloadData) {
//           await onReloadData(['emprunts', 'stock']);
//         }
//       } else {
//         showError('Erreur', result.message || 'Erreur lors de l\'opération');
//       }
//     } catch (error) {
//       setLoading(false);
//       showError('Erreur', 'Une erreur est survenue lors de l\'opération');
//     }
//   };

//   const handleEditEmprunt = (emprunt) => {
//     setEditingEmprunt(emprunt);
//     setShowEmpruntModal(true);
//   };

//   const handleRetourner = async (empruntId) => {
//     const emprunt = emprunts.find(e => e._id === empruntId);
//     if (!emprunt) return;
    
//     const confirmation = window.confirm(
//       `Êtes-vous sûr de vouloir retourner l'emprunt de "${emprunt.materiel?.nom}" ?\n` +
//       `Emprunteur: ${emprunt.emprunteur}\n` +
//       `Quantité: ${emprunt.quantite}`
//     );
    
//     if (!confirmation) {
//       showInfo('Retour annulé', 'Le retour a été annulé');
//       return;
//     }

//     try {
//       const result = await onRetourner(empruntId);
//       if (result.success) {
//         showSuccess(
//           'Retour confirmé',
//           `L'emprunt de "${emprunt.materiel?.nom}" a été retourné avec succès`
//         );
        
//         // ✅ RECHARGER LES DONNÉES EMPRUNTS ET STOCK
//         if (onReloadData) {
//           await onReloadData(['emprunts', 'stock']);
//         }
//       } else {
//         showError(
//           'Erreur lors du retour',
//           result.message || 'Une erreur est survenue lors du retour'
//         );
//       }
//     } catch (error) {
//       showError(
//         'Erreur',
//         'Une erreur est survenue lors du retour de l\'emprunt'
//       );
//     }
//   };

//   const handleEditMateriel = (materiel) => {
//     setEditingMateriel(materiel);
//     setShowMaterielModal(true);
//   };

//   const handleDeleteMateriel = async (materielId) => {
//     if (!onDeleteMateriel) {
//       alert('Fonction de suppression non disponible');
//       return;
//     }

//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce matériel ?')) {
//       const result = await onDeleteMateriel(materielId);
//       if (result.success) {
//         // ✅ RECHARGER LES DONNÉES STOCK
//         if (onReloadData) {
//           await onReloadData(['stock']);
//         }
//       } else {
//         alert(result.message || 'Erreur lors de la suppression');
//       }
//     }
//   };

//   const handleSaveMateriel = async (materielData) => {
//     setLoading(true);
//     let result;
    
//     if (editingMateriel && onUpdateStock) {
//       result = await onUpdateStock(editingMateriel._id, materielData);
//     } else if (onAddMateriel) {
//       result = await onAddMateriel(materielData);
//     } else {
//       alert('Fonction non disponible');
//       return;
//     }
    
//     setLoading(false);

//     if (result.success) {
//       setShowMaterielModal(false);
//       setEditingMateriel(null);
      
//       // ✅ RECHARGER LES DONNÉES STOCK
//       if (onReloadData) {
//         await onReloadData(['stock']);
//       }
//     } else {
//       alert(result.message || 'Erreur lors de l\'opération');
//     }
//   };

//   const handleNewMateriel = () => {
//     setEditingMateriel(null);
//     setShowMaterielModal(true);
//   };

//   const handleNewEmprunt = () => {
//     setEditingEmprunt(null);
//     setShowEmpruntModal(true);
//   };

//   // Obtenir le rôle affichable
//   const getUserRoleDisplay = () => {
//     return currentUser?.role || currentUser?.user?.role || 'Non défini';
//   };

//   // Fonction pour vérifier les emprunts en retard
//   const getEmpruntsEnRetard = () => {
//     const aujourdhui = new Date();
//     return empruntsActifs.filter(emprunt => {
//       const dateRetour = new Date(emprunt.dateRetourPrevue);
//       return dateRetour < aujourdhui;
//     });
//   };

//   // Composant pour afficher les alertes de retard
//   const AfficherAlertesRetard = () => {
//     const empruntsRetard = getEmpruntsEnRetard();
    
//     if (empruntsRetard.length === 0) {
//       return null;
//     }

//     return (
//       <div className="mb-6">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//           <div className="flex items-center gap-2 mb-3">
//             <AlertTriangle className="w-5 h-5 text-red-500" />
//             <h3 className="text-lg font-semibold text-red-800">
//               Emprunts en retard ({empruntsRetard.length})
//             </h3>
//           </div>
//           <div className="space-y-2">
//             {empruntsRetard.map(emprunt => {
//               const materiel = stock.find(s => s._id === emprunt.materiel?._id);
//               const joursRetard = Math.ceil(
//                 (new Date() - new Date(emprunt.dateRetourPrevue)) / (1000 * 60 * 60 * 24)
//               );
              
//               return (
//                 <div key={emprunt._id} className="flex justify-between items-center p-3 bg-red-100 rounded">
//                   <div>
//                     <p className="font-medium text-red-800">
//                       {emprunt.materiel?.nom || materiel?.nom}
//                     </p>
//                     <p className="text-sm text-red-600">
//                       Emprunteur: {emprunt.emprunteur} • 
//                       Retard: {joursRetard} jour(s) • 
//                       Responsable: {emprunt.responsable?.nom || 'Non défini'}
//                     </p>
//                   </div>
//                   {canModifyEmprunt(emprunt) && (
//                     <button
//                       onClick={() => handleRetourner(emprunt._id)}
//                       className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
//                     >
//                       Retourner
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Gestion du Stock</h2>
//         <div className="flex gap-3">
//           {/* Bouton Ajouter matériel - Admin seulement */}
//           {canManageStock() && (
//             <button
//               onClick={handleNewMateriel}
//               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//             >
//               <Plus size={18} />
//               Ajouter matériel
//             </button>
//           )}
          
//           {/* Bouton Nouvel emprunt - Admin et Techniciens */}
//           {canManageEmprunts() && (
//             <button
//               onClick={handleNewEmprunt}
//               className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
//             >
//               <Plus size={18} />
//               Nouvel emprunt
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Alertes pour les emprunts en retard */}
//       <AfficherAlertesRetard />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Section Stock */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-semibold">Matériels disponibles</h3>
//           </div>
//           <div className="space-y-3">
//             {stock.map(materiel => (
//               <div key={materiel._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//                 <div className="flex-1">
//                   <p className="font-semibold">{materiel.nom}</p>
//                   <p className="text-sm text-gray-600 capitalize">{materiel.categorie}</p>
//                 </div>
//                 <div className="text-right mr-4">
//                   <p className="text-lg font-bold text-blue-600">{materiel.disponible} / {materiel.quantite}</p>
//                   <p className="text-xs text-gray-500">disponibles</p>
//                 </div>
//                 {/* Boutons gestion matériel - Admin seulement */}
//                 {canManageStock() && (
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEditMateriel(materiel)}
//                       className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded transition"
//                       title="Modifier"
//                     >
//                       <Edit size={16} />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteMateriel(materiel._id)}
//                       className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded transition"
//                       title="Supprimer"
//                       disabled={!onDeleteMateriel}
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//             {stock.length === 0 && (
//               <p className="text-center text-gray-500 py-8">Aucun matériel en stock</p>
//             )}
//           </div>
//         </div>

//         {/* Section Emprunts */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-xl font-semibold mb-4">Emprunts en cours</h3>
//           <div className="space-y-3">
//             {empruntsActifs.map(emprunt => {
//               const materiel = stock.find(s => s._id === emprunt.materiel?._id);
//               const userCanModify = canModifyEmprunt(emprunt);
              
//               return (
//                 <div key={emprunt._id} className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <p className="font-semibold">{emprunt.materiel?.nom || materiel?.nom}</p>
//                       <p className="text-sm text-gray-600">Emprunteur: {emprunt.emprunteur}</p>
//                       <p className="text-sm text-gray-600">Quantité: {emprunt.quantite}</p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Emprunté le: {new Date(emprunt.dateEmprunt).toLocaleDateString('fr-FR')}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         Retour prévu: {new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR')}
//                       </p>
//                       {/* Afficher le responsable */}
//                       {emprunt.responsable && (
//                         <p className="text-xs text-blue-600 mt-1">
//                           Responsable: {emprunt.responsable.nom || emprunt.responsable} {emprunt.responsable.prenom || ''}
//                         </p>
//                       )}
//                     </div>
                    
//                     {/* Boutons gestion emprunt - Admin et technicien propriétaire */}
//                     {userCanModify && canManageEmprunts() && (
//                       <div className="flex gap-2 ml-4">
//                         <button
//                           onClick={() => handleEditEmprunt(emprunt)}
//                           className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
//                           disabled={!onUpdateEmprunt}
//                         >
//                           Modifier
//                         </button>
//                         <button
//                           onClick={() => handleRetourner(emprunt._id)}
//                           className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition"
//                         >
//                           Retourner
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//             {empruntsActifs.length === 0 && (
//               <p className="text-center text-gray-500 py-8">Aucun emprunt en cours</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modal pour ajouter/modifier un emprunt */}
//       {showEmpruntModal && (
//         <EmpruntModal
//                   stock={stock}
//           onSave={handleAddEmprunt}
//           onClose={() => {
//             setShowEmpruntModal(false);
//             setEditingEmprunt(null);
//           }}
//           loading={loading}
//           empruntToEdit={editingEmprunt}
//           currentUser={currentUser}
//         />
//       )}

//       {/* Modal pour ajouter/modifier un matériel */}
//       {showMaterielModal && (
//         <MaterielModal
//           materiel={editingMateriel}
//           onSave={handleSaveMateriel}
//           onClose={() => {
//             setShowMaterielModal(false);
//             setEditingMateriel(null);
//           }}
//           loading={loading}
//         />
//       )}
//     </div>
//   );
// };

// // Composant Modal pour ajouter/modifier un matériel
// const MaterielModal = ({ materiel, onSave, onClose, loading }) => {
//   const isEditing = !!materiel;
  
//   const [formData, setFormData] = useState({
//     nom: materiel?.nom || '',
//     categorie: materiel?.categorie || '',
//     quantite: materiel?.quantite || 1,
//     disponible: materiel?.disponible || 1
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({
//       nom: formData.nom,
//       categorie: formData.categorie,
//       quantite: parseInt(formData.quantite) || 1,
//       disponible: parseInt(formData.disponible) || 0
//     });
//   };

//   const handleChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleQuantiteChange = (value) => {
//     const quantite = parseInt(value) || 1;
//     setFormData(prev => ({
//       ...prev,
//       quantite: quantite,
//       disponible: Math.min(prev.disponible, quantite)
//     }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <h3 className="text-xl font-bold mb-4">
//           {isEditing ? 'Modifier le matériel' : 'Nouveau matériel'}
//         </h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Nom du matériel</label>
//             <input
//               type="text"
//               value={formData.nom}
//               onChange={(e) => handleChange('nom', e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Nom du matériel"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Catégorie</label>
//             <input
//               type="text"
//               value={formData.categorie}
//               onChange={(e) => handleChange('categorie', e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Catégorie"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Quantité totale</label>
//             <input
//               type="number"
//               min="1"
//               value={formData.quantite}
//               onChange={(e) => handleQuantiteChange(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Quantité disponible</label>
//             <input
//               type="number"
//               min="0"
//               max={formData.quantite}
//               value={formData.disponible}
//               onChange={(e) => handleChange('disponible', parseInt(e.target.value) || 0)}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading}
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Maximum: {formData.quantite}
//             </p>
//           </div>

//           <div className="flex gap-3 justify-end pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50"
//               disabled={loading}
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
//               disabled={loading}
//             >
//               {loading ? 'Enregistrement...' : isEditing ? 'Modifier' : 'Ajouter'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StockView;


