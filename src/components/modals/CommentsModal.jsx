import React from 'react';
import { X, MessageSquare } from 'lucide-react';
import CommentSection from '../CommentSection';

const CommentsModal = ({ 
  intervention, 
  currentUser, 
  onClose, 
  onAddComment, 
  onDeleteComment,
  loading 
}) => {
  if (!intervention) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <MessageSquare size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Discussion
                </h3>
                <p className="text-blue-100 mt-1">
                  {intervention.titre}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
        </div>

        {/* Informations de l'intervention */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Technicien</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {intervention.technicien?.prenom} {intervention.technicien?.nom}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Type</p>
              <p className="font-semibold text-gray-900 dark:text-white capitalize">
                {intervention.type}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Statut</p>
              <p className="font-semibold text-gray-900 dark:text-white capitalize">
                {intervention.statut.replace(/_/g, ' ')}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Priorité</p>
              <p className={`font-semibold capitalize ${
                intervention.priorite === 'haute' ? 'text-red-600 dark:text-red-400' :
                intervention.priorite === 'moyenne' ? 'text-yellow-600 dark:text-yellow-400' :
                'text-green-600 dark:text-green-400'
              }`}>
                {intervention.priorite}
              </p>
            </div>
          </div>
        </div>

        {/* Section des commentaires */}
        <div className="p-6 max-h-[calc(90vh-280px)] overflow-y-auto">
          <CommentSection
            intervention={intervention}
            currentUser={currentUser}
            onAddComment={onAddComment}
            onDeleteComment={onDeleteComment}
            loading={loading}
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg transition-colors font-medium text-gray-700 dark:text-gray-300"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;