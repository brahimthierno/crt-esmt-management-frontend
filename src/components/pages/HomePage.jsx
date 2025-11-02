import React from 'react';
import { FileText, Search, LogIn, Wrench, Clock, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">CRT-ESMT</h1>
              <p className="text-sm text-gray-600">Centre des Ressources Techniques</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            <LogIn className="w-5 h-5" />
            Se connecter
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Bienvenue au CRT-ESMT
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Demandez une intervention technique facilement et suivez votre demande en temps réel
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
        </div>

        {/* Cartes principales */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Carte 1 : Demander une intervention */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 cursor-pointer group"
            onClick={() => navigate('/demande-anonyme')}>
            <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Demander une intervention
            </h3>
            <p className="text-gray-600 mb-6">
              Remplissez un formulaire simple pour signaler un problème technique
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Aucune inscription requise</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Numéro de référence automatique</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Confirmation par email</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Faire une demande
            </button>
          </div>

          {/* Carte 2 : Suivre une demande */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 cursor-pointer group"
            onClick={() => navigate('/suivi-demande')}>
            <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-200 transition">
              <Search className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Suivre ma demande
            </h3>
            <p className="text-gray-600 mb-6">
              Consultez l'état de votre demande en utilisant votre numéro de référence
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>État en temps réel</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Notifications par email</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Informations détaillées</span>
              </div>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              Suivre
            </button>
          </div>

          {/* Carte 3 : Connexion Admin */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 cursor-pointer group"
            onClick={() => navigate('/login')}>
            <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-200 transition">
              <LogIn className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Espace administrateur
            </h3>
            <p className="text-gray-600 mb-6">
              Connectez-vous pour gérer les interventions et les demandes
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span>Gestion complète</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span>Vue d'ensemble</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span>Prise de décision rapide</span>
              </div>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" />
              Se connecter
            </button>
          </div>
        </div>

        {/* Section processus */}
        <section className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Comment ça marche ?
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Étape 1 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Étape 1</h4>
              <p className="text-gray-600 text-sm">
                Remplissez le formulaire avec les détails de votre problème
              </p>
            </div>

            {/* Flèche */}
            <div className="flex items-center justify-center">
              <div className="hidden md:block text-2xl text-gray-400">→</div>
            </div>

            {/* Étape 2 */}
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Étape 2</h4>
              <p className="text-gray-600 text-sm">
                Recevez un numéro de référence par email immédiatement
              </p>
            </div>

            {/* Flèche */}
            <div className="flex items-center justify-center">
              <div className="hidden md:block text-2xl text-gray-400">→</div>
            </div>

            {/* Étape 3 */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Étape 3</h4>
              <p className="text-gray-600 text-sm">
                Un technicien vous contactera pour programmer l'intervention
              </p>
            </div>
          </div>
        </section>

        {/* Section FAQ */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-12 text-white">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Questions fréquentes
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-2">❓ Qui peut faire une demande ?</h4>
              <p className="text-blue-100">
                Tous les utilisateurs de l'ESMT peuvent faire une demande sans inscription préalable.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">⏱️ Combien de temps pour une réponse ?</h4>
              <p className="text-blue-100">
                Vous recevrez une réponse dans les 24 à 48 heures selon l'urgence.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">📞 Et si j'ai une urgence ?</h4>
              <p className="text-blue-100">
                Sélectionnez "Haute" comme priorité et incluez "URGENT" dans votre description.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">📧 Comment suivre ma demande ?</h4>
              <p className="text-blue-100">
                Utilisez le numéro de référence reçu par email pour consulter l'état de votre demande.
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold mb-4">À propos</h4>
              <p className="text-gray-400 text-sm">
                Le CRT-ESMT est le centre des ressources techniques de l'ESMT Dakar.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">
                📧 support@esmt.sn<br/>
                📞 +221 77 123 4567
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Heures d'ouverture</h4>
              <p className="text-gray-400 text-sm">
                Lundi - Vendredi: 08:00 - 17:00<br/>
                Samedi - Dimanche: Fermé
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 CRT-ESMT. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;