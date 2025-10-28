// Fonctions utilitaires pour l'application

/**
 * Formate une date au format français
 * @param {string|Date} date - Date à formater
 * @returns {string} Date formatée (ex: 25 octobre 2025)
 */
export const formatDateFR = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

/**
 * Formate une date au format court français
 * @param {string|Date} date - Date à formater
 * @returns {string} Date formatée (ex: 25/10/2025)
 */
export const formatDateShort = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR');
};

/**
 * Formate une heure
 * @param {string} time - Heure au format HH:MM
 * @returns {string} Heure formatée
 */
export const formatTime = (time) => {
  return time || '00:00';
};

/**
 * Obtient la couleur du badge selon le statut
 * @param {string} statut - Statut de l'intervention
 * @returns {string} Classes CSS Tailwind
 */
export const getStatutColor = (statut) => {
  const colors = {
    'planifiee': 'bg-blue-100 text-blue-800',
    'en_cours': 'bg-yellow-100 text-yellow-800',
    'terminee': 'bg-green-100 text-green-800'
  };
  return colors[statut] || 'bg-gray-100 text-gray-800';
};

/**
 * Obtient la couleur du badge selon la priorité
 * @param {string} priorite - Priorité de l'intervention
 * @returns {string} Classes CSS Tailwind
 */
export const getPrioriteColor = (priorite) => {
  const colors = {
    'basse': 'bg-gray-100 text-gray-800',
    'moyenne': 'bg-yellow-100 text-yellow-800',
    'haute': 'bg-red-100 text-red-800'
  };
  return colors[priorite] || 'bg-gray-100 text-gray-800';
};

/**
 * Obtient le label du statut
 * @param {string} statut - Statut de l'intervention
 * @returns {string} Label en français
 */
export const getStatutLabel = (statut) => {
  const labels = {
    'planifiee': 'Planifiée',
    'en_cours': 'En cours',
    'terminee': 'Terminée'
  };
  return labels[statut] || statut;
};

/**
 * Obtient le label de la priorité
 * @param {string} priorite - Priorité de l'intervention
 * @returns {string} Label en français
 */
export const getPrioriteLabel = (priorite) => {
  const labels = {
    'basse': 'Basse',
    'moyenne': 'Moyenne',
    'haute': 'Haute'
  };
  return labels[priorite] || priorite;
};

/**
 * Filtre les interventions selon les critères
 * @param {Array} interventions - Liste des interventions
 * @param {Object} filters - Filtres à appliquer
 * @returns {Array} Interventions filtrées
 */
export const filterInterventions = (interventions, filters) => {
  let filtered = [...interventions];

  if (filters.date) {
    filtered = filtered.filter(i => i.dateDebut === filters.date);
  }

  if (filters.statut) {
    filtered = filtered.filter(i => i.statut === filters.statut);
  }

  if (filters.technicienId) {
    filtered = filtered.filter(i => i.technicienId === filters.technicienId);
  }

  if (filters.priorite) {
    filtered = filtered.filter(i => i.priorite === filters.priorite);
  }

  return filtered;
};

/**
 * Obtient les interventions d'un technicien
 * @param {Array} interventions - Liste des interventions
 * @param {number} technicienId - ID du technicien
 * @returns {Array} Interventions du technicien
 */
export const getInterventionsByTechnicien = (interventions, technicienId) => {
  return interventions.filter(i => i.technicienId === technicienId);
};

/**
 * Calcule les statistiques des interventions
 * @param {Array} interventions - Liste des interventions
 * @returns {Object} Statistiques
 */
export const calculateInterventionStats = (interventions) => {
  return {
    total: interventions.length,
    planifiees: interventions.filter(i => i.statut === 'planifiee').length,
    enCours: interventions.filter(i => i.statut === 'en_cours').length,
    terminees: interventions.filter(i => i.statut === 'terminee').length,
    hautesPriorite: interventions.filter(i => i.priorite === 'haute').length
  };
};

/**
 * Vérifie si un matériel a un stock faible
 * @param {Object} materiel - Matériel à vérifier
 * @returns {boolean} True si stock faible
 */
export const isStockFaible = (materiel) => {
  return materiel.disponible <= materiel.seuil;
};

/**
 * Calcule le taux de disponibilité d'un matériel
 * @param {Object} materiel - Matériel
 * @returns {number} Taux en pourcentage
 */
export const calculateTauxDisponibilite = (materiel) => {
  if (materiel.quantite === 0) return 0;
  return Math.round((materiel.disponible / materiel.quantite) * 100);
};

/**
 * Vérifie si un emprunt est en retard
 * @param {Object} emprunt - Emprunt à vérifier
 * @returns {boolean} True si en retard
 */
export const isEmpruntEnRetard = (emprunt) => {
  if (emprunt.statut !== 'en_cours') return false;
  const today = new Date();
  const dateRetour = new Date(emprunt.dateRetourPrevue);
  return today > dateRetour;
};

/**
 * Obtient les jours d'une semaine à partir d'une date
 * @param {Date} date - Date de référence
 * @returns {Array} Tableau de 7 dates
 */
export const getWeekDays = (date) => {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay() + 1); // Lundi
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    return day;
  });
};

/**
 * Obtient tous les jours d'un mois
 * @param {Date} date - Date de référence
 * @returns {Array} Tableau des jours du mois
 */
export const getMonthDays = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
};

/**
 * Formate une date au format ISO (YYYY-MM-DD)
 * @param {Date} date - Date à formater
 * @returns {string} Date au format ISO
 */
export const formatDateISO = (date) => {
  return date.toISOString().split('T')[0];
};

/**
 * Obtient le nom du mois en français
 * @param {Date} date - Date
 * @returns {string} Nom du mois
 */
export const getMonthName = (date) => {
  return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
};

/**
 * Valide un formulaire d'intervention
 * @param {Object} data - Données du formulaire
 * @returns {Object} { valid: boolean, errors: Array }
 */
export const validateInterventionForm = (data) => {
  const errors = [];

  if (!data.titre || data.titre.trim() === '') {
    errors.push('Le titre est obligatoire');
  }

  if (!data.type) {
    errors.push('Le type d\'intervention est obligatoire');
  }

  if (!data.lieu || data.lieu.trim() === '') {
    errors.push('Le lieu est obligatoire');
  }

  if (!data.technicienId) {
    errors.push('Vous devez assigner un technicien');
  }

  if (!data.dateDebut) {
    errors.push('La date de début est obligatoire');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Trie les interventions par date et heure
 * @param {Array} interventions - Liste des interventions
 * @param {string} order - 'asc' ou 'desc'
 * @returns {Array} Interventions triées
 */
export const sortInterventionsByDate = (interventions, order = 'asc') => {
  return [...interventions].sort((a, b) => {
    const dateA = new Date(`${a.dateDebut}T${a.heureDebut || '00:00'}`);
    const dateB = new Date(`${b.dateDebut}T${b.heureDebut || '00:00'}`);
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Génère un rapport des interventions
 * @param {Array} interventions - Liste des interventions
 * @param {Array} users - Liste des utilisateurs
 * @returns {Object} Rapport détaillé
 */
export const generateInterventionReport = (interventions, users) => {
  const stats = calculateInterventionStats(interventions);
  
  const technicienStats = users
    .filter(u => u.role !== 'admin')
    .map(tech => ({
      technicien: `${tech.prenom} ${tech.nom}`,
      role: tech.role,
      interventions: getInterventionsByTechnicien(interventions, tech.id),
      total: getInterventionsByTechnicien(interventions, tech.id).length
    }));

  return {
    stats,
    technicienStats,
    dateGeneration: new Date()
  };
};