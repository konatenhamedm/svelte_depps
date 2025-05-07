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

    let searchQuery = "";
    let totalNotifications = 0;
    let totalNotificationsNoRead = 0;

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
  </div><br>
<main class="mx-auto px-8 py-8 main-divoo"style="padding-top:250px;padding-bottom:142px;">
    <div class="max-w-[125rem] mx-auto p-6">
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <!-- Notification Header -->
            <div class="p-4 border-b flex justify-between items-center">
                <h1 class="text-xl font-semibold">{totalNotificationsNoRead} non lus sur {totalNotifications} {totalNotifications > 0 ? 'Notifications':'Notification' }</h1>
                <div class="relative">
                    <input
                            type="text"
                            placeholder="Search by Name Product"
                            class="pl-10 pr-4 py-2 border rounded-full bg-gray-100 w-64"
                            bind:value={searchQuery}
                    />
                    <svg class="absolute left-3 top-3 w-4 h-4 text-gray-500" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>

            <!-- Notification List -->
            <div class="divide-y">
                {#if isLoading}
                    <NotificationSkeleton count={5} />
                {:else}
                    {#each notifications as notification (notification.id)}
                        <div
                                class="services-kutu2 project-image reveal-effect masker wow"
                                style="cursor: pointer; visibility: visible; width: 100%; margin-bottom: 15px; {!notification.isRead ? 'background-color: #f8f9fa !important;' : ''}"
                        >
                            <div class="row">
                                <div class="col-md-1">
                                    {#if !notification.isRead}
                                        <i style="font-size: 25px; margin-top: 12px; color: #f57f30;" class="fa fa-bell"></i>
                                    {:else}
                                        <i style="font-size: 25px; margin-top: 12px; color: #ccc;" class="fa fa-bell-o"></i>
                                    {/if}
                                </div>
                                <div class="col-md-8">
                                    <p style="margin-top: 12px; margin-bottom: 5px;">
                                        {notification.libelle}
                                    </p>
                                    <p class="text-xs text-gray-500" style="font-size: 12px;">{notification.createdAt}</p>
                                </div>
                                <div class="col-md-3 d-none d-sm-block">
                                    <form action="#" class="delete_alerte">
                                        <button
                                                style="height: 50px; width: 50px; background: red !important; padding: 0; float: right;"
                                                class="buton buton--kirmizi"
                                                id="three_customer"
                                                on:click|stopPropagation={() => deleteNotification(notification.id)}
                                        >
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    {/each}
                {/if}

            </div>
        </div>
    </div>
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