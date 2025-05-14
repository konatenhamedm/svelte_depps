<script lang="ts">
    import Notification from "$components/_includes/Notification.svelte";
    import Slide from "$components/Slide.svelte";
    import Header from "$components/Header.svelte";
    import Footer from "$components/Footer.svelte";

    let email = "";
    let showNotification = false;
    let notificationMessage = "";
    let notificationType = "info";
    let loading = false;
    export let data; // Récupérer les données du layout
    let user = data?.user;

    async function handleForgotPassword(event: Event) {
        event.preventDefault();
        loading = true;

        try {
            // Simuler un appel API
            await new Promise((resolve) => setTimeout(resolve, 2000));

            notificationMessage = "Un lien de réinitialisation a été envoyé à votre e-mail.";
            notificationType = "success";
            showNotification = true;
        } catch (error) {
            notificationMessage = "Une erreur est survenue. Veuillez réessayer.";
            notificationType = "error";
            showNotification = true;
        } finally {
            loading = false;
        }
    }
</script>

<Header {user} />
<Slide {user} />
<main class="flex items-center justify-center min-h-screen p-6">
    <div class="w-[500px] bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-bold text-center mb-4">Mot de passe oublié</h2>
        <p class="text-gray-600 text-center mb-6">
            Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
        </p>

        <form on:submit|preventDefault={handleForgotPassword}>
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
                <input
                        type="email"
                        id="email"
                        bind:value={email}
                        required
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Entrez votre e-mail"
                />
            </div>

            <button
                    type="submit"
                    class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    disabled={loading}
            >
                {#if loading}
                    <span class="animate-spin">🔄</span> Envoi en cours...
                {:else}
                    Envoyer
                {/if}
            </button>
        </form>

        <div class="mt-4 text-center">
            <a href="/site/connexion" class="text-blue-500 hover:underline">Retour à la connexion</a>
        </div>
    </div>

    {#if showNotification}
        <Notification message={notificationMessage} type={notificationType} duration={5000} />
    {/if}
</main>
<Footer />

