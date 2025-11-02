import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Phone, Mail } from 'lucide-react';

const DemandeAnonymePage = () => {
  const [formData, setFormData] = useState({
    lieu: '',
    equipement: '',
    description: '',
    priorite: 'moyenne',
    email: '',
    telephone: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [numeroReference, setNumeroReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/demandes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setNumeroReference(data.numeroReference);
        setSubmitted(true);
        setFormData({
          lieu: '',
          equipement: '',
          description: '',
          priorite: 'moyenne',
          email: '',
          telephone: ''
        });
      } else {
        setError(data.message || 'Erreur lors de la création');
      }
    } catch (err) {
      setError('Erreur serveur: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Demande reçue!</h1>
            <p className="text-gray-600">Merci d'avoir soumis votre demande d'intervention</p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Votre numéro de référence:</p>
            <p className="text-2xl font-bold text-blue-600 font-mono">{numeroReference}</p>
            <p className="text-xs text-gray-500 mt-2">Conservez ce numéro pour suivre votre demande</p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">✅ Confirmation envoyée</span> à votre email
            </p>
            <p className="text-xs text-gray-600">Un technicien vous contactera au numéro fourni</p>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              window.location.href = '/';
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Retour à l'accueil
          </button>

          <button
            onClick={() => setSubmitted(false)}
            className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded transition"
          >
            Nouvelle demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Demander une intervention</h1>
          <p className="text-gray-600">Remplissez le formulaire ci-dessous pour signaler un problème</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lieu */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lieu de l'intervention *
              </label>
              <input
                type="text"
                name="lieu"
                value={formData.lieu}
                onChange={handleChange}
                placeholder="Ex: Bureau 2, Labo informatique..."
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Équipement */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Équipement concerné *
              </label>
              <input
                type="text"
                name="equipement"
                value={formData.equipement}
                onChange={handleChange}
                placeholder="Ex: Ordinateur, Imprimante, Climatisation..."
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description du problème *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez en détail le problème rencontré..."
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Priorité */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Niveau d'urgence
              </label>
              <select
                name="priorite"
                value={formData.priorite}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="basse">🟢 Basse (peut attendre)</option>
                <option value="moyenne">🟡 Moyenne (rapidement)</option>
                <option value="haute">🔴 Haute (urgent)</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre.email@example.com"
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Téléphone *
              </label>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="+221 77 XXX XXXX"
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Bouton Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center"
            >
              {loading ? 'Envoi en cours...' : '✉️ Soumettre ma demande'}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            * Champs obligatoires. Vous recevrez un email de confirmation avec votre numéro de référence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemandeAnonymePage;