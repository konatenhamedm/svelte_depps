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

      const { token, data: { id, username, role, type, status, payement, avatar } } = jsonData;

      // Stocker l'objet utilisateur dans un cookie accessible côté client
      document.cookie = `auth=${encodeURIComponent(JSON.stringify({
          id, username, role, token, type, status, payement, avatar
      }))}; path=/; max-age=${60 * 60 * 24}; secure=${location.protocol === 'https:' ? 'true' : 'false'}`;

      return jsonData;
  } catch (error) {
      console.error('Erreur de connexion:', error);
      return { token: null };
  }
}


export async function loginUserFront(username_field: string, password: string) {
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

      const { token, data: { id, username, role, type, status, payement, avatar } } = jsonData;

      // Stocker dans localStorage
      localStorage.setItem('auth', JSON.stringify({ 
          id, username, role, token, type, status, payement, avatar 
      }));

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

export function logout(): void {

  alert("Vous avez quité votre session.");
  document.cookie = cookie.serialize("auth", "", {
      path: "/",
      expires: new Date(0) // Définit une date d'expiration passée pour supprimer le cookie
  });

  console.log("Utilisateur déconnecté.");
  window.location.href = "/";
  
}

export function logoutKIte() {
    // Supprimer le token d'authentification en vidant le cookie
    document.cookie = cookie.serialize('auth', '', {
        expires: new Date(0),
        path: '/'
    });
   
}


// Nouvelle fonction pour obtenir les cookies
export function getAuthCookie(): User | null {
  try {
      // Récupérer et parser les cookies
      const cookies = cookie.parse(document.cookie);
      
      if (!cookies.auth) {
          console.warn("Aucun cookie d'authentification trouvé.");
          return null;
      }

      // Décoder et parser l'objet utilisateur
      const auth = JSON.parse(cookies.auth);
     console.log(auth);
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

export function getAuthCookie_():User {
  // Parse les cookies du document
  const cookies = cookie.parse(document.cookie);

  // Récupère le cookie "auth"
/*    if (cookies.auth) {  */
      const auth = JSON.parse(cookies.auth);
      const user = { id: auth.id,email:auth.email, role: auth.role,token:auth.token ,username: auth.username, type: auth.type, status: auth.status, payement: auth.payement, avatar: auth.avatar };
      
      return user;
 /*  }  */

  
  //Si aucun cookie d'authentification n'est trouvé
  //return null;
}