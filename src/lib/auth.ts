import axios from 'axios';
import cookie from "cookie";
import type { User } from '../types';
import { BASE_URL_API } from './api';


export async function login(username_field: string, password: string) {
  try {
      const response = await fetch(`${BASE_URL_API}/auth/login_check`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username_field, password })
      });

      const jsonData = await response.json();

      if (!response.ok) {
          throw new Error(jsonData.message || 'Erreur lors de la connexion');
      }

      const { token, data: { id, username, role, type, status, payement, avatar,personneId } } = jsonData;

      // Stocker l'objet utilisateur dans un cookie accessible côté client
      document.cookie = `auth=${encodeURIComponent(JSON.stringify({
          id, username, role, token, type, status, payement, avatar,personneId
      }))}; path=/; max-age=${60 * 60 * 24}; secure=${location.protocol === 'https:' ? 'true' : 'false'}`;

      return jsonData;
  } catch (error) {
      console.error('Erreur de connexion:', error);
      return { token: null };
  }
}
export async function loginloginUserFront(username_field: string, password: string) {
  try {
      const response = await fetch(`${BASE_URL_API}/login_check`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username_field, password })
      });

      const jsonData = await response.json();

      if (!response.ok) {
          throw new Error(jsonData.message || 'Erreur lors de la connexion');
      }

      const { token, data: { id, username, role, type, status, payement, avatar,personneId } } = jsonData;

      // Stocker l'objet utilisateur dans un cookie accessible côté client
      document.cookie = `auth=${encodeURIComponent(JSON.stringify({
          id, username, role, token, type, status, payement, avatar,personneId
      }))}; path=/; max-age=${60 * 60 * 24}; secure=${location.protocol === 'https:' ? 'true' : 'false'}`;

      return jsonData;
  } catch (error) {
      console.error('Erreur de connexion:', error);
      return { token: null };
  }
}




export async function motPasseOublie(email:string,newPassword:string){
  try {
    const response = await axios.put(`${BASE_URL_API}/update-password`, JSON.stringify({email, newPassword }));
    const responseData = response.data;
  return true;
  } catch (error) {
    return {
      status: false,
      message: "Veillez réessayer plus tard un probleme est survenu",
    };
  }


}

export function logout() {
  
  // Supprimer le token d'authentification en vidant le cookie
  document.cookie = cookie.serialize('auth', '', {
      expires: new Date(0),
      path: '/'
  });
}


export function logoutKIte() {
   
        // Supprimer le cookie 'auth' lors de la déconnexion
        document.cookie = 'auth=; path=/; max-age=0; secure=' + (location.protocol === 'https:' ? 'true' : 'false');
        
        // Recharger la page après la suppression du cookie
        window.location.reload();
   
}

export function getAuthCookie(): User | null {
  try {
      // Vérifier si on est dans un environnement navigateur
      if (typeof document === 'undefined') {
          console.warn("getAuthCookie() appelé en mode serveur, document non défini.");
          return null;
      }

      // Récupérer et parser les cookies
      const cookies = cookie.parse(document.cookie);
      
      if (!cookies.auth) {
          console.warn("Aucun cookie d'authentification trouvé.");
          return null;
      }

      // Décoder et parser l'objet utilisateur
      const auth = JSON.parse(cookies.auth);
      return {
          id: auth.id || null,
          role: auth.role || "",
          token: auth.token || "",
          username: auth.username || "",
          type: auth.type || "",
          status: auth.status || "",
          payement: auth.payement || "",
          avatar: auth.avatar || "",
          personneId : auth.personneId || ""
      };
  } catch (error) {
      console.error("Erreur lors de la récupération du cookie d'auth:", error);
      return null;
  }
}
export function getAuthCookie_(): User | null {
  try {
      // Vérifier si on est dans un environnement navigateur
      if (typeof document === 'undefined') {
          console.warn("getAuthCookie() appelé en mode serveur, document non défini.");
          return null;
      }

      // Récupérer et parser les cookies
      const cookies = cookie.parse(document.cookie);
      
      if (!cookies.auth) {
          console.warn("Aucun cookie d'authentification trouvé.");
          return null;
      }

      // Décoder et parser l'objet utilisateur
      const auth = JSON.parse(cookies.auth);
      return {
          id: auth.id || null,
          role: auth.role || "",
          token: auth.token || "",
          username: auth.username || "",
          type: auth.type || "",
          status: auth.status || "",
          payement: auth.payement || "",
          avatar: auth.avatar || ""
      };
  } catch (error) {
      console.error("Erreur lors de la récupération du cookie d'auth:", error);
      return null;
  }
}
