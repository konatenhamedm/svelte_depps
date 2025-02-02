import axios from 'axios';
import cookie from 'cookie';
import type { User } from '../types';
import { BASE_URL_API } from './api';


export async function login(username_fiel: string, password: string) {
    try {
        /* document.cookie = cookie.serialize('auth', JSON.stringify({ id:1, role:'SECRETAIRE', token:"ok" }), {
            path: '/',
            httpOnly: false, // Permet de rendre le cookie accessible au client
            secure: false, // Utilisez `true` si votre site est en HTTPS
            maxAge: 60 * 60 * 24 // Durée de vie du cookie (1 jour ici)
        });
         */
        const response = await fetch(`${BASE_URL_API}/auth/login_check`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username_fiel, password })
        });
        
        const jsonData = await response.json();
        const { token, data: { id, username, role, type, status,payement } } = jsonData;


        
        // Stocker l'objet utilisateur (id, role) dans un cookie
        document.cookie = cookie.serialize('auth', JSON.stringify({ id:id,username:username, role: role , token: token,type: type,status:status,payement:payement }), {
            path: '/',
            httpOnly: false, // Permet de rendre le cookie accessible au client
            secure: false, // Utilisez `true` si votre site est en HTTPS
            maxAge: 60 * 60 * 24 // Durée de vie du cookie (1 jour ici)
        });

        return jsonData;
    } catch (error) {
       
        return {
          token:null
        };
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
        path: '/login'
    });
}


// Nouvelle fonction pour obtenir les cookies
export function getAuthCookie():User {
    // Parse les cookies du document
    const cookies = cookie.parse(document.cookie);

        const auth = JSON.parse(cookies.auth);
        const user = { id: auth.id,email:auth.email, role: auth.role,token:auth.token,username:auth.username,type:auth.type,status:auth.status,payement:auth.payement };
        
        return user;
   
}
