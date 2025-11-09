// VERSION 3 AVEC DEEPSEEK

// import React, { useState } from 'react';

// const EmpruntModal = ({ stock, onSave, onClose, loading, empruntToEdit }) => {
//   const isEditing = !!empruntToEdit;
  
//   // Fonction pour formater la date en yyyy-MM-dd
//   const formatDateForInput = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toISOString().split('T')[0]; // Format yyyy-MM-dd
//   };

//   const [formData, setFormData] = useState({
//     materiel: empruntToEdit?.materiel?._id || '',
//     quantite: empruntToEdit?.quantite || 1,
//     emprunteur: empruntToEdit?.emprunteur || '',
//     dateEmprunt: formatDateForInput(empruntToEdit?.dateEmprunt) || new Date().toISOString().split('T')[0],
//     dateRetourPrevue: formatDateForInput(empruntToEdit?.dateRetourPrevue) || ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Données envoyées pour modification:', formData);
    
//     // Convertir les dates en format ISO pour l'API
//     const dataForAPI = {
//       ...formData,
//       dateEmprunt: new Date(formData.dateEmprunt).toISOString(),
//       dateRetourPrevue: new Date(formData.dateRetourPrevue).toISOString()
//     };
    
//     console.log('Données envoyées à l\'API:', dataForAPI);
//     onSave(dataForAPI, isEditing ? empruntToEdit._id : null);
//   };

//   const selectedMateriel = stock.find(s => s._id === formData.materiel);

//   // Calcul CORRIGÉ de la quantité maximale
//   const getMaxQuantite = () => {
//     if (!selectedMateriel) return 1;
    
//     if (isEditing) {
//       // En mode édition : disponible actuel + ancienne quantité empruntée
//       const ancienneQuantite = empruntToEdit?.quantite || 0;
//       return selectedMateriel.disponible + ancienneQuantite;
//     } else {
//       // En mode création : simplement le disponible
//       return selectedMateriel.disponible;
//     }
//   };

//   const maxQuantite = getMaxQuantite();

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <h3 className="text-xl font-bold mb-4">
//           {isEditing ? 'Modifier l\'emprunt' : 'Nouvel emprunt'}
//         </h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Matériel</label>
//             <select
//               value={formData.materiel}
//               onChange={(e) => setFormData({...formData, materiel: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading || isEditing}
//             >
//               <option value="">Sélectionner un matériel</option>
//               {stock.filter(s => s.disponible > 0 || (isEditing && s._id === formData.materiel)).map(materiel => (
//                 <option key={materiel._id} value={materiel._id}>
//                   {materiel.nom} (disponible: {materiel.disponible})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Quantité</label>
//             <input
//               type="number"
//               min="1"
//               max={maxQuantite}
//               value={formData.quantite}
//               onChange={(e) => {
//                 const nouvelleQuantite = parseInt(e.target.value) || 1;
//                 setFormData({...formData, quantite: nouvelleQuantite});
//               }}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading}
//             />
//             {selectedMateriel && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Maximum disponible: {maxQuantite}
//                 {isEditing && (
//                   <span className="text-blue-600 ml-1">
//                     (disponible: {selectedMateriel.disponible} + ancienne quantité: {empruntToEdit?.quantite || 0})
//                   </span>
//                 )}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Emprunteur</label>
//             <input
//               type="text"
//               value={formData.emprunteur}
//               onChange={(e) => setFormData({...formData, emprunteur: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Nom du prof ou du service"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Date d'emprunt</label>
//             <input
//               type="date"
//               value={formData.dateEmprunt}
//               onChange={(e) => setFormData({...formData, dateEmprunt: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Date de retour prévue</label>
//             <input
//               type="date"
//               value={formData.dateRetourPrevue}
//               onChange={(e) => setFormData({...formData, dateRetourPrevue: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               min={formData.dateEmprunt}
//               required
//               disabled={loading}
//             />
//           </div>

//           <div className="flex gap-3 justify-end pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50"
//               disabled={loading}
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50"
//               disabled={loading}
//             >
//               {loading ? 'Enregistrement...' : isEditing ? 'Modifier' : 'Enregistrer'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EmpruntModal;


// NOUVELLE VERSION DEEPSEEK REDESIGNEE


import React, { useState } from 'react';
import { Calendar, Package, User, CheckCircle, X } from 'lucide-react';

const EmpruntModal = ({ stock, onSave, onClose, loading, empruntToEdit }) => {
  const isEditing = !!empruntToEdit;
  
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    materiel: empruntToEdit?.materiel?._id || '',
    quantite: empruntToEdit?.quantite || 1,
    emprunteur: empruntToEdit?.emprunteur || '',
    dateEmprunt: formatDateForInput(empruntToEdit?.dateEmprunt) || new Date().toISOString().split('T')[0],
    dateRetourPrevue: formatDateForInput(empruntToEdit?.dateRetourPrevue) || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataForAPI = {
      ...formData,
      dateEmprunt: new Date(formData.dateEmprunt).toISOString(),
      dateRetourPrevue: new Date(formData.dateRetourPrevue).toISOString()
    };
    
    onSave(dataForAPI, isEditing ? empruntToEdit._id : null);
  };

  const selectedMateriel = stock.find(s => s._id === formData.materiel);

  const getMaxQuantite = () => {
    if (!selectedMateriel) return 1;
    
    if (isEditing) {
      const ancienneQuantite = empruntToEdit?.quantite || 0;
      return selectedMateriel.disponible + ancienneQuantite;
    } else {
      return selectedMateriel.disponible;
    }
  };

  const maxQuantite = getMaxQuantite();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl border border-gray-200/80 shadow-2xl w-full max-w-md">
        {/* Header avec gradient */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">
                {isEditing ? 'Modifier l\'emprunt' : 'Nouvel emprunt'}
              </h3>
              <p className="text-green-100 text-sm mt-1">
                {isEditing ? 'Mettez à jour les détails de l\'emprunt' : 'Créez un nouvel emprunt de matériel'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 group"
            >
              <X size={20} className="text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Matériel */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Matériel
            </label>
            <div className="relative">
              <Package size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={formData.materiel}
                onChange={(e) => setFormData({...formData, materiel: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                required
                disabled={loading || isEditing}
              >
                <option value="">Sélectionner un matériel</option>
                {stock.filter(s => s.disponible > 0 || (isEditing && s._id === formData.materiel)).map(materiel => (
                  <option key={materiel._id} value={materiel._id}>
                    {materiel.nom} (disponible: {materiel.disponible})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantité */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Quantité
            </label>
            <input
              type="number"
              min="1"
              max={maxQuantite}
              value={formData.quantite}
              onChange={(e) => {
                const nouvelleQuantite = parseInt(e.target.value) || 1;
                setFormData({...formData, quantite: nouvelleQuantite});
              }}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
              required
              disabled={loading}
            />
            {selectedMateriel && (
              <div className="flex items-center gap-2 mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-xs text-blue-700">
                  <strong>Maximum disponible:</strong> {maxQuantite}
                  {isEditing && (
                    <span className="ml-1">
                      (disponible: {selectedMateriel.disponible} + ancienne quantité: {empruntToEdit?.quantite || 0})
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Emprunteur */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <User size={16} className="text-cyan-600" />
              Emprunteur
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.emprunteur}
                onChange={(e) => setFormData({...formData, emprunteur: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 shadow-sm hover:shadow-md"
                placeholder="Nom du professeur ou du service"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Calendar size={16} className="text-green-600" />
                Date d'emprunt
              </label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={formData.dateEmprunt}
                  onChange={(e) => setFormData({...formData, dateEmprunt: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Calendar size={16} className="text-orange-600" />
                Retour prévu
              </label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={formData.dateRetourPrevue}
                  onChange={(e) => setFormData({...formData, dateRetourPrevue: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md"
                  min={formData.dateEmprunt}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-semibold"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Enregistrement...
                </div>
              ) : (
                <>
                  <CheckCircle size={18} />
                  {isEditing ? 'Modifier' : 'Enregistrer'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpruntModal;