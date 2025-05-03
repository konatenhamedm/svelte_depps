import cookie from "cookie";

export const BASE_URL_API = "https://app.mydepps.net/api"; // Remplacez par l'URL de votre API
export const BASE_URL_API_V2 = "http://127.0.0.1:8000/api"; // Remplacez par l'URL de votre API
export const BASE_URL_API_UPLOAD = "https://app.mydepps.net/uploads/"; // Remplacez par l'URL de votre API

export async function apiFetch(
  provenance: boolean,
  url: string,
  method: string = "GET",
  data: any = null,
  options: RequestInit = {}
): Promise<any> {
  // Définition des headers par défautjjk
  const headers: HeadersInit = {
    ...options.headers,
    ...(method !== "GET" ? { "Content-Type": "application/json" /* ,'Access-Control-Allow-Origin':'https://app.mydepps.net' */} : {}),
  };

  // Configuration de la requête
  const requestOptions: RequestInit = {
    ...options,
    method,
    headers,
    ...(data ? { body: JSON.stringify(data) } : {}),
  };

  try {
    // Effectuer la requête
    const response = await fetch(
      provenance ? BASE_URL_API + url : BASE_URL_API_V2 + url,
      requestOptions
    );

    // Vérifier si la requête a échoué
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Vérifier si la réponse est en JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    
    // Retourner la réponse brute si ce n'est pas du JSON
    return response.text();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}
