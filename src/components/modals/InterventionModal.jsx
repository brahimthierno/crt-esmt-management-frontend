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

import React, { useState, useEffect } from 'react';
import { Upload, X, FileText, Image, Download, Trash2 } from 'lucide-react';
import { uploadFiles, deleteFile } from '../../services/fileService';

const InterventionModal = ({ intervention, techniciens, onSave, onClose, loading, currentUser }) => {
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

  useEffect(() => {
    if (intervention) {
      setFormData({
        titre: intervention.titre,
        type: intervention.type,
        materiel: intervention.materiel,
        lieu: intervention.lieu,
        technicien: intervention.technicien?._id || '',
        statut: intervention.statut,
        priorite: intervention.priorite,
        dateDebut: intervention.dateDebut ? new Date(intervention.dateDebut).toISOString().split('T')[0] : '',
        heureDebut: intervention.heureDebut || '09:00',
        description: intervention.description || ''
      });
    }
  }, [intervention]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData, intervention?._id);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    // Vérifier la taille des fichiers
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert('Certains fichiers dépassent la taille maximale de 10MB');
      return;
    }

    // Vérifier le nombre total de fichiers
    if (selectedFiles.length + files.length > 5) {
      alert('Maximum 5 fichiers autorisés par upload');
      return;
    }

    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileUpload = async () => {
    if (!selectedFiles.length || !intervention?._id) return;

    setUploading(true);
    try {
      await uploadFiles(intervention._id, selectedFiles);
      setSelectedFiles([]);
      setFileInputKey(Date.now()); // Reset file input
      // Recharger les données de l'intervention
      onSave(formData, intervention._id);
    } catch (error) {
      console.error('Erreur upload:', error);
      alert(error.response?.data?.message || 'Erreur lors de l\'upload des fichiers');
    } finally {
      setUploading(false);
    }
  };

  const handleFileDelete = async (fileId) => {
    if (!intervention?._id) return;

    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      try {
        await deleteFile(intervention._id, fileId);
        // Recharger les données
        onSave(formData, intervention._id);
      } catch (error) {
        console.error('Erreur suppression:', error);
        alert('Erreur lors de la suppression du fichier');
      }
    }
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image': 
        return <Image size={18} className="text-blue-600" />;
      case 'document': 
        return <FileText size={18} className="text-green-600" />;
      default: 
        return <FileText size={18} className="text-gray-600" />;
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

  // Vérifier si l'utilisateur peut modifier les fichiers
  const canModifyFiles = currentUser?.role === 'admin' || 
    (intervention && intervention.technicien?._id === currentUser?.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">
          {intervention ? 'Modifier l\'intervention' : 'Nouvelle intervention'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Titre</label>
            <input
              type="text"
              value={formData.titre}
              onChange={(e) => setFormData({...formData, titre: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="reparation">Réparation</option>
                <option value="diagnostic">Diagnostic</option>
                <option value="verification">Vérification</option>
                <option value="maintenance">Maintenance</option>
                <option value="installation">Installation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Priorité</label>
              <select
                value={formData.priorite}
                onChange={(e) => setFormData({...formData, priorite: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="basse">Basse</option>
                <option value="moyenne">Moyenne</option>
                <option value="haute">Haute</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Matériel</label>
              <input
                type="text"
                value={formData.materiel}
                onChange={(e) => setFormData({...formData, materiel: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Lieu</label>
              <input
                type="text"
                value={formData.lieu}
                onChange={(e) => setFormData({...formData, lieu: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={formData.dateDebut}
                onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Heure</label>
              <input
                type="time"
                value={formData.heureDebut}
                onChange={(e) => setFormData({...formData, heureDebut: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Technicien</label>
            <select
              value={formData.technicien}
              onChange={(e) => setFormData({...formData, technicien: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading || (currentUser?.role !== 'admin' && intervention)}
            >
              <option value="">Sélectionner un technicien</option>
              {techniciens.map(tech => (
                <option key={tech._id} value={tech._id}>
                  {tech.prenom} {tech.nom} ({tech.role})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Statut</label>
            <select
              value={formData.statut}
              onChange={(e) => setFormData({...formData, statut: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              <option value="planifiee">Planifiée</option>
              <option value="en_cours">En cours</option>
              <option value="terminee">Terminée</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              disabled={loading}
            />
          </div>

          {/* SECTION FICHIERS - Seulement en mode édition */}
          {intervention && canModifyFiles && (
            <div className="border-t pt-4 mt-4">
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Fichiers attachés
              </h4>

              {/* Liste des fichiers existants */}
              {intervention.fichiers && intervention.fichiers.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-medium mb-2 text-gray-700">Fichiers existants:</h5>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {intervention.fichiers.map((fichier) => (
                      <div key={fichier._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center space-x-3 flex-1">
                          {getFileIcon(fichier.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {fichier.nom}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(fichier.taille)} • 
                              Uploadé par {fichier.uploadedBy?.prenom} {fichier.uploadedBy?.nom} • 
                              {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                            title="Télécharger"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFileDelete(fichier._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload de nouveaux fichiers */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
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
                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-sm text-gray-600 font-medium">
                      Cliquez pour sélectionner des fichiers
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Formats: images, PDF, Word, Excel • Max 10MB par fichier • Max 5 fichiers
                    </p>
                  </div>
                </label>

                {/* Liste des fichiers sélectionnés */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <h6 className="font-medium mb-2 text-gray-700">Fichiers sélectionnés:</h6>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded border">
                          <div className="flex items-center space-x-2 flex-1">
                            {getFileIcon(getFileType(file.name))}
                            <span className="text-sm truncate flex-1">{file.name}</span>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {formatFileSize(file.size)}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSelectedFile(index)}
                            className="p-1 text-red-600 hover:text-red-800"
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
                      className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Upload en cours...
                        </>
                      ) : (
                        <>
                          <Upload size={16} />
                          Uploader {selectedFiles.length} fichier(s)
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message si pas autorisé à modifier les fichiers */}
          {intervention && !canModifyFiles && intervention.fichiers && intervention.fichiers.length > 0 && (
            <div className="border-t pt-4 mt-4">
              <h4 className="text-lg font-semibold mb-3">Fichiers attachés</h4>
              <div className="space-y-2">
                {intervention.fichiers.map((fichier) => (
                  <div key={fichier._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(fichier.type)}
                      <span className="text-sm">{fichier.nom}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => window.open(`http://localhost:5000${fichier.url}`, '_blank')}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                      title="Télécharger"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50"
              disabled={loading || uploading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || uploading}
            >
              {loading ? 'Enregistrement...' : intervention ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterventionModal;