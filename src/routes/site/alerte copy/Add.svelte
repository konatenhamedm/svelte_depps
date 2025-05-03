<script lang="ts">
    import InputSimple from "$components/inputs/InputSimple.svelte";
    import { Button, Label, Modal } from "flowbite-svelte";
    import InputTextArea from "$components/inputs/InputTextArea.svelte";



    export let open: boolean =false;
    export let data: Record<string, string> = {};
    export let sizeModal: string = "xl";
    export let userUpdateId: string;

    let isLoad = false;

    let alerte: any = {
        destinataire: "Adminisration DEPPS",
        objet: "",
        message: "",
    };

    const recipients = [
        "Adminisration DEPPS",
        "controlleur",
        "Etablissement de santé",
        "Professionnel de santé"
    ];

    function init(form: HTMLFormElement) {}

    async function SaveFunction() {
        isLoad = true;
        try {
            const res = await fetch("https://app.mydepps.net/api/alerte/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    destinataire: alerte.destinataire,
                    objet: alerte.objet,
                    message: alerte.message,
                    userUpdate: userUpdateId,
                }),
            });

            if (res.ok) {
                isLoad = false;
                open = false;

            }
        } catch (error) {
            console.error("Error saving:", error);
        }
    }

    function handleModalClose(event: Event) {
        if (isLoad) {
            event.preventDefault(); // Prevent modal from closing if loading
        }
    }
</script>

<p>État de openAdd: {open ? 'Ouvert' : 'Fermé'}</p>

<Modal
        bind:open
        title="Ajouter une alerte"
        size={sizeModal}
        class="m-4 modale_general"
        on:close={handleModalClose}
>
    <div class="space-y-6 p-0">
        <form action="#" use:init>
            <div class="grid grid-cols-1">
                <div class="mb-4">
                    <Label for="destinataire">Destinataire</Label>
                    <select
                            id="destinataire"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md"
                            bind:value={alerte.destinataire}
                    >
                        {#each recipients as recipient}
                            <option value={recipient}>{recipient}</option>
                        {/each}
                    </select>
                </div>

                <InputSimple
                        fieldName="objet"
                        label="Objet"
                        bind:field={alerte.objet}
                        placeholder="Entrez l'objet"
                        class="w-full"
                />

                <InputTextArea
                        fieldName="message"
                        label="Message"
                        bind:field={alerte.message}
                        placeholder="Entrez le message"
                        class="w-full"
                />
            </div>
        </form>
    </div>

    <div slot="footer" class="w-full">
        <div class="flex justify-end">
            {#if isLoad}
                <Button disabled={true} color="blue" style="background-color: blue;" type="submit">
                    <div class="flex flex-row gap-2">
                        <div class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                        <div class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
                        <div class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                    </div>
                </Button>
            {:else}
                <button
                        style="background-color: #55a1ff;"
                        type="button"
                        class="bg-[#55a1ff] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#008020]"
                        on:click={SaveFunction}
                >
                    Enregistrer
                </button>
            {/if}
        </div>
    </div>
</Modal>

