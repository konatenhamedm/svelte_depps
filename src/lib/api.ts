import cookie from "cookie";

export const BASE_URL_API = "https://depps.leadagro.net/api"; // Remplacez par l'URL de votre API
export const BASE_URL_API_V2 = "http://127.0.0.1:8000/api"; // Remplacez par l'URL de votre API

export async function apiFetch(
  provenance : boolean ,
  url: string,
  method: string = "GET",
  data: any = null,
  options: RequestInit = {}
): Promise<any> {
  let token = null;

  // Ensure this code runs only on the client (browser)
  if (typeof document !== "undefined") {
    const parsedCookies = cookie.parse(document.cookie);
    if (parsedCookies.auth) {
      token = JSON.parse(parsedCookies.auth).token;
    }
  }

  // Add Authorization header if a token is present
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Add default headers for requests with a payload
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
  }

  // Set the request method
  options.method = method;

  // Add the request body if data is present
  if (data) {
    options.body = JSON.stringify(data);
  }

  // Perform the fetch request
  const response = await fetch(
    provenance ? BASE_URL_API + url : BASE_URL_API_V2 + url,
    options
  );

  // Check for errors
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Unauthorized");
    }
    throw new Error(`Error: ${response.statusText}`);
  }

  // Return the response as JSON
  return response.json();
}
