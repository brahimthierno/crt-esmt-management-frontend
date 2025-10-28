import React from 'react';
import { LogOut } from 'lucide-react';

const Header = ({ currentUser, onLogout }) => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">CRT - ESMT</h1>
          <p className="text-sm text-blue-100">Centre des Ressources Techniques</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">{currentUser.prenom} {currentUser.nom}</p>
            <p className="text-xs text-blue-100 capitalize">{currentUser.role}</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;