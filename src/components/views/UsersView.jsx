// import React, { useState } from 'react';
// import { Plus, Edit2, Trash2 } from 'lucide-react';
// import * as userService from '../../services/userService';

// const UsersView = ({ users, setUsers }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editUser, setEditUser] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const addUser = async (userData) => {
//     setLoading(true);
//     try {
//       const newUser = await userService.createUser(userData);
//       setUsers([...users, newUser]);
//       setShowModal(false);
//       setEditUser(null);
//     } catch (error) {
//       alert(error.response?.data?.message || 'Erreur lors de la création');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateUser = async (id, userData) => {
//     setLoading(true);
//     try {
//       const updated = await userService.updateUser(id, userData);
//       setUsers(users.map(u => u._id === id ? updated : u));
//       setShowModal(false);
//       setEditUser(null);
//     } catch (error) {
//       alert(error.response?.data?.message || 'Erreur lors de la mise à jour');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteUser = async (id) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
//       try {
//         await userService.deleteUser(id);
//         setUsers(users.filter(u => u._id !== id));
//       } catch (error) {
//         alert(error.response?.data?.message || 'Erreur lors de la suppression');
//       }
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Gestion des Utilisateurs</h2>
//         <button
//           onClick={() => { setEditUser(null); setShowModal(true); }}
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//         >
//           <Plus size={18} />
//           Nouvel utilisateur
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nom</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Prénom</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Username</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rôle</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {users.map(user => (
//               <tr key={user._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-3">{user.nom}</td>
//                 <td className="px-4 py-3">{user.prenom}</td>
//                 <td className="px-4 py-3">{user.username}</td>
//                 <td className="px-4 py-3">
//                   <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
//                     user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
//                     user.role === 'informaticien' ? 'bg-blue-100 text-blue-800' :
//                     'bg-green-100 text-green-800'
//                   }`}>
//                     {user.role}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3">
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => { setEditUser(user); setShowModal(true); }}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="Modifier"
//                     >
//                       <Edit2 size={18} />
//                     </button>
//                     {user.role !== 'admin' && (
//                       <button
//                         onClick={() => deleteUser(user._id)}
//                         className="text-red-600 hover:text-red-800"
//                         title="Supprimer"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Utilisateurs</h3>
//           <p className="text-3xl font-bold text-blue-600">{users.length}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">Techniciens Informaticiens</h3>
//           <p className="text-3xl font-bold text-blue-600">
//             {users.filter(u => u.role === 'informaticien').length}
//           </p>
//         </div>
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">Techniciens Électriciens</h3>
//           <p className="text-3xl font-bold text-green-600">
//             {users.filter(u => u.role === 'electricien').length}
//           </p>
//         </div>
//       </div>

//       {showModal && (
//         <UserModal
//           user={editUser}
//           onSave={(data) => {
//             if (editUser) {
//               updateUser(editUser._id, data);
//             } else {
//               addUser(data);
//             }
//           }}
//           onClose={() => { setShowModal(false); setEditUser(null); }}
//           loading={loading}
//         />
//       )}
//     </div>
//   );
// };

// // Modal Utilisateur
// const UserModal = ({ user, onSave, onClose, loading }) => {
//   const [formData, setFormData] = useState(user || {
//     username: '',
//     password: '',
//     role: 'informaticien',
//     nom: '',
//     prenom: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <h3 className="text-xl font-bold mb-4">
//           {user ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
//         </h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Nom</label>
//               <input
//                 type="text"
//                 value={formData.nom}
//                 onChange={(e) => setFormData({...formData, nom: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Prénom</label>
//               <input
//                 type="text"
//                 value={formData.prenom}
//                 onChange={(e) => setFormData({...formData, prenom: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Username</label>
//             <input
//               type="text"
//               value={formData.username}
//               onChange={(e) => setFormData({...formData, username: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//               disabled={loading || user}
//             />
//           </div>

//           {!user && (
//             <div>
//               <label className="block text-sm font-medium mb-1">Mot de passe</label>
//               <input
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({...formData, password: e.target.value})}
//                 className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium mb-1">Rôle</label>
//             <select
//               value={formData.role}
//               onChange={(e) => setFormData({...formData, role: e.target.value})}
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               disabled={loading}
//             >
//               <option value="admin">Administrateur</option>
//               <option value="informaticien">Technicien Informaticien</option>
//               <option value="electricien">Technicien Électricien</option>
//             </select>
//           </div>

//           <div className="flex gap-3 justify-end pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//               disabled={loading}
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
//               disabled={loading}
//             >
//               {loading ? 'Enregistrement...' : 'Enregistrer'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UsersView;



// NOUVELLE VERSION POUR MODE SOMBRE



import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import * as userService from '../../services/userService';

const UsersView = ({ users, setUsers }) => {
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const addUser = async (userData) => {
    setLoading(true);
    try {
      const newUser = await userService.createUser(userData);
      setUsers([...users, newUser]);
      setShowModal(false);
      setEditUser(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    setLoading(true);
    try {
      const updated = await userService.updateUser(id, userData);
      setUsers(users.map(u => u._id === id ? updated : u));
      setShowModal(false);
      setEditUser(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter(u => u._id !== id));
      } catch (error) {
        alert(error.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gestion des Utilisateurs
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Gérez les comptes des techniciens et administrateurs
            </p>
          </div>
          <button
            onClick={() => { setEditUser(null); setShowModal(true); }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
          >
            <Plus size={18} />
            Nouvel utilisateur
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Nom</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Prénom</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Username</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Rôle</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {users.map(user => (
                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{user.nom}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{user.prenom}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{user.username}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                      user.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' :
                      user.role === 'informaticien' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                      'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setEditUser(user); setShowModal(true); }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded transition"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded transition"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Utilisateurs</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{users.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Techniciens Informaticiens</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {users.filter(u => u.role === 'informaticien').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Techniciens Électriciens</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {users.filter(u => u.role === 'electricien').length}
            </p>
          </div>
        </div>

        {showModal && (
          <UserModal
            user={editUser}
            onSave={(data) => {
              if (editUser) {
                updateUser(editUser._id, data);
              } else {
                addUser(data);
              }
            }}
            onClose={() => { setShowModal(false); setEditUser(null); }}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

// Modal Utilisateur
const UserModal = ({ user, onSave, onClose, loading }) => {
  const [formData, setFormData] = useState(user || {
    username: '',
    password: '',
    role: 'informaticien',
    nom: '',
    prenom: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
          <h3 className="text-xl font-bold text-white">
            {user ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prénom</label>
              <input
                type="text"
                value={formData.prenom}
                onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              disabled={loading || user}
            />
          </div>

          {!user && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mot de passe</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                disabled={loading}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rôle</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={loading}
            >
              <option value="admin">Administrateur</option>
              <option value="informaticien">Technicien Informaticien</option>
              <option value="electricien">Technicien Électricien</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsersView;
