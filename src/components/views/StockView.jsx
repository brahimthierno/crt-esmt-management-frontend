// import React, { useState } from 'react';
// import { Plus } from 'lucide-react';
// import EmpruntModal from '../modals/EmpruntModal';

// const StockView = ({ stock, emprunts, onUpdateStock, onAddEmprunt, onRetourner, currentUser }) => {
//   const [showEmpruntModal, setShowEmpruntModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const empruntsActifs = emprunts.filter(e => e.statut === 'en_cours');

//   const handleAddEmprunt = async (data) => {
//     setLoading(true);
//     const result = await onAddEmprunt(data);
//     setLoading(false);

//     if (result.success) {
//       setShowEmpruntModal(false);
//     } else {
//       alert(result.message || 'Erreur lors de la création de l\'emprunt');
//     }
//   };

//   const handleRetourner = async (empruntId) => {
//     const result = await onRetourner(empruntId);
//     if (!result.success) {
//       alert(result.message || 'Erreur lors du retour');
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Gestion du Stock</h2>
//         <div className="flex gap-3">
//           {currentUser.role === 'admin' && (
//             <button
//               onClick={() => setShowEmpruntModal(true)}
//               className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
//             >
//               <Plus size={18} />
//               Nouvel emprunt
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-xl font-semibold mb-4">Matériels disponibles</h3>
//           <div className="space-y-3">
//             {stock.map(materiel => (
//               <div key={materiel._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="font-semibold">{materiel.nom}</p>
//                   <p className="text-sm text-gray-600 capitalize">{materiel.categorie}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-lg font-bold text-blue-600">{materiel.disponible} / {materiel.quantite}</p>
//                   <p className="text-xs text-gray-500">disponibles</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-xl font-semibold mb-4">Emprunts en cours</h3>
//           <div className="space-y-3">
//             {empruntsActifs.map(emprunt => {
//               const materiel = stock.find(s => s._id === emprunt.materiel?._id);
//               return (
//                 <div key={emprunt._id} className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="font-semibold">{emprunt.materiel?.nom || materiel?.nom}</p>
//                       <p className="text-sm text-gray-600">Emprunteur: {emprunt.emprunteur}</p>
//                       <p className="text-sm text-gray-600">Quantité: {emprunt.quantite}</p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Retour prévu: {new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR')}
//                       </p>
//                     </div>
//                     {currentUser.role === 'admin' && (
//                       <button
//                         onClick={() => handleRetourner(emprunt._id)}
//                         className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition"
//                       >
//                         Retourner
//                       </button>
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

//       {showEmpruntModal && (
//         <EmpruntModal
//           stock={stock}
//           onSave={handleAddEmprunt}
//           onClose={() => setShowEmpruntModal(false)}
//           loading={loading}
//         />
//       )}
//     </div>
//   );
// };

// export default StockView;





// VERSION AVEC DEEPSEEK


import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import EmpruntModal from '../modals/EmpruntModal';

const StockView = ({ stock, emprunts, onUpdateStock, onAddEmprunt, onRetourner, onUpdateEmprunt, onDeleteMateriel, onAddMateriel, currentUser }) => {
  const [showEmpruntModal, setShowEmpruntModal] = useState(false);
  const [showMaterielModal, setShowMaterielModal] = useState(false);
  const [editingEmprunt, setEditingEmprunt] = useState(null);
  const [editingMateriel, setEditingMateriel] = useState(null);
  const [loading, setLoading] = useState(false);

  const empruntsActifs = emprunts.filter(e => e.statut === 'en_cours');

  const handleAddEmprunt = async (data, empruntId = null) => {
    setLoading(true);
    let result;
    
    if (empruntId && onUpdateEmprunt) {
      result = await onUpdateEmprunt(empruntId, data);
    } else {
      result = await onAddEmprunt(data);
    }
    
    setLoading(false);

    if (result.success) {
      setShowEmpruntModal(false);
      setEditingEmprunt(null);
    } else {
      alert(result.message || 'Erreur lors de l\'opération');
    }
  };

  const handleEditEmprunt = (emprunt) => {
    setEditingEmprunt(emprunt);
    setShowEmpruntModal(true);
  };

  const handleRetourner = async (empruntId) => {
    const result = await onRetourner(empruntId);
    if (!result.success) {
      alert(result.message || 'Erreur lors du retour');
    }
  };

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
      if (!result.success) {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestion du Stock</h2>
        <div className="flex gap-3">
          {currentUser.role === 'admin' && (
            <>
              <button
                onClick={handleNewMateriel}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus size={18} />
                Ajouter matériel
              </button>
              <button
                onClick={handleNewEmprunt}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus size={18} />
                Nouvel emprunt
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Stock */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Matériels disponibles</h3>
          </div>
          <div className="space-y-3">
            {stock.map(materiel => (
              <div key={materiel._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold">{materiel.nom}</p>
                  <p className="text-sm text-gray-600 capitalize">{materiel.categorie}</p>
                </div>
                <div className="text-right mr-4">
                  <p className="text-lg font-bold text-blue-600">{materiel.disponible} / {materiel.quantite}</p>
                  <p className="text-xs text-gray-500">disponibles</p>
                </div>
                {currentUser.role === 'admin' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditMateriel(materiel)}
                      className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded transition"
                      title="Modifier"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteMateriel(materiel._id)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded transition"
                      title="Supprimer"
                      disabled={!onDeleteMateriel}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
            {stock.length === 0 && (
              <p className="text-center text-gray-500 py-8">Aucun matériel en stock</p>
            )}
          </div>
        </div>

        {/* Section Emprunts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Emprunts en cours</h3>
          <div className="space-y-3">
            {empruntsActifs.map(emprunt => {
              const materiel = stock.find(s => s._id === emprunt.materiel?._id);
              return (
                <div key={emprunt._id} className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold">{emprunt.materiel?.nom || materiel?.nom}</p>
                      <p className="text-sm text-gray-600">Emprunteur: {emprunt.emprunteur}</p>
                      <p className="text-sm text-gray-600">Quantité: {emprunt.quantite}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Emprunté le: {new Date(emprunt.dateEmprunt).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-xs text-gray-500">
                        Retour prévu: {new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    {currentUser.role === 'admin' && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditEmprunt(emprunt)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
                          disabled={!onUpdateEmprunt}
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleRetourner(emprunt._id)}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition"
                        >
                          Retourner
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {empruntsActifs.length === 0 && (
              <p className="text-center text-gray-500 py-8">Aucun emprunt en cours</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal pour ajouter/modifier un emprunt */}
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

      {/* Modal pour ajouter/modifier un matériel */}
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

// Composant Modal pour ajouter/modifier un matériel
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
    // Envoyer les données individuelles avec conversion en nombres
    onSave({
      nom: formData.nom,
      categorie: formData.categorie,
      quantite: parseInt(formData.quantite) || 1,
      disponible: parseInt(formData.disponible) || 0
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // S'assurer que la quantité disponible ne dépasse pas la quantité totale
  const handleQuantiteChange = (value) => {
    const quantite = parseInt(value) || 1;
    setFormData(prev => ({
      ...prev,
      quantite: quantite,
      disponible: Math.min(prev.disponible, quantite)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {isEditing ? 'Modifier le matériel' : 'Nouveau matériel'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom du matériel</label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => handleChange('nom', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nom du matériel"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <input
              type="text"
              value={formData.categorie}
              onChange={(e) => handleChange('categorie', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Catégorie"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantité totale</label>
            <input
              type="number"
              min="1"
              value={formData.quantite}
              onChange={(e) => handleQuantiteChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantité disponible</label>
            <input
              type="number"
              min="0"
              max={formData.quantite}
              value={formData.disponible}
              onChange={(e) => handleChange('disponible', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum: {formData.quantite}
            </p>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : isEditing ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockView;
