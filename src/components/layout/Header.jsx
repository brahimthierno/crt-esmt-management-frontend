
// HEADER AVCE VUE PROFILE


import React, { useState, useRef, useEffect } from 'react';
import { Wrench, Settings, User, LogOut, Bell, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ currentUser, onLogout, setActiveView }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Notifications statiques pour la démo (à remplacer par des vraies données)
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
        setShowUserMenu(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowUserMenu(false);
    onLogout();
  };

  const handleSettingsClick = () => {
    setShowUserMenu(false);
    // Utilise setActiveView au lieu de navigate
    if (setActiveView) {
      setActiveView('settings');
    }
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    if (setActiveView) {
      setActiveView('profile');
    }
  };

  const handleNotificationClick = (notificationId) => {
    console.log('Notification cliquée:', notificationId);
    // Ici tu peux ajouter la logique pour gérer la notification
    // Par exemple, rediriger vers la demande ou l'intervention
    setShowNotifications(false);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo et titre */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">CRT-ESMT</h1>
            <p className="text-xs text-gray-500">Centre des Ressources Techniques</p>
          </div>
        </div>

        {/* Section droite - Notifications et Menu utilisateur */}
        <div className="flex items-center gap-4" ref={menuRef}>
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
              title="Notifications"
            >
              <Bell className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Dropdown Notifications */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">Notifications ({notifications.length})</h3>
                    {notifications.length > 0 && (
                      <button
                        onClick={() => setNotifications([])}
                        className="text-xs text-red-600 hover:text-red-700 font-semibold"
                      >
                        Effacer tout
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Aucune notification</p>
                    </div>
                  ) : (
                    <div className="p-4 space-y-3">
                      {notifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif.id)}
                          className={`p-3 rounded-lg border-l-4 hover:shadow-md cursor-pointer transition ${
                            notif.couleur === 'blue'
                              ? 'bg-blue-50 border-blue-500'
                              : notif.couleur === 'green'
                              ? 'bg-green-50 border-green-500'
                              : 'bg-yellow-50 border-yellow-500'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-gray-800">{notif.titre}</p>
                              <p className="text-xs text-gray-600 mt-1">{notif.temps}</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notif.id);
                              }}
                              className="text-gray-400 hover:text-red-600 ml-2"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-3 border-t border-gray-200 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Menu Utilisateur */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                {currentUser?.nom?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  {currentUser?.prenom} {currentUser?.nom}
                </p>
                <p className="text-xs text-gray-500">{currentUser?.role}</p>
              </div>
            </button>

            {/* Dropdown Menu Utilisateur */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                {/* En-tête profil */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {currentUser?.nom?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">
                        {currentUser?.prenom} {currentUser?.nom}
                      </p>
                      <p className="text-xs text-gray-600">{currentUser?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="p-2 space-y-1">
                  <button
                    onClick={handleSettingsClick}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition text-left"
                  >
                    <Settings className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-sm">Paramètres</p>
                      <p className="text-xs text-gray-500">Gérer mon compte</p>
                    </div>
                  </button>

                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition text-left"
                  >
                    <User className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="font-semibold text-sm">Mon profil</p>
                      <p className="text-xs text-gray-500">Voir mes informations</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition text-left"
                  >
                    <HelpCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-sm">Aide et Support</p>
                      <p className="text-xs text-gray-500">Besoin d'aide?</p>
                    </div>
                  </button>
                </div>

                {/* Separator */}
                <div className="border-t border-gray-200 p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition text-left font-semibold"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Déconnexion</span>
                  </button>
                </div>

                {/* Footer Info */}
                <div className="p-3 border-t border-gray-200 bg-gray-50 text-center text-xs text-gray-500">
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