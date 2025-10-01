<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import {getAuthCookie} from "$lib/auth";

  onMount(() => {
    const user = getAuthCookie();
      console.log("User from cookie:", user);

    if (!user) {
      goto("/login");
      return;
    }

    // Redirection selon le rôle
    if (user.type === "ADMINISTRATEUR") {
      goto("/admin/main");
    } else if (user.type === "INSTRUCTEUR-PROF") {
      goto("/admin/instructeur-dashboard");
    }else if (user.type === "INSTRUCTEUR-ETAB") {
      goto("/admin/instructeur-dashboard");
    } else if (user.type === "DIRECTEUR") {
      goto("/admin/directeur-dashboard");
    } else if (user.type === "SOUS-DIRECTEUR-ETAB") {
      goto("/admin/sous-directeur-etab-dashboard");
    } else if (user.type === "SOUS-DIRECTEUR-PROF") {
      goto("/admin/sous-directeur-prof-dashboard");
    } else if (user.type === "INSPECTEUR-ETAB") {
      goto("/admin/inspecteur-dashboard");
    } else if (user.type === "COMPTABLE") {
      goto("/admin/comptable-dashboard");
    } else if (user.type === "INSTRUCTEUR-SECOND-PROF") {
      goto("/admin/instructeur-second-dashboard");
    } else {
      goto("/unauthorized");
    }
  });
</script>

<p>Chargement...</p>
