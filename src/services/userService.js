import api from './api';

// Obtenir tous les utilisateurs
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data.data;
};

// Obtenir un utilisateur par ID
export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data.data;
};

// Créer un utilisateur
export const createUser = async (data) => {
  const response = await api.post('/users', data);
  return response.data.data;
};

// Mettre à jour un utilisateur
export const updateUser = async (id, data) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data.data;
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// Obtenir les statistiques des techniciens
export const getTechniciensStats = async () => {
  const response = await api.get('/users/stats/techniciens');
  return response.data.data;
};

// Changer le mot de passe
export const changePassword = async (id, currentPassword, newPassword) => {
  const response = await api.put(`/users/${id}/password`, {
    currentPassword,
    newPassword
  });
  return response.data;
};