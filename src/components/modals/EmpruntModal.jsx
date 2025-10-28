// import React, { useState } from 'react';

// const EmpruntModal = ({ stock, onSave, onClose, loading }) => {
//   const [formData, setFormData] = useState({
//     materiel: '',
//     quantite: 1,
//     emprunteur: '',
//     dateRetourPrevue: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   const selectedMateriel = stock.find(s => s._id === formData.materiel);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <h3 className="text-xl font-bold mb-4">Nouvel emprunt</h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Matériel</label>
//             <select
//               value={formData.materiel}
//               onChange={(e) => setFormData({...formData, materiel: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//               disabled={loading}
//             >
//               <option value="">Sélectionner un matériel</option>
//               {stock.filter(s => s.disponible > 0).map(materiel => (
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
//               max={selectedMateriel?.disponible || 1}
//               value={formData.quantite}
//               onChange={(e) => setFormData({...formData, quantite: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//               disabled={loading}
//             />
//             {selectedMateriel && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Maximum disponible: {selectedMateriel.disponible}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Emprunteur</label>
//             <input
//               type="text"
//               value={formData.emprunteur}
//               onChange={(e) => setFormData({...formData, emprunteur: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg"
//               placeholder="Nom du prof ou du service"
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
//               className="w-full px-3 py-2 border rounded-lg"
//               min={new Date().toISOString().split('T')[0]}
//               required
//               disabled={loading}
//             />
//           </div>

//           <div className="flex gap-3 justify-end pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//               disabled={loading}
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50"
//               disabled={loading}
//             >
//               {loading ? 'Enregistrement...' : 'Enregistrer'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EmpruntModal;




// VERSION AVEC DEEPSEEK 1

// import React, { useState } from 'react';

// const EmpruntModal = ({ stock, onSave, onClose, loading, empruntToEdit }) => {
//   const isEditing = !!empruntToEdit;
  
//   const [formData, setFormData] = useState({
//     materiel: empruntToEdit?.materiel?._id || '',
//     quantite: empruntToEdit?.quantite || 1,
//     emprunteur: empruntToEdit?.emprunteur || '',
//     dateEmprunt: empruntToEdit?.dateEmprunt || new Date().toISOString().split('T')[0],
//     dateRetourPrevue: empruntToEdit?.dateRetourPrevue || ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData, isEditing ? empruntToEdit._id : null);
//   };

//   const selectedMateriel = stock.find(s => s._id === formData.materiel);

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
//               className="w-full px-3 py-2 border rounded-lg"
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
//               max={selectedMateriel?.disponible + (isEditing ? empruntToEdit.quantite : 0) || 1}
//               value={formData.quantite}
//               onChange={(e) => setFormData({...formData, quantite: parseInt(e.target.value)})}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//               disabled={loading}
//             />
//             {selectedMateriel && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Maximum disponible: {selectedMateriel.disponible + (isEditing ? empruntToEdit.quantite : 0)}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Emprunteur</label>
//             <input
//               type="text"
//               value={formData.emprunteur}
//               onChange={(e) => setFormData({...formData, emprunteur: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg"
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
//               className="w-full px-3 py-2 border rounded-lg"
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
//               className="w-full px-3 py-2 border rounded-lg"
//               min={formData.dateEmprunt}
//               required
//               disabled={loading}
//             />
//           </div>

//           <div className="flex gap-3 justify-end pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
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


// VERSION AVEC DEEPSEEK 2

// import React, { useState } from 'react';

// const EmpruntModal = ({ stock, onSave, onClose, loading, empruntToEdit }) => {
//   const isEditing = !!empruntToEdit;
  
//   const [formData, setFormData] = useState({
//     materiel: empruntToEdit?.materiel?._id || '',
//     quantite: empruntToEdit?.quantite || 1,
//     emprunteur: empruntToEdit?.emprunteur || '',
//     dateEmprunt: empruntToEdit?.dateEmprunt || new Date().toISOString().split('T')[0],
//     dateRetourPrevue: empruntToEdit?.dateRetourPrevue || ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Données envoyées pour modification:', formData); // Debug
//     onSave(formData, isEditing ? empruntToEdit._id : null);
//   };

//   const selectedMateriel = stock.find(s => s._id === formData.materiel);

//   // Calcul sécurisé de la quantité maximale
//   const getMaxQuantite = () => {
//     if (!selectedMateriel) return 1;
    
//     let maxQuantite = selectedMateriel.disponible;
    
//     // Si on modifie un emprunt existant et que c'est le même matériel
//     if (isEditing && empruntToEdit && selectedMateriel._id === empruntToEdit.materiel?._id) {
//       maxQuantite += empruntToEdit.quantite || 0;
//     }
    
//     return maxQuantite;
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
//               onChange={(e) => setFormData({...formData, quantite: parseInt(e.target.value) || 1})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading}
//             />
//             {selectedMateriel && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Maximum disponible: {maxQuantite}
//                 {isEditing && (
//                   <span className="text-blue-600 ml-1">
//                     (inclut la quantité actuellement empruntée)
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


// VERSION AVEC DEEPSEEK 3



import React, { useState } from 'react';

const EmpruntModal = ({ stock, onSave, onClose, loading, empruntToEdit }) => {
  const isEditing = !!empruntToEdit;
  
  // Fonction pour formater la date en yyyy-MM-dd
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format yyyy-MM-dd
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
    console.log('Données envoyées pour modification:', formData);
    
    // Convertir les dates en format ISO pour l'API
    const dataForAPI = {
      ...formData,
      dateEmprunt: new Date(formData.dateEmprunt).toISOString(),
      dateRetourPrevue: new Date(formData.dateRetourPrevue).toISOString()
    };
    
    console.log('Données envoyées à l\'API:', dataForAPI);
    onSave(dataForAPI, isEditing ? empruntToEdit._id : null);
  };

  const selectedMateriel = stock.find(s => s._id === formData.materiel);

  // Calcul CORRIGÉ de la quantité maximale
  const getMaxQuantite = () => {
    if (!selectedMateriel) return 1;
    
    if (isEditing) {
      // En mode édition : disponible actuel + ancienne quantité empruntée
      const ancienneQuantite = empruntToEdit?.quantite || 0;
      return selectedMateriel.disponible + ancienneQuantite;
    } else {
      // En mode création : simplement le disponible
      return selectedMateriel.disponible;
    }
  };

  const maxQuantite = getMaxQuantite();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {isEditing ? 'Modifier l\'emprunt' : 'Nouvel emprunt'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Matériel</label>
            <select
              value={formData.materiel}
              onChange={(e) => setFormData({...formData, materiel: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          <div>
            <label className="block text-sm font-medium mb-1">Quantité</label>
            <input
              type="number"
              min="1"
              max={maxQuantite}
              value={formData.quantite}
              onChange={(e) => {
                const nouvelleQuantite = parseInt(e.target.value) || 1;
                setFormData({...formData, quantite: nouvelleQuantite});
              }}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
            {selectedMateriel && (
              <p className="text-xs text-gray-500 mt-1">
                Maximum disponible: {maxQuantite}
                {isEditing && (
                  <span className="text-blue-600 ml-1">
                    (disponible: {selectedMateriel.disponible} + ancienne quantité: {empruntToEdit?.quantite || 0})
                  </span>
                )}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Emprunteur</label>
            <input
              type="text"
              value={formData.emprunteur}
              onChange={(e) => setFormData({...formData, emprunteur: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nom du prof ou du service"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date d'emprunt</label>
            <input
              type="date"
              value={formData.dateEmprunt}
              onChange={(e) => setFormData({...formData, dateEmprunt: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date de retour prévue</label>
            <input
              type="date"
              value={formData.dateRetourPrevue}
              onChange={(e) => setFormData({...formData, dateRetourPrevue: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min={formData.dateEmprunt}
              required
              disabled={loading}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : isEditing ? 'Modifier' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpruntModal;