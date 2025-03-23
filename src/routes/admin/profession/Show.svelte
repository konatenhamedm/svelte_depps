<script lang="ts">
  import InputSelect from "$components/inputs/InputSelect.svelte";
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { BASE_URL_API } from "$lib/api";
  import { Button, Input, Label, Modal, Textarea } from "flowbite-svelte";
  import { onMount } from "svelte";
  export let open: boolean = false;
  export let sizeModal: any = "lg";
  export let data: Record<string, string> = {};

  let code = "";
    let typeProfession: any = "";
  let libelle: string = "";
  let montantNouvelleDemande: string = "";
  let codeGeneration: string = "";
  let montantRenouvellement: string = "";
  let typeProfessions: any = [];


  function init(form: HTMLFormElement) {
    code = data.code || "";
    libelle = data.libelle || "";
    codeGeneration = data.codeGeneration || "";
    typeProfession = data.typeProfession.id || "";
    montantRenouvellement = data.montantRenouvellement || "";
    montantNouvelleDemande = data.montantNouvelleDemande || "";
  }

  async function getTypeProfession() {
    try {
      const res = await fetch(BASE_URL_API + "/typeProfession");
      const data = await res.json();
      typeProfessions = data.data;
    } catch (error) {
      console.error("Error fetching villes:", error);
    }
  }

  onMount(async () => {
    await getTypeProfession();
  });
</script>

<Modal
  bind:open
  title={Object.keys(data).length
    ? "Détails  profession"
    : "Détails  profession"}
  size={sizeModal}
  class="m-4 modale_general"
>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
  />
  <div class="space-y-6 p-0">
    <form action="#" use:init>
      <div class="grid grid-cols-1 mb-2">
        <div class="grid grid-cols-1">
          <InputSimple disabled
            fieldName="libelle"
            label="Libelle"
            bind:field={libelle}
            placeholder="entrez le libelle"
            class="w-full"
          ></InputSimple>
        </div>

        <div class="grid grid-cols-6 gap-6 mb-2">
          <InputSelect disabled
            label="Type profession"
            bind:selectedId={typeProfession}
            datas={typeProfessions}
            id="typePersonne"
          />

          <InputSimple disabled
            fieldName="codeGeneration"
            label="Code Generation"
            bind:field={codeGeneration}
            placeholder="entrez le code de generation"
            class="w-full"
          ></InputSimple>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div>
          <InputSimple disabled
            fieldName="montantNouvelleDemande"
            label="Montant nouvelle demande"
            bind:field={montantNouvelleDemande}
            placeholder="entrez le montant"
            class="w-full"
          ></InputSimple>
        </div>
        <div>
          <InputSimple disabled
            fieldName="montantRenouvellement"
            label="Montant renouvellement"
            bind:field={montantRenouvellement}
            placeholder="entrez le montant"
            class="w-full"
          ></InputSimple>
        </div>
      </div>
    </form>
  </div>

  <!-- Modal footer -->
  <div slot="footer" class="w-full">
    <div class="w-full grid grid-cols-3">
      <div class="col-span-2"></div>
      <div class="flex justify-end">
        <Button
          color="alternative"
          style="background-color: gray !important; color: white;"
          on:click={() => (open = false)}
          type="submit">{"Fermer"}</Button
        >
      </div>
    </div>
  </div>
</Modal>
