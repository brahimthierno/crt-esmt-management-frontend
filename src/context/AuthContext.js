
// VERSION POUR LE RECHARGEMENT DES DONNEES UTILISATEUR APRES MODIFICATION DU PROFIL version 2

import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, getStoredUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger l'utilisateur depuis le localStorage au démarrage
    const user = getStoredUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const userData = await loginService(username, password);
      setCurrentUser(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur de connexion' 
      };
    }
  };

  const logout = () => {
    logoutService();
    setCurrentUser(null);
  };

  // ✅ FONCTION MISE À JOUR : Accepte un objet user OU recharge depuis le serveur
  const updateCurrentUser = async (updatedUserData = null) => {
    try {
      // Si on passe directement les données, les utiliser
      if (updatedUserData) {
        console.log('🔄 Mise à jour directe de currentUser:', updatedUserData);
        setCurrentUser(updatedUserData);
        localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
        return { success: true };
      }
      
      // Sinon, recharger depuis le serveur
      if (!currentUser?._id) {
        return { success: false, message: 'Aucun utilisateur connecté' };
      }

      console.log('🔄 Rechargement de currentUser depuis le serveur...');
      const response = await fetch(`http://localhost:5000/api/users/${currentUser._id}`);
      
      if (response.ok) {
        const freshUser = await response.json();
        console.log('✅ Données utilisateur rechargées:', freshUser);
        
        // Mettre à jour l'état local
        setCurrentUser(freshUser);
        // Mettre à jour le localStorage
        localStorage.setItem('currentUser', JSON.stringify(freshUser));
        
        return { success: true };
      } else {
        console.error('❌ Erreur HTTP:', response.status);
        return { success: false, message: 'Erreur lors du rechargement' };
      }
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour:', error);
      return { success: false, message: error.message };
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
    updateCurrentUser  // ✅ Fonction flexible pour mettre à jour currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
