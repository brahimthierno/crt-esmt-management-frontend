import React, { useState } from 'react';
import { Search, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

const SuiviDemandePage = () => {
  const [numeroReference, setNumeroReference] = useState('');
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!numeroReference.trim()) {
      setError('Veuillez entrer un numéro de référence');
      return;
    }

    setLoading(true);
    setError('');
    setDemande(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/demandes/suivi/${numeroReference}`
      );

      if (response.status === 404) {
        setError('Aucune demande trouvée avec ce numéro');
      } else if (response.ok) {
        const data = await response.json();
        setDemande(data);
      } else {
        setError('Erreur lors de la recherche');
      }
    } catch (err) {
      setError('Erreur serveur: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (statut) => {
    const icons = {
      'nouvelle': <Clock className="w-5 h-5 text-blue-500" />,
      'examinee': <Clock className="w-5 h-5 text-yellow-500" />,
      'acceptee': <CheckCircle className="w-5 h-5 text-green-500" />,
      'convertie': <CheckCircle className="w-5 h-5 text-green-600" />,
      'rejetee': <XCircle className="w-5 h-5 text-red-500" />
    };
    return icons[statut] || <AlertCircle className="w-5 h-5 text-gray-500" />;
  };

  const getStatusLabel = (statut) => {
    const labels = {
      'nouvelle': 'Nouvelle demande',
      'examinee': 'En examen',
      'acceptee': 'Acceptée',
      'convertie': 'Convertie en intervention',
      'rejetee': 'Rejetée'
    };
    return labels[statut] || statut;
  };

  const getStatusColor = (statut) => {
    const colors = {
      'nouvelle': 'bg-blue-50',
      'examinee': 'bg-yellow-50',
      'acceptee': 'bg-green-50',
      'convertie': 'bg-green-50',
      'rejetee': 'bg-red-50'
    };
    return colors[statut] || 'bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Suivre ma demande</h1>
          <p className="text-gray-600">Entrez votre numéro de référence pour connaître l'état de votre demande</p>
        </div>

        {/* Barre de recherche */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={numeroReference}
                onChange={(e) => setNumeroReference(e.target.value)}
                placeholder="Ex: DEM-20251029-001"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              {loading ? 'Recherche...' : 'Rechercher'}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Résultat */}
        {demande && (
          <div className={`${getStatusColor(demande.statut)} rounded-lg shadow-lg p-8`}>
            {/* En-tête avec numéro et statut */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Numéro de référence</p>
                  <p className="text-2xl font-bold text-gray-800 font-mono">{demande.numeroReference}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(demande.statut)}
                  <span className="font-semibold text-gray-800">{getStatusLabel(demande.statut)}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Créée le {new Date(demande.dateCreation).toLocaleDateString('fr-FR')} à{' '}
                {new Date(demande.dateCreation).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Détails */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Équipement</p>
                <p className="font-semibold text-gray-800">{demande.equipement}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Lieu</p>
                <p className="font-semibold text-gray-800">{demande.lieu}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Priorité</p>
                <p className="font-semibold">
                  {demande.priorite === 'haute' && '🔴 Haute'}
                  {demande.priorite === 'moyenne' && '🟡 Moyenne'}
                  {demande.priorite === 'basse' && '🟢 Basse'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Contact</p>
                <p className="font-semibold text-gray-800">{demande.telephone}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Description</p>
              <p className="text-gray-700 bg-white bg-opacity-50 p-3 rounded">{demande.description}</p>
            </div>

            {/* Notes de l'admin */}
            {demande.notes && (
              <div className="bg-white bg-opacity-50 p-4 rounded border-l-4 border-blue-500 mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-1">📝 Notes de l'administration:</p>
                <p className="text-gray-600">{demande.notes}</p>
              </div>
            )}

            {/* Motif de rejet */}
            {demande.statut === 'rejetee' && demande.motifRejet && (
              <div className="bg-red-100 bg-opacity-50 p-4 rounded border-l-4 border-red-500">
                <p className="text-sm font-semibold text-red-700 mb-1">Motif du rejet:</p>
                <p className="text-red-600">{demande.motifRejet}</p>
              </div>
            )}
          </div>
        )}

        {/* Étapes du processus */}
        {!demande && !error && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Comment fonctionne le processus?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Demande reçue</p>
                  <p className="text-sm text-gray-600">Vous recevez un numéro de référence par email</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">2</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">En examen</p>
                  <p className="text-sm text-gray-600">L'administrateur examine votre demande</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Acceptée/Rejetée</p>
                  <p className="text-sm text-gray-600">Vous recevez une notification par email</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                  <span className="font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Intervention programmée</p>
                  <p className="text-sm text-gray-600">Un technicien vous contactera pour fixer un rendez-vous</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuiviDemandePage;