import React, { useState } from 'react';
import { X, Upload, FileText, Image, Download, Trash2, AlertCircle } from 'lucide-react';
import { uploadFiles, deleteFile } from '../../services/fileService';

const FileUploadModal = ({ intervention, onClose, onFileUploaded, currentUser }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert('Certains fichiers dépassent la taille maximale de 10MB');
      return;
    }

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
      setFileInputKey(Date.now());
      
      // Callback pour recharger les données
      if (onFileUploaded) {
        await onFileUploaded(intervention._id);
      }
      
      alert('Fichiers uploadés avec succès !');
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
        
        // Callback pour recharger les données
        if (onFileUploaded) {
          await onFileUploaded(intervention._id);
        }
        
        alert('Fichier supprimé avec succès !');
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

  // Vérifier les permissions
  const canModify = currentUser?.role === 'admin' || 
    (intervention && intervention.technicien?._id === currentUser?.id);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Gestion des Fichiers
              </h3>
              <p className="text-blue-100 text-sm">
                {intervention?.titre}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  intervention?.statut === 'terminee' 
                    ? 'bg-green-100 text-green-800' 
                    : intervention?.statut === 'en_cours'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {intervention?.statut === 'terminee' ? 'Terminée' :
                   intervention?.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
                </span>
                <span className="text-blue-100 text-xs">
                  📍 {intervention?.lieu}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          {/* Message d'information si pas de permissions */}
          {!canModify && (
            <div className="mb-6 p-4 bg-orange-50 border-2 border-orange-300 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertCircle size={24} className="text-orange-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-orange-900">Accès en lecture seule</p>
                  <p className="text-sm text-orange-800 mt-1">
                    Vous pouvez consulter les fichiers mais pas les modifier.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Fichiers existants */}
          {intervention?.fichiers && intervention.fichiers.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Fichiers existants ({intervention.fichiers.length})
              </h4>
              <div className="space-y-3">
                {intervention.fichiers.map((fichier) => (
                  <div 
                    key={fichier._id} 
                    className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="p-2 bg-white rounded-lg border border-gray-300">
                        {getFileIcon(fichier.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {fichier.nom}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
                          <span>{formatFileSize(fichier.taille)}</span>
                          <span>•</span>
                          <span className="capitalize">{fichier.type}</span>
                          <span>•</span>
                          <span>Uploadé le {new Date(fichier.dateUpload).toLocaleDateString('fr-FR')}</span>
                          {fichier.uploadedBy && (
                            <>
                              <span>•</span>
                              <span>par {fichier.uploadedBy.prenom} {fichier.uploadedBy.nom}</span>
                            </>
                          )}
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
                      {canModify && (
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

          {intervention?.fichiers?.length === 0 && (
            <div className="mb-6 text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
              <FileText size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500 font-medium">Aucun fichier attaché</p>
              <p className="text-sm text-gray-400 mt-1">
                {canModify ? 'Ajoutez des fichiers ci-dessous' : 'Aucun document disponible'}
              </p>
            </div>
          )}

          {/* Upload de nouveaux fichiers (seulement si permissions) */}
          {canModify && (
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Upload size={20} className="text-purple-600" />
                Ajouter des fichiers
              </h4>
              
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
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      Sélectionner des fichiers
                    </p>
                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                      Glissez-déposez vos fichiers ou <span className="text-blue-600 font-semibold">parcourez</span> votre appareil
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
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {selectedFiles.map((file, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-xl"
                        >
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="p-2 bg-white rounded-lg border border-blue-300">
                              {getFileIcon(getFileType(file.name))}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(file.size)}
                              </p>
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
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;