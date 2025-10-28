// Données initiales pour l'application

export const initialUsers = [
  { 
    id: 1, 
    username: 'admin', 
    password: 'admin123', 
    role: 'admin', 
    nom: 'Administrateur', 
    prenom: 'Brahim' 
  },
  { 
    id: 2, 
    username: 'tech1', 
    password: 'tech123', 
    role: 'informaticien', 
    nom: 'Diop', 
    prenom: 'Moussa' 
  },
  { 
    id: 3, 
    username: 'tech2', 
    password: 'tech123', 
    role: 'electricien', 
    nom: 'Ndiaye', 
    prenom: 'Fatou' 
  },
  { 
    id: 4, 
    username: 'tech3', 
    password: 'tech123', 
    role: 'informaticien', 
    nom: 'Sow', 
    prenom: 'Abdoulaye' 
  }
];

export const initialInterventions = [
  {
    id: 1,
    titre: 'Réparation climatiseur Salle A101',
    type: 'reparation',
    materiel: 'Climatiseur',
    lieu: 'Salle A101',
    technicienId: 3,
    statut: 'planifiee',
    priorite: 'haute',
    dateDebut: '2025-10-25',
    heureDebut: '09:00',
    description: 'Le climatiseur ne refroidit plus correctement'
  },
  {
    id: 2,
    titre: 'Maintenance serveurs',
    type: 'maintenance',
    materiel: 'Serveurs',
    lieu: 'Salle serveurs',
    technicienId: 2,
    statut: 'en_cours',
    priorite: 'moyenne',
    dateDebut: '2025-10-24',
    heureDebut: '14:00',
    description: 'Maintenance mensuelle des serveurs'
  },
  {
    id: 3,
    titre: 'Installation point d\'accès WiFi',
    type: 'installation',
    materiel: 'Point d\'accès',
    lieu: 'Bâtiment B - Étage 2',
    technicienId: 4,
    statut: 'terminee',
    priorite: 'moyenne',
    dateDebut: '2025-10-23',
    heureDebut: '10:00',
    description: 'Installation d\'un nouveau point d\'accès WiFi'
  },
  {
    id: 4,
    titre: 'Diagnostic vidéoprojecteur',
    type: 'diagnostic',
    materiel: 'Vidéoprojecteur',
    lieu: 'Amphithéâtre 1',
    technicienId: 2,
    statut: 'planifiee',
    priorite: 'haute',
    dateDebut: '2025-10-26',
    heureDebut: '08:30',
    description: 'Le vidéoprojecteur ne s\'allume plus'
  },
  {
    id: 5,
    titre: 'Vérification installation électrique',
    type: 'verification',
    materiel: 'Installation électrique',
    lieu: 'Laboratoire informatique',
    technicienId: 3,
    statut: 'en_cours',
    priorite: 'basse',
    dateDebut: '2025-10-25',
    heureDebut: '11:00',
    description: 'Vérification annuelle de conformité'
  }
];

export const initialStock = [
  { 
    id: 1, 
    nom: 'Multiprise', 
    quantite: 15, 
    categorie: 'electricite', 
    disponible: 15,
    seuil: 5 
  },
  { 
    id: 2, 
    nom: 'Câble de projection', 
    quantite: 20, 
    categorie: 'informatique', 
    disponible: 18,
    seuil: 8 
  },
  { 
    id: 3, 
    nom: 'Point d\'accès WiFi', 
    quantite: 8, 
    categorie: 'informatique', 
    disponible: 6,
    seuil: 3 
  },
  { 
    id: 4, 
    nom: 'Haut-parleur', 
    quantite: 12, 
    categorie: 'electricite', 
    disponible: 10,
    seuil: 4 
  },
  { 
    id: 5, 
    nom: 'Lampe LED', 
    quantite: 30, 
    categorie: 'electricite', 
    disponible: 28,
    seuil: 10 
  },
  { 
    id: 6, 
    nom: 'Switch réseau', 
    quantite: 10, 
    categorie: 'informatique', 
    disponible: 9,
    seuil: 3 
  },
  { 
    id: 7, 
    nom: 'Rallonge électrique', 
    quantite: 25, 
    categorie: 'electricite', 
    disponible: 22,
    seuil: 8 
  },
  { 
    id: 8, 
    nom: 'Câble réseau RJ45', 
    quantite: 50, 
    categorie: 'informatique', 
    disponible: 45,
    seuil: 15 
  }
];

export const initialEmprunts = [
  {
    id: 1,
    materielId: 2,
    quantite: 2,
    emprunteur: 'Prof. Sow',
    dateEmprunt: '2025-10-22',
    dateRetourPrevue: '2025-10-25',
    statut: 'en_cours'
  },
  {
    id: 2,
    materielId: 4,
    quantite: 2,
    emprunteur: 'Département Réseau',
    dateEmprunt: '2025-10-20',
    dateRetourPrevue: '2025-10-27',
    statut: 'en_cours'
  },
  {
    id: 3,
    materielId: 5,
    quantite: 2,
    emprunteur: 'Service maintenance',
    dateEmprunt: '2025-10-18',
    dateRetourPrevue: '2025-10-22',
    statut: 'retourne'
  }
];

// Types d'interventions disponibles
export const typesIntervention = [
  { value: 'reparation', label: 'Réparation' },
  { value: 'diagnostic', label: 'Diagnostic' },
  { value: 'verification', label: 'Vérification' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'installation', label: 'Installation' }
];

// Niveaux de priorité
export const niveauxPriorite = [
  { value: 'basse', label: 'Basse', color: 'gray' },
  { value: 'moyenne', label: 'Moyenne', color: 'yellow' },
  { value: 'haute', label: 'Haute', color: 'red' }
];

// Statuts d'intervention
export const statutsIntervention = [
  { value: 'planifiee', label: 'Planifiée', color: 'blue' },
  { value: 'en_cours', label: 'En cours', color: 'yellow' },
  { value: 'terminee', label: 'Terminée', color: 'green' }
];

// Catégories de matériel
export const categoriesMateriels = [
  { value: 'informatique', label: 'Informatique' },
  { value: 'electricite', label: 'Électricité' }
];

// Rôles utilisateurs
export const rolesUtilisateurs = [
  { value: 'admin', label: 'Administrateur' },
  { value: 'informaticien', label: 'Technicien Informaticien' },
  { value: 'electricien', label: 'Technicien Électricien' }
];