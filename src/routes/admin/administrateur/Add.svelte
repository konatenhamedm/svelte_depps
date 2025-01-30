<script lang="ts">
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { BASE_URL_API } from "$lib/api";
  import { Button, Input, Label, Modal, Textarea } from "flowbite-svelte";
  import Notification from "$components/_includes/Notification.svelte";
  import InputTextArea from "$components/inputs/InputTextArea.svelte";
  import InputSimplePassword from "$components/inputs/InputSimplePassword.svelte";

  let showNotification = false;
  let notificationMessage = "";
  let notificationType = "info";

  export let userUpdateId: any;
  export let open: boolean = false;
  let isLoad = false;

  let admin: any = {
    username: "",
    prenoms: "",
    nom: "",
    phone: "",
    confirmPassword: "",
    password: "",
    email: "",
    userUpdate: "",
  };
  export let sizeModal: any = "lg";

  export let data: Record<string, string> = {};

  function init(form: HTMLFormElement) {}

  async function SaveFunction() {
    isLoad = true;
    try {
      const res = await fetch(BASE_URL_API + "/user/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username : admin.username, password : admin.password, nom : admin.nom, prenoms : admin.prenoms, phone : admin.phone, confirmPassword : admin.confirmPassword, email : admin.email, userUpdate : userUpdateId }),
      });

      if (res.ok) {
        isLoad = false;
        open = false;
        notificationMessage = "icone créé avec succès!";
        notificationType = "success";
        showNotification = true;
      }
    } catch (error) {
      notificationMessage = "Une erreur crée lors de l enregistrement";
      notificationType = "error";
      showNotification = true;
      console.error("Error saving:", error);
    }
  }

  function handleModalClose(event: Event) {
    if (isLoad) {
      event.preventDefault(); // Prevent modal from closing if loading
    }
  }

  let password = "";
  let showPassword = false; // To toggle password visibility
  let passwordConfirme = "";
  let showPasswordConfirme = false; // To toggle password visibility
</script>

<Modal
  bind:open
  title={Object.keys(data).length ? "Ajouter une icone " : "Ajouter une icone"}
  size={sizeModal}
  class="m-4 modale_general"
  on:close={handleModalClose}
>
  <!-- Modal body -->
  <div class="space-y-6 p-0">
    <form action="#" use:init>
        <div class="grid grid-cols-6 gap-6">
            <InputSimple
              fieldName="username"
              label="Username"
              bind:field={admin.username}
              placeholder="entrez le pseudo"
              class="w-full"
            ></InputSimple>
    
            <InputSimple
              fieldName="email"
              label="Email"
              bind:field={admin.email}
              placeholder="entrez email"
              class="w-full"
            ></InputSimple>
          </div>

      <div class="grid grid-cols-6 gap-6">
        <InputSimple
          fieldName="nom"
          label="Nom"
          bind:field={admin.nom}
          placeholder="entrez le nom"
          class="w-full"
        ></InputSimple>

        <InputSimple
          fieldName="prenoms"
          label="Prénoms"
          bind:field={admin.prenoms}
          placeholder="entrez le(s) prénoms"
          class="w-full"
        ></InputSimple>
      </div>
      <div class="grid grid-cols-1 mb-5">
          <InputSimple
          fieldName="phone"
          label="Telephone"
          bind:field={admin.phone}
          placeholder="entrez le number de telephone"
          class="w-full"
          ></InputSimple>
          
        </div>
        
              <div class="grid grid-cols-6 gap-6">
                <InputSimplePassword
          fieldName="password"
          label="Mot de passe"
          bind:field={admin.password}
          placeholder="entrez le mot de passe"
          class="w-full"
          />
                <InputSimplePassword
          fieldName="confirmPassword"
          label="Confirmez le mot de passe"
          bind:field={admin.confirmPassword}
          placeholder="entrez le mot de passe confirme"
          class="w-full"
          />

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
          style="background-color: blue;"
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

{#if showNotification}
  <Notification
    message={notificationMessage}
    type={notificationType}
    duration={5000}
  />
{/if}
