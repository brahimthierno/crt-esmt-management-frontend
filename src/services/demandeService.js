import api from './api';

// ✅ Récupérer la configuration (équipements et bâtiments)
export const getConfigDemande = async () => {
  const response = await api.get('/demandes/config');
  return response.data.data;
};

// Créer une demande
export const createDemande = async (data) => {
  const response = await api.post('/demandes/create', data);
  return response.data;
};

// Suivre une demande
export const suivreDemande = async (numeroReference) => {
  const response = await api.get(`/demandes/suivi/${numeroReference}`);
  return response.data;
};

// Lister toutes les demandes (admin)
export const getDemandes = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.statut) params.append('statut', filters.statut);
  if (filters.priorite) params.append('priorite', filters.priorite);
  
  const response = await api.get(`/demandes/list?${params.toString()}`);
  return response.data;
};

// Examiner une demande
export const examinerDemande = async (id) => {
  const response = await api.put(`/demandes/examiner/${id}`);
  return response.data;
};

// Convertir une demande en intervention
export const convertirDemande = async (id) => {
  const response = await api.post(`/demandes/convertir/${id}`);
  return response.data;
};

// Rejeter une demande
export const rejeterDemande = async (id, motifRejet) => {
  const response = await api.post(`/demandes/rejeter/${id}`, { motifRejet });
  return response.data;
};

// Obtenir les statistiques des demandes
export const getStatsDemandes = async () => {
  const response = await api.get('/demandes/stats/count');
  return response.data;
};