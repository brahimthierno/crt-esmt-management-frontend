// import React from 'react';

// const NavItem = ({ icon, label, active, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
//         active 
//           ? 'bg-blue-600 text-white' 
//           : 'text-gray-700 hover:bg-gray-100'
//       }`}
//     >
//       {React.cloneElement(icon, { size: 20 })}
//       <span className="font-medium">{label}</span>
//     </button>
//   );
// };

// export default NavItem;


// VERSION AVEC LE MODE SOMBRE

import React from 'react';

const NavItem = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
        active 
          ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 hover:text-gray-800 dark:hover:text-white'
      }`}
    >
      <div className={`transition-colors duration-200 ${
        active ? 'text-white' : 'text-gray-400 dark:text-gray-500'
      }`}>
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default NavItem;