// import React, { useState } from 'react';

// const PlanningView = ({ interventions, users, currentUser }) => {
//   const [viewMode, setViewMode] = useState('semaine');
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const myInterventions = currentUser.role !== 'admin' 
//     ? interventions.filter(i => i.technicien?._id === currentUser._id)
//     : interventions;

//   const getWeekDays = () => {
//     const start = new Date(currentDate);
//     start.setDate(start.getDate() - start.getDay() + 1);
//     return Array.from({ length: 7 }, (_, i) => {
//       const day = new Date(start);
//       day.setDate(start.getDate() + i);
//       return day;
//     });
//   };

//   const getMonthDays = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const days = [];
    
//     for (let d = 1; d <= lastDay.getDate(); d++) {
//       days.push(new Date(year, month, d));
//     }
//     return days;
//   };

//   const formatDate = (date) => {
//     return date.toISOString().split('T')[0];
//   };

//   const getInterventionsForDate = (date) => {
//     const dateStr = formatDate(date);
//     return myInterventions.filter(i => {
//       const interventionDate = i.dateDebut?.split('T')[0];
//       return interventionDate === dateStr;
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Planning</h2>
//         <div className="flex gap-3">
//           <select
//             value={viewMode}
//             onChange={(e) => setViewMode(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg"
//           >
//             <option value="jour">Jour</option>
//             <option value="semaine">Semaine</option>
//             <option value="mois">Mois</option>
//           </select>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={() => {
//               const newDate = new Date(currentDate);
//               if (viewMode === 'jour') newDate.setDate(newDate.getDate() - 1);
//               else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() - 7);
//               else newDate.setMonth(newDate.getMonth() - 1);
//               setCurrentDate(newDate);
//             }}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//           >
//             ← Précédent
//           </button>
          
//           <h3 className="text-xl font-semibold">
//             {viewMode === 'mois' 
//               ? currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
//               : currentDate.toLocaleDateString('fr-FR')}
//           </h3>
          
//           <button
//             onClick={() => {
//               const newDate = new Date(currentDate);
//               if (viewMode === 'jour') newDate.setDate(newDate.getDate() + 1);
//               else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() + 7);
//               else newDate.setMonth(newDate.getMonth() + 1);
//               setCurrentDate(newDate);
//             }}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//           >
//             Suivant →
//           </button>
//         </div>

//         {viewMode === 'jour' && (
//           <div className="space-y-3">
//             {getInterventionsForDate(currentDate).map(intervention => {
//               const tech = intervention.technicien;
//               return (
//                 <div key={intervention._id} className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="font-semibold">{intervention.heureDebut} - {intervention.titre}</p>
//                       <p className="text-sm text-gray-600">{intervention.lieu}</p>
//                       {currentUser.role === 'admin' && tech && (
//                         <p className="text-sm text-gray-500">Technicien: {tech.prenom} {tech.nom}</p>
//                       )}
//                     </div>
//                     <span className={`px-2 py-1 rounded text-xs font-semibold ${
//                       intervention.statut === 'terminee' ? 'bg-green-100 text-green-800' :
//                       intervention.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-blue-100 text-blue-800'
//                     }`}>
//                       {intervention.statut === 'terminee' ? 'Terminée' :
//                        intervention.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//             {getInterventionsForDate(currentDate).length === 0 && (
//               <p className="text-center text-gray-500 py-8">Aucune intervention prévue</p>
//             )}
//           </div>
//         )}

//         {viewMode === 'semaine' && (
//           <div className="grid grid-cols-7 gap-2">
//             {getWeekDays().map((day, idx) => (
//               <div key={idx} className="border rounded-lg p-3 min-h-[150px]">
//                 <p className="font-semibold text-sm mb-2">
//                   {day.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}
//                 </p>
//                 <div className="space-y-2">
//                   {getInterventionsForDate(day).map(intervention => (
//                     <div key={intervention._id} className="p-2 bg-blue-100 rounded text-xs">
//                       <p className="font-semibold truncate">{intervention.heureDebut}</p>
//                       <p className="truncate">{intervention.titre}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {viewMode === 'mois' && (
//           <div className="grid grid-cols-7 gap-2">
//             {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
//               <div key={day} className="text-center font-semibold text-sm p-2">
//                 {day}
//               </div>
//             ))}
//             {getMonthDays().map((day, idx) => (
//               <div key={idx} className="border rounded-lg p-2 min-h-[100px]">
//                 <p className="text-sm font-semibold mb-1">{day.getDate()}</p>
//                 <div className="space-y-1">
//                   {getInterventionsForDate(day).map(intervention => (
//                     <div 
//                       key={intervention._id} 
//                       className="w-2 h-2 rounded-full bg-blue-500" 
//                       title={intervention.titre} 
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PlanningView;


// UNE VERSION POUR QUE LES INTERVENTIONS DANS LE CALENDRIER S'AFFICHENT DANS UN MODAL


// import React, { useState } from 'react';
// import { X, MapPin, Clock, User, FileText, Calendar } from 'lucide-react';

// const PlanningView = ({ interventions, users, currentUser }) => {
//   const [viewMode, setViewMode] = useState('semaine');
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedIntervention, setSelectedIntervention] = useState(null);

//   const myInterventions = currentUser.role !== 'admin' 
//     ? interventions.filter(i => i.technicien?._id === currentUser._id)
//     : interventions;

//   const getWeekDays = () => {
//     const start = new Date(currentDate);
//     start.setDate(start.getDate() - start.getDay() + 1);
//     return Array.from({ length: 7 }, (_, i) => {
//       const day = new Date(start);
//       day.setDate(start.getDate() + i);
//       return day;
//     });
//   };

//   const getMonthDays = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const days = [];
    
//     for (let d = 1; d <= lastDay.getDate(); d++) {
//       days.push(new Date(year, month, d));
//     }
//     return days;
//   };

//   const formatDate = (date) => {
//     return date.toISOString().split('T')[0];
//   };

//   const getInterventionsForDate = (date) => {
//     const dateStr = formatDate(date);
//     return myInterventions.filter(i => {
//       const interventionDate = i.dateDebut?.split('T')[0];
//       return interventionDate === dateStr;
//     });
//   };

//   const handleInterventionClick = (intervention) => {
//     setSelectedIntervention(intervention);
//   };

//   const closeModal = () => {
//     setSelectedIntervention(null);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Planning</h2>
//         <div className="flex gap-3">
//           <select
//             value={viewMode}
//             onChange={(e) => setViewMode(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg"
//           >
//             <option value="jour">Jour</option>
//             <option value="semaine">Semaine</option>
//             <option value="mois">Mois</option>
//           </select>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={() => {
//               const newDate = new Date(currentDate);
//               if (viewMode === 'jour') newDate.setDate(newDate.getDate() - 1);
//               else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() - 7);
//               else newDate.setMonth(newDate.getMonth() - 1);
//               setCurrentDate(newDate);
//             }}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//           >
//             ← Précédent
//           </button>
          
//           <h3 className="text-xl font-semibold">
//             {viewMode === 'mois' 
//               ? currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
//               : currentDate.toLocaleDateString('fr-FR')}
//           </h3>
          
//           <button
//             onClick={() => {
//               const newDate = new Date(currentDate);
//               if (viewMode === 'jour') newDate.setDate(newDate.getDate() + 1);
//               else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() + 7);
//               else newDate.setMonth(newDate.getMonth() + 1);
//               setCurrentDate(newDate);
//             }}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//           >
//             Suivant →
//           </button>
//         </div>

//         {viewMode === 'jour' && (
//           <div className="space-y-3">
//             {getInterventionsForDate(currentDate).map(intervention => {
//               const tech = intervention.technicien;
//               return (
//                 <div 
//                   key={intervention._id} 
//                   onClick={() => handleInterventionClick(intervention)}
//                   className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded cursor-pointer hover:bg-blue-100 transition"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="font-semibold">{intervention.heureDebut} - {intervention.titre}</p>
//                       <p className="text-sm text-gray-600">{intervention.lieu}</p>
//                       {currentUser.role === 'admin' && tech && (
//                         <p className="text-sm text-gray-500">Technicien: {tech.prenom} {tech.nom}</p>
//                       )}
//                     </div>
//                     <span className={`px-2 py-1 rounded text-xs font-semibold ${
//                       intervention.statut === 'terminee' ? 'bg-green-100 text-green-800' :
//                       intervention.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-blue-100 text-blue-800'
//                     }`}>
//                       {intervention.statut === 'terminee' ? 'Terminée' :
//                        intervention.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//             {getInterventionsForDate(currentDate).length === 0 && (
//               <p className="text-center text-gray-500 py-8">Aucune intervention prévue</p>
//             )}
//           </div>
//         )}

//         {viewMode === 'semaine' && (
//           <div className="grid grid-cols-7 gap-2">
//             {getWeekDays().map((day, idx) => (
//               <div key={idx} className="border rounded-lg p-3 min-h-[150px]">
//                 <p className="font-semibold text-sm mb-2">
//                   {day.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}
//                 </p>
//                 <div className="space-y-2">
//                   {getInterventionsForDate(day).map(intervention => (
//                     <div 
//                       key={intervention._id} 
//                       onClick={() => handleInterventionClick(intervention)}
//                       className="p-2 bg-blue-100 rounded text-xs cursor-pointer hover:bg-blue-200 transition"
//                     >
//                       <p className="font-semibold truncate">{intervention.heureDebut}</p>
//                       <p className="truncate">{intervention.titre}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {viewMode === 'mois' && (
//           <div className="grid grid-cols-7 gap-2">
//             {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
//               <div key={day} className="text-center font-semibold text-sm p-2">
//                 {day}
//               </div>
//             ))}
//             {getMonthDays().map((day, idx) => (
//               <div key={idx} className="border rounded-lg p-2 min-h-[100px]">
//                 <p className="text-sm font-semibold mb-1">{day.getDate()}</p>
//                 <div className="space-y-1">
//                   {getInterventionsForDate(day).map(intervention => (
//                     <div 
//                       key={intervention._id} 
//                       onClick={() => handleInterventionClick(intervention)}
//                       className="w-2 h-2 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-700 transition" 
//                       title={intervention.titre} 
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modal de détails */}
//       {selectedIntervention && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             {/* En-tête */}
//             <div className="flex justify-between items-start p-6 border-b">
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                   {selectedIntervention.titre}
//                 </h3>
//                 <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                   selectedIntervention.statut === 'terminee' ? 'bg-green-100 text-green-800' :
//                   selectedIntervention.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
//                   selectedIntervention.statut === 'planifiee' ? 'bg-blue-100 text-blue-800' :
//                   'bg-gray-100 text-gray-800'
//                 }`}>
//                   {selectedIntervention.statut === 'terminee' ? 'Terminée' :
//                    selectedIntervention.statut === 'en_cours' ? 'En cours' :
//                    selectedIntervention.statut === 'planifiee' ? 'Planifiée' : 'En attente'}
//                 </span>
//               </div>
//               <button 
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-gray-700 transition"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             {/* Contenu */}
//             <div className="p-6 space-y-4">
//               {/* Date et heure */}
//               <div className="flex items-start gap-3">
//                 <Calendar className="w-5 h-5 text-blue-600 mt-1" />
//                 <div>
//                   <p className="font-semibold text-gray-800">Date et heure</p>
//                   <p className="text-gray-600">
//                     {selectedIntervention.dateDebut && 
//                       new Date(selectedIntervention.dateDebut).toLocaleDateString('fr-FR', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })
//                     }
//                   </p>
//                   <p className="text-gray-600">
//                     {selectedIntervention.heureDebut && `${selectedIntervention.heureDebut}`}
//                     {selectedIntervention.heureFin && ` - ${selectedIntervention.heureFin}`}
//                   </p>
//                 </div>
//               </div>

//               {/* Lieu */}
//               {selectedIntervention.lieu && (
//                 <div className="flex items-start gap-3">
//                   <MapPin className="w-5 h-5 text-red-600 mt-1" />
//                   <div>
//                     <p className="font-semibold text-gray-800">Lieu</p>
//                     <p className="text-gray-600">{selectedIntervention.lieu}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Technicien */}
//               {selectedIntervention.technicien && (
//                 <div className="flex items-start gap-3">
//                   <User className="w-5 h-5 text-purple-600 mt-1" />
//                   <div>
//                     <p className="font-semibold text-gray-800">Technicien assigné</p>
//                     <p className="text-gray-600">
//                       {selectedIntervention.technicien.prenom} {selectedIntervention.technicien.nom}
//                     </p>
//                     {selectedIntervention.technicien.email && (
//                       <p className="text-sm text-gray-500">{selectedIntervention.technicien.email}</p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Description */}
//               {selectedIntervention.description && (
//                 <div className="flex items-start gap-3">
//                   <FileText className="w-5 h-5 text-green-600 mt-1" />
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-800 mb-1">Description</p>
//                     <p className="text-gray-600 whitespace-pre-wrap">
//                       {selectedIntervention.description}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Priorité */}
//               {selectedIntervention.priorite && (
//                 <div className="flex items-start gap-3">
//                   <Clock className="w-5 h-5 text-orange-600 mt-1" />
//                   <div>
//                     <p className="font-semibold text-gray-800">Priorité</p>
//                     <span className={`inline-block px-2 py-1 rounded text-sm font-semibold ${
//                       selectedIntervention.priorite === 'haute' ? 'bg-red-100 text-red-800' :
//                       selectedIntervention.priorite === 'moyenne' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-green-100 text-green-800'
//                     }`}>
//                       {selectedIntervention.priorite === 'haute' ? 'Haute' :
//                        selectedIntervention.priorite === 'moyenne' ? 'Moyenne' : 'Basse'}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {/* Demande liée */}
//               {selectedIntervention.demande && (
//                 <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                   <p className="font-semibold text-gray-800 mb-2">Demande associée</p>
//                   <p className="text-sm text-gray-600">
//                     Réf: {selectedIntervention.demande.numeroReference || 'N/A'}
//                   </p>
//                   {selectedIntervention.demande.titre && (
//                     <p className="text-sm text-gray-600">
//                       {selectedIntervention.demande.titre}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Pied du modal */}
//             <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
//               <button
//                 onClick={closeModal}
//                 className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition"
//               >
//                 Fermer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlanningView;



// UNE VERSION 2 POUR QUE LES INTERVENTIONS DANS LE CALENDRIER S'AFFICHENT DANS UN MODAL


import React, { useState } from 'react';
import { X, MapPin, Clock, User, FileText, Calendar } from 'lucide-react';

const PlanningView = ({ interventions, users, currentUser }) => {
  const [viewMode, setViewMode] = useState('semaine');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedIntervention, setSelectedIntervention] = useState(null);

  const myInterventions = currentUser.role !== 'admin' 
    ? interventions.filter(i => i.technicien?._id === currentUser._id)
    : interventions;

  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay() + 1);
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      return day;
    });
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getInterventionsForDate = (date) => {
    const dateStr = formatDate(date);
    return myInterventions.filter(i => {
      const interventionDate = i.dateDebut?.split('T')[0];
      return interventionDate === dateStr;
    });
  };

  const handleInterventionClick = (intervention) => {
    setSelectedIntervention(intervention);
  };

  const closeModal = () => {
    setSelectedIntervention(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Planning</h2>
        <div className="flex gap-3">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="jour">Jour</option>
            <option value="semaine">Semaine</option>
            <option value="mois">Mois</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              if (viewMode === 'jour') newDate.setDate(newDate.getDate() - 1);
              else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() - 7);
              else newDate.setMonth(newDate.getMonth() - 1);
              setCurrentDate(newDate);
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            ← Précédent
          </button>
          
          <h3 className="text-xl font-semibold">
            {viewMode === 'mois' 
              ? currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
              : currentDate.toLocaleDateString('fr-FR')}
          </h3>
          
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              if (viewMode === 'jour') newDate.setDate(newDate.getDate() + 1);
              else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() + 7);
              else newDate.setMonth(newDate.getMonth() + 1);
              setCurrentDate(newDate);
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Suivant →
          </button>
        </div>

        {viewMode === 'jour' && (
          <div className="space-y-3">
            {getInterventionsForDate(currentDate).map(intervention => {
              const tech = intervention.technicien;
              return (
                <div 
                  key={intervention._id} 
                  onClick={() => handleInterventionClick(intervention)}
                  className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded cursor-pointer hover:bg-blue-100 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{intervention.heureDebut} - {intervention.titre}</p>
                      <p className="text-sm text-gray-600">{intervention.lieu}</p>
                      {currentUser.role === 'admin' && tech && (
                        <p className="text-sm text-gray-500">Technicien: {tech.prenom} {tech.nom}</p>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      intervention.statut === 'terminee' ? 'bg-green-100 text-green-800' :
                      intervention.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {intervention.statut === 'terminee' ? 'Terminée' :
                       intervention.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
                    </span>
                  </div>
                </div>
              );
            })}
            {getInterventionsForDate(currentDate).length === 0 && (
              <p className="text-center text-gray-500 py-8">Aucune intervention prévue</p>
            )}
          </div>
        )}

        {viewMode === 'semaine' && (
          <div className="grid grid-cols-7 gap-2">
            {getWeekDays().map((day, idx) => (
              <div key={idx} className="border rounded-lg p-3 min-h-[150px]">
                <p className="font-semibold text-sm mb-2">
                  {day.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}
                </p>
                <div className="space-y-2">
                  {getInterventionsForDate(day).map(intervention => (
                    <div 
                      key={intervention._id} 
                      onClick={() => handleInterventionClick(intervention)}
                      className="p-2 bg-blue-100 rounded text-xs cursor-pointer hover:bg-blue-200 transition"
                    >
                      <p className="font-semibold truncate">{intervention.heureDebut}</p>
                      <p className="truncate">{intervention.titre}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'mois' && (
          <div className="grid grid-cols-7 gap-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
              <div key={day} className="text-center font-semibold text-sm p-2">
                {day}
              </div>
            ))}
            {getMonthDays().map((day, idx) => (
              <div key={idx} className="border rounded-lg p-2 min-h-[100px]">
                <p className="text-sm font-semibold mb-1">{day.getDate()}</p>
                <div className="space-y-1">
                  {getInterventionsForDate(day).map(intervention => (
                    <div 
                      key={intervention._id} 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInterventionClick(intervention);
                      }}
                      className="p-1 bg-blue-500 hover:bg-blue-700 rounded cursor-pointer transition text-white text-xs truncate" 
                      title={intervention.titre}
                    >
                      {intervention.heureDebut}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de détails */}
      {selectedIntervention && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* En-tête */}
            <div className="flex justify-between items-start p-6 border-b">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedIntervention.titre}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  selectedIntervention.statut === 'terminee' ? 'bg-green-100 text-green-800' :
                  selectedIntervention.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
                  selectedIntervention.statut === 'planifiee' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedIntervention.statut === 'terminee' ? 'Terminée' :
                   selectedIntervention.statut === 'en_cours' ? 'En cours' :
                   selectedIntervention.statut === 'planifiee' ? 'Planifiée' : 'En attente'}
                </span>
              </div>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Contenu */}
            <div className="p-6 space-y-4">
              {/* Date et heure */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Date et heure</p>
                  <p className="text-gray-600">
                    {selectedIntervention.dateDebut && 
                      new Date(selectedIntervention.dateDebut).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    }
                  </p>
                  <p className="text-gray-600">
                    {selectedIntervention.heureDebut && `${selectedIntervention.heureDebut}`}
                    {selectedIntervention.heureFin && ` - ${selectedIntervention.heureFin}`}
                  </p>
                </div>
              </div>

              {/* Lieu */}
              {selectedIntervention.lieu && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Lieu</p>
                    <p className="text-gray-600">{selectedIntervention.lieu}</p>
                  </div>
                </div>
              )}

              {/* Technicien */}
              {selectedIntervention.technicien && (
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Technicien assigné</p>
                    <p className="text-gray-600">
                      {selectedIntervention.technicien.prenom} {selectedIntervention.technicien.nom}
                    </p>
                    {selectedIntervention.technicien.email && (
                      <p className="text-sm text-gray-500">{selectedIntervention.technicien.email}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedIntervention.description && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-green-600 mt-1" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 mb-1">Description</p>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {selectedIntervention.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Priorité */}
              {selectedIntervention.priorite && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Priorité</p>
                    <span className={`inline-block px-2 py-1 rounded text-sm font-semibold ${
                      selectedIntervention.priorite === 'haute' ? 'bg-red-100 text-red-800' :
                      selectedIntervention.priorite === 'moyenne' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedIntervention.priorite === 'haute' ? 'Haute' :
                       selectedIntervention.priorite === 'moyenne' ? 'Moyenne' : 'Basse'}
                    </span>
                  </div>
                </div>
              )}

              {/* Demande liée */}
              {selectedIntervention.demande && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Demande associée
                  </p>
                  <div className="space-y-2">
                    {selectedIntervention.demande.numeroReference && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Référence: </span>
                        <span className="text-gray-600">{selectedIntervention.demande.numeroReference}</span>
                      </p>
                    )}
                    {selectedIntervention.demande.titre && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Titre: </span>
                        <span className="text-gray-600">{selectedIntervention.demande.titre}</span>
                      </p>
                    )}
                    {selectedIntervention.demande.description && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Description: </span>
                        <span className="text-gray-600">{selectedIntervention.demande.description}</span>
                      </p>
                    )}
                    {selectedIntervention.demande.demandeur && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Demandeur: </span>
                        <span className="text-gray-600">
                          {selectedIntervention.demande.demandeur.prenom} {selectedIntervention.demande.demandeur.nom}
                        </span>
                      </p>
                    )}
                    {selectedIntervention.demande.email && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Email: </span>
                        <span className="text-gray-600">{selectedIntervention.demande.email}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Pied du modal */}
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanningView;