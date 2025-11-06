import api from './api';

export const uploadFiles = async (interventionId, files) => {
  const formData = new FormData();
  
  // Ajouter chaque fichier au FormData
  files.forEach(file => {
    formData.append('fichiers', file);
  });

  const response = await api.post(`/interventions/${interventionId}/fichiers`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const deleteFile = async (interventionId, fileId) => {
  const response = await api.delete(`/interventions/${interventionId}/fichiers/${fileId}`);
  return response.data;
};

export const downloadFile = async (filename) => {
  const response = await api.get(`/interventions/uploads/${filename}`, {
    responseType: 'blob'
  });
  
  // Créer un URL pour le téléchargement
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
  
  return response.data;
};