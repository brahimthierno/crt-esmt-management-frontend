// import React from 'react';
// import { FileText, Search, LogIn, Wrench, Clock, CheckCircle } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-600 p-3 rounded-lg">
//               <Wrench className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">CRT-ESMT</h1>
//               <p className="text-sm text-gray-600">Centre des Ressources Techniques</p>
//             </div>
//           </div>
//           <button
//             onClick={() => navigate('/login')}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
//           >
//             <LogIn className="w-5 h-5" />
//             Se connecter
//           </button>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="max-w-6xl mx-auto px-4 py-16">
//         <div className="text-center mb-16">
//           <h2 className="text-5xl font-bold text-gray-800 mb-4">
//             Bienvenue au CRT-ESMT
//           </h2>
//           <p className="text-xl text-gray-600 mb-8">
//             Demandez une intervention technique facilement et suivez votre demande en temps réel
//           </p>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
//         </div>

//         {/* Cartes principales */}
//         <div className="grid md:grid-cols-3 gap-8 mb-16">
//           {/* Carte 1 : Demander une intervention */}
//           <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 cursor-pointer group"
//             onClick={() => navigate('/demande-anonyme')}>
//             <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition">
//               <FileText className="w-8 h-8 text-blue-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-3">
//               Demander une intervention
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Remplissez un formulaire simple pour signaler un problème technique
//             </p>
//             <div className="space-y-2 mb-6">
//               <div className="flex items-center gap-2 text-sm text-gray-700">
//                 <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                 <span>Aucune inscription requise</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-700">
//                 <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                 <span>Numéro de référence automatique</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-700">
//                 <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                 <span>Confirmation par email</span>
//               </div>
//             </div>
//             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
//               <FileText className="w-4 h-4" />
//               Faire une demande
//             </button>
//           </div>

//           {/* Carte 2 : Suivre une demande */}
//           <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 cursor-pointer group"
//             onClick={() => navigate('/suivi-demande')}>
//             <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-200 transition">
//               <Search className="w-8 h-8 text-green-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-3">
//               Suivre ma demande
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Consultez l'état de votre demande en utilisant votre numéro de référence
//             </p>
//             <div className="space-y-2 mb-6">
//               <div className="flex items-center gap-2 text-sm text-gray-700">
//                 <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//                 <span>État en temps réel</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-700">
//                 <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//                 <span>Notifications par email</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-700">
//                 <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//                 <span>Informations détaillées</span>
//               </div>
//             </div>
//             <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
//               <Search className="w-4 h-4" />
//               Suivre
//             </button>
//           </div>

//           {/* Carte 3 : Connexion Admin */}
//           <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 cursor-pointer group"
//             onClick={() => navigate('/login')}>
//             <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-200 transition">
//               <LogIn className="w-8 h-8 text-purple-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-3">
//               Espace administrateur
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Connectez-vous pour gérer les interventions et les demandes
//             </p>
//             <div className="space-y-2 mb-6">
//               <div className="flex items-center gap-2 text-sm text-gray-700">
//                 <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
//                 <span>Gestion complète</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-700">
//                 <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
//                 <span>Vue d'ensemble</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-700">
//                 <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
//                 <span>Prise de décision rapide</span>
//               </div>
//             </div>
//             <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
//               <LogIn className="w-4 h-4" />
//               Se connecter
//             </button>
//           </div>
//         </div>

//         {/* Section processus */}
//         <section className="bg-white rounded-lg shadow-lg p-12 mb-16">
//           <h3 className="text-3xl font-bold text-gray-800 mb-12 text-center">
//             Comment ça marche ?
//           </h3>
//           <div className="grid md:grid-cols-4 gap-8">
//             {/* Étape 1 */}
//             <div className="text-center">
//               <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FileText className="w-8 h-8 text-blue-600" />
//               </div>
//               <h4 className="text-lg font-bold text-gray-800 mb-2">Étape 1</h4>
//               <p className="text-gray-600 text-sm">
//                 Remplissez le formulaire avec les détails de votre problème
//               </p>
//             </div>

//             {/* Flèche */}
//             <div className="flex items-center justify-center">
//               <div className="hidden md:block text-2xl text-gray-400">→</div>
//             </div>

//             {/* Étape 2 */}
//             <div className="text-center">
//               <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Clock className="w-8 h-8 text-yellow-600" />
//               </div>
//               <h4 className="text-lg font-bold text-gray-800 mb-2">Étape 2</h4>
//               <p className="text-gray-600 text-sm">
//                 Recevez un numéro de référence par email immédiatement
//               </p>
//             </div>

//             {/* Flèche */}
//             <div className="flex items-center justify-center">
//               <div className="hidden md:block text-2xl text-gray-400">→</div>
//             </div>

//             {/* Étape 3 */}
//             <div className="text-center">
//               <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//               </div>
//               <h4 className="text-lg font-bold text-gray-800 mb-2">Étape 3</h4>
//               <p className="text-gray-600 text-sm">
//                 Un technicien vous contactera pour programmer l'intervention
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Section FAQ */}
//         <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-12 text-white">
//           <h3 className="text-3xl font-bold mb-8 text-center">
//             Questions fréquentes
//           </h3>
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <h4 className="text-lg font-bold mb-2">❓ Qui peut faire une demande ?</h4>
//               <p className="text-blue-100">
//                 Tous les utilisateurs de l'ESMT peuvent faire une demande sans inscription préalable.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-lg font-bold mb-2">⏱️ Combien de temps pour une réponse ?</h4>
//               <p className="text-blue-100">
//                 Vous recevrez une réponse dans les 24 à 48 heures selon l'urgence.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-lg font-bold mb-2">📞 Et si j'ai une urgence ?</h4>
//               <p className="text-blue-100">
//                 Sélectionnez "Haute" comme priorité et incluez "URGENT" dans votre description.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-lg font-bold mb-2">📧 Comment suivre ma demande ?</h4>
//               <p className="text-blue-100">
//                 Utilisez le numéro de référence reçu par email pour consulter l'état de votre demande.
//               </p>
//             </div>
//           </div>
//         </section>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white mt-16">
//         <div className="max-w-6xl mx-auto px-4 py-12">
//           <div className="grid md:grid-cols-3 gap-8 mb-8">
//             <div>
//               <h4 className="text-lg font-bold mb-4">À propos</h4>
//               <p className="text-gray-400 text-sm">
//                 Le CRT-ESMT est le centre des ressources techniques de l'ESMT Dakar.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-lg font-bold mb-4">Contact</h4>
//               <p className="text-gray-400 text-sm">
//                 📧 support@esmt.sn<br/>
//                 📞 +221 77 123 4567
//               </p>
//             </div>
//             <div>
//               <h4 className="text-lg font-bold mb-4">Heures d'ouverture</h4>
//               <p className="text-gray-400 text-sm">
//                 Lundi - Vendredi: 08:00 - 17:00<br/>
//                 Samedi - Dimanche: Fermé
//               </p>
//             </div>
//           </div>
//           <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
//             <p>&copy; 2025 CRT-ESMT. Tous droits réservés.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;



// NOUVELLE VERSION CLAUDE AVEC AJOUT D'UNE IMAGE DE FOND ET AMELIORATION DU DESIGN


// import React from 'react';
// import { FileText, Search, LogIn, Wrench, Clock, CheckCircle } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen relative">
//       {/* Image de fond */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
//         style={{ backgroundImage: "url('https://th.bing.com/th/id/OIP.l65-rCdwNiWV3TjkQGVg-AHaFj?w=273&h=205&c=7&r=0&o=7&pid=1.7&rm=3')" }}
//       ></div>
      
//       {/* Dégradé par-dessus l'image */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80"></div>
      
//       {/* Contenu principal */}
//       <div className="relative z-10">
//         {/* Header */}
//         <header className="bg-white shadow-sm">
//           <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               <div className="bg-blue-600 p-3 rounded-lg">
//                 <Wrench className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">CRT-ESMT</h1>
//                 <p className="text-sm text-gray-600">Centre des Ressources Techniques</p>
//               </div>
//             </div>
//             <button
//               onClick={() => navigate('/login')}
//               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
//             >
//               <LogIn className="w-5 h-5" />
//               Se connecter
//             </button>
//           </div>
//         </header>

//         {/* Hero Section */}
//         <section className="max-w-6xl mx-auto px-4 py-16">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-bold text-gray-800 mb-4">
//               Bienvenue au CRT-ESMT
//             </h2>
//             <p className="text-xl text-gray-600 mb-8">
//               Demandez une intervention technique facilement et suivez votre demande en temps réel
//             </p>
//             <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
//           </div>

//           {/* Cartes principales */}
//           <div className="grid md:grid-cols-3 gap-8 mb-16">
//             {/* Carte 1 : Demander une intervention */}
//             <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 cursor-pointer group"
//               onClick={() => navigate('/demande-anonyme')}>
//               <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition">
//                 <FileText className="w-8 h-8 text-blue-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-3">
//                 Demander une intervention
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Remplissez un formulaire simple pour signaler un problème technique
//               </p>
//               <div className="space-y-2 mb-6">
//                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                   <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                   <span>Aucune inscription requise</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                   <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                   <span>Numéro de référence automatique</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                   <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
//                   <span>Confirmation par email</span>
//                 </div>
//               </div>
//               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
//                 <FileText className="w-4 h-4" />
//                 Faire une demande
//               </button>
//             </div>

//             {/* Carte 2 : Suivre une demande */}
//             <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 cursor-pointer group"
//               onClick={() => navigate('/suivi-demande')}>
//               <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-200 transition">
//                 <Search className="w-8 h-8 text-green-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-3">
//                 Suivre ma demande
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Consultez l'état de votre demande en utilisant votre numéro de référence
//               </p>
//               <div className="space-y-2 mb-6">
//                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                   <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//                   <span>État en temps réel</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                   <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//                   <span>Notifications par email</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                   <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//                   <span>Informations détaillées</span>
//                 </div>
//               </div>
//               <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
//                 <Search className="w-4 h-4" />
//                 Suivre
//               </button>
//             </div>

//             {/* Carte 3 : Connexion Admin */}
//             <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 cursor-pointer group"
//               onClick={() => navigate('/login')}>
//               <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-200 transition">
//                 <LogIn className="w-8 h-8 text-purple-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-3">
//                 Espace administrateur
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Connectez-vous pour gérer les interventions et les demandes
//               </p>
//               <div className="space-y-2 mb-6">
//                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                   <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
//                   <span>Gestion complète</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                   <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
//                   <span>Vue d'ensemble</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                   <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
//                   <span>Prise de décision rapide</span>
//                 </div>
//               </div>
//               <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
//                 <LogIn className="w-4 h-4" />
//                 Se connecter
//               </button>
//             </div>
//           </div>

//           {/* Section processus */}
//           <section className="bg-white rounded-lg shadow-lg p-12 mb-16">
//             <h3 className="text-3xl font-bold text-gray-800 mb-12 text-center">
//               Comment ça marche ?
//             </h3>
//             <div className="grid md:grid-cols-4 gap-8">
//               {/* Étape 1 */}
//               <div className="text-center">
//                 <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FileText className="w-8 h-8 text-blue-600" />
//                 </div>
//                 <h4 className="text-lg font-bold text-gray-800 mb-2">Étape 1</h4>
//                 <p className="text-gray-600 text-sm">
//                   Remplissez le formulaire avec les détails de votre problème
//                 </p>
//               </div>

//               {/* Flèche */}
//               <div className="flex items-center justify-center">
//                 <div className="hidden md:block text-2xl text-gray-400">→</div>
//               </div>

//               {/* Étape 2 */}
//               <div className="text-center">
//                 <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Clock className="w-8 h-8 text-yellow-600" />
//                 </div>
//                 <h4 className="text-lg font-bold text-gray-800 mb-2">Étape 2</h4>
//                 <p className="text-gray-600 text-sm">
//                   Recevez un numéro de référence par email immédiatement
//                 </p>
//               </div>

//               {/* Flèche */}
//               <div className="flex items-center justify-center">
//                 <div className="hidden md:block text-2xl text-gray-400">→</div>
//               </div>

//               {/* Étape 3 */}
//               <div className="text-center">
//                 <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <CheckCircle className="w-8 h-8 text-green-600" />
//                 </div>
//                 <h4 className="text-lg font-bold text-gray-800 mb-2">Étape 3</h4>
//                 <p className="text-gray-600 text-sm">
//                   Un technicien vous contactera pour programmer l'intervention
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* Section FAQ */}
//           <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-12 text-white">
//             <h3 className="text-3xl font-bold mb-8 text-center">
//               Questions fréquentes
//             </h3>
//             <div className="grid md:grid-cols-2 gap-8">
//               <div>
//                 <h4 className="text-lg font-bold mb-2">❓ Qui peut faire une demande ?</h4>
//                 <p className="text-blue-100">
//                   Tous les utilisateurs de l'ESMT peuvent faire une demande sans inscription préalable.
//                 </p>
//               </div>
//               <div>
//                 <h4 className="text-lg font-bold mb-2">⏱️ Combien de temps pour une réponse ?</h4>
//                 <p className="text-blue-100">
//                   Vous recevrez une réponse dans les 24 à 48 heures selon l'urgence.
//                 </p>
//               </div>
//               <div>
//                 <h4 className="text-lg font-bold mb-2">📞 Et si j'ai une urgence ?</h4>
//                 <p className="text-blue-100">
//                   Sélectionnez "Haute" comme priorité et incluez "URGENT" dans votre description.
//                 </p>
//               </div>
//               <div>
//                 <h4 className="text-lg font-bold mb-2">📧 Comment suivre ma demande ?</h4>
//                 <p className="text-blue-100">
//                   Utilisez le numéro de référence reçu par email pour consulter l'état de votre demande.
//                 </p>
//               </div>
//             </div>
//           </section>
//         </section>

//         {/* Footer */}
//         <footer className="bg-gray-800 text-white mt-16">
//           <div className="max-w-6xl mx-auto px-4 py-12">
//             <div className="grid md:grid-cols-3 gap-8 mb-8">
//               <div>
//                 <h4 className="text-lg font-bold mb-4">À propos</h4>
//                 <p className="text-gray-400 text-sm">
//                   Le CRT-ESMT est le centre des ressources techniques de l'ESMT Dakar.
//                 </p>
//               </div>
//               <div>
//                 <h4 className="text-lg font-bold mb-4">Contact</h4>
//                 <p className="text-gray-400 text-sm">
//                   📧 support@esmt.sn<br/>
//                   📞 +221 77 123 4567
//                 </p>
//               </div>
//               <div>
//                 <h4 className="text-lg font-bold mb-4">Heures d'ouverture</h4>
//                 <p className="text-gray-400 text-sm">
//                   Lundi - Vendredi: 08:00 - 17:00<br/>
//                   Samedi - Dimanche: Fermé
//                 </p>
//               </div>
//             </div>
//             <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
//               <p>&copy; 2025 CRT-ESMT. Tous droits réservés.</p>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default HomePage;



// NOUVELLE VERSION CLAUDE 


import React from 'react';
import { FileText, Search, LogIn, Wrench, Clock, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: "url('data:image/webp;base64,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')",
        backgroundColor: '#f0f4ff'
      }}
    >
      {/* Overlay semi-transparent */}
      <div className="min-h-screen bg-gradient-to-br from-transparent via-transparent to-transparent">
      
      {/* Contenu principal */}
      <div>
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
      </div>
    </div>
  );
};

export default HomePage;