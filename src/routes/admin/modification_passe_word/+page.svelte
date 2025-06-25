<script lang="ts">
  import InputSimple from '$components/inputs/InputSimple.svelte';
  import {BASE_URL_API} from '$lib/api';
  import {Button, Input, Label, Modal, Textarea} from 'flowbite-svelte';
  import Notification from '$components/_includes/Notification.svelte';
  import InputTextArea from '$components/inputs/InputTextArea.svelte';
  import Entete from '$components/_includes/Entete.svelte';
  import InputSimplePassword from '$components/inputs/InputSimplePassword.svelte';
  import InputSimplePass from '$components/inputs/InputSimplePass.svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let showNotification = false;
  let message = '';
  let notificationType = 'info';
  export let data; // Les données retournées par `load()`
  let user = data.user;

  export let open: boolean = false;
  let isLoad = false;

  let ancien_mot_de_passe: any ;
  let nouveau_mot_de_passe: any ;
  let confirmer_mot_de_passe: any ;
  export let sizeModal: any = 'lg';
  export let userUpdateId: any;


  async function logout() {
    await fetch('/auth/logout', { method: 'POST' });
    goto('/login'); // Redirection après déconnexion
}

  async function SaveFunction() {
    isLoad = true;

    try {
      fetch(BASE_URL_API + "/user/modifier/passeword" , {
        method: "POST",
        body: JSON.stringify({
          ancien_mot_de_passe: ancien_mot_de_passe,
          nouveau_mot_de_passe: nouveau_mot_de_passe,
          confirmer_mot_de_passe: confirmer_mot_de_passe,
          username: user.username,
        })
      })
        .then((response) => response.json())
        .then(async (result) => {
          isLoad = false;

          console.log('result', result);
          if (result.errors && Object.keys(result.errors).length > 0) {
           
            message = result.errors;

            //cpte = cpte + 1;
          } else {
            message = "";
             await logout();
          }
        })
        .catch((error) => {
          message = "Erreur : Échec de la modification.";
          isLoad = false;
        });

    } catch (error) {
      message = 'Une erreur crée lors de l enregistrement';
      notificationType = 'error';
      showNotification = true;
      isLoad = false;
      console.error('Error saving:', error);
    }
  }

  function handleModalClose(event: Event) {
    if (isLoad) {
      event.preventDefault(); // Prevent modal from closing if loading
    }
  }


</script>

<Entete
  libelle="Mot de passe "
  parent="Configuration"
  descr="Modifier le mot de passe"
/>
<section class="content">
  <div class="row">
    <div class="col-12">
      <div class="box">
        <div class="box-header with-border flex justify-between items-center">
          <h4 class="box-title text-xl font-medium">
            Veillez modifier votre mot de passe ici
          </h4>

          <div>
            <!--   <a
              class="py-[5px] px-3 waves-effect waves-light btn btn-info mb-5"
              on:click={() => ((current_data = {}), (openAdd = true))}
            >
              + Nouvelle icône
            </a> -->
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="table-responsive">
            <div class="w-full grid grid-cols-5">
              <div class="col-span-1 p-2"></div>
              <div class="col-span-3 p-2">
                {#if message !== ""}
                <div
                  class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong class="font-bold">Oups erreur!</strong>
                  <span class="block sm:inline">{message}</span>
                </div>
                {/if}
                <form action="#" use:init>
                  <InputSimplePass
                    fieldName="ancien_mot_de_passe"
                    label="Ancien mot de passe"
                    bind:field={ancien_mot_de_passe}
                    type="password"
                    placeholder="Entrez votre ancien mot de passe"
                    classe="w-full"
                  />

                  <InputSimplePass
                    fieldName="nouveau_mot_de_passe"
                    label="Nouveau mot de passe"
                    bind:field={nouveau_mot_de_passe}
                    type="password"
                    placeholder="Entrez votre nouveau mot de passe"
                    classe="w-full mt-4"
                  />

                  <InputSimplePass
                    fieldName="confirmer_mot_de_passe"
                    label="Confirmer le mot de passe"
                    bind:field={confirmer_mot_de_passe}
                    type="password"
                    placeholder="Confirmez votre nouveau mot de passe"
                    classe="w-full mt-4"
                  />
                </form>
              </div>
              <div class="col-span-1 p-2"></div>
            </div>
            <div class="w-full grid grid-cols-5">
              <div class="col-span-1 p-2"></div>
              <div class="col-span-3 p-2">
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
                    Modifier mot de passe
                  </button>
                {/if}
              </div>
              <div class="col-span-1 p-2"></div>
            </div>
          </div>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
  </div>
</section>

<!-- Modales -->
