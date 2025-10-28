import api from './api';

// Obtenir tout le stock
export const getStock = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.categorie) params.append('categorie', filters.categorie);
  if (filters.stockFaible) params.append('stockFaible', 'true');
  
  const response = await api.get(`/stock?${params.toString()}`);
  return response.data.data;
};

// Obtenir un matériel par ID
export const getMateriel = async (id) => {
  const response = await api.get(`/stock/${id}`);
  return response.data.data;
};

// Créer un matériel
export const createMateriel = async (data) => {
  const response = await api.post('/stock', data);
  return response.data.data;
};

// Mettre à jour un matériel
export const updateMateriel = async (id, data) => {
  const response = await api.put(`/stock/${id}`, data);
  return response.data.data;
};

// Supprimer un matériel
export const deleteMateriel = async (id) => {
  const response = await api.delete(`/stock/${id}`);
  return response.data;
};

// Obtenir les statistiques du stock
export const getStockStats = async () => {
  const response = await api.get('/stock/stats/global');
  return response.data.data;
};