import api from './api';

// Obtenir tous les emprunts
export const getEmprunts = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.statut) params.append('statut', filters.statut);
  if (filters.materiel) params.append('materiel', filters.materiel);
  
  const response = await api.get(`/emprunts?${params.toString()}`);
  return response.data.data;
};

// Obtenir un emprunt par ID
export const getEmprunt = async (id) => {
  const response = await api.get(`/emprunts/${id}`);
  return response.data.data;
};

// Créer un emprunt
export const createEmprunt = async (data) => {
  const response = await api.post('/emprunts', data);
  return response.data.data;
};

// Retourner un emprunt
export const retournerEmprunt = async (id, remarques = '') => {
  const response = await api.put(`/emprunts/${id}/retour`, { remarques });
  return response.data.data;
};

// Mettre à jour un emprunt
export const updateEmprunt = async (id, data) => {
  const response = await api.put(`/emprunts/${id}`, data);
  return response.data.data;
};

// Supprimer un emprunt
export const deleteEmprunt = async (id) => {
  const response = await api.delete(`/emprunts/${id}`);
  return response.data;
};

// Obtenir les emprunts en retard
export const getEmpruntsEnRetard = async () => {
  const response = await api.get('/emprunts/retards/liste');
  return response.data.data;
};