import React, { useState } from 'react';

const PlanningView = ({ interventions, users, currentUser }) => {
  const [viewMode, setViewMode] = useState('semaine');
  const [currentDate, setCurrentDate] = useState(new Date());

  const myInterventions = currentUser.role !== 'admin' 
    ? interventions.filter(i => i.technicien?._id === currentUser._id)
    : interventions;

  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay() + 1);
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      return day;
    });
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getInterventionsForDate = (date) => {
    const dateStr = formatDate(date);
    return myInterventions.filter(i => {
      const interventionDate = i.dateDebut?.split('T')[0];
      return interventionDate === dateStr;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Planning</h2>
        <div className="flex gap-3">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="jour">Jour</option>
            <option value="semaine">Semaine</option>
            <option value="mois">Mois</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              if (viewMode === 'jour') newDate.setDate(newDate.getDate() - 1);
              else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() - 7);
              else newDate.setMonth(newDate.getMonth() - 1);
              setCurrentDate(newDate);
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            ← Précédent
          </button>
          
          <h3 className="text-xl font-semibold">
            {viewMode === 'mois' 
              ? currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
              : currentDate.toLocaleDateString('fr-FR')}
          </h3>
          
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              if (viewMode === 'jour') newDate.setDate(newDate.getDate() + 1);
              else if (viewMode === 'semaine') newDate.setDate(newDate.getDate() + 7);
              else newDate.setMonth(newDate.getMonth() + 1);
              setCurrentDate(newDate);
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Suivant →
          </button>
        </div>

        {viewMode === 'jour' && (
          <div className="space-y-3">
            {getInterventionsForDate(currentDate).map(intervention => {
              const tech = intervention.technicien;
              return (
                <div key={intervention._id} className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{intervention.heureDebut} - {intervention.titre}</p>
                      <p className="text-sm text-gray-600">{intervention.lieu}</p>
                      {currentUser.role === 'admin' && tech && (
                        <p className="text-sm text-gray-500">Technicien: {tech.prenom} {tech.nom}</p>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      intervention.statut === 'terminee' ? 'bg-green-100 text-green-800' :
                      intervention.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {intervention.statut === 'terminee' ? 'Terminée' :
                       intervention.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
                    </span>
                  </div>
                </div>
              );
            })}
            {getInterventionsForDate(currentDate).length === 0 && (
              <p className="text-center text-gray-500 py-8">Aucune intervention prévue</p>
            )}
          </div>
        )}

        {viewMode === 'semaine' && (
          <div className="grid grid-cols-7 gap-2">
            {getWeekDays().map((day, idx) => (
              <div key={idx} className="border rounded-lg p-3 min-h-[150px]">
                <p className="font-semibold text-sm mb-2">
                  {day.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}
                </p>
                <div className="space-y-2">
                  {getInterventionsForDate(day).map(intervention => (
                    <div key={intervention._id} className="p-2 bg-blue-100 rounded text-xs">
                      <p className="font-semibold truncate">{intervention.heureDebut}</p>
                      <p className="truncate">{intervention.titre}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'mois' && (
          <div className="grid grid-cols-7 gap-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
              <div key={day} className="text-center font-semibold text-sm p-2">
                {day}
              </div>
            ))}
            {getMonthDays().map((day, idx) => (
              <div key={idx} className="border rounded-lg p-2 min-h-[100px]">
                <p className="text-sm font-semibold mb-1">{day.getDate()}</p>
                <div className="space-y-1">
                  {getInterventionsForDate(day).map(intervention => (
                    <div 
                      key={intervention._id} 
                      className="w-2 h-2 rounded-full bg-blue-500" 
                      title={intervention.titre} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanningView;