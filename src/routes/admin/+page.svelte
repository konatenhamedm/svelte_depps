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
    } else if (user.type === "INSTRUCTEUR") {
      goto("/admin/instructeur-dashboard");
    } else if (user.type === "SOUS-DIRECTEUR") {
      goto("/admin/sous-directeur-dashboard");
    }else if (user.type === "COMPTABLE") {
      goto("/admin/comptable-dashboard");
    } else {
      goto("/unauthorized");
    }
  });
</script>

<p>Chargement...</p>
