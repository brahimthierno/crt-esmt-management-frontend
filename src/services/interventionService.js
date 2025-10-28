import api from './api';

// Obtenir toutes les interventions
export const getInterventions = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.statut) params.append('statut', filters.statut);
  if (filters.dateDebut) params.append('dateDebut', filters.dateDebut);
  if (filters.priorite) params.append('priorite', filters.priorite);
  
  const response = await api.get(`/interventions?${params.toString()}`);
  return response.data.data;
};

// Obtenir une intervention par ID
export const getIntervention = async (id) => {
  const response = await api.get(`/interventions/${id}`);
  return response.data.data;
};

// Créer une intervention
export const createIntervention = async (data) => {
  const response = await api.post('/interventions', data);
  return response.data.data;
};

// Mettre à jour une intervention
export const updateIntervention = async (id, data) => {
  const response = await api.put(`/interventions/${id}`, data);
  return response.data.data;
};

// Supprimer une intervention
export const deleteIntervention = async (id) => {
  const response = await api.delete(`/interventions/${id}`);
  return response.data;
};

// Ajouter un commentaire
export const addCommentaire = async (id, texte) => {
  const response = await api.post(`/interventions/${id}/commentaires`, { texte });
  return response.data.data;
};