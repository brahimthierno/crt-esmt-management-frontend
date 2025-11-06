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


import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, FileText, Image, Download } from 'lucide-react';
import InterventionModal from '../modals/InterventionModal';

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
  onReloadIntervention // ← NOUVELLE PROP
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilesModal, setShowFilesModal] = useState(false);
  const [selectedIntervention, setSelectedIntervention] = useState(null);

  const filteredInterventions = interventions.filter(i => {
    if (currentUser.role !== 'admin' && i.technicien?._id !== currentUser._id) return false;
    if (filterDate && i.dateDebut !== filterDate) return false;
    if (filterStatut && i.statut !== filterStatut) return false;
    return true;
  });

  const techniciens = users.filter(u => u.role !== 'admin');

  const handleSave = async (data, interventionId = null) => {
    setLoading(true);
    let result;
    
    if (editItem || interventionId) {
      const id = interventionId || editItem._id;
      result = await onUpdate(id, data);
      
      // ✅ RECHARGER L'INTERVENTION APRÈS MISE À JOUR (SPÉCIALEMENT POUR LES FICHIERS)
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

  const handleUpdateStatus = async (intervention) => {
    const newStatus = intervention.statut === 'planifiee' ? 'en_cours' : 'terminee';
    const result = await onUpdate(intervention._id, { statut: newStatus });
    
    if (!result.success) {
      alert(result.message || 'Une erreur est survenue');
    }
  };

  const handleShowFiles = (intervention) => {
    setSelectedIntervention(intervention);
    setShowFilesModal(true);
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image': 
        return <Image size={16} className="text-blue-600" />;
      case 'document': 
        return <FileText size={16} className="text-green-600" />;
      default: 
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'terminee': return 'bg-green-100 text-green-800';
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'planifiee': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (statut) => {
    switch (statut) {
      case 'terminee': return 'Terminée';
      case 'en_cours': return 'En cours';
      case 'planifiee': return 'Planifiée';
      default: return statut;
    }
  };

  const canModifyIntervention = (intervention) => {
    return currentUser.role === 'admin' || intervention.technicien?._id === currentUser._id;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Interventions</h2>
        {currentUser.role === 'admin' && (
          <button
            onClick={() => { setEditItem(null); setShowModal(true); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={18} />
            Nouvelle intervention
          </button>
        )}
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-md p-4 flex gap-4 flex-wrap">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tous les statuts</option>
            <option value="planifiee">Planifiée</option>
            <option value="en_cours">En cours</option>
            <option value="terminee">Terminée</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => { setFilterDate(''); setFilterStatut(''); }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition h-[42px]"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Tableau des interventions */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Titre</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Lieu</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Technicien</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fichiers</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInterventions.map(intervention => {
                const tech = intervention.technicien;
                const hasFiles = intervention.fichiers && intervention.fichiers.length > 0;
                
                return (
                  <tr key={intervention._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{intervention.titre}</div>
                      {intervention.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {intervention.description}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 capitalize">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {intervention.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{intervention.lieu}</td>
                    <td className="px-4 py-3">
                      {tech ? (
                        <div>
                          <div className="font-medium">{tech.prenom} {tech.nom}</div>
                          <div className="text-xs text-gray-500 capitalize">{tech.role}</div>
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-700">
                        {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {intervention.heureDebut}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {hasFiles ? (
                        <button
                          onClick={() => handleShowFiles(intervention)}
                          className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm"
                        >
                          <FileText size={16} />
                          <span>{intervention.fichiers.length}</span>
                          <span>fichier(s)</span>
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">Aucun fichier</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(intervention.statut)}`}>
                        {getStatusText(intervention.statut)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {/* Bouton pour changer le statut (technicien seulement) */}
                        {currentUser.role !== 'admin' && intervention.statut !== 'terminee' && (
                          <button
                            onClick={() => handleUpdateStatus(intervention)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                            title={intervention.statut === 'planifiee' ? 'Démarrer l\'intervention' : 'Marquer comme terminée'}
                          >
                            <Check size={18} />
                          </button>
                        )}

                        {/* Bouton pour voir les fichiers */}
                        {hasFiles && (
                          <button
                            onClick={() => handleShowFiles(intervention)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                            title="Voir les fichiers"
                          >
                            <FileText size={18} />
                          </button>
                        )}

                        {/* Boutons admin */}
                        {currentUser.role === 'admin' && (
                          <>
                            <button
                              onClick={() => { setEditItem(intervention); setShowModal(true); }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                              title="Modifier"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(intervention._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                              title="Supprimer"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}

                        {/* Bouton modification pour le technicien propriétaire */}
                        {currentUser.role !== 'admin' && canModifyIntervention(intervention) && (
                          <button
                            onClick={() => { setEditItem(intervention); setShowModal(true); }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                            title="Modifier"
                          >
                            <Edit2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredInterventions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">Aucune intervention trouvée</p>
            <p className="text-sm mt-1">
              {currentUser.role === 'admin' 
                ? 'Créez votre première intervention en cliquant sur le bouton ci-dessus' 
                : 'Aucune intervention ne vous est assignée pour le moment'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal pour l'édition/création d'intervention */}
      {showModal && (
        <InterventionModal
          intervention={editItem}
          techniciens={techniciens}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditItem(null); }}
          loading={loading}
          currentUser={currentUser}
        />
      )}

      {/* Modal pour afficher les fichiers */}
      {showFilesModal && selectedIntervention && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Fichiers - {selectedIntervention.titre}
              </h3>
              <button
                onClick={() => setShowFilesModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Technicien:</strong> {selectedIntervention.technicien?.prenom} {selectedIntervention.technicien?.nom}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Lieu:</strong> {selectedIntervention.lieu}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Statut:</strong> <span className={getStatusColor(selectedIntervention.statut) + " px-2 py-1 rounded-full text-xs"}>
                  {getStatusText(selectedIntervention.statut)}
                </span>
              </p>
            </div>

            {selectedIntervention.fichiers && selectedIntervention.fichiers.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">
                  {selectedIntervention.fichiers.length} fichier(s) attaché(s)
                </h4>
                {selectedIntervention.fichiers.map((fichier) => (
                  <div key={fichier._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-center space-x-3 flex-1">
                      {getFileIcon(fichier.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{fichier.nom}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1">
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
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                        title="Télécharger"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Aucun fichier attaché à cette intervention</p>
              </div>
            )}

            <div className="flex justify-end pt-4 mt-6 border-t">
              <button
                onClick={() => setShowFilesModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterventionsView;