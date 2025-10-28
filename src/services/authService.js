import api from './api';

// Connexion
export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  if (response.data.success) {
    const { token, ...user } = response.data.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data.data;
  }
  throw new Error('Échec de la connexion');
};

// Déconnexion
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Obtenir l'utilisateur connecté
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data.data;
};

// Vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Obtenir l'utilisateur depuis le localStorage
export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};