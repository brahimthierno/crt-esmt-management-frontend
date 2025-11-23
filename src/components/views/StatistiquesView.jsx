// import React, { useState, useEffect } from 'react';
// import { 
//   BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
// } from 'recharts';
// import { 
//   Clock, TrendingUp, Download, Calendar, 
//   Activity, Target, Award, Filter 
// } from 'lucide-react';
// import { getStatsDureeDetaillees, getEvolutionDurees, exportDonnees } from '../../services/statsService';

// const StatistiquesView = ({ currentUser }) => {
//   const [stats, setStats] = useState(null);
//   const [evolution, setEvolution] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [periode, setPeriode] = useState(30);
//   const [exporting, setExporting] = useState(false);

//   const COLORS = {
//     reparation: '#8b5cf6',
//     diagnostic: '#f97316',
//     verification: '#06b6d4',
//     maintenance: '#6366f1',
//     installation: '#ec4899'
//   };

//   const TYPE_LABELS = {
//     reparation: 'Réparation',
//     diagnostic: 'Diagnostic',
//     verification: 'Vérification',
//     maintenance: 'Maintenance',
//     installation: 'Installation'
//   };

//   useEffect(() => {
//     loadStats();
//   }, []);

//   useEffect(() => {
//     loadEvolution();
//   }, [periode]);

//   const loadStats = async () => {
//     try {
//       setLoading(true);
//       const response = await getStatsDureeDetaillees();
//       setStats(response.data);
//     } catch (error) {
//       console.error('Erreur chargement stats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadEvolution = async () => {
//     try {
//       const response = await getEvolutionDurees(periode);
//       setEvolution(response.data);
//     } catch (error) {
//       console.error('Erreur chargement évolution:', error);
//     }
//   };

//   const handleExport = async () => {
//     try {
//       setExporting(true);
//       await exportDonnees();
//       alert('Export réussi ! Le fichier CSV a été téléchargé.');
//     } catch (error) {
//       console.error('Erreur export:', error);
//       alert('Erreur lors de l\'export des données');
//     } finally {
//       setExporting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
//           <p className="text-gray-600">Chargement des statistiques...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!stats || !stats.interventions || stats.interventions.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//             <Activity size={64} className="mx-auto mb-4 text-gray-300" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Aucune donnée disponible
//             </h2>
//             <p className="text-gray-600">
//               Aucune intervention terminée avec des données de durée pour le moment.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const statsGlobales = stats.statistiquesGlobales;
//   const statsParType = stats.statistiquesParType;

//   // Données pour le graphique en barres (durée moyenne par type)
//   const dataBarChart = statsParType.map(stat => ({
//     type: TYPE_LABELS[stat.type] || stat.type,
//     moyenne: parseFloat((stat.moyenne.ms / (1000 * 60 * 60)).toFixed(2)),
//     count: stat.count
//   }));

//   // Données pour le graphique en camembert (répartition par type)
//   const dataPieChart = statsParType.map(stat => ({
//     name: TYPE_LABELS[stat.type] || stat.type,
//     value: stat.count
//   }));

//   // Données pour le graphique d'évolution
//   const dataLineChart = evolution?.evolution.map(jour => ({
//     date: new Date(jour.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
//     moyenne: parseFloat(jour.moyenneDureeHeures.toFixed(2)),
//     count: jour.count
//   })) || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Statistiques des Interventions
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 Analyse des durées et performances
//               </p>
//             </div>
            
//             <button
//               onClick={handleExport}
//               disabled={exporting}
//               className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
//             >
//               {exporting ? (
//                 <>
//                   <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                   Export en cours...
//                 </>
//               ) : (
//                 <>
//                   <Download size={20} />
//                   Exporter en CSV
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Cartes de statistiques globales */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <Activity size={24} className="text-blue-600" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 uppercase">Total</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900">{statsGlobales.total}</p>
//             <p className="text-sm text-gray-600 mt-1">Interventions terminées</p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-purple-100 rounded-xl">
//                 <Clock size={24} className="text-purple-600" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 uppercase">Moyenne</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900">
//               {statsGlobales.moyenneGlobale.formattee}
//             </p>
//             <p className="text-sm text-gray-600 mt-1">Durée moyenne globale</p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-green-100 rounded-xl">
//                 <TrendingUp size={24} className="text-green-600" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 uppercase">Min</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900">
//               {statsGlobales.dureeMin.heures}h {statsGlobales.dureeMin.minutes}m
//             </p>
//             <p className="text-sm text-gray-600 mt-1">Intervention la plus rapide</p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-orange-100 rounded-xl">
//                 <Award size={24} className="text-orange-600" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 uppercase">Max</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900">
//               {statsGlobales.dureeMax.heures}h {statsGlobales.dureeMax.minutes}m
//             </p>
//             <p className="text-sm text-gray-600 mt-1">Intervention la plus longue</p>
//           </div>
//         </div>

//         {/* Graphiques */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Graphique durée moyenne par type */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <BarChart size={20} className="text-purple-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Durée moyenne par type</h3>
//                 <p className="text-sm text-gray-600">En heures</p>
//               </div>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={dataBarChart}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="type" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: 'white', 
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '8px'
//                   }}
//                   formatter={(value) => [`${value}h`, 'Durée moyenne']}
//                 />
//                 <Bar dataKey="moyenne" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Graphique répartition par type */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <Target size={20} className="text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Répartition par type</h3>
//                 <p className="text-sm text-gray-600">Nombre d'interventions</p>
//               </div>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={dataPieChart}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {dataPieChart.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.values(COLORS).length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Graphique d'évolution dans le temps */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-orange-100 rounded-lg">
//                 <TrendingUp size={20} className="text-orange-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Évolution des durées</h3>
//                 <p className="text-sm text-gray-600">Durée moyenne par jour (en heures)</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <Filter size={18} className="text-gray-600" />
//               <select
//                 value={periode}
//                 onChange={(e) => setPeriode(Number(e.target.value))}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value={7}>7 derniers jours</option>
//                 <option value={14}>14 derniers jours</option>
//                 <option value={30}>30 derniers jours</option>
//                 <option value={60}>60 derniers jours</option>
//                 <option value={90}>90 derniers jours</option>
//               </select>
//             </div>
//           </div>
          
//           <ResponsiveContainer width="100%" height={350}>
//             <LineChart data={dataLineChart}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//               <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//               <YAxis tick={{ fontSize: 12 }} />
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: 'white', 
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '8px'
//                 }}
//                 formatter={(value, name) => {
//                   if (name === 'moyenne') return [`${value}h`, 'Durée moyenne'];
//                   if (name === 'count') return [`${value}`, 'Interventions'];
//                   return value;
//                 }}
//               />
//               <Legend />
//               <Line 
//                 type="monotone" 
//                 dataKey="moyenne" 
//                 stroke="#f97316" 
//                 strokeWidth={3}
//                 name="Durée moyenne (h)"
//                 dot={{ fill: '#f97316', r: 4 }}
//                 activeDot={{ r: 6 }}
//               />
//               <Line 
//                 type="monotone" 
//                 dataKey="count" 
//                 stroke="#06b6d4" 
//                 strokeWidth={2}
//                 name="Nombre d'interventions"
//                 dot={{ fill: '#06b6d4', r: 3 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Tableau des statistiques par type */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-800">Statistiques détaillées par type</h3>
//             <p className="text-sm text-gray-600 mt-1">Comparaison des performances</p>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Nombre
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Durée Moyenne
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Durée Médiane
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Proportion
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {statsParType.map((stat, index) => {
//                   const proportion = ((stat.count / statsGlobales.total) * 100).toFixed(1);
//                   return (
//                     <tr key={stat.type} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div 
//                             className="w-3 h-3 rounded-full" 
//                             style={{ backgroundColor: COLORS[stat.type] }}
//                           ></div>
//                           <span className="font-medium text-gray-900">
//                             {TYPE_LABELS[stat.type] || stat.type}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                           {stat.count}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-center font-semibold text-gray-900">
//                         {stat.moyenne.formattee}
//                       </td>
//                       <td className="px-6 py-4 text-center font-medium text-gray-700">
//                         {stat.mediane.formattee}
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <div className="flex items-center gap-2 justify-center">
//                           <div className="flex-1 max-w-[100px] bg-gray-200 rounded-full h-2">
//                             <div 
//                               className="h-2 rounded-full" 
//                               style={{ 
//                                 width: `${proportion}%`,
//                                 backgroundColor: COLORS[stat.type]
//                               }}
//                             ></div>
//                           </div>
//                           <span className="text-sm font-medium text-gray-700 w-12 text-right">
//                             {proportion}%
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatistiquesView;


// NOUVELLE VERSION AVEC L'EXPORT EN PDF



// import React, { useState, useEffect } from 'react';
// import { 
//   BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
// } from 'recharts';
// import { 
//   Clock, TrendingUp, Download, Calendar, 
//   Activity, Target, Award, Filter, FileText 
// } from 'lucide-react';
// import { getStatsDureeDetaillees, getEvolutionDurees, exportCSV, exportPDF } from '../../services/statsService';

// const StatistiquesView = ({ currentUser }) => {
//   const [stats, setStats] = useState(null);
//   const [evolution, setEvolution] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [periode, setPeriode] = useState(30);
//   const [exportingCSV, setExportingCSV] = useState(false);
//   const [exportingPDF, setExportingPDF] = useState(false);

//   const COLORS = {
//     reparation: '#8b5cf6',
//     diagnostic: '#f97316',
//     verification: '#06b6d4',
//     maintenance: '#6366f1',
//     installation: '#ec4899'
//   };

//   const TYPE_LABELS = {
//     reparation: 'Réparation',
//     diagnostic: 'Diagnostic',
//     verification: 'Vérification',
//     maintenance: 'Maintenance',
//     installation: 'Installation'
//   };

//   useEffect(() => {
//     loadStats();
//   }, []);

//   useEffect(() => {
//     loadEvolution();
//   }, [periode]);

//   const loadStats = async () => {
//     try {
//       setLoading(true);
//       const response = await getStatsDureeDetaillees();
//       setStats(response.data);
//     } catch (error) {
//       console.error('Erreur chargement stats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadEvolution = async () => {
//     try {
//       const response = await getEvolutionDurees(periode);
//       setEvolution(response.data);
//     } catch (error) {
//       console.error('Erreur chargement évolution:', error);
//     }
//   };

//   const handleExportCSV = async () => {
//     try {
//       setExportingCSV(true);
//       await exportCSV();
//       alert('Export CSV réussi ! Le fichier a été téléchargé.');
//     } catch (error) {
//       console.error('Erreur export CSV:', error);
//       alert('Erreur lors de l\'export CSV');
//     } finally {
//       setExportingCSV(false);
//     }
//   };

//   const handleExportPDF = async () => {
//     try {
//       setExportingPDF(true);
//       await exportPDF(stats, currentUser);
//       alert('Export PDF réussi ! Le fichier a été téléchargé.');
//     } catch (error) {
//       console.error('Erreur export PDF:', error);
//       alert('Erreur lors de l\'export PDF');
//     } finally {
//       setExportingPDF(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
//           <p className="text-gray-600">Chargement des statistiques...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!stats || !stats.interventions || stats.interventions.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//             <Activity size={64} className="mx-auto mb-4 text-gray-300" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Aucune donnée disponible
//             </h2>
//             <p className="text-gray-600">
//               Aucune intervention terminée avec des données de durée pour le moment.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const statsGlobales = stats.statistiquesGlobales;
//   const statsParType = stats.statistiquesParType;

//   // Données pour le graphique en barres (durée moyenne par type)
//   const dataBarChart = statsParType.map(stat => ({
//     type: TYPE_LABELS[stat.type] || stat.type,
//     moyenne: parseFloat((stat.moyenne.ms / (1000 * 60 * 60)).toFixed(2)),
//     count: stat.count
//   }));

//   // Données pour le graphique en camembert (répartition par type)
//   const dataPieChart = statsParType.map(stat => ({
//     name: TYPE_LABELS[stat.type] || stat.type,
//     value: stat.count
//   }));

//   // Données pour le graphique d'évolution
//   const dataLineChart = evolution?.evolution.map(jour => ({
//     date: new Date(jour.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
//     moyenne: parseFloat(jour.moyenneDureeHeures.toFixed(2)),
//     count: jour.count
//   })) || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Statistiques des Interventions
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 Analyse des durées et performances
//               </p>
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={handleExportCSV}
//                 disabled={exportingCSV}
//                 className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
//               >
//                 {exportingCSV ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                     Export CSV...
//                   </>
//                 ) : (
//                   <>
//                     <FileText size={20} />
//                     Export CSV
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={handleExportPDF}
//                 disabled={exportingPDF}
//                 className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
//               >
//                 {exportingPDF ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                     Export PDF...
//                   </>
//                 ) : (
//                   <>
//                     <Download size={20} />
//                     Export PDF
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Cartes de statistiques globales */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <Activity size={24} className="text-blue-600" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 uppercase">Total</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900">{statsGlobales.total}</p>
//             <p className="text-sm text-gray-600 mt-1">Interventions terminées</p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-purple-100 rounded-xl">
//                 <Clock size={24} className="text-purple-600" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 uppercase">Moyenne</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900">
//               {statsGlobales.moyenneGlobale.formattee}
//             </p>
//             <p className="text-sm text-gray-600 mt-1">Durée moyenne globale</p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-green-100 rounded-xl">
//                 <TrendingUp size={24} className="text-green-600" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 uppercase">Min</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900">
//               {statsGlobales.dureeMin.heures}h {statsGlobales.dureeMin.minutes}m
//             </p>
//             <p className="text-sm text-gray-600 mt-1">Intervention la plus rapide</p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-orange-100 rounded-xl">
//                 <Award size={24} className="text-orange-600" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 uppercase">Max</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900">
//               {statsGlobales.dureeMax.heures}h {statsGlobales.dureeMax.minutes}m
//             </p>
//             <p className="text-sm text-gray-600 mt-1">Intervention la plus longue</p>
//           </div>
//         </div>

//         {/* Graphiques */}
//         <div id="charts-container" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Graphique durée moyenne par type */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <BarChart size={20} className="text-purple-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Durée moyenne par type</h3>
//                 <p className="text-sm text-gray-600">En heures</p>
//               </div>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={dataBarChart}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="type" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: 'white', 
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '8px'
//                   }}
//                   formatter={(value) => [`${value}h`, 'Durée moyenne']}
//                 />
//                 <Bar dataKey="moyenne" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Graphique répartition par type */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <Target size={20} className="text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Répartition par type</h3>
//                 <p className="text-sm text-gray-600">Nombre d'interventions</p>
//               </div>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={dataPieChart}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {dataPieChart.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.values(COLORS).length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Graphique d'évolution dans le temps */}
//         <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-orange-100 rounded-lg">
//                 <TrendingUp size={20} className="text-orange-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Évolution des durées</h3>
//                 <p className="text-sm text-gray-600">Durée moyenne par jour (en heures)</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <Filter size={18} className="text-gray-600" />
//               <select
//                 value={periode}
//                 onChange={(e) => setPeriode(Number(e.target.value))}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value={7}>7 derniers jours</option>
//                 <option value={14}>14 derniers jours</option>
//                 <option value={30}>30 derniers jours</option>
//                 <option value={60}>60 derniers jours</option>
//                 <option value={90}>90 derniers jours</option>
//               </select>
//             </div>
//           </div>
          
//           <ResponsiveContainer width="100%" height={350}>
//             <LineChart data={dataLineChart}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//               <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//               <YAxis tick={{ fontSize: 12 }} />
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: 'white', 
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '8px'
//                 }}
//                 formatter={(value, name) => {
//                   if (name === 'moyenne') return [`${value}h`, 'Durée moyenne'];
//                   if (name === 'count') return [`${value}`, 'Interventions'];
//                   return value;
//                 }}
//               />
//               <Legend />
//               <Line 
//                 type="monotone" 
//                 dataKey="moyenne" 
//                 stroke="#f97316" 
//                 strokeWidth={3}
//                 name="Durée moyenne (h)"
//                 dot={{ fill: '#f97316', r: 4 }}
//                 activeDot={{ r: 6 }}
//               />
//               <Line 
//                 type="monotone" 
//                 dataKey="count" 
//                 stroke="#06b6d4" 
//                 strokeWidth={2}
//                 name="Nombre d'interventions"
//                 dot={{ fill: '#06b6d4', r: 3 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Tableau des statistiques par type */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-800">Statistiques détaillées par type</h3>
//             <p className="text-sm text-gray-600 mt-1">Comparaison des performances</p>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Nombre
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Durée Moyenne
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Durée Médiane
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     Proportion
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {statsParType.map((stat) => {
//                   const proportion = ((stat.count / statsGlobales.total) * 100).toFixed(1);
//                   return (
//                     <tr key={stat.type} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div 
//                             className="w-3 h-3 rounded-full" 
//                             style={{ backgroundColor: COLORS[stat.type] }}
//                           ></div>
//                           <span className="font-medium text-gray-900">
//                             {TYPE_LABELS[stat.type] || stat.type}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                           {stat.count}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-center font-semibold text-gray-900">
//                         {stat.moyenne.formattee}
//                       </td>
//                       <td className="px-6 py-4 text-center font-medium text-gray-700">
//                         {stat.mediane.formattee}
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <div className="flex items-center gap-2 justify-center">
//                           <div className="flex-1 max-w-[100px] bg-gray-200 rounded-full h-2">
//                             <div 
//                               className="h-2 rounded-full" 
//                               style={{ 
//                                 width: `${proportion}%`,
//                                 backgroundColor: COLORS[stat.type]
//                               }}
//                             ></div>
//                           </div>
//                           <span className="text-sm font-medium text-gray-700 w-12 text-right">
//                             {proportion}%
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatistiquesView;


// NOUVELLE VERSION POUR MODE SOMBRE


// import React, { useState, useEffect } from 'react';
// import { 
//   BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
// } from 'recharts';
// import { 
//   Clock, TrendingUp, Download, Calendar, 
//   Activity, Target, Award, Filter, FileText 
// } from 'lucide-react';
// import { getStatsDureeDetaillees, getEvolutionDurees, exportCSV, exportPDF } from '../../services/statsService';

// const StatistiquesView = ({ currentUser }) => {
//   const [stats, setStats] = useState(null);
//   const [evolution, setEvolution] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [periode, setPeriode] = useState(30);
//   const [exportingCSV, setExportingCSV] = useState(false);
//   const [exportingPDF, setExportingPDF] = useState(false);

//   const COLORS = {
//     reparation: '#8b5cf6',
//     diagnostic: '#f97316',
//     verification: '#06b6d4',
//     maintenance: '#6366f1',
//     installation: '#ec4899'
//   };

//   const TYPE_LABELS = {
//     reparation: 'Réparation',
//     diagnostic: 'Diagnostic',
//     verification: 'Vérification',
//     maintenance: 'Maintenance',
//     installation: 'Installation'
//   };

//   useEffect(() => {
//     loadStats();
//   }, []);

//   useEffect(() => {
//     loadEvolution();
//   }, [periode]);

//   const loadStats = async () => {
//     try {
//       setLoading(true);
//       const response = await getStatsDureeDetaillees();
//       setStats(response.data);
//     } catch (error) {
//       console.error('Erreur chargement stats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadEvolution = async () => {
//     try {
//       const response = await getEvolutionDurees(periode);
//       setEvolution(response.data);
//     } catch (error) {
//       console.error('Erreur chargement évolution:', error);
//     }
//   };

//   const handleExportCSV = async () => {
//     try {
//       setExportingCSV(true);
//       await exportCSV();
//       alert('Export CSV réussi ! Le fichier a été téléchargé.');
//     } catch (error) {
//       console.error('Erreur export CSV:', error);
//       alert('Erreur lors de l\'export CSV');
//     } finally {
//       setExportingCSV(false);
//     }
//   };

//   const handleExportPDF = async () => {
//     try {
//       setExportingPDF(true);
//       await exportPDF(stats, currentUser);
//       alert('Export PDF réussi ! Le fichier a été téléchargé.');
//     } catch (error) {
//       console.error('Erreur export PDF:', error);
//       alert('Erreur lors de l\'export PDF');
//     } finally {
//       setExportingPDF(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-400">Chargement des statistiques...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!stats || !stats.interventions || stats.interventions.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
//             <Activity size={64} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//               Aucune donnée disponible
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400">
//               Aucune intervention terminée avec des données de durée pour le moment.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const statsGlobales = stats.statistiquesGlobales;
//   const statsParType = stats.statistiquesParType;

//   // Données pour le graphique en barres (durée moyenne par type)
//   const dataBarChart = statsParType.map(stat => ({
//     type: TYPE_LABELS[stat.type] || stat.type,
//     moyenne: parseFloat((stat.moyenne.ms / (1000 * 60 * 60)).toFixed(2)),
//     count: stat.count
//   }));

//   // Données pour le graphique en camembert (répartition par type)
//   const dataPieChart = statsParType.map(stat => ({
//     name: TYPE_LABELS[stat.type] || stat.type,
//     value: stat.count
//   }));

//   // Données pour le graphique d'évolution
//   const dataLineChart = evolution?.evolution.map(jour => ({
//     date: new Date(jour.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
//     moyenne: parseFloat(jour.moyenneDureeHeures.toFixed(2)),
//     count: jour.count
//   })) || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Statistiques des Interventions
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400 mt-2">
//                 Analyse des durées et performances
//               </p>
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={handleExportCSV}
//                 disabled={exportingCSV}
//                 className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
//               >
//                 {exportingCSV ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                     Export CSV...
//                   </>
//                 ) : (
//                   <>
//                     <FileText size={20} />
//                     Export CSV
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={handleExportPDF}
//                 disabled={exportingPDF}
//                 className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
//               >
//                 {exportingPDF ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                     Export PDF...
//                   </>
//                 ) : (
//                   <>
//                     <Download size={20} />
//                     Export PDF
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Cartes de statistiques globales */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
//                 <Activity size={24} className="text-blue-600 dark:text-blue-400" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900 dark:text-white">{statsGlobales.total}</p>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Interventions terminées</p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
//                 <Clock size={24} className="text-purple-600 dark:text-purple-400" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Moyenne</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900 dark:text-white">
//               {statsGlobales.moyenneGlobale.formattee}
//             </p>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Durée moyenne globale</p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
//                 <TrendingUp size={24} className="text-green-600 dark:text-green-400" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Min</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900 dark:text-white">
//               {statsGlobales.dureeMin.heures}h {statsGlobales.dureeMin.minutes}m
//             </p>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Intervention la plus rapide</p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
//                 <Award size={24} className="text-orange-600 dark:text-orange-400" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Max</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900 dark:text-white">
//               {statsGlobales.dureeMax.heures}h {statsGlobales.dureeMax.minutes}m
//             </p>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Intervention la plus longue</p>
//           </div>
//         </div>

//         {/* Graphiques */}
//         <div id="charts-container" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Graphique durée moyenne par type */}
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
//                 <BarChart size={20} className="text-purple-600 dark:text-purple-400" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Durée moyenne par type</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">En heures</p>
//               </div>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={dataBarChart}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="type" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: 'white', 
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '8px'
//                   }}
//                   formatter={(value) => [`${value}h`, 'Durée moyenne']}
//                 />
//                 <Bar dataKey="moyenne" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Graphique répartition par type */}
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                 <Target size={20} className="text-blue-600 dark:text-blue-400" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Répartition par type</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Nombre d'interventions</p>
//               </div>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={dataPieChart}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {dataPieChart.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.values(COLORS).length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Graphique d'évolution dans le temps */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
//                 <TrendingUp size={20} className="text-orange-600 dark:text-orange-400" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Évolution des durées</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Durée moyenne par jour (en heures)</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <Filter size={18} className="text-gray-600 dark:text-gray-400" />
//               <select
//                 value={periode}
//                 onChange={(e) => setPeriode(Number(e.target.value))}
//                 className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               >
//                 <option value={7}>7 derniers jours</option>
//                 <option value={14}>14 derniers jours</option>
//                 <option value={30}>30 derniers jours</option>
//                 <option value={60}>60 derniers jours</option>
//                 <option value={90}>90 derniers jours</option>
//               </select>
//             </div>
//           </div>
          
//           <ResponsiveContainer width="100%" height={350}>
//             <LineChart data={dataLineChart}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//               <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//               <YAxis tick={{ fontSize: 12 }} />
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: 'white', 
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '8px'
//                 }}
//                 formatter={(value, name) => {
//                   if (name === 'moyenne') return [`${value}h`, 'Durée moyenne'];
//                   if (name === 'count') return [`${value}`, 'Interventions'];
//                   return value;
//                 }}
//               />
//               <Legend />
//               <Line 
//                 type="monotone" 
//                 dataKey="moyenne" 
//                 stroke="#f97316" 
//                 strokeWidth={3}
//                 name="Durée moyenne (h)"
//                 dot={{ fill: '#f97316', r: 4 }}
//                 activeDot={{ r: 6 }}
//               />
//               <Line 
//                 type="monotone" 
//                 dataKey="count" 
//                 stroke="#06b6d4" 
//                 strokeWidth={2}
//                 name="Nombre d'interventions"
//                 dot={{ fill: '#06b6d4', r: 3 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Tableau des statistiques par type */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-600">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Statistiques détaillées par type</h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comparaison des performances</p>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 dark:bg-gray-700">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Nombre
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Durée Moyenne
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Durée Médiane
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Proportion
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
//                 {statsParType.map((stat) => {
//                   const proportion = ((stat.count / statsGlobales.total) * 100).toFixed(1);
//                   return (
//                     <tr key={stat.type} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div 
//                             className="w-3 h-3 rounded-full" 
//                             style={{ backgroundColor: COLORS[stat.type] }}
//                           ></div>
//                           <span className="font-medium text-gray-900 dark:text-white">
//                             {TYPE_LABELS[stat.type] || stat.type}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
//                           {stat.count}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
//                         {stat.moyenne.formattee}
//                       </td>
//                       <td className="px-6 py-4 text-center font-medium text-gray-700 dark:text-gray-300">
//                         {stat.mediane.formattee}
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <div className="flex items-center gap-2 justify-center">
//                           <div className="flex-1 max-w-[100px] bg-gray-200 dark:bg-gray-600 rounded-full h-2">
//                             <div 
//                               className="h-2 rounded-full" 
//                               style={{ 
//                                 width: `${proportion}%`,
//                                 backgroundColor: COLORS[stat.type]
//                               }}
//                             ></div>
//                           </div>
//                           <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-right">
//                             {proportion}%
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatistiquesView;



// NOUVELLE VERSION POUR AFFICHER TOUTE LA PARTIE DU GRAPHIQUE DE LA REPARTITION PAR TYPE


// import React, { useState, useEffect } from 'react';
// import { 
//   BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
// } from 'recharts';
// import { 
//   Clock, TrendingUp, Download, Calendar, 
//   Activity, Target, Award, Filter, FileText 
// } from 'lucide-react';
// import { getStatsDureeDetaillees, getEvolutionDurees, exportCSV, exportPDF } from '../../services/statsService';

// const StatistiquesView = ({ currentUser }) => {
//   const [stats, setStats] = useState(null);
//   const [evolution, setEvolution] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [periode, setPeriode] = useState(30);
//   const [exportingCSV, setExportingCSV] = useState(false);
//   const [exportingPDF, setExportingPDF] = useState(false);

//   const COLORS = {
//     reparation: '#8b5cf6',
//     diagnostic: '#f97316',
//     verification: '#06b6d4',
//     maintenance: '#6366f1',
//     installation: '#ec4899'
//   };

//   const TYPE_LABELS = {
//     reparation: 'Réparation',
//     diagnostic: 'Diagnostic',
//     verification: 'Vérification',
//     maintenance: 'Maintenance',
//     installation: 'Installation'
//   };

//   useEffect(() => {
//     loadStats();
//   }, []);

//   useEffect(() => {
//     loadEvolution();
//   }, [periode]);

//   const loadStats = async () => {
//     try {
//       setLoading(true);
//       const response = await getStatsDureeDetaillees();
//       setStats(response.data);
//     } catch (error) {
//       console.error('Erreur chargement stats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadEvolution = async () => {
//     try {
//       const response = await getEvolutionDurees(periode);
//       setEvolution(response.data);
//     } catch (error) {
//       console.error('Erreur chargement évolution:', error);
//     }
//   };

//   const handleExportCSV = async () => {
//     try {
//       setExportingCSV(true);
//       await exportCSV();
//       alert('Export CSV réussi ! Le fichier a été téléchargé.');
//     } catch (error) {
//       console.error('Erreur export CSV:', error);
//       alert('Erreur lors de l\'export CSV');
//     } finally {
//       setExportingCSV(false);
//     }
//   };

//   const handleExportPDF = async () => {
//     try {
//       setExportingPDF(true);
//       await exportPDF(stats, currentUser);
//       alert('Export PDF réussi ! Le fichier a été téléchargé.');
//     } catch (error) {
//       console.error('Erreur export PDF:', error);
//       alert('Erreur lors de l\'export PDF');
//     } finally {
//       setExportingPDF(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-400">Chargement des statistiques...</p>
//         </div>
//       </div>
//     );
//   };

//   if (!stats || !stats.interventions || stats.interventions.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
//             <Activity size={64} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//               Aucune donnée disponible
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400">
//               Aucune intervention terminée avec des données de durée pour le moment.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const statsGlobales = stats.statistiquesGlobales;
//   const statsParType = stats.statistiquesParType;

//   // Données pour le graphique en barres (durée moyenne par type)
//   const dataBarChart = statsParType.map(stat => ({
//     type: TYPE_LABELS[stat.type] || stat.type,
//     moyenne: parseFloat((stat.moyenne.ms / (1000 * 60 * 60)).toFixed(2)),
//     count: stat.count
//   }));

//   // Données pour le graphique en camembert (répartition par type)
//   const dataPieChart = statsParType.map(stat => ({
//     name: TYPE_LABELS[stat.type] || stat.type,
//     value: stat.count
//   }));

//   // Données pour le graphique d'évolution
//   const dataLineChart = evolution?.evolution.map(jour => ({
//     date: new Date(jour.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
//     moyenne: parseFloat(jour.moyenneDureeHeures.toFixed(2)),
//     count: jour.count
//   })) || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Statistiques des Interventions
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400 mt-2">
//                 Analyse des durées et performances
//               </p>
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={handleExportCSV}
//                 disabled={exportingCSV}
//                 className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
//               >
//                 {exportingCSV ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                     Export CSV...
//                   </>
//                 ) : (
//                   <>
//                     <FileText size={20} />
//                     Export CSV
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={handleExportPDF}
//                 disabled={exportingPDF}
//                 className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
//               >
//                 {exportingPDF ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                     Export PDF...
//                   </>
//                 ) : (
//                   <>
//                     <Download size={20} />
//                     Export PDF
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Cartes de statistiques globales */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
//                 <Activity size={24} className="text-blue-600 dark:text-blue-400" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900 dark:text-white">{statsGlobales.total}</p>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Interventions terminées</p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
//                 <Clock size={24} className="text-purple-600 dark:text-purple-400" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Moyenne</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900 dark:text-white">
//               {statsGlobales.moyenneGlobale.formattee}
//             </p>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Durée moyenne globale</p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
//                 <TrendingUp size={24} className="text-green-600 dark:text-green-400" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Min</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900 dark:text-white">
//               {statsGlobales.dureeMin.heures}h {statsGlobales.dureeMin.minutes}m
//             </p>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Intervention la plus rapide</p>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
//                 <Award size={24} className="text-orange-600 dark:text-orange-400" />
//               </div>
//               <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Max</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900 dark:text-white">
//               {statsGlobales.dureeMax.heures}h {statsGlobales.dureeMax.minutes}m
//             </p>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Intervention la plus longue</p>
//           </div>
//         </div>

//         {/* Graphiques */}
//         <div id="charts-container" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Graphique durée moyenne par type */}
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
//                 <BarChart size={20} className="text-purple-600 dark:text-purple-400" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Durée moyenne par type</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">En heures</p>
//               </div>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={dataBarChart}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="type" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: 'white', 
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '8px'
//                   }}
//                   formatter={(value) => [`${value}h`, 'Durée moyenne']}
//                 />
//                 <Bar dataKey="moyenne" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Graphique répartition par type - AVEC POURCENTAGES DANS LE TOOLTIP */}
// <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
//   <div className="flex items-center gap-3 mb-6">
//     <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//       <Target size={20} className="text-blue-600 dark:text-blue-400" />
//     </div>
//     <div>
//       <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Répartition par type</h3>
//       <p className="text-sm text-gray-600 dark:text-gray-400">Nombre d'interventions</p>
//     </div>
//   </div>
  
//   {/* Graphique + Légende */}
//   <div className="flex flex-col items-center gap-6">
//     {/* Graphique avec padding pour éviter le débordement */}
//     <div className="w-full h-[300px] flex items-center justify-center">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={dataPieChart}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             label={false}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {dataPieChart.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.values(COLORS).length]} />
//             ))}
//           </Pie>
//           <Tooltip 
//             contentStyle={{ 
//               backgroundColor: 'white', 
//               border: '1px solid #e5e7eb',
//               borderRadius: '8px',
//               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//             }}
//             formatter={(value, name, props) => {
//               const total = dataPieChart.reduce((sum, item) => sum + item.value, 0);
//               const percentage = ((value / total) * 100).toFixed(1);
//               return [
//                 <div key="tooltip-content">
//                   <div className="font-semibold">{value} interventions</div>
//                   <div className="text-sm text-gray-600">{percentage}% du total</div>
//                 </div>,
//                 name
//               ];
//             }}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>

//     {/* Légende sous le graphique */}
//     <div className="grid grid-cols-2 gap-3 w-full">
//       {dataPieChart.map((entry, index) => {
//         const total = dataPieChart.reduce((sum, item) => sum + item.value, 0);
//         const percentage = ((entry.value / total) * 100).toFixed(1);
//         return (
//           <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
//             <div 
//               className="w-4 h-4 rounded-full flex-shrink-0" 
//               style={{ backgroundColor: Object.values(COLORS)[index % Object.values(COLORS).length] }}
//             ></div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                 {entry.name}
//               </p>
//               <p className="text-xs text-gray-600 dark:text-gray-400">
//                 {entry.value} interventions ({percentage}%)
//               </p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// </div>
//         </div>

//         {/* Graphique d'évolution dans le temps */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
//                 <TrendingUp size={20} className="text-orange-600 dark:text-orange-400" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Évolution des durées</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Durée moyenne par jour (en heures)</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <Filter size={18} className="text-gray-600 dark:text-gray-400" />
//               <select
//                 value={periode}
//                 onChange={(e) => setPeriode(Number(e.target.value))}
//                 className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               >
//                 <option value={7}>7 derniers jours</option>
//                 <option value={14}>14 derniers jours</option>
//                 <option value={30}>30 derniers jours</option>
//                 <option value={60}>60 derniers jours</option>
//                 <option value={90}>90 derniers jours</option>
//               </select>
//             </div>
//           </div>
          
//           <ResponsiveContainer width="100%" height={350}>
//             <LineChart data={dataLineChart}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//               <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//               <YAxis tick={{ fontSize: 12 }} />
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: 'white', 
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '8px'
//                 }}
//                 formatter={(value, name) => {
//                   if (name === 'moyenne') return [`${value}h`, 'Durée moyenne'];
//                   if (name === 'count') return [`${value}`, 'Interventions'];
//                   return value;
//                 }}
//               />
//               <Legend />
//               <Line 
//                 type="monotone" 
//                 dataKey="moyenne" 
//                 stroke="#f97316" 
//                 strokeWidth={3}
//                 name="Durée moyenne (h)"
//                 dot={{ fill: '#f97316', r: 4 }}
//                 activeDot={{ r: 6 }}
//               />
//               <Line 
//                 type="monotone" 
//                 dataKey="count" 
//                 stroke="#06b6d4" 
//                 strokeWidth={2}
//                 name="Nombre d'interventions"
//                 dot={{ fill: '#06b6d4', r: 3 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Tableau des statistiques par type */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-600">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Statistiques détaillées par type</h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comparaison des performances</p>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 dark:bg-gray-700">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Nombre
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Durée Moyenne
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Durée Médiane
//                   </th>
//                   <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Proportion
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
//                 {statsParType.map((stat) => {
//                   const proportion = ((stat.count / statsGlobales.total) * 100).toFixed(1);
//                   return (
//                     <tr key={stat.type} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div 
//                             className="w-3 h-3 rounded-full" 
//                             style={{ backgroundColor: COLORS[stat.type] }}
//                           ></div>
//                           <span className="font-medium text-gray-900 dark:text-white">
//                             {TYPE_LABELS[stat.type] || stat.type}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
//                           {stat.count}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
//                         {stat.moyenne.formattee}
//                       </td>
//                       <td className="px-6 py-4 text-center font-medium text-gray-700 dark:text-gray-300">
//                         {stat.mediane.formattee}
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <div className="flex items-center gap-2 justify-center">
//                           <div className="flex-1 max-w-[100px] bg-gray-200 dark:bg-gray-600 rounded-full h-2">
//                             <div 
//                               className="h-2 rounded-full" 
//                               style={{ 
//                                 width: `${proportion}%`,
//                                 backgroundColor: COLORS[stat.type]
//                               }}
//                             ></div>
//                           </div>
//                           <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-right">
//                             {proportion}%
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatistiquesView;



// NOUVELLE VERSION POUR AMELIORER



import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Clock, TrendingUp, Download, Calendar, 
  Activity, Target, Award, Filter, FileText 
} from 'lucide-react';
import { getStatsDureeDetaillees, getEvolutionDurees, exportCSV, exportPDF } from '../../services/statsService';

const StatistiquesView = ({ currentUser }) => {
  const [stats, setStats] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [periode, setPeriode] = useState(30);
  const [exportingCSV, setExportingCSV] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);

  const COLORS = {
    reparation: '#8b5cf6',
    diagnostic: '#f97316',
    verification: '#06b6d4',
    maintenance: '#6366f1',
    installation: '#ec4899'
  };

  const TYPE_LABELS = {
    reparation: 'Réparation',
    diagnostic: 'Diagnostic',
    verification: 'Vérification',
    maintenance: 'Maintenance',
    installation: 'Installation'
  };

  // ✅ FONCTION POUR FORMATER LES DURÉES (VERSION FRONTEND)
const formatDuree = (dureeObj) => {
  if (!dureeObj) return '0min';
  
  // Si on a déjà le formatté, le retourner directement
  if (dureeObj.formattee) {
    return dureeObj.formattee;
  }
  
  const { jours = 0, heures = 0, minutes = 0, secondes = 0 } = dureeObj;
  
  // Si la durée est en jours
  if (jours > 0) {
    if (heures > 0) {
      return `${jours}j ${heures}h`;
    }
    return `${jours}j`;
  }
  
  // Si la durée est en heures
  if (heures > 0) {
    if (minutes > 0) {
      return `${heures}h ${minutes}min`;
    }
    return `${heures}h`;
  }
  
  // Si la durée est en minutes
  if (minutes > 0) {
    if (secondes > 0) {
      return `${minutes}min ${secondes}s`;
    }
    return `${minutes}min`;
  }
  
  // Si la durée est en secondes seulement
  if (secondes > 0) {
    return `${secondes}s`;
  }
  
  return '0s';
};

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    loadEvolution();
  }, [periode]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await getStatsDureeDetaillees();
      setStats(response.data);
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEvolution = async () => {
    try {
      const response = await getEvolutionDurees(periode);
      setEvolution(response.data);
    } catch (error) {
      console.error('Erreur chargement évolution:', error);
    }
  };

  const handleExportCSV = async () => {
    try {
      setExportingCSV(true);
      await exportCSV();
      alert('Export CSV réussi ! Le fichier a été téléchargé.');
    } catch (error) {
      console.error('Erreur export CSV:', error);
      alert('Erreur lors de l\'export CSV');
    } finally {
      setExportingCSV(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      setExportingPDF(true);
      await exportPDF(stats, currentUser);
      alert('Export PDF réussi ! Le fichier a été téléchargé.');
    } catch (error) {
      console.error('Erreur export PDF:', error);
      alert('Erreur lors de l\'export PDF');
    } finally {
      setExportingPDF(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (!stats || !stats.interventions || stats.interventions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <Activity size={64} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Aucune donnée disponible
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Aucune intervention terminée avec des données de durée pour le moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const statsGlobales = stats.statistiquesGlobales;
  const statsParType = stats.statistiquesParType;

  // Données pour le graphique en barres (durée moyenne par type)
  const dataBarChart = statsParType.map(stat => ({
    type: TYPE_LABELS[stat.type] || stat.type,
    moyenne: parseFloat((stat.moyenne.ms / (1000 * 60 * 60)).toFixed(2)),
    count: stat.count
  }));

  // Données pour le graphique en camembert (répartition par type)
  const dataPieChart = statsParType.map(stat => ({
    name: TYPE_LABELS[stat.type] || stat.type,
    value: stat.count
  }));

  // Données pour le graphique d'évolution
  const dataLineChart = evolution?.evolution.map(jour => ({
    date: new Date(jour.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
    moyenne: parseFloat(jour.moyenneDureeHeures.toFixed(2)),
    count: jour.count
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Statistiques des Interventions
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Analyse des durées et performances
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleExportCSV}
                disabled={exportingCSV}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
              >
                {exportingCSV ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Export CSV...
                  </>
                ) : (
                  <>
                    <FileText size={20} />
                    Export CSV
                  </>
                )}
              </button>

              <button
                onClick={handleExportPDF}
                disabled={exportingPDF}
                className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50"
              >
                {exportingPDF ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Export PDF...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Export PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Activity size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{statsGlobales.total}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Interventions terminées</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Clock size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Moyenne</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatDuree(statsGlobales.moyenneGlobale)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Durée moyenne globale</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <TrendingUp size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Min</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatDuree(statsGlobales.dureeMin)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Intervention la plus rapide</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                <Award size={24} className="text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Max</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatDuree(statsGlobales.dureeMax)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Intervention la plus longue</p>
          </div>
        </div>

        {/* Graphiques */}
        <div id="charts-container" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Graphique durée moyenne par type */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <BarChart size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Durée moyenne par type</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">En heures</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataBarChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value}h`, 'Durée moyenne']}
                />
                <Bar dataKey="moyenne" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Graphique répartition par type */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Target size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Répartition par type</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Nombre d'interventions</p>
              </div>
            </div>
            
            {/* Graphique + Légende */}
            <div className="flex flex-col items-center gap-6">
              {/* Graphique avec padding pour éviter le débordement */}
              <div className="w-full h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataPieChart}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dataPieChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.values(COLORS).length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value, name, props) => {
                        const total = dataPieChart.reduce((sum, item) => sum + item.value, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return [
                          <div key="tooltip-content">
                            <div className="font-semibold">{value} interventions</div>
                            <div className="text-sm text-gray-600">{percentage}% du total</div>
                          </div>,
                          name
                        ];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Légende sous le graphique */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {dataPieChart.map((entry, index) => {
                  const total = dataPieChart.reduce((sum, item) => sum + item.value, 0);
                  const percentage = ((entry.value / total) * 100).toFixed(1);
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: Object.values(COLORS)[index % Object.values(COLORS).length] }}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {entry.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {entry.value} interventions ({percentage}%)
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Graphique d'évolution dans le temps */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <TrendingUp size={20} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Évolution des durées</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Durée moyenne par jour (en heures)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-600 dark:text-gray-400" />
              <select
                value={periode}
                onChange={(e) => setPeriode(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value={7}>7 derniers jours</option>
                <option value={14}>14 derniers jours</option>
                <option value={30}>30 derniers jours</option>
                <option value={60}>60 derniers jours</option>
                <option value={90}>90 derniers jours</option>
              </select>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={dataLineChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => {
                  if (name === 'moyenne') return [`${value}h`, 'Durée moyenne'];
                  if (name === 'count') return [`${value}`, 'Interventions'];
                  return value;
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="moyenne" 
                stroke="#f97316" 
                strokeWidth={3}
                name="Durée moyenne (h)"
                dot={{ fill: '#f97316', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#06b6d4" 
                strokeWidth={2}
                name="Nombre d'interventions"
                dot={{ fill: '#06b6d4', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tableau des statistiques par type */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Statistiques détaillées par type</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comparaison des performances</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Durée Moyenne
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Durée Médiane
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Proportion
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {statsParType.map((stat) => {
                  const proportion = ((stat.count / statsGlobales.total) * 100).toFixed(1);
                  return (
                    <tr key={stat.type} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[stat.type] }}
                          ></div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {TYPE_LABELS[stat.type] || stat.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          {stat.count}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                        {stat.moyenne.formattee}
                      </td>
                      <td className="px-6 py-4 text-center font-medium text-gray-700 dark:text-gray-300">
                        {stat.mediane.formattee}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="flex-1 max-w-[100px] bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${proportion}%`,
                                backgroundColor: COLORS[stat.type]
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-right">
                            {proportion}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistiquesView;