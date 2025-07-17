import cookie from "cookie";
import { redirect } from "@sveltejs/kit";
import { BASE_URL_API } from "$lib/api";

export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get("cookie") || "");
  let user = null;
  let abonnementExpire = false;

  if (cookies.auth) {
    try {
      const auth = JSON.parse(cookies.auth);
      user = {
        id: auth.id,
        role: auth.role,
        token: auth.token,
        username: auth.username,
        type: auth.type,
        status: auth.status,
        avatar: auth.avatar
      };
      
      // ✅ Appel API pour vérifier si l'abonnement a expirédd
      const apiResponse = await fetch(BASE_URL_API + "/paiement/status/renouvellement/" + user?.id, {
        method: "GET",
       /*  headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json"
        } */
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        abonnementExpire = data.data.expire; // adapte selon ta réponsehhh
       
        console.error("Erreur API abonnement:", abonnementExpire);
      } else {
        console.error("Erreur API abonnement:", await apiResponse.text());
      }

    } catch (e) {
      console.error("Erreur parsing ou appel API:", e);
    }
  }

  // ⛔ Redirection pour les pages restreintes si abonnement expiré
  const protectedPagesWhenExpired = [
    "/site/dossiers",
    "/site/forum",
    "/site/documents",
    "/site/chatbox",
    "/site/forum/all-forums",
    "/site/faq",
    "/site/alerte",
    "/site/profil"
  ];

  if (user && abonnementExpire && protectedPagesWhenExpired.some(path => event.url.pathname.startsWith(path))) {
    return redirect(302, "/site/dashboard"); // ou page d'erreur/renouvellement
  }

  // Redirections basées sur le rôle
  if (event.url.pathname.startsWith("/admin") && !user) {
    return redirect(302, "/login");
  }

  if (event.url.pathname === "/login" && user?.role.includes("ROLE_ADMIN")) {
    return redirect(302, "/admin");
  }

  if (event.url.pathname.startsWith("/site") && !user) {
    return redirect(302, "/");
  }

  if (event.url.pathname.startsWith("/site") && user?.role.includes("ROLE_ADMIN")) {
    return redirect(302, "/admin");
  }

  if (event.url.pathname.startsWith("/admin") && user?.role.includes("ROLE_MEMBRE")) {
    return redirect(302, "/site/dossiers");
  }

  // Attache l'utilisateur dans `event.locals` pour y accéder ailleurs
  event.locals.user = user;
  const response = await resolve(event);
  return response;
}
