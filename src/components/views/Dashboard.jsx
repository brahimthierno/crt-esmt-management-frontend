
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

import React from 'react';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  Package, 
  Calendar,
  TrendingUp,
  BarChart3,
  AlertTriangle
} from 'lucide-react';

const Dashboard = ({ currentUser, interventions, stock, emprunts }) => {
  const myInterventions = currentUser.role !== 'admin' 
    ? interventions.filter(i => i.technicien?._id === currentUser._id)
    : interventions;

  // Calcul des statistiques des emprunts
  const empruntsEnCours = emprunts.filter(e => e.statut === 'en_cours').length;
  const empruntsRetournes = emprunts.filter(e => e.statut === 'retourne').length;

  // Top 3 des matériels les plus empruntés
  const materielsPlusEmpruntes = stock
    .map(materiel => {
      const empruntsMateriel = emprunts.filter(e => 
        e.materiel?._id === materiel._id || e.materiel === materiel._id
      );
      return {
        ...materiel,
        nombreEmprunts: empruntsMateriel.length,
      };
    })
    .sort((a, b) => b.nombreEmprunts - a.nombreEmprunts)
    .slice(0, 3);

  // Derniers emprunts actifs
  const derniersEmprunts = emprunts
    .filter(e => e.statut === 'en_cours')
    .sort((a, b) => new Date(b.dateEmprunt) - new Date(a.dateEmprunt))
    .slice(0, 3);

  // Cartes de statistiques principales
  const statsCards = currentUser.role === 'admin' ? [
    { 
      label: 'Total Interventions', 
      value: interventions.length, 
      color: 'bg-blue-500 dark:bg-blue-600',
      icon: <Wrench />
    },
    { 
      label: 'En cours', 
      value: interventions.filter(i => i.statut === 'en_cours').length, 
      color: 'bg-yellow-500 dark:bg-yellow-600',
      icon: <Clock />
    },
    { 
      label: 'Terminées', 
      value: interventions.filter(i => i.statut === 'terminee').length, 
      color: 'bg-green-500 dark:bg-green-600',
      icon: <CheckCircle />
    },
    { 
      label: 'Matériels en stock', 
      value: stock.length, 
      color: 'bg-purple-500 dark:bg-purple-600',
      icon: <Package />
    },
    { 
      label: 'Emprunts actifs', 
      value: empruntsEnCours, 
      color: 'bg-indigo-500 dark:bg-indigo-600',
      icon: <TrendingUp />
    },
    { 
      label: 'Emprunts retournés', 
      value: empruntsRetournes, 
      color: 'bg-teal-500 dark:bg-teal-600',
      icon: <CheckCircle />
    }
  ] : [
    { 
      label: 'Mes interventions', 
      value: myInterventions.length, 
      color: 'bg-blue-500 dark:bg-blue-600',
      icon: <Wrench />
    },
    { 
      label: 'En cours', 
      value: myInterventions.filter(i => i.statut === 'en_cours').length, 
      color: 'bg-yellow-500 dark:bg-yellow-600',
      icon: <Clock />
    },
    { 
      label: 'Terminées', 
      value: myInterventions.filter(i => i.statut === 'terminee').length, 
      color: 'bg-green-500 dark:bg-green-600',
      icon: <CheckCircle />
    },
    { 
      label: 'Planifiées', 
      value: myInterventions.filter(i => i.statut === 'planifiee').length, 
      color: 'bg-orange-500 dark:bg-orange-600',
      icon: <Calendar />
    },
    { 
      label: 'Mes emprunts actifs', 
      value: emprunts.filter(e => 
        e.statut === 'en_cours' && 
        (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
      ).length, 
      color: 'bg-indigo-500 dark:bg-indigo-600',
      icon: <TrendingUp />
    },
    { 
      label: 'Emprunts en retard', 
      value: emprunts.filter(e => 
        e.statut === 'en_cours' && 
        new Date(e.dateRetourPrevue) < new Date() &&
        (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
      ).length, 
      color: 'bg-red-500 dark:bg-red-600',
      icon: <AlertTriangle />
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
        Tableau de bord
      </h2>
      
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((stat, idx) => (
          <div key={idx} className={`${stat.color} text-white rounded-lg p-6 shadow-lg transition-all duration-200 hover:shadow-xl`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className="opacity-80">
                {React.cloneElement(stat.icon, { size: 32 })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interventions récentes */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <h3 className="text-xl font-semibold mb-4 dark:text-white transition-colors duration-200">
            {currentUser.role === 'admin' ? 'Interventions récentes' : 'Mes interventions à venir'}
          </h3>
          <div className="space-y-3">
            {myInterventions.slice(0, 5).map(intervention => (
              <div key={intervention._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg transition-colors duration-200">
                <div>
                  <p className="font-semibold dark:text-white transition-colors duration-200">{intervention.titre}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    {intervention.lieu} - {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  intervention.statut === 'terminee' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  intervention.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                } transition-colors duration-200`}>
                  {intervention.statut === 'terminee' ? 'Terminée' :
                   intervention.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
                </span>
              </div>
            ))}
            {myInterventions.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8 transition-colors duration-200">
                Aucune intervention
              </p>
            )}
          </div>
        </div>

        {/* Section Emprunts */}
        <div className="space-y-6">
          {/* Derniers emprunts en cours */}
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6 transition-colors duration-200">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-colors duration-200" />
              <h3 className="text-lg font-semibold dark:text-white transition-colors duration-200">
                {currentUser.role === 'admin' ? 'Derniers emprunts actifs' : 'Mes emprunts en cours'}
              </h3>
            </div>
            <div className="space-y-3">
              {(currentUser.role === 'admin' ? derniersEmprunts : emprunts
                .filter(e => 
                  e.statut === 'en_cours' && 
                  (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
                )
                .sort((a, b) => new Date(b.dateEmprunt) - new Date(a.dateEmprunt))
                .slice(0, 3)
              ).map(emprunt => {
                const materiel = stock.find(s => s._id === emprunt.materiel?._id || s._id === emprunt.materiel);
                const estEnRetard = new Date(emprunt.dateRetourPrevue) < new Date();
                
                return (
                  <div key={emprunt._id} className={`p-3 rounded border-l-4 transition-colors duration-200 ${
                    estEnRetard 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400' 
                      : 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm dark:text-white transition-colors duration-200">
                          {emprunt.materiel?.nom || materiel?.nom}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 transition-colors duration-200">
                          Quantité: {emprunt.quantite}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                          Retour: {new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      {estEnRetard && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 text-xs rounded-full transition-colors duration-200">
                          En retard
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
              {((currentUser.role === 'admin' && derniersEmprunts.length === 0) || 
                (currentUser.role !== 'admin' && emprunts.filter(e => 
                  e.statut === 'en_cours' && 
                  (e.responsable?._id === currentUser._id || e.responsable === currentUser._id)
                ).length === 0)) && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4 transition-colors duration-200">
                  Aucun emprunt en cours
                </p>
              )}
            </div>
          </div>

          {/* Matériels les plus empruntés (Admin seulement) */}
          {currentUser.role === 'admin' && materielsPlusEmpruntes.length > 0 && (
            <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6 transition-colors duration-200">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors duration-200" />
                <h3 className="text-lg font-semibold dark:text-white transition-colors duration-200">
                  Matériels les plus empruntés
                </h3>
              </div>
              <div className="space-y-3">
                {materielsPlusEmpruntes.map((materiel, index) => (
                  <div key={materiel._id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-dark-700 rounded transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded text-xs font-bold transition-colors duration-200">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm dark:text-white transition-colors duration-200">
                          {materiel.nom}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize transition-colors duration-200">
                          {materiel.categorie}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold dark:text-white transition-colors duration-200">
                        {materiel.nombreEmprunts} emprunts
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;