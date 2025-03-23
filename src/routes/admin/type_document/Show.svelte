<script lang="ts">
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { Button, Input, Label, Modal, Textarea } from "flowbite-svelte";
  export let open: boolean = false;
  export let sizeModal: any = "lg";
  export let data: Record<string, string> = {};
  let nombre = "";
  let libelle = "";
  let typePersonne = "";

  function init(form: HTMLFormElement) {
    nombre = data.nombre || "";
    libelle = data.libelle || "";
    typePersonne = data.typePersonne.libelle || "";
  }
</script>

<Modal
  bind:open
  title={Object.keys(data).length
    ? "Détails type document"
    : "Détails type document"}
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
      <div class="grid grid-cols-1 gap-6">
        <InputSimple
          fieldName="libelle"
          label="Libelle"
          field={libelle}
          placeholder="entrez le libelle"
          disabled={true}
        />

        <InputSimple
          fieldName="nombre"
          label="nombre"
          field={nombre}
          placeholder="entrez le nombre"
          disabled={true}
        />
        <InputSimple
          fieldName="typePersonne"
          label="Type personne"
          field={typePersonne}
          placeholder=""
          disabled={true}
        />
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
