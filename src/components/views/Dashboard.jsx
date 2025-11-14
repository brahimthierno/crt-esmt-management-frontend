
// VERSION DE DEEPSEEK AVEC STATISTIQUES D'EMPRUNTS INTEGREES

// import React from 'react';
// import { 
//   Wrench, 
//   Clock, 
//   CheckCircle, 
//   Package, 
//   Calendar,
//   TrendingUp,
//   Users,
//   BarChart3,
//   AlertTriangle
// } from 'lucide-react';

// const Dashboard = ({ currentUser, interventions, stock, emprunts }) => {
//   const myInterventions = currentUser.role !== 'admin' 
//     ? interventions.filter(i => i.technicien?._id === currentUser._id)
//     : interventions;

//   // Calcul des statistiques des emprunts
//   const empruntsTotal = emprunts.length;
//   const empruntsEnCours = emprunts.filter(e => e.statut === 'en_cours').length;
//   const empruntsRetournes = emprunts.filter(e => e.statut === 'retourne').length;
//   const empruntsEnRetard = emprunts.filter(e => 
//     e.statut === 'en_cours' && new Date(e.dateRetourPrevue) < new Date()
//   ).length;

//   // Top 3 des matériels les plus empruntés
//   const materielsPlusEmpruntes = stock
//     .map(materiel => {
//       const empruntsMateriel = emprunts.filter(e => 
//         e.materiel?._id === materiel._id || e.materiel === materiel._id
//       );
//       return {
//         ...materiel,
//         nombreEmprunts: empruntsMateriel.length,
//         quantiteTotaleEmpruntee: empruntsMateriel.reduce((sum, e) => sum + e.quantite, 0)
//       };
//     })
//     .sort((a, b) => b.nombreEmprunts - a.nombreEmprunts)
//     .slice(0, 3);

//   // Derniers emprunts actifs
//   const derniersEmprunts = emprunts
//     .filter(e => e.statut === 'en_cours')
//     .sort((a, b) => new Date(b.dateEmprunt) - new Date(a.dateEmprunt))
//     .slice(0, 3);

//   // Cartes de statistiques principales
//   const statsCards = currentUser.role === 'admin' ? [
//     { 
//       label: 'Total Interventions', 
//       value: interventions.length, 
//       color: 'bg-blue-500',
//       icon: <Wrench />
//     },
//     { 
//       label: 'En cours', 
//       value: interventions.filter(i => i.statut === 'en_cours').length, 
//       color: 'bg-yellow-500',
//       icon: <Clock />
//     },
//     { 
//       label: 'Terminées', 
//       value: interventions.filter(i => i.statut === 'terminee').length, 
//       color: 'bg-green-500',
//       icon: <CheckCircle />
//     },
//     { 
//       label: 'Matériels en stock', 
//       value: stock.length, 
//       color: 'bg-purple-500',
//       icon: <Package />
//     },
//     { 
//       label: 'Emprunts actifs', 
//       value: empruntsEnCours, 
//       color: 'bg-indigo-500',
//       icon: <TrendingUp />
//     },
//     { 
//       label: 'Emprunts retournés', 
//       value: empruntsRetournes, 
//       color: 'bg-teal-500',
//       icon: <CheckCircle />
//     }
//   ] : [
//     { 
//       label: 'Mes interventions', 
//       value: myInterventions.length, 
//       color: 'bg-blue-500',
//       icon: <Wrench />
//     },
//     { 
//       label: 'En cours', 
//       value: myInterventions.filter(i => i.statut === 'en_cours').length, 
//       color: 'bg-yellow-500',
//       icon: <Clock />
//     },
//     { 
//       label: 'Terminées', 
//       value: myInterventions.filter(i => i.statut === 'terminee').length, 
//       color: 'bg-green-500',
//       icon: <CheckCircle />
//     },
//     { 
//       label: 'Planifiées', 
//       value: myInterventions.filter(i => i.statut === 'planifiee').length, 
//       color: 'bg-orange-500',
//       icon: <Calendar />
//     },
//     { 
//       label: 'Mes emprunts actifs', 
//       value: emprunts.filter(e => 
//         e.statut === 'en_cours' && 
//         (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//       ).length, 
//       color: 'bg-indigo-500',
//       icon: <TrendingUp />
//     },
//     { 
//       label: 'Emprunts en retard', 
//       value: emprunts.filter(e => 
//         e.statut === 'en_cours' && 
//         new Date(e.dateRetourPrevue) < new Date() &&
//         (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//       ).length, 
//       color: 'bg-red-500',
//       icon: <AlertTriangle />
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800">Tableau de bord</h2>
      
//       {/* Cartes de statistiques */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {statsCards.map((stat, idx) => (
//           <div key={idx} className={`${stat.color} text-white rounded-lg p-6 shadow-lg`}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm opacity-90">{stat.label}</p>
//                 <p className="text-3xl font-bold mt-2">{stat.value}</p>
//               </div>
//               <div className="opacity-80">
//                 {React.cloneElement(stat.icon, { size: 32 })}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Interventions récentes */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-xl font-semibold mb-4">
//             {currentUser.role === 'admin' ? 'Interventions récentes' : 'Mes interventions à venir'}
//           </h3>
//           <div className="space-y-3">
//             {myInterventions.slice(0, 5).map(intervention => (
//               <div key={intervention._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="font-semibold">{intervention.titre}</p>
//                   <p className="text-sm text-gray-600">
//                     {intervention.lieu} - {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
//                   </p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                   intervention.statut === 'terminee' ? 'bg-green-100 text-green-800' :
//                   intervention.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
//                   'bg-blue-100 text-blue-800'
//                 }`}>
//                   {intervention.statut === 'terminee' ? 'Terminée' :
//                    intervention.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
//                 </span>
//               </div>
//             ))}
//             {myInterventions.length === 0 && (
//               <p className="text-center text-gray-500 py-8">Aucune intervention</p>
//             )}
//           </div>
//         </div>

//         {/* Section Emprunts */}
//         <div className="space-y-6">
//           {/* Derniers emprunts en cours */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <TrendingUp className="w-5 h-5 text-indigo-600" />
//               <h3 className="text-lg font-semibold">
//                 {currentUser.role === 'admin' ? 'Derniers emprunts actifs' : 'Mes emprunts en cours'}
//               </h3>
//             </div>
//             <div className="space-y-3">
//               {(currentUser.role === 'admin' ? derniersEmprunts : emprunts
//                 .filter(e => 
//                   e.statut === 'en_cours' && 
//                   (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//                 )
//                 .sort((a, b) => new Date(b.dateEmprunt) - new Date(a.dateEmprunt))
//                 .slice(0, 3)
//               ).map(emprunt => {
//                 const materiel = stock.find(s => s._id === emprunt.materiel?._id || s._id === emprunt.materiel);
//                 const estEnRetard = new Date(emprunt.dateRetourPrevue) < new Date();
                
//                 return (
//                   <div key={emprunt._id} className={`p-3 rounded border-l-4 ${
//                     estEnRetard ? 'border-red-500 bg-red-50' : 'border-indigo-500 bg-indigo-50'
//                   }`}>
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="font-medium text-sm">
//                           {emprunt.materiel?.nom || materiel?.nom}
//                         </p>
//                         <p className="text-xs text-gray-600">
//                           Quantité: {emprunt.quantite}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           Retour: {new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR')}
//                         </p>
//                       </div>
//                       {estEnRetard && (
//                         <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
//                           En retard
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//               {((currentUser.role === 'admin' && derniersEmprunts.length === 0) || 
//                 (currentUser.role !== 'admin' && emprunts.filter(e => 
//                   e.statut === 'en_cours' && 
//                   (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//                 ).length === 0)) && (
//                 <p className="text-center text-gray-500 py-4">Aucun emprunt en cours</p>
//               )}
//             </div>
//           </div>

//           {/* Matériels les plus empruntés (Admin seulement) */}
//           {currentUser.role === 'admin' && materielsPlusEmpruntes.length > 0 && (
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <BarChart3 className="w-5 h-5 text-blue-600" />
//                 <h3 className="text-lg font-semibold">Matériels les plus empruntés</h3>
//               </div>
//               <div className="space-y-3">
//                 {materielsPlusEmpruntes.map((materiel, index) => (
//                   <div key={materiel._id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
//                     <div className="flex items-center gap-3">
//                       <div className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded text-xs font-bold">
//                         {index + 1}
//                       </div>
//                       <div>
//                         <p className="font-medium text-sm">{materiel.nom}</p>
//                         <p className="text-xs text-gray-500 capitalize">{materiel.categorie}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm font-semibold">{materiel.nombreEmprunts} emprunts</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Statistiques globales des emprunts (Admin seulement) */}
//       {currentUser.role === 'admin' && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-xl font-semibold mb-4">Aperçu des Emprunts</h3>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="text-center p-4 bg-blue-50 rounded-lg">
//               <p className="text-2xl font-bold text-blue-600">{empruntsTotal}</p>
//               <p className="text-sm text-gray-600">Total emprunts</p>
//             </div>
//             <div className="text-center p-4 bg-yellow-50 rounded-lg">
//               <p className="text-2xl font-bold text-yellow-600">{empruntsEnCours}</p>
//               <p className="text-sm text-gray-600">En cours</p>
//             </div>
//             <div className="text-center p-4 bg-green-50 rounded-lg">
//               <p className="text-2xl font-bold text-green-600">{empruntsRetournes}</p>
//               <p className="text-sm text-gray-600">Retournés</p>
//             </div>
//             <div className="text-center p-4 bg-red-50 rounded-lg">
//               <p className="text-2xl font-bold text-red-600">{empruntsEnRetard}</p>
//               <p className="text-sm text-gray-600">En retard</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


// NOUVELLE VERSION AVEC MODE SOMBRE/CLAIR

// import React from 'react';
// import { 
//   Wrench, 
//   Clock, 
//   CheckCircle, 
//   Package, 
//   Calendar,
//   TrendingUp,
//   BarChart3,
//   AlertTriangle
// } from 'lucide-react';

// const Dashboard = ({ currentUser, interventions, stock, emprunts }) => {
//   const myInterventions = currentUser.role !== 'admin' 
//     ? interventions.filter(i => i.technicien?._id === currentUser._id)
//     : interventions;

//   // Calcul des statistiques des emprunts
//   const empruntsEnCours = emprunts.filter(e => e.statut === 'en_cours').length;
//   const empruntsRetournes = emprunts.filter(e => e.statut === 'retourne').length;

//   // Top 3 des matériels les plus empruntés
//   const materielsPlusEmpruntes = stock
//     .map(materiel => {
//       const empruntsMateriel = emprunts.filter(e => 
//         e.materiel?._id === materiel._id || e.materiel === materiel._id
//       );
//       return {
//         ...materiel,
//         nombreEmprunts: empruntsMateriel.length,
//       };
//     })
//     .sort((a, b) => b.nombreEmprunts - a.nombreEmprunts)
//     .slice(0, 3);

//   // Derniers emprunts actifs
//   const derniersEmprunts = emprunts
//     .filter(e => e.statut === 'en_cours')
//     .sort((a, b) => new Date(b.dateEmprunt) - new Date(a.dateEmprunt))
//     .slice(0, 3);

//   // Cartes de statistiques principales
//   const statsCards = currentUser.role === 'admin' ? [
//     { 
//       label: 'Total Interventions', 
//       value: interventions.length, 
//       color: 'bg-blue-500 dark:bg-blue-600',
//       icon: <Wrench />
//     },
//     { 
//       label: 'En cours', 
//       value: interventions.filter(i => i.statut === 'en_cours').length, 
//       color: 'bg-yellow-500 dark:bg-yellow-600',
//       icon: <Clock />
//     },
//     { 
//       label: 'Terminées', 
//       value: interventions.filter(i => i.statut === 'terminee').length, 
//       color: 'bg-green-500 dark:bg-green-600',
//       icon: <CheckCircle />
//     },
//     { 
//       label: 'Matériels en stock', 
//       value: stock.length, 
//       color: 'bg-purple-500 dark:bg-purple-600',
//       icon: <Package />
//     },
//     { 
//       label: 'Emprunts actifs', 
//       value: empruntsEnCours, 
//       color: 'bg-indigo-500 dark:bg-indigo-600',
//       icon: <TrendingUp />
//     },
//     { 
//       label: 'Emprunts retournés', 
//       value: empruntsRetournes, 
//       color: 'bg-teal-500 dark:bg-teal-600',
//       icon: <CheckCircle />
//     }
//   ] : [
//     { 
//       label: 'Mes interventions', 
//       value: myInterventions.length, 
//       color: 'bg-blue-500 dark:bg-blue-600',
//       icon: <Wrench />
//     },
//     { 
//       label: 'En cours', 
//       value: myInterventions.filter(i => i.statut === 'en_cours').length, 
//       color: 'bg-yellow-500 dark:bg-yellow-600',
//       icon: <Clock />
//     },
//     { 
//       label: 'Terminées', 
//       value: myInterventions.filter(i => i.statut === 'terminee').length, 
//       color: 'bg-green-500 dark:bg-green-600',
//       icon: <CheckCircle />
//     },
//     { 
//       label: 'Planifiées', 
//       value: myInterventions.filter(i => i.statut === 'planifiee').length, 
//       color: 'bg-orange-500 dark:bg-orange-600',
//       icon: <Calendar />
//     },
//     { 
//       label: 'Mes emprunts actifs', 
//       value: emprunts.filter(e => 
//         e.statut === 'en_cours' && 
//         (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//       ).length, 
//       color: 'bg-indigo-500 dark:bg-indigo-600',
//       icon: <TrendingUp />
//     },
//     { 
//       label: 'Emprunts en retard', 
//       value: emprunts.filter(e => 
//         e.statut === 'en_cours' && 
//         new Date(e.dateRetourPrevue) < new Date() &&
//         (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//       ).length, 
//       color: 'bg-red-500 dark:bg-red-600',
//       icon: <AlertTriangle />
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
//         Tableau de bord
//       </h2>
      
//       {/* Cartes de statistiques */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {statsCards.map((stat, idx) => (
//           <div key={idx} className={`${stat.color} text-white rounded-lg p-6 shadow-lg transition-all duration-200 hover:shadow-xl`}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm opacity-90">{stat.label}</p>
//                 <p className="text-3xl font-bold mt-2">{stat.value}</p>
//               </div>
//               <div className="opacity-80">
//                 {React.cloneElement(stat.icon, { size: 32 })}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Interventions récentes */}
//         <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6 transition-colors duration-200">
//           <h3 className="text-xl font-semibold mb-4 dark:text-white transition-colors duration-200">
//             {currentUser.role === 'admin' ? 'Interventions récentes' : 'Mes interventions à venir'}
//           </h3>
//           <div className="space-y-3">
//             {myInterventions.slice(0, 5).map(intervention => (
//               <div key={intervention._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg transition-colors duration-200">
//                 <div>
//                   <p className="font-semibold dark:text-white transition-colors duration-200">{intervention.titre}</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
//                     {intervention.lieu} - {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
//                   </p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                   intervention.statut === 'terminee' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
//                   intervention.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
//                   'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
//                 } transition-colors duration-200`}>
//                   {intervention.statut === 'terminee' ? 'Terminée' :
//                    intervention.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
//                 </span>
//               </div>
//             ))}
//             {myInterventions.length === 0 && (
//               <p className="text-center text-gray-500 dark:text-gray-400 py-8 transition-colors duration-200">
//                 Aucune intervention
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Section Emprunts */}
//         <div className="space-y-6">
//           {/* Derniers emprunts en cours */}
//           <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6 transition-colors duration-200">
//             <div className="flex items-center gap-2 mb-4">
//               <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-colors duration-200" />
//               <h3 className="text-lg font-semibold dark:text-white transition-colors duration-200">
//                 {currentUser.role === 'admin' ? 'Derniers emprunts actifs' : 'Mes emprunts en cours'}
//               </h3>
//             </div>
//             <div className="space-y-3">
//               {(currentUser.role === 'admin' ? derniersEmprunts : emprunts
//                 .filter(e => 
//                   e.statut === 'en_cours' && 
//                   (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//                 )
//                 .sort((a, b) => new Date(b.dateEmprunt) - new Date(a.dateEmprunt))
//                 .slice(0, 3)
//               ).map(emprunt => {
//                 const materiel = stock.find(s => s._id === emprunt.materiel?._id || s._id === emprunt.materiel);
//                 const estEnRetard = new Date(emprunt.dateRetourPrevue) < new Date();
                
//                 return (
//                   <div key={emprunt._id} className={`p-3 rounded border-l-4 transition-colors duration-200 ${
//                     estEnRetard 
//                       ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400' 
//                       : 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400'
//                   }`}>
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="font-medium text-sm dark:text-white transition-colors duration-200">
//                           {emprunt.materiel?.nom || materiel?.nom}
//                         </p>
//                         <p className="text-xs text-gray-600 dark:text-gray-300 transition-colors duration-200">
//                           Quantité: {emprunt.quantite}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
//                           Retour: {new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR')}
//                         </p>
//                       </div>
//                       {estEnRetard && (
//                         <span className="px-2 py-1 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 text-xs rounded-full transition-colors duration-200">
//                           En retard
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//               {((currentUser.role === 'admin' && derniersEmprunts.length === 0) || 
//                 (currentUser.role !== 'admin' && emprunts.filter(e => 
//                   e.statut === 'en_cours' && 
//                   (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//                 ).length === 0)) && (
//                 <p className="text-center text-gray-500 dark:text-gray-400 py-4 transition-colors duration-200">
//                   Aucun emprunt en cours
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Matériels les plus empruntés (Admin seulement) */}
//           {currentUser.role === 'admin' && materielsPlusEmpruntes.length > 0 && (
//             <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6 transition-colors duration-200">
//               <div className="flex items-center gap-2 mb-4">
//                 <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors duration-200" />
//                 <h3 className="text-lg font-semibold dark:text-white transition-colors duration-200">
//                   Matériels les plus empruntés
//                 </h3>
//               </div>
//               <div className="space-y-3">
//                 {materielsPlusEmpruntes.map((materiel, index) => (
//                   <div key={materiel._id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-dark-700 rounded transition-colors duration-200">
//                     <div className="flex items-center gap-3">
//                       <div className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded text-xs font-bold transition-colors duration-200">
//                         {index + 1}
//                       </div>
//                       <div>
//                         <p className="font-medium text-sm dark:text-white transition-colors duration-200">
//                           {materiel.nom}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 capitalize transition-colors duration-200">
//                           {materiel.categorie}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm font-semibold dark:text-white transition-colors duration-200">
//                         {materiel.nombreEmprunts} emprunts
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// VERSION DE DEEPSEEK AVEC LE DESIGN AMELIORE DU DASHBOARD



// import React, { useState, useEffect } from 'react';
// import { 
//   Wrench, 
//   Clock, 
//   CheckCircle, 
//   Package, 
//   Calendar,
//   TrendingUp,
//   BarChart3,
//   AlertTriangle,
//   Users,
//   Download,
//   Eye,
//   ChevronRight,
//   Activity,
//   Target,
//   Zap,
//   Star,
//   ArrowUpRight,
//   MoreHorizontal
// } from 'lucide-react';

// const Dashboard = ({ currentUser, interventions, stock, emprunts }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simuler un chargement
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const myInterventions = currentUser.role !== 'admin' 
//     ? interventions.filter(i => i.technicien?._id === currentUser._id)
//     : interventions;

//   // Calcul des statistiques des emprunts
//   const empruntsEnCours = emprunts.filter(e => e.statut === 'en_cours').length;
//   const empruntsRetournes = emprunts.filter(e => e.statut === 'retourne').length;
//   const empruntsEnRetard = emprunts.filter(e => 
//     e.statut === 'en_cours' && new Date(e.dateRetourPrevue) < new Date()
//   ).length;

//   // Top 5 des matériels les plus empruntés
//   const materielsPlusEmpruntes = stock
//     .map(materiel => {
//       const empruntsMateriel = emprunts.filter(e => 
//         e.materiel?._id === materiel._id || e.materiel === materiel._id
//       );
//       return {
//         ...materiel,
//         nombreEmprunts: empruntsMateriel.length,
//         tauxUtilisation: Math.round((empruntsMateriel.length / Math.max(1, emprunts.length)) * 100)
//       };
//     })
//     .sort((a, b) => b.nombreEmprunts - a.nombreEmprunts)
//     .slice(0, 5);

//   // Derniers emprunts actifs
//   const derniersEmprunts = emprunts
//     .filter(e => e.statut === 'en_cours')
//     .sort((a, b) => new Date(b.dateEmprunt) - new Date(a.dateEmprunt))
//     .slice(0, 5);

//   // Interventions urgentes (haute priorité)
//   const interventionsUrgentes = myInterventions
//     .filter(i => i.priorite === 'haute' && i.statut !== 'terminee')
//     .slice(0, 3);

//   // Statistiques avancées
//   const tauxCompletion = interventions.length > 0 
//     ? Math.round((interventions.filter(i => i.statut === 'terminee').length / interventions.length) * 100)
//     : 0;

//   const tauxOccupation = stock.length > 0
//     ? Math.round((stock.reduce((acc, m) => acc + m.disponible, 0) / stock.reduce((acc, m) => acc + m.quantite, 0)) * 100)
//     : 0;

//   // Cartes de statistiques principales avec design amélioré
//   const statsCards = currentUser.role === 'admin' ? [
//     { 
//       label: 'Interventions Total', 
//       value: interventions.length, 
//       change: '+12%',
//       trend: 'up',
//       color: 'from-blue-500 to-blue-600',
//       icon: <Wrench className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
//     },
//     { 
//       label: 'En Cours', 
//       value: interventions.filter(i => i.statut === 'en_cours').length, 
//       change: '+5%',
//       trend: 'up',
//       color: 'from-yellow-500 to-yellow-600',
//       icon: <Clock className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20'
//     },
//     { 
//       label: 'Terminées', 
//       value: interventions.filter(i => i.statut === 'terminee').length, 
//       change: '+8%',
//       trend: 'up',
//       color: 'from-green-500 to-green-600',
//       icon: <CheckCircle className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
//     },
//     { 
//       label: 'Emprunts Actifs', 
//       value: empruntsEnCours, 
//       change: '-3%',
//       trend: 'down',
//       color: 'from-indigo-500 to-indigo-600',
//       icon: <TrendingUp className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20'
//     }
//   ] : [
//     { 
//       label: 'Mes Interventions', 
//       value: myInterventions.length, 
//       change: '+15%',
//       trend: 'up',
//       color: 'from-blue-500 to-blue-600',
//       icon: <Wrench className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
//     },
//     { 
//       label: 'En Cours', 
//       value: myInterventions.filter(i => i.statut === 'en_cours').length, 
//       change: '+2%',
//       trend: 'up',
//       color: 'from-yellow-500 to-yellow-600',
//       icon: <Clock className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20'
//     },
//     { 
//       label: 'Terminées', 
//       value: myInterventions.filter(i => i.statut === 'terminee').length, 
//       change: '+10%',
//       trend: 'up',
//       color: 'from-green-500 to-green-600',
//       icon: <CheckCircle className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
//     },
//     { 
//       label: 'Emprunts Actifs', 
//       value: emprunts.filter(e => 
//         e.statut === 'en_cours' && 
//         (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//       ).length, 
//       change: '0%',
//       trend: 'neutral',
//       color: 'from-indigo-500 to-indigo-600',
//       icon: <Package className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20'
//     }
//   ];

//   // Squelette de chargement
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-32"></div>
//             ))}
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-96"></div>
//             <div className="space-y-6">
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-44"></div>
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-44"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
//       {/* Header avec navigation */}
//       <div className="mb-8">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Tableau de Bord
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-2">
//               {currentUser.role === 'admin' 
//                 ? 'Vue d\'ensemble de votre activité' 
//                 : 'Vos activités et statistiques personnelles'
//               }
//             </p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg border border-gray-200 dark:border-gray-700">
//               {['overview', 'analytics', 'reports'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     activeTab === tab
//                       ? 'bg-blue-500 text-white shadow-md'
//                       : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
//                   }`}
//                 >
//                   {tab === 'overview' ? 'Vue Générale' : 
//                    tab === 'analytics' ? 'Analytiques' : 'Rapports'}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Cartes de statistiques principales */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {statsCards.map((stat, idx) => (
//             <div 
//               key={idx} 
//               className={`${stat.bgColor} rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 group`}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//                   {stat.icon}
//                 </div>
//                 <div className={`flex items-center gap-1 text-sm font-medium ${
//                   stat.trend === 'up' ? 'text-green-600' : 
//                   stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
//                 }`}>
//                   {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'}
//                   {stat.change}
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <p className="text-3xl font-bold text-gray-900 dark:text-white">
//                   {stat.value}
//                 </p>
//                 <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
//                   {stat.label}
//                 </p>
//               </div>
              
//               <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                 <div 
//                   className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-1000`}
//                   style={{ width: `${Math.min(100, (stat.value / Math.max(1, interventions.length)) * 100)}%` }}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Métriques secondaires */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                 <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Taux de Complétion</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{tauxCompletion}%</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                 <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Disponibilité Stock</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{tauxOccupation}%</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
//                 <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Emprunts en Retard</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{empruntsEnRetard}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//         {/* Interventions récentes */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                   <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                     {currentUser.role === 'admin' ? 'Interventions Récentes' : 'Mes Interventions'}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400 text-sm">
//                     {myInterventions.length} intervention(s) au total
//                   </p>
//                 </div>
//               </div>
//               <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-colors duration-200">
//                 <MoreHorizontal className="w-5 h-5 text-gray-400" />
//               </button>
//             </div>
//           </div>
          
//           <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
//             {myInterventions.slice(0, 6).map((intervention, index) => (
//               <div 
//                 key={intervention._id} 
//                 className="group p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-400 cursor-pointer"
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4 flex-1">
//                     <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-500 text-sm font-bold text-gray-600 dark:text-gray-300">
//                       {index + 1}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h4 className="font-semibold text-gray-900 dark:text-white truncate">
//                         {intervention.titre}
//                       </h4>
//                       <div className="flex items-center gap-3 mt-1">
//                         <span className="text-xs text-gray-500 dark:text-gray-400">
//                           📍 {intervention.lieu}
//                         </span>
//                         <span className="text-xs text-gray-500 dark:text-gray-400">
//                           🗓️ {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center gap-3">
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
//                       intervention.statut === 'terminee' 
//                         ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' :
//                       intervention.statut === 'en_cours' 
//                         ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800' :
//                         'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
//                     }`}>
//                       {intervention.statut === 'terminee' ? 'Terminée' :
//                        intervention.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
//                     </span>
//                     <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
//                   </div>
//                 </div>
//               </div>
//             ))}
            
//             {myInterventions.length === 0 && (
//               <div className="text-center py-12">
//                 <Wrench className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
//                 <p className="text-gray-500 dark:text-gray-400 text-lg">Aucune intervention</p>
//                 <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
//                   {currentUser.role === 'admin' 
//                     ? 'Les nouvelles interventions apparaîtront ici' 
//                     : 'Aucune intervention ne vous est assignée'
//                   }
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Section Emprunts et Analytics */}
//         <div className="space-y-8">
//           {/* Derniers emprunts en cours */}
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                     <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                       {currentUser.role === 'admin' ? 'Emprunts Actifs' : 'Mes Emprunts'}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-400 text-sm">
//                       {empruntsEnCours} emprunt(s) en cours
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {empruntsEnRetard > 0 && (
//                     <span className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300 rounded-full text-xs font-semibold">
//                       {empruntsEnRetard} en retard
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             <div className="p-6 space-y-4">
//               {(currentUser.role === 'admin' ? derniersEmprunts : emprunts
//                 .filter(e => 
//                   e.statut === 'en_cours' && 
//                   (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//                 )
//                 .sort((a, b) => new Date(b.dateEmprunt) - new Date(a.dateEmprunt))
//                 .slice(0, 4)
//               ).map((emprunt, index) => {
//                 const materiel = stock.find(s => s._id === emprunt.materiel?._id || s._id === emprunt.materiel);
//                 const estEnRetard = new Date(emprunt.dateRetourPrevue) < new Date();
//                 const joursRestants = Math.ceil((new Date(emprunt.dateRetourPrevue) - new Date()) / (1000 * 60 * 60 * 24));
                
//                 return (
//                   <div 
//                     key={emprunt._id} 
//                     className={`group p-4 rounded-xl border-l-4 transition-all duration-300 hover:shadow-md cursor-pointer ${
//                       estEnRetard 
//                         ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400' 
//                         : 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400'
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4 flex-1">
//                         <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
//                           estEnRetard 
//                             ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300' 
//                             : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300'
//                         }`}>
//                           <Package className="w-5 h-5" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
//                             {emprunt.materiel?.nom || materiel?.nom}
//                           </h4>
//                           <div className="flex items-center gap-4 mt-1 text-xs text-gray-600 dark:text-gray-400">
//                             <span>👤 {emprunt.emprunteur}</span>
//                             <span>📦 {emprunt.quantite} unité(s)</span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="text-right">
//                         <div className={`text-sm font-semibold ${
//                           estEnRetard 
//                             ? 'text-red-600 dark:text-red-400' 
//                             : 'text-green-600 dark:text-green-400'
//                         }`}>
//                           {estEnRetard ? `+${Math.abs(joursRestants)}j` : `${joursRestants}j`}
//                         </div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">
//                           {new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR')}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
              
//               {((currentUser.role === 'admin' && derniersEmprunts.length === 0) || 
//                 (currentUser.role !== 'admin' && emprunts.filter(e => 
//                   e.statut === 'en_cours' && 
//                   (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//                 ).length === 0)) && (
//                 <div className="text-center py-8">
//                   <Package className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
//                   <p className="text-gray-500 dark:text-gray-400">Aucun emprunt en cours</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Matériels les plus empruntés (Admin seulement) */}
//           {currentUser.role === 'admin' && materielsPlusEmpruntes.length > 0 && (
//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
//               <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
//                     <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                       Top Matériels
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-400 text-sm">
//                       Les plus empruntés cette semaine
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="p-6 space-y-4">
//                 {materielsPlusEmpruntes.map((materiel, index) => (
//                   <div 
//                     key={materiel._id} 
//                     className="group flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
//                   >
//                     <div className="flex items-center gap-4 flex-1">
//                       <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-500 text-sm font-bold text-gray-600 dark:text-gray-300">
//                         {index + 1}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
//                           {materiel.nom}
//                         </h4>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
//                           {materiel.categorie}
//                         </p>
//                       </div>
//                     </div>
                    
//                     <div className="text-right">
//                       <div className="flex items-center gap-2">
//                         <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
//                           <div 
//                             className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
//                             style={{ width: `${materiel.tauxUtilisation}%` }}
//                           ></div>
//                         </div>
//                         <span className="text-sm font-semibold text-gray-900 dark:text-white">
//                           {materiel.nombreEmprunts}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Alertes urgentes */}
//           {interventionsUrgentes.length > 0 && (
//             <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl shadow-lg border border-orange-200 dark:border-orange-700 p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
//                   <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                     Interventions Urgentes
//                   </h3>
//                   <p className="text-orange-600 dark:text-orange-400 text-sm">
//                     Nécessitent une attention immédiate
//                   </p>
//                 </div>
//               </div>
              
//               <div className="space-y-3">
//                 {interventionsUrgentes.map(intervention => (
//                   <div key={intervention._id} className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-orange-200 dark:border-orange-600">
//                     <div>
//                       <p className="font-semibold text-gray-900 dark:text-white text-sm">
//                         {intervention.titre}
//                       </p>
//                       <p className="text-xs text-orange-600 dark:text-orange-400">
//                         {intervention.lieu} • {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
//                       </p>
//                     </div>
//                     <div className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-semibold">
//                       URGENT
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// NOUVELLE VERSION DEEPSEEK AVEC DESIGN AMELIORE DU DASHBOARD ET IMPLEMENTATION DES ONGLETS



// import React, { useState, useEffect } from 'react';
// import { 
//   Wrench, 
//   Clock, 
//   CheckCircle, 
//   Package, 
//   Calendar,
//   TrendingUp,
//   BarChart3,
//   AlertTriangle,
//   Download,
//   ChevronRight,
//   Activity,
//   Target,
//   Zap,
//   MoreHorizontal,
//   FileText,
//   PieChart,
//   LineChart,
//   BarChart,
//   Users,
//   Settings
// } from 'lucide-react';

// const Dashboard = ({ currentUser, interventions, stock, emprunts }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const myInterventions = currentUser.role !== 'admin' 
//     ? interventions.filter(i => i.technicien?._id === currentUser._id)
//     : interventions;

//   // Calcul des statistiques
//   const empruntsEnCours = emprunts.filter(e => e.statut === 'en_cours').length;
//   const empruntsRetournes = emprunts.filter(e => e.statut === 'retourne').length;
//   const empruntsEnRetard = emprunts.filter(e => 
//     e.statut === 'en_cours' && new Date(e.dateRetourPrevue) < new Date()
//   ).length;

//   // Top matériels empruntés
//   const materielsPlusEmpruntes = stock
//     .map(materiel => {
//       const empruntsMateriel = emprunts.filter(e => 
//         e.materiel?._id === materiel._id || e.materiel === materiel._id
//       );
//       return {
//         ...materiel,
//         nombreEmprunts: empruntsMateriel.length,
//         tauxUtilisation: Math.round((empruntsMateriel.length / Math.max(1, emprunts.length)) * 100)
//       };
//     })
//     .sort((a, b) => b.nombreEmprunts - a.nombreEmprunts)
//     .slice(0, 5);

//   // Derniers emprunts
//   const derniersEmprunts = emprunts
//     .filter(e => e.statut === 'en_cours')
//     .sort((a, b) => new Date(b.dateEmprunt) - new Date(a.dateEmprunt))
//     .slice(0, 5);

//   // Interventions urgentes
//   const interventionsUrgentes = myInterventions
//     .filter(i => i.priorite === 'haute' && i.statut !== 'terminee')
//     .slice(0, 3);

//   // Statistiques avancées
//   const tauxCompletion = interventions.length > 0 
//     ? Math.round((interventions.filter(i => i.statut === 'terminee').length / interventions.length) * 100)
//     : 0;

//   const tauxOccupation = stock.length > 0
//     ? Math.round((stock.reduce((acc, m) => acc + m.disponible, 0) / stock.reduce((acc, m) => acc + m.quantite, 0)) * 100)
//     : 0;

//   // Cartes de statistiques principales
//   const statsCards = currentUser.role === 'admin' ? [
//     { 
//       label: 'Interventions Total', 
//       value: interventions.length, 
//       change: '+12%',
//       trend: 'up',
//       color: 'from-blue-500 to-blue-600',
//       icon: <Wrench className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
//     },
//     { 
//       label: 'En Cours', 
//       value: interventions.filter(i => i.statut === 'en_cours').length, 
//       change: '+5%',
//       trend: 'up',
//       color: 'from-yellow-500 to-yellow-600',
//       icon: <Clock className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20'
//     },
//     { 
//       label: 'Terminées', 
//       value: interventions.filter(i => i.statut === 'terminee').length, 
//       change: '+8%',
//       trend: 'up',
//       color: 'from-green-500 to-green-600',
//       icon: <CheckCircle className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
//     },
//     { 
//       label: 'Emprunts Actifs', 
//       value: empruntsEnCours, 
//       change: '-3%',
//       trend: 'down',
//       color: 'from-indigo-500 to-indigo-600',
//       icon: <TrendingUp className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20'
//     }
//   ] : [
//     { 
//       label: 'Mes Interventions', 
//       value: myInterventions.length, 
//       change: '+15%',
//       trend: 'up',
//       color: 'from-blue-500 to-blue-600',
//       icon: <Wrench className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
//     },
//     { 
//       label: 'En Cours', 
//       value: myInterventions.filter(i => i.statut === 'en_cours').length, 
//       change: '+2%',
//       trend: 'up',
//       color: 'from-yellow-500 to-yellow-600',
//       icon: <Clock className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20'
//     },
//     { 
//       label: 'Terminées', 
//       value: myInterventions.filter(i => i.statut === 'terminee').length, 
//       change: '+10%',
//       trend: 'up',
//       color: 'from-green-500 to-green-600',
//       icon: <CheckCircle className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
//     },
//     { 
//       label: 'Emprunts Actifs', 
//       value: emprunts.filter(e => 
//         e.statut === 'en_cours' && 
//         (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//       ).length, 
//       change: '0%',
//       trend: 'neutral',
//       color: 'from-indigo-500 to-indigo-600',
//       icon: <Package className="w-6 h-6" />,
//       bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20'
//     }
//   ];

//   // Fonction pour générer des données simulées pour les graphiques
//   const generateChartData = () => {
//     return {
//       interventionsParMois: [12, 19, 15, 25, 22, 30, 28, 35, 32, 40, 38, 45],
//       empruntsParMois: [8, 12, 10, 15, 18, 22, 20, 25, 28, 30, 32, 35],
//       typesInterventions: [
//         { type: 'Réparation', count: 45 },
//         { type: 'Maintenance', count: 30 },
//         { type: 'Installation', count: 15 },
//         { type: 'Diagnostic', count: 10 }
//       ]
//     };
//   };

//   const chartData = generateChartData();

//   // Contenu conditionnel pour chaque onglet
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return (
//           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//             {/* Interventions récentes */}
//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
//               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                       <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                         {currentUser.role === 'admin' ? 'Interventions Récentes' : 'Mes Interventions'}
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-400 text-sm">
//                         {myInterventions.length} intervention(s) au total
//                       </p>
//                     </div>
//                   </div>
//                   <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-colors duration-200">
//                     <MoreHorizontal className="w-5 h-5 text-gray-400" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
//                 {myInterventions.slice(0, 6).map((intervention, index) => (
//                   <div 
//                     key={intervention._id} 
//                     className="group p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-400 cursor-pointer"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4 flex-1">
//                         <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-500 text-sm font-bold text-gray-600 dark:text-gray-300">
//                           {index + 1}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-semibold text-gray-900 dark:text-white truncate">
//                             {intervention.titre}
//                           </h4>
//                           <div className="flex items-center gap-3 mt-1">
//                             <span className="text-xs text-gray-500 dark:text-gray-400">
//                               📍 {intervention.lieu}
//                             </span>
//                             <span className="text-xs text-gray-500 dark:text-gray-400">
//                               🗓️ {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-3">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
//                           intervention.statut === 'terminee' 
//                             ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' :
//                           intervention.statut === 'en_cours' 
//                             ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800' :
//                             'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
//                         }`}>
//                           {intervention.statut === 'terminee' ? 'Terminée' :
//                            intervention.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
//                         </span>
//                         <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
                
//                 {myInterventions.length === 0 && (
//                   <div className="text-center py-12">
//                     <Wrench className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
//                     <p className="text-gray-500 dark:text-gray-400 text-lg">Aucune intervention</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Section Emprunts et Analytics */}
//             <div className="space-y-8">
//               {/* Derniers emprunts en cours */}
//               <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                         <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
//                       </div>
//                       <div>
//                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                           {currentUser.role === 'admin' ? 'Emprunts Actifs' : 'Mes Emprunts'}
//                         </h3>
//                         <p className="text-gray-600 dark:text-gray-400 text-sm">
//                           {empruntsEnCours} emprunt(s) en cours
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {empruntsEnRetard > 0 && (
//                         <span className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300 rounded-full text-xs font-semibold">
//                           {empruntsEnRetard} en retard
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="p-6 space-y-4">
//                   {(currentUser.role === 'admin' ? derniersEmprunts : emprunts
//                     .filter(e => 
//                       e.statut === 'en_cours' && 
//                       (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//                     )
//                     .sort((a, b) => new Date(b.dateEmprunt) - new Date(a.dateEmprunt))
//                     .slice(0, 4)
//                   ).map((emprunt, index) => {
//                     const materiel = stock.find(s => s._id === emprunt.materiel?._id || s._id === emprunt.materiel);
//                     const estEnRetard = new Date(emprunt.dateRetourPrevue) < new Date();
//                     const joursRestants = Math.ceil((new Date(emprunt.dateRetourPrevue) - new Date()) / (1000 * 60 * 60 * 24));
                    
//                     return (
//                       <div 
//                         key={emprunt._id} 
//                         className={`group p-4 rounded-xl border-l-4 transition-all duration-300 hover:shadow-md cursor-pointer ${
//                           estEnRetard 
//                             ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400' 
//                             : 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400'
//                         }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-4 flex-1">
//                             <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
//                               estEnRetard 
//                                 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300' 
//                                 : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300'
//                             }`}>
//                               <Package className="w-5 h-5" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
//                                 {emprunt.materiel?.nom || materiel?.nom}
//                               </h4>
//                               <div className="flex items-center gap-4 mt-1 text-xs text-gray-600 dark:text-gray-400">
//                                 <span>👤 {emprunt.emprunteur}</span>
//                                 <span>📦 {emprunt.quantite} unité(s)</span>
//                               </div>
//                             </div>
//                           </div>
                          
//                           <div className="text-right">
//                             <div className={`text-sm font-semibold ${
//                               estEnRetard 
//                                 ? 'text-red-600 dark:text-red-400' 
//                                 : 'text-green-600 dark:text-green-400'
//                             }`}>
//                               {estEnRetard ? `+${Math.abs(joursRestants)}j` : `${joursRestants}j`}
//                             </div>
//                             <div className="text-xs text-gray-500 dark:text-gray-400">
//                               {new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR')}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
                  
//                   {((currentUser.role === 'admin' && derniersEmprunts.length === 0) || 
//                     (currentUser.role !== 'admin' && emprunts.filter(e => 
//                       e.statut === 'en_cours' && 
//                       (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
//                     ).length === 0)) && (
//                     <div className="text-center py-8">
//                       <Package className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
//                       <p className="text-gray-500 dark:text-gray-400">Aucun emprunt en cours</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Matériels les plus empruntés (Admin seulement) */}
//               {currentUser.role === 'admin' && materielsPlusEmpruntes.length > 0 && (
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
//                   <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
//                         <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//                       </div>
//                       <div>
//                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                           Top Matériels
//                         </h3>
//                         <p className="text-gray-600 dark:text-gray-400 text-sm">
//                           Les plus empruntés cette semaine
//                         </p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="p-6 space-y-4">
//                     {materielsPlusEmpruntes.map((materiel, index) => (
//                       <div 
//                         key={materiel._id} 
//                         className="group flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
//                       >
//                         <div className="flex items-center gap-4 flex-1">
//                           <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-500 text-sm font-bold text-gray-600 dark:text-gray-300">
//                             {index + 1}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
//                               {materiel.nom}
//                             </h4>
//                             <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
//                               {materiel.categorie}
//                             </p>
//                           </div>
//                         </div>
                        
//                         <div className="text-right">
//                           <div className="flex items-center gap-2">
//                             <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
//                               <div 
//                                 className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
//                                 style={{ width: `${materiel.tauxUtilisation}%` }}
//                               ></div>
//                             </div>
//                             <span className="text-sm font-semibold text-gray-900 dark:text-white">
//                               {materiel.nombreEmprunts}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Alertes urgentes */}
//               {interventionsUrgentes.length > 0 && (
//                 <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl shadow-lg border border-orange-200 dark:border-orange-700 p-6">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
//                       <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                         Interventions Urgentes
//                       </h3>
//                       <p className="text-orange-600 dark:text-orange-400 text-sm">
//                         Nécessitent une attention immédiate
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-3">
//                     {interventionsUrgentes.map(intervention => (
//                       <div key={intervention._id} className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-orange-200 dark:border-orange-600">
//                         <div>
//                           <p className="font-semibold text-gray-900 dark:text-white text-sm">
//                             {intervention.titre}
//                           </p>
//                           <p className="text-xs text-orange-600 dark:text-orange-400">
//                             {intervention.lieu} • {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
//                           </p>
//                         </div>
//                         <div className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-semibold">
//                           URGENT
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );

//       case 'analytics':
//         return (
//           <div className="space-y-6">
//             {/* Métriques avancées */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                     <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Performance</p>
//                     <p className="text-2xl font-bold text-gray-900 dark:text-white">{tauxCompletion}%</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                     <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Temps Moyen</p>
//                     <p className="text-2xl font-bold text-gray-900 dark:text-white">2.3j</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
//                     <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</p>
//                     <p className="text-2xl font-bold text-gray-900 dark:text-white">94%</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
//                     <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Croissance</p>
//                     <p className="text-2xl font-bold text-gray-900 dark:text-white">+18%</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Graphiques et analyses */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center gap-3 mb-6">
//                   <BarChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interventions par Mois</h3>
//                 </div>
//                 <div className="space-y-3">
//                   {chartData.interventionsParMois.map((count, index) => (
//                     <div key={index} className="flex items-center justify-between">
//                       <span className="text-sm text-gray-600 dark:text-gray-400">Mois {index + 1}</span>
//                       <div className="flex items-center gap-3">
//                         <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
//                           <div 
//                             className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
//                             style={{ width: `${(count / 50) * 100}%` }}
//                           ></div>
//                         </div>
//                         <span className="text-sm font-semibold text-gray-900 dark:text-white w-8 text-right">
//                           {count}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center gap-3 mb-6">
//                   <PieChart className="w-6 h-6 text-green-600 dark:text-green-400" />
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Types d'Interventions</h3>
//                 </div>
//                 <div className="space-y-4">
//                   {chartData.typesInterventions.map((item, index) => (
//                     <div key={index} className="flex items-center justify-between">
//                       <span className="text-sm text-gray-600 dark:text-gray-400">{item.type}</span>
//                       <div className="flex items-center gap-3">
//                         <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                           <div 
//                             className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
//                             style={{ width: `${(item.count / 100) * 100}%` }}
//                           ></div>
//                         </div>
//                         <span className="text-sm font-semibold text-gray-900 dark:text-white w-8 text-right">
//                           {item.count}%
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Tableau des performances */}
//             <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//               <div className="flex items-center gap-3 mb-6">
//                 <LineChart className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performances Détaillées</h3>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-gray-200 dark:border-gray-600">
//                       <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Métrique</th>
//                       <th className="text-right py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Valeur</th>
//                       <th className="text-right py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Évolution</th>
//                       <th className="text-right py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Tendance</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr className="border-b border-gray-100 dark:border-gray-700">
//                       <td className="py-3 text-sm text-gray-600 dark:text-gray-400">Taux de Résolution</td>
//                       <td className="py-3 text-sm text-right font-semibold text-gray-900 dark:text-white">92%</td>
//                       <td className="py-3 text-sm text-right text-green-600 dark:text-green-400">+5%</td>
//                       <td className="py-3 text-sm text-right">↗</td>
//                     </tr>
//                     <tr className="border-b border-gray-100 dark:border-gray-700">
//                       <td className="py-3 text-sm text-gray-600 dark:text-gray-400">Temps de Réponse</td>
//                       <td className="py-3 text-sm text-right font-semibold text-gray-900 dark:text-white">4.2h</td>
//                       <td className="py-3 text-sm text-right text-green-600 dark:text-green-400">-12%</td>
//                       <td className="py-3 text-sm text-right">↘</td>
//                     </tr>
//                     <tr>
//                       <td className="py-3 text-sm text-gray-600 dark:text-gray-400">Coût Moyen</td>
//                       <td className="py-3 text-sm text-right font-semibold text-gray-900 dark:text-white">€245</td>
//                       <td className="py-3 text-sm text-right text-red-600 dark:text-red-400">+8%</td>
//                       <td className="py-3 text-sm text-right">↗</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         );

//       case 'reports':
//         return (
//           <div className="space-y-6">
//             {/* Options de rapports */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center gap-3 mb-4">
//                   <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rapports Standards</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <button className="w-full p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-between group">
//                     <div>
//                       <h4 className="font-semibold text-blue-800 dark:text-blue-300">Rapport Mensuel</h4>
//                       <p className="text-sm text-blue-600 dark:text-blue-300">Toutes les interventions du mois</p>
//                     </div>
//                     <Download className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
//                   </button>
                  
//                   <button className="w-full p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors flex items-center justify-between group">
//                     <div>
//                       <h4 className="font-semibold text-green-800 dark:text-green-300">Rapport Stock</h4>
//                       <p className="text-sm text-green-600 dark:text-green-300">État du stock et emprunts</p>
//                     </div>
//                     <Download className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
//                   </button>
                  
//                   <button className="w-full p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors flex items-center justify-between group">
//                     <div>
//                       <h4 className="font-semibold text-purple-800 dark:text-purple-300">Rapport Performance</h4>
//                       <p className="text-sm text-purple-600 dark:text-purple-300">Analyses et métriques</p>
//                     </div>
//                     <Download className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
//                   </button>
//                 </div>
//               </div>

//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center gap-3 mb-4">
//                   <Settings className="w-6 h-6 text-orange-600 dark:text-orange-400" />
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rapports Personnalisés</h3>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Période
//                     </label>
//                     <select className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
//                       <option>7 derniers jours</option>
//                       <option>30 derniers jours</option>
//                       <option>3 derniers mois</option>
//                       <option>Année en cours</option>
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Type de données
//                     </label>
//                     <select className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white">
//                       <option>Interventions seulement</option>
//                       <option>Emprunts seulement</option>
//                       <option>Toutes les données</option>
//                       <option>Analyses avancées</option>
//                     </select>
//                   </div>
                  
//                   <button className="w-full p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold flex items-center justify-center gap-2">
//                     <Download className="w-5 h-5" />
//                     Générer le Rapport
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Historique des rapports */}
//             <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//               <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Rapports Récents</h3>
//               <div className="space-y-3">
//                 {[
//                   { name: 'Rapport Novembre 2024', date: '2024-11-30', size: '2.4 MB', type: 'PDF' },
//                   { name: 'Analyse Performance Q3', date: '2024-10-15', size: '1.8 MB', type: 'Excel' },
//                   { name: 'Audit Stock Complet', date: '2024-09-28', size: '3.1 MB', type: 'PDF' }
//                 ].map((report, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
//                     <div className="flex items-center gap-4">
//                       <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
//                         <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{report.name}</h4>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                           Généré le {report.date} • {report.size} • {report.type}
//                         </p>
//                       </div>
//                     </div>
//                     <button className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-colors">
//                       <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return (
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
//             <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Section en Développement</h3>
//             <p className="text-gray-500 dark:text-gray-400">
//               Cette fonctionnalité sera bientôt disponible.
//             </p>
//           </div>
//         );
//     }
//   };

//   // Squelette de chargement
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-32"></div>
//             ))}
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-96"></div>
//             <div className="space-y-6">
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-44"></div>
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-44"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
//       {/* Header avec navigation */}
//       <div className="mb-8">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Tableau de Bord
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-2">
//               {activeTab === 'overview' ? 'Vue d\'ensemble de votre activité' :
//                activeTab === 'analytics' ? 'Analyses détaillées et statistiques avancées' : 
//                'Génération et gestion des rapports'}
//             </p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg border border-gray-200 dark:border-gray-700">
//               {['overview', 'analytics', 'reports'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                     activeTab === tab
//                       ? 'bg-blue-500 text-white shadow-md'
//                       : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
//                   }`}
//                 >
//                   {tab === 'overview' ? 'Vue Générale' : 
//                    tab === 'analytics' ? 'Analytiques' : 'Rapports'}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Cartes de statistiques principales (toujours visibles) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {statsCards.map((stat, idx) => (
//             <div 
//               key={idx} 
//               className={`${stat.bgColor} rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 group`}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//                   {stat.icon}
//                 </div>
//                 <div className={`flex items-center gap-1 text-sm font-medium ${
//                   stat.trend === 'up' ? 'text-green-600' : 
//                   stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
//                 }`}>
//                   {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'}
//                   {stat.change}
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <p className="text-3xl font-bold text-gray-900 dark:text-white">
//                   {stat.value}
//                 </p>
//                 <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
//                   {stat.label}
//                 </p>
//               </div>
              
//               <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                 <div 
//                   className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-1000`}
//                   style={{ width: `${Math.min(100, (stat.value / Math.max(1, interventions.length)) * 100)}%` }}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Métriques secondaires */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                 <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Taux de Complétion</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{tauxCompletion}%</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                 <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Disponibilité Stock</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{tauxOccupation}%</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
//                 <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Emprunts en Retard</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{empruntsEnRetard}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 🔥 CONTENU DYNAMIQUE SELON L'ONGLET */}
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// NOUVELLE VERSION POUR SUPPRIMER LONGET "RAPPORTS" ET AMELIORER LONGLET "ANALYTIQUES"



import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  Package, 
  Calendar,
  TrendingUp,
  BarChart3,
  AlertTriangle,
  ChevronRight,
  Activity,
  Target,
  Zap,
  MoreHorizontal,
  PieChart,
  LineChart,
  BarChart,
  Users
} from 'lucide-react';

const Dashboard = ({ currentUser, interventions, stock, emprunts }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const myInterventions = currentUser.role !== 'admin' 
    ? interventions.filter(i => i.technicien?._id === currentUser._id)
    : interventions;

  // Calcul des statistiques
  const empruntsEnCours = emprunts.filter(e => e.statut === 'en_cours').length;
  const empruntsRetournes = emprunts.filter(e => e.statut === 'retourne').length;
  const empruntsEnRetard = emprunts.filter(e => 
    e.statut === 'en_cours' && new Date(e.dateRetourPrevue) < new Date()
  ).length;

  // Top matériels empruntés
  const materielsPlusEmpruntes = stock
    .map(materiel => {
      const empruntsMateriel = emprunts.filter(e => 
        e.materiel?._id === materiel._id || e.materiel === materiel._id
      );
      return {
        ...materiel,
        nombreEmprunts: empruntsMateriel.length,
        tauxUtilisation: Math.round((empruntsMateriel.length / Math.max(1, emprunts.length)) * 100)
      };
    })
    .sort((a, b) => b.nombreEmprunts - a.nombreEmprunts)
    .slice(0, 5);

  // Derniers emprunts
  const derniersEmprunts = emprunts
    .filter(e => e.statut === 'en_cours')
    .sort((a, b) => new Date(b.dateEmprunt) - new Date(a.dateEmprunt))
    .slice(0, 5);

  // Interventions urgentes
  const interventionsUrgentes = myInterventions
    .filter(i => i.priorite === 'haute' && i.statut !== 'terminee')
    .slice(0, 3);

  // Statistiques avancées RÉELLES
  const tauxCompletion = interventions.length > 0 
    ? Math.round((interventions.filter(i => i.statut === 'terminee').length / interventions.length) * 100)
    : 0;

  const tauxOccupation = stock.length > 0
    ? Math.round((stock.reduce((acc, m) => acc + m.disponible, 0) / stock.reduce((acc, m) => acc + m.quantite, 0)) * 100)
    : 0;

  // Calcul du temps moyen d'intervention
  const interventionsTerminees = interventions.filter(i => 
    i.statut === 'terminee' && i.dateDebutEffectif && i.dateFinEffective
  );
  
  const tempsMoyenMs = interventionsTerminees.length > 0
    ? interventionsTerminees.reduce((acc, i) => {
        const duree = new Date(i.dateFinEffective) - new Date(i.dateDebutEffectif);
        return acc + duree;
      }, 0) / interventionsTerminees.length
    : 0;
  
  const tempsMoyenJours = Math.round((tempsMoyenMs / (1000 * 60 * 60 * 24)) * 10) / 10;
  const tempsMoyenHeures = Math.round((tempsMoyenMs / (1000 * 60 * 60)) * 10) / 10;

  // Taux de satisfaction (basé sur les interventions terminées avec succès)
  const tauxSatisfaction = interventions.length > 0
    ? Math.round((interventions.filter(i => i.statut === 'terminee').length / interventions.length) * 100)
    : 0;

  // Croissance par rapport au mois précédent
  const now = new Date();
  const debutMoisActuel = new Date(now.getFullYear(), now.getMonth(), 1);
  const debutMoisPrecedent = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const finMoisPrecedent = new Date(now.getFullYear(), now.getMonth(), 0);

  const interventionsMoisActuel = interventions.filter(i => 
    new Date(i.dateDebut) >= debutMoisActuel
  ).length;

  const interventionsMoisPrecedent = interventions.filter(i => {
    const date = new Date(i.dateDebut);
    return date >= debutMoisPrecedent && date <= finMoisPrecedent;
  }).length;

  const croissance = interventionsMoisPrecedent > 0
    ? Math.round(((interventionsMoisActuel - interventionsMoisPrecedent) / interventionsMoisPrecedent) * 100)
    : 0;

  // Données pour les graphiques RÉELLES
  const generateChartData = () => {
    // Interventions par mois (12 derniers mois)
    const interventionsParMois = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const moisSuivant = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const count = interventions.filter(intervention => {
        const dateIntervention = new Date(intervention.dateDebut);
        return dateIntervention >= date && dateIntervention < moisSuivant;
      }).length;
      interventionsParMois.push(count);
    }

    // Emprunts par mois (12 derniers mois)
    const empruntsParMois = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const moisSuivant = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const count = emprunts.filter(emprunt => {
        const dateEmprunt = new Date(emprunt.dateEmprunt);
        return dateEmprunt >= date && dateEmprunt < moisSuivant;
      }).length;
      empruntsParMois.push(count);
    }

    // Types d'interventions
    const types = ['reparation', 'maintenance', 'installation', 'diagnostic', 'verification'];
    const typesInterventions = types.map(type => {
      const count = interventions.filter(i => i.type === type).length;
      const percentage = interventions.length > 0 
        ? Math.round((count / interventions.length) * 100)
        : 0;
      return {
        type: type.charAt(0).toUpperCase() + type.slice(1),
        count: percentage
      };
    }).filter(t => t.count > 0);

    return {
      interventionsParMois,
      empruntsParMois,
      typesInterventions
    };
  };

  const chartData = generateChartData();

  // Calcul des métriques de performance
  const tauxResolution = interventions.length > 0
    ? Math.round((interventions.filter(i => i.statut === 'terminee').length / interventions.length) * 100)
    : 0;

  const interventionsAvecDuree = interventions.filter(i => 
    i.dateDebutEffectif && i.dateFinEffective
  );

  const tempsReponseMs = interventionsAvecDuree.length > 0
    ? interventionsAvecDuree.reduce((acc, i) => {
        const duree = new Date(i.dateDebutEffectif) - new Date(i.dateDebut);
        return acc + duree;
      }, 0) / interventionsAvecDuree.length
    : 0;

  const tempsReponseHeures = Math.round((tempsReponseMs / (1000 * 60 * 60)) * 10) / 10;

  // Évolution du temps de réponse (comparaison avec le mois précédent)
  const interventionsAvecDureeMoisActuel = interventions.filter(i => 
    i.dateDebutEffectif && i.dateFinEffective && new Date(i.dateDebut) >= debutMoisActuel
  );

  const interventionsAvecDureeMoisPrecedent = interventions.filter(i => {
    const date = new Date(i.dateDebut);
    return i.dateDebutEffectif && i.dateFinEffective && 
           date >= debutMoisPrecedent && date <= finMoisPrecedent;
  });

  const tempsReponseMoisActuelMs = interventionsAvecDureeMoisActuel.length > 0
    ? interventionsAvecDureeMoisActuel.reduce((acc, i) => {
        const duree = new Date(i.dateDebutEffectif) - new Date(i.dateDebut);
        return acc + duree;
      }, 0) / interventionsAvecDureeMoisActuel.length
    : 0;

  const tempsReponseMoisPrecedentMs = interventionsAvecDureeMoisPrecedent.length > 0
    ? interventionsAvecDureeMoisPrecedent.reduce((acc, i) => {
        const duree = new Date(i.dateDebutEffectif) - new Date(i.dateDebut);
        return acc + duree;
      }, 0) / interventionsAvecDureeMoisPrecedent.length
    : 0;

  const evolutionTempsReponse = tempsReponseMoisPrecedentMs > 0
    ? Math.round(((tempsReponseMoisActuelMs - tempsReponseMoisPrecedentMs) / tempsReponseMoisPrecedentMs) * 100)
    : 0;

  // Cartes de statistiques principales
  const statsCards = currentUser.role === 'admin' ? [
    { 
      label: 'Interventions Total', 
      value: interventions.length, 
      change: '+12%',
      trend: 'up',
      color: 'from-blue-500 to-blue-600',
      icon: <Wrench className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
    },
    { 
      label: 'En Cours', 
      value: interventions.filter(i => i.statut === 'en_cours').length, 
      change: '+5%',
      trend: 'up',
      color: 'from-yellow-500 to-yellow-600',
      icon: <Clock className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20'
    },
    { 
      label: 'Terminées', 
      value: interventions.filter(i => i.statut === 'terminee').length, 
      change: '+8%',
      trend: 'up',
      color: 'from-green-500 to-green-600',
      icon: <CheckCircle className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
    },
    { 
      label: 'Emprunts Actifs', 
      value: empruntsEnCours, 
      change: '-3%',
      trend: 'down',
      color: 'from-indigo-500 to-indigo-600',
      icon: <TrendingUp className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20'
    }
  ] : [
    { 
      label: 'Mes Interventions', 
      value: myInterventions.length, 
      change: '+15%',
      trend: 'up',
      color: 'from-blue-500 to-blue-600',
      icon: <Wrench className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
    },
    { 
      label: 'En Cours', 
      value: myInterventions.filter(i => i.statut === 'en_cours').length, 
      change: '+2%',
      trend: 'up',
      color: 'from-yellow-500 to-yellow-600',
      icon: <Clock className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20'
    },
    { 
      label: 'Terminées', 
      value: myInterventions.filter(i => i.statut === 'terminee').length, 
      change: '+10%',
      trend: 'up',
      color: 'from-green-500 to-green-600',
      icon: <CheckCircle className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
    },
    { 
      label: 'Emprunts Actifs', 
      value: emprunts.filter(e => 
        e.statut === 'en_cours' && 
        (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
      ).length, 
      change: '0%',
      trend: 'neutral',
      color: 'from-indigo-500 to-indigo-600',
      icon: <Package className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20'
    }
  ];

  // Contenu conditionnel pour chaque onglet
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Interventions récentes */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {currentUser.role === 'admin' ? 'Interventions Récentes' : 'Mes Interventions'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {myInterventions.length} intervention(s) au total
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-colors duration-200">
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                {myInterventions.slice(0, 6).map((intervention, index) => (
                  <div 
                    key={intervention._id} 
                    className="group p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-400 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-500 text-sm font-bold text-gray-600 dark:text-gray-300">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                            {intervention.titre}
                          </h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              📍 {intervention.lieu}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              🗓️ {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          intervention.statut === 'terminee' 
                            ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' :
                          intervention.statut === 'en_cours' 
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800' :
                            'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                        }`}>
                          {intervention.statut === 'terminee' ? 'Terminée' :
                           intervention.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                      </div>
                    </div>
                  </div>
                ))}
                
                {myInterventions.length === 0 && (
                  <div className="text-center py-12">
                    <Wrench className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Aucune intervention</p>
                  </div>
                )}
              </div>
            </div>

            {/* Section Emprunts et Analytics */}
            <div className="space-y-8">
              {/* Derniers emprunts en cours */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {currentUser.role === 'admin' ? 'Emprunts Actifs' : 'Mes Emprunts'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {empruntsEnCours} emprunt(s) en cours
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {empruntsEnRetard > 0 && (
                        <span className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300 rounded-full text-xs font-semibold">
                          {empruntsEnRetard} en retard
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  {(currentUser.role === 'admin' ? derniersEmprunts : emprunts
                    .filter(e => 
                      e.statut === 'en_cours' && 
                      (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
                    )
                    .sort((a, b) => new Date(b.dateEmprunt) - new Date(a.dateEmprunt))
                    .slice(0, 4)
                  ).map((emprunt, index) => {
                    const materiel = stock.find(s => s._id === emprunt.materiel?._id || s._id === emprunt.materiel);
                    const estEnRetard = new Date(emprunt.dateRetourPrevue) < new Date();
                    const joursRestants = Math.ceil((new Date(emprunt.dateRetourPrevue) - new Date()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <div 
                        key={emprunt._id} 
                        className={`group p-4 rounded-xl border-l-4 transition-all duration-300 hover:shadow-md cursor-pointer ${
                          estEnRetard 
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400' 
                            : 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                              estEnRetard 
                                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300' 
                                : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                              <Package className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                                {emprunt.materiel?.nom || materiel?.nom}
                              </h4>
                              <div className="flex items-center gap-4 mt-1 text-xs text-gray-600 dark:text-gray-400">
                                <span>👤 {emprunt.emprunteur}</span>
                                <span>📦 {emprunt.quantite} unité(s)</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className={`text-sm font-semibold ${
                              estEnRetard 
                                ? 'text-red-600 dark:text-red-400' 
                                : 'text-green-600 dark:text-green-400'
                            }`}>
                              {estEnRetard ? `+${Math.abs(joursRestants)}j` : `${joursRestants}j`}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {((currentUser.role === 'admin' && derniersEmprunts.length === 0) || 
                    (currentUser.role !== 'admin' && emprunts.filter(e => 
                      e.statut === 'en_cours' && 
                      (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
                    ).length === 0)) && (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                      <p className="text-gray-500 dark:text-gray-400">Aucun emprunt en cours</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Matériels les plus empruntés (Admin seulement) */}
              {currentUser.role === 'admin' && materielsPlusEmpruntes.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Top Matériels
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Les plus empruntés
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {materielsPlusEmpruntes.map((materiel, index) => (
                      <div 
                        key={materiel._id} 
                        className="group flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-500 text-sm font-bold text-gray-600 dark:text-gray-300">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                              {materiel.nom}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                              {materiel.categorie}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${materiel.tauxUtilisation}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {materiel.nombreEmprunts}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Alertes urgentes */}
              {interventionsUrgentes.length > 0 && (
                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl shadow-lg border border-orange-200 dark:border-orange-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Interventions Urgentes
                      </h3>
                      <p className="text-orange-600 dark:text-orange-400 text-sm">
                        Nécessitent une attention immédiate
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {interventionsUrgentes.map(intervention => (
                      <div key={intervention._id} className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-orange-200 dark:border-orange-600">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            {intervention.titre}
                          </p>
                          <p className="text-xs text-orange-600 dark:text-orange-400">
                            {intervention.lieu} • {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-semibold">
                          URGENT
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            {/* Métriques avancées RÉELLES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Performance</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{tauxCompletion}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Temps Moyen</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {tempsMoyenJours >= 1 ? `${tempsMoyenJours}j` : `${tempsMoyenHeures}h`}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{tauxSatisfaction}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Croissance</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {croissance > 0 ? '+' : ''}{croissance}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphiques et analyses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interventions par Mois</h3>
                </div>
                <div className="space-y-3">
                  {chartData.interventionsParMois.map((count, index) => {
                    const maxValue = Math.max(...chartData.interventionsParMois, 1);
                    const date = new Date(now.getFullYear(), now.getMonth() - (11 - index), 1);
                    const moisNom = date.toLocaleDateString('fr-FR', { month: 'short' });
                    
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-12">{moisNom}</span>
                        <div className="flex items-center gap-3 flex-1 ml-4">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${(count / maxValue) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white w-8 text-right">
                            {count}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <PieChart className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Types d'Interventions</h3>
                </div>
                <div className="space-y-4">
                  {chartData.typesInterventions.length > 0 ? (
                    chartData.typesInterventions.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.type}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${item.count}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white w-8 text-right">
                            {item.count}%
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <PieChart className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                      <p className="text-gray-500 dark:text-gray-400">Aucune donnée disponible</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tableau des performances */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <LineChart className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performances Détaillées</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Métrique</th>
                      <th className="text-right py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Valeur</th>
                      <th className="text-right py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Évolution</th>
                      <th className="text-right py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Tendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 text-sm text-gray-600 dark:text-gray-400">Taux de Résolution</td>
                      <td className="py-3 text-sm text-right font-semibold text-gray-900 dark:text-white">{tauxResolution}%</td>
                      <td className={`py-3 text-sm text-right ${tauxResolution >= 90 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {tauxResolution >= 90 ? '+' : '-'}{Math.abs(100 - tauxResolution)}%
                      </td>
                      <td className="py-3 text-sm text-right">{tauxResolution >= 90 ? '↗' : '↘'}</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 text-sm text-gray-600 dark:text-gray-400">Temps de Réponse</td>
                      <td className="py-3 text-sm text-right font-semibold text-gray-900 dark:text-white">
                        {tempsReponseHeures > 0 ? `${tempsReponseHeures}h` : 'N/A'}
                      </td>
                      <td className={`py-3 text-sm text-right ${evolutionTempsReponse <= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {evolutionTempsReponse > 0 ? '+' : ''}{evolutionTempsReponse}%
                      </td>
                      <td className="py-3 text-sm text-right">{evolutionTempsReponse <= 0 ? '↘' : '↗'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-gray-600 dark:text-gray-400">Interventions Totales</td>
                      <td className="py-3 text-sm text-right font-semibold text-gray-900 dark:text-white">{interventions.length}</td>
                      <td className={`py-3 text-sm text-right ${croissance > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {croissance > 0 ? '+' : ''}{croissance}%
                      </td>
                      <td className="py-3 text-sm text-right">{croissance >= 0 ? '↗' : '↘'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Comparaison Emprunts */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Statistiques Emprunts</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Emprunts en Cours</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{empruntsEnCours}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Emprunts Retournés</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{empruntsRetournes}</p>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">En Retard</p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">{empruntsEnRetard}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Squelette de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-32"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-96"></div>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-44"></div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-44"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
      {/* Header avec navigation */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tableau de Bord
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {activeTab === 'overview' ? 'Vue d\'ensemble de votre activité' : 'Analyses détaillées et statistiques avancées'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg border border-gray-200 dark:border-gray-700">
              {['overview', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab === 'overview' ? 'Vue Générale' : 'Analytiques'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cartes de statistiques principales (toujours visibles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, idx) => (
            <div 
              key={idx} 
              className={`${stat.bgColor} rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'}
                  {stat.change}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
              
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-1000`}
                  style={{ width: `${Math.min(100, (stat.value / Math.max(1, interventions.length)) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Métriques secondaires */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Taux de Complétion</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{tauxCompletion}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Disponibilité Stock</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{tauxOccupation}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Emprunts en Retard</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{empruntsEnRetard}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 CONTENU DYNAMIQUE SELON L'ONGLET */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;