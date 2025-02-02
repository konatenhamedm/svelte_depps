import cookie from "cookie";
import { redirect } from "@sveltejs/kit";
import { logout } from "$lib/auth";

export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get("cookie") || "");
  // Lire et décoder le cookie auth
  let user = null;
  if (cookies.auth) {
    try {
      const auth = JSON.parse(cookies.auth);
      user = { id: auth.id, role: auth.role, token: auth.token };

      console.log(user);
    } catch (e) {
      console.error("Erreur de parsing du cookie auth:", e);
    }
  }

  // Protéger la route /admin en vérifiant l'authentification
  if (event.url.pathname.startsWith("/admin") && !user) {
    return redirect(302, "/login");
  }
  if (
    event.url.pathname == "/login" &&
    user &&
    user.role.includes("ROLE_ADMIN")
  ) {
    // Redirection si l'utilisateur n'est pas authentifié
    return redirect(302, "/admin");
  }
  if (user && !user.role.includes("ROLE_ADMIN")) {
    const response = new Response(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie":
          "auth=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      },
    });
  
    return response;
  }
  // Continuer la requête si tout va bien
  const response = await resolve(event);
  return response;
}
