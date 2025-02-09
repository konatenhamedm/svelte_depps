<script lang="ts">
  import Spinner from "$components/_skeletons/Spinner.svelte";
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { BASE_URL_API, BASE_URL_API_V2 } from "$lib/api";
  import {
    Avatar,
    Button,
    Input,
    Label,
    Modal,
    Textarea,
  } from "flowbite-svelte";
  import InputTextArea from "$components/inputs/InputTextArea.svelte";
  import InputSimplePassword from "$components/inputs/InputSimplePassword.svelte";

  export let open: boolean = false; // modal control
  let isLoad = false;

  let username: string = "";
  let prenoms: string = "";
  let nom: string = "";
  let phone: string = "";
  let password: string = "";
  let email: string = "";
  let userUpdate: string = "";

  export let sizeModal: any = "lg";

  export let userUpdateId: any;
  export let data: Record<string, string> = {};

  // Initialize form data with the provided record
  function init(form: HTMLFormElement) {
   
    username = data?.username;

    email = data?.email;
    userUpdate = data?.userUpdate;
    password = "";
  }

  async function SaveFunction() {
    isLoad = true;

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      formData.append("email", email);
      formData.append("userUpdate", userUpdateId);
      formData.append("Avatar", "null"); // Si Avatar est un fichier, il faut fournir un `File` ou `Blob`

      const res = await fetch(
        BASE_URL_API_V2 + "/user/admin/update/" + data?.id,
        {
          method: "POST",
          body: formData,
        }
      );
      if (res.ok) {
        isLoad = false;
        open = false; // Close the modal
      }
    } catch (error) {
      console.error("Error saving:", error);
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
    ? "Modification de administrateur"
    : "Modification de administrateur"}
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
          bind:field={username}
          placeholder="entrez le pseudo"
          class="w-full"
        ></InputSimple>

        <InputSimple
          fieldName="email"
          label="Email"
          bind:field={email}
          placeholder="entrez email"
          class="w-full"
        ></InputSimple>
      </div>

     
      <div class="grid grid-cols-1 gap-6">
      
        <InputSimplePassword
          fieldName="password"
          label="Mot de passe"
          bind:field={password}
          placeholder="entrez le mot de passe"
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
