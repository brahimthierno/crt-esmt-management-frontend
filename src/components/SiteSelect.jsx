import React from 'react';
import { MapPin } from 'lucide-react';

const SiteSelect = ({ value, onChange, required = false, className = '' }) => {
  // Sites organisés par bâtiment
  const sitesByBuilding = {
    'Bâtiment AD': [
      { value: 'Bureau_Accueil', label: 'Bureau Accueil' },
      { value: 'Bureau_Chauffeurs', label: 'Bureau Chauffeurs' },
      { value: 'Bureau_Comptabilite', label: 'Bureau Comptabilité' },
      { value: 'Bureau_DAF', label: 'Bureau DAF' },
      { value: 'Bureau_DEFR', label: 'Bureau DEFR' },
      { value: 'Bureau_DG', label: 'Bureau DG' },
      { value: 'Bureau_DRH', label: 'Bureau DRH' },
      { value: 'Bureau_DRI', label: 'Bureau DRI' },
      { value: 'Bureau_MDI', label: 'Bureau MDI' },
      { value: 'Bureau_Scolarite', label: 'Bureau Scolarité' },
      { value: 'Bureau_SG', label: 'Bureau SG' }
    ],
    'Bâtiment HA': [
      { value: 'Bibliothèque', label: 'Bibliothèque' },
      { value: 'Bureau_RDC', label: 'Bureau RDC' },
      { value: 'Bureau_Etage', label: 'Bureau Étage' },
      { value: 'Cyber', label: 'Cyber' }
    ],
    'Bâtiment HB': [
      { value: 'Bureau_Etage1', label: 'Bureau Étage 1' },
      { value: 'Bureau_Etage2', label: 'Bureau Étage 2' },
      { value: 'Bureau_Etage3', label: 'Bureau Étage 3' },
      { value: 'Bureau_Etage4', label: 'Bureau Étage 4' },
      { value: 'Bureau_RDC1', label: 'Bureau RDC1' },
      { value: 'Bureau_RDC2', label: 'Bureau RDC2' },
      { value: 'Centre_de_Certification', label: 'Centre de Certification' }
    ],
    'Bâtiment E': [
      { value: 'CRT', label: 'CRT' },
      { value: 'E11', label: 'E11' }
    ],
    'Foyer': [
      { value: 'Cuisine', label: 'Cuisine' }
    ]
  };

  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Lieu
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Sélectionnez un lieu</option>
        {Object.entries(sitesByBuilding).map(([batiment, sites]) => (
          <optgroup key={batiment} label={batiment}>
            {sites.map((site) => (
              <option key={site.value} value={site.value}>
                {site.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

export default SiteSelect;