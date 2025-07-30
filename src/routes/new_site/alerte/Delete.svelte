<script lang="ts">
    import { apiFetch, BASE_URL_API } from "$lib/api";
    import { ExclamationCircleOutline } from "flowbite-svelte-icons";
    import { onMount } from "svelte";

    export let showPopup = false;
    export let closePopup: any;
    let recipients: any = [];

    export let forum = {}; // Forum à éditer

    export let data;
    let loading = false;

    let user = data?.user;
    async function handleSubmit(event: any) {
        loading = true;
        event.preventDefault();
        const formData = new FormData(event.target);
        const updatedForum = {
            ...forum,
            objet: formData.get("objet"),
            message: formData.get("message"),
            destinateur: formData.get("destinateur"),
            userUpdate: user.id,
            user: forum.user.id
        };

        try {
            /* const url = "https://depps.leadagro.net/api/alerte/create"; */

            console.log(updatedForum);

            await apiFetch(
                true,
                "/alerte/delete/" + forum?.id,
                "DELETE",
                updatedForum
            ).then((res) => {
                if (res) {
                    loading = false;
                    closePopup();
                }
            });
        } catch (error) {
            console.error("Erreur lors de l'enregistrement:", error);
            loading = false;
            closePopup();
        } finally {
            loading = false;
        }
    }

    async function getDestinataire() {
        try {
            const response = await fetch(BASE_URL_API + "/destinateur");
            if (!response.ok) {
                throw new Error("Échec de la récupération des destinataires");
            }
            const data = await response.json();
            recipients = data.data;
            console.log("content recipient", recipients);
        } catch (error) {
            console.error("Erreur:", error);
        }
    }

    onMount(() => {
        getDestinataire();

        console.log(forum);
    });
</script>

{#if showPopup}
    <div
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
        <div class="bg-white p-6 rounded-lg shadow-lg w-[43em] forum-con">
            <h2 class="text-xl font-bold mb-4">Supprimer l'alerte</h2>
            <form on:submit={handleSubmit}>
                <ExclamationCircleOutline
                        class="mx-auto mb-4 mt-8 h-10 w-10 text-red-600"
                />

                <h3 class="mb-6 text-center text-lg text-gray-500 dark:text-gray-400">
                    Êtes vous sûr de vouloir supprimer cette donnée?
                </h3>

                <div class="flex justify-end">
                    <button
                            type="button"
                            on:click={closePopup}
                            class="bg-gray-500 text-white buton buton--kirmizi mr-2"
                    >
                        Annuler
                    </button><br />
                    {#if loading}
                        <button type="submit" class="bg-green-500 buton buton--kirmizi">
                            <div class="flex flex-row gap-2">
                                <div
                                        class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"
                                ></div>
                                <div
                                        class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.3s]"
                                ></div>
                                <div
                                        class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"
                                ></div>
                            </div>
                        </button>
                    {:else}
                        <button type="submit" class="bg-red buton buton--kirmizi" style="background-color: red !important;">
                            CONFIRMER LA SUPPRESSION
                        </button>
                    {/if}
                </div>
            </form>
        </div>
    </div>
{/if}
