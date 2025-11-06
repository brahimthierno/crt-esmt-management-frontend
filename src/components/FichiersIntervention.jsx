import React, { useCallback } from 'react';
import { Upload, X, FileIcon, Download } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const FichiersIntervention = ({ 
  intervention, 
  onUpload, 
  onDelete, 
  canEdit = false
}) => {
  const handleFileChange = useCallback(async (event) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('files', file);
    });
    
    await onUpload(formData);
    event.target.value = null; // Réinitialiser l'input
  }, [onUpload]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Zone d'upload */}
      {canEdit && (
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
              </p>
              <p className="text-xs text-gray-500">
                PDF, Word, Excel ou images (max. 5MB)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
            />
          </label>
        </div>
      )}

      {/* Liste des fichiers */}
      <div className="space-y-2">
        {intervention.fichiers && intervention.fichiers.map((fichier, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white rounded-lg border"
          >
            <div className="flex items-center space-x-3">
              <FileIcon className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">{fichier.nom}</p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(fichier.taille)} • {new Date(fichier.dateUpload).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  // Construire l'URL de téléchargement côté backend
                  const path = fichier.chemin?.startsWith('/') ? fichier.chemin.slice(1) : fichier.chemin;
                  const url = `${API_BASE}/${path}`;
                  window.open(url, '_blank');
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
                title="Télécharger"
              >
                <Download className="w-4 h-4" />
              </button>
              
              {canEdit && (
                <button
                  onClick={() => onDelete(index)}
                  className="p-1 text-red-500 hover:text-red-700"
                  title="Supprimer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        {(!intervention.fichiers || intervention.fichiers.length === 0) && (
          <div className="text-center py-4 text-gray-500">
            Aucun fichier attaché
          </div>
        )}
      </div>
    </div>
  );
};

export default FichiersIntervention;