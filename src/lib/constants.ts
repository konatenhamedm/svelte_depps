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
    ],
  },
  {
    title: "Profession de pharmacie et de la physique médicale",
    categories: [
      {
        id: "rd_pharmaciens",
        title: "Pharmaciens",
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
