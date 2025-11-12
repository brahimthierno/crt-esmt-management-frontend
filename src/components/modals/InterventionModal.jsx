// import React, { useState, useEffect } from 'react';

// const InterventionModal = ({ intervention, techniciens, onSave, onClose, loading }) => {
//   const [formData, setFormData] = useState({
//     titre: '',
//     type: 'reparation',
//     materiel: '',
//     lieu: '',
//     technicien: '',
//     statut: 'planifiee',
//     priorite: 'moyenne',
//     dateDebut: '',
//     heureDebut: '',
//     description: ''
//   });

//   useEffect(() => {
//     if (intervention) {
//       setFormData({
//         titre: intervention.titre,
//         type: intervention.type,
//         materiel: intervention.materiel,
//         lieu: intervention.lieu,
//         technicien: intervention.technicien?._id || '',
//         statut: intervention.statut,
//         priorite: intervention.priorite,
//         dateDebut: intervention.dateDebut?.split('T')[0] || '',
//         heureDebut: intervention.heureDebut,
//         description: intervention.description || ''
//       });
//     }
//   }, [intervention]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <h3 className="text-xl font-bold mb-4">
//           {intervention ? 'Modifier l\'intervention' : 'Nouvelle intervention'}
//         </h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Titre</label>
//             <input
//               type="text"
//               value={formData.titre}
//               onChange={(e) => setFormData({...formData, titre: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Type</label>
//               <select
//                 value={formData.type}
//                 onChange={(e) => setFormData({...formData, type: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 disabled={loading}
//               >
//                 <option value="reparation">Réparation</option>
//                 <option value="diagnostic">Diagnostic</option>
//                 <option value="verification">Vérification</option>
//                 <option value="maintenance">Maintenance</option>
//                 <option value="installation">Installation</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Priorité</label>
//               <select
//                 value={formData.priorite}
//                 onChange={(e) => setFormData({...formData, priorite: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 disabled={loading}
//               >
//                 <option value="basse">Basse</option>
//                 <option value="moyenne">Moyenne</option>
//                 <option value="haute">Haute</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Matériel</label>
//               <input
//                 type="text"
//                 value={formData.materiel}
//                 onChange={(e) => setFormData({...formData, materiel: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Lieu</label>
//               <input
//                 type="text"
//                 value={formData.lieu}
//                 onChange={(e) => setFormData({...formData, lieu: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Date</label>
//               <input
//                 type="date"
//                 value={formData.dateDebut}
//                 onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Heure</label>
//               <input
//                 type="time"
//                 value={formData.heureDebut}
//                 onChange={(e) => setFormData({...formData, heureDebut: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Technicien</label>
//             <select
//               value={formData.technicien}
//               onChange={(e) => setFormData({...formData, technicien: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg"
//               required
//               disabled={loading}
//             >
//               <option value="">Sélectionner un technicien</option>
//               {techniciens.map(tech => (
//                 <option key={tech._id} value={tech._id}>
//                   {tech.prenom} {tech.nom} ({tech.role})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Statut</label>
//             <select
//               value={formData.statut}
//               onChange={(e) => setFormData({...formData, statut: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg"
//               disabled={loading}
//             >
//               <option value="planifiee">Planifiée</option>
//               <option value="en_cours">En cours</option>
//               <option value="terminee">Terminée</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({...formData, description: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg"
//               rows="3"
//               disabled={loading}
//             />
//           </div>

//           <div className="flex gap-3 justify-end">
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
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
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

// export default InterventionModal;


// INTEGRATION DE UPLOADS DE FICHIERS

// import React, { useState, useEffect } from 'react';
// import { Upload, X, FileText, Image, Download, Trash2 } from 'lucide-react';
// import { uploadFiles, deleteFile } from '../../services/fileService';

// const InterventionModal = ({ intervention, techniciens, onSave, onClose, loading, currentUser }) => {
//   const [formData, setFormData] = useState({
//     titre: '',
//     type: 'reparation',
//     materiel: '',
//     lieu: '',
//     technicien: '',
//     statut: 'planifiee',
//     priorite: 'moyenne',
//     dateDebut: '',
//     heureDebut: '09:00',
//     description: ''
//   });

//   const [uploading, setUploading] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [fileInputKey, setFileInputKey] = useState(Date.now());

//   useEffect(() => {
//     if (intervention) {
//       setFormData({
//         titre: intervention.titre,
//         type: intervention.type,
//         materiel: intervention.materiel,
//         lieu: intervention.lieu,
//         technicien: intervention.technicien?._id || '',
//         statut: intervention.statut,
//         priorite: intervention.priorite,
//         dateDebut: intervention.dateDebut ? new Date(intervention.dateDebut).toISOString().split('T')[0] : '',
//         heureDebut: intervention.heureDebut || '09:00',
//         description: intervention.description || ''
//       });
//     }
//   }, [intervention]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onSave(formData, intervention?._id);
//   };

//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Vérifier la taille des fichiers
//     const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
//     if (oversizedFiles.length > 0) {
//       alert('Certains fichiers dépassent la taille maximale de 10MB');
//       return;
//     }

//     // Vérifier le nombre total de fichiers
//     if (selectedFiles.length + files.length > 5) {
//       alert('Maximum 5 fichiers autorisés par upload');
//       return;
//     }

//     setSelectedFiles(prev => [...prev, ...files]);
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFiles.length || !intervention?._id) return;

//     setUploading(true);
//     try {
//       await uploadFiles(intervention._id, selectedFiles);
//       setSelectedFiles([]);
//       setFileInputKey(Date.now()); // Reset file input
//       // Recharger les données de l'intervention
//       onSave(formData, intervention._id);
//     } catch (error) {
//       console.error('Erreur upload:', error);
//       alert(error.response?.data?.message || 'Erreur lors de l\'upload des fichiers');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleFileDelete = async (fileId) => {
//     if (!intervention?._id) return;

//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
//       try {
//         await deleteFile(intervention._id, fileId);
//         // Recharger les données
//         onSave(formData, intervention._id);
//       } catch (error) {
//         console.error('Erreur suppression:', error);
//         alert('Erreur lors de la suppression du fichier');
//       }
//     }
//   };

//   const removeSelectedFile = (index) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case 'image': 
//         return <Image size={18} className="text-blue-600" />;
//       case 'document': 
//         return <FileText size={18} className="text-green-600" />;
//       default: 
//         return <FileText size={18} className="text-gray-600" />;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getFileType = (filename) => {
//     const ext = filename.split('.').pop().toLowerCase();
//     if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
//     if (['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(ext)) return 'document';
//     return 'autre';
//   };

//   // Vérifier si l'utilisateur peut modifier les fichiers
//   const canModifyFiles = currentUser?.role === 'admin' || 
//     (intervention && intervention.technicien?._id === currentUser?.id);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <h3 className="text-xl font-bold mb-4">
//           {intervention ? 'Modifier l\'intervention' : 'Nouvelle intervention'}
//         </h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Titre</label>
//             <input
//               type="text"
//               value={formData.titre}
//               onChange={(e) => setFormData({...formData, titre: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Type</label>
//               <select
//                 value={formData.type}
//                 onChange={(e) => setFormData({...formData, type: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 disabled={loading}
//               >
//                 <option value="reparation">Réparation</option>
//                 <option value="diagnostic">Diagnostic</option>
//                 <option value="verification">Vérification</option>
//                 <option value="maintenance">Maintenance</option>
//                 <option value="installation">Installation</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Priorité</label>
//               <select
//                 value={formData.priorite}
//                 onChange={(e) => setFormData({...formData, priorite: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 disabled={loading}
//               >
//                 <option value="basse">Basse</option>
//                 <option value="moyenne">Moyenne</option>
//                 <option value="haute">Haute</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Matériel</label>
//               <input
//                 type="text"
//                 value={formData.materiel}
//                 onChange={(e) => setFormData({...formData, materiel: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Lieu</label>
//               <input
//                 type="text"
//                 value={formData.lieu}
//                 onChange={(e) => setFormData({...formData, lieu: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Date</label>
//               <input
//                 type="date"
//                 value={formData.dateDebut}
//                 onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Heure</label>
//               <input
//                 type="time"
//                 value={formData.heureDebut}
//                 onChange={(e) => setFormData({...formData, heureDebut: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Technicien</label>
//             <select
//               value={formData.technicien}
//               onChange={(e) => setFormData({...formData, technicien: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading || (currentUser?.role !== 'admin' && intervention)}
//             >
//               <option value="">Sélectionner un technicien</option>
//               {techniciens.map(tech => (
//                 <option key={tech._id} value={tech._id}>
//                   {tech.prenom} {tech.nom} ({tech.role})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Statut</label>
//             <select
//               value={formData.statut}
//               onChange={(e) => setFormData({...formData, statut: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               disabled={loading}
//             >
//               <option value="planifiee">Planifiée</option>
//               <option value="en_cours">En cours</option>
//               <option value="terminee">Terminée</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({...formData, description: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               rows="3"
//               disabled={loading}
//             />
//           </div>

//           {/* SECTION FICHIERS - Seulement en mode édition */}
//           {intervention && canModifyFiles && (
//             <div className="border-t pt-4 mt-4">
//               <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
//                 <FileText size={20} className="text-blue-600" />
//                 Fichiers attachés
//               </h4>

//               {/* Liste des fichiers existants */}
//               {intervention.fichiers && intervention.fichiers.length > 0 && (
//                 <div className="mb-4">
//                   <h5 className="font-medium mb-2 text-gray-700">Fichiers existants:</h5>
//                   <div className="space-y-2 max-h-40 overflow-y-auto">
//                     {intervention.fichiers.map((fichier) => (
//                       <div key={fichier._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
//                         <div className="flex items-center space-x-3 flex-1">
//                           {getFileIcon(fichier.type)}
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-900 truncate">
//                               {fichier.nom}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {formatFileSize(fichier.taille)} • 
//                               Uploadé par {fichier.uploadedBy?.prenom} {fichier.uploadedBy?.nom} • 
//                               {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <button
//                             type="button"
//                             onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                             title="Télécharger"
//                           >
//                             <Download size={16} />
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => handleFileDelete(fichier._id)}
//                             className="p-2 text-red-600 hover:bg-red-50 rounded transition"
//                             title="Supprimer"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Upload de nouveaux fichiers */}
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
//                 <input
//                   key={fileInputKey}
//                   type="file"
//                   multiple
//                   onChange={handleFileSelect}
//                   className="hidden"
//                   id="file-upload"
//                   accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer block">
//                   <div className="text-center">
//                     <Upload className="mx-auto mb-2 text-gray-400" size={32} />
//                     <p className="text-sm text-gray-600 font-medium">
//                       Cliquez pour sélectionner des fichiers
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Formats: images, PDF, Word, Excel • Max 10MB par fichier • Max 5 fichiers
//                     </p>
//                   </div>
//                 </label>

//                 {/* Liste des fichiers sélectionnés */}
//                 {selectedFiles.length > 0 && (
//                   <div className="mt-4">
//                     <h6 className="font-medium mb-2 text-gray-700">Fichiers sélectionnés:</h6>
//                     <div className="space-y-2 max-h-32 overflow-y-auto">
//                       {selectedFiles.map((file, index) => (
//                         <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded border">
//                           <div className="flex items-center space-x-2 flex-1">
//                             {getFileIcon(getFileType(file.name))}
//                             <span className="text-sm truncate flex-1">{file.name}</span>
//                             <span className="text-xs text-gray-500 whitespace-nowrap">
//                               {formatFileSize(file.size)}
//                             </span>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeSelectedFile(index)}
//                             className="p-1 text-red-600 hover:text-red-800"
//                             title="Retirer"
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                     <button
//                       type="button"
//                       onClick={handleFileUpload}
//                       disabled={uploading}
//                       className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {uploading ? (
//                         <>
//                           <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                           Upload en cours...
//                         </>
//                       ) : (
//                         <>
//                           <Upload size={16} />
//                           Uploader {selectedFiles.length} fichier(s)
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Message si pas autorisé à modifier les fichiers */}
//           {intervention && !canModifyFiles && intervention.fichiers && intervention.fichiers.length > 0 && (
//             <div className="border-t pt-4 mt-4">
//               <h4 className="text-lg font-semibold mb-3">Fichiers attachés</h4>
//               <div className="space-y-2">
//                 {intervention.fichiers.map((fichier) => (
//                   <div key={fichier._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
//                     <div className="flex items-center space-x-3">
//                       {getFileIcon(fichier.type)}
//                       <span className="text-sm">{fichier.nom}</span>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                       title="Télécharger"
//                     >
//                       <Download size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="flex gap-3 justify-end pt-4 border-t">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50"
//               disabled={loading || uploading}
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={loading || uploading}
//             >
//               {loading ? 'Enregistrement...' : intervention ? 'Modifier' : 'Créer'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InterventionModal;



// NOUVELLE VERSION DEEPSEEK AVEC AJOUTS DES SITES ESMT ET BATIMENTS


// import React, { useState, useEffect } from 'react';
// import { Upload, X, FileText, Image, Download, Trash2 } from 'lucide-react';
// import { uploadFiles, deleteFile } from '../../services/fileService';

// const InterventionModal = ({ intervention, techniciens, onSave, onClose, loading, currentUser, sitesByBuilding }) => {
//   const [formData, setFormData] = useState({
//     titre: '',
//     type: 'reparation',
//     materiel: '',
//     lieu: '',
//     technicien: '',
//     statut: 'planifiee',
//     priorite: 'moyenne',
//     dateDebut: '',
//     heureDebut: '09:00',
//     description: ''
//   });

//   const [uploading, setUploading] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [fileInputKey, setFileInputKey] = useState(Date.now());
//   const [selectedBatiment, setSelectedBatiment] = useState('');

//   useEffect(() => {
//     if (intervention) {
//       setFormData({
//         titre: intervention.titre,
//         type: intervention.type,
//         materiel: intervention.materiel,
//         lieu: intervention.lieu,
//         technicien: intervention.technicien?._id || '',
//         statut: intervention.statut,
//         priorite: intervention.priorite,
//         dateDebut: intervention.dateDebut ? new Date(intervention.dateDebut).toISOString().split('T')[0] : '',
//         heureDebut: intervention.heureDebut || '09:00',
//         description: intervention.description || ''
//       });
      
//       // Déterminer le bâtiment initial basé sur le lieu
//       if (intervention.lieu) {
//         const batiment = getBatimentFromLieu(intervention.lieu);
//         setSelectedBatiment(batiment);
//       }
//     }
//   }, [intervention]);

//   // Fonction pour obtenir le bâtiment d'un lieu
//   const getBatimentFromLieu = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return batiment;
//     }
//     return '';
//   };

//   // Fonction pour obtenir le label d'un lieu
//   const getLieuLabel = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return site.label;
//     }
//     return lieuValue;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onSave(formData, intervention?._id);
//   };

//   const handleBatimentChange = (e) => {
//     const batiment = e.target.value;
//     setSelectedBatiment(batiment);
//     // Réinitialiser le lieu quand le bâtiment change
//     setFormData({...formData, lieu: ''});
//   };

//   const handleLieuChange = (e) => {
//     setFormData({...formData, lieu: e.target.value});
//   };

//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Vérifier la taille des fichiers
//     const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
//     if (oversizedFiles.length > 0) {
//       alert('Certains fichiers dépassent la taille maximale de 10MB');
//       return;
//     }

//     // Vérifier le nombre total de fichiers
//     if (selectedFiles.length + files.length > 5) {
//       alert('Maximum 5 fichiers autorisés par upload');
//       return;
//     }

//     setSelectedFiles(prev => [...prev, ...files]);
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFiles.length || !intervention?._id) return;

//     setUploading(true);
//     try {
//       await uploadFiles(intervention._id, selectedFiles);
//       setSelectedFiles([]);
//       setFileInputKey(Date.now()); // Reset file input
//       // Recharger les données de l'intervention
//       onSave(formData, intervention._id);
//     } catch (error) {
//       console.error('Erreur upload:', error);
//       alert(error.response?.data?.message || 'Erreur lors de l\'upload des fichiers');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleFileDelete = async (fileId) => {
//     if (!intervention?._id) return;

//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
//       try {
//         await deleteFile(intervention._id, fileId);
//         // Recharger les données
//         onSave(formData, intervention._id);
//       } catch (error) {
//         console.error('Erreur suppression:', error);
//         alert('Erreur lors de la suppression du fichier');
//       }
//     }
//   };

//   const removeSelectedFile = (index) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case 'image': 
//         return <Image size={18} className="text-blue-600" />;
//       case 'document': 
//         return <FileText size={18} className="text-green-600" />;
//       default: 
//         return <FileText size={18} className="text-gray-600" />;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getFileType = (filename) => {
//     const ext = filename.split('.').pop().toLowerCase();
//     if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
//     if (['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(ext)) return 'document';
//     return 'autre';
//   };

//   // Vérifier si l'utilisateur peut modifier les fichiers
//   const canModifyFiles = currentUser?.role === 'admin' || 
//     (intervention && intervention.technicien?._id === currentUser?.id);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <h3 className="text-xl font-bold mb-4">
//           {intervention ? 'Modifier l\'intervention' : 'Nouvelle intervention'}
//         </h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Titre</label>
//             <input
//               type="text"
//               value={formData.titre}
//               onChange={(e) => setFormData({...formData, titre: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Type</label>
//               <select
//                 value={formData.type}
//                 onChange={(e) => setFormData({...formData, type: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 disabled={loading}
//               >
//                 <option value="reparation">Réparation</option>
//                 <option value="diagnostic">Diagnostic</option>
//                 <option value="verification">Vérification</option>
//                 <option value="maintenance">Maintenance</option>
//                 <option value="installation">Installation</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Priorité</label>
//               <select
//                 value={formData.priorite}
//                 onChange={(e) => setFormData({...formData, priorite: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 disabled={loading}
//               >
//                 <option value="basse">Basse</option>
//                 <option value="moyenne">Moyenne</option>
//                 <option value="haute">Haute</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Matériel</label>
//             <input
//               type="text"
//               value={formData.materiel}
//               onChange={(e) => setFormData({...formData, materiel: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading}
//             />
//           </div>

//           {/* ✅ NOUVEAU : Sélection du bâtiment et lieu */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Bâtiment</label>
//               <select
//                 value={selectedBatiment}
//                 onChange={handleBatimentChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               >
//                 <option value="">Sélectionner un bâtiment</option>
//                 {Object.keys(sitesByBuilding).map(batiment => (
//                   <option key={batiment} value={batiment}>
//                     {batiment}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Lieu</label>
//               <select
//                 value={formData.lieu}
//                 onChange={handleLieuChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading || !selectedBatiment}
//               >
//                 <option value="">Sélectionner un lieu</option>
//                 {selectedBatiment && sitesByBuilding[selectedBatiment]?.map(site => (
//                   <option key={site.value} value={site.value}>
//                     {site.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Date</label>
//               <input
//                 type="date"
//                 value={formData.dateDebut}
//                 onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Heure</label>
//               <input
//                 type="time"
//                 value={formData.heureDebut}
//                 onChange={(e) => setFormData({...formData, heureDebut: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Technicien</label>
//             <select
//               value={formData.technicien}
//               onChange={(e) => setFormData({...formData, technicien: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading || (currentUser?.role !== 'admin' && intervention)}
//             >
//               <option value="">Sélectionner un technicien</option>
//               {techniciens.map(tech => (
//                 <option key={tech._id} value={tech._id}>
//                   {tech.prenom} {tech.nom} ({tech.role})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Statut</label>
//             <select
//               value={formData.statut}
//               onChange={(e) => setFormData({...formData, statut: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               disabled={loading}
//             >
//               <option value="planifiee">Planifiée</option>
//               <option value="en_cours">En cours</option>
//               <option value="terminee">Terminée</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({...formData, description: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               rows="3"
//               disabled={loading}
//             />
//           </div>

//           {/* SECTION FICHIERS - Seulement en mode édition */}
//           {intervention && canModifyFiles && (
//             <div className="border-t pt-4 mt-4">
//               <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
//                 <FileText size={20} className="text-blue-600" />
//                 Fichiers attachés
//               </h4>

//               {/* Liste des fichiers existants */}
//               {intervention.fichiers && intervention.fichiers.length > 0 && (
//                 <div className="mb-4">
//                   <h5 className="font-medium mb-2 text-gray-700">Fichiers existants:</h5>
//                   <div className="space-y-2 max-h-40 overflow-y-auto">
//                     {intervention.fichiers.map((fichier) => (
//                       <div key={fichier._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
//                         <div className="flex items-center space-x-3 flex-1">
//                           {getFileIcon(fichier.type)}
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-900 truncate">
//                               {fichier.nom}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {formatFileSize(fichier.taille)} • 
//                               Uploadé par {fichier.uploadedBy?.prenom} {fichier.uploadedBy?.nom} • 
//                               {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <button
//                             type="button"
//                             onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                             title="Télécharger"
//                           >
//                             <Download size={16} />
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => handleFileDelete(fichier._id)}
//                             className="p-2 text-red-600 hover:bg-red-50 rounded transition"
//                             title="Supprimer"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Upload de nouveaux fichiers */}
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
//                 <input
//                   key={fileInputKey}
//                   type="file"
//                   multiple
//                   onChange={handleFileSelect}
//                   className="hidden"
//                   id="file-upload"
//                   accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer block">
//                   <div className="text-center">
//                     <Upload className="mx-auto mb-2 text-gray-400" size={32} />
//                     <p className="text-sm text-gray-600 font-medium">
//                       Cliquez pour sélectionner des fichiers
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Formats: images, PDF, Word, Excel • Max 10MB par fichier • Max 5 fichiers
//                     </p>
//                   </div>
//                 </label>

//                 {/* Liste des fichiers sélectionnés */}
//                 {selectedFiles.length > 0 && (
//                   <div className="mt-4">
//                     <h6 className="font-medium mb-2 text-gray-700">Fichiers sélectionnés:</h6>
//                     <div className="space-y-2 max-h-32 overflow-y-auto">
//                       {selectedFiles.map((file, index) => (
//                         <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded border">
//                           <div className="flex items-center space-x-2 flex-1">
//                             {getFileIcon(getFileType(file.name))}
//                             <span className="text-sm truncate flex-1">{file.name}</span>
//                             <span className="text-xs text-gray-500 whitespace-nowrap">
//                               {formatFileSize(file.size)}
//                             </span>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeSelectedFile(index)}
//                             className="p-1 text-red-600 hover:text-red-800"
//                             title="Retirer"
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                     <button
//                       type="button"
//                       onClick={handleFileUpload}
//                       disabled={uploading}
//                       className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {uploading ? (
//                         <>
//                           <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                           Upload en cours...
//                         </>
//                       ) : (
//                         <>
//                           <Upload size={16} />
//                           Uploader {selectedFiles.length} fichier(s)
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Message si pas autorisé à modifier les fichiers */}
//           {intervention && !canModifyFiles && intervention.fichiers && intervention.fichiers.length > 0 && (
//             <div className="border-t pt-4 mt-4">
//               <h4 className="text-lg font-semibold mb-3">Fichiers attachés</h4>
//               <div className="space-y-2">
//                 {intervention.fichiers.map((fichier) => (
//                   <div key={fichier._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
//                     <div className="flex items-center space-x-3">
//                       {getFileIcon(fichier.type)}
//                       <span className="text-sm">{fichier.nom}</span>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                       title="Télécharger"
//                     >
//                       <Download size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="flex gap-3 justify-end pt-4 border-t">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50"
//               disabled={loading || uploading}
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={loading || uploading}
//             >
//               {loading ? 'Enregistrement...' : intervention ? 'Modifier' : 'Créer'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InterventionModal;



// NOUVELLE VERSION CLAUDE POUR L'AJOUT DES BATIMENTS



// import React, { useState, useEffect } from 'react';
// import { Upload, X, FileText, Image, Download, Trash2, MapPin } from 'lucide-react';
// import { uploadFiles, deleteFile } from '../../services/fileService';

// const InterventionModal = ({ intervention, techniciens, onSave, onClose, loading, currentUser, sitesByBuilding }) => {
//   const [formData, setFormData] = useState({
//     titre: '',
//     type: 'reparation',
//     materiel: '',
//     lieu: '',
//     technicien: '',
//     statut: 'planifiee',
//     priorite: 'moyenne',
//     dateDebut: '',
//     heureDebut: '09:00',
//     description: ''
//   });

//   const [uploading, setUploading] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [fileInputKey, setFileInputKey] = useState(Date.now());

//   useEffect(() => {
//     if (intervention) {
//       setFormData({
//         titre: intervention.titre,
//         type: intervention.type,
//         materiel: intervention.materiel,
//         lieu: intervention.lieu,
//         technicien: intervention.technicien?._id || '',
//         statut: intervention.statut,
//         priorite: intervention.priorite,
//         dateDebut: intervention.dateDebut ? new Date(intervention.dateDebut).toISOString().split('T')[0] : '',
//         heureDebut: intervention.heureDebut || '09:00',
//         description: intervention.description || ''
//       });
//     }
//   }, [intervention]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onSave(formData, intervention?._id);
//   };

//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
    
//     const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
//     if (oversizedFiles.length > 0) {
//       alert('Certains fichiers dépassent la taille maximale de 10MB');
//       return;
//     }

//     if (selectedFiles.length + files.length > 5) {
//       alert('Maximum 5 fichiers autorisés par upload');
//       return;
//     }

//     setSelectedFiles(prev => [...prev, ...files]);
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFiles.length || !intervention?._id) return;

//     setUploading(true);
//     try {
//       await uploadFiles(intervention._id, selectedFiles);
//       setSelectedFiles([]);
//       setFileInputKey(Date.now());
//       onSave(formData, intervention._id);
//     } catch (error) {
//       console.error('Erreur upload:', error);
//       alert(error.response?.data?.message || 'Erreur lors de l\'upload des fichiers');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleFileDelete = async (fileId) => {
//     if (!intervention?._id) return;

//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
//       try {
//         await deleteFile(intervention._id, fileId);
//         onSave(formData, intervention._id);
//       } catch (error) {
//         console.error('Erreur suppression:', error);
//         alert('Erreur lors de la suppression du fichier');
//       }
//     }
//   };

//   const removeSelectedFile = (index) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case 'image': 
//         return <Image size={18} className="text-blue-600" />;
//       case 'document': 
//         return <FileText size={18} className="text-green-600" />;
//       default: 
//         return <FileText size={18} className="text-gray-600" />;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getFileType = (filename) => {
//     const ext = filename.split('.').pop().toLowerCase();
//     if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
//     if (['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(ext)) return 'document';
//     return 'autre';
//   };

//   const canModifyFiles = currentUser?.role === 'admin' || 
//     (intervention && intervention.technicien?._id === currentUser?.id);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <h3 className="text-xl font-bold mb-4">
//           {intervention ? 'Modifier l\'intervention' : 'Nouvelle intervention'}
//         </h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Titre</label>
//             <input
//               type="text"
//               value={formData.titre}
//               onChange={(e) => setFormData({...formData, titre: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Type</label>
//               <select
//                 value={formData.type}
//                 onChange={(e) => setFormData({...formData, type: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 disabled={loading}
//               >
//                 <option value="reparation">Réparation</option>
//                 <option value="diagnostic">Diagnostic</option>
//                 <option value="verification">Vérification</option>
//                 <option value="maintenance">Maintenance</option>
//                 <option value="installation">Installation</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Priorité</label>
//               <select
//                 value={formData.priorite}
//                 onChange={(e) => setFormData({...formData, priorite: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 disabled={loading}
//               >
//                 <option value="basse">Basse</option>
//                 <option value="moyenne">Moyenne</option>
//                 <option value="haute">Haute</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Matériel</label>
//               <input
//                 type="text"
//                 value={formData.materiel}
//                 onChange={(e) => setFormData({...formData, materiel: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             {/* ✅ MODIFIÉ : Liste déroulante pour le lieu */}
//             <div>
//               <label className="block text-sm font-medium mb-1 flex items-center gap-2">
//                 <MapPin className="w-4 h-4" />
//                 Lieu
//               </label>
//               <select
//                 value={formData.lieu}
//                 onChange={(e) => setFormData({...formData, lieu: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               >
//                 <option value="">Sélectionnez un lieu</option>
//                 {sitesByBuilding && Object.entries(sitesByBuilding).map(([batiment, sites]) => (
//                   <optgroup key={batiment} label={batiment}>
//                     {sites.map((site) => (
//                       <option key={site.value} value={site.value}>
//                         {site.label}
//                       </option>
//                     ))}
//                   </optgroup>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Date</label>
//               <input
//                 type="date"
//                 value={formData.dateDebut}
//                 onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Heure</label>
//               <input
//                 type="time"
//                 value={formData.heureDebut}
//                 onChange={(e) => setFormData({...formData, heureDebut: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Technicien</label>
//             <select
//               value={formData.technicien}
//               onChange={(e) => setFormData({...formData, technicien: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading || (currentUser?.role !== 'admin' && intervention)}
//             >
//               <option value="">Sélectionner un technicien</option>
//               {techniciens.map(tech => (
//                 <option key={tech._id} value={tech._id}>
//                   {tech.prenom} {tech.nom} ({tech.role})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Statut</label>
//             <select
//               value={formData.statut}
//               onChange={(e) => setFormData({...formData, statut: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               disabled={loading}
//             >
//               <option value="planifiee">Planifiée</option>
//               <option value="en_cours">En cours</option>
//               <option value="terminee">Terminée</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({...formData, description: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               rows="3"
//               disabled={loading}
//             />
//           </div>

//           {/* SECTION FICHIERS - Seulement en mode édition */}
//           {intervention && canModifyFiles && (
//             <div className="border-t pt-4 mt-4">
//               <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
//                 <FileText size={20} className="text-blue-600" />
//                 Fichiers attachés
//               </h4>

//               {/* Liste des fichiers existants */}
//               {intervention.fichiers && intervention.fichiers.length > 0 && (
//                 <div className="mb-4">
//                   <h5 className="font-medium mb-2 text-gray-700">Fichiers existants:</h5>
//                   <div className="space-y-2 max-h-40 overflow-y-auto">
//                     {intervention.fichiers.map((fichier) => (
//                       <div key={fichier._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
//                         <div className="flex items-center space-x-3 flex-1">
//                           {getFileIcon(fichier.type)}
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-900 truncate">
//                               {fichier.nom}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {formatFileSize(fichier.taille)} • 
//                               Uploadé par {fichier.uploadedBy?.prenom} {fichier.uploadedBy?.nom} • 
//                               {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <button
//                             type="button"
//                             onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                             title="Télécharger"
//                           >
//                             <Download size={16} />
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => handleFileDelete(fichier._id)}
//                             className="p-2 text-red-600 hover:bg-red-50 rounded transition"
//                             title="Supprimer"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Upload de nouveaux fichiers */}
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
//                 <input
//                   key={fileInputKey}
//                   type="file"
//                   multiple
//                   onChange={handleFileSelect}
//                   className="hidden"
//                   id="file-upload"
//                   accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer block">
//                   <div className="text-center">
//                     <Upload className="mx-auto mb-2 text-gray-400" size={32} />
//                     <p className="text-sm text-gray-600 font-medium">
//                       Cliquez pour sélectionner des fichiers
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Formats: images, PDF, Word, Excel • Max 10MB par fichier • Max 5 fichiers
//                     </p>
//                   </div>
//                 </label>

//                 {/* Liste des fichiers sélectionnés */}
//                 {selectedFiles.length > 0 && (
//                   <div className="mt-4">
//                     <h6 className="font-medium mb-2 text-gray-700">Fichiers sélectionnés:</h6>
//                     <div className="space-y-2 max-h-32 overflow-y-auto">
//                       {selectedFiles.map((file, index) => (
//                         <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded border">
//                           <div className="flex items-center space-x-2 flex-1">
//                             {getFileIcon(getFileType(file.name))}
//                             <span className="text-sm truncate flex-1">{file.name}</span>
//                             <span className="text-xs text-gray-500 whitespace-nowrap">
//                               {formatFileSize(file.size)}
//                             </span>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeSelectedFile(index)}
//                             className="p-1 text-red-600 hover:text-red-800"
//                             title="Retirer"
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                     <button
//                       type="button"
//                       onClick={handleFileUpload}
//                       disabled={uploading}
//                       className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {uploading ? (
//                         <>
//                           <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                           Upload en cours...
//                         </>
//                       ) : (
//                         <>
//                           <Upload size={16} />
//                           Uploader {selectedFiles.length} fichier(s)
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Message si pas autorisé à modifier les fichiers */}
//           {intervention && !canModifyFiles && intervention.fichiers && intervention.fichiers.length > 0 && (
//             <div className="border-t pt-4 mt-4">
//               <h4 className="text-lg font-semibold mb-3">Fichiers attachés</h4>
//               <div className="space-y-2">
//                 {intervention.fichiers.map((fichier) => (
//                   <div key={fichier._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
//                     <div className="flex items-center space-x-3">
//                       {getFileIcon(fichier.type)}
//                       <span className="text-sm">{fichier.nom}</span>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
//                       title="Télécharger"
//                     >
//                       <Download size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="flex gap-3 justify-end pt-4 border-t">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50"
//               disabled={loading || uploading}
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={loading || uploading}
//             >
//               {loading ? 'Enregistrement...' : intervention ? 'Modifier' : 'Créer'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InterventionModal;



// NOUVELLE VERSION DEEPSEEK POUR L'AJOUT DES BATIMENTS AVEC AMELIORATIONS DU DESIGN



// import React, { useState, useEffect } from 'react';
// import { Upload, X, FileText, Image, Download, Trash2, Building, MapPin, Calendar, Clock, User, AlertCircle, CheckCircle2 } from 'lucide-react';
// import { uploadFiles, deleteFile } from '../../services/fileService';

// const InterventionModal = ({ intervention, techniciens, onSave, onClose, loading, currentUser, sitesByBuilding }) => {
//   const [formData, setFormData] = useState({
//     titre: '',
//     type: 'reparation',
//     materiel: '',
//     lieu: '',
//     technicien: '',
//     statut: 'planifiee',
//     priorite: 'moyenne',
//     dateDebut: '',
//     heureDebut: '09:00',
//     description: ''
//   });

//   const [uploading, setUploading] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [fileInputKey, setFileInputKey] = useState(Date.now());
//   const [selectedBatiment, setSelectedBatiment] = useState('');

//   useEffect(() => {
//     if (intervention) {
//       setFormData({
//         titre: intervention.titre,
//         type: intervention.type,
//         materiel: intervention.materiel,
//         lieu: intervention.lieu,
//         technicien: intervention.technicien?._id || '',
//         statut: intervention.statut,
//         priorite: intervention.priorite,
//         dateDebut: intervention.dateDebut ? new Date(intervention.dateDebut).toISOString().split('T')[0] : '',
//         heureDebut: intervention.heureDebut || '09:00',
//         description: intervention.description || ''
//       });
      
//       if (intervention.lieu) {
//         const batiment = getBatimentFromLieu(intervention.lieu);
//         setSelectedBatiment(batiment);
//       }
//     }
//   }, [intervention]);

//   const getBatimentFromLieu = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return batiment;
//     }
//     return '';
//   };

//   const getLieuLabel = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return site.label;
//     }
//     return lieuValue;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onSave(formData, intervention?._id);
//   };

//   const handleBatimentChange = (e) => {
//     const batiment = e.target.value;
//     setSelectedBatiment(batiment);
//     setFormData({...formData, lieu: ''});
//   };

//   const handleLieuChange = (e) => {
//     setFormData({...formData, lieu: e.target.value});
//   };

//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
    
//     const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
//     if (oversizedFiles.length > 0) {
//       alert('Certains fichiers dépassent la taille maximale de 10MB');
//       return;
//     }

//     if (selectedFiles.length + files.length > 5) {
//       alert('Maximum 5 fichiers autorisés par upload');
//       return;
//     }

//     setSelectedFiles(prev => [...prev, ...files]);
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFiles.length || !intervention?._id) return;

//     setUploading(true);
//     try {
//       await uploadFiles(intervention._id, selectedFiles);
//       setSelectedFiles([]);
//       setFileInputKey(Date.now());
//       onSave(formData, intervention._id);
//     } catch (error) {
//       console.error('Erreur upload:', error);
//       alert(error.response?.data?.message || 'Erreur lors de l\'upload des fichiers');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleFileDelete = async (fileId) => {
//     if (!intervention?._id) return;

//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
//       try {
//         await deleteFile(intervention._id, fileId);
//         onSave(formData, intervention._id);
//       } catch (error) {
//         console.error('Erreur suppression:', error);
//         alert('Erreur lors de la suppression du fichier');
//       }
//     }
//   };

//   const removeSelectedFile = (index) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case 'image': 
//         return <Image size={18} className="text-blue-500" />;
//       case 'document': 
//         return <FileText size={18} className="text-emerald-500" />;
//       default: 
//         return <FileText size={18} className="text-gray-500" />;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getFileType = (filename) => {
//     const ext = filename.split('.').pop().toLowerCase();
//     if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
//     if (['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(ext)) return 'document';
//     return 'autre';
//   };

//   const canModifyFiles = currentUser?.role === 'admin' || 
//     (intervention && intervention.technicien?._id === currentUser?.id);

//   const getPriorityColor = (priorite) => {
//     switch (priorite) {
//       case 'haute': return 'border-red-200 bg-red-50 text-red-700';
//       case 'moyenne': return 'border-yellow-200 bg-yellow-50 text-yellow-700';
//       case 'basse': return 'border-green-200 bg-green-50 text-green-700';
//       default: return 'border-gray-200 bg-gray-50 text-gray-700';
//     }
//   };

//   const getStatusIcon = (statut) => {
//     switch (statut) {
//       case 'terminee': return <CheckCircle2 size={16} className="text-green-600" />;
//       case 'en_cours': return <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />;
//       case 'planifiee': return <Calendar size={16} className="text-blue-600" />;
//       default: return <AlertCircle size={16} className="text-gray-600" />;
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl border border-gray-200/80 shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
//         {/* Header avec gradient */}
//         <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h3 className="text-2xl font-bold text-white">
//                 {intervention ? 'Modifier l\'intervention' : 'Nouvelle intervention'}
//               </h3>
//               <p className="text-blue-100 mt-1">
//                 {intervention ? 'Mettez à jour les détails de l\'intervention' : 'Créez une nouvelle intervention'}
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 group"
//             >
//               <X size={24} className="text-white group-hover:scale-110 transition-transform" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 max-h-[calc(95vh-120px)] overflow-y-auto">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Section Informations principales */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Colonne gauche */}
//               <div className="space-y-6">
//                 {/* Titre */}
//                 <div className="group">
//                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     Titre de l'intervention
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.titre}
//                     onChange={(e) => setFormData({...formData, titre: e.target.value})}
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                     required
//                     disabled={loading}
//                     placeholder="Ex: Réparation imprimante secteur administratif"
//                   />
//                 </div>

//                 {/* Type et Priorité */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="group">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                       <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                       Type
//                     </label>
//                     <select
//                       value={formData.type}
//                       onChange={(e) => setFormData({...formData, type: e.target.value})}
//                       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                       disabled={loading}
//                     >
//                       <option value="reparation">Réparation</option>
//                       <option value="diagnostic">Diagnostic</option>
//                       <option value="verification">Vérification</option>
//                       <option value="maintenance">Maintenance</option>
//                       <option value="installation">Installation</option>
//                     </select>
//                   </div>

//                   <div className="group">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                       <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                       Priorité
//                     </label>
//                     <select
//                       value={formData.priorite}
//                       onChange={(e) => setFormData({...formData, priorite: e.target.value})}
//                       className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 transition-all duration-200 shadow-sm hover:shadow-md ${getPriorityColor(formData.priorite)}`}
//                       disabled={loading}
//                     >
//                       <option value="basse">Basse</option>
//                       <option value="moyenne">Moyenne</option>
//                       <option value="haute">Haute</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Matériel */}
//                 <div className="group">
//                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                     <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                     Équipement concerné
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.materiel}
//                     onChange={(e) => setFormData({...formData, materiel: e.target.value})}
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                     required
//                     disabled={loading}
//                     placeholder="Ex: Imprimante HP LaserJet Pro"
//                   />
//                 </div>
//               </div>

//               {/* Colonne droite */}
//               <div className="space-y-6">
//                 {/* Bâtiment et Lieu */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="group">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                       <Building size={16} className="text-indigo-600" />
//                       Bâtiment
//                     </label>
//                     <select
//                       value={selectedBatiment}
//                       onChange={handleBatimentChange}
//                       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                       required
//                       disabled={loading}
//                     >
//                       <option value="">Choisir un bâtiment</option>
//                       {Object.keys(sitesByBuilding).map(batiment => (
//                         <option key={batiment} value={batiment}>
//                           {batiment}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="group">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                       <MapPin size={16} className="text-emerald-600" />
//                       Localisation
//                     </label>
//                     <select
//                       value={formData.lieu}
//                       onChange={handleLieuChange}
//                       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                       required
//                       disabled={loading || !selectedBatiment}
//                     >
//                       <option value="">Sélectionner un lieu</option>
//                       {selectedBatiment && sitesByBuilding[selectedBatiment]?.map(site => (
//                         <option key={site.value} value={site.value}>
//                           {site.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Date et Heure */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="group">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                       <Calendar size={16} className="text-blue-600" />
//                       Date
//                     </label>
//                     <input
//                       type="date"
//                       value={formData.dateDebut}
//                       onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
//                       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                       required
//                       disabled={loading}
//                     />
//                   </div>

//                   <div className="group">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                       <Clock size={16} className="text-purple-600" />
//                       Heure
//                     </label>
//                     <input
//                       type="time"
//                       value={formData.heureDebut}
//                       onChange={(e) => setFormData({...formData, heureDebut: e.target.value})}
//                       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                       required
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 {/* Technicien */}
//                 <div className="group">
//                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                     <User size={16} className="text-cyan-600" />
//                     Technicien assigné
//                   </label>
//                   <select
//                     value={formData.technicien}
//                     onChange={(e) => setFormData({...formData, technicien: e.target.value})}
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                     required
//                     disabled={loading || (currentUser?.role !== 'admin' && intervention)}
//                   >
//                     <option value="">Assigner un technicien</option>
//                     {techniciens.map(tech => (
//                       <option key={tech._id} value={tech._id}>
//                         {tech.prenom} {tech.nom} ({tech.role})
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Statut */}
//                 <div className="group">
//                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                     {getStatusIcon(formData.statut)}
//                     Statut
//                   </label>
//                   <select
//                     value={formData.statut}
//                     onChange={(e) => setFormData({...formData, statut: e.target.value})}
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                     disabled={loading}
//                   >
//                     <option value="planifiee">Planifiée</option>
//                     <option value="en_cours">En cours</option>
//                     <option value="terminee">Terminée</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="group">
//               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                 <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
//                 Description détaillée
//               </label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({...formData, description: e.target.value})}
//                 className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
//                 rows="4"
//                 disabled={loading}
//                 placeholder="Décrivez en détail l'intervention à réaliser, les problèmes rencontrés, les actions à mener..."
//               />
//             </div>

//             {/* SECTION FICHIERS */}
//             {intervention && canModifyFiles && (
//               <div className="border-t border-gray-200 pt-6 mt-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <FileText size={20} className="text-blue-600" />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-gray-800">Fichiers attachés</h4>
//                     <p className="text-sm text-gray-600">Documents, photos et supports</p>
//                   </div>
//                 </div>

//                 {/* Fichiers existants */}
//                 {intervention.fichiers && intervention.fichiers.length > 0 && (
//                   <div className="mb-6">
//                     <h5 className="font-medium mb-3 text-gray-700 text-sm uppercase tracking-wide">Fichiers existants</h5>
//                     <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
//                       {intervention.fichiers.map((fichier) => (
//                         <div key={fichier._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
//                           <div className="flex items-center space-x-4 flex-1">
//                             <div className="p-2 bg-gray-100 rounded-lg">
//                               {getFileIcon(fichier.type)}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-gray-900 truncate">
//                                 {fichier.nom}
//                               </p>
//                               <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
//                                 <span>{formatFileSize(fichier.taille)}</span>
//                                 <span>•</span>
//                                 <span className="capitalize">{fichier.type}</span>
//                                 <span>•</span>
//                                 <span>Uploadé le {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}</span>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <button
//                               type="button"
//                               onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
//                               title="Télécharger"
//                             >
//                               <Download size={18} />
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => handleFileDelete(fichier._id)}
//                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
//                               title="Supprimer"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Upload de nouveaux fichiers */}
//                 <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/50">
//                   <input
//                     key={fileInputKey}
//                     type="file"
//                     multiple
//                     onChange={handleFileSelect}
//                     className="hidden"
//                     id="file-upload"
//                     accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
//                   />
//                   <label htmlFor="file-upload" className="cursor-pointer block">
//                     <div className="text-center">
//                       <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
//                         <Upload size={28} className="text-blue-600" />
//                       </div>
//                       <p className="text-lg font-semibold text-gray-800 mb-2">
//                         Ajouter des fichiers
//                       </p>
//                       <p className="text-sm text-gray-600 max-w-md mx-auto">
//                         Glissez-déposez vos fichiers ou <span className="text-blue-600 font-semibold">parcourez</span> votre appareil
//                       </p>
//                       <p className="text-xs text-gray-500 mt-2">
//                         Formats supportés: JPG, PNG, PDF, DOC, XLS • Max 10MB par fichier
//                       </p>
//                     </div>
//                   </label>

//                   {/* Liste des fichiers sélectionnés */}
//                   {selectedFiles.length > 0 && (
//                     <div className="mt-6">
//                       <h6 className="font-semibold mb-3 text-gray-700">Fichiers sélectionnés ({selectedFiles.length})</h6>
//                       <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
//                         {selectedFiles.map((file, index) => (
//                           <div key={index} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-xl">
//                             <div className="flex items-center space-x-3 flex-1">
//                               <div className="p-2 bg-white rounded-lg border">
//                                 {getFileIcon(getFileType(file.name))}
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <p className="text-sm font-medium text-gray-900 truncate">
//                                   {file.name}
//                                 </p>
//                                 <p className="text-xs text-gray-500">
//                                   {formatFileSize(file.size)}
//                                 </p>
//                               </div>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => removeSelectedFile(index)}
//                               className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
//                               title="Retirer"
//                             >
//                               <X size={16} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                       <button
//                         type="button"
//                         onClick={handleFileUpload}
//                         disabled={uploading}
//                         className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-semibold"
//                       >
//                         {uploading ? (
//                           <>
//                             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                             Upload en cours...
//                           </>
//                         ) : (
//                           <>
//                             <Upload size={18} />
//                             Uploader {selectedFiles.length} fichier(s)
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Boutons d'action */}
//             <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-semibold"
//                 disabled={loading || uploading}
//               >
//                 Annuler
//               </button>
//               <button
//                 type="submit"
//                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//                 disabled={loading || uploading}
//               >
//                 {loading ? (
//                   <div className="flex items-center gap-2">
//                     <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                     Enregistrement...
//                   </div>
//                 ) : intervention ? (
//                   'Mettre à jour'
//                 ) : (
//                   'Créer l\'intervention'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterventionModal;



// NOUVELLE VERSION CLAUDE AVEC INTEGRATION DES FONCTIONNALITES DE DATES EFFECTIVES ET DUREE



// import React, { useState, useEffect } from 'react';
// import { Upload, X, FileText, Image, Download, Trash2, Building, MapPin, Calendar, Clock, User, AlertCircle, CheckCircle2 } from 'lucide-react';
// import { uploadFiles, deleteFile } from '../../services/fileService';

// // Fonction helper pour formater la durée
// const formatDuree = (dateDebut, dateFin) => {
//   if (!dateDebut || !dateFin) return null;
  
//   const dureeMs = new Date(dateFin) - new Date(dateDebut);
//   const heures = Math.floor(dureeMs / (1000 * 60 * 60));
//   const minutes = Math.floor((dureeMs % (1000 * 60 * 60)) / (1000 * 60));
  
//   if (heures > 0) {
//     return `${heures}h ${minutes}min`;
//   }
//   return `${minutes}min`;
// };

// const InterventionModal = ({ intervention, techniciens, onSave, onClose, loading, currentUser, sitesByBuilding }) => {
//   const [formData, setFormData] = useState({
//     titre: '',
//     type: 'reparation',
//     materiel: '',
//     lieu: '',
//     technicien: '',
//     statut: 'planifiee',
//     priorite: 'moyenne',
//     dateDebut: '',
//     heureDebut: '09:00',
//     description: ''
//   });

//   const [uploading, setUploading] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [fileInputKey, setFileInputKey] = useState(Date.now());
//   const [selectedBatiment, setSelectedBatiment] = useState('');

//   useEffect(() => {
//     if (intervention) {
//       setFormData({
//         titre: intervention.titre,
//         type: intervention.type,
//         materiel: intervention.materiel,
//         lieu: intervention.lieu,
//         technicien: intervention.technicien?._id || '',
//         statut: intervention.statut,
//         priorite: intervention.priorite,
//         dateDebut: intervention.dateDebut ? new Date(intervention.dateDebut).toISOString().split('T')[0] : '',
//         heureDebut: intervention.heureDebut || '09:00',
//         description: intervention.description || ''
//       });
      
//       if (intervention.lieu) {
//         const batiment = getBatimentFromLieu(intervention.lieu);
//         setSelectedBatiment(batiment);
//       }
//     }
//   }, [intervention]);

//   const getBatimentFromLieu = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return batiment;
//     }
//     return '';
//   };

//   const getLieuLabel = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return site.label;
//     }
//     return lieuValue;
//   };

//   const getBatiment = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return batiment;
//     }
//     return '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onSave(formData, intervention?._id);
//   };

//   const handleBatimentChange = (e) => {
//     const batiment = e.target.value;
//     setSelectedBatiment(batiment);
//     setFormData({...formData, lieu: ''});
//   };

//   const handleLieuChange = (e) => {
//     setFormData({...formData, lieu: e.target.value});
//   };

//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
    
//     const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
//     if (oversizedFiles.length > 0) {
//       alert('Certains fichiers dépassent la taille maximale de 10MB');
//       return;
//     }

//     if (selectedFiles.length + files.length > 5) {
//       alert('Maximum 5 fichiers autorisés par upload');
//       return;
//     }

//     setSelectedFiles(prev => [...prev, ...files]);
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFiles.length || !intervention?._id) return;

//     setUploading(true);
//     try {
//       await uploadFiles(intervention._id, selectedFiles);
//       setSelectedFiles([]);
//       setFileInputKey(Date.now());
//       onSave(formData, intervention._id);
//     } catch (error) {
//       console.error('Erreur upload:', error);
//       alert(error.response?.data?.message || 'Erreur lors de l\'upload des fichiers');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleFileDelete = async (fileId) => {
//     if (!intervention?._id) return;

//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
//       try {
//         await deleteFile(intervention._id, fileId);
//         onSave(formData, intervention._id);
//       } catch (error) {
//         console.error('Erreur suppression:', error);
//         alert('Erreur lors de la suppression du fichier');
//       }
//     }
//   };

//   const removeSelectedFile = (index) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case 'image': 
//         return <Image size={18} className="text-blue-500" />;
//       case 'document': 
//         return <FileText size={18} className="text-emerald-500" />;
//       default: 
//         return <FileText size={18} className="text-gray-500" />;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getFileType = (filename) => {
//     const ext = filename.split('.').pop().toLowerCase();
//     if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
//     if (['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(ext)) return 'document';
//     return 'autre';
//   };

//   const canModifyFiles = currentUser?.role === 'admin' || 
//     (intervention && intervention.technicien?._id === currentUser?.id);

//   const getPriorityColor = (priorite) => {
//     switch (priorite) {
//       case 'haute': return 'border-red-200 bg-red-50 text-red-700';
//       case 'moyenne': return 'border-yellow-200 bg-yellow-50 text-yellow-700';
//       case 'basse': return 'border-green-200 bg-green-50 text-green-700';
//       default: return 'border-gray-200 bg-gray-50 text-gray-700';
//     }
//   };

//   const getStatusIcon = (statut) => {
//     switch (statut) {
//       case 'terminee': return <CheckCircle2 size={16} className="text-green-600" />;
//       case 'en_cours': return <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />;
//       case 'planifiee': return <Calendar size={16} className="text-blue-600" />;
//       default: return <AlertCircle size={16} className="text-gray-600" />;
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl border border-gray-200/80 shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
//         {/* Header avec gradient */}
//         <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h3 className="text-2xl font-bold text-white">
//                 {intervention ? 'Modifier l\'intervention' : 'Nouvelle intervention'}
//               </h3>
//               <p className="text-blue-100 mt-1">
//                 {intervention ? 'Mettez à jour les détails de l\'intervention' : 'Créez une nouvelle intervention'}
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 group"
//             >
//               <X size={24} className="text-white group-hover:scale-110 transition-transform" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 max-h-[calc(95vh-120px)] overflow-y-auto">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Timeline des dates SI intervention existe et a des dates effectives */}
//             {intervention && (intervention.dateDebutEffectif || intervention.dateFinEffective) && (
//               <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
//                 <div className="flex items-center gap-2 mb-3">
//                   <Clock size={18} className="text-blue-600" />
//                   <h4 className="text-sm font-semibold text-gray-700">Suivi temporel de l'intervention</h4>
//                 </div>
//                 <div className="space-y-2">
//                   {/* Date planifiée */}
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <span className="text-sm text-gray-700">
//                       <strong>Planifié:</strong> {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')} à {intervention.heureDebut}
//                     </span>
//                   </div>
                  
//                   {/* Date début effectif */}
//                   {intervention.dateDebutEffectif && (
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                       <span className="text-sm text-gray-700">
//                         <strong>Débuté:</strong> {new Date(intervention.dateDebutEffectif).toLocaleDateString('fr-FR')} à {intervention.heureDebutEffectif}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Date fin effective */}
//                   {intervention.dateFinEffective && (
//                     <>
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                         <span className="text-sm text-gray-700">
//                           <strong>Terminé:</strong> {new Date(intervention.dateFinEffective).toLocaleDateString('fr-FR')} à {intervention.heureFinEffective}
//                         </span>
//                       </div>
                      
//                       {/* Durée totale */}
//                       {intervention.dateDebutEffectif && (
//                         <div className="flex items-center gap-2 mt-2 pt-2 border-t border-purple-200">
//                           <span className="text-sm font-bold text-purple-700">
//                             ⏱️ Durée totale: {formatDuree(intervention.dateDebutEffectif, intervention.dateFinEffective)}
//                           </span>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Section Informations principales */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Colonne gauche */}
//               <div className="space-y-6">
//                 {/* Titre */}
//                 <div className="group">
//                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     Titre de l'intervention
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.titre}
//                     onChange={(e) => setFormData({...formData, titre: e.target.value})}
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                     required
//                     disabled={loading}
//                     placeholder="Ex: Réparation imprimante secteur administratif"
//                   />
//                 </div>

//                 {/* Type et Priorité */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="group">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                       <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                       Type
//                     </label>
//                     <select
//                       value={formData.type}
//                       onChange={(e) => setFormData({...formData, type: e.target.value})}
//                       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                       disabled={loading}
//                     >
//                       <option value="reparation">Réparation</option>
//                       <option value="diagnostic">Diagnostic</option>
//                       <option value="verification">Vérification</option>
//                       <option value="maintenance">Maintenance</option>
//                       <option value="installation">Installation</option>
//                     </select>
//                   </div>

//                   <div className="group">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                       <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                       Priorité
//                     </label>
//                     <select
//                       value={formData.priorite}
//                       onChange={(e) => setFormData({...formData, priorite: e.target.value})}
//                       className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 transition-all duration-200 shadow-sm hover:shadow-md ${getPriorityColor(formData.priorite)}`}
//                       disabled={loading}
//                     >
//                       <option value="basse">Basse</option>
//                       <option value="moyenne">Moyenne</option>
//                       <option value="haute">Haute</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Matériel */}
//                 <div className="group">
//                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                     <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                     Équipement concerné
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.materiel}
//                     onChange={(e) => setFormData({...formData, materiel: e.target.value})}
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                     required
//                     disabled={loading}
//                     placeholder="Ex: Imprimante HP LaserJet Pro"
//                   />
//                 </div>
//               </div>

//               {/* Colonne droite */}
//               <div className="space-y-6">
//                 {/* Bâtiment et Lieu */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="group">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                       <Building size={16} className="text-indigo-600" />
//                       Bâtiment
//                     </label>
//                     <select
//                       value={selectedBatiment}
//                       onChange={handleBatimentChange}
//                       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                       required
//                       disabled={loading}
//                     >
//                       <option value="">Choisir un bâtiment</option>
//                       {Object.keys(sitesByBuilding).map(batiment => (
//                         <option key={batiment} value={batiment}>
//                           {batiment}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="group">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                       <MapPin size={16} className="text-emerald-600" />
//                       Localisation
//                     </label>
//                     <select
//                       value={formData.lieu}
//                       onChange={handleLieuChange}
//                       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                       required
//                       disabled={loading || !selectedBatiment}
//                     >
//                       <option value="">Sélectionner un lieu</option>
//                       {selectedBatiment && sitesByBuilding[selectedBatiment]?.map(site => (
//                         <option key={site.value} value={site.value}>
//                           {site.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Date et Heure */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="group">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                       <Calendar size={16} className="text-blue-600" />
//                       Date
//                     </label>
//                     <input
//                       type="date"
//                       value={formData.dateDebut}
//                       onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
//                       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                       required
//                       disabled={loading}
//                     />
//                   </div>

//                   <div className="group">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                       <Clock size={16} className="text-purple-600" />
//                       Heure
//                     </label>
//                     <input
//                       type="time"
//                       value={formData.heureDebut}
//                       onChange={(e) => setFormData({...formData, heureDebut: e.target.value})}
//                       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                       required
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 {/* Technicien */}
//                 <div className="group">
//                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                     <User size={16} className="text-cyan-600" />
//                     Technicien assigné
//                   </label>
//                   <select
//                     value={formData.technicien}
//                     onChange={(e) => setFormData({...formData, technicien: e.target.value})}
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                     required
//                     disabled={loading || (currentUser?.role !== 'admin' && intervention)}
//                   >
//                     <option value="">Assigner un technicien</option>
//                     {techniciens.map(tech => (
//                       <option key={tech._id} value={tech._id}>
//                         {tech.prenom} {tech.nom} ({tech.role})
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Statut */}
//                 <div className="group">
//                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                     {getStatusIcon(formData.statut)}
//                     Statut
//                   </label>
//                   <select
//                     value={formData.statut}
//                     onChange={(e) => setFormData({...formData, statut: e.target.value})}
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                     disabled={loading}
//                   >
//                     <option value="planifiee">Planifiée</option>
//                     <option value="en_cours">En cours</option>
//                     <option value="terminee">Terminée</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="group">
//               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                 <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
//                 Description détaillée
//               </label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({...formData, description: e.target.value})}
//                 className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
//                 rows="4"
//                 disabled={loading}
//                 placeholder="Décrivez en détail l'intervention à réaliser, les problèmes rencontrés, les actions à mener..."
//               />
//             </div>

//             {/* SECTION FICHIERS */}
//             {intervention && canModifyFiles && (
//               <div className="border-t border-gray-200 pt-6 mt-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <FileText size={20} className="text-blue-600" />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-gray-800">Fichiers attachés</h4>
//                     <p className="text-sm text-gray-600">Documents, photos et supports</p>
//                   </div>
//                 </div>

//                 {/* Fichiers existants */}
//                 {intervention.fichiers && intervention.fichiers.length > 0 && (
//                   <div className="mb-6">
//                     <h5 className="font-medium mb-3 text-gray-700 text-sm uppercase tracking-wide">Fichiers existants</h5>
//                     <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
//                       {intervention.fichiers.map((fichier) => (
//                         <div key={fichier._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
//                           <div className="flex items-center space-x-4 flex-1">
//                             <div className="p-2 bg-gray-100 rounded-lg">
//                               {getFileIcon(fichier.type)}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-gray-900 truncate">
//                                 {fichier.nom}
//                               </p>
//                               <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
//                                 <span>{formatFileSize(fichier.taille)}</span>
//                                 <span>•</span>
//                                 <span className="capitalize">{fichier.type}</span>
//                                 <span>•</span>
//                                 <span>Uploadé le {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}</span>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <button
//                               type="button"
//                               onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
//                               title="Télécharger"
//                             >
//                               <Download size={18} />
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => handleFileDelete(fichier._id)}
//                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
//                               title="Supprimer"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Upload de nouveaux fichiers */}
//                 <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/50">
//                   <input
//                     key={fileInputKey}
//                     type="file"
//                     multiple
//                     onChange={handleFileSelect}
//                     className="hidden"
//                     id="file-upload"
//                     accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
//                   />
//                   <label htmlFor="file-upload" className="cursor-pointer block">
//                     <div className="text-center">
//                       <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
//                         <Upload size={28} className="text-blue-600" />
//                       </div>
//                       <p className="text-lg font-semibold text-gray-800 mb-2">
//                         Ajouter des fichiers
//                       </p>
//                       <p className="text-sm text-gray-600 max-w-md mx-auto">
//                         Glissez-déposez vos fichiers ou <span className="text-blue-600 font-semibold">parcourez</span> votre appareil
//                       </p>
//                       <p className="text-xs text-gray-500 mt-2">
//                         Formats supportés: JPG, PNG, PDF, DOC, XLS • Max 10MB par fichier
//                       </p>
//                     </div>
//                   </label>

//                   {/* Liste des fichiers sélectionnés */}
//                   {selectedFiles.length > 0 && (
//                     <div className="mt-6">
//                       <h6 className="font-semibold mb-3 text-gray-700">Fichiers sélectionnés ({selectedFiles.length})</h6>
//                       <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
//                         {selectedFiles.map((file, index) => (
//                           <div key={index} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-xl">
//                             <div className="flex items-center space-x-3 flex-1">
//                               <div className="p-2 bg-white rounded-lg border">
//                                 {getFileIcon(getFileType(file.name))}
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <p className="text-sm font-medium text-gray-900 truncate">
//                                   {file.name}
//                                 </p>
//                                 <p className="text-xs text-gray-500">
//                                   {formatFileSize(file.size)}
//                                 </p>
//                               </div>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => removeSelectedFile(index)}
//                               className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
//                               title="Retirer"
//                             >
//                               <X size={16} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                       <button
//                         type="button"
//                         onClick={handleFileUpload}
//                         disabled={uploading}
//                         className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-semibold"
//                       >
//                         {uploading ? (
//                           <>
//                             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                             Upload en cours...
//                           </>
//                         ) : (
//                           <>
//                             <Upload size={18} />
//                             Uploader {selectedFiles.length} fichier(s)
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Boutons d'action */}
//             <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-semibold"
//                 disabled={loading || uploading}
//               >
//                 Annuler
//               </button>
//               <button
//                 type="submit"
//                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//                 disabled={loading || uploading}
//               >
//                 {loading ? (
//                   <div className="flex items-center gap-2">
//                     <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                     Enregistrement...
//                   </div>
//                 ) : intervention ? (
//                   'Mettre à jour'
//                 ) : (
//                   'Créer l\'intervention'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterventionModal;




// NOUVELLE VERSION CLAUDE AVEC AJOUT DE POSSIBILITE D'UPLOAD DE FICHIERS POUR LES TECHNICIENS



// import React, { useState, useEffect } from 'react';
// import { Upload, X, FileText, Image, Download, Trash2, Building, MapPin, Calendar, Clock, User, AlertCircle, CheckCircle2 } from 'lucide-react';
// import { uploadFiles, deleteFile } from '../../services/fileService';

// // Fonction helper pour formater la durée
// const formatDuree = (dateDebut, dateFin) => {
//   if (!dateDebut || !dateFin) return null;
  
//   const dureeMs = new Date(dateFin) - new Date(dateDebut);
//   const heures = Math.floor(dureeMs / (1000 * 60 * 60));
//   const minutes = Math.floor((dureeMs % (1000 * 60 * 60)) / (1000 * 60));
  
//   if (heures > 0) {
//     return `${heures}h ${minutes}min`;
//   }
//   return `${minutes}min`;
// };

// const InterventionModal = ({ intervention, techniciens, onSave, onClose, loading, currentUser, sitesByBuilding }) => {
//   const [formData, setFormData] = useState({
//     titre: '',
//     type: 'reparation',
//     materiel: '',
//     lieu: '',
//     technicien: '',
//     statut: 'planifiee',
//     priorite: 'moyenne',
//     dateDebut: '',
//     heureDebut: '09:00',
//     description: ''
//   });

//   const [uploading, setUploading] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [fileInputKey, setFileInputKey] = useState(Date.now());
//   const [selectedBatiment, setSelectedBatiment] = useState('');

//   // ✅ Déterminer si le technicien peut seulement uploader des fichiers
//   const isTechnicianFinishing = 
//     currentUser?.role !== 'admin' && 
//     intervention && 
//     intervention.statut === 'en_cours' &&
//     formData.statut === 'terminee';

//   const canOnlyUploadFiles = isTechnicianFinishing;

//   useEffect(() => {
//     if (intervention) {
//       setFormData({
//         titre: intervention.titre,
//         type: intervention.type,
//         materiel: intervention.materiel,
//         lieu: intervention.lieu,
//         technicien: intervention.technicien?._id || '',
//         statut: intervention.statut,
//         priorite: intervention.priorite,
//         dateDebut: intervention.dateDebut ? new Date(intervention.dateDebut).toISOString().split('T')[0] : '',
//         heureDebut: intervention.heureDebut || '09:00',
//         description: intervention.description || ''
//       });
      
//       if (intervention.lieu) {
//         const batiment = getBatimentFromLieu(intervention.lieu);
//         setSelectedBatiment(batiment);
//       }
//     }
//   }, [intervention]);

//   const getBatimentFromLieu = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return batiment;
//     }
//     return '';
//   };

//   const getLieuLabel = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return site.label;
//     }
//     return lieuValue;
//   };

//   const getBatiment = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return batiment;
//     }
//     return '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // ✅ Si le technicien peut seulement uploader, on ne met à jour que le statut
//     if (canOnlyUploadFiles) {
//       await onSave({ statut: formData.statut }, intervention?._id);
//     } else {
//       await onSave(formData, intervention?._id);
//     }
//   };

//   const handleBatimentChange = (e) => {
//     const batiment = e.target.value;
//     setSelectedBatiment(batiment);
//     setFormData({...formData, lieu: ''});
//   };

//   const handleLieuChange = (e) => {
//     setFormData({...formData, lieu: e.target.value});
//   };

//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
    
//     const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
//     if (oversizedFiles.length > 0) {
//       alert('Certains fichiers dépassent la taille maximale de 10MB');
//       return;
//     }

//     if (selectedFiles.length + files.length > 5) {
//       alert('Maximum 5 fichiers autorisés par upload');
//       return;
//     }

//     setSelectedFiles(prev => [...prev, ...files]);
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFiles.length || !intervention?._id) return;

//     setUploading(true);
//     try {
//       await uploadFiles(intervention._id, selectedFiles);
//       setSelectedFiles([]);
//       setFileInputKey(Date.now());
//       onSave(formData, intervention._id);
//     } catch (error) {
//       console.error('Erreur upload:', error);
//       alert(error.response?.data?.message || 'Erreur lors de l\'upload des fichiers');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleFileDelete = async (fileId) => {
//     if (!intervention?._id) return;

//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
//       try {
//         await deleteFile(intervention._id, fileId);
//         onSave(formData, intervention._id);
//       } catch (error) {
//         console.error('Erreur suppression:', error);
//         alert('Erreur lors de la suppression du fichier');
//       }
//     }
//   };

//   const removeSelectedFile = (index) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case 'image': 
//         return <Image size={18} className="text-blue-500" />;
//       case 'document': 
//         return <FileText size={18} className="text-emerald-500" />;
//       default: 
//         return <FileText size={18} className="text-gray-500" />;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getFileType = (filename) => {
//     const ext = filename.split('.').pop().toLowerCase();
//     if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
//     if (['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(ext)) return 'document';
//     return 'autre';
//   };

//   const canModifyFiles = currentUser?.role === 'admin' || 
//     (intervention && intervention.technicien?._id === currentUser?.id);

//   const getPriorityColor = (priorite) => {
//     switch (priorite) {
//       case 'haute': return 'border-red-200 bg-red-50 text-red-700';
//       case 'moyenne': return 'border-yellow-200 bg-yellow-50 text-yellow-700';
//       case 'basse': return 'border-green-200 bg-green-50 text-green-700';
//       default: return 'border-gray-200 bg-gray-50 text-gray-700';
//     }
//   };

//   const getStatusIcon = (statut) => {
//     switch (statut) {
//       case 'terminee': return <CheckCircle2 size={16} className="text-green-600" />;
//       case 'en_cours': return <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />;
//       case 'planifiee': return <Calendar size={16} className="text-blue-600" />;
//       default: return <AlertCircle size={16} className="text-gray-600" />;
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl border border-gray-200/80 shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
//         {/* Header avec gradient */}
//         <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h3 className="text-2xl font-bold text-white">
//                 {canOnlyUploadFiles ? 'Finaliser l\'intervention' : intervention ? 'Modifier l\'intervention' : 'Nouvelle intervention'}
//               </h3>
//               <p className="text-blue-100 mt-1">
//                 {canOnlyUploadFiles 
//                   ? 'Ajoutez les fichiers nécessaires avant de terminer' 
//                   : intervention 
//                     ? 'Mettez à jour les détails de l\'intervention' 
//                     : 'Créez une nouvelle intervention'
//                 }
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 group"
//             >
//               <X size={24} className="text-white group-hover:scale-110 transition-transform" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 max-h-[calc(95vh-120px)] overflow-y-auto">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Timeline des dates SI intervention existe et a des dates effectives */}
//             {intervention && (intervention.dateDebutEffectif || intervention.dateFinEffective) && (
//               <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
//                 <div className="flex items-center gap-2 mb-3">
//                   <Clock size={18} className="text-blue-600" />
//                   <h4 className="text-sm font-semibold text-gray-700">Suivi temporel de l'intervention</h4>
//                 </div>
//                 <div className="space-y-2">
//                   {/* Date planifiée */}
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <span className="text-sm text-gray-700">
//                       <strong>Planifié:</strong> {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')} à {intervention.heureDebut}
//                     </span>
//                   </div>
                  
//                   {/* Date début effectif */}
//                   {intervention.dateDebutEffectif && (
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                       <span className="text-sm text-gray-700">
//                         <strong>Débuté:</strong> {new Date(intervention.dateDebutEffectif).toLocaleDateString('fr-FR')} à {intervention.heureDebutEffectif}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Date fin effective */}
//                   {intervention.dateFinEffective && (
//                     <>
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                         <span className="text-sm text-gray-700">
//                           <strong>Terminé:</strong> {new Date(intervention.dateFinEffective).toLocaleDateString('fr-FR')} à {intervention.heureFinEffective}
//                         </span>
//                       </div>
                      
//                       {/* Durée totale */}
//                       {intervention.dateDebutEffectif && (
//                         <div className="flex items-center gap-2 mt-2 pt-2 border-t border-purple-200">
//                           <span className="text-sm font-bold text-purple-700">
//                             ⏱️ Durée totale: {formatDuree(intervention.dateDebutEffectif, intervention.dateFinEffective)}
//                           </span>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* ✅ Message informatif pour les techniciens */}
//             {canOnlyUploadFiles && (
//               <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
//                 <div className="flex items-center gap-3">
//                   <AlertCircle size={24} className="text-yellow-600 flex-shrink-0" />
//                   <div>
//                     <p className="text-sm font-bold text-yellow-900">Finalisation de l'intervention</p>
//                     <p className="text-sm text-yellow-800 mt-1">
//                       Veuillez ajouter les fichiers nécessaires (photos, rapports d'intervention) avant de valider. 
//                       Les informations de l'intervention ne peuvent plus être modifiées.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Section Informations principales - MASQUÉE pour les techniciens en fin d'intervention */}
//             {!canOnlyUploadFiles && (
//               <>
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   {/* Colonne gauche */}
//                   <div className="space-y-6">
//                     {/* Titre */}
//                     <div className="group">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                         Titre de l'intervention
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.titre}
//                         onChange={(e) => setFormData({...formData, titre: e.target.value})}
//                         className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                         required
//                         disabled={loading}
//                         placeholder="Ex: Réparation imprimante secteur administratif"
//                       />
//                     </div>

//                     {/* Type et Priorité */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="group">
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                           <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                           Type
//                         </label>
//                         <select
//                           value={formData.type}
//                           onChange={(e) => setFormData({...formData, type: e.target.value})}
//                           className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                           disabled={loading}
//                         >
//                           <option value="reparation">Réparation</option>
//                           <option value="diagnostic">Diagnostic</option>
//                           <option value="verification">Vérification</option>
//                           <option value="maintenance">Maintenance</option>
//                           <option value="installation">Installation</option>
//                         </select>
//                       </div>

//                       <div className="group">
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                           <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                           Priorité
//                         </label>
//                         <select
//                           value={formData.priorite}
//                           onChange={(e) => setFormData({...formData, priorite: e.target.value})}
//                           className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 transition-all duration-200 shadow-sm hover:shadow-md ${getPriorityColor(formData.priorite)}`}
//                           disabled={loading}
//                         >
//                           <option value="basse">Basse</option>
//                           <option value="moyenne">Moyenne</option>
//                           <option value="haute">Haute</option>
//                         </select>
//                       </div>
//                     </div>

//                     {/* Matériel */}
//                     <div className="group">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                         <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                         Équipement concerné
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.materiel}
//                         onChange={(e) => setFormData({...formData, materiel: e.target.value})}
//                         className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                         required
//                         disabled={loading}
//                         placeholder="Ex: Imprimante HP LaserJet Pro"
//                       />
//                     </div>
//                   </div>

//                   {/* Colonne droite */}
//                   <div className="space-y-6">
//                     {/* Bâtiment et Lieu */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="group">
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                           <Building size={16} className="text-indigo-600" />
//                           Bâtiment
//                         </label>
//                         <select
//                           value={selectedBatiment}
//                           onChange={handleBatimentChange}
//                           className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                           required
//                           disabled={loading}
//                         >
//                           <option value="">Choisir un bâtiment</option>
//                           {Object.keys(sitesByBuilding).map(batiment => (
//                             <option key={batiment} value={batiment}>
//                               {batiment}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       <div className="group">
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                           <MapPin size={16} className="text-emerald-600" />
//                           Localisation
//                         </label>
//                         <select
//                           value={formData.lieu}
//                           onChange={handleLieuChange}
//                           className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                           required
//                           disabled={loading || !selectedBatiment}
//                         >
//                           <option value="">Sélectionner un lieu</option>
//                           {selectedBatiment && sitesByBuilding[selectedBatiment]?.map(site => (
//                             <option key={site.value} value={site.value}>
//                               {site.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     {/* Date et Heure */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="group">
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                           <Calendar size={16} className="text-blue-600" />
//                           Date
//                         </label>
//                         <input
//                           type="date"
//                           value={formData.dateDebut}
//                           onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
//                           className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                           required
//                           disabled={loading}
//                         />
//                       </div>

//                       <div className="group">
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                           <Clock size={16} className="text-purple-600" />
//                           Heure
//                         </label>
//                         <input
//                           type="time"
//                           value={formData.heureDebut}
//                           onChange={(e) => setFormData({...formData, heureDebut: e.target.value})}
//                           className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                           required
//                           disabled={loading}
//                         />
//                       </div>
//                     </div>

//                     {/* Technicien */}
//                     <div className="group">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                         <User size={16} className="text-cyan-600" />
//                         Technicien assigné
//                       </label>
//                       <select
//                         value={formData.technicien}
//                         onChange={(e) => setFormData({...formData, technicien: e.target.value})}
//                         className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                         required
//                         disabled={loading || (currentUser?.role !== 'admin' && intervention)}
//                       >
//                         <option value="">Assigner un technicien</option>
//                         {techniciens.map(tech => (
//                           <option key={tech._id} value={tech._id}>
//                             {tech.prenom} {tech.nom} ({tech.role})
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Statut */}
//                     <div className="group">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                         {getStatusIcon(formData.statut)}
//                         Statut
//                       </label>
//                       <select
//                         value={formData.statut}
//                         onChange={(e) => setFormData({...formData, statut: e.target.value})}
//                         className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                         disabled={loading}
//                       >
//                         <option value="planifiee">Planifiée</option>
//                         <option value="en_cours">En cours</option>
//                         <option value="terminee">Terminée</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="group">
//                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                     <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
//                     Description détaillée
//                   </label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({...formData, description: e.target.value})}
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
//                     rows="4"
//                     disabled={loading}
//                     placeholder="Décrivez en détail l'intervention à réaliser, les problèmes rencontrés, les actions à mener..."
//                   />
//                 </div>
//               </>
//             )}

//             {/* SECTION FICHIERS - Toujours visible pour les techniciens qui terminent */}
//             {intervention && canModifyFiles && (
//               <div className="border-t border-gray-200 pt-6 mt-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <FileText size={20} className="text-blue-600" />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-gray-800">
//                       {canOnlyUploadFiles ? 'Ajouter les fichiers requis' : 'Fichiers attachés'}
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       {canOnlyUploadFiles 
//                         ? 'Photos, rapports d\'intervention, documents' 
//                         : 'Documents, photos et supports'
//                       }
//                     </p>
//                   </div>
//                 </div>

//                 {/* Fichiers existants */}
//                 {intervention.fichiers && intervention.fichiers.length > 0 && (
//                   <div className="mb-6">
//                     <h5 className="font-medium mb-3 text-gray-700 text-sm uppercase tracking-wide">Fichiers existants</h5>
//                     <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
//                       {intervention.fichiers.map((fichier) => (
//                         <div key={fichier._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
//                           <div className="flex items-center space-x-4 flex-1">
//                             <div className="p-2 bg-gray-100 rounded-lg">
//                               {getFileIcon(fichier.type)}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-gray-900 truncate">
//                                 {fichier.nom}
//                               </p>
//                               <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
//                                 <span>{formatFileSize(fichier.taille)}</span>
//                                 <span>•</span>
//                                 <span className="capitalize">{fichier.type}</span>
//                                 <span>•</span>
//                                 <span>Uploadé le {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}</span>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <button
//                               type="button"
//                               onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
//                               title="Télécharger"
//                             >
//                               <Download size={18} />
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => handleFileDelete(fichier._id)}
//                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
//                               title="Supprimer"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Upload de nouveaux fichiers */}
//                 <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/50">
//                   <input
//                     key={fileInputKey}
//                     type="file"
//                     multiple
//                     onChange={handleFileSelect}
//                     className="hidden"
//                     id="file-upload"
//                     accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
//                   />
//                   <label htmlFor="file-upload" className="cursor-pointer block">
//                     <div className="text-center">
//                       <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
//                         <Upload size={28} className="text-blue-600" />
//                       </div>
//                       <p className="text-lg font-semibold text-gray-800 mb-2">
//                         Ajouter des fichiers
//                       </p>
//                       <p className="text-sm text-gray-600 max-w-md mx-auto">
//                         Glissez-déposez vos fichiers ou <span className="text-blue-600 font-semibold">parcourez</span> votre appareil
//                       </p>
//                       <p className="text-xs text-gray-500 mt-2">
//                         Formats supportés: JPG, PNG, PDF, DOC, XLS • Max 10MB par fichier
//                       </p>
//                     </div>
//                   </label>

//                   {/* Liste des fichiers sélectionnés */}
//                   {selectedFiles.length > 0 && (
//                     <div className="mt-6">
//                       <h6 className="font-semibold mb-3 text-gray-700">Fichiers sélectionnés ({selectedFiles.length})</h6>
//                       <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
//                         {selectedFiles.map((file, index) => (
//                           <div key={index} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-xl">
//                             <div className="flex items-center space-x-3 flex-1">
//                               <div className="p-2 bg-white rounded-lg border">
//                                 {getFileIcon(getFileType(file.name))}
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <p className="text-sm font-medium text-gray-900 truncate">
//                                   {file.name}
//                                 </p>
//                                 <p className="text-xs text-gray-500">
//                                   {formatFileSize(file.size)}
//                                 </p>
//                               </div>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => removeSelectedFile(index)}
//                               className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
//                               title="Retirer"
//                             >
//                               <X size={16} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                       <button
//                         type="button"
//                         onClick={handleFileUpload}
//                         disabled={uploading}
//                         className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-semibold"
//                       >
//                         {uploading ? (
//                           <>
//                             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                             Upload en cours...
//                           </>
//                         ) : (
//                           <>
//                             <Upload size={18} />
//                             Uploader {selectedFiles.length} fichier(s)
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Boutons d'action */}
//             <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-semibold"
//                 disabled={loading || uploading}
//               >
//                 Annuler
//               </button>
//               <button
//                 type="submit"
//                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//                 disabled={loading || uploading}
//               >
//                 {loading ? (
//                   <div className="flex items-center gap-2">
//                     <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                     Enregistrement...
//                   </div>
//                 ) : canOnlyUploadFiles ? (
//                   'Terminer l\'intervention'
//                 ) : intervention ? (
//                   'Mettre à jour'
//                 ) : (
//                   'Créer l\'intervention'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterventionModal;


// NOUVELLE VERSION DU FICHIER CI-DESSUS


// import React, { useState, useEffect } from 'react';
// import { Upload, X, FileText, Image, Download, Trash2, Building, MapPin, Calendar, Clock, User, AlertCircle, CheckCircle2 } from 'lucide-react';
// import { uploadFiles, deleteFile } from '../../services/fileService';

// // Fonction helper pour formater la durée
// const formatDuree = (dateDebut, dateFin) => {
//   if (!dateDebut || !dateFin) return null;
  
//   const dureeMs = new Date(dateFin) - new Date(dateDebut);
//   const heures = Math.floor(dureeMs / (1000 * 60 * 60));
//   const minutes = Math.floor((dureeMs % (1000 * 60 * 60)) / (1000 * 60));
  
//   if (heures > 0) {
//     return `${heures}h ${minutes}min`;
//   }
//   return `${minutes}min`;
// };

// const InterventionModal = ({ intervention, techniciens, onSave, onClose, loading, currentUser, sitesByBuilding }) => {
//   const [formData, setFormData] = useState({
//     titre: '',
//     type: 'reparation',
//     materiel: '',
//     lieu: '',
//     technicien: '',
//     statut: 'planifiee',
//     priorite: 'moyenne',
//     dateDebut: '',
//     heureDebut: '09:00',
//     description: ''
//   });

//   const [uploading, setUploading] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [fileInputKey, setFileInputKey] = useState(Date.now());
//   const [selectedBatiment, setSelectedBatiment] = useState('');

//   // ✅ Déterminer si le technicien peut seulement uploader des fichiers
//   // Vérifier si c'est une finalisation en cours (statut passé à terminee mais pas encore sauvegardé)
//   const isTechnicianFinishing = 
//     currentUser?.role !== 'admin' && 
//     intervention && 
//     (
//       // Cas 1: L'intervention originale est en_cours et le formData montre terminee
//       (intervention.statut === 'en_cours' && formData.statut === 'terminee') ||
//       // Cas 2: Flag spécial pour indiquer une finalisation
//       intervention._pendingStatusChange === true
//     );

//   const canOnlyUploadFiles = isTechnicianFinishing;

//   // 🔒 Harmonisation des IDs et déclaration AVANT usage
//   const userId = currentUser?._id ?? currentUser?.id;
//   const techId = intervention?.technicien?._id ?? intervention?.technicien?.id;

//   // ✅ Droits de modification des fichiers
//   const canModifyFiles =
//     currentUser?.role === 'admin' ||
//     (intervention && techId && userId && techId === userId) ||
//     canOnlyUploadFiles; // inclut le cas de finalisation par le technicien

//   console.log('🔍 Modal debug:', {
//     userRole: currentUser?.role,
//     interventionStatus: intervention?.statut,
//     formDataStatus: formData.statut,
//     pendingChange: intervention?._pendingStatusChange,
//     isTechnicianFinishing,
//     canOnlyUploadFiles,
//     canModifyFiles,
//     interventionTechnicienId: techId,
//     currentUserId: userId
//   });

//   useEffect(() => {
//     if (intervention) {
//       // Si c'est une finalisation en attente, forcer le statut à "terminee"
//       const statutToUse = intervention._pendingStatusChange ? 'terminee' : intervention.statut;
      
//       setFormData({
//         titre: intervention.titre,
//         type: intervention.type,
//         materiel: intervention.materiel,
//         lieu: intervention.lieu,
//         technicien: intervention.technicien?._id || '',
//         statut: statutToUse, // ✅ Utiliser le statut forcé si c'est une finalisation
//         priorite: intervention.priorite,
//         dateDebut: intervention.dateDebut ? new Date(intervention.dateDebut).toISOString().split('T')[0] : '',
//         heureDebut: intervention.heureDebut || '09:00',
//         description: intervention.description || ''
//       });
      
//       if (intervention.lieu) {
//         const batiment = getBatimentFromLieu(intervention.lieu);
//         setSelectedBatiment(batiment);
//       }
//     }
//   }, [intervention]);

//   const getBatimentFromLieu = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return batiment;
//     }
//     return '';
//   };

//   const getLieuLabel = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return site.label;
//     }
//     return lieuValue;
//   };

//   const getBatiment = (lieuValue) => {
//     for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
//       const site = sites.find(s => s.value === lieuValue);
//       if (site) return batiment;
//     }
//     return '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // ✅ Si le technicien peut seulement uploader, on ne met à jour que le statut
//     if (canOnlyUploadFiles) {
//       await onSave({ statut: formData.statut }, intervention?._id);
//     } else {
//       await onSave(formData, intervention?._id);
//     }
//   };

//   const handleBatimentChange = (e) => {
//     const batiment = e.target.value;
//     setSelectedBatiment(batiment);
//     setFormData({...formData, lieu: ''});
//   };

//   const handleLieuChange = (e) => {
//     setFormData({...formData, lieu: e.target.value});
//   };

//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
    
//     const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
//     if (oversizedFiles.length > 0) {
//       alert('Certains fichiers dépassent la taille maximale de 10MB');
//       return;
//     }

//     if (selectedFiles.length + files.length > 5) {
//       alert('Maximum 5 fichiers autorisés par upload');
//       return;
//     }

//     setSelectedFiles(prev => [...prev, ...files]);
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFiles.length || !intervention?._id) return;

//     setUploading(true);
//     try {
//       await uploadFiles(intervention._id, selectedFiles);
//       setSelectedFiles([]);
//       setFileInputKey(Date.now());
//       onSave(formData, intervention._id);
//     } catch (error) {
//       console.error('Erreur upload:', error);
//       alert(error.response?.data?.message || 'Erreur lors de l\'upload des fichiers');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleFileDelete = async (fileId) => {
//     if (!intervention?._id) return;

//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
//       try {
//         await deleteFile(intervention._id, fileId);
//         onSave(formData, intervention._id);
//       } catch (error) {
//         console.error('Erreur suppression:', error);
//         alert('Erreur lors de la suppression du fichier');
//       }
//     }
//   };

//   const removeSelectedFile = (index) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const getFileIcon = (fileType) => {
//     switch (fileType) {
//       case 'image': 
//         return <Image size={18} className="text-blue-500" />;
//       case 'document': 
//         return <FileText size={18} className="text-emerald-500" />;
//       default: 
//         return <FileText size={18} className="text-gray-500" />;
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getFileType = (filename) => {
//     const ext = filename.split('.').pop().toLowerCase();
//     if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
//     if (['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(ext)) return 'document';
//     return 'autre';
//   };

//   const getPriorityColor = (priorite) => {
//     switch (priorite) {
//       case 'haute': return 'border-red-200 bg-red-50 text-red-700';
//       case 'moyenne': return 'border-yellow-200 bg-yellow-50 text-yellow-700';
//       case 'basse': return 'border-green-200 bg-green-50 text-green-700';
//       default: return 'border-gray-200 bg-gray-50 text-gray-700';
//     }
//   };

//   const getStatusIcon = (statut) => {
//     switch (statut) {
//       case 'terminee': return <CheckCircle2 size={16} className="text-green-600" />;
//       case 'en_cours': return <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />;
//       case 'planifiee': return <Calendar size={16} className="text-blue-600" />;
//       default: return <AlertCircle size={16} className="text-gray-600" />;
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl border border-gray-200/80 shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
//         {/* Header avec gradient */}
//         <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h3 className="text-2xl font-bold text-white">
//                 {canOnlyUploadFiles ? 'Finaliser l\'intervention' : intervention ? 'Modifier l\'intervention' : 'Nouvelle intervention'}
//               </h3>
//               <p className="text-blue-100 mt-1">
//                 {canOnlyUploadFiles 
//                   ? 'Ajoutez les fichiers nécessaires avant de terminer' 
//                   : intervention 
//                     ? 'Mettez à jour les détails de l\'intervention' 
//                     : 'Créez une nouvelle intervention'
//                 }
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 group"
//             >
//               <X size={24} className="text-white group-hover:scale-110 transition-transform" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 max-h-[calc(95vh-120px)] overflow-y-auto">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Timeline des dates SI intervention existe et a des dates effectives */}
//             {intervention && (intervention.dateDebutEffectif || intervention.dateFinEffective) && (
//               <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
//                 <div className="flex items-center gap-2 mb-3">
//                   <Clock size={18} className="text-blue-600" />
//                   <h4 className="text-sm font-semibold text-gray-700">Suivi temporel de l'intervention</h4>
//                 </div>
//                 <div className="space-y-2">
//                   {/* Date planifiée */}
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <span className="text-sm text-gray-700">
//                       <strong>Planifié:</strong> {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')} à {intervention.heureDebut}
//                     </span>
//                   </div>
                  
//                   {/* Date début effectif */}
//                   {intervention.dateDebutEffectif && (
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                       <span className="text-sm text-gray-700">
//                         <strong>Débuté:</strong> {new Date(intervention.dateDebutEffectif).toLocaleDateString('fr-FR')} à {intervention.heureDebutEffectif}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Date fin effective */}
//                   {intervention.dateFinEffective && (
//                     <>
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                         <span className="text-sm text-gray-700">
//                           <strong>Terminé:</strong> {new Date(intervention.dateFinEffective).toLocaleDateString('fr-FR')} à {intervention.heureFinEffective}
//                         </span>
//                       </div>
                      
//                       {/* Durée totale */}
//                       {intervention.dateDebutEffectif && (
//                         <div className="flex items-center gap-2 mt-2 pt-2 border-t border-purple-200">
//                           <span className="text-sm font-bold text-purple-700">
//                             ⏱️ Durée totale: {formatDuree(intervention.dateDebutEffectif, intervention.dateFinEffective)}
//                           </span>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* ✅ Message informatif pour les techniciens */}
//             {canOnlyUploadFiles && (
//               <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
//                 <div className="flex items-center gap-3">
//                   <AlertCircle size={24} className="text-yellow-600 flex-shrink-0" />
//                   <div>
//                     <p className="text-sm font-bold text-yellow-900">Finalisation de l'intervention</p>
//                     <p className="text-sm text-yellow-800 mt-1">
//                       Veuillez ajouter les fichiers nécessaires (photos, rapports d'intervention) avant de valider. 
//                       Les informations de l'intervention ne peuvent plus être modifiées.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Section Informations principales - MASQUÉE pour les techniciens en fin d'intervention */}
//             {!canOnlyUploadFiles && (
//               <>
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   {/* Colonne gauche */}
//                   <div className="space-y-6">
//                     {/* Titre */}
//                     <div className="group">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                         Titre de l'intervention
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.titre}
//                         onChange={(e) => setFormData({...formData, titre: e.target.value})}
//                         className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                         required
//                         disabled={loading}
//                         placeholder="Ex: Réparation imprimante secteur administratif"
//                       />
//                     </div>

//                     {/* Type et Priorité */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="group">
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                           <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                           Type
//                         </label>
//                         <select
//                           value={formData.type}
//                           onChange={(e) => setFormData({...formData, type: e.target.value})}
//                           className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                           disabled={loading}
//                         >
//                           <option value="reparation">Réparation</option>
//                           <option value="diagnostic">Diagnostic</option>
//                           <option value="verification">Vérification</option>
//                           <option value="maintenance">Maintenance</option>
//                           <option value="installation">Installation</option>
//                         </select>
//                       </div>

//                       <div className="group">
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                           <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                           Priorité
//                         </label>
//                         <select
//                           value={formData.priorite}
//                           onChange={(e) => setFormData({...formData, priorite: e.target.value})}
//                           className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 transition-all duration-200 shadow-sm hover:shadow-md ${getPriorityColor(formData.priorite)}`}
//                           disabled={loading}
//                         >
//                           <option value="basse">Basse</option>
//                           <option value="moyenne">Moyenne</option>
//                           <option value="haute">Haute</option>
//                         </select>
//                       </div>
//                     </div>

//                     {/* Matériel */}
//                     <div className="group">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                         <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                         Équipement concerné
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.materiel}
//                         onChange={(e) => setFormData({...formData, materiel: e.target.value})}
//                         className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                         required
//                         disabled={loading}
//                         placeholder="Ex: Imprimante HP LaserJet Pro"
//                       />
//                     </div>
//                   </div>

//                   {/* Colonne droite */}
//                   <div className="space-y-6">
//                     {/* Bâtiment et Lieu */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="group">
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                           <Building size={16} className="text-indigo-600" />
//                           Bâtiment
//                         </label>
//                         <select
//                           value={selectedBatiment}
//                           onChange={handleBatimentChange}
//                           className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                           required
//                           disabled={loading}
//                         >
//                           <option value="">Choisir un bâtiment</option>
//                           {Object.keys(sitesByBuilding).map(batiment => (
//                             <option key={batiment} value={batiment}>
//                               {batiment}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       <div className="group">
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                           <MapPin size={16} className="text-emerald-600" />
//                           Localisation
//                         </label>
//                         <select
//                           value={formData.lieu}
//                           onChange={handleLieuChange}
//                           className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                           required
//                           disabled={loading || !selectedBatiment}
//                         >
//                           <option value="">Sélectionner un lieu</option>
//                           {selectedBatiment && sitesByBuilding[selectedBatiment]?.map(site => (
//                             <option key={site.value} value={site.value}>
//                               {site.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     {/* Date et Heure */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="group">
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                           <Calendar size={16} className="text-blue-600" />
//                           Date
//                         </label>
//                         <input
//                           type="date"
//                           value={formData.dateDebut}
//                           onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
//                           className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                           required
//                           disabled={loading}
//                         />
//                       </div>

//                       <div className="group">
//                         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                           <Clock size={16} className="text-purple-600" />
//                           Heure
//                         </label>
//                         <input
//                           type="time"
//                           value={formData.heureDebut}
//                           onChange={(e) => setFormData({...formData, heureDebut: e.target.value})}
//                           className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                           required
//                           disabled={loading}
//                         />
//                       </div>
//                     </div>

//                     {/* Technicien */}
//                     <div className="group">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                         <User size={16} className="text-cyan-600" />
//                         Technicien assigné
//                       </label>
//                       <select
//                         value={formData.technicien}
//                         onChange={(e) => setFormData({...formData, technicien: e.target.value})}
//                         className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                         required
//                         disabled={loading || (currentUser?.role !== 'admin' && intervention)}
//                       >
//                         <option value="">Assigner un technicien</option>
//                         {techniciens.map(tech => (
//                           <option key={tech._id} value={tech._id}>
//                             {tech.prenom} {tech.nom} ({tech.role})
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Statut */}
//                     <div className="group">
//                       <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                         {getStatusIcon(formData.statut)}
//                         Statut
//                       </label>
//                       <select
//                         value={formData.statut}
//                         onChange={(e) => setFormData({...formData, statut: e.target.value})}
//                         className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                         disabled={loading}
//                       >
//                         <option value="planifiee">Planifiée</option>
//                         <option value="en_cours">En cours</option>
//                         <option value="terminee">Terminée</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="group">
//                   <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
//                     <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
//                     Description détaillée
//                   </label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({...formData, description: e.target.value})}
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
//                     rows="4"
//                     disabled={loading}
//                     placeholder="Décrivez en détail l'intervention à réaliser, les problèmes rencontrés, les actions à mener..."
//                   />
//                 </div>
//               </>
//             )}

//             {/* SECTION FICHIERS - Toujours visible pour les techniciens qui terminent */}
//             {intervention && canModifyFiles && (
//               <div className={`pt-6 mt-6 ${canOnlyUploadFiles ? '' : 'border-t border-gray-200'}`}>
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <FileText size={20} className="text-blue-600" />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-gray-800">
//                       {canOnlyUploadFiles ? 'Ajouter les fichiers requis' : 'Fichiers attachés'}
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       {canOnlyUploadFiles 
//                         ? 'Photos, rapports d\'intervention, documents' 
//                         : 'Documents, photos et supports'
//                       }
//                     </p>
//                   </div>
//                 </div>

//                 {/* Fichiers existants */}
//                 {intervention.fichiers && intervention.fichiers.length > 0 && (
//                   <div className="mb-6">
//                     <h5 className="font-medium mb-3 text-gray-700 text-sm uppercase tracking-wide">Fichiers existants</h5>
//                     <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
//                       {intervention.fichiers.map((fichier) => (
//                         <div key={fichier._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
//                           <div className="flex items-center space-x-4 flex-1">
//                             <div className="p-2 bg-gray-100 rounded-lg">
//                               {getFileIcon(fichier.type)}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-gray-900 truncate">
//                                 {fichier.nom}
//                               </p>
//                               <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
//                                 <span>{formatFileSize(fichier.taille)}</span>
//                                 <span>•</span>
//                                 <span className="capitalize">{fichier.type}</span>
//                                 <span>•</span>
//                                 <span>Uploadé le {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}</span>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <button
//                               type="button"
//                               onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
//                               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
//                               title="Télécharger"
//                             >
//                               <Download size={18} />
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => handleFileDelete(fichier._id)}
//                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
//                               title="Supprimer"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Upload de nouveaux fichiers */}
//                 <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/50">
//                   <input
//                     key={fileInputKey}
//                     type="file"
//                     multiple
//                     onChange={handleFileSelect}
//                     className="hidden"
//                     id="file-upload"
//                     accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
//                   />
//                   <label htmlFor="file-upload" className="cursor-pointer block">
//                     <div className="text-center">
//                       <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
//                         <Upload size={28} className="text-blue-600" />
//                       </div>
//                       <p className="text-lg font-semibold text-gray-800 mb-2">
//                         Ajouter des fichiers
//                       </p>
//                       <p className="text-sm text-gray-600 max-w-md mx-auto">
//                         Glissez-déposez vos fichiers ou <span className="text-blue-600 font-semibold">parcourez</span> votre appareil
//                       </p>
//                       <p className="text-xs text-gray-500 mt-2">
//                         Formats supportés: JPG, PNG, PDF, DOC, XLS • Max 10MB par fichier
//                       </p>
//                     </div>
//                   </label>

//                   {/* Liste des fichiers sélectionnés */}
//                   {selectedFiles.length > 0 && (
//                     <div className="mt-6">
//                       <h6 className="font-semibold mb-3 text-gray-700">Fichiers sélectionnés ({selectedFiles.length})</h6>
//                       <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
//                         {selectedFiles.map((file, index) => (
//                           <div key={index} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-xl">
//                             <div className="flex items-center space-x-3 flex-1">
//                               <div className="p-2 bg-white rounded-lg border">
//                                 {getFileIcon(getFileType(file.name))}
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <p className="text-sm font-medium text-gray-900 truncate">
//                                   {file.name}
//                                 </p>
//                                 <p className="text-xs text-gray-500">
//                                   {formatFileSize(file.size)}
//                                 </p>
//                               </div>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => removeSelectedFile(index)}
//                               className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
//                               title="Retirer"
//                             >
//                               <X size={16} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                       <button
//                         type="button"
//                         onClick={handleFileUpload}
//                         disabled={uploading}
//                         className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-semibold"
//                       >
//                         {uploading ? (
//                           <>
//                             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                             Upload en cours...
//                           </>
//                         ) : (
//                           <>
//                             <Upload size={18} />
//                             Uploader {selectedFiles.length} fichier(s)
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Boutons d'action */}
//             <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-semibold"
//                 disabled={loading || uploading}
//               >
//                 Annuler
//               </button>
//               <button
//                 type="submit"
//                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//                 disabled={loading || uploading}
//               >
//                 {loading ? (
//                   <div className="flex items-center gap-2">
//                     <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                     Enregistrement...
//                   </div>
//                 ) : canOnlyUploadFiles ? (
//                   'Terminer l\'intervention'
//                 ) : intervention ? (
//                   'Mettre à jour'
//                 ) : (
//                   'Créer l\'intervention'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterventionModal;



// NOUVELLE VERSION DE CELLE CI-DESSUS APRÈS MODIFS




import React, { useState, useEffect } from 'react';
import {
  Upload,
  X,
  FileText,
  Image,
  Download,
  Trash2,
  Building,
  MapPin,
  Calendar,
  Clock,
  User,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { uploadFiles, deleteFile } from '../../services/fileService';

// Fonction helper pour formater la durée
const formatDuree = (dateDebut, dateFin) => {
  if (!dateDebut || !dateFin) return null;

  const dureeMs = new Date(dateFin) - new Date(dateDebut);
  const heures = Math.floor(dureeMs / (1000 * 60 * 60));
  const minutes = Math.floor((dureeMs % (1000 * 60 * 60)) / (1000 * 60));

  if (heures > 0) {
    return `${heures}h ${minutes}min`;
  }
  return `${minutes}min`;
};

const InterventionModal = ({
  intervention,
  techniciens,
  onSave,
  onClose,
  loading,
  currentUser,
  sitesByBuilding
}) => {
  const [formData, setFormData] = useState({
    titre: '',
    type: 'reparation',
    materiel: '',
    lieu: '',
    technicien: '',
    statut: 'planifiee',
    priorite: 'moyenne',
    dateDebut: '',
    heureDebut: '09:00',
    description: ''
  });

  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [selectedBatiment, setSelectedBatiment] = useState('');

  const isAdmin = currentUser?.role === 'admin';
  const isTechnician = !isAdmin;

  // Flux de finalisation (technicien qui passe en "terminée")
  const isTechnicianFinishing =
    isTechnician &&
    intervention &&
    (
      // Cas 1 : l'intervention originale est en_cours et on vise terminee (pré-rempli par la vue)
      (intervention.statut === 'en_cours' && formData.statut === 'terminee') ||
      // Cas 2 : flag explicite de finalisation injecté par la vue
      intervention._pendingStatusChange === true
    );

  // Règle d’UI : un technicien ne voit QUE l’upload
  const canOnlyUploadFiles = isTechnician;

  // Permissions réelles d’upload (admin OU technicien assigné)
  const userId = currentUser?._id ?? currentUser?.id;
  const techId = intervention?.technicien?._id ?? intervention?.technicien?.id;
  const canModifyFiles =
    isAdmin || (intervention && techId && userId && techId === userId);

  // Titre + sous-titre dynamiques (UX)
  const headerTitle = isAdmin
    ? (intervention ? "Modifier l'intervention" : "Nouvelle intervention")
    : (isTechnicianFinishing ? "Finaliser l'intervention" : "Ajouter des fichiers");

  const headerSubtitle = isAdmin
    ? (intervention ? "Mettez à jour les détails de l’intervention" : "Créez une nouvelle intervention")
    : (isTechnicianFinishing
        ? "Ajoutez les pièces justificatives (photos, rapports) puis validez la finalisation."
        : "Accès limité : vous pouvez uniquement ajouter ou supprimer des fichiers attachés.");

  useEffect(() => {
    if (intervention) {
      // Si finalisation en attente, forcer le statut "terminee" dans le formulaire (sans exposer le champ)
      const statutToUse = intervention._pendingStatusChange ? 'terminee' : intervention.statut;

      setFormData({
        titre: intervention.titre,
        type: intervention.type,
        materiel: intervention.materiel,
        lieu: intervention.lieu,
        technicien: intervention.technicien?._id || '',
        statut: statutToUse,
        priorite: intervention.priorite,
        dateDebut: intervention.dateDebut
          ? new Date(intervention.dateDebut).toISOString().split('T')[0]
          : '',
        heureDebut: intervention.heureDebut || '09:00',
        description: intervention.description || ''
      });

      if (intervention.lieu) {
        const batiment = getBatimentFromLieu(intervention.lieu);
        setSelectedBatiment(batiment);
      }
    } else {
      // Création : rien de spécifique
      setSelectedBatiment('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervention]);

  const getBatimentFromLieu = (lieuValue) => {
    for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
      const site = sites.find((s) => s.value === lieuValue);
      if (site) return batiment;
    }
    return '';
  };

  const getLieuLabel = (lieuValue) => {
    for (const [, sites] of Object.entries(sitesByBuilding)) {
      const site = sites.find((s) => s.value === lieuValue);
      if (site) return site.label;
    }
    return lieuValue;
  };

  const getBatiment = (lieuValue) => {
    for (const [batiment, sites] of Object.entries(sitesByBuilding)) {
      const site = sites.find((s) => s.value === lieuValue);
      if (site) return batiment;
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Un technicien ne peut pas modifier les champs.
    // Il peut soumettre UNIQUEMENT en flux de finalisation (pour enregistrer le statut "terminee").
    if (canOnlyUploadFiles && !isTechnicianFinishing) {
      return; // Pas de submit hors finalisation
    }

    if (isTechnicianFinishing) {
      await onSave({ statut: formData.statut }, intervention?._id);
    } else {
      await onSave(formData, intervention?._id);
    }
  };

  const handleBatimentChange = (e) => {
    const batiment = e.target.value;
    setSelectedBatiment(batiment);
    setFormData({ ...formData, lieu: '' });
  };

  const handleLieuChange = (e) => {
    setFormData({ ...formData, lieu: e.target.value });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);

    const oversizedFiles = files.filter((file) => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert('Certains fichiers dépassent la taille maximale de 10MB');
      return;
    }

    if (selectedFiles.length + files.length > 5) {
      alert('Maximum 5 fichiers autorisés par upload');
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleFileUpload = async () => {
    if (!selectedFiles.length || !intervention?._id) return;
    if (!canModifyFiles) {
      alert("Vous n'êtes pas autorisé à modifier les fichiers de cette intervention.");
      return;
    }

    setUploading(true);
    try {
      await uploadFiles(intervention._id, selectedFiles);
      setSelectedFiles([]);
      setFileInputKey(Date.now());
      // Pour rafraîchir l’intervention sans risquer d’écraser des champs (technicien)
      await onSave(isAdmin ? formData : {}, intervention._id);
    } catch (error) {
      console.error('Erreur upload:', error);
      alert(error.response?.data?.message || "Erreur lors de l'upload des fichiers");
    } finally {
      setUploading(false);
    }
  };

  const handleFileDelete = async (fileId) => {
    if (!intervention?._id) return;
    if (!canModifyFiles) {
      alert("Vous n'êtes pas autorisé à supprimer des fichiers sur cette intervention.");
      return;
    }

    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      try {
        await deleteFile(intervention._id, fileId);
        await onSave(isAdmin ? formData : {}, intervention._id);
      } catch (error) {
        console.error('Erreur suppression:', error);
        alert('Erreur lors de la suppression du fichier');
      }
    }
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image':
        return <Image size={18} className="text-blue-500" />;
      case 'document':
        return <FileText size={18} className="text-emerald-500" />;
      default:
        return <FileText size={18} className="text-gray-500" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
    if (['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(ext)) return 'document';
    return 'autre';
  };

  const getPriorityColor = (priorite) => {
    switch (priorite) {
      case 'haute':
        return 'border-red-200 bg-red-50 text-red-700';
      case 'moyenne':
        return 'border-yellow-200 bg-yellow-50 text-yellow-700';
      case 'basse':
        return 'border-green-200 bg-green-50 text-green-700';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  const getStatusIcon = (statut) => {
    switch (statut) {
      case 'terminee':
        return <CheckCircle2 size={16} className="text-green-600" />;
      case 'en_cours':
        return <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />;
      case 'planifiee':
        return <Calendar size={16} className="text-blue-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl border border-gray-200/80 shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-white">{headerTitle}</h3>
              <p className="text-blue-100 mt-1">{headerSubtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 group"
            >
              <X size={24} className="text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[calc(95vh-120px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Timeline si dates effectives */}
            {intervention && (intervention.dateDebutEffectif || intervention.dateFinEffective) && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={18} className="text-blue-600" />
                  <h4 className="text-sm font-semibold text-gray-700">
                    Suivi temporel de l'intervention
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      <strong>Planifié:</strong>{' '}
                      {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')} à{' '}
                      {intervention.heureDebut}
                    </span>
                  </div>

                  {intervention.dateDebutEffectif && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        <strong>Débuté:</strong>{' '}
                        {new Date(intervention.dateDebutEffectif).toLocaleDateString('fr-FR')} à{' '}
                        {intervention.heureDebutEffectif}
                      </span>
                    </div>
                  )}

                  {intervention.dateFinEffective && (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          <strong>Terminé:</strong>{' '}
                          {new Date(intervention.dateFinEffective).toLocaleDateString('fr-FR')} à{' '}
                          {intervention.heureFinEffective}
                        </span>
                      </div>

                      {intervention.dateDebutEffectif && (
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-purple-200">
                          <span className="text-sm font-bold text-purple-700">
                            ⏱️ Durée totale:{' '}
                            {formatDuree(intervention.dateDebutEffectif, intervention.dateFinEffective)}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Info technicien */}
            {canOnlyUploadFiles && (
              <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
                <div className="flex items-center gap-3">
                  <AlertCircle size={24} className="text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-yellow-900">
                      {isTechnicianFinishing
                        ? "Finalisation de l'intervention"
                        : "Accès limité au module de fichiers"}
                    </p>
                    <p className="text-sm text-yellow-800 mt-1">
                      {isTechnicianFinishing
                        ? "Ajoutez les fichiers nécessaires (photos, rapports) puis validez la finalisation."
                        : "Vous pouvez uniquement ajouter ou supprimer des fichiers. Les autres champs sont verrouillés."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Formulaire détaillé : visible UNIQUEMENT pour l'admin */}
            {!canOnlyUploadFiles && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Colonne gauche */}
                  <div className="space-y-6">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Titre de l'intervention
                      </label>
                      <input
                        type="text"
                        value={formData.titre}
                        onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                        required
                        disabled={loading}
                        placeholder="Ex: Réparation imprimante secteur administratif"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Type
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
                          disabled={loading}
                        >
                          <option value="reparation">Réparation</option>
                          <option value="diagnostic">Diagnostic</option>
                          <option value="verification">Vérification</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="installation">Installation</option>
                        </select>
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Priorité
                        </label>
                        <select
                          value={formData.priorite}
                          onChange={(e) => setFormData({ ...formData, priorite: e.target.value })}
                          className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 transition-all duration-200 shadow-sm hover:shadow-md ${getPriorityColor(
                            formData.priorite
                          )}`}
                          disabled={loading}
                        >
                          <option value="basse">Basse</option>
                          <option value="moyenne">Moyenne</option>
                          <option value="haute">Haute</option>
                        </select>
                      </div>
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        Équipement concerné
                      </label>
                      <input
                        type="text"
                        value={formData.materiel}
                        onChange={(e) => setFormData({ ...formData, materiel: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md"
                        required
                        disabled={loading}
                        placeholder="Ex: Imprimante HP LaserJet Pro"
                      />
                    </div>
                  </div>

                  {/* Colonne droite */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <Building size={16} className="text-indigo-600" />
                          Bâtiment
                        </label>
                        <select
                          value={selectedBatiment}
                          onChange={handleBatimentChange}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
                          required
                          disabled={loading}
                        >
                          <option value="">Choisir un bâtiment</option>
                          {Object.keys(sitesByBuilding).map((batiment) => (
                            <option key={batiment} value={batiment}>
                              {batiment}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <MapPin size={16} className="text-emerald-600" />
                          Localisation
                        </label>
                        <select
                          value={formData.lieu}
                          onChange={handleLieuChange}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
                          required
                          disabled={loading || !selectedBatiment}
                        >
                          <option value="">Sélectionner un lieu</option>
                          {selectedBatiment &&
                            sitesByBuilding[selectedBatiment]?.map((site) => (
                              <option key={site.value} value={site.value}>
                                {site.label}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <Calendar size={16} className="text-blue-600" />
                          Date
                        </label>
                        <input
                          type="date"
                          value={formData.dateDebut}
                          onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                          required
                          disabled={loading}
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <Clock size={16} className="text-purple-600" />
                          Heure
                        </label>
                        <input
                          type="time"
                          value={formData.heureDebut}
                          onChange={(e) => setFormData({ ...formData, heureDebut: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        <User size={16} className="text-cyan-600" />
                        Technicien assigné
                      </label>
                      <select
                        value={formData.technicien}
                        onChange={(e) => setFormData({ ...formData, technicien: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 shadow-sm hover:shadow-md"
                        required
                        disabled={loading}
                      >
                        <option value="">Assigner un technicien</option>
                        {techniciens.map((tech) => (
                          <option key={tech._id} value={tech._id}>
                            {tech.prenom} {tech.nom} ({tech.role})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                        {getStatusIcon(formData.statut)}
                        Statut
                      </label>
                      <select
                        value={formData.statut}
                        onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
                        disabled={loading}
                      >
                        <option value="planifiee">Planifiée</option>
                        <option value="en_cours">En cours</option>
                        <option value="terminee">Terminée</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    Description détaillée
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
                    rows="4"
                    disabled={loading}
                    placeholder="Décrivez en détail l'intervention à réaliser, les problèmes rencontrés, les actions à mener..."
                  />
                </div>
              </>
            )}

            {/* SECTION FICHIERS — Visible pour admin ET pour technicien (upload-only) */}
            {intervention && canModifyFiles && (
              <div className={`pt-6 mt-6 ${!canOnlyUploadFiles ? 'border-t border-gray-200' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {isTechnician ? 'Ajouter/gestion des fichiers' : 'Fichiers attachés'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {isTechnician
                        ? "Photos, rapports d'intervention, documents (max 10MB/fichier)"
                        : 'Documents, photos et supports'}
                    </p>
                  </div>
                </div>

                {/* Fichiers existants */}
                {intervention.fichiers && intervention.fichiers.length > 0 && (
                  <div className="mb-6">
                    <h5 className="font-medium mb-3 text-gray-700 text-sm uppercase tracking-wide">
                      Fichiers existants
                    </h5>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                      {intervention.fichiers.map((fichier) => (
                        <div
                          key={fichier._id}
                          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              {getFileIcon(fichier.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">{fichier.nom}</p>
                              <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
                                <span>{formatFileSize(fichier.taille)}</span>
                                <span>•</span>
                                <span className="capitalize">{fichier.type}</span>
                                <span>•</span>
                                <span>
                                  Uploadé le {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Télécharger"
                            >
                              <Download size={18} />
                            </button>
                            {/* Suppression autorisée si permission */}
                            {canModifyFiles && (
                              <button
                                type="button"
                                onClick={() => handleFileDelete(fichier._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                title="Supprimer"
                              >
                                <Trash2 size={18} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload de nouveaux fichiers */}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/50">
                  <input
                    key={fileInputKey}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                        <Upload size={28} className="text-blue-600" />
                      </div>
                      <p className="text-lg font-semibold text-gray-800 mb-2">Ajouter des fichiers</p>
                      <p className="text-sm text-gray-600 max-w-md mx-auto">
                        Glissez-déposez vos fichiers ou{' '}
                        <span className="text-blue-600 font-semibold">parcourez</span> votre appareil
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Formats supportés: JPG, PNG, PDF, DOC, XLS • Max 10MB par fichier
                      </p>
                    </div>
                  </label>

                  {/* Liste des fichiers sélectionnés */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-6">
                      <h6 className="font-semibold mb-3 text-gray-700">
                        Fichiers sélectionnés ({selectedFiles.length})
                      </h6>
                      <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                        {selectedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-xl"
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <div className="p-2 bg-white rounded-lg border">
                                {getFileIcon(getFileType(file.name))}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeSelectedFile(index)}
                              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                              title="Retirer"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleFileUpload}
                        disabled={uploading}
                        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-semibold"
                      >
                        {uploading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            Upload en cours...
                          </>
                        ) : (
                          <>
                            <Upload size={18} />
                            Uploader {selectedFiles.length} fichier(s)
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Boutons d'action */}
            <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-semibold"
                disabled={loading || uploading}
              >
                Annuler
              </button>

              {/* Submit visible :
                    - Admin : toujours (création/modification)
                    - Technicien : UNIQUEMENT en flux de finalisation */}
              {(isAdmin || isTechnicianFinishing) && (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  disabled={loading || uploading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Enregistrement...
                    </div>
                  ) : isTechnicianFinishing ? (
                    "Terminer l'intervention"
                  ) : intervention ? (
                    'Mettre à jour'
                  ) : (
                    'Créer l’intervention'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InterventionModal;
