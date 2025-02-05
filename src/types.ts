export interface Ville {
  id: number;
  name: string;
  discount: string;
  category: string;
  description: string;
  price: string;
}
export interface CategorieIcon {
  id: number;
  libelle: string;
  iconUrl: string;
}
export interface Ville {
  id: number;
  libelle: string;
}

export interface Appartement {
  id: number;
  nombrePiece: number;
  loyer: string;
  numeroAppartement: string;
  details: string;
  numeroEtatge: string;
  occupe: number;
}

export interface User {
  id: string;
  role: [];
  token: string;
  username: string;
  type: string;
  status: string;
  payement: string;
  avatar: string;
}

export interface Civilite {
  id: number;
  code: string;
  libelle: string;
}

export interface Menu {
  id: number;
  libelle: string;
  code: string;
  icon: string;
}

export interface sMenu {
  id: number;
  libelle: string;
}
export interface Stats {
  civilite: string;
  nombre: number;
}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
  role: string;
  status: string;
  enabled: string;
  createdAt: string;
}

export interface Role {
  id: string;
  libelle: string;
}
export interface Tarifaire {
  id: string;
  serviceCode: string;
  montantDebut: number;
  montantFin: number;
  tauxRemise: number;
  montantRemise: number;
}
export interface AccountLoyalty {
  id: string;
  userId: string;
  solde: number;
  status: number;
}
export interface TransactionLoyalty {
  id: string;
  montant: number;
  refTransaction: string;
  serviceName: string;
  serviceCode: string;
  type: string;
  date: string;
}

export interface Icon {
  id: number;
  code: string;
  description: string;
}

export interface Permission {
  id: number;
  libelle: string;
  code: string;
}

export interface UserAdmin {
  id: number;
  username: string;
  email: string;
  roles: string[];
  nom: string;
  prenoms: string;
  phone: string;
  status: string;
  typeUser: string;
}
export interface Features {
  id: number;
  libelle: string;
  url: string;
  icon: {
    id: number;
    code: string;
  };
}
export interface Boutique {
  id: number;
  libelle: string;
  createdAt: string;
  tel: string;
  email: string;
  nbVente: string;
  statut: string;
  logo: string;
}

export interface Commande {
  id: number;
  libelle: string;
  dateCommande: string;
  quantite: number;
  prixUnitaire: string;
  lieuLivraison: string;
  userId: string;
  statut: string;
  username: string;
  boutiqueId: string;
  articleId: string;
}
export interface Place {
  id: number;
  name: string;
  description: string;
  address: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  tel1: string;
  tel2: string;
  userId: string;
}

export interface Test {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface ConfigurationMenu {
  libelle: string;
  id: number;
  menu_directe: Menu[];
  sous_menu: {
    libelle: string;
    icon: string;
    menus: Menu[];
  }[];
}
export interface Operation {
  id: number;
  service: string;
  transaction_id: string;
  user: {
    user_id: "123456789";
    name: string;
    phone_number: string;
    email: string;
  };
  payment_method: string;
  transaction_details: {
    amount: number;
    amount_currency: string;
    transaction_date: string;
    status: string;
    reference: string;
  };
  support_details: {
    ticket_id: string;
    issue_description: string;
    date_reported: string;
    status: string;
    assigned_agent: string;
  };
}
export interface Access {
  id: any;
  isMenuDirect: boolean;
  module: any;
  feature: any;
  permission: any;
  sous_menu: any;
}

export interface provider_operateur {
  id: number;
  libelle: string;
  code: string;
}
export interface Ticket {
  id: number;
  descr: string;
  code: string;
  objet: string;
  user: {
    id: number;
    phone: string;
    nom: string;
  };
  categorie: {
    id: number;
    libelle: string;
    code_couleur: string;
  };
  status: {
    id: number;
    libelle: string;
    code_couleur: string;
  };
  priorite: {
    id: number;
    libelle: string;
    code_couleur: string;
  };
  service: {
    id: number;
    libelle: string;
  };
  ticket_createur: string;
  date_creation: string;
  date_resolution: string;
}

export interface servicePopulaire {
  id: number;
  url: string;
  libelle: string;
}

export interface AccessData {
  id: number;
  isMenuDirect: boolean;
  module: {
    id: number;
    libelle: string;
    ordreModule: number;
  };
  feature: {
    id: number;
    libelle: string;
    ordreFeature: number;
  };
  permission: {
    id: number;
    libelle: string;
  };
  role: {
    id: number;
    libelle: string;
  };
  sous_menu: {
    id: number;
    libelle: string;
  };
}

export interface Module {
  id: number;
  libelle: string;
  icon: {
    id: number;
    code: string;
  };
}

export interface Icon {
  id: number;
  description: string;
  code: string;
}
export interface Feature {
  id: number;
  libelle: string;
  url: string;
  icon: {
    id: number;
    code: string;
  };
}
export interface permission {
  id: number;
  libelle: string;
}
export interface SousMenu {
  id: number;
  libelle: string;
}
export interface Select {
  id: number;
  libelle: string;
}
export interface professionnel {
  nom: string;
  prenoms: string;
  phone: string;
  email: string;
  type: string;

  user: {
    username: string;
    email: string;
    phone: string;
    typeUser: string;
  };
}
export interface EndUser {
  id: string; // Identifiant unique de l'utilisateur
  public_id: string; // Identifiant public
  first_name: string; // Prénom de l'utilisateur (peut être null)
  last_name: string; // Nom de famille de l'utilisateur (peut être null)
  is_enabled: boolean; // Statut d'activation de l'utilisateur
  email: string; // Email de l'utilisateur (peut être null)
  birth_date: string; // Date de naissance de l'utilisateur au format ISO (peut être null)
  login: string; // Login de l'utilisateur
  full_login: string; // Login complet avec code pays
  created_at: string; // Date de création de l'utilisateur au format ISO
  updated_at: string; // Date de mise à jour de l'utilisateur au format ISO
  country_code: string; // Code du pays de l'utilisateur (peut être null)
  fcm_token: string; // Token FCM (Firebase Cloud Messaging) pour les notifications (peut être null)
  qr_account: string; // QR code lié au compte de l'utilisateur (peut être null)
  owner_code: string; // Code propriétaire associé à l'utilisateur (peut être null)
  parent_code: string; // Code parent pour relations hiérarchiques (peut être null)
  authorize_share_data: boolean; // Autorisation pour partager les données de l'utilisateur (peut être null)
  photo_profil: string; // URL ou chemin de la photo de profil de l'utilisateur (peut être null)
  card_id_recto: string; // Image ou donnée du recto de la carte d'identité (peut être null)
  card_id_verso: string; // Image ou donnée du verso de la carte d'identité (peut être null)
  card_id_expire_date: string; // Date d'expiration de la carte d'identité (peut être null)
  card_id_edition_date: string; // Date d'édition de la carte d'identité (peut être null)
  document_status: string; // Statut du document de l'utilisateur (peut être null)
}
