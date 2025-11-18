// import React, { useState, useMemo } from 'react';
// import { 
//   Search, 
//   Filter, 
//   Download, 
//   Calendar,
//   User,
//   Package,
//   CheckCircle,
//   Clock,
//   AlertTriangle
// } from 'lucide-react';

// const HistoriqueEmpruntsView = ({ emprunts, stock, currentUser }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statutFilter, setStatutFilter] = useState('tous');
//   const [dateDebut, setDateDebut] = useState('');
//   const [dateFin, setDateFin] = useState('');
//   const [tri, setTri] = useState('dateDesc');

//   // Filtrer et trier les emprunts
//   const empruntsFiltres = useMemo(() => {
//     let filtered = [...emprunts];

//     // Filtre par recherche
//     if (searchTerm) {
//       filtered = filtered.filter(emprunt =>
//         emprunt.emprunteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         emprunt.materiel?.nom.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filtre par statut
//     if (statutFilter !== 'tous') {
//       filtered = filtered.filter(emprunt => emprunt.statut === statutFilter);
//     }

//     // Filtre par date
//     if (dateDebut) {
//       filtered = filtered.filter(emprunt => 
//         new Date(emprunt.dateEmprunt) >= new Date(dateDebut)
//       );
//     }
//     if (dateFin) {
//       filtered = filtered.filter(emprunt => 
//         new Date(emprunt.dateEmprunt) <= new Date(dateFin + 'T23:59:59')
//       );
//     }

//     // Trier
//     filtered.sort((a, b) => {
//       switch (tri) {
//         case 'dateAsc':
//           return new Date(a.dateEmprunt) - new Date(b.dateEmprunt);
//         case 'dateDesc':
//           return new Date(b.dateEmprunt) - new Date(a.dateEmprunt);
//         case 'retourAsc':
//           return new Date(a.dateRetourPrevue) - new Date(b.dateRetourPrevue);
//         case 'retourDesc':
//           return new Date(b.dateRetourPrevue) - new Date(a.dateRetourPrevue);
//         case 'quantiteAsc':
//           return a.quantite - b.quantite;
//         case 'quantiteDesc':
//           return b.quantite - a.quantite;
//         default:
//           return 0;
//       }
//     });

//     return filtered;
//   }, [emprunts, searchTerm, statutFilter, dateDebut, dateFin, tri]);

//   // Statistiques de l'historique
//   const stats = useMemo(() => {
//     const total = empruntsFiltres.length;
//     const enCours = empruntsFiltres.filter(e => e.statut === 'en_cours').length;
//     const retournes = empruntsFiltres.filter(e => e.statut === 'retourne').length;
//     const enRetard = empruntsFiltres.filter(e => 
//       e.statut === 'en_cours' && new Date(e.dateRetourPrevue) < new Date()
//     ).length;

//     return { total, enCours, retournes, enRetard };
//   }, [empruntsFiltres]);

//   // Fonction pour exporter en CSV
//   const exporterCSV = () => {
//     const headers = ['Matériel', 'Emprunteur', 'Quantité', 'Date Emprunt', 'Date Retour Prévue', 'Date Retour Effective', 'Statut', 'Responsable'];
    
//     const csvContent = [
//       headers.join(','),
//       ...empruntsFiltres.map(emprunt => [
//         `"${emprunt.materiel?.nom || 'N/A'}"`,
//         `"${emprunt.emprunteur}"`,
//         emprunt.quantite,
//         new Date(emprunt.dateEmprunt).toLocaleDateString('fr-FR'),
//         new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR'),
//         emprunt.dateRetourEffective ? new Date(emprunt.dateRetourEffective).toLocaleDateString('fr-FR') : 'N/A',
//         emprunt.statut,
//         `"${emprunt.responsable?.nom || 'N/A'} ${emprunt.responsable?.prenom || ''}"`
//       ].join(','))
//     ].join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', `historique_emprunts_${new Date().toISOString().split('T')[0]}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const getStatutIcon = (statut, dateRetourPrevue) => {
//     if (statut === 'retourne') {
//       return <CheckCircle className="w-4 h-4 text-green-500" />;
//     }
//     if (statut === 'en_cours') {
//       const estEnRetard = new Date(dateRetourPrevue) < new Date();
//       return estEnRetard 
//         ? <AlertTriangle className="w-4 h-4 text-red-500" />
//         : <Clock className="w-4 h-4 text-yellow-500" />;
//     }
//     return null;
//   };

//   const getStatutText = (statut, dateRetourPrevue) => {
//     if (statut === 'retourne') return 'Retourné';
//     if (statut === 'en_cours') {
//       return new Date(dateRetourPrevue) < new Date() ? 'En retard' : 'En cours';
//     }
//     return statut;
//   };

//   const getStatutColor = (statut, dateRetourPrevue) => {
//     if (statut === 'retourne') return 'bg-green-100 text-green-800';
//     if (statut === 'en_cours') {
//       return new Date(dateRetourPrevue) < new Date() 
//         ? 'bg-red-100 text-red-800'
//         : 'bg-yellow-100 text-yellow-800';
//     }
//     return 'bg-gray-100 text-gray-800';
//   };

//   return (
//     <div className="space-y-6">
//       {/* En-tête */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800">Historique des Emprunts</h1>
//         <button
//           onClick={exporterCSV}
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//         >
//           <Download className="w-4 h-4" />
//           Exporter CSV
//         </button>
//       </div>

//       {/* Cartes de statistiques */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-lg shadow p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total</p>
//               <p className="text-2xl font-bold">{stats.total}</p>
//             </div>
//             <Package className="w-8 h-8 text-blue-500" />
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">En cours</p>
//               <p className="text-2xl font-bold">{stats.enCours}</p>
//             </div>
//             <Clock className="w-8 h-8 text-yellow-500" />
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Retournés</p>
//               <p className="text-2xl font-bold">{stats.retournes}</p>
//             </div>
//             <CheckCircle className="w-8 h-8 text-green-500" />
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">En retard</p>
//               <p className="text-2xl font-bold">{stats.enRetard}</p>
//             </div>
//             <AlertTriangle className="w-8 h-8 text-red-500" />
//           </div>
//         </div>
//       </div>

//       {/* Filtres et recherche */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//           {/* Recherche */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Rechercher..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           {/* Filtre statut */}
//           <select
//             value={statutFilter}
//             onChange={(e) => setStatutFilter(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="tous">Tous les statuts</option>
//             <option value="en_cours">En cours</option>
//             <option value="retourne">Retournés</option>
//           </select>

//           {/* Date début */}
//           <div className="relative">
//             <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="date"
//               value={dateDebut}
//               onChange={(e) => setDateDebut(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           {/* Date fin */}
//           <div className="relative">
//             <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="date"
//               value={dateFin}
//               onChange={(e) => setDateFin(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           {/* Tri */}
//           <select
//             value={tri}
//             onChange={(e) => setTri(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="dateDesc">Plus récents</option>
//             <option value="dateAsc">Plus anciens</option>
//             <option value="retourAsc">Retour (croissant)</option>
//             <option value="retourDesc">Retour (décroissant)</option>
//             <option value="quantiteAsc">Quantité (croissant)</option>
//             <option value="quantiteDesc">Quantité (décroissant)</option>
//           </select>
//         </div>
//       </div>

//       {/* Tableau des emprunts */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Matériel
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Emprunteur
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Quantité
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Dates
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Statut
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Responsable
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {empruntsFiltres.map(emprunt => {
//                 const materiel = stock.find(s => s._id === emprunt.materiel?._id || s._id === emprunt.materiel);
                
//                 return (
//                   <tr key={emprunt._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <Package className="w-4 h-4 text-gray-400 mr-2" />
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">
//                             {emprunt.materiel?.nom || materiel?.nom}
//                           </div>
//                           <div className="text-sm text-gray-500 capitalize">
//                             {emprunt.materiel?.categorie || materiel?.categorie}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <User className="w-4 h-4 text-gray-400 mr-2" />
//                         <div className="text-sm text-gray-900">{emprunt.emprunteur}</div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{emprunt.quantite}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         <div>Emprunt: {new Date(emprunt.dateEmprunt).toLocaleDateString('fr-FR')}</div>
//                         <div>Retour: {new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR')}</div>
//                         {emprunt.dateRetourEffective && (
//                           <div className="text-green-600">
//                             Effectif: {new Date(emprunt.dateRetourEffective).toLocaleDateString('fr-FR')}
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         {getStatutIcon(emprunt.statut, emprunt.dateRetourPrevue)}
//                         <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatutColor(emprunt.statut, emprunt.dateRetourPrevue)}`}>
//                           {getStatutText(emprunt.statut, emprunt.dateRetourPrevue)}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {emprunt.responsable?.nom} {emprunt.responsable?.prenom}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {empruntsFiltres.length === 0 && (
//           <div className="text-center py-12">
//             <Package className="mx-auto h-12 w-12 text-gray-400" />
//             <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun emprunt trouvé</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               Essayez de modifier vos critères de recherche.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Pagination (optionnelle) */}
//       <div className="flex justify-between items-center bg-white px-6 py-3 border-t border-gray-200">
//         <div className="text-sm text-gray-700">
//           Affichage de <span className="font-medium">{empruntsFiltres.length}</span> emprunts
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoriqueEmpruntsView;


// NOUVELLE VERSION POUR MODE SOMBRE



import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  User,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const HistoriqueEmpruntsView = ({ emprunts, stock, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statutFilter, setStatutFilter] = useState('tous');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [tri, setTri] = useState('dateDesc');

  // Filtrer et trier les emprunts
  const empruntsFiltres = useMemo(() => {
    let filtered = [...emprunts];

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(emprunt =>
        emprunt.emprunteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emprunt.materiel?.nom.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par statut
    if (statutFilter !== 'tous') {
      filtered = filtered.filter(emprunt => emprunt.statut === statutFilter);
    }

    // Filtre par date
    if (dateDebut) {
      filtered = filtered.filter(emprunt => 
        new Date(emprunt.dateEmprunt) >= new Date(dateDebut)
      );
    }
    if (dateFin) {
      filtered = filtered.filter(emprunt => 
        new Date(emprunt.dateEmprunt) <= new Date(dateFin + 'T23:59:59')
      );
    }

    // Trier
    filtered.sort((a, b) => {
      switch (tri) {
        case 'dateAsc':
          return new Date(a.dateEmprunt) - new Date(b.dateEmprunt);
        case 'dateDesc':
          return new Date(b.dateEmprunt) - new Date(a.dateEmprunt);
        case 'retourAsc':
          return new Date(a.dateRetourPrevue) - new Date(b.dateRetourPrevue);
        case 'retourDesc':
          return new Date(b.dateRetourPrevue) - new Date(a.dateRetourPrevue);
        case 'quantiteAsc':
          return a.quantite - b.quantite;
        case 'quantiteDesc':
          return b.quantite - a.quantite;
        default:
          return 0;
      }
    });

    return filtered;
  }, [emprunts, searchTerm, statutFilter, dateDebut, dateFin, tri]);

  // Statistiques de l'historique
  const stats = useMemo(() => {
    const total = empruntsFiltres.length;
    const enCours = empruntsFiltres.filter(e => e.statut === 'en_cours').length;
    const retournes = empruntsFiltres.filter(e => e.statut === 'retourne').length;
    const enRetard = empruntsFiltres.filter(e => 
      e.statut === 'en_cours' && new Date(e.dateRetourPrevue) < new Date()
    ).length;

    return { total, enCours, retournes, enRetard };
  }, [empruntsFiltres]);

  // Fonction pour exporter en CSV
  const exporterCSV = () => {
    const headers = ['Matériel', 'Emprunteur', 'Quantité', 'Date Emprunt', 'Date Retour Prévue', 'Date Retour Effective', 'Statut', 'Responsable'];
    
    const csvContent = [
      headers.join(','),
      ...empruntsFiltres.map(emprunt => [
        `"${emprunt.materiel?.nom || 'N/A'}"`,
        `"${emprunt.emprunteur}"`,
        emprunt.quantite,
        new Date(emprunt.dateEmprunt).toLocaleDateString('fr-FR'),
        new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR'),
        emprunt.dateRetourEffective ? new Date(emprunt.dateRetourEffective).toLocaleDateString('fr-FR') : 'N/A',
        emprunt.statut,
        `"${emprunt.responsable?.nom || 'N/A'} ${emprunt.responsable?.prenom || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `historique_emprunts_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatutIcon = (statut, dateRetourPrevue) => {
    if (statut === 'retourne') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    if (statut === 'en_cours') {
      const estEnRetard = new Date(dateRetourPrevue) < new Date();
      return estEnRetard 
        ? <AlertTriangle className="w-4 h-4 text-red-500" />
        : <Clock className="w-4 h-4 text-yellow-500" />;
    }
    return null;
  };

  const getStatutText = (statut, dateRetourPrevue) => {
    if (statut === 'retourne') return 'Retourné';
    if (statut === 'en_cours') {
      return new Date(dateRetourPrevue) < new Date() ? 'En retard' : 'En cours';
    }
    return statut;
  };

  const getStatutColor = (statut, dateRetourPrevue) => {
    if (statut === 'retourne') return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
    if (statut === 'en_cours') {
      return new Date(dateRetourPrevue) < new Date() 
        ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
    }
    return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Historique des Emprunts
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Consultez l'historique complet des emprunts de matériel
            </p>
          </div>
          <button
            onClick={exporterCSV}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
          >
            <Download className="w-4 h-4" />
            Exporter CSV
          </button>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">En cours</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.enCours}</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Retournés</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.retournes}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">En retard</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.enRetard}</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filtre statut */}
            <select
              value={statutFilter}
              onChange={(e) => setStatutFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les statuts</option>
              <option value="en_cours">En cours</option>
              <option value="retourne">Retournés</option>
            </select>

            {/* Date début */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Date fin */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Tri */}
            <select
              value={tri}
              onChange={(e) => setTri(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="dateDesc">Plus récents</option>
              <option value="dateAsc">Plus anciens</option>
              <option value="retourAsc">Retour (croissant)</option>
              <option value="retourDesc">Retour (décroissant)</option>
              <option value="quantiteAsc">Quantité (croissant)</option>
              <option value="quantiteDesc">Quantité (décroissant)</option>
            </select>
          </div>
        </div>

        {/* Tableau des emprunts */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Matériel
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Emprunteur
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Quantité
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Responsable
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                {empruntsFiltres.map(emprunt => {
                  const materiel = stock.find(s => s._id === emprunt.materiel?._id || s._id === emprunt.materiel);
                  
                  return (
                    <tr key={emprunt._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Package className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {emprunt.materiel?.nom || materiel?.nom}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              {emprunt.materiel?.categorie || materiel?.categorie}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900 dark:text-white">{emprunt.emprunteur}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{emprunt.quantite}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          <div>Emprunt: {new Date(emprunt.dateEmprunt).toLocaleDateString('fr-FR')}</div>
                          <div>Retour: {new Date(emprunt.dateRetourPrevue).toLocaleDateString('fr-FR')}</div>
                          {emprunt.dateRetourEffective && (
                            <div className="text-green-600 dark:text-green-400">
                              Effectif: {new Date(emprunt.dateRetourEffective).toLocaleDateString('fr-FR')}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatutIcon(emprunt.statut, emprunt.dateRetourPrevue)}
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatutColor(emprunt.statut, emprunt.dateRetourPrevue)}`}>
                            {getStatutText(emprunt.statut, emprunt.dateRetourPrevue)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {emprunt.responsable?.nom} {emprunt.responsable?.prenom}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {empruntsFiltres.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucun emprunt trouvé</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Essayez de modifier vos critères de recherche.
              </p>
            </div>
          )}
        </div>

        {/* Pagination (optionnelle) */}
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-600">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Affichage de <span className="font-medium">{empruntsFiltres.length}</span> emprunts
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoriqueEmpruntsView;