// // NOUVELLE VERSION POUR L'UTILISATEUR TECHNICIEN PUISSE AUSSI MODIFIER SON PROFIL

// import React, { useState } from 'react';
// import { User, Lock, Save, X, ArrowLeft } from 'lucide-react';
// import { useUser } from '../../context/UserContext';
// import { useAuth } from '../../context/AuthContext';

// const ProfileView = ({ setActiveView, onProfileUpdate }) => {
//   const { currentUser, updateUser } = useUser();
//   const { updateCurrentUser } = useAuth();
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState('');
  
//   const [profile, setProfile] = useState({
//     nom: currentUser?.nom || '',
//     prenom: currentUser?.prenom || '',
//     username: currentUser?.username || '',
//     password: '',
//     passwordConfirm: ''
//   });

//   // Sauvegarder le profil
//   const handleSaveProfile = async () => {
//     if (profile.password && profile.password !== profile.passwordConfirm) {
//       setMessage('❌ Les mots de passe ne correspondent pas');
//       return;
//     }

//     setSaving(true);
//     setMessage('');
    
//     try {
//       console.log('📝 Envoi du profil:', profile);
      
//       const token = localStorage.getItem('token');
      
//       const dataToSend = {
//         nom: profile.nom,
//         prenom: profile.prenom,
//         username: profile.username
//       };
      
//       if (profile.password && profile.password.trim() !== '') {
//         dataToSend.password = profile.password;
//       }
      
//       // ✅ UTILISER LA NOUVELLE ROUTE /profile/me
//       const response = await fetch(`http://localhost:5000/api/users/profile/me`, {
//         method: 'PUT',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(dataToSend)
//       });

//       console.log('📡 Réponse du serveur - Status:', response.status);

//       if (response.ok) {
//         console.log('✅ Réponse OK du serveur');
//         const data = await response.json();
//         console.log('📦 Données reçues:', data);
        
//         // ✅ Créer l'objet utilisateur mis à jour
//         const updatedUserData = {
//           ...currentUser,
//           nom: profile.nom,
//           prenom: profile.prenom,
//           username: profile.username
//         };
        
//         console.log('🔄 Mise à jour du context avec:', updatedUserData);
        
//         // ✅ METTRE À JOUR LES DEUX CONTEXTS
//         updateUser(updatedUserData);
//         updateCurrentUser(updatedUserData);
        
//         setMessage('✅ Profil mis à jour avec succès');
        
//         setProfile({ 
//           ...profile, 
//           password: '', 
//           passwordConfirm: '' 
//         });
        
//         if (onProfileUpdate) {
//           console.log('🔄 Appel de onProfileUpdate');
//           setTimeout(async () => {
//             console.log('⏱️ Attente terminée, appel du callback');
//             await onProfileUpdate();
//             console.log('✅ onProfileUpdate terminé');
//           }, 500);
//         }
        
//         setTimeout(() => {
//           setMessage('');
//         }, 3000);
        
//       } else {
//         console.log('❌ Réponse non OK:', response.status);
//         const errorData = await response.json();
//         console.log('❌ Erreur du serveur:', errorData);
//         setMessage('❌ Erreur lors de la sauvegarde: ' + (errorData.message || 'Erreur inconnue'));
//       }
//     } catch (error) {
//       console.log('❌ Erreur fetch:', error);
//       setMessage('❌ Erreur: ' + error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
//       <div className="bg-white dark:bg-dark-800 shadow transition-colors duration-200">
//         <div className="max-w-6xl mx-auto px-4 py-6">
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setActiveView('dashboard')}
//                 className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//                 Retour
//               </button>
//               <h1 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors duration-200">👤 Mon Profil</h1>
//             </div>
//           </div>

//           {message && (
//             <div className={`p-3 rounded flex items-center justify-between transition-colors duration-200 ${
//               message.includes('✅') 
//                 ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
//                 : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
//             }`}>
//               <span>{message}</span>
//               <button 
//                 onClick={() => setMessage('')}
//                 className="hover:opacity-70 transition-opacity duration-200"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="max-w-2xl mx-auto px-4 py-8">
//         <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
//           <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-dark-600 transition-colors duration-200">
//             <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-4xl">
//               {currentUser?.nom?.[0]?.toUpperCase() || 'U'}
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1 transition-colors duration-200">
//                 {currentUser?.prenom} {currentUser?.nom}
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-200">
//                 <span className="font-semibold">Rôle:</span> 
//                 <span className="ml-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold transition-colors duration-200">
//                   {currentUser?.role}
//                 </span>
//               </p>
//               <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-200">
//                 <span className="font-semibold">ID:</span> {currentUser?._id}
//               </p>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-200">Modifier mes informations</h3>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 transition-colors duration-200">
//                   <User className="w-4 h-4" />
//                   Nom
//                 </label>
//                 <input
//                   type="text"
//                   value={profile.nom}
//                   onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 transition-colors duration-200">
//                   <User className="w-4 h-4" />
//                   Prénom
//                 </label>
//                 <input
//                   type="text"
//                   value={profile.prenom}
//                   onChange={(e) => setProfile({ ...profile, prenom: e.target.value })}
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 transition-colors duration-200">
//                 <User className="w-4 h-4" />
//                 Nom d'utilisateur
//               </label>
//               <input
//                 type="text"
//                 value={profile.username}
//                 onChange={(e) => setProfile({ ...profile, username: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
//               />
//             </div>

//             <div className="border-t border-gray-200 dark:border-dark-600 pt-6 mt-6 transition-colors duration-200">
//               <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2 transition-colors duration-200">
//                 <Lock className="w-5 h-5" />
//                 Sécurité
//               </h3>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
//                     Nouveau mot de passe
//                   </label>
//                   <input
//                     type="password"
//                     value={profile.password}
//                     onChange={(e) => setProfile({ ...profile, password: e.target.value })}
//                     placeholder="Laisser vide pour ne pas changer"
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
//                   />
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
//                     ℹ️ Laissez vide si vous ne voulez pas changer votre mot de passe
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
//                     Confirmer le mot de passe
//                   </label>
//                   <input
//                     type="password"
//                     value={profile.passwordConfirm}
//                     onChange={(e) => setProfile({ ...profile, passwordConfirm: e.target.value })}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-dark-600 transition-colors duration-200">
//               <button
//                 onClick={() => setActiveView('dashboard')}
//                 className="flex-1 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//                 Annuler
//               </button>
//               <button
//                 onClick={handleSaveProfile}
//                 disabled={saving}
//                 className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
//               >
//                 <Save className="w-5 h-5" />
//                 {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
//               </button>
//             </div>
//           </div>

//           <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-600 transition-colors duration-200">
//             <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 rounded transition-colors duration-200">
//               <p className="text-sm text-blue-700 dark:text-blue-300 transition-colors duration-200">
//                 <strong>ℹ️ Info:</strong> Les modifications apportées à votre profil seront visibles immédiatement dans l'interface.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileView;


// NOUVELLE VERSION POUR LE BOUTON "RETOUR" ET "ANNULER"


//import React, { useState } from 'react';
//import { User, Lock, Save, X, ArrowLeft } from 'lucide-react';
//import { useUser } from '../../context/UserContext';
//import { useAuth } from '../../context/AuthContext';

//const ProfileView = ({ setActiveView, onProfileUpdate, onShowUserMenu }) => {
  //const { currentUser, updateUser } = useUser();
  //const { updateCurrentUser } = useAuth();
  //const [saving, setSaving] = useState(false);
  //const [message, setMessage] = useState('');
  
  //const [profile, setProfile] = useState({
    //nom: currentUser?.nom || '',
    //prenom: currentUser?.prenom || '',
    //username: currentUser?.username || '',
    //password: '',
    //passwordConfirm: ''
  //});

  // Sauvegarder le profil
  //const handleSaveProfile = async () => {
    //if (profile.password && profile.password !== profile.passwordConfirm) {
      //setMessage('❌ Les mots de passe ne correspondent pas');
      //return;
    //}

    //setSaving(true);
    //setMessage('');
    
   // try {
     // console.log('📝 Envoi du profil:', profile);
      
      //const token = localStorage.getItem('token');
      
     // const dataToSend = {
       // nom: profile.nom,
        //prenom: profile.prenom,
        //username: profile.username
      //};
      
      //if (profile.password && profile.password.trim() !== '') {
        //dataToSend.password = profile.password;
      //}
      
      // ✅ UTILISER LA NOUVELLE ROUTE /profile/me
      /* const response = await fetch(`http://localhost:5000/api/users/profile/me`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      console.log('📡 Réponse du serveur - Status:', response.status);

      if (response.ok) {
        console.log('✅ Réponse OK du serveur');
        const data = await response.json();
        console.log('📦 Données reçues:', data); */
        
       /*  // ✅ Créer l'objet utilisateur mis à jour
        const updatedUserData = {
          ...currentUser,
          nom: profile.nom,
          prenom: profile.prenom,
          username: profile.username
        };
        
        console.log('🔄 Mise à jour du context avec:', updatedUserData);
        
        // ✅ METTRE À JOUR LES DEUX CONTEXTS
        updateUser(updatedUserData);
        updateCurrentUser(updatedUserData);
        
        setMessage('✅ Profil mis à jour avec succès');
        
        setProfile({ 
          ...profile, 
          password: '', 
          passwordConfirm: '' 
        });
        
        if (onProfileUpdate) {
          console.log('🔄 Appel de onProfileUpdate');
          setTimeout(async () => {
            console.log('⏱️ Attente terminée, appel du callback');
            await onProfileUpdate();
            console.log('✅ onProfileUpdate terminé');
          }, 500);
        }
        
        setTimeout(() => {
          setMessage('');
        }, 3000);
        
      } else {
        console.log('❌ Réponse non OK:', response.status);
        const errorData = await response.json();
        console.log('❌ Erreur du serveur:', errorData);
        setMessage('❌ Erreur lors de la sauvegarde: ' + (errorData.message || 'Erreur inconnue'));
      }
    } catch (error) {
      console.log('❌ Erreur fetch:', error);
      setMessage('❌ Erreur: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Fonction pour gérer le retour
  const handleBack = () => {
    if (setActiveView) {
      setActiveView('dashboard');
    }
    // Afficher le menu utilisateur après retour au dashboard
    if (onShowUserMenu) {
      onShowUserMenu();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
      <div className="bg-white dark:bg-dark-800 shadow transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              {/* ✅ BOUTON RETOUR QUI AFFICHE LE MENU UTILISATEUR *}
               <button
                onClick={handleBack}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour
              </button>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors duration-200">👤 Mon Profil</h1>
            </div>
          </div>

          {message && (
            <div className={`p-3 rounded flex items-center justify-between transition-colors duration-200 ${
              message.includes('✅') 
                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
            }`}>
              <span>{message}</span>
              <button 
                onClick={() => setMessage('')}
                className="hover:opacity-70 transition-opacity duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-dark-600 transition-colors duration-200">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-4xl">
              {currentUser?.nom?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1 transition-colors duration-200">
                {currentUser?.prenom} {currentUser?.nom}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-200">
                <span className="font-semibold">Rôle:</span> 
                <span className="ml-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold transition-colors duration-200">
                  {currentUser?.role}
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-200">
                <span className="font-semibold">ID:</span> {currentUser?._id}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-200">Modifier mes informations</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 transition-colors duration-200">
                  <User className="w-4 h-4" />
                  Nom
                </label>
                <input
                  type="text"
                  value={profile.nom}
                  onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 transition-colors duration-200">
                  <User className="w-4 h-4" />
                  Prénom
                </label>
                <input
                  type="text"
                  value={profile.prenom}
                  onChange={(e) => setProfile({ ...profile, prenom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 transition-colors duration-200">
                <User className="w-4 h-4" />
                Nom d'utilisateur
              </label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>

            <div className="border-t border-gray-200 dark:border-dark-600 pt-6 mt-6 transition-colors duration-200">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2 transition-colors duration-200">
                <Lock className="w-5 h-5" />
                Sécurité
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={profile.password}
                    onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                    placeholder="Laisser vide pour ne pas changer"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
                    ℹ️ Laissez vide si vous ne voulez pas changer votre mot de passe
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    value={profile.passwordConfirm}
                    onChange={(e) => setProfile({ ...profile, passwordConfirm: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-dark-600 transition-colors duration-200"> */
              //{/* ✅ BOUTON ANNULER QUI AFFICHE LE MENU UTILISATEUR */}
             // <button
              //  onClick={handleBack}
                //className="flex-1 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
              //>
                //<ArrowLeft className="w-5 h-5" />
                //Annuler
              //</button>
              //<button
                //onClick={handleSaveProfile}
                //disabled={saving}
                //className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
              //>
                //<Save className="w-5 h-5" />
                //{saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
              //</button>
            //</div>
          //</div>

          //<div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-600 transition-colors duration-200">
            //<div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 rounded transition-colors duration-200">
              //<p className="text-sm text-blue-700 dark:text-blue-300 transition-colors duration-200">
                //<strong>ℹ️ Info:</strong> Les modifications apportées à votre profil seront visibles immédiatement dans l'interface.
              //</p>
            //</div>
          //</div>
        //</div>
      //</div>
    //</div>
  //);
//};

// export default ProfileView;


import React, { useState, useRef } from 'react';
import { User, Lock, Save, X, ArrowLeft, Camera, Upload, Trash2 } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import { updateOwnProfile, deleteProfilePhoto, getProfilePhotoUrl } from '../../services/userService';

const ProfileView = ({ setActiveView, onProfileUpdate, onShowUserMenu }) => {
  const { currentUser, updateUser } = useUser();
  const { updateCurrentUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  
  const [profile, setProfile] = useState({
    nom: currentUser?.nom || '',
    prenom: currentUser?.prenom || '',
    username: currentUser?.username || '',
    password: '',
    passwordConfirm: '',
    photo: null, // Fichier photo sélectionné
    photoPreview: currentUser?.photo ? getProfilePhotoUrl(currentUser.photo) : null // Preview de la photo
  });

  // Gérer le téléchargement de photo
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('❌ La photo ne doit pas dépasser 5MB');
        return;
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        setMessage('❌ Veuillez sélectionner une image valide (JPEG, PNG, etc.)');
        return;
      }

      // Créer une preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({
          ...profile,
          photo: file,
          photoPreview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Supprimer la photo
  const handleRemovePhoto = async () => {
    try {
      if (currentUser?.photo) {
        // Supprimer la photo du serveur
        await deleteProfilePhoto();
      }
      
      setProfile({
        ...profile,
        photo: null,
        photoPreview: null
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Mettre à jour le contexte utilisateur
      const updatedUser = { ...currentUser, photo: null };
      updateUser(updatedUser);
      updateCurrentUser(updatedUser);
      
      setMessage('✅ Photo de profil supprimée avec succès');
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      console.error('Erreur suppression photo:', error);
      setMessage('❌ Erreur lors de la suppression de la photo');
    }
  };

  // Ouvrir le sélecteur de fichiers
  const handleSelectPhoto = () => {
    fileInputRef.current?.click();
  };

  // Sauvegarder le profil
  const handleSaveProfile = async () => {
    if (profile.password && profile.password !== profile.passwordConfirm) {
      setMessage('❌ Les mots de passe ne correspondent pas');
      return;
    }

    setSaving(true);
    setMessage('');
    
    try {
      console.log('📝 Envoi du profil:', profile);
      
      const dataToSend = {
        nom: profile.nom,
        prenom: profile.prenom,
        username: profile.username
      };
      
      if (profile.password && profile.password.trim() !== '') {
        dataToSend.password = profile.password;
      }
      
      // Inclure la photo si elle a été sélectionnée
      if (profile.photo) {
        dataToSend.photo = profile.photo;
      }
      
      const updatedUserData = await updateOwnProfile(dataToSend);
      
      console.log('✅ Réponse du serveur:', updatedUserData);
      
      // ✅ Mettre à jour les contextes avec les nouvelles données
      updateUser(updatedUserData);
      updateCurrentUser(updatedUserData);
      
      setMessage('✅ Profil mis à jour avec succès');
      
      // Réinitialiser les champs mot de passe
      setProfile({ 
        ...profile, 
        password: '', 
        passwordConfirm: '',
        photo: null // Réinitialiser le fichier photo après upload réussi
      });
      
      // Mettre à jour la preview avec la nouvelle photo du serveur
      if (updatedUserData.photo) {
        setProfile(prev => ({
          ...prev,
          photoPreview: getProfilePhotoUrl(updatedUserData.photo)
        }));
      }
      
      // Appeler le callback de mise à jour
      if (onProfileUpdate) {
        console.log('🔄 Appel de onProfileUpdate');
        setTimeout(async () => {
          console.log('⏱️ Attente terminée, appel du callback');
          await onProfileUpdate();
          console.log('✅ onProfileUpdate terminé');
        }, 500);
      }
      
      setTimeout(() => {
        setMessage('');
      }, 3000);
      
    } catch (error) {
      console.log('❌ Erreur sauvegarde:', error);
      setMessage('❌ Erreur: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  // Fonction pour gérer le retour
  const handleBack = () => {
    if (setActiveView) {
      setActiveView('dashboard');
    }
    // Afficher le menu utilisateur après retour au dashboard
    if (onShowUserMenu) {
      onShowUserMenu();
    }
  };

  // Rendu de l'avatar/photo de profil
  const renderProfileAvatar = () => {
    if (profile.photoPreview) {
      return (
        <img 
          src={profile.photoPreview} 
          alt="Photo de profil"
          className="w-full h-full object-cover"
        />
      );
    }
    
    // Initiales si pas de photo
    return (
      <span className="text-white font-bold text-2xl">
        {currentUser?.nom?.[0]?.toUpperCase() || 'U'}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
      <div className="bg-white dark:bg-dark-800 shadow transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              {/* ✅ BOUTON RETOUR QUI AFFICHE LE MENU UTILISATEUR */}
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour
              </button>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors duration-200">👤 Mon Profil</h1>
            </div>
          </div>

          {message && (
            <div className={`p-3 rounded flex items-center justify-between transition-colors duration-200 ${
              message.includes('✅') 
                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
            }`}>
              <span>{message}</span>
              <button 
                onClick={() => setMessage('')}
                className="hover:opacity-70 transition-opacity duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
          {/* SECTION PHOTO DE PROFIL AMÉLIORÉE */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-dark-600 transition-colors duration-200">
            <div className="relative group">
              {/* Photo de profil circulaire */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden border-4 border-white dark:border-dark-700 shadow-lg">
                {renderProfileAvatar()}
              </div>
              
              {/* Bouton de modification avec effet de survol */}
              <button
                onClick={handleSelectPhoto}
                className="absolute -bottom-1 -right-1 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 group-hover:scale-110 border-2 border-white dark:border-dark-700"
                title="Changer la photo"
              >
                <Camera className="w-4 h-4" />
              </button>

              {/* Input fichier caché */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1 transition-colors duration-200">
                {currentUser?.prenom} {currentUser?.nom}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-200">
                <span className="font-semibold">Rôle:</span> 
                <span className="ml-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold transition-colors duration-200">
                  {currentUser?.role}
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-200">
                <span className="font-semibold">ID:</span> {currentUser?._id}
              </p>

              {/* Boutons de gestion de photo */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleSelectPhoto}
                  className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
                >
                  <Upload className="w-3 h-3" />
                  {profile.photoPreview ? 'Changer' : 'Ajouter photo'}
                </button>
                {(profile.photoPreview || currentUser?.photo) && (
                  <button
                    onClick={handleRemovePhoto}
                    className="flex items-center gap-1 px-3 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
                  >
                    <Trash2 className="w-3 h-3" />
                    Supprimer
                  </button>
                )}
              </div>

              {/* Info fichier sélectionné */}
              {profile.photo && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 transition-colors duration-200">
                  📸 {profile.photo.name} ({(profile.photo.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          </div>

          {/* FORMULAIRE DE MODIFICATION */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-200">
              Modifier mes informations
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 transition-colors duration-200">
                  <User className="w-4 h-4" />
                  Nom
                </label>
                <input
                  type="text"
                  value={profile.nom}
                  onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 transition-colors duration-200">
                  <User className="w-4 h-4" />
                  Prénom
                </label>
                <input
                  type="text"
                  value={profile.prenom}
                  onChange={(e) => setProfile({ ...profile, prenom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 transition-colors duration-200">
                <User className="w-4 h-4" />
                Nom d'utilisateur
              </label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>

            {/* SECTION SÉCURITÉ */}
            <div className="border-t border-gray-200 dark:border-dark-600 pt-6 mt-6 transition-colors duration-200">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2 transition-colors duration-200">
                <Lock className="w-5 h-5" />
                Sécurité
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={profile.password}
                    onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                    placeholder="Laisser vide pour ne pas changer"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
                    ℹ️ Laissez vide si vous ne voulez pas changer votre mot de passe
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    value={profile.passwordConfirm}
                    onChange={(e) => setProfile({ ...profile, passwordConfirm: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
              </div>
            </div>

            {/* BOUTONS D'ACTION */}
            <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-dark-600 transition-colors duration-200">
              {/* ✅ BOUTON ANNULER QUI AFFICHE LE MENU UTILISATEUR */}
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Annuler
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
              </button>
            </div>
          </div>

          {/* SECTION INFORMATIONS */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-600 transition-colors duration-200">
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 rounded transition-colors duration-200">
              <p className="text-sm text-blue-700 dark:text-blue-300 transition-colors duration-200">
                <strong>ℹ️ Info:</strong> Les modifications apportées à votre profil seront visibles immédiatement dans l'interface. 
                Les photos de profil doivent être au format JPG, PNG ou GIF et ne pas dépasser 5MB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;