import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check } from 'lucide-react';
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
  setFilterStatut
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const filteredInterventions = interventions.filter(i => {
    if (currentUser.role !== 'admin' && i.technicien?._id !== currentUser._id) return false;
    if (filterDate && i.dateDebut !== filterDate) return false;
    if (filterStatut && i.statut !== filterStatut) return false;
    return true;
  });

  const techniciens = users.filter(u => u.role !== 'admin');

  const handleSave = async (data) => {
    setLoading(true);
    let result;
    
    if (editItem) {
      result = await onUpdate(editItem._id, data);
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
    const result = await onDelete(id);
    if (!result.success) {
      alert(result.message || 'Une erreur est survenue');
    }
  };

  const handleUpdateStatus = async (intervention) => {
    const newStatus = intervention.statut === 'planifiee' ? 'en_cours' : 'terminee';
    const result = await onUpdate(intervention._id, { statut: newStatus });
    
    if (!result.success) {
      alert(result.message || 'Une erreur est survenue');
    }
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

      <div className="bg-white rounded-lg shadow-md p-4 flex gap-4">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
        <select
          value={filterStatut}
          onChange={(e) => setFilterStatut(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Tous les statuts</option>
          <option value="planifiee">Planifiée</option>
          <option value="en_cours">En cours</option>
          <option value="terminee">Terminée</option>
        </select>
        <button
          onClick={() => { setFilterDate(''); setFilterStatut(''); }}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
        >
          Réinitialiser
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Titre</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Lieu</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Technicien</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredInterventions.map(intervention => {
              const tech = intervention.technicien;
              return (
                <tr key={intervention._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{intervention.titre}</td>
                  <td className="px-4 py-3 capitalize">{intervention.type}</td>
                  <td className="px-4 py-3">{intervention.lieu}</td>
                  <td className="px-4 py-3">
                    {tech ? `${tech.prenom} ${tech.nom}` : '-'}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      intervention.statut === 'terminee' ? 'bg-green-100 text-green-800' :
                      intervention.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {intervention.statut === 'terminee' ? 'Terminée' :
                       intervention.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {currentUser.role !== 'admin' && intervention.statut !== 'terminee' && (
                        <button
                          onClick={() => handleUpdateStatus(intervention)}
                          className="text-blue-600 hover:text-blue-800"
                          title={intervention.statut === 'planifiee' ? 'Démarrer' : 'Terminer'}
                        >
                          <Check size={18} />
                        </button>
                      )}
                      {currentUser.role === 'admin' && (
                        <>
                          <button
                            onClick={() => { setEditItem(intervention); setShowModal(true); }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(intervention._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredInterventions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucune intervention trouvée
          </div>
        )}
      </div>

      {showModal && (
        <InterventionModal
          intervention={editItem}
          techniciens={techniciens}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditItem(null); }}
          loading={loading}
        />
      )}
    </div>
  );
};

export default InterventionsView;