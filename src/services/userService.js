// import api from './api';

// // Obtenir tous les utilisateurs
// export const getUsers = async () => {
//   const response = await api.get('/users');
//   return response.data.data;
// };

// // Obtenir un utilisateur par ID
// export const getUser = async (id) => {
//   const response = await api.get(`/users/${id}`);
//   return response.data.data;
// };

// // Créer un utilisateur
// export const createUser = async (data) => {
//   const response = await api.post('/users', data);
//   return response.data.data;
// };

// // Mettre à jour un utilisateur
// export const updateUser = async (id, data) => {
//   const response = await api.put(`/users/${id}`, data);
//   return response.data.data;
// };

// // Supprimer un utilisateur
// export const deleteUser = async (id) => {
//   const response = await api.delete(`/users/${id}`);
//   return response.data;
// };

// // Obtenir les statistiques des techniciens
// export const getTechniciensStats = async () => {
//   const response = await api.get('/users/stats/techniciens');
//   return response.data.data;
// };

// // Changer le mot de passe
// export const changePassword = async (id, currentPassword, newPassword) => {
//   const response = await api.put(`/users/${id}/password`, {
//     currentPassword,
//     newPassword
//   });
//   return response.data;
// };


// NOUVELLE VERSION POUR QUE LE USER TECHNICIEN AUSSI PUISSE MODIFIER SON PROFIL

/*
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

// Mettre à jour son propre profil
export const updateOwnProfile = async (data) => {
  const response = await api.put('/users/profile/me', data);
  return response.data.data;
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
*/



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

// ✅ MIS À JOUR : Mettre à jour son propre profil AVEC PHOTO
export const updateOwnProfile = async (data) => {
  // Vérifier si on a un fichier photo
  if (data.photo && data.photo instanceof File) {
    // Utiliser FormData pour l'upload de fichier
    const formData = new FormData();
    
    // Ajouter les champs texte
    if (data.nom) formData.append('nom', data.nom);
    if (data.prenom) formData.append('prenom', data.prenom);
    if (data.username) formData.append('username', data.username);
    if (data.password) formData.append('password', data.password);
    
    // Ajouter le fichier photo
    formData.append('photo', data.photo);
    
    const response = await api.put('/users/profile/me', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } else {
    // Pas de fichier, utiliser JSON normal
    const response = await api.put('/users/profile/me', data);
    return response.data.data;
  }
};

// ✅ NOUVELLE FONCTION : Supprimer la photo de profil
export const deleteProfilePhoto = async () => {
  const response = await api.delete('/users/profile/photo');
  return response.data.data;
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

// ✅ NOUVELLE FONCTION : Obtenir l'URL complète de la photo
export const getProfilePhotoUrl = (photoPath) => {
  if (!photoPath) return null;
  
  // Si c'est déjà une URL complète
  if (photoPath.startsWith('http')) {
    return photoPath;
  }
  
  // Si c'est un chemin relatif, construire l'URL complète
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  return `${baseUrl}${photoPath}`;
};