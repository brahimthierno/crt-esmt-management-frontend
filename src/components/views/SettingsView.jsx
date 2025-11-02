
// NOUVELLE VERSION SettingsView.jsx (Frontend - Nettoyé) SANS LA PARTIE PROFIL DE LUTILSATEUR

import React, { useState, useEffect } from 'react';
import { Bell, Settings, Clock, Tag, Database, LogOut, Save, X, ArrowLeft } from 'lucide-react';

const SettingsView = ({ currentUser, onLogout, setActiveView }) => {
  const [activeTab, setActiveTab] = useState('app');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // État pour Paramètres Généraux
  const [appSettings, setAppSettings] = useState({
    nomApp: 'CRT-ESMT',
    description: 'Centre des Ressources Techniques',
    couleurPrimaire: '#2563eb',
    couleurSecondaire: '#10b981',
    logo: null
  });

  // État pour Notifications
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    emailDemandes: true,
    emailInterventions: true,
    smsNotifications: false,
    smsPhone: ''
  });

  // État pour Horaires
  const [horaires, setHoraires] = useState({
    lundi: { ouvert: true, ouverture: '08:00', fermeture: '17:00' },
    mardi: { ouvert: true, ouverture: '08:00', fermeture: '17:00' },
    mercredi: { ouvert: true, ouverture: '08:00', fermeture: '17:00' },
    jeudi: { ouvert: true, ouverture: '08:00', fermeture: '17:00' },
    vendredi: { ouvert: true, ouverture: '08:00', fermeture: '17:00' },
    samedi: { ouvert: false, ouverture: '09:00', fermeture: '13:00' },
    dimanche: { ouvert: false, ouverture: '', fermeture: '' }
  });

  // État pour Catégories
  const [categories, setCategories] = useState([
    { id: 1, nom: 'Informatique', couleur: '#3b82f6' },
    { id: 2, nom: 'Électricité', couleur: '#f59e0b' }
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#3b82f6');

  // État pour SLA
  const [sla, setSla] = useState({
    basse: 48,
    moyenne: 24,
    haute: 4
  });

  // État pour Backup
  const [backupStatus, setBackupStatus] = useState({
    lastBackup: '2025-10-30 10:30',
    backupSize: '245 MB',
    autoBackup: true,
    backupFrequency: 'daily'
  });

  // Charger les paramètres au montage
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/settings');
      if (response.ok) {
        const data = await response.json();
        console.log('Paramètres chargés:', data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sauvegarder les paramètres généraux
  const handleSaveAppSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch('http://localhost:5000/api/settings/app', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appSettings)
      });

      if (response.ok) {
        setMessage('✅ Paramètres généraux mis à jour');
      } else {
        setMessage('❌ Erreur lors de la sauvegarde');
      }
    } catch (error) {
      setMessage('❌ Erreur: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Sauvegarder les notifications
  const handleSaveNotifications = async () => {
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:5000/api/settings/notifications/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notifications)
      });

      if (response.ok) {
        setMessage('✅ Paramètres de notifications mis à jour');
      } else {
        setMessage('❌ Erreur lors de la sauvegarde');
      }
    } catch (error) {
      setMessage('❌ Erreur: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Ajouter une catégorie
  const addCategory = async () => {
    if (!newCategory.trim()) {
      setMessage('❌ Veuillez entrer un nom de catégorie');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/settings/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: newCategory, couleur: newCategoryColor })
      });

      if (response.ok) {
        const data = await response.json();
        setCategories([...categories, data.category]);
        setNewCategory('');
        setMessage('✅ Catégorie ajoutée');
      }
    } catch (error) {
      setMessage('❌ Erreur: ' + error.message);
    }
  };

  // Supprimer une catégorie
  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/settings/categories/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setCategories(categories.filter(c => c.id !== id));
        setMessage('✅ Catégorie supprimée');
      }
    } catch (error) {
      setMessage('❌ Erreur: ' + error.message);
    }
  };

  // Sauvegarder les SLA
  const handleSaveSLA = async () => {
    setSaving(true);
    try {
      const response = await fetch('http://localhost:5000/api/settings/sla', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sla)
      });

      if (response.ok) {
        setMessage('✅ SLA sauvegardés');
      } else {
        setMessage('❌ Erreur lors de la sauvegarde');
      }
    } catch (error) {
      setMessage('❌ Erreur: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Sauvegarder les horaires
  const handleSaveHoraires = async () => {
    setSaving(true);
    try {
      const response = await fetch('http://localhost:5000/api/settings/horaires', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(horaires)
      });

      if (response.ok) {
        setMessage('✅ Horaires sauvegardés');
      } else {
        setMessage('❌ Erreur lors de la sauvegarde');
      }
    } catch (error) {
      setMessage('❌ Erreur: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Effectuer un backup
  const handleBackup = async () => {
    setSaving(true);
    try {
      const response = await fetch('http://localhost:5000/api/settings/backup', {
        method: 'POST'
      });

      if (response.ok) {
        setMessage('✅ Backup effectué avec succès');
        setBackupStatus({
          ...backupStatus,
          lastBackup: new Date().toLocaleString('fr-FR')
        });
      } else {
        setMessage('❌ Erreur lors du backup');
      }
    } catch (error) {
      setMessage('❌ Erreur: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveView('dashboard')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour
              </button>
              <h1 className="text-3xl font-bold text-gray-800">⚙️ Paramètres</h1>
            </div>
          </div>

          {message && (
            <div className={`p-3 rounded flex items-center justify-between ${
              message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              <span>{message}</span>
              <button onClick={() => setMessage('')}>
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('app')}
              className={`py-4 px-2 border-b-2 font-semibold flex items-center gap-2 transition ${
                activeTab === 'app'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <Settings className="w-5 h-5" />
              Général
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-2 border-b-2 font-semibold flex items-center gap-2 transition ${
                activeTab === 'notifications'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <Bell className="w-5 h-5" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('horaires')}
              className={`py-4 px-2 border-b-2 font-semibold flex items-center gap-2 transition ${
                activeTab === 'horaires'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <Clock className="w-5 h-5" />
              Horaires
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-4 px-2 border-b-2 font-semibold flex items-center gap-2 transition ${
                activeTab === 'categories'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <Tag className="w-5 h-5" />
              Catégories
            </button>
            <button
              onClick={() => setActiveTab('sla')}
              className={`py-4 px-2 border-b-2 font-semibold flex items-center gap-2 transition ${
                activeTab === 'sla'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <Clock className="w-5 h-5" />
              SLA
            </button>
            <button
              onClick={() => setActiveTab('backup')}
              className={`py-4 px-2 border-b-2 font-semibold flex items-center gap-2 transition ${
                activeTab === 'backup'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <Database className="w-5 h-5" />
              Backup
            </button>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* TAB: PARAMÈTRES GÉNÉRAUX */}
        {activeTab === 'app' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Paramètres Généraux</h2>
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom de l'application</label>
                <input
                  type="text"
                  value={appSettings.nomApp}
                  onChange={(e) => setAppSettings({ ...appSettings, nomApp: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={appSettings.description}
                  onChange={(e) => setAppSettings({ ...appSettings, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Couleur primaire</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={appSettings.couleurPrimaire}
                      onChange={(e) => setAppSettings({ ...appSettings, couleurPrimaire: e.target.value })}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={appSettings.couleurPrimaire}
                      onChange={(e) => setAppSettings({ ...appSettings, couleurPrimaire: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Couleur secondaire</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={appSettings.couleurSecondaire}
                      onChange={(e) => setAppSettings({ ...appSettings, couleurSecondaire: e.target.value })}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={appSettings.couleurSecondaire}
                      onChange={(e) => setAppSettings({ ...appSettings, couleurSecondaire: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveAppSettings}
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        )}

        {/* TAB: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Paramètres de Notifications</h2>
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotif"
                    checked={notifications.emailNotifications}
                    onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="emailNotif" className="ml-3 text-sm font-semibold text-gray-700">
                    Recevoir les notifications par email
                  </label>
                </div>

                {notifications.emailNotifications && (
                  <div className="ml-8 space-y-2 text-sm">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailDemandes"
                        checked={notifications.emailDemandes}
                        onChange={(e) => setNotifications({ ...notifications, emailDemandes: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <label htmlFor="emailDemandes" className="ml-3 text-gray-600">
                        Notifications des demandes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailInterventions"
                        checked={notifications.emailInterventions}
                        onChange={(e) => setNotifications({ ...notifications, emailInterventions: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <label htmlFor="emailInterventions" className="ml-3 text-gray-600">
                        Notifications des interventions
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smsNotif"
                    checked={notifications.smsNotifications}
                    onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="smsNotif" className="ml-3 text-sm font-semibold text-gray-700">
                    Recevoir les notifications par SMS
                  </label>
                </div>

                {notifications.smsNotifications && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Numéro de téléphone</label>
                    <input
                      type="tel"
                      value={notifications.smsPhone}
                      onChange={(e) => setNotifications({ ...notifications, smsPhone: e.target.value })}
                      placeholder="+221 77 XXX XXXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={handleSaveNotifications}
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        )}

        {/* TAB: HORAIRES */}
        {activeTab === 'horaires' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Horaires d'ouverture du CRT</h2>
            <div className="space-y-4 max-w-2xl">
              {Object.entries(horaires).map(([jour, hours]) => (
                <div key={jour} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-24 font-semibold text-gray-700 capitalize">{jour}</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hours.ouvert}
                      onChange={(e) => setHoraires({
                        ...horaires,
                        [jour]: { ...hours, ouvert: e.target.checked }
                      })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-600">Ouvert</span>
                  </div>
                  {hours.ouvert && (
                    <div className="flex gap-2">
                      <input
                        type="time"
                        value={hours.ouverture}
                        onChange={(e) => setHoraires({
                          ...horaires,
                          [jour]: { ...hours, ouverture: e.target.value }
                        })}
                        className="px-3 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-gray-600">-</span>
                      <input
                        type="time"
                        value={hours.fermeture}
                        onChange={(e) => setHoraires({
                          ...horaires,
                          [jour]: { ...hours, fermeture: e.target.value }
                        })}
                        className="px-3 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={handleSaveHoraires}
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg mt-6 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        )}

        {/* TAB: CATÉGORIES */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Catégories de problèmes</h2>
            <div className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                {categories.map(cat => (
                  <div key={cat.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: cat.couleur }}
                      />
                      <span className="font-semibold text-gray-700">{cat.nom}</span>
                    </div>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-semibold"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-700 mb-4">Ajouter une catégorie</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Ex: Plomberie"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Couleur</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={newCategoryColor}
                        onChange={(e) => setNewCategoryColor(e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={newCategoryColor}
                        onChange={(e) => setNewCategoryColor(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <button
                    onClick={addCategory}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    + Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SLA */}
        {activeTab === 'sla' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">SLA - Délais de réponse</h2>
            <div className="space-y-6 max-w-2xl">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-700">
                  <strong>SLA (Service Level Agreement)</strong> : Définissez les délais de réponse attendus pour chaque niveau de priorité.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🟢 Priorité Basse (heures)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={sla.basse}
                    onChange={(e) => setSla({ ...sla, basse: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Délai attendu: {sla.basse} heures</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🟡 Priorité Moyenne (heures)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={sla.moyenne}
                    onChange={(e) => setSla({ ...sla, moyenne: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Délai attendu: {sla.moyenne} heures</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🔴 Priorité Haute (heures)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={sla.haute}
                    onChange={(e) => setSla({ ...sla, haute: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Délai attendu: {sla.haute} heures</p>
                </div>
              </div>

              <button
                onClick={handleSaveSLA}
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        )}

        {/* TAB: BACKUP */}
        {activeTab === 'backup' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sauvegarde et Données</h2>
            <div className="space-y-6 max-w-2xl">
              {/* État du backup */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm text-gray-600 mb-1">Dernier backup</p>
                  <p className="text-lg font-semibold text-gray-800">{backupStatus.lastBackup}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-600 mb-1">Taille</p>
                  <p className="text-lg font-semibold text-gray-800">{backupStatus.backupSize}</p>
                </div>
              </div>

              {/* Options de backup */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-700 mb-4">Options de sauvegarde automatique</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoBackup"
                      checked={backupStatus.autoBackup}
                      onChange={(e) => setBackupStatus({ ...backupStatus, autoBackup: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="autoBackup" className="ml-3 text-sm font-semibold text-gray-700">
                      Activer les sauvegardes automatiques
                    </label>
                  </div>

                  {backupStatus.autoBackup && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Fréquence</label>
                      <select
                        value={backupStatus.backupFrequency}
                        onChange={(e) => setBackupStatus({ ...backupStatus, backupFrequency: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="daily">Quotidienne</option>
                        <option value="weekly">Hebdomadaire</option>
                        <option value="monthly">Mensuelle</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="border-t pt-6 space-y-3">
                <button
                  onClick={handleBackup}
                  disabled={saving}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  <Database className="w-5 h-5" />
                  {saving ? 'Backup en cours...' : 'Effectuer un backup maintenant'}
                </button>

                <button
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  📥 Télécharger le dernier backup
                </button>

                <button
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  🗑️ Restaurer à partir d'une sauvegarde
                </button>
              </div>

              {/* Informations */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="text-sm text-yellow-700">
                  <strong>⚠️ Important:</strong> Les sauvegardes incluent toutes vos données (interventions, demandes, utilisateurs, paramètres). Effectuez régulièrement des sauvegardes pour éviter les pertes de données.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsView;