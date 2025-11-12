
// VERSION DE SIDEBAR AVEC INTEGRATION DU PARAMETRE ET RETRAIT PAR LA SUITE ET AUSSI AJOUT DE L'HISTORIQUE DES EMPRUNTS

// import React from 'react';
// import { Calendar, Users, Package, Wrench, ClipboardList, FileText } from 'lucide-react';
// import NavItem from './NavItem';
// import { History } from 'lucide-react';

// const Sidebar = ({ activeView, setActiveView, currentUser }) => {
//   return (
//     <aside className="w-64 bg-white rounded-lg shadow-md p-4">
//       <nav className="space-y-2">
//         <NavItem 
//           icon={<ClipboardList />} 
//           label="Tableau de bord" 
//           active={activeView === 'dashboard'}
//           onClick={() => setActiveView('dashboard')}
//         />
//         <NavItem 
//           icon={<Wrench />} 
//           label="Interventions" 
//           active={activeView === 'interventions'}
//           onClick={() => setActiveView('interventions')}
//         />
//         <NavItem 
//           icon={<Calendar />} 
//           label="Planning" 
//           active={activeView === 'planning'}
//           onClick={() => setActiveView('planning')}
//         />
//         <NavItem 
//           icon={<Package />} 
//           label="Stock" 
//           active={activeView === 'stock'}
//           onClick={() => setActiveView('stock')}
//         />
//         {currentUser.role === 'admin' && (
//           <>
//             <NavItem 
//               icon={<Users />} 
//               label="Utilisateurs" 
//               active={activeView === 'users'}
//               onClick={() => setActiveView('users')}
//             />
//             <NavItem 
//               icon={<FileText />} 
//               label="Demandes" 
//               active={activeView === 'demandes'}
//               onClick={() => setActiveView('demandes')}
//             />
//           </>
//         )}

//         {
//   (currentUser.role === 'admin' || currentUser.role === 'informaticien' || currentUser.role === 'electricien') && (
//     <NavItem
//       icon={<History size={20} />}
//       label="Historique Emprunts"
//       isActive={activeView === 'historique-emprunts'}
//       onClick={() => setActiveView('historique-emprunts')}
//     />
//   )
// }
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;


// NOUVELLE VERSION CLAUDE AVEC INTEGRATION DE LES STATISTIQUES DES INTERVENTIONS


import React from 'react';
import { 
  Calendar, 
  Users, 
  Package, 
  Wrench, 
  ClipboardList, 
  FileText, 
  History,
  BarChart3  // ✅ AJOUT - Icône pour les statistiques
} from 'lucide-react';
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
        
        {/* ✅ NOUVEAU - Lien vers les Statistiques */}
        <NavItem 
          icon={<BarChart3 />} 
          label="Statistiques" 
          active={activeView === 'statistiques'}
          onClick={() => setActiveView('statistiques')}
        />

        {currentUser.role === 'admin' && (
          <>
            <NavItem 
              icon={<Users />} 
              label="Utilisateurs" 
              active={activeView === 'users'}
              onClick={() => setActiveView('users')}
            />
            <NavItem 
              icon={<FileText />} 
              label="Demandes" 
              active={activeView === 'demandes'}
              onClick={() => setActiveView('demandes')}
            />
          </>
        )}

        {(currentUser.role === 'admin' || 
          currentUser.role === 'informaticien' || 
          currentUser.role === 'electricien') && (
          <NavItem
            icon={<History size={20} />}
            label="Historique Emprunts"
            active={activeView === 'historique-emprunts'}
            onClick={() => setActiveView('historique-emprunts')}
          />
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;