<script lang="ts">
    import { onMount } from "svelte";
    import {goto} from "$app/navigation";
    import Header from "$components/_includes/new_site/Header.svelte";
    import {BASE_URL_API_UPLOAD} from "$lib/api";
    import Footer from "$components/_includes/new_site/Footer.svelte";
    import Sub_header from "$components/_includes/new_site/Sub_header.svelte";

    onMount(() => {
        if (!window.location.href.includes('reloaded=true')) {
            window.location.href = window.location.href + (window.location.href.includes('?') ? '&' : '?') + 'reloaded=true';
        }
    });

    function handleLogout() {
        logout();
        window.location.href = "/";
    }
    let hasNotifications = false;
    let notificationCount = 0;

    export let data;
    let user = data?.user;
    let cards:any = [];

    async function logout() {
        await fetch("/auth/logout", { method: "POST" });
        goto("/");
    }

    if(user.type == "PROFESSIONNEL"){
        cards = [
            { icon: 'fas fa-folder-open', text: 'Mise à jour du dossier', link: 'dossiers' },
            { icon: 'fas fa-bell', text: 'Alertes', link: 'alerte' },
            { icon: 'fas fa-tasks', text: 'suivi de mon dossier', link: 'suivi' },
            { icon: 'fas fa-book', text: 'Historique paiements', link: 'paiements' },
            { icon: 'fas fa-file-pdf', text: "Documenthèque", link: "guide-utilisateur" },
            { icon: 'fas fa-users', text: 'Forum', link: 'forum' }
        ];
    }else{
        cards = [
            { icon: 'fas fa-folder-open', text: 'Mise à jour du dossier', link: 'dossiers_etablissement' },
            { icon: 'fas fa-bell', text: 'Alertes', link: 'alerte' },
            { icon: 'fas fa-tasks', text: 'suivi de mon dossier', link: 'suivi' },
            { icon: 'fas fa-book', text: 'Historique paiements', link: 'paiements' },
            { icon: 'fas fa-file-pdf', text: "Documenthèque", link: "guide-utilisateur" },
            { icon: 'fas fa-users', text: 'Forum', link: 'forum' }
        ];
    }

    async function fetchData() {
        try {
            const response = await fetch(`https://prodmydepps.leadagro.net/api/notification/nombre/${user.id}`);
            if (response.ok) {
                const result = await response.json();
                if (result.code === 200 && result.data) {
                    notificationCount = result.data.length;
                } else {
                    console.error("Erreur dans la réponse de l'API:", result.message);
                }
            } else {
                console.error("Erreur de récupération:", response.statusText);
            }
        } catch (error) {
            console.error("Erreur API:", error);
        }
    }

    onMount(async () => {
        await fetchData();
    });
</script>

<Header user="{user}"></Header>
<Sub_header titre="Tableau de bord" subTitles={[{ title: "Tableau de bord", link: "/new_site/dasboard" }]}></Sub_header>

<section class="py-5 md:py-10 bg-gray-50 py-10">
    <div class="container mx-auto px-4">
        <div class="wow animated" style="visibility: visible;">
            <div class="flex flex-col lg:flex-row items-center mb-8">
                <div class="lg:w-2/3 w-full text-center lg:text-left mb-6 lg:mb-0">
                    <h3 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                        Bienvenue sur la<br />
                        plateforme MyDEPPS
                    </h3>
                </div>

                <div class="lg:w-1/3 md:w-2/3 w-full p-4 shadow-sm border rounded bg-white cursor-pointer" onClick={() => {goto('/site/profil')}}>
                    <div class="grid grid-cols-5">
                        <a href="/new_site/notification" class="relative text-blue-500 hover:text-blue-700 flex items-center">
                            <i class="fas fa-bell text-4xl"></i>
                            {#if notificationCount > 0}
                                <span class="absolute -top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
                                    {notificationCount}
                                </span>
                            {/if}
                        </a>

                        <div class="flex items-center col-span-4">
                            <div class="flex-grow">
                                <h4 class="text-xl font-semibold text-gray-800 my-1">
                                    {user?.nom}
                                </h4>
                                <p class="text-gray-600">
                                    {#if user?.type == "PROFESSIONNEL"}
                                        PROFESSIONNEL DE SANTE
                                    {:else}
                                        ETABLISSEMENT DE SANTE
                                    {/if}
                                </p>
                            </div>
                            <div class="ml-3">
                                <div class="rounded-full shadow-sm w-16 h-16 bg-cover bg-center"
                                     style="background-image: url({user?.avatar ? BASE_URL_API_UPLOAD + user?.avatar : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'});">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each cards as { icon, text, link }}
                    <div class="w-full">
                        <a href={link} class="no-underline">
                            <div class="flex flex-col items-center justify-center text-center p-6 rounded-lg border border-blue-500 shadow-md hover:shadow-lg bg-white hover:bg-blue-50 transition-all duration-300 ease-in-out transform hover:scale-105 h-48">
                                <i class="{icon} text-5xl mb-4 text-blue-500"></i>
                                <div class="text-lg font-bold text-gray-800 truncate w-full">{text}</div>
                            </div>
                        </a>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section><br><br><br>

<link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
/>

<Footer></Footer>

<style>
    h3.text-3xl.md\:text-4xl.lg\:text-5xl.font-bold.text-gray-800 {
        text-align: left;
        font-size: 33px;
    }
</style>