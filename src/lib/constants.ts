interface Categorie {
  id: string;
  title: string;
}

interface CategorieGRP {
  title: string;
  categories: Categorie[];
}

const categories: Array<CategorieGRP> = [
  {
    title: "Médecins",
    categories: [
      {
        id: "rd_medecins",
        title: "Médecins",
      },
      {
        id: "rd_medecins_specialistes",
        title: "Médecins spécialistes",
      },
      {
        id: "rd_chirurgiens_dentistes",
        title: "Chirurgiens-dentistes",
      },
      {
        id: "rd_chirurgiens_dentistes_specialistes",
        title: "Chirurgiens-dentistes spécialistes",
      },
    ],
  },
  {
    title: "Profession de pharmacie et de la physique médicale",
    categories: [
      {
        id: "rd_pharmaciens",
        title: "Pharmaciens",
      },
      {
        id: "rd_pharmaciens_specialistes",
        title: "Pharmaciens spécialistes",
      },
      {
        id: "rd_physiciens_medicaux",
        title: "Physiciens Médicaux",
      },
      {
        id: "rd_infirmiers",
        title: "Infirmiers",
      },
      {
        id: "rd_infirmiers_specialistes",
        title: "Infirmiers spécialistes",
      },
      {
        id: "rd_sages_femmes",
        title: "Sages-femmes",
      },
      {
        id: "rd_sages_femmes_specialistes",
        title: "Sages-femmes spécialistes",
      },
    ],
  },
  {
    title: "Professions paramédicales",
    categories: [
      {
        id: "rd_dieteticien",
        title: "Diététicien",
      },
      {
        id: "rd_opticiens_optometristes",
        title: "Opticiens / Optométristes",
      },
      {
        id: "rd_audioprothesistes",
        title: "Audioioprothésistes",
      },
      {
        id: "rd_orthoprothesistes",
        title: "Orthoioprothésistes",
      },
      {
        id: "rd_pedicure_pedologue",
        title: "Pédicure, podologue",
      },
      {
        id: "rd_assistants_dentistes",
        title: "Assistants dentistes",
      },
      {
        id: "rd_psychotromiciens",
        title: "Psychotromiciens",
      },
      {
        id: "rd_ergothérapeutes",
        title: "Ergothérapeutes",
      },
    ],
  },
  {
    title: "Technicien Supérieur de la Santé",
    categories: [
      {
        id: "rd_biologie_medicale",
        title: "Biologie Médicale",
      },
    ],
  },
  {
    title: "Auxiliaire des techniques sanitaires",
    categories: [
      {
        id: "rd_soins_obstetricaux",
        title: "Soins obstétricaux",
      },
    ],
  },
  {
    title: "Ingénieur des Techniques Sanitaires",
    categories: [
      {
        id: "rd_techniques_preparation_et_gestion_en_pharmacie",
        title: "Préparation et Gestion en Pharmacie",
      },
    ],
  },
  {
    title: "Ingénieur des Services de Santé",
    categories: [
      {
        id: "rd_services_preparation_et_gestion_en_pharmacie",
        title: "Préparation et Gestion en Pharmacie",
      },
    ],
  },
  {
    title: "Profession de la médecine traditionnelle",
    categories: [
      {
        id: "rd_naturotherapeutes",
        title: "Naturothérapeutes",
      },
    ],
  },
  {
    title: "Profession de la médecine alternative et complémentaire",
    categories: [
      {
        id: "rd_naturotherapie",
        title: "Naturothérapie",
      },
    ],
  },
];

export function getCategories(): Array<CategorieGRP> {
  return categories;
}
