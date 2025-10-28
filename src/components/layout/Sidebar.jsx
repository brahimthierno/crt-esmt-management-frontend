import React from 'react';
import { Calendar, Users, Package, Wrench, ClipboardList } from 'lucide-react';
import NavItem from './NavItem';

const Sidebar = ({ activeView, setActiveView, currentUser }) => {
  return (
    <aside className="w-64 bg-white rounded-lg shadow-md p-4">
      <nav className="space-y-2">
        <NavItem 
          icon={<ClipboardList />} 
          label="Tableau de bord" 
          active={activeView === 'dashboard'}
          onClick={() => setActiveView('dashboard')}
        />
        <NavItem 
          icon={<Wrench />} 
          label="Interventions" 
          active={activeView === 'interventions'}
          onClick={() => setActiveView('interventions')}
        />
        <NavItem 
          icon={<Calendar />} 
          label="Planning" 
          active={activeView === 'planning'}
          onClick={() => setActiveView('planning')}
        />
        <NavItem 
          icon={<Package />} 
          label="Stock" 
          active={activeView === 'stock'}
          onClick={() => setActiveView('stock')}
        />
        {currentUser.role === 'admin' && (
          <NavItem 
            icon={<Users />} 
            label="Utilisateurs" 
            active={activeView === 'users'}
            onClick={() => setActiveView('users')}
          />
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;