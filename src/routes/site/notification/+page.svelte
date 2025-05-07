<script lang="ts">
    import {onMount} from "svelte";
    import Footer from "$components/Footer.svelte";
    import Header from "$components/Header.svelte";
    import Slide from "$components/Slide.svelte";
    import NotificationSkeleton from "$components/NotificationSkeleton.svelte";
  import { goto } from "$app/navigation";

    let notifications:any = [];
    let notificationsnotRead = [];
    let isLoading = true;

    let currentPage = 1;
    const itemsPerPage = 3;

    let searchQuery = "";
    let totalNotifications = 0;
    let totalNotificationsNoRead = 0;

    $: paginatedalertes = notifications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Calcul du nombre total de pages
    export let totalPages = 10;

    // Calcul du nombre total de pages
    $: totalPages = Math.ceil(notifications.length / itemsPerPage);

    // Fonction pour changer de page
    function goToPage(page: any) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }


    function getPageNumbers() {
        let pages = [];
        if (totalPages <= 7) {
            // Affiche toutes les pages si <= 7 pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage > 3) pages.push(1, '...');
            for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push('...', totalPages);
        }
        return pages;
    }

    export let data;
    let user = data?.user;

    // État pour gérer la notification sélectionnée et le popup
    let selectedNotification:any = null;
    let isPopupOpen = false;

    // Fonction pour ouvrir le popup avec la notification sélectionnée
    function openPopup(notification:any) {
        selectedNotification = notification;
        isPopupOpen = true;
    }

    // Fonction pour fermer le popup
    function closePopup() {
        isPopupOpen = false;
        selectedNotification = null;
        fetchData();
    }

    async function fetchData() {
        try {
            const response = await fetch(`https://prodmydepps.leadagro.net/api/notification/by/${user.id}`);
            if (response.ok) {
                const result = await response.json();
                if (result.code === 200 && result.data) {
                    notifications = result.data;
                    notificationsnotRead = notifications.filter(notif => notif.isRead === false);
                    totalNotifications = notifications.length;
                    totalNotificationsNoRead = notificationsnotRead.length;


                } else {
                    console.error("Erreur dans la réponse de l'API:", result.message);
                }
            } else {
                console.error("Erreur de récupération:", response.statusText);
            }
        } catch (error) {
            console.error("Erreur API:", error);
        }finally {
            isLoading = false;
        }
    }

    onMount(async () => {
        await fetchData();
    });

    async function deleteNotification(id) {
        try {
            const response = await fetch(`https://prodmydepps.leadagro.net/api/notification/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({notificationId: id})
            });

            if (response.ok) {
                notifications = notifications.filter(notif => notif.id !== id);
                totalNotifications = notifications.length;
                console.log("Notification supprimée avec succès");
            } else {
                console.error("Erreur lors de la suppression:", response.statusText);
            }
        } catch (error) {
            console.error("Erreur API:", error);
        }
    }

    async function markAsRead(id) {
        try {
            const response = await fetch(`https://prodmydepps.leadagro.net/api/notification/read/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({notificationId: id}) // Utiliser l'ID de la notification
            });

            if (response.ok) {
                await fetchData(); // Actualiser la liste des notifications
                const notification = notifications.find(notif => notif.id === id);
                if (notification) {
                    notification.isRead = true;
                    openPopup(notification); // Ouvrir le popup après avoir marqué comme lu
                }
            } else {
                console.error("Erreur lors du marquage comme lu:", response.statusText);
            }
        } catch (error) {
            console.error("Erreur API:", error);
        }
    }

    function navigateToDashboard() {
    goto("/site/dashboard");
  }
</script>

<Header/>
<Slide/>

<div class="file-ariane flex items-center space-x-2 text-sm text-gray-600 mb-4">
    <button on:click={navigateToDashboard} class="flex items-center hover:text-blue-600">
      <!-- Icône SVG pour "Tableau de bord" -->
      <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
      >
        <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
        />
      </svg>
      Tableau de bord
    </button>
    <span>/</span>
    <span class="text-gray-800">Liste des notifications</span> <!-- Nom de la page actuelle -->
  </div><br><br><br><br><br><br><br><br><br><br><br>

<main style="background-color: #fff" class="pb-20">
    <style>
        .entete {
            width: 80% !important;
        }
        .tablo:not(:last-child) {
            margin-bottom: 35px;
        }
        .dropify-wrapper .dropify-message p {
            text-align: center;
        }
        .dropify-wrapper .dropify-message span.file-icon {
            font-size: 50px;
            color: #ccc;
            display: none;
        }
        .dropify-wrapper {
            height: 100px !important;
        }
        .col-md-3 {
            margin-top: 15px !important;
        }
        .iletisim-form-alani {
            padding: 20rem 157px 10rem !important;

            background-color: #fff;
        }
        .main-div {
            margin-top: -10px;
            margin-bottom: 130px;
            /* border: 1px solid #e5e7eb; */
            background: transparent;
            border-radius: 10px;
            padding: 20rem 316px 10rem !important;
        }

        .file-ariane {
            position: absolute;
            width: 100%;
            top: 96px;
            background: #4292cecc;
            padding: 22px;
            color: white;
            font-size: 14px;
            justify-content: center;
            align-items: center;
        }

        .file-ariane span {
            color: white;
            margin: 0 5px;
        }
        .pagination-controls {
            /* display: flex; */
            justify-content: center;
            align-items: center;
            margin-top: 20px;
        }
        .pagination-controls button {
            margin: 0 10px;
            padding: 5px 10px;
            background-color: #f57f30;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .pagination-controls button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }

        .pagination-controls span {
            margin: 0 10px;
        }



    </style>
    <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
            crossorigin="anonymous"
    />
    <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
            integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
    />
    <section class="hakkimizda-bolumu-anasayfa1 iletisim-form-alani" style="padding-top:120px">
        <div class="container">
            <div class="masqueur à effet de révélation d'image de projet wow">

                {#if notifications.length > 0}
                    {#each notifications as notification, index}
                        <div
                                class="services-kutu2 project-image reveal-effect masker wow"
                                style="cursor: pointer; visibility: visible; width: 100%; margin-bottom: 15px;"
                        >
                            <div class="row">
                                <div class="col-md-1">
                                    <i
                                            style="font-size: 25px; margin-top: 12px; color: #f57f30;"
                                            class="fa fa-bell"
                                    ></i>
                                </div>
                                <div class="col-md-6">
                                    <p style="margin-top: 12px;">
                                        {notification.createdAt}
                                    </p>
                                </div>
                                <div class="col-md-3">
                                    {notification.libelle}
                                </div>
                                <div class="col-md-2 d-none d-sm-block">
                                    <form action="#" class="delete_alerte">

                                        <button
                                                on:click={() => deleteNotification(notification.id)}
                                                style="height: 50px; width: 50px; background: red !important; padding: 0;"
                                                class="buton buton--kirmizi"
                                                id="three_customer"
                                        >
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    {/each}
                {:else}
                    <div
                            class="services-kutu2 project-image reveal-effect masker wow"
                            style="cursor: pointer; visibility: visible; width: 100%;"
                    >
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <p style="margin: auto; text-align: center;">
                                    Aucune notification pour l'instant
                                </p>
                            </div>
                        </div>
                    </div>
                {/if}

                <!-- Contrôles de pagination -->
                {#if notifications.length > itemsPerPage}
                    <div class="pagination-controls">

                        <button on:click={() => goToPage(1)} disabled={currentPage === 1}>
                            Premier
                        </button>
                        <button on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                            Précédent
                        </button>
                        {#each getPageNumbers() as page}
                            {#if page === '...'}
                                <span class="dots">...</span>
                            {:else}
                                <button
                                        on:click={() => goToPage(page)}
                                        class:active={page === currentPage}
                                >
                                    {page}
                                </button>
                            {/if}
                        {/each}
                        <button on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                            Suivant
                        </button>


                        <button on:click={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
                            Dernier
                        </button>
                    </div>

                {/if}
                <br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /> <br /><br /><br />
            </div>
        </div>
    </section>
</main>

<!-- Popup pour afficher la notification -->
{#if isPopupOpen && selectedNotification}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 class="text-xl font-semibold mb-4">Détails de la notification</h2>
            <p class="text-gray-800 mb-4">{selectedNotification.libelle}</p>
            <p class="text-xs text-gray-500 mb-4">Date: {selectedNotification.createdAt}</p>
            <button
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    on:click={closePopup}
            >
                Fermer
            </button>
        </div>
    </div>
{/if}

<Footer/>

<style>
    .iletisim-form-alani {
    padding: 20rem 226px 0rem !important;

    background-color: transparent !important;
  }
  .main-div {
    margin-top: -10px;
    margin-bottom: 100px;
    border: 1px solid #e5e7eb;
    background: transparent;
    border-radius: 10px;
    padding: -10px 0px 0px 0px;
  }
  .file-ariane {
    position: absolute;
    width: 100%;
    top: 112px;
    background: #4292cecc;
    padding: 22px;
    color: white;
    font-size: 14px;
  }

  .file-ariane span {
    color: white;
  }
</style>