import api from './api';

// Ajouter un commentaire à une intervention
export const addComment = async (interventionId, texte) => {
  try {
    const response = await api.post(
      `/interventions/${interventionId}/commentaires`,
      { texte }
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire:', error);
    throw error;
  }
};

// Supprimer un commentaire
export const deleteComment = async (interventionId, commentId) => {
  try {
    const response = await api.delete(
      `/interventions/${interventionId}/commentaires/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire:', error);
    throw error;
  }
};

// Modifier un commentaire (optionnel)
export const updateComment = async (interventionId, commentId, texte) => {
  try {
    const response = await api.put(
      `/interventions/${interventionId}/commentaires/${commentId}`,
      { texte }
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la modification du commentaire:', error);
    throw error;
  }
};