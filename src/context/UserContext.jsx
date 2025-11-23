// import React, { createContext, useContext, useState, useEffect } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children, initialUser, onLogout }) => {
//   const [currentUser, setCurrentUser] = useState(() => {
//     // Initialiser avec l'utilisateur fourni ou celui du localStorage
//     if (initialUser) {
//       return initialUser;
//     }
//     const savedUser = localStorage.getItem('currentUser');
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   // Sauvegarder l'utilisateur dans localStorage quand il change
//   useEffect(() => {
//     if (currentUser) {
//       localStorage.setItem('currentUser', JSON.stringify(currentUser));
//       console.log('💾 Utilisateur sauvegardé dans localStorage:', currentUser);
//     } else {
//       localStorage.removeItem('currentUser');
//     }
//   }, [currentUser]);

//   // Mettre à jour l'utilisateur
//   const updateUser = (userData) => {
//     console.log('🔄 Mise à jour de l\'utilisateur:', userData);
//     setCurrentUser(userData);
//   };

//   // Mettre à jour partiellement l'utilisateur
//   const updateUserPartial = (partialData) => {
//     console.log('🔄 Mise à jour partielle de l\'utilisateur:', partialData);
//     setCurrentUser(prev => ({
//       ...prev,
//       ...partialData
//     }));
//   };

//   // Déconnexion
//   const logout = () => {
//     console.log('👋 Déconnexion de l\'utilisateur');
//     setCurrentUser(null);
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('token');
    
//     // ✅ Appeler la fonction de déconnexion du AuthContext si elle existe
//     if (onLogout && typeof onLogout === 'function') {
//       onLogout();
//     }
//   };

//   return (
//     <UserContext.Provider value={{ 
//       currentUser, 
//       updateUser, 
//       updateUserPartial,
//       logout,
//       setCurrentUser 
//     }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser doit être utilisé dans un UserProvider');
//   }
//   return context;
// };


// NOUVELLE VERSION POUR LA MODIFIACTION DU PROFIL PERSISTE DANS LE HEADER



import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children, initialUser, onLogout }) => {
  const [currentUser, setCurrentUser] = useState(initialUser);

  // ✅ Synchroniser avec initialUser à chaque changement
  useEffect(() => {
    console.log('🔄 UserContext - Synchronisation avec initialUser:', initialUser);
    setCurrentUser(initialUser);
  }, [initialUser]);

  // Mettre à jour l'utilisateur
  const updateUser = (userData) => {
    console.log('🔄 Mise à jour de l\'utilisateur:', userData);
    setCurrentUser(userData);
  };

  // Mettre à jour partiellement l'utilisateur
  const updateUserPartial = (partialData) => {
    console.log('🔄 Mise à jour partielle de l\'utilisateur:', partialData);
    setCurrentUser(prev => ({
      ...prev,
      ...partialData
    }));
  };

  // Déconnexion
  const logout = () => {
    console.log('👋 Déconnexion de l\'utilisateur');
    setCurrentUser(null);
    
    // ✅ Appeler la fonction de déconnexion du AuthContext
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      updateUser, 
      updateUserPartial,
      logout,
      setCurrentUser 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser doit être utilisé dans un UserProvider');
  }
  return context;
};