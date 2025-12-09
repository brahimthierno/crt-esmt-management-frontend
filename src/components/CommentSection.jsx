import React, { useState } from 'react';
import { MessageSquare, Send, Trash2, User, Clock } from 'lucide-react';

const CommentSection = ({ 
  intervention, 
  currentUser, 
  onAddComment, 
  onDeleteComment,
  loading 
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAdmin = currentUser?.role === 'admin';
  const isAssignedTech = intervention?.technicien?._id === currentUser?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      alert('Veuillez entrer un commentaire');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddComment(intervention._id, newComment.trim());
      setNewComment('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
      alert('Erreur lors de l\'ajout du commentaire');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      try {
        await onDeleteComment(intervention._id, commentId);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression du commentaire');
      }
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    
    return d.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canComment = isAdmin || isAssignedTech;
  const comments = intervention?.commentaires || [];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-600">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <MessageSquare size={20} className="text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            Commentaires
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {comments.length} commentaire{comments.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Liste des commentaires */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare size={48} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400">
              Aucun commentaire pour le moment
            </p>
            {canComment && (
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Soyez le premier à commenter
              </p>
            )}
          </div>
        ) : (
          comments.map((comment) => {
            const isOwnComment = comment.auteur?._id === currentUser?._id;
            const canDelete = isAdmin || isOwnComment;

            return (
              <div 
                key={comment._id}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  isOwnComment
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    {/* Avatar */}
                    <div className={`p-2 rounded-full ${
                      isOwnComment 
                        ? 'bg-blue-200 dark:bg-blue-800' 
                        : 'bg-gray-200 dark:bg-gray-600'
                    }`}>
                      <User size={16} className={
                        isOwnComment 
                          ? 'text-blue-700 dark:text-blue-300' 
                          : 'text-gray-600 dark:text-gray-300'
                      } />
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">
                          {comment.auteur?.prenom} {comment.auteur?.nom}
                        </span>
                        {isOwnComment && (
                          <span className="text-xs px-2 py-0.5 bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-full">
                            Vous
                          </span>
                        )}
                        <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full capitalize">
                          {comment.auteur?.role}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap break-words">
                        {comment.texte}
                      </p>
                      
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock size={12} />
                        <span>{formatDate(comment.date)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bouton supprimer */}
                  {canDelete && (
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                      title="Supprimer"
                      disabled={loading}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Formulaire d'ajout */}
      {canComment ? (
        <form onSubmit={handleSubmit} className="pt-3 border-t border-gray-200 dark:border-gray-600">
          <div className="flex gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full self-start">
              <User size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                rows="3"
                disabled={isSubmitting || loading}
              />
              
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || loading || !newComment.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Envoyer
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-3">
            Seul le technicien assigné et les administrateurs peuvent commenter
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;