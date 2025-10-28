import React from 'react';
import { Wrench, Clock, CheckCircle, Package, Calendar } from 'lucide-react';

const Dashboard = ({ currentUser, interventions, stock, emprunts }) => {
  const myInterventions = currentUser.role !== 'admin' 
    ? interventions.filter(i => i.technicien?._id === currentUser._id)
    : interventions;

  const statsCards = currentUser.role === 'admin' ? [
    { 
      label: 'Total Interventions', 
      value: interventions.length, 
      color: 'bg-blue-500',
      icon: <Wrench />
    },
    { 
      label: 'En cours', 
      value: interventions.filter(i => i.statut === 'en_cours').length, 
      color: 'bg-yellow-500',
      icon: <Clock />
    },
    { 
      label: 'Terminées', 
      value: interventions.filter(i => i.statut === 'terminee').length, 
      color: 'bg-green-500',
      icon: <CheckCircle />
    },
    { 
      label: 'Matériels en stock', 
      value: stock.length, 
      color: 'bg-purple-500',
      icon: <Package />
    }
  ] : [
    { 
      label: 'Mes interventions', 
      value: myInterventions.length, 
      color: 'bg-blue-500',
      icon: <Wrench />
    },
    { 
      label: 'En cours', 
      value: myInterventions.filter(i => i.statut === 'en_cours').length, 
      color: 'bg-yellow-500',
      icon: <Clock />
    },
    { 
      label: 'Terminées', 
      value: myInterventions.filter(i => i.statut === 'terminee').length, 
      color: 'bg-green-500',
      icon: <CheckCircle />
    },
    { 
      label: 'Planifiées', 
      value: myInterventions.filter(i => i.statut === 'planifiee').length, 
      color: 'bg-orange-500',
      icon: <Calendar />
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Tableau de bord</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, idx) => (
          <div key={idx} className={`${stat.color} text-white rounded-lg p-6 shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className="opacity-80">
                {React.cloneElement(stat.icon, { size: 32 })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">
          {currentUser.role === 'admin' ? 'Interventions récentes' : 'Mes interventions à venir'}
        </h3>
        <div className="space-y-3">
          {myInterventions.slice(0, 5).map(intervention => (
            <div key={intervention._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">{intervention.titre}</p>
                <p className="text-sm text-gray-600">
                  {intervention.lieu} - {new Date(intervention.dateDebut).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                intervention.statut === 'terminee' ? 'bg-green-100 text-green-800' :
                intervention.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {intervention.statut === 'terminee' ? 'Terminée' :
                 intervention.statut === 'en_cours' ? 'En cours' : 'Planifiée'}
              </span>
            </div>
          ))}
          {myInterventions.length === 0 && (
            <p className="text-center text-gray-500 py-8">Aucune intervention</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;