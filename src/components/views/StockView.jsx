
// NOUVELLE VERSION DEEPSEEK AVEC INTEGRATION DU SYSTEME DE NOTIFICATIONS


import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import EmpruntModal from '../modals/EmpruntModal';
import { useNotifications } from '../../context/NotificationContext';

const StockView = ({ stock, emprunts, onUpdateStock, onAddEmprunt, onRetourner, onUpdateEmprunt, onDeleteMateriel, onAddMateriel, currentUser, onReloadData }) => {
  const [showEmpruntModal, setShowEmpruntModal] = useState(false);
  const [showMaterielModal, setShowMaterielModal] = useState(false);
  const [editingEmprunt, setEditingEmprunt] = useState(null);
  const [editingMateriel, setEditingMateriel] = useState(null);
  const [loading, setLoading] = useState(false);

  const { showSuccess, showError, showWarning, showInfo } = useNotifications();
  const prevEmpruntsRef = useRef([]);

  const empruntsActifs = emprunts.filter(e => e.statut === 'en_cours');

  // DEBUG: Afficher la structure complète de currentUser
  console.log('=== CURRENT USER STRUCTURE ===', currentUser);

  // Fonction pour obtenir l'ID de l'utilisateur (gère différents formats)
  const getUserId = () => {
    // Essayer différentes propriétés possibles pour l'ID
    return currentUser?.id || 
           currentUser?._id || 
           currentUser?.user?.id || 
           currentUser?.user?._id ||
           currentUser?.data?.id ||
           currentUser?.data?._id;
  };

  const userId = getUserId();
  console.log('User ID trouvé:', userId);

  // Fonction pour vérifier si l'utilisateur peut gérer les emprunts
  const canManageEmprunts = () => {
    const userRole = currentUser?.role || currentUser?.user?.role;
    return ['admin', 'informaticien', 'electricien'].includes(userRole);
  };

  // Fonction pour vérifier si l'utilisateur peut gérer le stock
  const canManageStock = () => {
    const userRole = currentUser?.role || currentUser?.user?.role;
    return userRole === 'admin';
  };

  // Fonction pour vérifier si l'utilisateur peut modifier/supprimer un emprunt spécifique
  const canModifyEmprunt = (emprunt) => {
    const userRole = currentUser?.role || currentUser?.user?.role;
    
    if (userRole === 'admin') {
      console.log('Admin peut modifier tous les emprunts');
      return true;
    }
    
    // Vérifier si le technicien est le responsable de cet emprunt
    // Gérer les différents formats de responsable (ObjectId string ou objet populate)
    const responsableId = 
      emprunt.responsable?._id ? emprunt.responsable._id.toString() : // Si c'est un objet populate
      emprunt.responsable ? emprunt.responsable.toString() : // Si c'est un ObjectId string
      null;
    
    const userCanModify = responsableId === userId;
    
    console.log('Responsable ID:', responsableId);
    console.log('Current User ID:', userId);
    console.log('User can modify:', userCanModify);
    
    return userCanModify;
  };

  // Détecter les nouveaux emprunts en retard
  useEffect(() => {
    const empruntsActifsPrecedents = prevEmpruntsRef.current.filter(e => e.statut === 'en_cours');
    const empruntsActifsActuels = emprunts.filter(e => e.statut === 'en_cours');
    
    const aujourdhui = new Date();
    
    // Vérifier les nouveaux retards
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

  const handleAddEmprunt = async (data, empruntId = null) => {
    setLoading(true);
    let result;
    
    try {
      if (empruntId && onUpdateEmprunt) {
        result = await onUpdateEmprunt(empruntId, data);
        if (result.success) {
          showSuccess('Emprunt modifié', 'L\'emprunt a été modifié avec succès');
        }
      } else {
        result = await onAddEmprunt(data);
        if (result.success) {
          showSuccess('Emprunt créé', 'Le nouvel emprunt a été créé avec succès');
        }
      }
      
      setLoading(false);

      if (result.success) {
        setShowEmpruntModal(false);
        setEditingEmprunt(null);
        
        // ✅ RECHARGER LES DONNÉES EMPRUNTS ET STOCK
        if (onReloadData) {
          await onReloadData(['emprunts', 'stock']);
        }
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
        showSuccess(
          'Retour confirmé',
          `L'emprunt de "${emprunt.materiel?.nom}" a été retourné avec succès`
        );
        
        // ✅ RECHARGER LES DONNÉES EMPRUNTS ET STOCK
        if (onReloadData) {
          await onReloadData(['emprunts', 'stock']);
        }
      } else {
        showError(
          'Erreur lors du retour',
          result.message || 'Une erreur est survenue lors du retour'
        );
      }
    } catch (error) {
      showError(
        'Erreur',
        'Une erreur est survenue lors du retour de l\'emprunt'
      );
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
      if (result.success) {
        // ✅ RECHARGER LES DONNÉES STOCK
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
      
      // ✅ RECHARGER LES DONNÉES STOCK
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

  // Obtenir le rôle affichable
  const getUserRoleDisplay = () => {
    return currentUser?.role || currentUser?.user?.role || 'Non défini';
  };

  // Fonction pour vérifier les emprunts en retard
  const getEmpruntsEnRetard = () => {
    const aujourdhui = new Date();
    return empruntsActifs.filter(emprunt => {
      const dateRetour = new Date(emprunt.dateRetourPrevue);
      return dateRetour < aujourdhui;
    });
  };

  // Composant pour afficher les alertes de retard
  const AfficherAlertesRetard = () => {
    const empruntsRetard = getEmpruntsEnRetard();
    
    if (empruntsRetard.length === 0) {
      return null;
    }

    return (
      <div className="mb-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-red-800">
              Emprunts en retard ({empruntsRetard.length})
            </h3>
          </div>
          <div className="space-y-2">
            {empruntsRetard.map(emprunt => {
              const materiel = stock.find(s => s._id === emprunt.materiel?._id);
              const joursRetard = Math.ceil(
                (new Date() - new Date(emprunt.dateRetourPrevue)) / (1000 * 60 * 60 * 24)
              );
              
              return (
                <div key={emprunt._id} className="flex justify-between items-center p-3 bg-red-100 rounded">
                  <div>
                    <p className="font-medium text-red-800">
                      {emprunt.materiel?.nom || materiel?.nom}
                    </p>
                    <p className="text-sm text-red-600">
                      Emprunteur: {emprunt.emprunteur} • 
                      Retard: {joursRetard} jour(s) • 
                      Responsable: {emprunt.responsable?.nom || 'Non défini'}
                    </p>
                  </div>
                  {canModifyEmprunt(emprunt) && (
                    <button
                      onClick={() => handleRetourner(emprunt._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestion du Stock</h2>
        <div className="flex gap-3">
          {/* Bouton Ajouter matériel - Admin seulement */}
          {canManageStock() && (
            <button
              onClick={handleNewMateriel}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Plus size={18} />
              Ajouter matériel
            </button>
          )}
          
          {/* Bouton Nouvel emprunt - Admin et Techniciens */}
          {canManageEmprunts() && (
            <button
              onClick={handleNewEmprunt}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Plus size={18} />
              Nouvel emprunt
            </button>
          )}
        </div>
      </div>

      {/* DEBUG: Afficher le rôle de l'utilisateur */}
      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Rôle actuel:</strong> {getUserRoleDisplay()} | 
          <strong> ID:</strong> {userId || 'Non trouvé'} |
          <strong> Peut gérer les emprunts:</strong> {canManageEmprunts() ? 'OUI' : 'NON'} |
          <strong> Peut gérer le stock:</strong> {canManageStock() ? 'OUI' : 'NON'}
        </p>
      </div>

      {/* Alertes pour les emprunts en retard */}
      <AfficherAlertesRetard />

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
                {/* Boutons gestion matériel - Admin seulement */}
                {canManageStock() && (
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
              const userCanModify = canModifyEmprunt(emprunt);
              
              console.log(`Emprunt ${emprunt._id} - Peut modifier: ${userCanModify}`);
              
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
                      {/* Afficher le responsable */}
                      {emprunt.responsable && (
                        <p className="text-xs text-blue-600 mt-1">
                          Responsable: {emprunt.responsable.nom || emprunt.responsable} {emprunt.responsable.prenom || ''}
                        </p>
                      )}
                      {/* DEBUG: Afficher si l'utilisateur peut modifier */}
                      <p className={`text-xs mt-1 ${userCanModify ? 'text-green-600' : 'text-red-600'}`}>
                        {userCanModify ? '✓ Vous pouvez modifier cet emprunt' : '✗ Vous ne pouvez pas modifier cet emprunt'}
                      </p>
                    </div>
                    
                    {/* Boutons gestion emprunt - Admin et technicien propriétaire */}
                    {userCanModify && canManageEmprunts() && (
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

// Composant Modal pour ajouter/modifier un matériel (inchangé)
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

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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


