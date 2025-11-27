import React, { useState, useRef, useEffect } from 'react';
import { Wrench, Settings, User, LogOut, Bell, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { getProfilePhotoUrl } from '../../services/userService';

const Header = ({ setActiveView, showUserMenu, setShowUserMenu }) => {
  const [internalShowUserMenu, setInternalShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { currentUser, logout } = useUser();

  const actualShowUserMenu = showUserMenu !== undefined ? showUserMenu : internalShowUserMenu;
  const actualSetShowUserMenu = setShowUserMenu || setInternalShowUserMenu;

  useEffect(() => {
    console.log('🔄 Header - currentUser mis à jour:', currentUser);
  }, [currentUser]);

  // Notifications statiques pour la démo
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'demande',
      titre: 'Nouvelle demande reçue',
      temps: 'Il y a 5 minutes',
      couleur: 'blue'
    },
    {
      id: 2,
      type: 'intervention',
      titre: 'Intervention assignée',
      temps: 'Il y a 30 minutes',
      couleur: 'green'
    },
    {
      id: 3,
      type: 'retard',
      titre: 'Intervention en retard',
      temps: 'Il y a 1 heure',
      couleur: 'yellow'
    }
  ]);

  // Fermer le menu quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        actualSetShowUserMenu(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [actualSetShowUserMenu]);

  const handleUserMenuToggle = () => {
    actualSetShowUserMenu(!actualShowUserMenu);
  };

  const handleLogout = () => {
    actualSetShowUserMenu(false);
    logout();
  };

  const handleSettingsClick = () => {
    actualSetShowUserMenu(false);
    if (setActiveView) {
      setActiveView('settings');
    }
  };

  const handleProfileClick = () => {
    actualSetShowUserMenu(false);
    if (setActiveView) {
      setActiveView('profile');
    }
  };

  const handleNotificationClick = (notificationId) => {
    console.log('Notification cliquée:', notificationId);
    setShowNotifications(false);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // ✅ FONCTION POUR AFFICHER L'AVATAR (PHOTO OU INITIALES)
  const renderUserAvatar = (size = 'medium', showInMenu = false) => {
    const photoUrl = currentUser?.photo ? getProfilePhotoUrl(currentUser.photo) : null;
    
    // Tailles différentes selon l'emplacement
    const sizeClasses = {
      small: 'w-8 h-8 text-sm',
      medium: 'w-10 h-10 text-base',
      large: 'w-12 h-12 text-lg'
    };

    const sizeClass = sizeClasses[size] || sizeClasses.medium;

    if (photoUrl) {
      return (
        <img 
          src={photoUrl} 
          alt={`${currentUser.prenom} ${currentUser.nom}`}
          className={`${sizeClass} rounded-full object-cover border-2 border-white dark:border-dark-700 shadow-sm`}
          onError={(e) => {
            // Si l'image ne charge pas, afficher les initiales
            e.target.style.display = 'none';
            const parent = e.target.parentElement;
            const fallback = parent.querySelector('.avatar-fallback');
            if (fallback) fallback.style.display = 'flex';
          }}
        />
      );
    }

    // Fallback aux initiales si pas de photo
    return (
      <div className={`${sizeClass} bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm`}>
        <span className="avatar-fallback">
          {currentUser?.nom?.[0]?.toUpperCase() || 'U'}
        </span>
      </div>
    );
  };

  if (!currentUser) {
    console.warn('⚠️ Header - currentUser est null');
  }

  return (
    <header className="bg-white dark:bg-dark-800 shadow-md border-b border-gray-200 dark:border-dark-600 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo et titre */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-dark-700 border-2 border-blue-300 dark:border-blue-600 shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden p-1.5">
              <img 
                src="/images/logo-crt.png" 
                alt="Logo CRT-ESMT"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 filter brightness-95 dark:brightness-125"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-blue-200 dark:bg-blue-800 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 -z-10"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
              CRT-ESMT
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
              Centre des Ressources Techniques
            </p>
          </div>
        </div>

        {/* Section droite - Notifications et Menu utilisateur */}
        <div className="flex items-center gap-4" ref={menuRef}>
          <ThemeToggle />

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors duration-200"
              title="Notifications"
            >
              <Bell className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-dark-600 transition-colors duration-200">
                <div className="p-4 border-b border-gray-200 dark:border-dark-600">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 dark:text-white transition-colors duration-200">Notifications ({notifications.length})</h3>
                    {notifications.length > 0 && (
                      <button
                        onClick={() => setNotifications([])}
                        className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold transition-colors duration-200"
                      >
                        Effacer tout
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                      <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Aucune notification</p>
                    </div>
                  ) : (
                    <div className="p-4 space-y-3">
                      {notifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif.id)}
                          className={`p-3 rounded-lg border-l-4 hover:shadow-md cursor-pointer transition-all duration-200 ${
                            notif.couleur === 'blue'
                              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400'
                              : notif.couleur === 'green'
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-400'
                              : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 dark:border-yellow-400'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-gray-800 dark:text-white transition-colors duration-200">{notif.titre}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-200">{notif.temps}</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notif.id);
                              }}
                              className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 ml-2 transition-colors duration-200"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-3 border-t border-gray-200 dark:border-dark-600 text-center">
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200">
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Menu Utilisateur */}
          <div className="relative">
            <button
              onClick={handleUserMenuToggle}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors duration-200"
            >
              {/* ✅ REMPLACÉ : Photo de profil au lieu des initiales */}
              {renderUserAvatar('medium')}
              
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800 dark:text-white transition-colors duration-200">
                  {currentUser?.prenom} {currentUser?.nom}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">{currentUser?.role}</p>
              </div>
            </button>

            {actualShowUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-dark-600 transition-colors duration-200">
                <div className="p-4 border-b border-gray-200 dark:border-dark-600 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <div className="flex items-center gap-3">
                    {/* ✅ REMPLACÉ : Photo plus grande dans le menu */}
                    {renderUserAvatar('large', true)}
                    
                    <div>
                      <p className="font-bold text-gray-800 dark:text-white transition-colors duration-200">
                        {currentUser?.prenom} {currentUser?.nom}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 transition-colors duration-200">{currentUser?.username}</p>
                    </div>
                  </div>
                </div>

                <div className="p-2 space-y-1">
                  <button
                    onClick={handleSettingsClick}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200 text-left"
                  >
                    <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-semibold text-sm">Paramètres</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Gérer mon compte</p>
                    </div>
                  </button>

                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200 text-left"
                  >
                    <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <p className="font-semibold text-sm">Mon profil</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Voir mes informations</p>
                    </div>
                  </button>

                  <button
                    onClick={() => actualSetShowUserMenu(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200 text-left"
                  >
                    <HelpCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="font-semibold text-sm">Aide et Support</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Besoin d'aide?</p>
                    </div>
                  </button>
                </div>

                <div className="border-t border-gray-200 dark:border-dark-600 p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 text-left font-semibold"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Déconnexion</span>
                  </button>
                </div>

                <div className="p-3 border-t border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-700 text-center text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  <p>CRT-ESMT v1.0.0</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;