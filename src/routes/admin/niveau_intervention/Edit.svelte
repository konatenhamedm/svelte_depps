<script lang="ts">
  import Spinner from '$components/_skeletons/Spinner.svelte';
  import InputSimple from '$components/inputs/InputSimple.svelte';
  import {BASE_URL_API} from '$lib/api';
  import {Button, Input, Label, Modal, Textarea} from 'flowbite-svelte';
  import InputTextArea from '$components/inputs/InputTextArea.svelte';

  export let open: boolean = false; // modal control
  let isLoad = false;
  let code: string = '';
  let libelle: string = '';
  let montant: string = '';
  let  montantRenouvellement: string = '';

  export let sizeModal: any = 'lg';

  export let userUpdateId: any;
  export let data: Record<string, string> = {};

  // Initialize form data with the provided record
  function init(form: HTMLFormElement) {
    code = data?.code;
    libelle = data?.libelle;
    montant = data?.montant;
    montantRenouvellement = data?.montantRenouvellement;
  }

  async function SaveFunction() {
    isLoad = true;

    try {
      const res = await fetch(
        BASE_URL_API + '/niveauIntervention/update/' + data?.id,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            libelle: libelle,
            code: code,
            montantRenouvellement: montantRenouvellement,
            montant: montant,
            userUpdate: userUpdateId,
          }),
        }
      );

      if (res.ok) {
        console.log('Saved successfully', res);
        isLoad = false;
        open = false; // Close the modal
      }
    } catch (error) {
      console.error('Error saving:', error);
    }
  }

  function handleModalClose(event: Event) {
    if (isLoad) {
      event.preventDefault();
    }
  }
</script>

<Modal
  bind:open
  title={Object.keys(data).length
    ? 'Modification niveau intervention'
    : 'Modification niveau intervention'}
  size={sizeModal}
  class="m-4 modale_general"
  on:close={handleModalClose}
>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
  />
  <div class="space-y-6 p-0">
    <form action="#" use:init>
      <div class="grid grid-cols-1">
        <InputSimple
          fieldName="code"
          label="Code"
          bind:field={code}
          placeholder="entrez le code"
          class="w-full"
        ></InputSimple>
 

        <InputSimple
          fieldName="libelle"
          label="Libelle"
          bind:field={libelle}
          placeholder="entrez le libelle"
          class="w-full"
        ></InputSimple>
               <InputSimple
          fieldName="montant"
          label="Montant"
          bind:field={montant}
          placeholder="entrez le montant"
          class="w-full"
        ></InputSimple>
        <InputSimple
          fieldName="montantRenouvellement"
          label="Montant Renouvellement"
          bind:field={montantRenouvellement}
          placeholder="entrez le montant de renouvellement"
          class="w-full"
        ></InputSimple>
      </div>
    </form>
  </div>

  <!-- Modal footer -->
  <div slot="footer" class="w-full">
    <div class="flex justify-end">
      {#if isLoad}
        <Button
          disabled={true}
          color="blue"
          style="background-color: #55a1ff;"
          type="submit"
        >
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
        </Button>
      {:else}
        <button
          type="button"
          style="background-color: #55a1ff;"
          class="bg-[#55a1ff] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#008020]"
          on:click={SaveFunction}
        >
          Modifier
        </button>
      {/if}
    </div>
  </div>
</Modal>
