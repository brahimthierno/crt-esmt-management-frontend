
// NOUVELLE VERSION AVEC CLAUDE EN AJOUTANT LE TOKEN


import React, { useState } from 'react';
import { User, Lock, Save, X, ArrowLeft } from 'lucide-react';

const ProfileView = ({ currentUser, onLogout, setActiveView, onProfileUpdate }) => {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [profile, setProfile] = useState({
    nom: currentUser?.nom || '',
    prenom: currentUser?.prenom || '',
    username: currentUser?.username || '',
    password: '',
    passwordConfirm: ''
  });

  // Sauvegarder le profil
  const handleSaveProfile = async () => {
    if (profile.password && profile.password !== profile.passwordConfirm) {
      setMessage('❌ Les mots de passe ne correspondent pas');
      return;
    }

    setSaving(true);
    try {
      console.log('📝 Envoi du profil:', profile);
      
      // Récupérer le token depuis localStorage
      const token = localStorage.getItem('token');
      
      // ✅ UTILISER LA ROUTE /api/users/:id AVEC LE TOKEN
      const response = await fetch(`http://localhost:5000/api/users/${currentUser._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      console.log('📡 Réponse du serveur - Status:', response.status);

      if (response.ok) {
        console.log('✅ Réponse OK du serveur');
        const data = await response.json();
        console.log('📦 Données reçues:', data);
        
        setMessage('✅ Profil mis à jour avec succès');
        setProfile({ ...profile, password: '', passwordConfirm: '' });
        
        // Recharger les données
        if (onProfileUpdate) {
          console.log('🔄 Appel de onProfileUpdate');
          setTimeout(async () => {
            console.log('⏱️ Attente terminée, appel du callback');
            await onProfileUpdate();
            console.log('✅ onProfileUpdate terminé');
          }, 500);
        } else {
          console.log('❌ onProfileUpdate n\'existe pas');
        }
      } else {
        console.log('❌ Réponse non OK:', response.status);
        const errorData = await response.json();
        console.log('❌ Erreur du serveur:', errorData);
        setMessage('❌ Erreur lors de la sauvegarde: ' + (errorData.message || 'Erreur inconnue'));
      }
    } catch (error) {
      console.log('❌ Erreur fetch:', error);
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
              <h1 className="text-3xl font-bold text-gray-800">👤 Mon Profil</h1>
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

      {/* Contenu */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Avatar et infos générales */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-4xl">
              {currentUser?.nom?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {currentUser?.prenom} {currentUser?.nom}
              </h2>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Rôle:</span> 
                <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {currentUser?.role}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">ID:</span> {currentUser?._id}
              </p>
            </div>
          </div>

          {/* Formulaire de modification */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Modifier mes informations</h3>

            {/* Nom et Prénom */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nom
                </label>
                <input
                  type="text"
                  value={profile.nom}
                  onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Prénom
                </label>
                <input
                  type="text"
                  value={profile.prenom}
                  onChange={(e) => setProfile({ ...profile, prenom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Nom d'utilisateur
              </label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Section Sécurité */}
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Sécurité
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={profile.password}
                    onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                    placeholder="Laisser vide pour ne pas changer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    ℹ️ Laissez vide si vous ne voulez pas changer votre mot de passe
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    value={profile.passwordConfirm}
                    onChange={(e) => setProfile({ ...profile, passwordConfirm: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3 pt-6 border-t">
              <button
                onClick={() => setActiveView('dashboard')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Annuler
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
              </button>
            </div>
          </div>

          {/* Info footer */}
          <div className="mt-8 pt-8 border-t">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-blue-700">
                <strong>ℹ️ Info:</strong> Les modifications apportées à votre profil seront sauvegardées immédiatement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;