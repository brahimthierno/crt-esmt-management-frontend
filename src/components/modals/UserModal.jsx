// Modal Utilisateur
const UserModal = ({ user, onSave, onClose }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {user ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
                placeholder="Entrez le nom"
                title="Nom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Prénom</label>
              <input
                type="text"
                value={formData.prenom}
                onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
                placeholder="Entrez le prénom"
                title="Prénom"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              required
              placeholder="Entrez le nom d'utilisateur"
              title="Nom d'utilisateur"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              required={!user}
              placeholder={user ? "Laisser vide pour ne pas changer" : ""}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rôle</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              title="Rôle"
            >
              <option value="admin">Administrateur</option>
              <option value="informaticien">Technicien Informaticien</option>
              <option value="electricien">Technicien Électricien</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};