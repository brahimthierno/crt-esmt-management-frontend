
// ============================================
// views/DemandesView.jsx (Admin) - VERSION CORRIGÉE
// ============================================
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle, Eye, Send, Mail, Phone } from 'lucide-react';

const DemandesView = () => {
  const [demandes, setDemandes] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState('');
  const [filtrePriorite, setFiltrePriorite] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [motifRejet, setMotifRejet] = useState('');
  const [stats, setStats] = useState({});
  const [convertLoading, setConvertLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  // Charger les demandes
  const loadDemandes = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/demandes/list';
      const params = new URLSearchParams();
      if (filtreStatut) params.append('statut', filtreStatut);
      if (filtrePriorite) params.append('priorite', filtrePriorite);
      if (params.toString()) url += '?' + params.toString();

      const response = await fetch(url);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setDemandes(data);
      loadStats();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du chargement des demandes');
    } finally {
      setLoading(false);
    }
  };

  // Charger les statistiques
  const loadStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/demandes/stats/count');
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      const statsObj = {};
      data.forEach(item => {
        statsObj[item._id] = item.count;
      });
      setStats(statsObj);
    } catch (error) {
      console.error('Erreur stats:', error);
    }
  };

  useEffect(() => {
    loadDemandes();
  }, [filtreStatut, filtrePriorite]);

  // Examiner une demande
  const handleExaminer = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/demandes/examiner/${id}`, {
        method: 'PUT'
      });
      if (!response.ok) throw new Error('Erreur');
      await loadDemandes();
      alert('✅ Demande marquée comme examinée');
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'examen');
    }
  };

  // Convertir en intervention
  const handleConvertir = async () => {
    console.log('🔄 handleConvertir appelée');
    console.log('selectedDemande:', selectedDemande);
    
    if (!selectedDemande || !selectedDemande._id) {
      alert('❌ Erreur: Demande non trouvée');
      return;
    }

    setConvertLoading(true);
    try {
      console.log(`Appel API: http://localhost:5000/api/demandes/convertir/${selectedDemande._id}`);
      
      const response = await fetch(
        `http://localhost:5000/api/demandes/convertir/${selectedDemande._id}`,
        { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log('Réponse status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la conversion');
      }

      const data = await response.json();
      console.log('✅ Réponse:', data);
      
      alert('✅ Demande convertie en intervention avec succès!');
      setShowModal(false);
      setMotifRejet('');
      await loadDemandes();
    } catch (error) {
      console.error('❌ Erreur:', error);
      alert('❌ Erreur lors de la conversion: ' + error.message);
    } finally {
      setConvertLoading(false);
    }
  };

  // Rejeter une demande
  const handleRejeter = async () => {
    console.log('🚫 handleRejeter appelée');
    
    if (!motifRejet.trim()) {
      alert('Veuillez indiquer un motif de rejet');
      return;
    }

    if (!selectedDemande || !selectedDemande._id) {
      alert('❌ Erreur: Demande non trouvée');
      return;
    }

    setRejectLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/demandes/rejeter/${selectedDemande._id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ motifRejet })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors du rejet');
      }

      alert('✅ Demande rejetée avec succès');
      setShowModal(false);
      setMotifRejet('');
      await loadDemandes();
    } catch (error) {
      console.error('❌ Erreur:', error);
      alert('❌ Erreur lors du rejet: ' + error.message);
    } finally {
      setRejectLoading(false);
    }
  };

  const getStatusBadge = (statut) => {
    const badges = {
      'nouvelle': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock, label: 'Nouvelle' },
      'examinee': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertCircle, label: 'En examen' },
      'acceptee': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Acceptée' },
      'convertie': { bg: 'bg-green-200', text: 'text-green-800', icon: CheckCircle, label: 'Convertie' },
      'rejetee': { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Rejetée' }
    };
    const badge = badges[statut] || badges.nouvelle;
    const Icon = badge.icon;
    return (
      <span className={`${badge.bg} ${badge.text} px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 w-fit`}>
        <Icon className="w-4 h-4" />
        {badge.label}
      </span>
    );
  };

  const getPriorityBadge = (priorite) => {
    const colors = {
      'basse': 'bg-green-100 text-green-700',
      'moyenne': 'bg-yellow-100 text-yellow-700',
      'haute': 'bg-red-100 text-red-700'
    };
    const labels = {
      'basse': '🟢 Basse',
      'moyenne': '🟡 Moyenne',
      'haute': '🔴 Haute'
    };
    return (
      <span className={`${colors[priorite]} px-3 py-1 rounded-full text-sm font-semibold`}>
        {labels[priorite]}
      </span>
    );
  };

  const getStatusColor = (statut) => {
    const colors = {
      'nouvelle': 'bg-blue-50',
      'examinee': 'bg-yellow-50',
      'acceptee': 'bg-green-50',
      'convertie': 'bg-green-50',
      'rejetee': 'bg-red-50'
    };
    return colors[statut] || 'bg-white';
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 Demandes d'interventions</h1>
        <p className="text-gray-600">Gérez les demandes des utilisateurs anonymes</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 font-semibold">Nouvelles</p>
          <p className="text-3xl font-bold text-blue-600">{stats.nouvelle || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600 font-semibold">En examen</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.examinee || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 font-semibold">Acceptées</p>
          <p className="text-3xl font-bold text-green-600">{stats.acceptee || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-emerald-600">
          <p className="text-sm text-gray-600 font-semibold">Converties</p>
          <p className="text-3xl font-bold text-emerald-600">{stats.convertie || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-600 font-semibold">Rejetées</p>
          <p className="text-3xl font-bold text-red-600">{stats.rejetee || 0}</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex gap-4 flex-wrap items-end">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Statut</label>
          <select
            value={filtreStatut}
            onChange={(e) => setFiltreStatut(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tous les statuts</option>
            <option value="nouvelle">Nouvelle</option>
            <option value="examinee">En examen</option>
            <option value="acceptee">Acceptée</option>
            <option value="convertie">Convertie</option>
            <option value="rejetee">Rejetée</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Priorité</label>
          <select
            value={filtrePriorite}
            onChange={(e) => setFiltrePriorite(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Toutes les priorités</option>
            <option value="basse">🟢 Basse</option>
            <option value="moyenne">🟡 Moyenne</option>
            <option value="haute">🔴 Haute</option>
          </select>
        </div>

        <button
          onClick={loadDemandes}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center gap-2"
        >
          🔄 Actualiser
        </button>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 flex items-center justify-center gap-2">
            <div className="animate-spin">⌛</div>
            Chargement...
          </div>
        ) : demandes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            Aucune demande trouvée
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Référence</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Équipement</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Lieu</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Priorité</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {demandes.map(demande => (
                  <tr key={demande._id} className={`hover:bg-gray-50 transition ${getStatusColor(demande.statut)}`}>
                    <td className="px-6 py-4 font-mono font-semibold text-blue-600 text-sm">
                      {demande.numeroReference}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-semibold">
                      {demande.equipement}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {demande.lieu}
                    </td>
                    <td className="px-6 py-4">
                      {getPriorityBadge(demande.priorite)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(demande.statut)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-700 mb-1">
                        <Mail className="w-4 h-4" />
                        <span>{demande.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 text-xs">
                        <Phone className="w-4 h-4" />
                        <span>{demande.telephone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(demande.dateCreation).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedDemande(demande);
                            setModalMode('view');
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {demande.statut === 'nouvelle' && (
                          <button
                            onClick={() => handleExaminer(demande._id)}
                            className="text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 p-2 rounded transition"
                            title="Marquer comme examinée"
                          >
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        )}
                        {demande.statut === 'examinee' && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedDemande(demande);
                                setModalMode('convertir');
                                setShowModal(true);
                              }}
                              className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded transition"
                              title="Convertir en intervention"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedDemande(demande);
                                setModalMode('rejeter');
                                setMotifRejet('');
                                setShowModal(true);
                              }}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition"
                              title="Rejeter"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedDemande && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {modalMode === 'view' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Eye className="w-6 h-6" />
                  Détails de la demande
                </h2>

                <div className="space-y-6 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Numéro de référence</p>
                        <p className="text-2xl font-mono font-bold text-blue-600">{selectedDemande.numeroReference}</p>
                      </div>
                      <div>
                        {getStatusBadge(selectedDemande.statut)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 font-semibold mb-1">Équipement</p>
                      <p className="text-lg font-semibold text-gray-800">{selectedDemande.equipement}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 font-semibold mb-1">Lieu</p>
                      <p className="text-lg font-semibold text-gray-800">{selectedDemande.lieu}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 font-semibold mb-1">Priorité</p>
                      {getPriorityBadge(selectedDemande.priorite)}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 font-semibold mb-1">Date de création</p>
                      <p className="text-gray-800">{new Date(selectedDemande.dateCreation).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 font-semibold mb-1 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </p>
                      <p className="text-gray-800">{selectedDemande.email}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 font-semibold mb-1 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Téléphone
                      </p>
                      <p className="text-gray-800">{selectedDemande.telephone}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-2">Description du problème</p>
                    <div className="bg-gray-50 p-4 rounded-lg text-gray-700 leading-relaxed">
                      {selectedDemande.description}
                    </div>
                  </div>

                  {selectedDemande.notes && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                      <p className="text-sm font-semibold text-blue-700 mb-1">📝 Notes de l'administration:</p>
                      <p className="text-blue-600">{selectedDemande.notes}</p>
                    </div>
                  )}

                  {selectedDemande.statut === 'rejetee' && selectedDemande.motifRejet && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <p className="text-sm font-semibold text-red-700 mb-1">❌ Motif du rejet:</p>
                      <p className="text-red-600">{selectedDemande.motifRejet}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  Fermer
                </button>
              </div>
            )}

            {modalMode === 'convertir' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Send className="w-6 h-6 text-green-600" />
                  Convertir en intervention
                </h2>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
                  <p className="text-gray-800 font-semibold mb-4">
                    Êtes-vous sûr de vouloir convertir cette demande en intervention?
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-800">Numéro:</span> {selectedDemande.numeroReference}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-800">Équipement:</span> {selectedDemande.equipement}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-800">Lieu:</span> {selectedDemande.lieu}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-800">Priorité:</span> {selectedDemande.priorite}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  ✅ Une notification d'acceptation sera envoyée au demandeur à l'adresse email et téléphone fournis.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    disabled={convertLoading}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleConvertir}
                    disabled={convertLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    {convertLoading ? '⏳ Conversion...' : (
                      <>
                        <Send className="w-4 h-4" />
                        Convertir
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {modalMode === 'rejeter' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <XCircle className="w-6 h-6 text-red-600" />
                  Rejeter la demande
                </h2>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
                  <p className="text-gray-800 font-semibold mb-2">
                    Demande: {selectedDemande.numeroReference}
                  </p>
                  <p className="text-sm text-gray-600">
                    Veuillez indiquer le motif du rejet (sera notifié au demandeur par email)
                  </p>
                </div>

                <textarea
                  value={motifRejet}
                  onChange={(e) => setMotifRejet(e.target.value)}
                  placeholder="Ex: Équipement incompatible, service non disponible, double demande..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  rows="4"
                  disabled={rejectLoading}
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    disabled={rejectLoading}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleRejeter}
                    disabled={rejectLoading}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                  >
                                        {rejectLoading ? '⏳ Rejet...' : (
                      <>
                        <XCircle className="w-4 h-4" />
                        Rejeter
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DemandesView;