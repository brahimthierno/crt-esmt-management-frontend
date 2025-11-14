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
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleInterventionClick(intervention);
//                       }}
//                       className="p-1 bg-blue-500 hover:bg-blue-700 rounded cursor-pointer transition text-white text-xs truncate" 
//                       title={intervention.titre}
//                     >
//                       {intervention.heureDebut}
//                     </div>
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
//                 <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                   <p className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <FileText className="w-4 h-4" />
//                     Demande associée
//                   </p>
//                   <div className="space-y-2">
//                     {selectedIntervention.demande.numeroReference && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Référence: </span>
//                         <span className="text-gray-600">{selectedIntervention.demande.numeroReference}</span>
//                       </p>
//                     )}
//                     {selectedIntervention.demande.titre && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Titre: </span>
//                         <span className="text-gray-600">{selectedIntervention.demande.titre}</span>
//                       </p>
//                     )}
//                     {selectedIntervention.demande.description && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Description: </span>
//                         <span className="text-gray-600">{selectedIntervention.demande.description}</span>
//                       </p>
//                     )}
//                     {selectedIntervention.demande.demandeur && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Demandeur: </span>
//                         <span className="text-gray-600">
//                           {selectedIntervention.demande.demandeur.prenom} {selectedIntervention.demande.demandeur.nom}
//                         </span>
//                       </p>
//                     )}
//                     {selectedIntervention.demande.email && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Email: </span>
//                         <span className="text-gray-600">{selectedIntervention.demande.email}</span>
//                       </p>
//                     )}
//                   </div>
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


// NOUVELLE VERSION POUR AMELIORER AVEC UNE LEGENDE DES STATUTS ET UN MEILLEUR DESIGN DU MODAL



// import React, { useState } from 'react';
// import { X, MapPin, Clock, User, FileText, Calendar, AlertCircle } from 'lucide-react';

// const PlanningView = ({ interventions, users, currentUser }) => {
//   const [viewMode, setViewMode] = useState('semaine');
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedIntervention, setSelectedIntervention] = useState(null);

//   const myInterventions = currentUser.role !== 'admin' 
//     ? interventions.filter(i => i.technicien?._id === currentUser._id)
//     : interventions;

//   // Fonction pour obtenir les styles selon le statut
//   const getStatusStyles = (statut) => {
//     switch (statut) {
//       case 'terminee':
//         return {
//           bg: 'bg-green-100',
//           border: 'border-green-500',
//           hoverBg: 'hover:bg-green-200',
//           text: 'text-green-800',
//           badgeBg: 'bg-green-100',
//           badgeText: 'text-green-800',
//           label: 'Terminée',
//           dotColor: 'bg-green-500'
//         };
//       case 'en_cours':
//         return {
//           bg: 'bg-yellow-100',
//           border: 'border-yellow-500',
//           hoverBg: 'hover:bg-yellow-200',
//           text: 'text-yellow-800',
//           badgeBg: 'bg-yellow-100',
//           badgeText: 'text-yellow-800',
//           label: 'En cours',
//           dotColor: 'bg-yellow-500'
//         };
//       case 'en_attente_validation':
//         return {
//           bg: 'bg-orange-100',
//           border: 'border-orange-500',
//           hoverBg: 'hover:bg-orange-200',
//           text: 'text-orange-800',
//           badgeBg: 'bg-orange-100',
//           badgeText: 'text-orange-800',
//           label: 'En attente de validation',
//           dotColor: 'bg-orange-500'
//         };
//       case 'planifiee':
//       default:
//         return {
//           bg: 'bg-blue-100',
//           border: 'border-blue-500',
//           hoverBg: 'hover:bg-blue-200',
//           text: 'text-blue-800',
//           badgeBg: 'bg-blue-100',
//           badgeText: 'text-blue-800',
//           label: 'Planifiée',
//           dotColor: 'bg-blue-500'
//         };
//     }
//   };

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
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* En-tête */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//           <div>
//             <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Planning des Interventions
//             </h2>
//             <p className="text-gray-600 mt-2">
//               {currentUser.role === 'admin' 
//                 ? 'Vue d\'ensemble de toutes les interventions' 
//                 : 'Vos interventions planifiées'}
//             </p>
//           </div>
          
//           <div className="flex gap-3">
//             <select
//               value={viewMode}
//               onChange={(e) => setViewMode(e.target.value)}
//               className="px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
//             >
//               <option value="jour">Vue Jour</option>
//               <option value="semaine">Vue Semaine</option>
//               <option value="mois">Vue Mois</option>
//             </select>
//           </div>
//         </div>

//         {/* Légende des statuts */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
//           <div className="flex items-center gap-2 mb-3">
//             <AlertCircle size={18} className="text-gray-600" />
//             <h3 className="text-sm font-semibold text-gray-700">Légende des statuts</h3>
//           </div>
//           <div className="flex flex-wrap gap-4">
//             {[
//               { statut: 'planifiee', icon: '📅' },
//               { statut: 'en_cours', icon: '⚡' },
//               { statut: 'en_attente_validation', icon: '⏳' },
//               { statut: 'terminee', icon: '✅' }
//             ].map(({ statut, icon }) => {
//               const styles = getStatusStyles(statut);
//               return (
//                 <div key={statut} className="flex items-center gap-2">
//                   <div className={`w-3 h-3 rounded-full ${styles.dotColor}`}></div>
//                   <span className="text-sm text-gray-700">
//                     {icon} <span className="font-medium">{styles.label}</span>
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Calendrier principal */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//           {/* Navigation */}
//           <div className="flex justify-between items-center mb-6">
//             <button
//               onClick={() => {
//                 const newDate = new Date(currentDate);
//                 if (viewMode === 'jour') newDate.setDate(newDate.getDate() - 1);
//                 else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() - 7);
//                 else newDate.setMonth(newDate.getMonth() - 1);
//                 setCurrentDate(newDate);
//               }}
//               className="px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
//             >
//               ← Précédent
//             </button>
            
//             <h3 className="text-xl font-bold text-gray-800">
//               {viewMode === 'mois' 
//                 ? currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
//                 : currentDate.toLocaleDateString('fr-FR', { 
//                     weekday: 'long', 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                   })}
//             </h3>
            
//             <button
//               onClick={() => {
//                 const newDate = new Date(currentDate);
//                 if (viewMode === 'jour') newDate.setDate(newDate.getDate() + 1);
//                 else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() + 7);
//                 else newDate.setMonth(newDate.getMonth() + 1);
//                 setCurrentDate(newDate);
//               }}
//               className="px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
//             >
//               Suivant →
//             </button>
//           </div>

//           {/* Vue Jour */}
//           {viewMode === 'jour' && (
//             <div className="space-y-3">
//               {getInterventionsForDate(currentDate).map(intervention => {
//                 const tech = intervention.technicien;
//                 const styles = getStatusStyles(intervention.statut);
//                 return (
//                   <div 
//                     key={intervention._id} 
//                     onClick={() => handleInterventionClick(intervention)}
//                     className={`p-4 ${styles.bg} border-l-4 ${styles.border} rounded-xl cursor-pointer ${styles.hoverBg} transition-all duration-200 shadow-sm hover:shadow-md`}
//                   >
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <span className={`w-2 h-2 rounded-full ${styles.dotColor}`}></span>
//                           <p className={`font-bold text-lg ${styles.text}`}>
//                             {intervention.heureDebut} - {intervention.titre}
//                           </p>
//                         </div>
//                         <div className="ml-5 space-y-1">
//                           <p className="text-sm text-gray-700 flex items-center gap-2">
//                             <MapPin size={14} />
//                             {intervention.lieu}
//                           </p>
//                           {currentUser.role === 'admin' && tech && (
//                             <p className="text-sm text-gray-600 flex items-center gap-2">
//                               <User size={14} />
//                               {tech.prenom} {tech.nom}
//                             </p>
//                           )}
//                           {intervention.priorite && (
//                             <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
//                               intervention.priorite === 'haute' ? 'bg-red-100 text-red-700' :
//                               intervention.priorite === 'moyenne' ? 'bg-yellow-100 text-yellow-700' :
//                               'bg-green-100 text-green-700'
//                             }`}>
//                               {intervention.priorite === 'haute' ? '🔴 Haute' :
//                                intervention.priorite === 'moyenne' ? '🟡 Moyenne' : '🟢 Basse'}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                       <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${styles.badgeBg} ${styles.badgeText} whitespace-nowrap`}>
//                         {styles.label}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//               {getInterventionsForDate(currentDate).length === 0 && (
//                 <div className="text-center py-16">
//                   <Calendar size={64} className="mx-auto mb-4 text-gray-300" />
//                   <p className="text-lg font-medium text-gray-500">Aucune intervention prévue</p>
//                   <p className="text-sm text-gray-400 mt-1">Profitez de cette journée libre !</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Vue Semaine */}
//           {viewMode === 'semaine' && (
//             <div className="grid grid-cols-7 gap-3">
//               {getWeekDays().map((day, idx) => {
//                 const isToday = formatDate(day) === formatDate(new Date());
//                 return (
//                   <div 
//                     key={idx} 
//                     className={`border-2 rounded-xl p-3 min-h-[180px] transition-all duration-200 ${
//                       isToday 
//                         ? 'border-blue-500 bg-blue-50/50 shadow-md' 
//                         : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <div className={`font-bold text-sm mb-3 pb-2 border-b-2 ${
//                       isToday ? 'border-blue-500 text-blue-700' : 'border-gray-200 text-gray-700'
//                     }`}>
//                       <p className="capitalize">
//                         {day.toLocaleDateString('fr-FR', { weekday: 'short' })}
//                       </p>
//                       <p className={`text-lg ${isToday ? 'text-blue-600' : 'text-gray-800'}`}>
//                         {day.getDate()}
//                       </p>
//                     </div>
//                     <div className="space-y-2">
//                       {getInterventionsForDate(day).map(intervention => {
//                         const styles = getStatusStyles(intervention.statut);
//                         return (
//                           <div 
//                             key={intervention._id} 
//                             onClick={() => handleInterventionClick(intervention)}
//                             className={`p-2 ${styles.bg} border ${styles.border} rounded-lg text-xs cursor-pointer ${styles.hoverBg} transition-all duration-200 shadow-sm`}
//                           >
//                             <div className="flex items-center gap-1 mb-1">
//                               <span className={`w-1.5 h-1.5 rounded-full ${styles.dotColor}`}></span>
//                               <p className={`font-bold ${styles.text}`}>{intervention.heureDebut}</p>
//                             </div>
//                             <p className={`font-medium truncate ${styles.text}`}>{intervention.titre}</p>
//                             <p className="text-gray-600 text-[10px] truncate mt-1 flex items-center gap-1">
//                               <MapPin size={10} />
//                               {intervention.lieu}
//                             </p>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* Vue Mois */}
//           {viewMode === 'mois' && (
//             <div>
//               <div className="grid grid-cols-7 gap-2 mb-2">
//                 {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
//                   <div key={day} className="text-center font-bold text-sm p-2 text-gray-700 bg-gray-50 rounded-lg">
//                     {day}
//                   </div>
//                 ))}
//               </div>
//               <div className="grid grid-cols-7 gap-2">
//                 {getMonthDays().map((day, idx) => {
//                   const isToday = formatDate(day) === formatDate(new Date());
//                   const interventionsOfDay = getInterventionsForDate(day);
                  
//                   return (
//                     <div 
//                       key={idx} 
//                       className={`border-2 rounded-xl p-2 min-h-[120px] transition-all duration-200 ${
//                         isToday 
//                           ? 'border-blue-500 bg-blue-50/50 shadow-md' 
//                           : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
//                       }`}
//                     >
//                       <p className={`text-sm font-bold mb-2 ${
//                         isToday ? 'text-blue-600' : 'text-gray-700'
//                       }`}>
//                         {day.getDate()}
//                       </p>
//                       <div className="space-y-1">
//                         {interventionsOfDay.map(intervention => {
//                           const styles = getStatusStyles(intervention.statut);
//                           return (
//                             <div 
//                               key={intervention._id} 
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleInterventionClick(intervention);
//                               }}
//                               className={`p-1.5 ${styles.bg} border ${styles.border} rounded-lg cursor-pointer ${styles.hoverBg} transition-all duration-200 shadow-sm`}
//                               title={`${intervention.titre} - ${styles.label}`}
//                             >
//                               <div className="flex items-center gap-1">
//                                 <span className={`w-1.5 h-1.5 rounded-full ${styles.dotColor} flex-shrink-0`}></span>
//                                 <p className={`text-[10px] font-bold ${styles.text} truncate`}>
//                                   {intervention.heureDebut}
//                                 </p>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modal de détails */}
//       {selectedIntervention && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
//             {/* En-tête */}
//             <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-2xl font-bold text-white mb-3">
//                     {selectedIntervention.titre}
//                   </h3>
//                   <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
//                     getStatusStyles(selectedIntervention.statut).badgeBg
//                   } ${getStatusStyles(selectedIntervention.statut).badgeText}`}>
//                     {getStatusStyles(selectedIntervention.statut).label}
//                   </span>
//                 </div>
//                 <button 
//                   onClick={closeModal}
//                   className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
//                 >
//                   <X size={24} className="text-white" />
//                 </button>
//               </div>
//             </div>

//             {/* Contenu */}
//             <div className="p-6 space-y-5 max-h-[calc(90vh-180px)] overflow-y-auto">
//               {/* Date et heure */}
//               <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
//                 <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
//                 <div>
//                   <p className="font-semibold text-gray-800 mb-1">Date et heure</p>
//                   <p className="text-gray-700">
//                     {selectedIntervention.dateDebut && 
//                       new Date(selectedIntervention.dateDebut).toLocaleDateString('fr-FR', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })
//                     }
//                   </p>
//                   <p className="text-gray-600 text-sm mt-1">
//                     {selectedIntervention.heureDebut && `⏰ ${selectedIntervention.heureDebut}`}
//                     {selectedIntervention.heureFin && ` - ${selectedIntervention.heureFin}`}
//                   </p>
//                 </div>
//               </div>

//               {/* Lieu */}
//               {selectedIntervention.lieu && (
//                 <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
//                   <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
//                   <div>
//                     <p className="font-semibold text-gray-800 mb-1">Lieu</p>
//                     <p className="text-gray-700">{selectedIntervention.lieu}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Technicien */}
//               {selectedIntervention.technicien && (
//                 <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
//                   <User className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
//                   <div>
//                     <p className="font-semibold text-gray-800 mb-1">Technicien assigné</p>
//                     <p className="text-gray-700">
//                       {selectedIntervention.technicien.prenom} {selectedIntervention.technicien.nom}
//                     </p>
//                     {selectedIntervention.technicien.email && (
//                       <p className="text-sm text-gray-600 mt-1">{selectedIntervention.technicien.email}</p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Description */}
//               {selectedIntervention.description && (
//                 <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
//                   <FileText className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-800 mb-2">Description</p>
//                     <p className="text-gray-700 whitespace-pre-wrap">
//                       {selectedIntervention.description}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Priorité */}
//               {selectedIntervention.priorite && (
//                 <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
//                   <Clock className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
//                   <div>
//                     <p className="font-semibold text-gray-800 mb-2">Priorité</p>
//                     <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${
//                       selectedIntervention.priorite === 'haute' ? 'bg-red-100 text-red-800' :
//                       selectedIntervention.priorite === 'moyenne' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-green-100 text-green-800'
//                     }`}>
//                       {selectedIntervention.priorite === 'haute' ? '🔴 Haute' :
//                        selectedIntervention.priorite === 'moyenne' ? '🟡 Moyenne' : '🟢 Basse'}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {/* Demande liée */}
//               {selectedIntervention.demande && (
//                 <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
//                   <p className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <FileText className="w-5 h-5" />
//                     Demande associée
//                   </p>
//                   <div className="space-y-2 ml-7">
//                     {selectedIntervention.demande.numeroReference && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Référence: </span>
//                         <span className="text-gray-600">{selectedIntervention.demande.numeroReference}</span>
//                       </p>
//                     )}
//                     {selectedIntervention.demande.titre && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Titre: </span>
//                         <span className="text-gray-600">{selectedIntervention.demande.titre}</span>
//                       </p>
//                     )}
//                     {selectedIntervention.demande.description && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Description: </span>
//                         <span className="text-gray-600">{selectedIntervention.demande.description}</span>
//                       </p>
//                     )}
//                     {selectedIntervention.demande.demandeur && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Demandeur: </span>
//                         <span className="text-gray-600">
//                           {selectedIntervention.demande.demandeur.prenom} {selectedIntervention.demande.demandeur.nom}
//                         </span>
//                       </p>
//                     )}
//                     {selectedIntervention.demande.email && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Email: </span>
//                         <span className="text-gray-600">{selectedIntervention.demande.email}</span>
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Pied du modal */}
//             <div className="p-6 border-t bg-gray-50 flex justify-end">
//               <button
//                 onClick={closeModal}
//                 className="px-6 py-2.5 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
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


// NOUVELLE VERSION ENCORE POUR AMELIORER AVEC UNE LEGENDE DES STATUTS ET UN MEILLEUR DESIGN DU MODAL ET AJOUT DE FILTRES


// import React, { useState } from 'react';
// import { X, MapPin, Clock, User, FileText, Calendar, AlertCircle, Filter, Search, RotateCcw } from 'lucide-react';

// const PlanningView = ({ interventions, users, currentUser }) => {
//   const [viewMode, setViewMode] = useState('semaine');
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedIntervention, setSelectedIntervention] = useState(null);
  
//   // États pour les filtres
//   const [filterStatut, setFilterStatut] = useState('');
//   const [filterPriorite, setFilterPriorite] = useState('');
//   const [filterTechnicien, setFilterTechnicien] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState(false);

//   // Fonction pour obtenir les styles selon le statut
//   const getStatusStyles = (statut) => {
//     switch (statut) {
//       case 'terminee':
//         return {
//           bg: 'bg-green-100',
//           border: 'border-green-500',
//           hoverBg: 'hover:bg-green-200',
//           text: 'text-green-800',
//           badgeBg: 'bg-green-100',
//           badgeText: 'text-green-800',
//           label: 'Terminée',
//           dotColor: 'bg-green-500'
//         };
//       case 'en_cours':
//         return {
//           bg: 'bg-yellow-100',
//           border: 'border-yellow-500',
//           hoverBg: 'hover:bg-yellow-200',
//           text: 'text-yellow-800',
//           badgeBg: 'bg-yellow-100',
//           badgeText: 'text-yellow-800',
//           label: 'En cours',
//           dotColor: 'bg-yellow-500'
//         };
//       case 'en_attente_validation':
//         return {
//           bg: 'bg-orange-100',
//           border: 'border-orange-500',
//           hoverBg: 'hover:bg-orange-200',
//           text: 'text-orange-800',
//           badgeBg: 'bg-orange-100',
//           badgeText: 'text-orange-800',
//           label: 'En attente de validation',
//           dotColor: 'bg-orange-500'
//         };
//       case 'planifiee':
//       default:
//         return {
//           bg: 'bg-blue-100',
//           border: 'border-blue-500',
//           hoverBg: 'hover:bg-blue-200',
//           text: 'text-blue-800',
//           badgeBg: 'bg-blue-100',
//           badgeText: 'text-blue-800',
//           label: 'Planifiée',
//           dotColor: 'bg-blue-500'
//         };
//     }
//   };

//   // Appliquer les filtres
//   let myInterventions = currentUser.role !== 'admin' 
//     ? interventions.filter(i => i.technicien?._id === currentUser._id)
//     : interventions;

//   // Filtrer selon les critères
//   myInterventions = myInterventions.filter(intervention => {
//     // Filtre par statut
//     if (filterStatut && intervention.statut !== filterStatut) return false;
    
//     // Filtre par priorité
//     if (filterPriorite && intervention.priorite !== filterPriorite) return false;
    
//     // Filtre par technicien (uniquement pour admin)
//     if (currentUser.role === 'admin' && filterTechnicien && intervention.technicien?._id !== filterTechnicien) return false;
    
//     // Recherche par texte
//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       return (
//         intervention.titre?.toLowerCase().includes(searchLower) ||
//         intervention.description?.toLowerCase().includes(searchLower) ||
//         intervention.lieu?.toLowerCase().includes(searchLower) ||
//         intervention.materiel?.toLowerCase().includes(searchLower)
//       );
//     }
    
//     return true;
//   });

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

//   // Fonction pour réinitialiser les filtres
//   const resetFilters = () => {
//     setFilterStatut('');
//     setFilterPriorite('');
//     setFilterTechnicien('');
//     setSearchTerm('');
//   };

//   // Vérifier si des filtres sont actifs
//   const hasActiveFilters = filterStatut || filterPriorite || filterTechnicien || searchTerm;

//   // Obtenir la liste des techniciens pour le filtre
//   const techniciens = users.filter(u => u.role !== 'admin');

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* En-tête */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//           <div>
//             <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Planning des Interventions
//             </h2>
//             <p className="text-gray-600 mt-2">
//               {currentUser.role === 'admin' 
//                 ? 'Vue d\'ensemble de toutes les interventions' 
//                 : 'Vos interventions planifiées'}
//             </p>
//           </div>
          
//           <div className="flex gap-3">
//             <select
//               value={viewMode}
//               onChange={(e) => setViewMode(e.target.value)}
//               className="px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
//             >
//               <option value="jour">Vue Jour</option>
//               <option value="semaine">Vue Semaine</option>
//               <option value="mois">Vue Mois</option>
//             </select>
//           </div>
//         </div>

//         {/* Légende des statuts */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
//           <div className="flex items-center gap-2 mb-3">
//             <AlertCircle size={18} className="text-gray-600" />
//             <h3 className="text-sm font-semibold text-gray-700">Légende des statuts</h3>
//           </div>
//           <div className="flex flex-wrap gap-4">
//             {[
//               { statut: 'planifiee', icon: '📅' },
//               { statut: 'en_cours', icon: '⚡' },
//               { statut: 'en_attente_validation', icon: '⏳' },
//               { statut: 'terminee', icon: '✅' }
//             ].map(({ statut, icon }) => {
//               const styles = getStatusStyles(statut);
//               return (
//                 <div key={statut} className="flex items-center gap-2">
//                   <div className={`w-3 h-3 rounded-full ${styles.dotColor}`}></div>
//                   <span className="text-sm text-gray-700">
//                     {icon} <span className="font-medium">{styles.label}</span>
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Barre de recherche et filtres */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Barre de recherche */}
//             <div className="flex-1 relative">
//               <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Rechercher une intervention..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//               />
//             </div>

//             {/* Bouton filtres */}
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
//                 hasActiveFilters 
//                   ? 'bg-blue-100 border-2 border-blue-500 text-blue-700' 
//                   : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
//               }`}
//             >
//               <Filter size={18} />
//               Filtres
//               {hasActiveFilters && (
//                 <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
//               )}
//             </button>

//             {/* Bouton réinitialiser */}
//             {hasActiveFilters && (
//               <button
//                 onClick={resetFilters}
//                 className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl hover:bg-red-100 transition-all duration-200 font-medium"
//               >
//                 <RotateCcw size={18} />
//                 Réinitialiser
//               </button>
//             )}
//           </div>

//           {/* Panneau des filtres */}
//           {showFilters && (
//             <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* Filtre par statut */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                     <AlertCircle size={16} />
//                     Statut
//                   </label>
//                   <select
//                     value={filterStatut}
//                     onChange={(e) => setFilterStatut(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                   >
//                     <option value="">Tous les statuts</option>
//                     <option value="planifiee">📅 Planifiée</option>
//                     <option value="en_cours">⚡ En cours</option>
//                     <option value="en_attente_validation">⏳ En attente de validation</option>
//                     <option value="terminee">✅ Terminée</option>
//                   </select>
//                 </div>

//                 {/* Filtre par priorité */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                     <Clock size={16} />
//                     Priorité
//                   </label>
//                   <select
//                     value={filterPriorite}
//                     onChange={(e) => setFilterPriorite(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                   >
//                     <option value="">Toutes les priorités</option>
//                     <option value="haute">🔴 Haute</option>
//                     <option value="moyenne">🟡 Moyenne</option>
//                     <option value="basse">🟢 Basse</option>
//                   </select>
//                 </div>

//                 {/* Filtre par technicien (uniquement pour admin) */}
//                 {currentUser.role === 'admin' && (
//                   <div>
//                     <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
//                       <User size={16} />
//                       Technicien
//                     </label>
//                     <select
//                       value={filterTechnicien}
//                       onChange={(e) => setFilterTechnicien(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                     >
//                       <option value="">Tous les techniciens</option>
//                       {techniciens.map(tech => (
//                         <option key={tech._id} value={tech._id}>
//                           {tech.prenom} {tech.nom}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//               </div>

//               {/* Compteur de résultats */}
//               <div className="mt-4 pt-4 border-t border-gray-300">
//                 <p className="text-sm text-gray-600 text-center">
//                   <span className="font-bold text-blue-600">{myInterventions.length}</span> intervention(s) trouvée(s)
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Calendrier principal */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//           {/* Navigation */}
//           <div className="flex justify-between items-center mb-6">
//             <button
//               onClick={() => {
//                 const newDate = new Date(currentDate);
//                 if (viewMode === 'jour') newDate.setDate(newDate.getDate() - 1);
//                 else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() - 7);
//                 else newDate.setMonth(newDate.getMonth() - 1);
//                 setCurrentDate(newDate);
//               }}
//               className="px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
//             >
//               ← Précédent
//             </button>
            
//             <h3 className="text-xl font-bold text-gray-800">
//               {viewMode === 'mois' 
//                 ? currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
//                 : currentDate.toLocaleDateString('fr-FR', { 
//                     weekday: 'long', 
//                     year: 'numeric', 
//                     month: 'long', 
//                     day: 'numeric' 
//                   })}
//             </h3>
            
//             <button
//               onClick={() => {
//                 const newDate = new Date(currentDate);
//                 if (viewMode === 'jour') newDate.setDate(newDate.getDate() + 1);
//                 else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() + 7);
//                 else newDate.setMonth(newDate.getMonth() + 1);
//                 setCurrentDate(newDate);
//               }}
//               className="px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
//             >
//               Suivant →
//             </button>
//           </div>

//           {/* Vue Jour */}
//           {viewMode === 'jour' && (
//             <div className="space-y-3">
//               {getInterventionsForDate(currentDate).map(intervention => {
//                 const tech = intervention.technicien;
//                 const styles = getStatusStyles(intervention.statut);
//                 return (
//                   <div 
//                     key={intervention._id} 
//                     onClick={() => handleInterventionClick(intervention)}
//                     className={`p-4 ${styles.bg} border-l-4 ${styles.border} rounded-xl cursor-pointer ${styles.hoverBg} transition-all duration-200 shadow-sm hover:shadow-md`}
//                   >
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <span className={`w-2 h-2 rounded-full ${styles.dotColor}`}></span>
//                           <p className={`font-bold text-lg ${styles.text}`}>
//                             {intervention.heureDebut} - {intervention.titre}
//                           </p>
//                         </div>
//                         <div className="ml-5 space-y-1">
//                           <p className="text-sm text-gray-700 flex items-center gap-2">
//                             <MapPin size={14} />
//                             {intervention.lieu}
//                           </p>
//                           {currentUser.role === 'admin' && tech && (
//                             <p className="text-sm text-gray-600 flex items-center gap-2">
//                               <User size={14} />
//                               {tech.prenom} {tech.nom}
//                             </p>
//                           )}
//                           {intervention.priorite && (
//                             <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
//                               intervention.priorite === 'haute' ? 'bg-red-100 text-red-700' :
//                               intervention.priorite === 'moyenne' ? 'bg-yellow-100 text-yellow-700' :
//                               'bg-green-100 text-green-700'
//                             }`}>
//                               {intervention.priorite === 'haute' ? '🔴 Haute' :
//                                intervention.priorite === 'moyenne' ? '🟡 Moyenne' : '🟢 Basse'}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                       <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${styles.badgeBg} ${styles.badgeText} whitespace-nowrap`}>
//                         {styles.label}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//               {getInterventionsForDate(currentDate).length === 0 && (
//                 <div className="text-center py-16">
//                   <Calendar size={64} className="mx-auto mb-4 text-gray-300" />
//                   <p className="text-lg font-medium text-gray-500">
//                     {hasActiveFilters 
//                       ? 'Aucune intervention ne correspond aux critères de recherche' 
//                       : 'Aucune intervention prévue'}
//                   </p>
//                   <p className="text-sm text-gray-400 mt-1">
//                     {hasActiveFilters 
//                       ? 'Essayez de modifier vos filtres' 
//                       : 'Profitez de cette journée libre !'}
//                   </p>
//                   {hasActiveFilters && (
//                     <button
//                       onClick={resetFilters}
//                       className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//                     >
//                       Réinitialiser les filtres
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Vue Semaine */}
//           {viewMode === 'semaine' && (
//             <div className="grid grid-cols-7 gap-3">
//               {getWeekDays().map((day, idx) => {
//                 const isToday = formatDate(day) === formatDate(new Date());
//                 return (
//                   <div 
//                     key={idx} 
//                     className={`border-2 rounded-xl p-3 min-h-[180px] transition-all duration-200 ${
//                       isToday 
//                         ? 'border-blue-500 bg-blue-50/50 shadow-md' 
//                         : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <div className={`font-bold text-sm mb-3 pb-2 border-b-2 ${
//                       isToday ? 'border-blue-500 text-blue-700' : 'border-gray-200 text-gray-700'
//                     }`}>
//                       <p className="capitalize">
//                         {day.toLocaleDateString('fr-FR', { weekday: 'short' })}
//                       </p>
//                       <p className={`text-lg ${isToday ? 'text-blue-600' : 'text-gray-800'}`}>
//                         {day.getDate()}
//                       </p>
//                     </div>
//                     <div className="space-y-2">
//                       {getInterventionsForDate(day).map(intervention => {
//                         const styles = getStatusStyles(intervention.statut);
//                         return (
//                           <div 
//                             key={intervention._id} 
//                             onClick={() => handleInterventionClick(intervention)}
//                             className={`p-2 ${styles.bg} border ${styles.border} rounded-lg text-xs cursor-pointer ${styles.hoverBg} transition-all duration-200 shadow-sm`}
//                           >
//                             <div className="flex items-center gap-1 mb-1">
//                               <span className={`w-1.5 h-1.5 rounded-full ${styles.dotColor}`}></span>
//                               <p className={`font-bold ${styles.text}`}>{intervention.heureDebut}</p>
//                             </div>
//                             <p className={`font-medium truncate ${styles.text}`}>{intervention.titre}</p>
//                             <p className="text-gray-600 text-[10px] truncate mt-1 flex items-center gap-1">
//                               <MapPin size={10} />
//                               {intervention.lieu}
//                             </p>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* Vue Mois */}
//           {viewMode === 'mois' && (
//             <div>
//               <div className="grid grid-cols-7 gap-2 mb-2">
//                 {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
//                   <div key={day} className="text-center font-bold text-sm p-2 text-gray-700 bg-gray-50 rounded-lg">
//                     {day}
//                   </div>
//                 ))}
//               </div>
//               <div className="grid grid-cols-7 gap-2">
//                 {getMonthDays().map((day, idx) => {
//                   const isToday = formatDate(day) === formatDate(new Date());
//                   const interventionsOfDay = getInterventionsForDate(day);
                  
//                   return (
//                     <div 
//                       key={idx} 
//                       className={`border-2 rounded-xl p-2 min-h-[120px] transition-all duration-200 ${
//                         isToday 
//                           ? 'border-blue-500 bg-blue-50/50 shadow-md' 
//                           : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
//                       }`}
//                     >
//                       <p className={`text-sm font-bold mb-2 ${
//                         isToday ? 'text-blue-600' : 'text-gray-700'
//                       }`}>
//                         {day.getDate()}
//                       </p>
//                       <div className="space-y-1">
//                         {interventionsOfDay.map(intervention => {
//                           const styles = getStatusStyles(intervention.statut);
//                           return (
//                             <div 
//                               key={intervention._id} 
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleInterventionClick(intervention);
//                               }}
//                               className={`p-1.5 ${styles.bg} border ${styles.border} rounded-lg cursor-pointer ${styles.hoverBg} transition-all duration-200 shadow-sm`}
//                               title={`${intervention.titre} - ${styles.label}`}
//                             >
//                               <div className="flex items-center gap-1">
//                                 <span className={`w-1.5 h-1.5 rounded-full ${styles.dotColor} flex-shrink-0`}></span>
//                                 <p className={`text-[10px] font-bold ${styles.text} truncate`}>
//                                   {intervention.heureDebut}
//                                 </p>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modal de détails */}
//       {selectedIntervention && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
//             {/* En-tête */}
//             <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-2xl font-bold text-white mb-3">
//                     {selectedIntervention.titre}
//                   </h3>
//                   <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
//                     getStatusStyles(selectedIntervention.statut).badgeBg
//                   } ${getStatusStyles(selectedIntervention.statut).badgeText}`}>
//                     {getStatusStyles(selectedIntervention.statut).label}
//                   </span>
//                 </div>
//                 <button 
//                   onClick={closeModal}
//                   className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
//                 >
//                   <X size={24} className="text-white" />
//                 </button>
//               </div>
//             </div>

//             {/* Contenu */}
//             <div className="p-6 space-y-5 max-h-[calc(90vh-180px)] overflow-y-auto">
//               {/* Date et heure */}
//               <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
//                 <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
//                 <div>
//                   <p className="font-semibold text-gray-800 mb-1">Date et heure</p>
//                   <p className="text-gray-700">
//                     {selectedIntervention.dateDebut && 
//                       new Date(selectedIntervention.dateDebut).toLocaleDateString('fr-FR', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })
//                     }
//                   </p>
//                   <p className="text-gray-600 text-sm mt-1">
//                     {selectedIntervention.heureDebut && `⏰ ${selectedIntervention.heureDebut}`}
//                     {selectedIntervention.heureFin && ` - ${selectedIntervention.heureFin}`}
//                   </p>
//                 </div>
//               </div>

//               {/* Lieu */}
//               {selectedIntervention.lieu && (
//                 <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
//                   <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
//                   <div>
//                     <p className="font-semibold text-gray-800 mb-1">Lieu</p>
//                     <p className="text-gray-700">{selectedIntervention.lieu}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Technicien */}
//               {selectedIntervention.technicien && (
//                 <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
//                   <User className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
//                   <div>
//                     <p className="font-semibold text-gray-800 mb-1">Technicien assigné</p>
//                     <p className="text-gray-700">
//                       {selectedIntervention.technicien.prenom} {selectedIntervention.technicien.nom}
//                     </p>
//                     {selectedIntervention.technicien.email && (
//                       <p className="text-sm text-gray-600 mt-1">{selectedIntervention.technicien.email}</p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Description */}
//               {selectedIntervention.description && (
//                 <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
//                   <FileText className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-800 mb-2">Description</p>
//                     <p className="text-gray-700 whitespace-pre-wrap">
//                       {selectedIntervention.description}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Priorité */}
//               {selectedIntervention.priorite && (
//                 <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
//                   <Clock className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
//                   <div>
//                     <p className="font-semibold text-gray-800 mb-2">Priorité</p>
//                     <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${
//                       selectedIntervention.priorite === 'haute' ? 'bg-red-100 text-red-800' :
//                       selectedIntervention.priorite === 'moyenne' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-green-100 text-green-800'
//                     }`}>
//                       {selectedIntervention.priorite === 'haute' ? '🔴 Haute' :
//                        selectedIntervention.priorite === 'moyenne' ? '🟡 Moyenne' : '🟢 Basse'}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {/* Demande liée */}
//               {selectedIntervention.demande && (
//                 <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
//                   <p className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <FileText className="w-5 h-5" />
//                     Demande associée
//                   </p>
//                   <div className="space-y-2 ml-7">
//                     {selectedIntervention.demande.numeroReference && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Référence: </span>
//                         <span className="text-gray-600">{selectedIntervention.demande.numeroReference}</span>
//                       </p>
//                     )}
//                     {selectedIntervention.demande.titre && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Titre: </span>
//                         <span className="text-gray-600">{selectedIntervention.demande.titre}</span>
//                       </p>
//                     )}
//                     {selectedIntervention.demande.description && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Description: </span>
//                         <span className="text-gray-600">{selectedIntervention.demande.description}</span>
//                       </p>
//                     )}
//                     {selectedIntervention.demande.demandeur && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Demandeur: </span>
//                         <span className="text-gray-600">
//                           {selectedIntervention.demande.demandeur.prenom} {selectedIntervention.demande.demandeur.nom}
//                         </span>
//                       </p>
//                     )}
//                     {selectedIntervention.demande.email && (
//                       <p className="text-sm">
//                         <span className="font-medium text-gray-700">Email: </span>
//                         <span className="text-gray-600">{selectedIntervention.demande.email}</span>
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Pied du modal */}
//             <div className="p-6 border-t bg-gray-50 flex justify-end">
//               <button
//                 onClick={closeModal}
//                 className="px-6 py-2.5 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
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



// NOUVELLE VERSION APRÈS AJOUT DU FILTRE PAR DATE



import React, { useState } from 'react';
import { X, MapPin, Clock, User, FileText, Calendar, AlertCircle, Filter, Search, RotateCcw } from 'lucide-react';

const PlanningView = ({ interventions, users, currentUser }) => {
  const [viewMode, setViewMode] = useState('semaine');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  
  // États pour les filtres
  const [filterStatut, setFilterStatut] = useState('');
  const [filterPriorite, setFilterPriorite] = useState('');
  const [filterTechnicien, setFilterTechnicien] = useState('');
  const [filterDateDebut, setFilterDateDebut] = useState('');
  const [filterDateFin, setFilterDateFin] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Fonction pour obtenir les styles selon le statut
  const getStatusStyles = (statut) => {
    switch (statut) {
      case 'terminee':
        return {
          bg: 'bg-green-100',
          border: 'border-green-500',
          hoverBg: 'hover:bg-green-200',
          text: 'text-green-800',
          badgeBg: 'bg-green-100',
          badgeText: 'text-green-800',
          label: 'Terminée',
          dotColor: 'bg-green-500'
        };
      case 'en_cours':
        return {
          bg: 'bg-yellow-100',
          border: 'border-yellow-500',
          hoverBg: 'hover:bg-yellow-200',
          text: 'text-yellow-800',
          badgeBg: 'bg-yellow-100',
          badgeText: 'text-yellow-800',
          label: 'En cours',
          dotColor: 'bg-yellow-500'
        };
      case 'en_attente_validation':
        return {
          bg: 'bg-orange-100',
          border: 'border-orange-500',
          hoverBg: 'hover:bg-orange-200',
          text: 'text-orange-800',
          badgeBg: 'bg-orange-100',
          badgeText: 'text-orange-800',
          label: 'En attente de validation',
          dotColor: 'bg-orange-500'
        };
      case 'planifiee':
      default:
        return {
          bg: 'bg-blue-100',
          border: 'border-blue-500',
          hoverBg: 'hover:bg-blue-200',
          text: 'text-blue-800',
          badgeBg: 'bg-blue-100',
          badgeText: 'text-blue-800',
          label: 'Planifiée',
          dotColor: 'bg-blue-500'
        };
    }
  };

  // Appliquer les filtres
  let myInterventions = currentUser.role !== 'admin' 
    ? interventions.filter(i => i.technicien?._id === currentUser._id)
    : interventions;

  // Filtrer selon les critères
  myInterventions = myInterventions.filter(intervention => {
    // Filtre par statut
    if (filterStatut && intervention.statut !== filterStatut) return false;
    
    // Filtre par priorité
    if (filterPriorite && intervention.priorite !== filterPriorite) return false;
    
    // Filtre par technicien (uniquement pour admin)
    if (currentUser.role === 'admin' && filterTechnicien && intervention.technicien?._id !== filterTechnicien) return false;
    
    // Filtre par date de début
    if (filterDateDebut) {
      const interventionDate = intervention.dateDebut?.split('T')[0];
      if (interventionDate < filterDateDebut) return false;
    }
    
    // Filtre par date de fin
    if (filterDateFin) {
      const interventionDate = intervention.dateDebut?.split('T')[0];
      if (interventionDate > filterDateFin) return false;
    }
    
    // Recherche par texte
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        intervention.titre?.toLowerCase().includes(searchLower) ||
        intervention.description?.toLowerCase().includes(searchLower) ||
        intervention.lieu?.toLowerCase().includes(searchLower) ||
        intervention.materiel?.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

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

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setFilterStatut('');
    setFilterPriorite('');
    setFilterTechnicien('');
    setFilterDateDebut('');
    setFilterDateFin('');
    setSearchTerm('');
  };

  // Vérifier si des filtres sont actifs
  const hasActiveFilters = filterStatut || filterPriorite || filterTechnicien || filterDateDebut || filterDateFin || searchTerm;

  console.log('🔍 Filtres actifs:', {
    filterStatut,
    filterPriorite,
    filterTechnicien,
    filterDateDebut,
    filterDateFin,
    searchTerm,
    hasActiveFilters
  });

  // Obtenir la liste des techniciens pour le filtre
  const techniciens = users.filter(u => u.role !== 'admin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Planning des Interventions
            </h2>
            <p className="text-gray-600 mt-2">
              {currentUser.role === 'admin' 
                ? 'Vue d\'ensemble de toutes les interventions' 
                : 'Vos interventions planifiées'}
            </p>
          </div>
          
          <div className="flex gap-3">
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            >
              <option value="jour">Vue Jour</option>
              <option value="semaine">Vue Semaine</option>
              <option value="mois">Vue Mois</option>
            </select>
          </div>
        </div>

        {/* Légende des statuts */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={18} className="text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-700">Légende des statuts</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { statut: 'planifiee', icon: '📅' },
              { statut: 'en_cours', icon: '⚡' },
              { statut: 'en_attente_validation', icon: '⏳' },
              { statut: 'terminee', icon: '✅' }
            ].map(({ statut, icon }) => {
              const styles = getStatusStyles(statut);
              return (
                <div key={statut} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${styles.dotColor}`}></div>
                  <span className="text-sm text-gray-700">
                    {icon} <span className="font-medium">{styles.label}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Barre de recherche */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une intervention..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Bouton filtres */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                hasActiveFilters 
                  ? 'bg-blue-100 border-2 border-blue-500 text-blue-700' 
                  : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Filter size={18} />
              Filtres
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              )}
            </button>

            {/* Bouton réinitialiser */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl hover:bg-red-100 transition-all duration-200 font-medium"
              >
                <RotateCcw size={18} />
                Réinitialiser
              </button>
            )}
          </div>

          {/* Panneau des filtres */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Filtre par statut */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <AlertCircle size={16} />
                    Statut
                  </label>
                  <select
                    value={filterStatut}
                    onChange={(e) => setFilterStatut(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Tous les statuts</option>
                    <option value="planifiee">📅 Planifiée</option>
                    <option value="en_cours">⚡ En cours</option>
                    <option value="en_attente_validation">⏳ En attente de validation</option>
                    <option value="terminee">✅ Terminée</option>
                  </select>
                </div>

                {/* Filtre par priorité */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Clock size={16} />
                    Priorité
                  </label>
                  <select
                    value={filterPriorite}
                    onChange={(e) => setFilterPriorite(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Toutes les priorités</option>
                    <option value="haute">🔴 Haute</option>
                    <option value="moyenne">🟡 Moyenne</option>
                    <option value="basse">🟢 Basse</option>
                  </select>
                </div>

                {/* Filtre par date de début */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={16} />
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={filterDateDebut}
                    onChange={(e) => setFilterDateDebut(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>

                {/* Filtre par date de fin */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={16} />
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={filterDateFin}
                    onChange={(e) => setFilterDateFin(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>

                {/* Filtre par technicien (uniquement pour admin) */}
                {currentUser.role === 'admin' && (
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User size={16} />
                      Technicien
                    </label>
                    <select
                      value={filterTechnicien}
                      onChange={(e) => setFilterTechnicien(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">Tous les techniciens</option>
                      {techniciens.map(tech => (
                        <option key={tech._id} value={tech._id}>
                          {tech.prenom} {tech.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Compteur de résultats */}
              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="text-sm text-gray-600 text-center">
                  <span className="font-bold text-blue-600">{myInterventions.length}</span> intervention(s) trouvée(s)
                  {(filterDateDebut || filterDateFin) && (
                    <span className="ml-2 text-gray-500">
                      {filterDateDebut && filterDateFin 
                        ? `du ${new Date(filterDateDebut).toLocaleDateString('fr-FR')} au ${new Date(filterDateFin).toLocaleDateString('fr-FR')}`
                        : filterDateDebut 
                          ? `à partir du ${new Date(filterDateDebut).toLocaleDateString('fr-FR')}`
                          : `jusqu'au ${new Date(filterDateFin).toLocaleDateString('fr-FR')}`
                      }
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Calendrier principal */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                if (viewMode === 'jour') newDate.setDate(newDate.getDate() - 1);
                else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() - 7);
                else newDate.setMonth(newDate.getMonth() - 1);
                setCurrentDate(newDate);
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              ← Précédent
            </button>
            
            <h3 className="text-xl font-bold text-gray-800">
              {viewMode === 'mois' 
                ? currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
                : currentDate.toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
            </h3>
            
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                if (viewMode === 'jour') newDate.setDate(newDate.getDate() + 1);
                else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() + 7);
                else newDate.setMonth(newDate.getMonth() + 1);
                setCurrentDate(newDate);
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              Suivant →
            </button>
          </div>

          {/* Vue Jour */}
          {viewMode === 'jour' && (
            <div className="space-y-3">
              {getInterventionsForDate(currentDate).map(intervention => {
                const tech = intervention.technicien;
                const styles = getStatusStyles(intervention.statut);
                return (
                  <div 
                    key={intervention._id} 
                    onClick={() => handleInterventionClick(intervention)}
                    className={`p-4 ${styles.bg} border-l-4 ${styles.border} rounded-xl cursor-pointer ${styles.hoverBg} transition-all duration-200 shadow-sm hover:shadow-md`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`w-2 h-2 rounded-full ${styles.dotColor}`}></span>
                          <p className={`font-bold text-lg ${styles.text}`}>
                            {intervention.heureDebut} - {intervention.titre}
                          </p>
                        </div>
                        <div className="ml-5 space-y-1">
                          <p className="text-sm text-gray-700 flex items-center gap-2">
                            <MapPin size={14} />
                            {intervention.lieu}
                          </p>
                          {currentUser.role === 'admin' && tech && (
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <User size={14} />
                              {tech.prenom} {tech.nom}
                            </p>
                          )}
                          {intervention.priorite && (
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              intervention.priorite === 'haute' ? 'bg-red-100 text-red-700' :
                              intervention.priorite === 'moyenne' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {intervention.priorite === 'haute' ? '🔴 Haute' :
                               intervention.priorite === 'moyenne' ? '🟡 Moyenne' : '🟢 Basse'}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${styles.badgeBg} ${styles.badgeText} whitespace-nowrap`}>
                        {styles.label}
                      </span>
                    </div>
                  </div>
                );
              })}
              {getInterventionsForDate(currentDate).length === 0 && (
                <div className="text-center py-16">
                  <Calendar size={64} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium text-gray-500">
                    {hasActiveFilters 
                      ? 'Aucune intervention ne correspond aux critères de recherche' 
                      : 'Aucune intervention prévue'}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {hasActiveFilters 
                      ? 'Essayez de modifier vos filtres' 
                      : 'Profitez de cette journée libre !'}
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={resetFilters}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Réinitialiser les filtres
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Vue Semaine */}
          {viewMode === 'semaine' && (
            <div className="grid grid-cols-7 gap-3">
              {getWeekDays().map((day, idx) => {
                const isToday = formatDate(day) === formatDate(new Date());
                return (
                  <div 
                    key={idx} 
                    className={`border-2 rounded-xl p-3 min-h-[180px] transition-all duration-200 ${
                      isToday 
                        ? 'border-blue-500 bg-blue-50/50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className={`font-bold text-sm mb-3 pb-2 border-b-2 ${
                      isToday ? 'border-blue-500 text-blue-700' : 'border-gray-200 text-gray-700'
                    }`}>
                      <p className="capitalize">
                        {day.toLocaleDateString('fr-FR', { weekday: 'short' })}
                      </p>
                      <p className={`text-lg ${isToday ? 'text-blue-600' : 'text-gray-800'}`}>
                        {day.getDate()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      {getInterventionsForDate(day).map(intervention => {
                        const styles = getStatusStyles(intervention.statut);
                        return (
                          <div 
                            key={intervention._id} 
                            onClick={() => handleInterventionClick(intervention)}
                            className={`p-2 ${styles.bg} border ${styles.border} rounded-lg text-xs cursor-pointer ${styles.hoverBg} transition-all duration-200 shadow-sm`}
                          >
                            <div className="flex items-center gap-1 mb-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${styles.dotColor}`}></span>
                              <p className={`font-bold ${styles.text}`}>{intervention.heureDebut}</p>
                            </div>
                            <p className={`font-medium truncate ${styles.text}`}>{intervention.titre}</p>
                            <p className="text-gray-600 text-[10px] truncate mt-1 flex items-center gap-1">
                              <MapPin size={10} />
                              {intervention.lieu}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Vue Mois */}
          {viewMode === 'mois' && (
            <div>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                  <div key={day} className="text-center font-bold text-sm p-2 text-gray-700 bg-gray-50 rounded-lg">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {getMonthDays().map((day, idx) => {
                  const isToday = formatDate(day) === formatDate(new Date());
                  const interventionsOfDay = getInterventionsForDate(day);
                  
                  return (
                    <div 
                      key={idx} 
                      className={`border-2 rounded-xl p-2 min-h-[120px] transition-all duration-200 ${
                        isToday 
                          ? 'border-blue-500 bg-blue-50/50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <p className={`text-sm font-bold mb-2 ${
                        isToday ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {day.getDate()}
                      </p>
                      <div className="space-y-1">
                        {interventionsOfDay.map(intervention => {
                          const styles = getStatusStyles(intervention.statut);
                          return (
                            <div 
                              key={intervention._id} 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleInterventionClick(intervention);
                              }}
                              className={`p-1.5 ${styles.bg} border ${styles.border} rounded-lg cursor-pointer ${styles.hoverBg} transition-all duration-200 shadow-sm`}
                              title={`${intervention.titre} - ${styles.label}`}
                            >
                              <div className="flex items-center gap-1">
                                <span className={`w-1.5 h-1.5 rounded-full ${styles.dotColor} flex-shrink-0`}></span>
                                <p className={`text-[10px] font-bold ${styles.text} truncate`}>
                                  {intervention.heureDebut}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de détails */}
      {selectedIntervention && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* En-tête */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {selectedIntervention.titre}
                  </h3>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                    getStatusStyles(selectedIntervention.statut).badgeBg
                  } ${getStatusStyles(selectedIntervention.statut).badgeText}`}>
                    {getStatusStyles(selectedIntervention.statut).label}
                  </span>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-6 space-y-5 max-h-[calc(90vh-180px)] overflow-y-auto">
              {/* Date et heure */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Date et heure</p>
                  <p className="text-gray-700">
                    {selectedIntervention.dateDebut && 
                      new Date(selectedIntervention.dateDebut).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    }
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {selectedIntervention.heureDebut && `⏰ ${selectedIntervention.heureDebut}`}
                    {selectedIntervention.heureFin && ` - ${selectedIntervention.heureFin}`}
                  </p>
                </div>
              </div>

              {/* Lieu */}
              {selectedIntervention.lieu && (
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                  <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Lieu</p>
                    <p className="text-gray-700">{selectedIntervention.lieu}</p>
                  </div>
                </div>
              )}

              {/* Technicien */}
              {selectedIntervention.technicien && (
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <User className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Technicien assigné</p>
                    <p className="text-gray-700">
                      {selectedIntervention.technicien.prenom} {selectedIntervention.technicien.nom}
                    </p>
                    {selectedIntervention.technicien.email && (
                      <p className="text-sm text-gray-600 mt-1">{selectedIntervention.technicien.email}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedIntervention.description && (
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                  <FileText className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 mb-2">Description</p>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedIntervention.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Priorité */}
              {selectedIntervention.priorite && (
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <Clock className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Priorité</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${
                      selectedIntervention.priorite === 'haute' ? 'bg-red-100 text-red-800' :
                      selectedIntervention.priorite === 'moyenne' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedIntervention.priorite === 'haute' ? '🔴 Haute' :
                       selectedIntervention.priorite === 'moyenne' ? '🟡 Moyenne' : '🟢 Basse'}
                    </span>
                  </div>
                </div>
              )}

              {/* Demande liée */}
              {selectedIntervention.demande && (
                <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <p className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Demande associée
                  </p>
                  <div className="space-y-2 ml-7">
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
            <div className="p-6 border-t bg-gray-50 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
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