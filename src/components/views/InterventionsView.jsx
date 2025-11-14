// import React, { useState } from 'react';
// import { Plus, Edit2, Trash2, Check } from 'lucide-react';
// import InterventionModal from '../modals/InterventionModal';

// const InterventionsView = ({ 
//   currentUser, 
//   interventions, 
//   users, 
//   onAdd, 
//   onUpdate, 
//   onDelete,
//   filterDate,
//   setFilterDate,
//   filterStatut,
//   setFilterStatut
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const filteredInterventions = interventions.filter(i => {
//     if (currentUser.role !== 'admin' && i.technicien?._id !== currentUser._id) return false;
//     if (filterDate && i.dateDebut !== filterDate) return false;
//     if (filterStatut && i.statut !== filterStatut) return false;
//     return true;
//   });

//   const techniciens = users.filter(u => u.role !== 'admin');

//   const handleSave = async (data) => {
//     setLoading(true);
//     let result;
    
//     if (editItem) {
//       result = await onUpdate(editItem._id, data);
//     } else {
//       result = await onAdd(data);
//     }

//     setLoading(false);

//     if (result.success) {
//       setShowModal(false);
//       setEditItem(null);
//     } else {
//       alert(result.message || 'Une erreur est survenue');
//     }
//   };

//   const handleDelete = async (id) => {
//     const result = await onDelete(id);
//     if (!result.success) {
//       alert(result.message || 'Une erreur est survenue');
//     }
//   };

//   const handleUpdateStatus = async (intervention) => {
//     const newStatus = intervention.statut === 'planifiee' ? 'en_cours' : 'terminee';
//     const result = await onUpdate(intervention._id, { statut: newStatus });
    
//     if (!result.success) {
//       alert(result.message || 'Une erreur est survenue');
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Gestion des Interventions</h2>
//         {currentUser.role === 'admin' && (
//           <button
//             onClick={() => { setEditItem(null); setShowModal(true); }}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//           >
//             <Plus size={18} />
//             Nouvelle intervention
//           </button>
//         )}
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-4 flex gap-4">
//         <input
//           type="date"
//           value={filterDate}
//           onChange={(e) => setFilterDate(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg"
//         />
//         <select
//           value={filterStatut}
//           onChange={(e) => setFilterStatut(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg"
//         >
//           <option value="">Tous les statuts</option>
//           <option value="planifiee">Planifiée</option>
//           <option value="en_cours">En cours</option>
//           <option value="terminee">Terminée</option>
//         </select>
//         <button
//           onClick={() => { setFilterDate(''); setFilterStatut(''); }}
//           className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//         >
//           Réinitialiser
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Titre</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Lieu</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Technicien</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filteredInterventions.map(intervention => {
//               const tech = intervention.technicien;
//               return (
//                 <tr key={intervention._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3">{intervention.titre}</td>
//                   <td className="px-4 py-3 capitalize">{intervention.type}</td>
//                   <td className="px-4 py-3">{intervention.lieu}</td>
//                   <td className="px-4 py-3">
//                     {tech ? `${tech.prenom} ${tech.nom}` : '-'}
//                   </td>
//                   <td className="px-4 py-3">
//                     {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                       intervention.statut === 'terminee' ? 'bg-green-100 text-green-800' :
//                       intervention.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-blue-100 text-blue-800'
//                     }`}>
//                       {intervention.statut === 'terminee' ? 'Terminée' :
//                        intervention.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex gap-2">
//                       {currentUser.role !== 'admin' && intervention.statut !== 'terminee' && (
//                         <button
//                           onClick={() => handleUpdateStatus(intervention)}
//                           className="text-blue-600 hover:text-blue-800"
//                           title={intervention.statut === 'planifiee' ? 'Démarrer' : 'Terminer'}
//                         >
//                           <Check size={18} />
//                         </button>
//                       )}
//                       {currentUser.role === 'admin' && (
//                         <>
//                           <button
//                             onClick={() => { setEditItem(intervention); setShowModal(true); }}
//                             className="text-blue-600 hover:text-blue-800"
//                           >
//                             <Edit2 size={18} />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(intervention._id)}
//                             className="text-red-600 hover:text-red-800"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
        
//         {filteredInterventions.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             Aucune intervention trouvée
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <InterventionModal
//           intervention={editItem}
//           techniciens={techniciens}
//           onSave={handleSave}
//           onClose={() => { setShowModal(false); setEditItem(null); }}
//           loading={loading}
//         />
//       )}
//     </div>
//   );
// };

// export default InterventionsView;


// INTEGRATION DE UPLOADS DE FICHIERS


// import React, { useState } from 'react';
// import { Plus, Edit2, Trash2, Check, FileText, Image, Download } from 'lucide-react';
// import InterventionModal from '../modals/InterventionModal';

// const InterventionsView = ({ 
//   currentUser, 
//   interventions, 
//   users, 
//   onAdd, 
//   onUpdate, 
//   onDelete,
//   filterDate,
//   setFilterDate,
//   filterStatut,
//   setFilterStatut,
//   onReloadIntervention // ← NOUVELLE PROP
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showFilesModal, setShowFilesModal] = useState(false);
//   const [selectedIntervention, setSelectedIntervention] = useState(null);

//   const filteredInterventions = interventions.filter(i => {
//     if (currentUser.role !== 'admin' && i.technicien?._id !== currentUser._id) return false;
//     if (filterDate && i.dateDebut !== filterDate) return false;
//     if (filterStatut && i.statut !== filterStatut) return false;
//     return true;
//   });

//   const techniciens = users.filter(u => u.role !== 'admin');

//   const handleSave = async (data, interventionId = null) => {
//     setLoading(true);
//     let result;
    
//     if (editItem || interventionId) {
//       const id = interventionId || editItem._id;
//       result = await onUpdate(id, data);
      
//       // ✅ RECHARGER L'INTERVENTION APRÈS MISE À JOUR (SPÉCIALEMENT POUR LES FICHIERS)
//       if (result.success && onReloadIntervention) {
//         await onReloadIntervention(id);
//       }
//     } else {
//       result = await onAdd(data);
//     }

//     setLoading(false);

//     if (result.success) {
//       setShowModal(false);
//       setEditItem(null);
//     } else {
//       alert(result.message || 'Une erreur est survenue');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
//       const result = await onDelete(id);
//       if (!result.success) {
//         alert(result.message || 'Une erreur est survenue');
//       }
//     }
//   };

//   const handleUpdateStatus = async (intervention) => {
//     const newStatus = intervention.statut === 'planifiee' ? 'en_cours' : 'terminee';
//     const result = await onUpdate(intervention._id, { statut: newStatus });
    
//     if (!result.success) {
//       alert(result.message || 'Une erreur est survenue');
//     }
//   };

//   const handleShowFiles = (intervention) => {
//     setSelectedIntervention(intervention);
//     setShowFilesModal(true);
//   };

//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case 'image': 
//         return <Image size={16} className="text-blue-600" />;
//       case 'document': 
//         return <FileText size={16} className="text-green-600" />;
//       default: 
//         return <FileText size={16} className="text-gray-600" />;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getStatusColor = (statut) => {
//     switch (statut) {
//       case 'terminee': return 'bg-green-100 text-green-800';
//       case 'en_cours': return 'bg-yellow-100 text-yellow-800';
//       case 'planifiee': return 'bg-blue-100 text-blue-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusText = (statut) => {
//     switch (statut) {
//       case 'terminee': return 'Terminée';
//       case 'en_cours': return 'En cours';
//       case 'planifiee': return 'Planifiée';
//       default: return statut;
//     }
//   };

//   const canModifyIntervention = (intervention) => {
//     return currentUser.role === 'admin' || intervention.technicien?._id === currentUser._id;
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Gestion des Interventions</h2>
//         {currentUser.role === 'admin' && (
//           <button
//             onClick={() => { setEditItem(null); setShowModal(true); }}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//           >
//             <Plus size={18} />
//             Nouvelle intervention
//           </button>
//         )}
//       </div>

//       {/* Filtres */}
//       <div className="bg-white rounded-lg shadow-md p-4 flex gap-4 flex-wrap">
//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
//           <input
//             type="date"
//             value={filterDate}
//             onChange={(e) => setFilterDate(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
        
//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Statut</label>
//           <select
//             value={filterStatut}
//             onChange={(e) => setFilterStatut(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">Tous les statuts</option>
//             <option value="planifiee">Planifiée</option>
//             <option value="en_cours">En cours</option>
//             <option value="terminee">Terminée</option>
//           </select>
//         </div>

//         <div className="flex items-end">
//           <button
//             onClick={() => { setFilterDate(''); setFilterStatut(''); }}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition h-[42px]"
//           >
//             Réinitialiser
//           </button>
//         </div>
//       </div>

//       {/* Tableau des interventions */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Titre</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Lieu</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Technicien</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fichiers</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredInterventions.map(intervention => {
//                 const tech = intervention.technicien;
//                 const hasFiles = intervention.fichiers && intervention.fichiers.length > 0;
                
//                 return (
//                   <tr key={intervention._id} className="hover:bg-gray-50">
//                     <td className="px-4 py-3">
//                       <div className="font-medium text-gray-900">{intervention.titre}</div>
//                       {intervention.description && (
//                         <div className="text-sm text-gray-500 truncate max-w-xs">
//                           {intervention.description}
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 capitalize">
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                         {intervention.type}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-gray-700">{intervention.lieu}</td>
//                     <td className="px-4 py-3">
//                       {tech ? (
//                         <div>
//                           <div className="font-medium">{tech.prenom} {tech.nom}</div>
//                           <div className="text-xs text-gray-500 capitalize">{tech.role}</div>
//                         </div>
//                       ) : (
//                         '-'
//                       )}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="text-gray-700">
//                         {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {intervention.heureDebut}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       {hasFiles ? (
//                         <button
//                           onClick={() => handleShowFiles(intervention)}
//                           className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm"
//                         >
//                           <FileText size={16} />
//                           <span>{intervention.fichiers.length}</span>
//                           <span>fichier(s)</span>
//                         </button>
//                       ) : (
//                         <span className="text-gray-400 text-sm">Aucun fichier</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(intervention.statut)}`}>
//                         {getStatusText(intervention.statut)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-2">
//                         {/* Bouton pour changer le statut (technicien seulement) */}
//                         {currentUser.role !== 'admin' && intervention.statut !== 'terminee' && (
//                           <button
//                             onClick={() => handleUpdateStatus(intervention)}
//                             className="p-2 text-green-600 hover:bg-green-50 rounded transition"
//                             title={intervention.statut === 'planifiee' ? 'Démarrer l\'intervention' : 'Marquer comme terminée'}
//                           >
//                             <Check size={18} />
//                           </button>
//                         )}

//                         {/* Bouton pour voir les fichiers */}
//                         {hasFiles && (
//                           <button
//                             onClick={() => handleShowFiles(intervention)}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                             title="Voir les fichiers"
//                           >
//                             <FileText size={18} />
//                           </button>
//                         )}

//                         {/* Boutons admin */}
//                         {currentUser.role === 'admin' && (
//                           <>
//                             <button
//                               onClick={() => { setEditItem(intervention); setShowModal(true); }}
//                               className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                               title="Modifier"
//                             >
//                               <Edit2 size={18} />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(intervention._id)}
//                               className="p-2 text-red-600 hover:bg-red-50 rounded transition"
//                               title="Supprimer"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                           </>
//                         )}

//                         {/* Bouton modification pour le technicien propriétaire */}
//                         {currentUser.role !== 'admin' && canModifyIntervention(intervention) && (
//                           <button
//                             onClick={() => { setEditItem(intervention); setShowModal(true); }}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                             title="Modifier"
//                           >
//                             <Edit2 size={18} />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
        
//         {filteredInterventions.length === 0 && (
//           <div className="text-center py-12 text-gray-500">
//             <FileText size={48} className="mx-auto mb-4 text-gray-300" />
//             <p className="text-lg font-medium">Aucune intervention trouvée</p>
//             <p className="text-sm mt-1">
//               {currentUser.role === 'admin' 
//                 ? 'Créez votre première intervention en cliquant sur le bouton ci-dessus' 
//                 : 'Aucune intervention ne vous est assignée pour le moment'
//               }
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Modal pour l'édition/création d'intervention */}
//       {showModal && (
//         <InterventionModal
//           intervention={editItem}
//           techniciens={techniciens}
//           onSave={handleSave}
//           onClose={() => { setShowModal(false); setEditItem(null); }}
//           loading={loading}
//           currentUser={currentUser}
//         />
//       )}

//       {/* Modal pour afficher les fichiers */}
//       {showFilesModal && selectedIntervention && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-gray-800">
//                 Fichiers - {selectedIntervention.titre}
//               </h3>
//               <button
//                 onClick={() => setShowFilesModal(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="mb-4 p-4 bg-gray-50 rounded-lg">
//               <p className="text-sm text-gray-600">
//                 <strong>Technicien:</strong> {selectedIntervention.technicien?.prenom} {selectedIntervention.technicien?.nom}
//               </p>
//               <p className="text-sm text-gray-600">
//                 <strong>Lieu:</strong> {selectedIntervention.lieu}
//               </p>
//               <p className="text-sm text-gray-600">
//                 <strong>Statut:</strong> <span className={getStatusColor(selectedIntervention.statut) + " px-2 py-1 rounded-full text-xs"}>
//                   {getStatusText(selectedIntervention.statut)}
//                 </span>
//               </p>
//             </div>

//             {selectedIntervention.fichiers && selectedIntervention.fichiers.length > 0 ? (
//               <div className="space-y-3">
//                 <h4 className="font-semibold text-gray-700">
//                   {selectedIntervention.fichiers.length} fichier(s) attaché(s)
//                 </h4>
//                 {selectedIntervention.fichiers.map((fichier) => (
//                   <div key={fichier._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
//                     <div className="flex items-center space-x-3 flex-1">
//                       {getFileIcon(fichier.type)}
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-gray-900 truncate">{fichier.nom}</p>
//                         <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1">
//                           <span>{formatFileSize(fichier.taille)}</span>
//                           <span>•</span>
//                           <span className="capitalize">{fichier.type}</span>
//                           <span>•</span>
//                           <span>Uploadé le {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}</span>
//                           {fichier.uploadedBy && (
//                             <>
//                               <span>•</span>
//                               <span>par {fichier.uploadedBy.prenom} {fichier.uploadedBy.nom}</span>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                         title="Télécharger"
//                       >
//                         <Download size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8 text-gray-500">
//                 <FileText size={48} className="mx-auto mb-4 text-gray-300" />
//                 <p>Aucun fichier attaché à cette intervention</p>
//               </div>
//             )}

//             <div className="flex justify-end pt-4 mt-6 border-t">
//               <button
//                 onClick={() => setShowFilesModal(false)}
//                 className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//               >
//                 Fermer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterventionsView;


// NOUVELLE VERSION AVEC AJOUT DE PRECISIONS SUR LE LIEU (BATTIMENT/SITE)


// import React, { useState } from 'react';
// import { Plus, Edit2, Trash2, Check, FileText, Image, Download } from 'lucide-react';
// import InterventionModal from '../modals/InterventionModal';

// const InterventionsView = ({ 
//   currentUser, 
//   interventions, 
//   users, 
//   onAdd, 
//   onUpdate, 
//   onDelete,
//   filterDate,
//   setFilterDate,
//   filterStatut,
//   setFilterStatut,
//   onReloadIntervention
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showFilesModal, setShowFilesModal] = useState(false);
//   const [selectedIntervention, setSelectedIntervention] = useState(null);
//   const [filterLieu, setFilterLieu] = useState(''); // ✅ NOUVEAU : Filtre par lieu

//   // ✅ NOUVEAU : Liste des sites organisés par bâtiment
//   const sitesByBuilding = {
//     'Bâtiment AD': [
//       { value: 'Bureau_Accueil', label: 'Bureau Accueil' },
//       { value: 'Bureau_Chauffeurs', label: 'Bureau Chauffeurs' },
//       { value: 'Bureau_Comptabilite', label: 'Bureau Comptabilité' },
//       { value: 'Bureau_DAF', label: 'Bureau DAF' },
//       { value: 'Bureau_DEFR', label: 'Bureau DEFR' },
//       { value: 'Bureau_DG', label: 'Bureau DG' },
//       { value: 'Bureau_DRH', label: 'Bureau DRH' },
//       { value: 'Bureau_DRI', label: 'Bureau DRI' },
//       { value: 'Bureau_MDI', label: 'Bureau MDI' },
//       { value: 'Bureau_Scolarite', label: 'Bureau Scolarité' },
//       { value: 'Bureau_SG', label: 'Bureau SG' }
//     ],
//     'Bâtiment HA': [
//       { value: 'Bibliothèque', label: 'Bibliothèque' },
//       { value: 'Bureau_RDC', label: 'Bureau RDC' },
//       { value: 'Bureau_Etage', label: 'Bureau Étage' },
//       { value: 'Cyber', label: 'Cyber' }
//     ],
//     'Bâtiment HB': [
//       { value: 'Bureau_Etage1', label: 'Bureau Étage 1' },
//       { value: 'Bureau_Etage2', label: 'Bureau Étage 2' },
//       { value: 'Bureau_Etage3', label: 'Bureau Étage 3' },
//       { value: 'Bureau_Etage4', label: 'Bureau Étage 4' },
//       { value: 'Bureau_RDC1', label: 'Bureau RDC1' },
//       { value: 'Bureau_RDC2', label: 'Bureau RDC2' },
//       { value: 'Centre_de_Certification', label: 'Centre de Certification' }
//     ],
//     'Bâtiment E': [
//       { value: 'CRT', label: 'CRT' },
//       { value: 'E11', label: 'E11' }
//     ],
//     'Foyer': [
//       { value: 'Cuisine', label: 'Cuisine' }
//     ]
//   };

//   // ✅ FONCTION pour obtenir le label d'un lieu
//   const getLieuLabel = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return site.label;
//     }
//     return lieuValue;
//   };

//   // ✅ FONCTION pour obtenir le bâtiment d'un lieu
//   const getBatiment = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return batiment;
//     }
//     return '';
//   };

//   const filteredInterventions = interventions.filter(i => {
//     if (currentUser.role !== 'admin' && i.technicien?._id !== currentUser._id) return false;
//     if (filterDate && i.dateDebut !== filterDate) return false;
//     if (filterStatut && i.statut !== filterStatut) return false;
//     if (filterLieu && i.lieu !== filterLieu) return false; // ✅ NOUVEAU : Filtre par lieu
//     return true;
//   });

//   const techniciens = users.filter(u => u.role !== 'admin');

//   const handleSave = async (data, interventionId = null) => {
//     setLoading(true);
//     let result;
    
//     if (editItem || interventionId) {
//       const id = interventionId || editItem._id;
//       result = await onUpdate(id, data);
      
//       if (result.success && onReloadIntervention) {
//         await onReloadIntervention(id);
//       }
//     } else {
//       result = await onAdd(data);
//     }

//     setLoading(false);

//     if (result.success) {
//       setShowModal(false);
//       setEditItem(null);
//     } else {
//       alert(result.message || 'Une erreur est survenue');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
//       const result = await onDelete(id);
//       if (!result.success) {
//         alert(result.message || 'Une erreur est survenue');
//       }
//     }
//   };

//   const handleUpdateStatus = async (intervention) => {
//     const newStatus = intervention.statut === 'planifiee' ? 'en_cours' : 'terminee';
//     const result = await onUpdate(intervention._id, { statut: newStatus });
    
//     if (!result.success) {
//       alert(result.message || 'Une erreur est survenue');
//     }
//   };

//   const handleShowFiles = (intervention) => {
//     setSelectedIntervention(intervention);
//     setShowFilesModal(true);
//   };

//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case 'image': 
//         return <Image size={16} className="text-blue-600" />;
//       case 'document': 
//         return <FileText size={16} className="text-green-600" />;
//       default: 
//         return <FileText size={16} className="text-gray-600" />;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getStatusColor = (statut) => {
//     switch (statut) {
//       case 'terminee': return 'bg-green-100 text-green-800';
//       case 'en_cours': return 'bg-yellow-100 text-yellow-800';
//       case 'planifiee': return 'bg-blue-100 text-blue-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusText = (statut) => {
//     switch (statut) {
//       case 'terminee': return 'Terminée';
//       case 'en_cours': return 'En cours';
//       case 'planifiee': return 'Planifiée';
//       default: return statut;
//     }
//   };

//   const canModifyIntervention = (intervention) => {
//     return currentUser.role === 'admin' || intervention.technicien?._id === currentUser._id;
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Gestion des Interventions</h2>
//         {currentUser.role === 'admin' && (
//           <button
//             onClick={() => { setEditItem(null); setShowModal(true); }}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//           >
//             <Plus size={18} />
//             Nouvelle intervention
//           </button>
//         )}
//       </div>

//       {/* Filtres */}
//       <div className="bg-white rounded-lg shadow-md p-4 flex gap-4 flex-wrap">
//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
//           <input
//             type="date"
//             value={filterDate}
//             onChange={(e) => setFilterDate(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
        
//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">Statut</label>
//           <select
//             value={filterStatut}
//             onChange={(e) => setFilterStatut(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">Tous les statuts</option>
//             <option value="planifiee">Planifiée</option>
//             <option value="en_cours">En cours</option>
//             <option value="terminee">Terminée</option>
//           </select>
//         </div>

//         {/* ✅ NOUVEAU : Filtre par lieu */}
//         <div className="flex flex-col min-w-[200px]">
//           <label className="text-sm font-medium text-gray-700 mb-1">Lieu</label>
//           <select
//             value={filterLieu}
//             onChange={(e) => setFilterLieu(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">Tous les lieux</option>
//             {Object.entries(sitesByBuilding).map(([batiment, sites]) => (
//               <optgroup key={batiment} label={batiment}>
//                 {sites.map((site) => (
//                   <option key={site.value} value={site.value}>
//                     {site.label}
//                   </option>
//                 ))}
//               </optgroup>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-end">
//           <button
//             onClick={() => { setFilterDate(''); setFilterStatut(''); setFilterLieu(''); }}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition h-[42px]"
//           >
//             Réinitialiser
//           </button>
//         </div>
//       </div>

//       {/* Tableau des interventions */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Titre</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Lieu</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Technicien</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fichiers</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredInterventions.map(intervention => {
//                 const tech = intervention.technicien;
//                 const hasFiles = intervention.fichiers && intervention.fichiers.length > 0;
                
//                 return (
//                   <tr key={intervention._id} className="hover:bg-gray-50">
//                     <td className="px-4 py-3">
//                       <div className="font-medium text-gray-900">{intervention.titre}</div>
//                       {intervention.description && (
//                         <div className="text-sm text-gray-500 truncate max-w-xs">
//                           {intervention.description}
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 capitalize">
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                         {intervention.type}
//                       </span>
//                     </td>
//                     {/* ✅ MODIFIÉ : Affichage du lieu avec label et bâtiment */}
//                     <td className="px-4 py-3">
//                       <div className="font-medium text-gray-700">{getLieuLabel(intervention.lieu)}</div>
//                       <div className="text-xs text-gray-500">{getBatiment(intervention.lieu)}</div>
//                     </td>
//                     <td className="px-4 py-3">
//                       {tech ? (
//                         <div>
//                           <div className="font-medium">{tech.prenom} {tech.nom}</div>
//                           <div className="text-xs text-gray-500 capitalize">{tech.role}</div>
//                         </div>
//                       ) : (
//                         '-'
//                       )}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="text-gray-700">
//                         {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {intervention.heureDebut}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       {hasFiles ? (
//                         <button
//                           onClick={() => handleShowFiles(intervention)}
//                           className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm"
//                         >
//                           <FileText size={16} />
//                           <span>{intervention.fichiers.length}</span>
//                           <span>fichier(s)</span>
//                         </button>
//                       ) : (
//                         <span className="text-gray-400 text-sm">Aucun fichier</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(intervention.statut)}`}>
//                         {getStatusText(intervention.statut)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-2">
//                         {currentUser.role !== 'admin' && intervention.statut !== 'terminee' && (
//                           <button
//                             onClick={() => handleUpdateStatus(intervention)}
//                             className="p-2 text-green-600 hover:bg-green-50 rounded transition"
//                             title={intervention.statut === 'planifiee' ? 'Démarrer l\'intervention' : 'Marquer comme terminée'}
//                           >
//                             <Check size={18} />
//                           </button>
//                         )}

//                         {hasFiles && (
//                           <button
//                             onClick={() => handleShowFiles(intervention)}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                             title="Voir les fichiers"
//                           >
//                             <FileText size={18} />
//                           </button>
//                         )}

//                         {currentUser.role === 'admin' && (
//                           <>
//                             <button
//                               onClick={() => { setEditItem(intervention); setShowModal(true); }}
//                               className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                               title="Modifier"
//                             >
//                               <Edit2 size={18} />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(intervention._id)}
//                               className="p-2 text-red-600 hover:bg-red-50 rounded transition"
//                               title="Supprimer"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                           </>
//                         )}

//                         {currentUser.role !== 'admin' && canModifyIntervention(intervention) && (
//                           <button
//                             onClick={() => { setEditItem(intervention); setShowModal(true); }}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                             title="Modifier"
//                           >
//                             <Edit2 size={18} />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
        
//         {filteredInterventions.length === 0 && (
//           <div className="text-center py-12 text-gray-500">
//             <FileText size={48} className="mx-auto mb-4 text-gray-300" />
//             <p className="text-lg font-medium">Aucune intervention trouvée</p>
//             <p className="text-sm mt-1">
//               {currentUser.role === 'admin' 
//                 ? 'Créez votre première intervention en cliquant sur le bouton ci-dessus' 
//                 : 'Aucune intervention ne vous est assignée pour le moment'
//               }
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Modal pour l'édition/création d'intervention */}
//       {showModal && (
//         <InterventionModal
//           intervention={editItem}
//           techniciens={techniciens}
//           onSave={handleSave}
//           onClose={() => { setShowModal(false); setEditItem(null); }}
//           loading={loading}
//           currentUser={currentUser}
//           sitesByBuilding={sitesByBuilding} // ✅ NOUVEAU : Passer les sites au modal
//         />
//       )}

//       {/* Modal pour afficher les fichiers */}
//       {showFilesModal && selectedIntervention && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-gray-800">
//                 Fichiers - {selectedIntervention.titre}
//               </h3>
//               <button
//                 onClick={() => setShowFilesModal(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="mb-4 p-4 bg-gray-50 rounded-lg">
//               <p className="text-sm text-gray-600">
//                 <strong>Technicien:</strong> {selectedIntervention.technicien?.prenom} {selectedIntervention.technicien?.nom}
//               </p>
//               <p className="text-sm text-gray-600">
//                 <strong>Lieu:</strong> {getLieuLabel(selectedIntervention.lieu)} ({getBatiment(selectedIntervention.lieu)})
//               </p>
//               <p className="text-sm text-gray-600">
//                 <strong>Statut:</strong> <span className={getStatusColor(selectedIntervention.statut) + " px-2 py-1 rounded-full text-xs"}>
//                   {getStatusText(selectedIntervention.statut)}
//                 </span>
//               </p>
//             </div>

//             {selectedIntervention.fichiers && selectedIntervention.fichiers.length > 0 ? (
//               <div className="space-y-3">
//                 <h4 className="font-semibold text-gray-700">
//                   {selectedIntervention.fichiers.length} fichier(s) attaché(s)
//                 </h4>
//                 {selectedIntervention.fichiers.map((fichier) => (
//                   <div key={fichier._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
//                     <div className="flex items-center space-x-3 flex-1">
//                       {getFileIcon(fichier.type)}
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-gray-900 truncate">{fichier.nom}</p>
//                         <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1">
//                           <span>{formatFileSize(fichier.taille)}</span>
//                           <span>•</span>
//                           <span className="capitalize">{fichier.type}</span>
//                           <span>•</span>
//                           <span>Uploadé le {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}</span>
//                           {fichier.uploadedBy && (
//                             <>
//                               <span>•</span>
//                               <span>par {fichier.uploadedBy.prenom} {fichier.uploadedBy.nom}</span>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                         title="Télécharger"
//                       >
//                         <Download size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8 text-gray-500">
//                 <FileText size={48} className="mx-auto mb-4 text-gray-300" />
//                 <p>Aucun fichier attaché à cette intervention</p>
//               </div>
//             )}

//             <div className="flex justify-end pt-4 mt-6 border-t">
//               <button
//                 onClick={() => setShowFilesModal(false)}
//                 className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//               >
//                 Fermer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterventionsView;



// NOUVELLE VERSION DEEPSEEK AVEC AMELIORATIONS DU DESIGN


// import React, { useState } from 'react';
// import { 
//   Plus, 
//   Edit2, 
//   Trash2, 
//   Check, 
//   FileText, 
//   Image, 
//   Download, 
//   Filter,
//   Search,
//   Calendar,
//   MapPin,
//   User,
//   AlertCircle,
//   Clock,
//   Building,
//   X,
//   ChevronDown,
//   ChevronUp
// } from 'lucide-react';
// import InterventionModal from '../modals/InterventionModal';

// const InterventionsView = ({ 
//   currentUser, 
//   interventions, 
//   users, 
//   onAdd, 
//   onUpdate, 
//   onDelete,
//   filterDate,
//   setFilterDate,
//   filterStatut,
//   setFilterStatut,
//   onReloadIntervention
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showFilesModal, setShowFilesModal] = useState(false);
//   const [selectedIntervention, setSelectedIntervention] = useState(null);
//   const [filterLieu, setFilterLieu] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [expandedIntervention, setExpandedIntervention] = useState(null);

//   const sitesByBuilding = {
//     'Bâtiment AD': [
//       { value: 'Bureau_Accueil', label: 'Bureau Accueil' },
//       { value: 'Bureau_Chauffeurs', label: 'Bureau Chauffeurs' },
//       { value: 'Bureau_Comptabilite', label: 'Bureau Comptabilité' },
//       { value: 'Bureau_DAF', label: 'Bureau DAF' },
//       { value: 'Bureau_DEFR', label: 'Bureau DEFR' },
//       { value: 'Bureau_DG', label: 'Bureau DG' },
//       { value: 'Bureau_DRH', label: 'Bureau DRH' },
//       { value: 'Bureau_DRI', label: 'Bureau DRI' },
//       { value: 'Bureau_MDI', label: 'Bureau MDI' },
//       { value: 'Bureau_Scolarite', label: 'Bureau Scolarité' },
//       { value: 'Bureau_SG', label: 'Bureau SG' }
//     ],
//     'Bâtiment HA': [
//       { value: 'Bibliothèque', label: 'Bibliothèque' },
//       { value: 'Bureau_RDC', label: 'Bureau RDC' },
//       { value: 'Bureau_Etage', label: 'Bureau Étage' },
//       { value: 'Cyber', label: 'Cyber' }
//     ],
//     'Bâtiment HB': [
//       { value: 'Bureau_Etage1', label: 'Bureau Étage 1' },
//       { value: 'Bureau_Etage2', label: 'Bureau Étage 2' },
//       { value: 'Bureau_Etage3', label: 'Bureau Étage 3' },
//       { value: 'Bureau_Etage4', label: 'Bureau Étage 4' },
//       { value: 'Bureau_RDC1', label: 'Bureau RDC1' },
//       { value: 'Bureau_RDC2', label: 'Bureau RDC2' },
//       { value: 'Centre_de_Certification', label: 'Centre de Certification' }
//     ],
//     'Bâtiment E': [
//       { value: 'CRT', label: 'CRT' },
//       { value: 'E11', label: 'E11' }
//     ],
//     'Foyer': [
//       { value: 'Cuisine', label: 'Cuisine' }
//     ]
//   };

//   const getLieuLabel = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return site.label;
//     }
//     return lieuValue;
//   };

//   const getBatiment = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return batiment;
//     }
//     return '';
//   };

//   const filteredInterventions = interventions.filter(i => {
//     if (currentUser.role !== 'admin' && i.technicien?._id !== currentUser._id) return false;
//     if (filterDate && i.dateDebut !== filterDate) return false;
//     if (filterStatut && i.statut !== filterStatut) return false;
//     if (filterLieu && i.lieu !== filterLieu) return false;
//     if (searchTerm && !i.titre.toLowerCase().includes(searchTerm.toLowerCase()) && 
//         !i.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
//     return true;
//   });

//   const techniciens = users.filter(u => u.role !== 'admin');

//   const handleSave = async (data, interventionId = null) => {
//     setLoading(true);
//     let result;
    
//     if (editItem || interventionId) {
//       const id = interventionId || editItem._id;
//       result = await onUpdate(id, data);
      
//       if (result.success && onReloadIntervention) {
//         await onReloadIntervention(id);
//       }
//     } else {
//       result = await onAdd(data);
//     }

//     setLoading(false);

//     if (result.success) {
//       setShowModal(false);
//       setEditItem(null);
//     } else {
//       alert(result.message || 'Une erreur est survenue');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
//       const result = await onDelete(id);
//       if (!result.success) {
//         alert(result.message || 'Une erreur est survenue');
//       }
//     }
//   };

//   const handleUpdateStatus = async (intervention) => {
//     const newStatus = intervention.statut === 'planifiee' ? 'en_cours' : 'terminee';
//     const result = await onUpdate(intervention._id, { statut: newStatus });
    
//     if (!result.success) {
//       alert(result.message || 'Une erreur est survenue');
//     }
//   };

//   const handleShowFiles = (intervention) => {
//     setSelectedIntervention(intervention);
//     setShowFilesModal(true);
//   };

//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case 'image': 
//         return <Image size={18} className="text-blue-500" />;
//       case 'document': 
//         return <FileText size={18} className="text-emerald-500" />;
//       default: 
//         return <FileText size={18} className="text-gray-500" />;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getStatusConfig = (statut) => {
//     switch (statut) {
//       case 'terminee': 
//         return { 
//           color: 'bg-green-100 text-green-800 border-green-200',
//           icon: <Check size={14} className="text-green-600" />,
//           text: 'Terminée'
//         };
//       case 'en_cours': 
//         return { 
//           color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//           icon: <Clock size={14} className="text-yellow-600" />,
//           text: 'En cours'
//         };
//       case 'planifiee': 
//         return { 
//           color: 'bg-blue-100 text-blue-800 border-blue-200',
//           icon: <Calendar size={14} className="text-blue-600" />,
//           text: 'Planifiée'
//         };
//       default: 
//         return { 
//           color: 'bg-gray-100 text-gray-800 border-gray-200',
//           icon: <AlertCircle size={14} className="text-gray-600" />,
//           text: statut
//         };
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'reparation': return 'bg-purple-100 text-purple-800 border-purple-200';
//       case 'diagnostic': return 'bg-orange-100 text-orange-800 border-orange-200';
//       case 'verification': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
//       case 'maintenance': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
//       case 'installation': return 'bg-pink-100 text-pink-800 border-pink-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const canModifyIntervention = (intervention) => {
//     return currentUser.role === 'admin' || intervention.technicien?._id === currentUser._id;
//   };

//   const toggleInterventionExpansion = (interventionId) => {
//     setExpandedIntervention(expandedIntervention === interventionId ? null : interventionId);
//   };

//   const resetFilters = () => {
//     setFilterDate('');
//     setFilterStatut('');
//     setFilterLieu('');
//     setSearchTerm('');
//   };

//   const hasActiveFilters = filterDate || filterStatut || filterLieu || searchTerm;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
//       {/* Header avec statistiques */}
//       <div className="mb-8">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Gestion des Interventions
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Gérez et suivez toutes les interventions techniques
//             </p>
//           </div>
          
//           {currentUser.role === 'admin' && (
//             <button
//               onClick={() => { setEditItem(null); setShowModal(true); }}
//               className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold group"
//             >
//               <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
//               Nouvelle intervention
//             </button>
//           )}
//         </div>

//         {/* Cartes de statistiques */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total</p>
//                 <p className="text-2xl font-bold text-gray-900">{interventions.length}</p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <FileText size={20} className="text-blue-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Planifiées</p>
//                 <p className="text-2xl font-bold text-blue-600">
//                   {interventions.filter(i => i.statut === 'planifiee').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <Calendar size={20} className="text-blue-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">En cours</p>
//                 <p className="text-2xl font-bold text-yellow-600">
//                   {interventions.filter(i => i.statut === 'en_cours').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-yellow-100 rounded-xl">
//                 <Clock size={20} className="text-yellow-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Terminées</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {interventions.filter(i => i.statut === 'terminee').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-green-100 rounded-xl">
//                 <Check size={20} className="text-green-600" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Barre de recherche et filtres */}
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           {/* Barre de recherche */}
//           <div className="flex-1 relative">
//             <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Rechercher une intervention..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//             />
//           </div>

//           {/* Bouton filtres */}
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-200 font-medium"
//           >
//             <Filter size={18} />
//             Filtres
//             {hasActiveFilters && (
//               <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//             )}
//           </button>
//         </div>

//         {/* Panneau des filtres */}
//         {showFilters && (
//           <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                   <Calendar size={16} />
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   value={filterDate}
//                   onChange={(e) => setFilterDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
              
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                   <AlertCircle size={16} />
//                   Statut
//                 </label>
//                 <select
//                   value={filterStatut}
//                   onChange={(e) => setFilterStatut(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Tous les statuts</option>
//                   <option value="planifiee">Planifiée</option>
//                   <option value="en_cours">En cours</option>
//                   <option value="terminee">Terminée</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                   <Building size={16} />
//                   Lieu
//                 </label>
//                 <select
//                   value={filterLieu}
//                   onChange={(e) => setFilterLieu(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Tous les lieux</option>
//                   {Object.entries(sitesByBuilding).map(([batiment, sites]) => (
//                     <optgroup key={batiment} label={batiment}>
//                       {sites.map((site) => (
//                         <option key={site.value} value={site.value}>
//                           {site.label}
//                         </option>
//                       ))}
//                     </optgroup>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-end">
//                 <button
//                   onClick={resetFilters}
//                   className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all duration-200 font-medium"
//                 >
//                   Réinitialiser
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Liste des interventions */}
//       <div className="space-y-4">
//         {filteredInterventions.map(intervention => {
//           const tech = intervention.technicien;
//           const hasFiles = intervention.fichiers && intervention.fichiers.length > 0;
//           const statusConfig = getStatusConfig(intervention.statut);
//           const isExpanded = expandedIntervention === intervention._id;
          
//           return (
//             <div key={intervention._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
//               {/* En-tête de l'intervention */}
//               <div 
//                 className="p-6 cursor-pointer"
//                 onClick={() => toggleInterventionExpansion(intervention._id)}
//               >
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-start gap-3">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                           {intervention.titre}
//                         </h3>
//                         {intervention.description && (
//                           <p className="text-gray-600 line-clamp-2">
//                             {intervention.description}
//                           </p>
//                         )}
//                       </div>
//                       <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                         {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                       </button>
//                     </div>
                    
//                     <div className="flex flex-wrap gap-2 mt-3">
//                       <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(intervention.type)}`}>
//                         {intervention.type}
//                       </span>
//                       <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
//                         {statusConfig.icon}
//                         {statusConfig.text}
//                       </span>
//                       {hasFiles && (
//                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
//                           <FileText size={12} />
//                           {intervention.fichiers.length} fichier(s)
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     {/* Actions rapides */}
//                     <div className="flex gap-1">
//                       {currentUser.role !== 'admin' && intervention.statut !== 'terminee' && (
//                         <button
//                           onClick={(e) => { e.stopPropagation(); handleUpdateStatus(intervention); }}
//                           className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title={intervention.statut === 'planifiee' ? 'Démarrer l\'intervention' : 'Marquer comme terminée'}
//                         >
//                           <Check size={18} />
//                         </button>
//                       )}

//                       {hasFiles && (
//                         <button
//                           onClick={(e) => { e.stopPropagation(); handleShowFiles(intervention); }}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title="Voir les fichiers"
//                         >
//                           <FileText size={18} />
//                         </button>
//                       )}

//                       {currentUser.role === 'admin' && (
//                         <>
//                           <button
//                             onClick={(e) => { e.stopPropagation(); setEditItem(intervention); setShowModal(true); }}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                             title="Modifier"
//                           >
//                             <Edit2 size={18} />
//                           </button>
//                           <button
//                             onClick={(e) => { e.stopPropagation(); handleDelete(intervention._id); }}
//                             className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
//                             title="Supprimer"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </>
//                       )}

//                       {currentUser.role !== 'admin' && canModifyIntervention(intervention) && (
//                         <button
//                           onClick={(e) => { e.stopPropagation(); setEditItem(intervention); setShowModal(true); }}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title="Modifier"
//                         >
//                           <Edit2 size={18} />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Détails expansibles */}
//               {isExpanded && (
//                 <div className="border-t border-gray-200 p-6 bg-gray-50/50">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-white rounded-lg border border-gray-200">
//                         <MapPin size={18} className="text-gray-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Lieu</p>
//                         <p className="text-gray-900 font-semibold">{getLieuLabel(intervention.lieu)}</p>
//                         <p className="text-xs text-gray-500">{getBatiment(intervention.lieu)}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-white rounded-lg border border-gray-200">
//                         <User size={18} className="text-gray-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Technicien</p>
//                         <p className="text-gray-900 font-semibold">
//                           {tech ? `${tech.prenom} ${tech.nom}` : 'Non assigné'}
//                         </p>
//                         {tech && (
//                           <p className="text-xs text-gray-500 capitalize">{tech.role}</p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-white rounded-lg border border-gray-200">
//                         <Calendar size={18} className="text-gray-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Date</p>
//                         <p className="text-gray-900 font-semibold">
//                           {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
//                         </p>
//                         <p className="text-xs text-gray-500">{intervention.heureDebut}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-white rounded-lg border border-gray-200">
//                         <Clock size={18} className="text-gray-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Équipement</p>
//                         <p className="text-gray-900 font-semibold">{intervention.materiel}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fichiers preview */}
//                   {hasFiles && (
//                     <div className="mt-4">
//                       <p className="text-sm font-medium text-gray-700 mb-2">Fichiers attachés</p>
//                       <div className="flex flex-wrap gap-2">
//                         {intervention.fichiers.slice(0, 3).map((fichier, index) => (
//                           <button
//                             key={fichier._id}
//                             onClick={() => handleShowFiles(intervention)}
//                             className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                           >
//                             {getFileIcon(fichier.type)}
//                             <span className="text-sm text-gray-700">{fichier.nom}</span>
//                           </button>
//                         ))}
//                         {intervention.fichiers.length > 3 && (
//                           <button
//                             onClick={() => handleShowFiles(intervention)}
//                             className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
//                           >
//                             +{intervention.fichiers.length - 3} autres
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* État vide */}
//       {filteredInterventions.length === 0 && (
//         <div className="text-center py-16">
//           <div className="max-w-md mx-auto">
//             <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
//               <FileText size={40} className="text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Aucune intervention trouvée
//             </h3>
//             <p className="text-gray-600 mb-6">
//               {hasActiveFilters 
//                 ? 'Aucune intervention ne correspond à vos critères de recherche.'
//                 : currentUser.role === 'admin' 
//                   ? 'Commencez par créer votre première intervention' 
//                   : 'Aucune intervention ne vous est assignée pour le moment'
//               }
//             </p>
//             {hasActiveFilters ? (
//               <button
//                 onClick={resetFilters}
//                 className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
//               >
//                 Réinitialiser les filtres
//               </button>
//             ) : currentUser.role === 'admin' && (
//               <button
//                 onClick={() => { setEditItem(null); setShowModal(true); }}
//                 className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 font-medium"
//               >
//                 Créer une intervention
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Modal Intervention */}
//       {showModal && (
//         <InterventionModal
//           intervention={editItem}
//           techniciens={techniciens}
//           onSave={handleSave}
//           onClose={() => { setShowModal(false); setEditItem(null); }}
//           loading={loading}
//           currentUser={currentUser}
//           sitesByBuilding={sitesByBuilding}
//         />
//       )}

//       {/* Modal Fichiers */}
//       {showFilesModal && selectedIntervention && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="text-xl font-bold text-white">
//                     Fichiers - {selectedIntervention.titre}
//                   </h3>
//                   <p className="text-blue-100 mt-1">
//                     {selectedIntervention.fichiers?.length || 0} fichier(s) attaché(s)
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowFilesModal(false)}
//                   className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
//                 >
//                   <X size={24} className="text-white" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Technicien</p>
//                   <p className="text-gray-900">
//                     {selectedIntervention.technicien?.prenom} {selectedIntervention.technicien?.nom}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Lieu</p>
//                   <p className="text-gray-900">
//                     {getLieuLabel(selectedIntervention.lieu)} ({getBatiment(selectedIntervention.lieu)})
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Statut</p>
//                   <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusConfig(selectedIntervention.statut).color}`}>
//                     {getStatusConfig(selectedIntervention.statut).text}
//                   </span>
//                 </div>
//               </div>

//               {selectedIntervention.fichiers && selectedIntervention.fichiers.length > 0 ? (
//                 <div className="space-y-4">
//                   {selectedIntervention.fichiers.map((fichier) => (
//                     <div key={fichier._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
//                       <div className="flex items-center space-x-4 flex-1">
//                         <div className="p-3 bg-gray-100 rounded-lg">
//                           {getFileIcon(fichier.type)}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="font-semibold text-gray-900 truncate">{fichier.nom}</p>
//                           <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
//                             <span>{formatFileSize(fichier.taille)}</span>
//                             <span>•</span>
//                             <span className="capitalize">{fichier.type}</span>
//                             <span>•</span>
//                             <span>Uploadé le {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}</span>
//                             {fichier.uploadedBy && (
//                               <>
//                                 <span>•</span>
//                                 <span>par {fichier.uploadedBy.prenom} {fichier.uploadedBy.nom}</span>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                           className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title="Télécharger"
//                         >
//                           <Download size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <FileText size={64} className="mx-auto mb-4 text-gray-300" />
//                   <p className="text-gray-500 text-lg">Aucun fichier attaché à cette intervention</p>
//                 </div>
//               )}

//               <div className="flex justify-end pt-6 mt-6 border-t">
//                 <button
//                   onClick={() => setShowFilesModal(false)}
//                   className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors font-medium"
//                 >
//                   Fermer
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterventionsView;



// // NOUVELLE VERSION CLAUDE AVEC INTEGRATION DES FONCTIONNALITES DE DATES EFFECTIVES ET DUREE



// import React, { useState } from 'react';
// import { 
//   Plus, 
//   Edit2, 
//   Trash2, 
//   Check, 
//   FileText, 
//   Image, 
//   Download, 
//   Filter,
//   Search,
//   Calendar,
//   MapPin,
//   User,
//   AlertCircle,
//   Clock,
//   Building,
//   X,
//   ChevronDown,
//   ChevronUp
// } from 'lucide-react';
// import InterventionModal from '../modals/InterventionModal';

// // Fonction helper pour formater la durée
// const formatDuree = (dateDebut, dateFin) => {
//   if (!dateDebut || !dateFin) return null;
  
//   const dureeMs = new Date(dateFin) - new Date(dateDebut);
//   const heures = Math.floor(dureeMs / (1000 * 60 * 60));
//   const minutes = Math.floor((dureeMs % (1000 * 60 * 60)) / (1000 * 60));
  
//   if (heures > 0) {
//     return `${heures}h ${minutes}min`;
//   }
//   return `${minutes}min`;
// };

// const InterventionsView = ({ 
//   currentUser, 
//   interventions, 
//   users, 
//   onAdd, 
//   onUpdate, 
//   onDelete,
//   filterDate,
//   setFilterDate,
//   filterStatut,
//   setFilterStatut,
//   onReloadIntervention
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showFilesModal, setShowFilesModal] = useState(false);
//   const [selectedIntervention, setSelectedIntervention] = useState(null);
//   const [filterLieu, setFilterLieu] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [expandedIntervention, setExpandedIntervention] = useState(null);

//   const sitesByBuilding = {
//     'Bâtiment AD': [
//       { value: 'Bureau_Accueil', label: 'Bureau Accueil' },
//       { value: 'Bureau_Chauffeurs', label: 'Bureau Chauffeurs' },
//       { value: 'Bureau_Comptabilite', label: 'Bureau Comptabilité' },
//       { value: 'Bureau_DAF', label: 'Bureau DAF' },
//       { value: 'Bureau_DEFR', label: 'Bureau DEFR' },
//       { value: 'Bureau_DG', label: 'Bureau DG' },
//       { value: 'Bureau_DRH', label: 'Bureau DRH' },
//       { value: 'Bureau_DRI', label: 'Bureau DRI' },
//       { value: 'Bureau_MDI', label: 'Bureau MDI' },
//       { value: 'Bureau_Scolarite', label: 'Bureau Scolarité' },
//       { value: 'Bureau_SG', label: 'Bureau SG' }
//     ],
//     'Bâtiment HA': [
//       { value: 'Bibliothèque', label: 'Bibliothèque' },
//       { value: 'Bureau_RDC', label: 'Bureau RDC' },
//       { value: 'Bureau_Etage', label: 'Bureau Étage' },
//       { value: 'Cyber', label: 'Cyber' }
//     ],
//     'Bâtiment HB': [
//       { value: 'Bureau_Etage1', label: 'Bureau Étage 1' },
//       { value: 'Bureau_Etage2', label: 'Bureau Étage 2' },
//       { value: 'Bureau_Etage3', label: 'Bureau Étage 3' },
//       { value: 'Bureau_Etage4', label: 'Bureau Étage 4' },
//       { value: 'Bureau_RDC1', label: 'Bureau RDC1' },
//       { value: 'Bureau_RDC2', label: 'Bureau RDC2' },
//       { value: 'Centre_de_Certification', label: 'Centre de Certification' }
//     ],
//     'Bâtiment E': [
//       { value: 'CRT', label: 'CRT' },
//       { value: 'E11', label: 'E11' }
//     ],
//     'Foyer': [
//       { value: 'Cuisine', label: 'Cuisine' }
//     ]
//   };

//   const getLieuLabel = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return site.label;
//     }
//     return lieuValue;
//   };

//   const getBatiment = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return batiment;
//     }
//     return '';
//   };

//   const filteredInterventions = interventions.filter(i => {
//     if (currentUser.role !== 'admin' && i.technicien?._id !== currentUser._id) return false;
//     if (filterDate && i.dateDebut !== filterDate) return false;
//     if (filterStatut && i.statut !== filterStatut) return false;
//     if (filterLieu && i.lieu !== filterLieu) return false;
//     if (searchTerm && !i.titre.toLowerCase().includes(searchTerm.toLowerCase()) && 
//         !i.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
//     return true;
//   });

//   const techniciens = users.filter(u => u.role !== 'admin');

//   const handleSave = async (data, interventionId = null) => {
//     setLoading(true);
//     let result;
    
//     if (editItem || interventionId) {
//       const id = interventionId || editItem._id;
//       result = await onUpdate(id, data);
      
//       if (result.success && onReloadIntervention) {
//         await onReloadIntervention(id);
//       }
//     } else {
//       result = await onAdd(data);
//     }

//     setLoading(false);

//     if (result.success) {
//       setShowModal(false);
//       setEditItem(null);
//     } else {
//       alert(result.message || 'Une erreur est survenue');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
//       const result = await onDelete(id);
//       if (!result.success) {
//         alert(result.message || 'Une erreur est survenue');
//       }
//     }
//   };

//   const handleUpdateStatus = async (intervention) => {
//     const newStatus = intervention.statut === 'planifiee' ? 'en_cours' : 'terminee';
//     const result = await onUpdate(intervention._id, { statut: newStatus });
    
//     if (!result.success) {
//       alert(result.message || 'Une erreur est survenue');
//     }
//   };

//   const handleShowFiles = (intervention) => {
//     setSelectedIntervention(intervention);
//     setShowFilesModal(true);
//   };

//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case 'image': 
//         return <Image size={18} className="text-blue-500" />;
//       case 'document': 
//         return <FileText size={18} className="text-emerald-500" />;
//       default: 
//         return <FileText size={18} className="text-gray-500" />;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getStatusConfig = (statut) => {
//     switch (statut) {
//       case 'terminee': 
//         return { 
//           color: 'bg-green-100 text-green-800 border-green-200',
//           icon: <Check size={14} className="text-green-600" />,
//           text: 'Terminée'
//         };
//       case 'en_cours': 
//         return { 
//           color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//           icon: <Clock size={14} className="text-yellow-600" />,
//           text: 'En cours'
//         };
//       case 'planifiee': 
//         return { 
//           color: 'bg-blue-100 text-blue-800 border-blue-200',
//           icon: <Calendar size={14} className="text-blue-600" />,
//           text: 'Planifiée'
//         };
//       default: 
//         return { 
//           color: 'bg-gray-100 text-gray-800 border-gray-200',
//           icon: <AlertCircle size={14} className="text-gray-600" />,
//           text: statut
//         };
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'reparation': return 'bg-purple-100 text-purple-800 border-purple-200';
//       case 'diagnostic': return 'bg-orange-100 text-orange-800 border-orange-200';
//       case 'verification': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
//       case 'maintenance': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
//       case 'installation': return 'bg-pink-100 text-pink-800 border-pink-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const canModifyIntervention = (intervention) => {
//     return currentUser.role === 'admin' || intervention.technicien?._id === currentUser._id;
//   };

//   const toggleInterventionExpansion = (interventionId) => {
//     setExpandedIntervention(expandedIntervention === interventionId ? null : interventionId);
//   };

//   const resetFilters = () => {
//     setFilterDate('');
//     setFilterStatut('');
//     setFilterLieu('');
//     setSearchTerm('');
//   };

//   const hasActiveFilters = filterDate || filterStatut || filterLieu || searchTerm;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
//       {/* Header avec statistiques */}
//       <div className="mb-8">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Gestion des Interventions
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Gérez et suivez toutes les interventions techniques
//             </p>
//           </div>
          
//           {currentUser.role === 'admin' && (
//             <button
//               onClick={() => { setEditItem(null); setShowModal(true); }}
//               className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold group"
//             >
//               <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
//               Nouvelle intervention
//             </button>
//           )}
//         </div>

//         {/* Cartes de statistiques */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total</p>
//                 <p className="text-2xl font-bold text-gray-900">{interventions.length}</p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <FileText size={20} className="text-blue-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Planifiées</p>
//                 <p className="text-2xl font-bold text-blue-600">
//                   {interventions.filter(i => i.statut === 'planifiee').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <Calendar size={20} className="text-blue-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">En cours</p>
//                 <p className="text-2xl font-bold text-yellow-600">
//                   {interventions.filter(i => i.statut === 'en_cours').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-yellow-100 rounded-xl">
//                 <Clock size={20} className="text-yellow-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Terminées</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {interventions.filter(i => i.statut === 'terminee').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-green-100 rounded-xl">
//                 <Check size={20} className="text-green-600" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Barre de recherche et filtres */}
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           {/* Barre de recherche */}
//           <div className="flex-1 relative">
//             <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Rechercher une intervention..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//             />
//           </div>

//           {/* Bouton filtres */}
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-200 font-medium"
//           >
//             <Filter size={18} />
//             Filtres
//             {hasActiveFilters && (
//               <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//             )}
//           </button>
//         </div>

//         {/* Panneau des filtres */}
//         {showFilters && (
//           <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                   <Calendar size={16} />
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   value={filterDate}
//                   onChange={(e) => setFilterDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
              
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                   <AlertCircle size={16} />
//                   Statut
//                 </label>
//                 <select
//                   value={filterStatut}
//                   onChange={(e) => setFilterStatut(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Tous les statuts</option>
//                   <option value="planifiee">Planifiée</option>
//                   <option value="en_cours">En cours</option>
//                   <option value="terminee">Terminée</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                   <Building size={16} />
//                   Lieu
//                 </label>
//                 <select
//                   value={filterLieu}
//                   onChange={(e) => setFilterLieu(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Tous les lieux</option>
//                   {Object.entries(sitesByBuilding).map(([batiment, sites]) => (
//                     <optgroup key={batiment} label={batiment}>
//                       {sites.map((site) => (
//                         <option key={site.value} value={site.value}>
//                           {site.label}
//                         </option>
//                       ))}
//                     </optgroup>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-end">
//                 <button
//                   onClick={resetFilters}
//                   className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all duration-200 font-medium"
//                 >
//                   Réinitialiser
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Liste des interventions */}
//       <div className="space-y-4">
//         {filteredInterventions.map(intervention => {
//           const tech = intervention.technicien;
//           const hasFiles = intervention.fichiers && intervention.fichiers.length > 0;
//           const statusConfig = getStatusConfig(intervention.statut);
//           const isExpanded = expandedIntervention === intervention._id;
          
//           return (
//             <div key={intervention._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
//               {/* En-tête de l'intervention */}
//               <div 
//                 className="p-6 cursor-pointer"
//                 onClick={() => toggleInterventionExpansion(intervention._id)}
//               >
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-start gap-3">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                           {intervention.titre}
//                         </h3>
//                         {intervention.description && (
//                           <p className="text-gray-600 line-clamp-2">
//                             {intervention.description}
//                           </p>
//                         )}
//                       </div>
//                       <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                         {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                       </button>
//                     </div>
                    
//                     <div className="flex flex-wrap gap-2 mt-3">
//                       <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(intervention.type)}`}>
//                         {intervention.type}
//                       </span>
//                       <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
//                         {statusConfig.icon}
//                         {statusConfig.text}
//                       </span>
//                       {hasFiles && (
//                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
//                           <FileText size={12} />
//                           {intervention.fichiers.length} fichier(s)
//                         </span>
//                       )}
//                       {/* Badge durée si terminée */}
//                       {intervention.dateDebutEffectif && intervention.dateFinEffective && (
//                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
//                           ⏱️ {formatDuree(intervention.dateDebutEffectif, intervention.dateFinEffective)}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     {/* Actions rapides */}
//                     <div className="flex gap-1">
//                       {currentUser.role !== 'admin' && intervention.statut !== 'terminee' && (
//                         <button
//                           onClick={(e) => { e.stopPropagation(); handleUpdateStatus(intervention); }}
//                           className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title={intervention.statut === 'planifiee' ? 'Démarrer l\'intervention' : 'Marquer comme terminée'}
//                         >
//                           <Check size={18} />
//                         </button>
//                       )}

//                       {hasFiles && (
//                         <button
//                           onClick={(e) => { e.stopPropagation(); handleShowFiles(intervention); }}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title="Voir les fichiers"
//                         >
//                           <FileText size={18} />
//                         </button>
//                       )}

//                       {currentUser.role === 'admin' && (
//                         <>
//                           <button
//                             onClick={(e) => { e.stopPropagation(); setEditItem(intervention); setShowModal(true); }}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                             title="Modifier"
//                           >
//                             <Edit2 size={18} />
//                           </button>
//                           <button
//                             onClick={(e) => { e.stopPropagation(); handleDelete(intervention._id); }}
//                             className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
//                             title="Supprimer"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </>
//                       )}

//                       {currentUser.role !== 'admin' && canModifyIntervention(intervention) && (
//                         <button
//                           onClick={(e) => { e.stopPropagation(); setEditItem(intervention); setShowModal(true); }}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title="Modifier"
//                         >
//                           <Edit2 size={18} />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Détails expansibles */}
//               {isExpanded && (
//                 <div className="border-t border-gray-200 p-6 bg-gray-50/50">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-white rounded-lg border border-gray-200">
//                         <MapPin size={18} className="text-gray-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Lieu</p>
//                         <p className="text-gray-900 font-semibold">{getLieuLabel(intervention.lieu)}</p>
//                         <p className="text-xs text-gray-500">{getBatiment(intervention.lieu)}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-white rounded-lg border border-gray-200">
//                         <User size={18} className="text-gray-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Technicien</p>
//                         <p className="text-gray-900 font-semibold">
//                           {tech ? `${tech.prenom} ${tech.nom}` : 'Non assigné'}
//                         </p>
//                         {tech && (
//                           <p className="text-xs text-gray-500 capitalize">{tech.role}</p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Timeline des dates */}
//                     <div className="col-span-2 space-y-3 bg-white p-4 rounded-xl border border-gray-200">
//                       <p className="text-sm font-semibold text-gray-700 mb-2">Chronologie:</p>
                      
//                       {/* Date planifiée */}
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                         <span className="text-sm text-gray-600">
//                           <strong>Planifié:</strong> {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')} à {intervention.heureDebut}
//                         </span>
//                       </div>
                      
//                       {/* Date début effectif */}
//                       {intervention.dateDebutEffectif && (
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                           <span className="text-sm text-gray-600">
//                             <strong>Débuté:</strong> {new Date(intervention.dateDebutEffectif).toLocaleDateString('fr-FR')} à {intervention.heureDebutEffectif}
//                           </span>
//                         </div>
//                       )}
                      
//                       {/* Date fin effective */}
//                       {intervention.dateFinEffective && (
//                         <>
//                           <div className="flex items-center gap-2">
//                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                             <span className="text-sm text-gray-600">
//                               <strong>Terminé:</strong> {new Date(intervention.dateFinEffective).toLocaleDateString('fr-FR')} à {intervention.heureFinEffective}
//                             </span>
//                           </div>
                          
//                           {/* Durée totale */}
//                           {intervention.dateDebutEffectif && (
//                             <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
//                               <span className="text-sm font-semibold text-purple-700">
//                                 ⏱️ Durée totale: {formatDuree(intervention.dateDebutEffectif, intervention.dateFinEffective)}
//                               </span>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-white rounded-lg border border-gray-200">
//                         <Clock size={18} className="text-gray-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Équipement</p>
//                         <p className="text-gray-900 font-semibold">{intervention.materiel}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fichiers preview */}
//                   {hasFiles && (
//                     <div className="mt-4">
//                       <p className="text-sm font-medium text-gray-700 mb-2">Fichiers attachés</p>
//                       <div className="flex flex-wrap gap-2">
//                         {intervention.fichiers.slice(0, 3).map((fichier) => (
//                           <button
//                             key={fichier._id}
//                             onClick={() => handleShowFiles(intervention)}
//                             className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                           >
//                             {getFileIcon(fichier.type)}
//                             <span className="text-sm text-gray-700">{fichier.nom}</span>
//                           </button>
//                         ))}
//                         {intervention.fichiers.length > 3 && (
//                           <button
//                             onClick={() => handleShowFiles(intervention)}
//                             className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
//                           >
//                             +{intervention.fichiers.length - 3} autres
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* État vide */}
//       {filteredInterventions.length === 0 && (
//         <div className="text-center py-16">
//           <div className="max-w-md mx-auto">
//             <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
//               <FileText size={40} className="text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Aucune intervention trouvée
//             </h3>
//             <p className="text-gray-600 mb-6">
//               {hasActiveFilters 
//                 ? 'Aucune intervention ne correspond à vos critères de recherche.'
//                 : currentUser.role === 'admin' 
//                   ? 'Commencez par créer votre première intervention' 
//                   : 'Aucune intervention ne vous est assignée pour le moment'
//               }
//             </p>
//             {hasActiveFilters ? (
//               <button
//                 onClick={resetFilters}
//                 className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
//               >
//                 Réinitialiser les filtres
//               </button>
//             ) : currentUser.role === 'admin' && (
//               <button
//                 onClick={() => { setEditItem(null); setShowModal(true); }}
//                 className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 font-medium"
//               >
//                 Créer une intervention
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Modal Intervention */}
//       {showModal && (
//         <InterventionModal
//           intervention={editItem}
//           techniciens={techniciens}
//           onSave={handleSave}
//           onClose={() => { setShowModal(false); setEditItem(null); }}
//           loading={loading}
//           currentUser={currentUser}
//           sitesByBuilding={sitesByBuilding}
//         />
//       )}

//       {/* Modal Fichiers */}
//       {showFilesModal && selectedIntervention && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="text-xl font-bold text-white">
//                     Fichiers - {selectedIntervention.titre}
//                   </h3>
//                   <p className="text-blue-100 mt-1">
//                     {selectedIntervention.fichiers?.length || 0} fichier(s) attaché(s)
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowFilesModal(false)}
//                   className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
//                 >
//                   <X size={24} className="text-white" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
//               {/* Informations de l'intervention avec timeline */}
//               <div className="mb-6 p-4 bg-gray-50 rounded-xl space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Technicien</p>
//                     <p className="text-gray-900">
//                       {selectedIntervention.technicien?.prenom} {selectedIntervention.technicien?.nom}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Lieu</p>
//                     <p className="text-gray-900">
//                       {getLieuLabel(selectedIntervention.lieu)} ({getBatiment(selectedIntervention.lieu)})
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Statut</p>
//                     <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusConfig(selectedIntervention.statut).color}`}>
//                       {getStatusConfig(selectedIntervention.statut).text}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Timeline des dates dans le modal */}
//                 <div className="border-t pt-3">
//                   <p className="text-xs font-semibold text-gray-700 mb-2">Chronologie:</p>
//                   <div className="space-y-2">
//                     {/* Date planifiée */}
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                       <span className="text-xs text-gray-600">
//                         Planifié: {new Date(selectedIntervention.dateDebut).toLocaleDateString('fr-FR')} à {selectedIntervention.heureDebut}
//                       </span>
//                     </div>
                    
//                     {/* Date début effectif */}
//                     {selectedIntervention.dateDebutEffectif && (
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                         <span className="text-xs text-gray-600">
//                           Débuté: {new Date(selectedIntervention.dateDebutEffectif).toLocaleDateString('fr-FR')} à {selectedIntervention.heureDebutEffectif}
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Date fin effective */}
//                     {selectedIntervention.dateFinEffective && (
//                       <>
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                           <span className="text-xs text-gray-600">
//                             Terminé: {new Date(selectedIntervention.dateFinEffective).toLocaleDateString('fr-FR')} à {selectedIntervention.heureFinEffective}
//                           </span>
//                         </div>
                        
//                         {/* Durée */}
//                         {selectedIntervention.dateDebutEffectif && (
//                           <div className="flex items-center gap-2 mt-2 pt-2 border-t">
//                             <span className="text-xs font-semibold text-purple-700">
//                               ⏱️ Durée totale: {formatDuree(selectedIntervention.dateDebutEffectif, selectedIntervention.dateFinEffective)}
//                             </span>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {selectedIntervention.fichiers && selectedIntervention.fichiers.length > 0 ? (
//                 <div className="space-y-4">
//                   {selectedIntervention.fichiers.map((fichier) => (
//                     <div key={fichier._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
//                       <div className="flex items-center space-x-4 flex-1">
//                         <div className="p-3 bg-gray-100 rounded-lg">
//                           {getFileIcon(fichier.type)}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="font-semibold text-gray-900 truncate">{fichier.nom}</p>
//                           <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
//                             <span>{formatFileSize(fichier.taille)}</span>
//                             <span>•</span>
//                             <span className="capitalize">{fichier.type}</span>
//                             <span>•</span>
//                             <span>Uploadé le {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}</span>
//                             {fichier.uploadedBy && (
//                               <>
//                                 <span>•</span>
//                                 <span>par {fichier.uploadedBy.prenom} {fichier.uploadedBy.nom}</span>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                           className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title="Télécharger"
//                         >
//                           <Download size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <FileText size={64} className="mx-auto mb-4 text-gray-300" />
//                   <p className="text-gray-500 text-lg">Aucun fichier attaché à cette intervention</p>
//                 </div>
//               )}

//               <div className="flex justify-end pt-6 mt-6 border-t">
//                 <button
//                   onClick={() => setShowFilesModal(false)}
//                   className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors font-medium"
//                 >
//                   Fermer
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterventionsView;



// NOUVELLE VERSION CLAUDE AVEC AJOUT


// import React, { useState } from 'react';
// import { 
//   Plus, 
//   Edit2, 
//   Trash2, 
//   Check, 
//   FileText, 
//   Image, 
//   Download, 
//   Filter,
//   Search,
//   Calendar,
//   MapPin,
//   User,
//   AlertCircle,
//   Clock,
//   Building,
//   X,
//   ChevronDown,
//   ChevronUp
// } from 'lucide-react';
// import InterventionModal from '../modals/InterventionModal';

// // Fonction helper pour formater la durée
// const formatDuree = (dateDebut, dateFin) => {
//   if (!dateDebut || !dateFin) return null;
  
//   const dureeMs = new Date(dateFin) - new Date(dateDebut);
//   const heures = Math.floor(dureeMs / (1000 * 60 * 60));
//   const minutes = Math.floor((dureeMs % (1000 * 60 * 60)) / (1000 * 60));
  
//   if (heures > 0) {
//     return `${heures}h ${minutes}min`;
//   }
//   return `${minutes}min`;
// };

// const InterventionsView = ({ 
//   currentUser, 
//   interventions, 
//   users, 
//   onAdd, 
//   onUpdate, 
//   onDelete,
//   filterDate,
//   setFilterDate,
//   filterStatut,
//   setFilterStatut,
//   onReloadIntervention
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showFilesModal, setShowFilesModal] = useState(false);
//   const [selectedIntervention, setSelectedIntervention] = useState(null);
//   const [filterLieu, setFilterLieu] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [expandedIntervention, setExpandedIntervention] = useState(null);

//   const sitesByBuilding = {
//     'Bâtiment AD': [
//       { value: 'Bureau_Accueil', label: 'Bureau Accueil' },
//       { value: 'Bureau_Chauffeurs', label: 'Bureau Chauffeurs' },
//       { value: 'Bureau_Comptabilite', label: 'Bureau Comptabilité' },
//       { value: 'Bureau_DAF', label: 'Bureau DAF' },
//       { value: 'Bureau_DEFR', label: 'Bureau DEFR' },
//       { value: 'Bureau_DG', label: 'Bureau DG' },
//       { value: 'Bureau_DRH', label: 'Bureau DRH' },
//       { value: 'Bureau_DRI', label: 'Bureau DRI' },
//       { value: 'Bureau_MDI', label: 'Bureau MDI' },
//       { value: 'Bureau_Scolarite', label: 'Bureau Scolarité' },
//       { value: 'Bureau_SG', label: 'Bureau SG' }
//     ],
//     'Bâtiment HA': [
//       { value: 'Bibliothèque', label: 'Bibliothèque' },
//       { value: 'Bureau_RDC', label: 'Bureau RDC' },
//       { value: 'Bureau_Etage', label: 'Bureau Étage' },
//       { value: 'Cyber', label: 'Cyber' }
//     ],
//     'Bâtiment HB': [
//       { value: 'Bureau_Etage1', label: 'Bureau Étage 1' },
//       { value: 'Bureau_Etage2', label: 'Bureau Étage 2' },
//       { value: 'Bureau_Etage3', label: 'Bureau Étage 3' },
//       { value: 'Bureau_Etage4', label: 'Bureau Étage 4' },
//       { value: 'Bureau_RDC1', label: 'Bureau RDC1' },
//       { value: 'Bureau_RDC2', label: 'Bureau RDC2' },
//       { value: 'Centre_de_Certification', label: 'Centre de Certification' }
//     ],
//     'Bâtiment E': [
//       { value: 'CRT', label: 'CRT' },
//       { value: 'E11', label: 'E11' }
//     ],
//     'Foyer': [
//       { value: 'Cuisine', label: 'Cuisine' }
//     ]
//   };

//   const getLieuLabel = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return site.label;
//     }
//     return lieuValue;
//   };

//   const getBatiment = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return batiment;
//     }
//     return '';
//   };

//   const filteredInterventions = interventions.filter(i => {
//     if (currentUser.role !== 'admin' && i.technicien?._id !== currentUser._id) return false;
//     if (filterDate && i.dateDebut !== filterDate) return false;
//     if (filterStatut && i.statut !== filterStatut) return false;
//     if (filterLieu && i.lieu !== filterLieu) return false;
//     if (searchTerm && !i.titre.toLowerCase().includes(searchTerm.toLowerCase()) && 
//         !i.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
//     return true;
//   });

//   const techniciens = users.filter(u => u.role !== 'admin');

//   const handleSave = async (data, interventionId = null) => {
//     setLoading(true);
//     let result;
    
//     if (editItem || interventionId) {
//       const id = interventionId || editItem._id;
//       result = await onUpdate(id, data);
      
//       if (result.success && onReloadIntervention) {
//         await onReloadIntervention(id);
//       }
//     } else {
//       result = await onAdd(data);
//     }

//     setLoading(false);

//     if (result.success) {
//       setShowModal(false);
//       setEditItem(null);
//     } else {
//       alert(result.message || 'Une erreur est survenue');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
//       const result = await onDelete(id);
//       if (!result.success) {
//         alert(result.message || 'Une erreur est survenue');
//       }
//     }
//   };

//   const handleUpdateStatus = async (intervention) => {
//     const newStatus = intervention.statut === 'planifiee' ? 'en_cours' : 'terminee';
//     console.log('🔄 Changement de statut:', intervention.statut, '→', newStatus);
    
//     // ✅ Si le technicien termine l'intervention (en_cours → terminee), ouvrir le modal
//     if (currentUser.role !== 'admin' && 
//         intervention.statut === 'en_cours' && 
//         newStatus === 'terminee') {
//       // Créer une copie de l'intervention avec le nouveau statut déjà appliqué
//       const interventionWithNewStatus = { 
//         ...intervention, 
//         statut: 'terminee',
//         _pendingStatusChange: true // Flag pour indiquer que c'est une finalisation
//       };
//       setEditItem(interventionWithNewStatus);
//       setShowModal(true);
//       return;
//     }
    
//     // Sinon, mise à jour directe du statut
//     const result = await onUpdate(intervention._id, { statut: newStatus });
    
//     console.log('📦 Résultat de la mise à jour:', result);
    
//     if (!result.success) {
//       alert(result.message || 'Une erreur est survenue');
//     } else {
//       console.log('✅ Intervention mise à jour:', result.data);
//       console.log('📅 Dates effectives:', {
//         dateDebutEffectif: result.data?.dateDebutEffectif,
//         dateFinEffective: result.data?.dateFinEffective
//       });
//     }
//   };

//   const handleShowFiles = (intervention) => {
//     setSelectedIntervention(intervention);
//     setShowFilesModal(true);
//   };

//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case 'image': 
//         return <Image size={18} className="text-blue-500" />;
//       case 'document': 
//         return <FileText size={18} className="text-emerald-500" />;
//       default: 
//         return <FileText size={18} className="text-gray-500" />;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getStatusConfig = (statut) => {
//     switch (statut) {
//       case 'terminee': 
//         return { 
//           color: 'bg-green-100 text-green-800 border-green-200',
//           icon: <Check size={14} className="text-green-600" />,
//           text: 'Terminée'
//         };
//       case 'en_cours': 
//         return { 
//           color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//           icon: <Clock size={14} className="text-yellow-600" />,
//           text: 'En cours'
//         };
//       case 'planifiee': 
//         return { 
//           color: 'bg-blue-100 text-blue-800 border-blue-200',
//           icon: <Calendar size={14} className="text-blue-600" />,
//           text: 'Planifiée'
//         };
//       default: 
//         return { 
//           color: 'bg-gray-100 text-gray-800 border-gray-200',
//           icon: <AlertCircle size={14} className="text-gray-600" />,
//           text: statut
//         };
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'reparation': return 'bg-purple-100 text-purple-800 border-purple-200';
//       case 'diagnostic': return 'bg-orange-100 text-orange-800 border-orange-200';
//       case 'verification': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
//       case 'maintenance': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
//       case 'installation': return 'bg-pink-100 text-pink-800 border-pink-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const canModifyIntervention = (intervention) => {
//     return currentUser.role === 'admin' || intervention.technicien?._id === currentUser._id;
//   };

//   const toggleInterventionExpansion = (interventionId) => {
//     setExpandedIntervention(expandedIntervention === interventionId ? null : interventionId);
//   };

//   const resetFilters = () => {
//     setFilterDate('');
//     setFilterStatut('');
//     setFilterLieu('');
//     setSearchTerm('');
//   };

//   const hasActiveFilters = filterDate || filterStatut || filterLieu || searchTerm;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
//       {/* Header avec statistiques */}
//       <div className="mb-8">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Gestion des Interventions
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Gérez et suivez toutes les interventions techniques
//             </p>
//           </div>
          
//           {currentUser.role === 'admin' && (
//             <button
//               onClick={() => { setEditItem(null); setShowModal(true); }}
//               className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold group"
//             >
//               <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
//               Nouvelle intervention
//             </button>
//           )}
//         </div>

//         {/* Cartes de statistiques */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total</p>
//                 <p className="text-2xl font-bold text-gray-900">{interventions.length}</p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <FileText size={20} className="text-blue-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Planifiées</p>
//                 <p className="text-2xl font-bold text-blue-600">
//                   {interventions.filter(i => i.statut === 'planifiee').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <Calendar size={20} className="text-blue-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">En cours</p>
//                 <p className="text-2xl font-bold text-yellow-600">
//                   {interventions.filter(i => i.statut === 'en_cours').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-yellow-100 rounded-xl">
//                 <Clock size={20} className="text-yellow-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Terminées</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {interventions.filter(i => i.statut === 'terminee').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-green-100 rounded-xl">
//                 <Check size={20} className="text-green-600" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Barre de recherche et filtres */}
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           {/* Barre de recherche */}
//           <div className="flex-1 relative">
//             <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Rechercher une intervention..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//             />
//           </div>

//           {/* Bouton filtres */}
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-200 font-medium"
//           >
//             <Filter size={18} />
//             Filtres
//             {hasActiveFilters && (
//               <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//             )}
//           </button>
//         </div>

//         {/* Panneau des filtres */}
//         {showFilters && (
//           <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                   <Calendar size={16} />
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   value={filterDate}
//                   onChange={(e) => setFilterDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
              
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                   <AlertCircle size={16} />
//                   Statut
//                 </label>
//                 <select
//                   value={filterStatut}
//                   onChange={(e) => setFilterStatut(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Tous les statuts</option>
//                   <option value="planifiee">Planifiée</option>
//                   <option value="en_cours">En cours</option>
//                   <option value="terminee">Terminée</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                   <Building size={16} />
//                   Lieu
//                 </label>
//                 <select
//                   value={filterLieu}
//                   onChange={(e) => setFilterLieu(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Tous les lieux</option>
//                   {Object.entries(sitesByBuilding).map(([batiment, sites]) => (
//                     <optgroup key={batiment} label={batiment}>
//                       {sites.map((site) => (
//                         <option key={site.value} value={site.value}>
//                           {site.label}
//                         </option>
//                       ))}
//                     </optgroup>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-end">
//                 <button
//                   onClick={resetFilters}
//                   className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all duration-200 font-medium"
//                 >
//                   Réinitialiser
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Liste des interventions */}
//       <div className="space-y-4">
//         {filteredInterventions.map(intervention => {
//           const tech = intervention.technicien;
//           const hasFiles = intervention.fichiers && intervention.fichiers.length > 0;
//           const statusConfig = getStatusConfig(intervention.statut);
//           const isExpanded = expandedIntervention === intervention._id;
          
//           return (
//             <div key={intervention._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
//               {/* En-tête de l'intervention */}
//               <div 
//                 className="p-6 cursor-pointer"
//                 onClick={() => toggleInterventionExpansion(intervention._id)}
//               >
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-start gap-3">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                           {intervention.titre}
//                         </h3>
//                         {intervention.description && (
//                           <p className="text-gray-600 line-clamp-2">
//                             {intervention.description}
//                           </p>
//                         )}
//                       </div>
//                       <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                         {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                       </button>
//                     </div>
                    
//                     <div className="flex flex-wrap gap-2 mt-3">
//                       <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(intervention.type)}`}>
//                         {intervention.type}
//                       </span>
//                       <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
//                         {statusConfig.icon}
//                         {statusConfig.text}
//                       </span>
//                       {hasFiles && (
//                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
//                           <FileText size={12} />
//                           {intervention.fichiers.length} fichier(s)
//                         </span>
//                       )}
//                       {/* Badge durée si terminée */}
//                       {intervention.dateDebutEffectif && intervention.dateFinEffective && (
//                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
//                           ⏱️ {formatDuree(intervention.dateDebutEffectif, intervention.dateFinEffective)}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     {/* Actions rapides */}
//                     <div className="flex gap-1">
//                       {currentUser.role !== 'admin' && intervention.statut !== 'terminee' && (
//                         <button
//                           onClick={(e) => { e.stopPropagation(); handleUpdateStatus(intervention); }}
//                           className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title={intervention.statut === 'planifiee' ? 'Démarrer l\'intervention' : 'Marquer comme terminée'}
//                         >
//                           <Check size={18} />
//                         </button>
//                       )}

//                       {hasFiles && (
//                         <button
//                           onClick={(e) => { e.stopPropagation(); handleShowFiles(intervention); }}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title="Voir les fichiers"
//                         >
//                           <FileText size={18} />
//                         </button>
//                       )}

//                       {currentUser.role === 'admin' && (
//                         <>
//                           <button
//                             onClick={(e) => { e.stopPropagation(); setEditItem(intervention); setShowModal(true); }}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                             title="Modifier"
//                           >
//                             <Edit2 size={18} />
//                           </button>
//                           <button
//                             onClick={(e) => { e.stopPropagation(); handleDelete(intervention._id); }}
//                             className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
//                             title="Supprimer"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </>
//                       )}

//                       {currentUser.role !== 'admin' && canModifyIntervention(intervention) && (
//                         <button
//                           onClick={(e) => { e.stopPropagation(); setEditItem(intervention); setShowModal(true); }}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title="Modifier"
//                         >
//                           <Edit2 size={18} />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Détails expansibles */}
//               {isExpanded && (
//                 <div className="border-t border-gray-200 p-6 bg-gray-50/50">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-white rounded-lg border border-gray-200">
//                         <MapPin size={18} className="text-gray-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Lieu</p>
//                         <p className="text-gray-900 font-semibold">{getLieuLabel(intervention.lieu)}</p>
//                         <p className="text-xs text-gray-500">{getBatiment(intervention.lieu)}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-white rounded-lg border border-gray-200">
//                         <User size={18} className="text-gray-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Technicien</p>
//                         <p className="text-gray-900 font-semibold">
//                           {tech ? `${tech.prenom} ${tech.nom}` : 'Non assigné'}
//                         </p>
//                         {tech && (
//                           <p className="text-xs text-gray-500 capitalize">{tech.role}</p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Timeline des dates */}
//                     <div className="col-span-2 space-y-3 bg-white p-4 rounded-xl border border-gray-200">
//                       <p className="text-sm font-semibold text-gray-700 mb-2">Chronologie:</p>
                      
//                       {/* Date planifiée */}
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                         <span className="text-sm text-gray-600">
//                           <strong>Planifié:</strong> {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')} à {intervention.heureDebut}
//                         </span>
//                       </div>
                      
//                       {/* Date début effectif */}
//                       {intervention.dateDebutEffectif && (
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                           <span className="text-sm text-gray-600">
//                             <strong>Débuté:</strong> {new Date(intervention.dateDebutEffectif).toLocaleDateString('fr-FR')} à {intervention.heureDebutEffectif}
//                           </span>
//                         </div>
//                       )}
                      
//                       {/* Date fin effective */}
//                       {intervention.dateFinEffective && (
//                         <>
//                           <div className="flex items-center gap-2">
//                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                             <span className="text-sm text-gray-600">
//                               <strong>Terminé:</strong> {new Date(intervention.dateFinEffective).toLocaleDateString('fr-FR')} à {intervention.heureFinEffective}
//                             </span>
//                           </div>
                          
//                           {/* Durée totale */}
//                           {intervention.dateDebutEffectif && (
//                             <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
//                               <span className="text-sm font-semibold text-purple-700">
//                                 ⏱️ Durée totale: {formatDuree(intervention.dateDebutEffectif, intervention.dateFinEffective)}
//                               </span>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-white rounded-lg border border-gray-200">
//                         <Clock size={18} className="text-gray-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Équipement</p>
//                         <p className="text-gray-900 font-semibold">{intervention.materiel}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Fichiers preview */}
//                   {hasFiles && (
//                     <div className="mt-4">
//                       <p className="text-sm font-medium text-gray-700 mb-2">Fichiers attachés</p>
//                       <div className="flex flex-wrap gap-2">
//                         {intervention.fichiers.slice(0, 3).map((fichier) => (
//                           <button
//                             key={fichier._id}
//                             onClick={() => handleShowFiles(intervention)}
//                             className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                           >
//                             {getFileIcon(fichier.type)}
//                             <span className="text-sm text-gray-700">{fichier.nom}</span>
//                           </button>
//                         ))}
//                         {intervention.fichiers.length > 3 && (
//                           <button
//                             onClick={() => handleShowFiles(intervention)}
//                             className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
//                           >
//                             +{intervention.fichiers.length - 3} autres
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* État vide */}
//       {filteredInterventions.length === 0 && (
//         <div className="text-center py-16">
//           <div className="max-w-md mx-auto">
//             <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
//               <FileText size={40} className="text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Aucune intervention trouvée
//             </h3>
//             <p className="text-gray-600 mb-6">
//               {hasActiveFilters 
//                 ? 'Aucune intervention ne correspond à vos critères de recherche.'
//                 : currentUser.role === 'admin' 
//                   ? 'Commencez par créer votre première intervention' 
//                   : 'Aucune intervention ne vous est assignée pour le moment'
//               }
//             </p>
//             {hasActiveFilters ? (
//               <button
//                 onClick={resetFilters}
//                 className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
//               >
//                 Réinitialiser les filtres
//               </button>
//             ) : currentUser.role === 'admin' && (
//               <button
//                 onClick={() => { setEditItem(null); setShowModal(true); }}
//                 className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 font-medium"
//               >
//                 Créer une intervention
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Modal Intervention */}
//       {showModal && (
//         <InterventionModal
//           intervention={editItem}
//           techniciens={techniciens}
//           onSave={handleSave}
//           onClose={() => { setShowModal(false); setEditItem(null); }}
//           loading={loading}
//           currentUser={currentUser}
//           sitesByBuilding={sitesByBuilding}
//         />
//       )}

//       {/* Modal Fichiers */}
//       {showFilesModal && selectedIntervention && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="text-xl font-bold text-white">
//                     Fichiers - {selectedIntervention.titre}
//                   </h3>
//                   <p className="text-blue-100 mt-1">
//                     {selectedIntervention.fichiers?.length || 0} fichier(s) attaché(s)
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowFilesModal(false)}
//                   className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
//                 >
//                   <X size={24} className="text-white" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
//               {/* Informations de l'intervention avec timeline */}
//               <div className="mb-6 p-4 bg-gray-50 rounded-xl space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Technicien</p>
//                     <p className="text-gray-900">
//                       {selectedIntervention.technicien?.prenom} {selectedIntervention.technicien?.nom}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Lieu</p>
//                     <p className="text-gray-900">
//                       {getLieuLabel(selectedIntervention.lieu)} ({getBatiment(selectedIntervention.lieu)})
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Statut</p>
//                     <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusConfig(selectedIntervention.statut).color}`}>
//                       {getStatusConfig(selectedIntervention.statut).text}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Timeline des dates dans le modal */}
//                 <div className="border-t pt-3">
//                   <p className="text-xs font-semibold text-gray-700 mb-2">Chronologie:</p>
//                   <div className="space-y-2">
//                     {/* Date planifiée */}
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                       <span className="text-xs text-gray-600">
//                         Planifié: {new Date(selectedIntervention.dateDebut).toLocaleDateString('fr-FR')} à {selectedIntervention.heureDebut}
//                       </span>
//                     </div>
                    
//                     {/* Date début effectif */}
//                     {selectedIntervention.dateDebutEffectif && (
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                         <span className="text-xs text-gray-600">
//                           Débuté: {new Date(selectedIntervention.dateDebutEffectif).toLocaleDateString('fr-FR')} à {selectedIntervention.heureDebutEffectif}
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Date fin effective */}
//                     {selectedIntervention.dateFinEffective && (
//                       <>
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                           <span className="text-xs text-gray-600">
//                             Terminé: {new Date(selectedIntervention.dateFinEffective).toLocaleDateString('fr-FR')} à {selectedIntervention.heureFinEffective}
//                           </span>
//                         </div>
                        
//                         {/* Durée */}
//                         {selectedIntervention.dateDebutEffectif && (
//                           <div className="flex items-center gap-2 mt-2 pt-2 border-t">
//                             <span className="text-xs font-semibold text-purple-700">
//                               ⏱️ Durée totale: {formatDuree(selectedIntervention.dateDebutEffectif, selectedIntervention.dateFinEffective)}
//                             </span>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {selectedIntervention.fichiers && selectedIntervention.fichiers.length > 0 ? (
//                 <div className="space-y-4">
//                   {selectedIntervention.fichiers.map((fichier) => (
//                     <div key={fichier._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
//                       <div className="flex items-center space-x-4 flex-1">
//                         <div className="p-3 bg-gray-100 rounded-lg">
//                           {getFileIcon(fichier.type)}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="font-semibold text-gray-900 truncate">{fichier.nom}</p>
//                           <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
//                             <span>{formatFileSize(fichier.taille)}</span>
//                             <span>•</span>
//                             <span className="capitalize">{fichier.type}</span>
//                             <span>•</span>
//                             <span>Uploadé le {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}</span>
//                             {fichier.uploadedBy && (
//                               <>
//                                 <span>•</span>
//                                 <span>par {fichier.uploadedBy.prenom} {fichier.uploadedBy.nom}</span>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                           className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title="Télécharger"
//                         >
//                           <Download size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <FileText size={64} className="mx-auto mb-4 text-gray-300" />
//                   <p className="text-gray-500 text-lg">Aucun fichier attaché à cette intervention</p>
//                 </div>
//               )}

//               <div className="flex justify-end pt-6 mt-6 border-t">
//                 <button
//                   onClick={() => setShowFilesModal(false)}
//                   className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors font-medium"
//                 >
//                   Fermer
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterventionsView;


// NOUVELLE VERSION CLAUDE POUR AJOUTER UNE LISTE DEROULANTE POUR LE CHAMP MATERIEL


// import React, { useState, useEffect } from 'react';
// import { 
//   Plus, 
//   Edit2, 
//   Trash2, 
//   Check, 
//   FileText, 
//   Image, 
//   Download, 
//   Filter,
//   Search,
//   Calendar,
//   MapPin,
//   User,
//   AlertCircle,
//   Clock,
//   Building,
//   X,
//   ChevronDown,
//   ChevronUp,
//   Wrench
// } from 'lucide-react';
// import InterventionModal from '../modals/InterventionModal';
// import { getEquipements } from '../../services/interventionService'; // ✅ Import ajouté

// // Fonction helper pour formater la durée
// const formatDuree = (dateDebut, dateFin) => {
//   if (!dateDebut || !dateFin) return null;
  
//   const dureeMs = new Date(dateFin) - new Date(dateDebut);
//   const heures = Math.floor(dureeMs / (1000 * 60 * 60));
//   const minutes = Math.floor((dureeMs % (1000 * 60 * 60)) / (1000 * 60));
  
//   if (heures > 0) {
//     return `${heures}h ${minutes}min`;
//   }
//   return `${minutes}min`;
// };

// const InterventionsView = ({ 
//   currentUser, 
//   interventions, 
//   users, 
//   onAdd, 
//   onUpdate, 
//   onDelete,
//   filterDate,
//   setFilterDate,
//   filterStatut,
//   setFilterStatut,
//   onReloadIntervention
// }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showFilesModal, setShowFilesModal] = useState(false);
//   const [selectedIntervention, setSelectedIntervention] = useState(null);
//   const [filterLieu, setFilterLieu] = useState('');
//   const [filterEquipement, setFilterEquipement] = useState(''); // ✅ Nouveau filtre
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [expandedIntervention, setExpandedIntervention] = useState(null);
  
//   // ✅ État pour stocker les équipements
//   const [equipements, setEquipements] = useState({
//     categories: { INFORMATIQUE: [], ELECTRIQUE: [] },
//     allEquipements: []
//   });

  // const sitesByBuilding = {
  //   'Bâtiment AD': [
  //     { value: 'Bureau_Accueil', label: 'Bureau Accueil' },
  //     { value: 'Bureau_Chauffeurs', label: 'Bureau Chauffeurs' },
  //     { value: 'Bureau_Comptabilite', label: 'Bureau Comptabilité' },
  //     { value: 'Bureau_DAF', label: 'Bureau DAF' },
  //     { value: 'Bureau_DEFR', label: 'Bureau DEFR' },
  //     { value: 'Bureau_DG', label: 'Bureau DG' },
  //     { value: 'Bureau_DRH', label: 'Bureau DRH' },
  //     { value: 'Bureau_DRI', label: 'Bureau DRI' },
  //     { value: 'Bureau_MDI', label: 'Bureau MDI' },
  //     { value: 'Bureau_Scolarite', label: 'Bureau Scolarité' },
  //     { value: 'Bureau_SG', label: 'Bureau SG' }
  //   ],
  //   'Bâtiment HA': [
  //     { value: 'Bibliothèque', label: 'Bibliothèque' },
  //     { value: 'Bureau_RDC', label: 'Bureau RDC' },
  //     { value: 'Bureau_Etage', label: 'Bureau Étage' },
  //     { value: 'Cyber', label: 'Cyber' },
  //     { value: 'HA1', label: 'HA1' },
  //     { value: 'HA4', label: 'HA4' },
  //     { value: 'HA5', label: 'HA5' },
  //     { value: 'HA6', label: 'HA6' },
  //     { value: 'HA7', label: 'HA7' },
  //     { value: 'HA8', label: 'HA8' }
  //   ],
  //   'Bâtiment HB': [
  //     { value: 'Bureau_Etage1', label: 'Bureau Étage 1' },
  //     { value: 'Bureau_Etage2', label: 'Bureau Étage 2' },
  //     { value: 'Bureau_Etage3', label: 'Bureau Étage 3' },
  //     { value: 'Bureau_Etage4', label: 'Bureau Étage 4' },
  //     { value: 'Bureau_RDC1', label: 'Bureau RDC1' },
  //     { value: 'Bureau_RDC2', label: 'Bureau RDC2' },
  //     { value: 'Centre_de_Certification', label: 'Centre de Certification' },
  //     { value: 'HB1', label: 'HB1' },
  //     { value: 'HB2', label: 'HB2' },
  //     { value: 'HB3', label: 'HB3' },
  //     { value: 'HB4', label: 'HB4' },
  //     { value: 'HB5', label: 'HB5' },
  //     { value: 'SES', label: 'SES' }
  //   ],
  //   'Bâtiment E': [
  //     { value: 'CRT', label: 'CRT' },
  //     { value: 'E11', label: 'E11' },
  //     { value: 'E26', label: 'E26' },
  //     { value: 'E27', label: 'E27' },
  //     { value: 'E22', label: 'E22' },
  //     { value: 'E23', label: 'E23' },
  //     { value: 'E24', label: 'E24' }
  //   ],
  //   'Foyer': [
  //     { value: 'Cuisine', label: 'Cuisine' }
  //   ]
  // };

//   // ✅ Charger les équipements au montage du composant
//   useEffect(() => {
//     const loadEquipements = async () => {
//       try {
//         const data = await getEquipements();
//         setEquipements(data);
//       } catch (error) {
//         console.error('Erreur lors du chargement des équipements:', error);
//       }
//     };

//     loadEquipements();
//   }, []);

//   const getLieuLabel = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return site.label;
//     }
//     return lieuValue;
//   };

//   const getBatiment = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return batiment;
//     }
//     return '';
//   };

//   // ✅ Fonction pour formater le nom de l'équipement
//   const formatEquipementName = (equipement) => {
//     return equipement.replace(/_/g, ' ');
//   };

//   const filteredInterventions = interventions.filter(i => {
//     if (currentUser.role !== 'admin' && i.technicien?._id !== currentUser._id) return false;
//     if (filterDate && i.dateDebut !== filterDate) return false;
//     if (filterStatut && i.statut !== filterStatut) return false;
//     if (filterLieu && i.lieu !== filterLieu) return false;
//     if (filterEquipement && i.materiel !== filterEquipement) return false; // ✅ Filtre équipement
//     if (searchTerm && !i.titre.toLowerCase().includes(searchTerm.toLowerCase()) && 
//         !i.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
//     return true;
//   });

//   const techniciens = users.filter(u => u.role !== 'admin');

//   const handleSave = async (data, interventionId = null) => {
//     setLoading(true);
//     let result;
    
//     if (editItem || interventionId) {
//       const id = interventionId || editItem._id;
//       result = await onUpdate(id, data);
      
//       if (result.success && onReloadIntervention) {
//         await onReloadIntervention(id);
//       }
//     } else {
//       result = await onAdd(data);
//     }

//     setLoading(false);

//     if (result.success) {
//       setShowModal(false);
//       setEditItem(null);
//     } else {
//       alert(result.message || 'Une erreur est survenue');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
//       const result = await onDelete(id);
//       if (!result.success) {
//         alert(result.message || 'Une erreur est survenue');
//       }
//     }
//   };

//   const handleUpdateStatus = async (intervention) => {
//     const newStatus = intervention.statut === 'planifiee' ? 'en_cours' : 'terminee';
//     console.log('🔄 Changement de statut:', intervention.statut, '→', newStatus);
    
//     // ✅ Si le technicien termine l'intervention (en_cours → terminee), ouvrir le modal
//     if (currentUser.role !== 'admin' && 
//         intervention.statut === 'en_cours' && 
//         newStatus === 'terminee') {
//       // Créer une copie de l'intervention avec le nouveau statut déjà appliqué
//       const interventionWithNewStatus = { 
//         ...intervention, 
//         statut: 'terminee',
//         _pendingStatusChange: true // Flag pour indiquer que c'est une finalisation
//       };
//       setEditItem(interventionWithNewStatus);
//       setShowModal(true);
//       return;
//     }
    
//     // Sinon, mise à jour directe du statut
//     const result = await onUpdate(intervention._id, { statut: newStatus });
    
//     console.log('📦 Résultat de la mise à jour:', result);
    
//     if (!result.success) {
//       alert(result.message || 'Une erreur est survenue');
//     } else {
//       console.log('✅ Intervention mise à jour:', result.data);
//       console.log('📅 Dates effectives:', {
//         dateDebutEffectif: result.data?.dateDebutEffectif,
//         dateFinEffective: result.data?.dateFinEffective
//       });
//     }
//   };

//   const handleShowFiles = (intervention) => {
//     setSelectedIntervention(intervention);
//     setShowFilesModal(true);
//   };

//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case 'image': 
//         return <Image size={18} className="text-blue-500" />;
//       case 'document': 
//         return <FileText size={18} className="text-emerald-500" />;
//       default: 
//         return <FileText size={18} className="text-gray-500" />;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getStatusConfig = (statut) => {
//     switch (statut) {
//       case 'terminee': 
//         return { 
//           color: 'bg-green-100 text-green-800 border-green-200',
//           icon: <Check size={14} className="text-green-600" />,
//           text: 'Terminée'
//         };
//       case 'en_cours': 
//         return { 
//           color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//           icon: <Clock size={14} className="text-yellow-600" />,
//           text: 'En cours'
//         };
//       case 'planifiee': 
//         return { 
//           color: 'bg-blue-100 text-blue-800 border-blue-200',
//           icon: <Calendar size={14} className="text-blue-600" />,
//           text: 'Planifiée'
//         };
//       default: 
//         return { 
//           color: 'bg-gray-100 text-gray-800 border-gray-200',
//           icon: <AlertCircle size={14} className="text-gray-600" />,
//           text: statut
//         };
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'reparation': return 'bg-purple-100 text-purple-800 border-purple-200';
//       case 'diagnostic': return 'bg-orange-100 text-orange-800 border-orange-200';
//       case 'verification': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
//       case 'maintenance': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
//       case 'installation': return 'bg-pink-100 text-pink-800 border-pink-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const canModifyIntervention = (intervention) => {
//     return currentUser.role === 'admin' || intervention.technicien?._id === currentUser._id;
//   };

//   const toggleInterventionExpansion = (interventionId) => {
//     setExpandedIntervention(expandedIntervention === interventionId ? null : interventionId);
//   };

//   const resetFilters = () => {
//     setFilterDate('');
//     setFilterStatut('');
//     setFilterLieu('');
//     setFilterEquipement('');
//     setSearchTerm('');
//   };

//   const hasActiveFilters = filterDate || filterStatut || filterLieu || filterEquipement || searchTerm;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
//       {/* Header avec statistiques */}
//       <div className="mb-8">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Gestion des Interventions
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Gérez et suivez toutes les interventions techniques
//             </p>
//           </div>
          
//           {currentUser.role === 'admin' && (
//             <button
//               onClick={() => { setEditItem(null); setShowModal(true); }}
//               className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold group"
//             >
//               <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
//               Nouvelle intervention
//             </button>
//           )}
//         </div>

//         {/* Cartes de statistiques */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total</p>
//                 <p className="text-2xl font-bold text-gray-900">{interventions.length}</p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <FileText size={20} className="text-blue-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Planifiées</p>
//                 <p className="text-2xl font-bold text-blue-600">
//                   {interventions.filter(i => i.statut === 'planifiee').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <Calendar size={20} className="text-blue-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">En cours</p>
//                 <p className="text-2xl font-bold text-yellow-600">
//                   {interventions.filter(i => i.statut === 'en_cours').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-yellow-100 rounded-xl">
//                 <Clock size={20} className="text-yellow-600" />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Terminées</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {interventions.filter(i => i.statut === 'terminee').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-green-100 rounded-xl">
//                 <Check size={20} className="text-green-600" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Barre de recherche et filtres */}
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           {/* Barre de recherche */}
//           <div className="flex-1 relative">
//             <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Rechercher une intervention..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//             />
//           </div>

//           {/* Bouton filtres */}
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-200 font-medium"
//           >
//             <Filter size={18} />
//             Filtres
//             {hasActiveFilters && (
//               <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//             )}
//           </button>
//         </div>

//         {/* Panneau des filtres */}
//         {showFilters && (
//           <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                   <Calendar size={16} />
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   value={filterDate}
//                   onChange={(e) => setFilterDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
              
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                   <AlertCircle size={16} />
//                   Statut
//                 </label>
//                 <select
//                   value={filterStatut}
//                   onChange={(e) => setFilterStatut(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Tous les statuts</option>
//                   <option value="planifiee">Planifiée</option>
//                   <option value="en_cours">En cours</option>
//                   <option value="terminee">Terminée</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                   <Building size={16} />
//                   Lieu
//                 </label>
//                 <select
//                   value={filterLieu}
//                   onChange={(e) => setFilterLieu(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Tous les lieux</option>
//                   {Object.entries(sitesByBuilding).map(([batiment, sites]) => (
//                     <optgroup key={batiment} label={batiment}>
//                       {sites.map((site) => (
//                         <option key={site.value} value={site.value}>
//                           {site.label}
//                         </option>
//                       ))}
//                     </optgroup>
//                   ))}
//                 </select>
//               </div>

//               {/* ✅ NOUVEAU FILTRE : ÉQUIPEMENT */}
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                   <Wrench size={16} />
//                   Équipement
//                 </label>
//                 <select
//                   value={filterEquipement}
//                   onChange={(e) => setFilterEquipement(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Tous les équipements</option>
//                   <optgroup label="Informatique">
//                     {equipements.categories.INFORMATIQUE.map((equipement) => (
//                       <option key={equipement} value={equipement}>
//                         {formatEquipementName(equipement)}
//                       </option>
//                     ))}
//                   </optgroup>
//                   <optgroup label="Électrique">
//                     {equipements.categories.ELECTRIQUE.map((equipement) => (
//                       <option key={equipement} value={equipement}>
//                         {formatEquipementName(equipement)}
//                       </option>
//                     ))}
//                   </optgroup>
//                 </select>
//               </div>

//               <div className="flex items-end">
//                 <button
//                   onClick={resetFilters}
//                   className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all duration-200 font-medium"
//                 >
//                   Réinitialiser
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Liste des interventions */}
//       <div className="space-y-4">
//         {filteredInterventions.map(intervention => {
//           const tech = intervention.technicien;
//           const hasFiles = intervention.fichiers && intervention.fichiers.length > 0;
//           const statusConfig = getStatusConfig(intervention.statut);
//           const isExpanded = expandedIntervention === intervention._id;
          
//           return (
//             <div key={intervention._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
//               {/* En-tête de l'intervention */}
//               <div 
//                 className="p-6 cursor-pointer"
//                 onClick={() => toggleInterventionExpansion(intervention._id)}
//               >
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-start gap-3">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                           {intervention.titre}
//                         </h3>
//                         {intervention.description && (
//                           <p className="text-gray-600 line-clamp-2">
//                             {intervention.description}
//                           </p>
//                         )}
//                       </div>
//                       <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                         {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                       </button>
//                     </div>
                    
//                     <div className="flex flex-wrap gap-2 mt-3">
//                       <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(intervention.type)}`}>
//                         {intervention.type}
//                       </span>
//                       <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
//                         {statusConfig.icon}
//                         {statusConfig.text}
//                       </span>
//                       <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
//                         <Wrench size={12} />
//                         {formatEquipementName(intervention.materiel)}
//                       </span>
//                       {hasFiles && (
//                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
//                           <FileText size={12} />
//                           {intervention.fichiers.length} fichier(s)
//                         </span>
//                       )}
//                       {/* Badge durée si terminée */}
//                       {intervention.dateDebutEffectif && intervention.dateFinEffective && (
//                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
//                           ⏱️ {formatDuree(intervention.dateDebutEffectif, intervention.dateFinEffective)}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     {/* Actions rapides */}
//                     <div className="flex gap-1">
//                       {currentUser.role !== 'admin' && intervention.statut !== 'terminee' && (
//                         <button
//                           onClick={(e) => { e.stopPropagation(); handleUpdateStatus(intervention); }}
//                           className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title={intervention.statut === 'planifiee' ? 'Démarrer l\'intervention' : 'Marquer comme terminée'}
//                         >
//                           <Check size={18} />
//                         </button>
//                       )}

//                       {hasFiles && (
//                         <button
//                           onClick={(e) => { e.stopPropagation(); handleShowFiles(intervention); }}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title="Voir les fichiers"
//                         >
//                           <FileText size={18} />
//                         </button>
//                       )}

//                       {currentUser.role === 'admin' && (
//                         <>
//                           <button
//                             onClick={(e) => { e.stopPropagation(); setEditItem(intervention); setShowModal(true); }}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                             title="Modifier"
//                           >
//                             <Edit2 size={18} />
//                           </button>
//                           <button
//                             onClick={(e) => { e.stopPropagation(); handleDelete(intervention._id); }}
//                             className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
//                             title="Supprimer"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </>
//                       )}

//                       {currentUser.role !== 'admin' && canModifyIntervention(intervention) && (
//                         <button
//                           onClick={(e) => { e.stopPropagation(); setEditItem(intervention); setShowModal(true); }}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title="Modifier"
//                         >
//                           <Edit2 size={18} />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Détails expansibles */}
//               {isExpanded && (
//                 <div className="border-t border-gray-200 p-6 bg-gray-50/50">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-white rounded-lg border border-gray-200">
//                         <MapPin size={18} className="text-gray-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Lieu</p>
//                         <p className="text-gray-900 font-semibold">{getLieuLabel(intervention.lieu)}</p>
//                         <p className="text-xs text-gray-500">{getBatiment(intervention.lieu)}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-white rounded-lg border border-gray-200">
//                         <User size={18} className="text-gray-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Technicien</p>
//                         <p className="text-gray-900 font-semibold">
//                           {tech ? `${tech.prenom} ${tech.nom}` : 'Non assigné'}
//                         </p>
//                         {tech && (
//                           <p className="text-xs text-gray-500 capitalize">{tech.role}</p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-white rounded-lg border border-gray-200">
//                         <Wrench size={18} className="text-gray-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Équipement</p>
//                         <p className="text-gray-900 font-semibold">{formatEquipementName(intervention.materiel)}</p>
//                       </div>
//                     </div>

//                     {/* Timeline des dates */}
//                     <div className="col-span-2 space-y-3 bg-white p-4 rounded-xl border border-gray-200">
//                       <p className="text-sm font-semibold text-gray-700 mb-2">Chronologie:</p>
                      
//                       {/* Date planifiée */}
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                         <span className="text-sm text-gray-600">
//                           <strong>Planifié:</strong> {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')} à {intervention.heureDebut}
//                         </span>
//                       </div>
                      
//                       {/* Date début effectif */}
//                       {intervention.dateDebutEffectif && (
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                           <span className="text-sm text-gray-600">
//                             <strong>Débuté:</strong> {new Date(intervention.dateDebutEffectif).toLocaleDateString('fr-FR')} à {intervention.heureDebutEffectif}
//                           </span>
//                         </div>
//                       )}
                      
//                       {/* Date fin effective */}
//                       {intervention.dateFinEffective && (
//                         <>
//                           <div className="flex items-center gap-2">
//                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                             <span className="text-sm text-gray-600">
//                               <strong>Terminé:</strong> {new Date(intervention.dateFinEffective).toLocaleDateString('fr-FR')} à {intervention.heureFinEffective}
//                             </span>
//                           </div>
                          
//                           {/* Durée totale */}
//                           {intervention.dateDebutEffectif && (
//                             <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
//                               <span className="text-sm font-semibold text-purple-700">
//                                 ⏱️ Durée totale: {formatDuree(intervention.dateDebutEffectif, intervention.dateFinEffective)}
//                               </span>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   </div>

//                   {/* Fichiers preview */}
//                   {hasFiles && (
//                     <div className="mt-4">
//                       <p className="text-sm font-medium text-gray-700 mb-2">Fichiers attachés</p>
//                       <div className="flex flex-wrap gap-2">
//                         {intervention.fichiers.slice(0, 3).map((fichier) => (
//                           <button
//                             key={fichier._id}
//                             onClick={() => handleShowFiles(intervention)}
//                             className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                           >
//                             {getFileIcon(fichier.type)}
//                             <span className="text-sm text-gray-700">{fichier.nom}</span>
//                           </button>
//                         ))}
//                         {intervention.fichiers.length > 3 && (
//                           <button
//                             onClick={() => handleShowFiles(intervention)}
//                             className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
//                           >
//                             +{intervention.fichiers.length - 3} autres
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* État vide */}
//       {filteredInterventions.length === 0 && (
//         <div className="text-center py-16">
//           <div className="max-w-md mx-auto">
//             <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
//               <FileText size={40} className="text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Aucune intervention trouvée
//             </h3>
//             <p className="text-gray-600 mb-6">
//               {hasActiveFilters 
//                 ? 'Aucune intervention ne correspond à vos critères de recherche.'
//                 : currentUser.role === 'admin' 
//                   ? 'Commencez par créer votre première intervention' 
//                   : 'Aucune intervention ne vous est assignée pour le moment'
//               }
//             </p>
//             {hasActiveFilters ? (
//               <button
//                 onClick={resetFilters}
//                 className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
//               >
//                 Réinitialiser les filtres
//               </button>
//             ) : currentUser.role === 'admin' && (
//               <button
//                 onClick={() => { setEditItem(null); setShowModal(true); }}
//                 className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 font-medium"
//               >
//                 Créer une intervention
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Modal Intervention */}
//       {showModal && (
//         <InterventionModal
//           intervention={editItem}
//           techniciens={techniciens}
//           onSave={handleSave}
//           onClose={() => { setShowModal(false); setEditItem(null); }}
//           loading={loading}
//           currentUser={currentUser}
//           sitesByBuilding={sitesByBuilding}
//         />
//       )}

//       {/* Modal Fichiers */}
//       {showFilesModal && selectedIntervention && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="text-xl font-bold text-white">
//                     Fichiers - {selectedIntervention.titre}
//                   </h3>
//                   <p className="text-blue-100 mt-1">
//                     {selectedIntervention.fichiers?.length || 0} fichier(s) attaché(s)
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowFilesModal(false)}
//                   className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
//                 >
//                   <X size={24} className="text-white" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
//               {/* Informations de l'intervention avec timeline */}
//               <div className="mb-6 p-4 bg-gray-50 rounded-xl space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Technicien</p>
//                     <p className="text-gray-900">
//                       {selectedIntervention.technicien?.prenom} {selectedIntervention.technicien?.nom}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Lieu</p>
//                     <p className="text-gray-900">
//                       {getLieuLabel(selectedIntervention.lieu)} ({getBatiment(selectedIntervention.lieu)})
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-700">Équipement</p>
//                     <p className="text-gray-900 font-semibold">
//                       {formatEquipementName(selectedIntervention.materiel)}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Timeline des dates dans le modal */}
//                 <div className="border-t pt-3">
//                   <p className="text-xs font-semibold text-gray-700 mb-2">Chronologie:</p>
//                   <div className="space-y-2">
//                     {/* Date planifiée */}
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                       <span className="text-xs text-gray-600">
//                         Planifié: {new Date(selectedIntervention.dateDebut).toLocaleDateString('fr-FR')} à {selectedIntervention.heureDebut}
//                       </span>
//                     </div>
                    
//                     {/* Date début effectif */}
//                     {selectedIntervention.dateDebutEffectif && (
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                         <span className="text-xs text-gray-600">
//                           Débuté: {new Date(selectedIntervention.dateDebutEffectif).toLocaleDateString('fr-FR')} à {selectedIntervention.heureDebutEffectif}
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Date fin effective */}
//                     {selectedIntervention.dateFinEffective && (
//                       <>
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                           <span className="text-xs text-gray-600">
//                             Terminé: {new Date(selectedIntervention.dateFinEffective).toLocaleDateString('fr-FR')} à {selectedIntervention.heureFinEffective}
//                           </span>
//                         </div>
                        
//                         {/* Durée */}
//                         {selectedIntervention.dateDebutEffectif && (
//                           <div className="flex items-center gap-2 mt-2 pt-2 border-t">
//                             <span className="text-xs font-semibold text-purple-700">
//                               ⏱️ Durée totale: {formatDuree(selectedIntervention.dateDebutEffectif, selectedIntervention.dateFinEffective)}
//                             </span>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {selectedIntervention.fichiers && selectedIntervention.fichiers.length > 0 ? (
//                 <div className="space-y-4">
//                   {selectedIntervention.fichiers.map((fichier) => (
//                     <div key={fichier._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
//                       <div className="flex items-center space-x-4 flex-1">
//                         <div className="p-3 bg-gray-100 rounded-lg">
//                           {getFileIcon(fichier.type)}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="font-semibold text-gray-900 truncate">{fichier.nom}</p>
//                           <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
//                             <span>{formatFileSize(fichier.taille)}</span>
//                             <span>•</span>
//                             <span className="capitalize">{fichier.type}</span>
//                             <span>•</span>
//                             <span>Uploadé le {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}</span>
//                             {fichier.uploadedBy && (
//                               <>
//                                 <span>•</span>
//                                 <span>par {fichier.uploadedBy.prenom} {fichier.uploadedBy.nom}</span>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                           className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
//                           title="Télécharger"
//                         >
//                           <Download size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <FileText size={64} className="mx-auto mb-4 text-gray-300" />
//                   <p className="text-gray-500 text-lg">Aucun fichier attaché à cette intervention</p>
//                 </div>
//               )}

//               <div className="flex justify-end pt-6 mt-6 border-t">
//                 <button
//                   onClick={() => setShowFilesModal(false)}
//                   className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors font-medium"
//                 >
//                   Fermer
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterventionsView;


// NOUVELLE VERSION CLAUDE AVEC AJOUT DE VALIDATION DES INTERVENTIONS PAR ADMIN



import React, { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  FileText, 
  Image, 
  Download, 
  Filter,
  Search,
  Calendar,
  MapPin,
  User,
  AlertCircle,
  Clock,
  Building,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle
} from 'lucide-react';
import InterventionModal from '../modals/InterventionModal';
import { validerIntervention } from '../../services/interventionService';

// Fonction helper pour formater la durée
const formatDuree = (dateDebut, dateFin) => {
  if (!dateDebut || !dateFin) return null;
  
  const dureeMs = new Date(dateFin) - new Date(dateDebut);
  const heures = Math.floor(dureeMs / (1000 * 60 * 60));
  const minutes = Math.floor((dureeMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (heures > 0) {
    return `${heures}h ${minutes}min`;
  }
  return `${minutes}min`;
};

const InterventionsView = ({ 
  currentUser, 
  interventions, 
  users, 
  onAdd, 
  onUpdate, 
  onDelete,
  filterDate,
  setFilterDate,
  filterStatut,
  setFilterStatut,
  onReloadIntervention
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilesModal, setShowFilesModal] = useState(false);
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [filterLieu, setFilterLieu] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedIntervention, setExpandedIntervention] = useState(null);

  const sitesByBuilding = {
    'Bâtiment AD': [
      { value: 'Bureau_Accueil', label: 'Bureau Accueil' },
      { value: 'Bureau_Chauffeurs', label: 'Bureau Chauffeurs' },
      { value: 'Bureau_Comptabilite', label: 'Bureau Comptabilité' },
      { value: 'Bureau_DAF', label: 'Bureau DAF' },
      { value: 'Bureau_DEFR', label: 'Bureau DEFR' },
      { value: 'Bureau_DG', label: 'Bureau DG' },
      { value: 'Bureau_DRH', label: 'Bureau DRH' },
      { value: 'Bureau_DRI', label: 'Bureau DRI' },
      { value: 'Bureau_MDI', label: 'Bureau MDI' },
      { value: 'Bureau_Scolarite', label: 'Bureau Scolarité' },
      { value: 'Bureau_SG', label: 'Bureau SG' }
    ],
    'Bâtiment HA': [
      { value: 'Bibliothèque', label: 'Bibliothèque' },
      { value: 'Bureau_RDC', label: 'Bureau RDC' },
      { value: 'Bureau_Etage', label: 'Bureau Étage' },
      { value: 'Cyber', label: 'Cyber' },
      { value: 'HA1', label: 'HA1' },
      { value: 'HA4', label: 'HA4' },
      { value: 'HA5', label: 'HA5' },
      { value: 'HA6', label: 'HA6' },
      { value: 'HA7', label: 'HA7' },
      { value: 'HA8', label: 'HA8' }
    ],
    'Bâtiment HB': [
      { value: 'Bureau_Etage1', label: 'Bureau Étage 1' },
      { value: 'Bureau_Etage2', label: 'Bureau Étage 2' },
      { value: 'Bureau_Etage3', label: 'Bureau Étage 3' },
      { value: 'Bureau_Etage4', label: 'Bureau Étage 4' },
      { value: 'Bureau_RDC1', label: 'Bureau RDC1' },
      { value: 'Bureau_RDC2', label: 'Bureau RDC2' },
      { value: 'Centre_de_Certification', label: 'Centre de Certification' },
      { value: 'HB1', label: 'HB1' },
      { value: 'HB2', label: 'HB2' },
      { value: 'HB3', label: 'HB3' },
      { value: 'HB4', label: 'HB4' },
      { value: 'HB5', label: 'HB5' },
      { value: 'SES', label: 'SES' }
    ],
    'Bâtiment E': [
      { value: 'CRT', label: 'CRT' },
      { value: 'E11', label: 'E11' },
      { value: 'E26', label: 'E26' },
      { value: 'E27', label: 'E27' },
      { value: 'E22', label: 'E22' },
      { value: 'E23', label: 'E23' },
      { value: 'E24', label: 'E24' }
    ],
    'Foyer': [
      { value: 'Cuisine', label: 'Cuisine' }
    ]
  };
  
  const getLieuLabel = (lieuValue) => {
    for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
      const site = sites.find(s => s.value === lieuValue);
      if (site) return site.label;
    }
    return lieuValue;
  };

  const getBatiment = (lieuValue) => {
    for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
      const site = sites.find(s => s.value === lieuValue);
      if (site) return batiment;
    }
    return '';
  };

  const filteredInterventions = interventions.filter(i => {
    if (currentUser.role !== 'admin' && i.technicien?._id !== currentUser._id) return false;
    if (filterDate && i.dateDebut !== filterDate) return false;
    if (filterStatut && i.statut !== filterStatut) return false;
    if (filterLieu && i.lieu !== filterLieu) return false;
    if (searchTerm && !i.titre.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !i.description?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const techniciens = users.filter(u => u.role !== 'admin');

  const handleSave = async (data, interventionId = null) => {
    setLoading(true);
    let result;
    
    if (editItem || interventionId) {
      const id = interventionId || editItem._id;
      result = await onUpdate(id, data);
      
      if (result.success && onReloadIntervention) {
        await onReloadIntervention(id);
      }
    } else {
      result = await onAdd(data);
    }

    setLoading(false);

    if (result.success) {
      setShowModal(false);
      setEditItem(null);
    } else {
      alert(result.message || 'Une erreur est survenue');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) {
      const result = await onDelete(id);
      if (!result.success) {
        alert(result.message || 'Une erreur est survenue');
      }
    }
  };

  // ✅ CORRECTION : Fonction handleUpdateStatus pour technicien uniquement
  const handleTechnicianUpdateStatus = async (intervention) => {
    // Technicien : planifiée → en_cours → en_attente_validation
    const newStatus = intervention.statut === 'planifiee' ? 'en_cours' : 
                    intervention.statut === 'en_cours' ? 'en_attente_validation' : 'planifiee';
    
    // Si le technicien termine l'intervention, ouvrir le modal pour upload des fichiers
    if (intervention.statut === 'en_cours' && newStatus === 'en_attente_validation') {
      const interventionWithNewStatus = { 
        ...intervention, 
        statut: 'en_attente_validation'
      };
      setEditItem(interventionWithNewStatus);
      setShowModal(true);
      return;
    }
    
    // Mise à jour directe pour les autres cas
    const result = await onUpdate(intervention._id, { statut: newStatus });
    
    if (!result.success) {
      alert(result.message || 'Une erreur est survenue');
    }
  };

  // ✅ CORRECTION : Fonction handleAdminValidation pour admin uniquement
  const handleAdminValidation = async (intervention) => {
    try {
      setLoading(true);
      await validerIntervention(intervention._id);
      if (onReloadIntervention) {
        await onReloadIntervention(intervention._id);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Erreur lors de la validation');
    } finally {
      setLoading(false);
    }
  };

  const handleShowFiles = (intervention) => {
    setSelectedIntervention(intervention);
    setShowFilesModal(true);
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image': 
        return <Image size={18} className="text-blue-500" />;
      case 'document': 
        return <FileText size={18} className="text-emerald-500" />;
      default: 
        return <FileText size={18} className="text-gray-500" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusConfig = (statut) => {
    switch (statut) {
      case 'terminee': 
        return { 
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <Check size={14} className="text-green-600" />,
          text: 'Terminée'
        };
      case 'en_attente_validation': 
        return { 
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: <AlertCircle size={14} className="text-orange-600" />,
          text: 'En attente de validation'
        };
      case 'en_cours': 
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <Clock size={14} className="text-yellow-600" />,
          text: 'En cours'
        };
      case 'planifiee': 
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <Calendar size={14} className="text-blue-600" />,
          text: 'Planifiée'
        };
      default: 
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertCircle size={14} className="text-gray-600" />,
          text: statut
        };
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'reparation': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'diagnostic': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'verification': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'maintenance': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'installation': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const canModifyIntervention = (intervention) => {
    return currentUser.role === 'admin' || intervention.technicien?._id === currentUser._id;
  };

  const toggleInterventionExpansion = (interventionId) => {
    setExpandedIntervention(expandedIntervention === interventionId ? null : interventionId);
  };

  const resetFilters = () => {
    setFilterDate('');
    setFilterStatut('');
    setFilterLieu('');
    setSearchTerm('');
  };

  const hasActiveFilters = filterDate || filterStatut || filterLieu || searchTerm;

  // ✅ CORRECTION : Fonction pour obtenir le texte du bouton de statut
  const getStatusButtonText = (intervention) => {
    if (currentUser.role !== 'admin') {
      return intervention.statut === 'planifiee' ? 'Démarrer' : 
             intervention.statut === 'en_cours' ? 'Terminer' : 'Replanifier';
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      {/* Header avec statistiques */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gestion des Interventions
            </h1>
            <p className="text-gray-600 mt-2">
              Gérez et suivez toutes les interventions techniques
            </p>
          </div>
          
          {currentUser.role === 'admin' && (
            <button
              onClick={() => { setEditItem(null); setShowModal(true); }}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold group"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              Nouvelle intervention
            </button>
          )}
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{interventions.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FileText size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Planifiées</p>
                <p className="text-2xl font-bold text-blue-600">
                  {interventions.filter(i => i.statut === 'planifiee').length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Calendar size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {interventions.filter(i => i.statut === 'en_cours').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Clock size={20} className="text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-orange-600">
                  {interventions.filter(i => i.statut === 'en_attente_validation').length}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <AlertCircle size={20} className="text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Barre de recherche */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une intervention..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* Bouton filtres */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-200 font-medium"
          >
            <Filter size={18} />
            Filtres
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Panneau des filtres */}
        {showFilters && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={16} />
                  Date
                </label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <AlertCircle size={16} />
                  Statut
                </label>
                <select
                  value={filterStatut}
                  onChange={(e) => setFilterStatut(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tous les statuts</option>
                  <option value="planifiee">Planifiée</option>
                  <option value="en_cours">En cours</option>
                  <option value="en_attente_validation">En attente de validation</option>
                  <option value="terminee">Terminée</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Building size={16} />
                  Lieu
                </label>
                <select
                  value={filterLieu}
                  onChange={(e) => setFilterLieu(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tous les lieux</option>
                  {Object.entries(sitesByBuilding).map(([batiment, sites]) => (
                    <optgroup key={batiment} label={batiment}>
                      {sites.map((site) => (
                        <option key={site.value} value={site.value}>
                          {site.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all duration-200 font-medium"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Liste des interventions */}
      <div className="space-y-4">
        {filteredInterventions.map(intervention => {
          const tech = intervention.technicien;
          const hasFiles = intervention.fichiers && intervention.fichiers.length > 0;
          const statusConfig = getStatusConfig(intervention.statut);
          const isExpanded = expandedIntervention === intervention._id;
          const isTechnician = currentUser.role !== 'admin';
          const isAssignedTechnician = intervention.technicien?._id === currentUser._id;
          
          return (
            <div key={intervention._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* En-tête de l'intervention */}
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleInterventionExpansion(intervention._id)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {intervention.titre}
                        </h3>
                        {intervention.description && (
                          <p className="text-gray-600 line-clamp-2">
                            {intervention.description}
                          </p>
                        )}
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(intervention.type)}`}>
                        {intervention.type}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                        {statusConfig.icon}
                        {statusConfig.text}
                      </span>
                      {hasFiles && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          <FileText size={12} />
                          {intervention.fichiers.length} fichier(s)
                        </span>
                      )}
                      {/* Badge durée si terminée */}
                      {intervention.dateDebutEffectif && intervention.dateFinEffective && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                          ⏱️ {formatDuree(intervention.dateDebutEffectif, intervention.dateFinEffective)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Actions rapides */}
                    <div className="flex gap-1">
                      {/* ✅ CORRECTION : Bouton de changement de statut UNIQUEMENT pour le technicien assigné */}
                      {isTechnician && isAssignedTechnician && intervention.statut !== 'terminee' && intervention.statut !== 'en_attente_validation' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleTechnicianUpdateStatus(intervention); }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
                          title={getStatusButtonText(intervention)}
                        >
                          <Check size={18} />
                        </button>
                      )}

                      {/* ✅ CORRECTION : Bouton de validation UNIQUEMENT pour l'admin sur les interventions en attente */}
                      {currentUser.role === 'admin' && intervention.statut === 'en_attente_validation' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAdminValidation(intervention); }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 hover:scale-110"
                          title="Valider l'intervention"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}

                      {hasFiles && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleShowFiles(intervention); }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
                          title="Voir les fichiers"
                        >
                          <FileText size={18} />
                        </button>
                      )}

                      {currentUser.role === 'admin' && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); setEditItem(intervention); setShowModal(true); }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
                            title="Modifier"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(intervention._id); }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
                            title="Supprimer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}

                      {isTechnician && isAssignedTechnician && intervention.statut !== 'en_attente_validation' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setEditItem(intervention); setShowModal(true); }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
                          title="Modifier"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Détails expansibles */}
              {isExpanded && (
                <div className="border-t border-gray-200 p-6 bg-gray-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border border-gray-200">
                        <MapPin size={18} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Lieu</p>
                        <p className="text-gray-900 font-semibold">{getLieuLabel(intervention.lieu)}</p>
                        <p className="text-xs text-gray-500">{getBatiment(intervention.lieu)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border border-gray-200">
                        <User size={18} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Technicien</p>
                        <p className="text-gray-900 font-semibold">
                          {tech ? `${tech.prenom} ${tech.nom}` : 'Non assigné'}
                        </p>
                        {tech && (
                          <p className="text-xs text-gray-500 capitalize">{tech.role}</p>
                        )}
                      </div>
                    </div>

                    {/* Timeline des dates */}
                    <div className="col-span-2 space-y-3 bg-white p-4 rounded-xl border border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Chronologie:</p>
                      
                      {/* Date planifiée */}
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          <strong>Planifié:</strong> {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')} à {intervention.heureDebut}
                        </span>
                      </div>
                      
                      {/* Date début effectif */}
                      {intervention.dateDebutEffectif && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">
                            <strong>Débuté:</strong> {new Date(intervention.dateDebutEffectif).toLocaleDateString('fr-FR')} à {intervention.heureDebutEffectif}
                          </span>
                        </div>
                      )}
                      
                      {/* Date fin effective */}
                      {intervention.dateFinEffective && (
                        <>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">
                              <strong>Terminé:</strong> {new Date(intervention.dateFinEffective).toLocaleDateString('fr-FR')} à {intervention.heureFinEffective}
                            </span>
                          </div>
                          
                          {/* Durée totale */}
                          {intervention.dateDebutEffectif && (
                            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                              <span className="text-sm font-semibold text-purple-700">
                                ⏱️ Durée totale: {formatDuree(intervention.dateDebutEffectif, intervention.dateFinEffective)}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border border-gray-200">
                        <Clock size={18} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Équipement</p>
                        <p className="text-gray-900 font-semibold">{intervention.materiel}</p>
                      </div>
                    </div>
                  </div>

                  {/* Fichiers preview */}
                  {hasFiles && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Fichiers attachés</p>
                      <div className="flex flex-wrap gap-2">
                        {intervention.fichiers.slice(0, 3).map((fichier) => (
                          <button
                            key={fichier._id}
                            onClick={() => handleShowFiles(intervention)}
                            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            {getFileIcon(fichier.type)}
                            <span className="text-sm text-gray-700">{fichier.nom}</span>
                          </button>
                        ))}
                        {intervention.fichiers.length > 3 && (
                          <button
                            onClick={() => handleShowFiles(intervention)}
                            className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                          >
                            +{intervention.fichiers.length - 3} autres
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* État vide */}
      {filteredInterventions.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
              <FileText size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune intervention trouvée
            </h3>
            <p className="text-gray-600 mb-6">
              {hasActiveFilters 
                ? 'Aucune intervention ne correspond à vos critères de recherche.'
                : currentUser.role === 'admin' 
                  ? 'Commencez par créer votre première intervention' 
                  : 'Aucune intervention ne vous est assignée pour le moment'
              }
            </p>
            {hasActiveFilters ? (
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
              >
                Réinitialiser les filtres
              </button>
            ) : currentUser.role === 'admin' && (
              <button
                onClick={() => { setEditItem(null); setShowModal(true); }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Créer une intervention
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal Intervention */}
      {showModal && (
        <InterventionModal
          intervention={editItem}
          techniciens={techniciens}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditItem(null); }}
          loading={loading}
          currentUser={currentUser}
          sitesByBuilding={sitesByBuilding}
        />
      )}

      {/* Modal Fichiers */}
      {showFilesModal && selectedIntervention && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Fichiers - {selectedIntervention.titre}
                  </h3>
                  <p className="text-blue-100 mt-1">
                    {selectedIntervention.fichiers?.length || 0} fichier(s) attaché(s)
                  </p>
                </div>
                <button
                  onClick={() => setShowFilesModal(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {/* Informations de l'intervention avec timeline */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Technicien</p>
                    <p className="text-gray-900">
                      {selectedIntervention.technicien?.prenom} {selectedIntervention.technicien?.nom}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Lieu</p>
                    <p className="text-gray-900">
                      {getLieuLabel(selectedIntervention.lieu)} ({getBatiment(selectedIntervention.lieu)})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Statut</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusConfig(selectedIntervention.statut).color}`}>
                      {getStatusConfig(selectedIntervention.statut).text}
                    </span>
                  </div>
                </div>

                {/* Timeline des dates dans le modal */}
                <div className="border-t pt-3">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Chronologie:</p>
                  <div className="space-y-2">
                    {/* Date planifiée */}
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">
                        Planifié: {new Date(selectedIntervention.dateDebut).toLocaleDateString('fr-FR')} à {selectedIntervention.heureDebut}
                      </span>
                    </div>
                    
                    {/* Date début effectif */}
                    {selectedIntervention.dateDebutEffectif && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">
                          Débuté: {new Date(selectedIntervention.dateDebutEffectif).toLocaleDateString('fr-FR')} à {selectedIntervention.heureDebutEffectif}
                        </span>
                      </div>
                    )}
                    
                    {/* Date fin effective */}
                    {selectedIntervention.dateFinEffective && (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">
                            Terminé: {new Date(selectedIntervention.dateFinEffective).toLocaleDateString('fr-FR')} à {selectedIntervention.heureFinEffective}
                          </span>
                        </div>
                        
                        {/* Durée */}
                        {selectedIntervention.dateDebutEffectif && (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t">
                            <span className="text-xs font-semibold text-purple-700">
                              ⏱️ Durée totale: {formatDuree(selectedIntervention.dateDebutEffectif, selectedIntervention.dateFinEffective)}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {selectedIntervention.fichiers && selectedIntervention.fichiers.length > 0 ? (
                <div className="space-y-4">
                  {selectedIntervention.fichiers.map((fichier) => (
                    <div key={fichier._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          {getFileIcon(fichier.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{fichier.nom}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                            <span>{formatFileSize(fichier.taille)}</span>
                            <span>•</span>
                            <span className="capitalize">{fichier.type}</span>
                            <span>•</span>
                            <span>Uploadé le {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}</span>
                            {fichier.uploadedBy && (
                              <>
                                <span>•</span>
                                <span>par {fichier.uploadedBy.prenom} {fichier.uploadedBy.nom}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
                          className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
                          title="Télécharger"
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText size={64} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 text-lg">Aucun fichier attaché à cette intervention</p>
                </div>
              )}

              <div className="flex justify-end pt-6 mt-6 border-t">
                <button
                  onClick={() => setShowFilesModal(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors font-medium"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterventionsView;