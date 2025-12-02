// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/interventions/stats';

// // Récupérer le token depuis le localStorage
// const getAuthHeader = () => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
// };

// // Obtenir les statistiques détaillées de durée
// export const getStatsDureeDetaillees = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/duree-detaillees`, getAuthHeader());
//     return response.data;
//   } catch (error) {
//     console.error('Erreur lors de la récupération des stats:', error);
//     throw error;
//   }
// };

// // Obtenir l'évolution des durées dans le temps
// export const getEvolutionDurees = async (periode = 30) => {
//   try {
//     const response = await axios.get(`${API_URL}/evolution-durees?periode=${periode}`, getAuthHeader());
//     return response.data;
//   } catch (error) {
//     console.error('Erreur lors de la récupération de l\'évolution:', error);
//     throw error;
//   }
// };

// // Exporter les données en CSV
// export const exportDonnees = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/export`, {
//       ...getAuthHeader(),
//       responseType: 'blob'
//     });
    
//     // Créer un lien de téléchargement
//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', `interventions_${new Date().toISOString().split('T')[0]}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
    
//     return { success: true };
//   } catch (error) {
//     console.error('Erreur lors de l\'export:', error);
//     throw error;
//   }
// };


// NOUVELLE VERSION AVEC L'EXPORT EN PDF


// import axios from 'axios'; 
import api from './api';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// const API_URL = 'http://localhost:5000/api/interventions/stats';

// Récupérer le token depuis le localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Obtenir les statistiques détaillées de durée
export const getStatsDureeDetaillees = async () => {
  try {
    const response = await api.get('/duree-detaillees', getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error);
    throw error;
  }
};

// Obtenir l'évolution des durées dans le temps
export const getEvolutionDurees = async (periode = 30) => {
  try {
    const response = await api.get('/evolution-durees?periode=${periode}', getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'évolution:', error);
    throw error;
  }
};

// Exporter les données en CSV
export const exportCSV = async () => {
  try {
    const response = await api.get('/export', {
      ...getAuthHeader(),
      responseType: 'blob'
    });
    
    // Créer un lien de téléchargement
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `interventions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de l\'export CSV:', error);
    throw error;
  }
};

// Exporter en PDF avec graphiques
export const exportPDF = async (stats, currentUser) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // En-tête
    pdf.setFontSize(20);
    pdf.setTextColor(37, 99, 235); // Bleu
    pdf.text('Rapport Statistiques des Interventions', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`, pageWidth / 2, yPosition, { align: 'center' });
    pdf.text(`Par: ${currentUser.prenom} ${currentUser.nom} (${currentUser.role})`, pageWidth / 2, yPosition + 5, { align: 'center' });
    
    yPosition += 15;
    
    // Ligne de séparation
    pdf.setDrawColor(200, 200, 200);
    pdf.line(15, yPosition, pageWidth - 15, yPosition);
    yPosition += 10;

    // Statistiques globales
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Statistiques Globales', 15, yPosition);
    yPosition += 8;

    const statsGlobales = stats.statistiquesGlobales;
    pdf.setFontSize(10);
    
    const globalStats = [
      ['Total des interventions', `${statsGlobales.total}`],
      ['Durée moyenne', `${statsGlobales.moyenneGlobale.formattee}`],
      ['Durée minimale', `${statsGlobales.dureeMin.heures}h ${statsGlobales.dureeMin.minutes}min`],
      ['Durée maximale', `${statsGlobales.dureeMax.heures}h ${statsGlobales.dureeMax.minutes}min`]
    ];

    globalStats.forEach(([label, value]) => {
      pdf.setTextColor(100, 100, 100);
      pdf.text(label + ':', 20, yPosition);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont(undefined, 'bold');
      pdf.text(value, 80, yPosition);
      pdf.setFont(undefined, 'normal');
      yPosition += 6;
    });

    yPosition += 5;

    // Statistiques par type
    pdf.setFontSize(14);
    pdf.text('Statistiques par Type d\'Intervention', 15, yPosition);
    yPosition += 8;

    // Tableau
    pdf.setFontSize(9);
    const tableHeaders = ['Type', 'Nombre', 'Durée Moy.', 'Durée Méd.', 'Proportion'];
    const colWidths = [50, 25, 35, 35, 35];
    let xPosition = 15;

    // En-têtes du tableau
    pdf.setFillColor(59, 130, 246); // Bleu
    pdf.setTextColor(255, 255, 255);
    pdf.rect(15, yPosition - 5, pageWidth - 30, 8, 'F');
    
    tableHeaders.forEach((header, index) => {
      pdf.text(header, xPosition + 2, yPosition);
      xPosition += colWidths[index];
    });
    
    yPosition += 8;

    // Lignes du tableau
    pdf.setTextColor(0, 0, 0);
    const TYPE_LABELS = {
      reparation: 'Réparation',
      diagnostic: 'Diagnostic',
      verification: 'Vérification',
      maintenance: 'Maintenance',
      installation: 'Installation'
    };

    stats.statistiquesParType.forEach((stat, index) => {
      xPosition = 15;
      
      // Alternance de couleur de fond
      if (index % 2 === 0) {
        pdf.setFillColor(249, 250, 251);
        pdf.rect(15, yPosition - 5, pageWidth - 30, 7, 'F');
      }

      const proportion = ((stat.count / statsGlobales.total) * 100).toFixed(1);
      const rowData = [
        TYPE_LABELS[stat.type] || stat.type,
        stat.count.toString(),
        stat.moyenne.formattee,
        stat.mediane.formattee,
        `${proportion}%`
      ];

      rowData.forEach((cell, i) => {
        pdf.text(cell, xPosition + 2, yPosition);
        xPosition += colWidths[i];
      });

      yPosition += 7;
      
      // Nouvelle page si nécessaire
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 20;
      }
    });

    yPosition += 10;

    // Capture des graphiques
    const chartsContainer = document.getElementById('charts-container');
    if (chartsContainer) {
      // Nouvelle page pour les graphiques
      pdf.addPage();
      yPosition = 20;
      
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Graphiques et Visualisations', 15, yPosition);
      yPosition += 10;

      const canvas = await html2canvas(chartsContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pageWidth - 30;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Ajuster si l'image est trop grande
      if (imgHeight > pageHeight - yPosition - 20) {
        const scale = (pageHeight - yPosition - 20) / imgHeight;
        pdf.addImage(imgData, 'PNG', 15, yPosition, imgWidth * scale, imgHeight * scale);
      } else {
        pdf.addImage(imgData, 'PNG', 15, yPosition, imgWidth, imgHeight);
      }
    }

    // Pied de page sur toutes les pages
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Page ${i} sur ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      pdf.text('Rapport généré par le Système de Gestion des Interventions', pageWidth / 2, pageHeight - 6, { align: 'center' });
    }

    // Télécharger le PDF
    pdf.save(`statistiques_interventions_${new Date().toISOString().split('T')[0]}.pdf`);
    
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de l\'export PDF:', error);
    throw error;
  }
};