import React, { useState, useEffect } from 'react';

const InterventionModal = ({ intervention, techniciens, onSave, onClose, loading }) => {
  const [formData, setFormData] = useState({
    titre: '',
    type: 'reparation',
    materiel: '',
    lieu: '',
    technicien: '',
    statut: 'planifiee',
    priorite: 'moyenne',
    dateDebut: '',
    heureDebut: '',
    description: ''
  });

  useEffect(() => {
    if (intervention) {
      setFormData({
        titre: intervention.titre,
        type: intervention.type,
        materiel: intervention.materiel,
        lieu: intervention.lieu,
        technicien: intervention.technicien?._id || '',
        statut: intervention.statut,
        priorite: intervention.priorite,
        dateDebut: intervention.dateDebut?.split('T')[0] || '',
        heureDebut: intervention.heureDebut,
        description: intervention.description || ''
      });
    }
  }, [intervention]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">
          {intervention ? 'Modifier l\'intervention' : 'Nouvelle intervention'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Titre</label>
            <input
              type="text"
              value={formData.titre}
              onChange={(e) => setFormData({...formData, titre: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                disabled={loading}
              >
                <option value="reparation">Réparation</option>
                <option value="diagnostic">Diagnostic</option>
                <option value="verification">Vérification</option>
                <option value="maintenance">Maintenance</option>
                <option value="installation">Installation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Priorité</label>
              <select
                value={formData.priorite}
                onChange={(e) => setFormData({...formData, priorite: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                disabled={loading}
              >
                <option value="basse">Basse</option>
                <option value="moyenne">Moyenne</option>
                <option value="haute">Haute</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Matériel</label>
              <input
                type="text"
                value={formData.materiel}
                onChange={(e) => setFormData({...formData, materiel: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Lieu</label>
              <input
                type="text"
                value={formData.lieu}
                onChange={(e) => setFormData({...formData, lieu: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={formData.dateDebut}
                onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Heure</label>
              <input
                type="time"
                value={formData.heureDebut}
                onChange={(e) => setFormData({...formData, heureDebut: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Technicien</label>
            <select
              value={formData.technicien}
              onChange={(e) => setFormData({...formData, technicien: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              required
              disabled={loading}
            >
              <option value="">Sélectionner un technicien</option>
              {techniciens.map(tech => (
                <option key={tech._id} value={tech._id}>
                  {tech.prenom} {tech.nom} ({tech.role})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Statut</label>
            <select
              value={formData.statut}
              onChange={(e) => setFormData({...formData, statut: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              disabled={loading}
            >
              <option value="planifiee">Planifiée</option>
              <option value="en_cours">En cours</option>
              <option value="terminee">Terminée</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
              disabled={loading}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterventionModal;