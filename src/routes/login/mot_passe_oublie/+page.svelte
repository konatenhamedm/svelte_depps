<script lang="ts">
    import Notification from "$components/_includes/Notification.svelte";
    import Spinner from "$components/_skeletons/Spinner.svelte";
  import { apiFetch } from "$lib/api";
    import { login } from "$lib/auth";
  
    let showNotification = false;
    let notificationMessage = "";
    let notificationType = "info";
  
    let email = "";
    $: authenticating = false;
    let showPassword = false; // To toggle password visibility
    $: message = "";
    let error = "";
  
    let passwordWarning = "";
    let isPasswordValid = false;
  
  
  
    async function handleSubmit(event: any) {

        authenticating = true;
      event.preventDefault();
      try {
        await apiFetch(true, "/resetpassword/reset/email/admin", "POST", {email: email}).then((res) => {
        if (res) {
            authenticating = false;
            if (res.code == 200) {
              notificationMessage = "Un email a été envoyé à votre adresse";
              notificationType = "success";
              showNotification = true;
                setTimeout(() => {
                    window.location.href = "/login";
                }, 3000);
             
            } else {
              message = res.message;
              notificationMessage = res.message;
              notificationType = "error";
              showNotification = true;
            }
        }
      });
      
        authenticating = false;
      } catch (error) {
        authenticating = false;
        message = "Une erreur est survenue";
      }


     
    }
  </script>
  
  <div class="px-4 md:px-0">
    <div class="grid grid-cols-1 m-0">
      <div class="col-12 p-0">
        <div class="login-card login-dark">
          <div>
            <div class="login-main">
              <form class="theme-formo" on:submit|preventDefault={handleSubmit}>
                <h3 class="font-semibold text-2xl">Bienvenue</h3>
                <p>Reinitialisation de mot de passe.</p>
                <div class="relative w-full mt-4">
                  <label
                    for="input-label"
                    class="block text-sm font-medium mb-2 dark:text-white"
                    >Email</label
                  >
                  <input
                    type="text"
                    id="input-label"
                    bind:value={email}
                    class="border-1 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Entrez votre pseudo"
                  />
                </div>
               
                <div class="relative w-full">
                  <!-- 	<div class="absolute inset-y-0 right-0 flex items-center px-2">
                                      <input class="hidden js-password-toggle" id="toggle" type="checkbox" />
                                      <div class="show-hide bg-slate-200 hover:bg-slate-50 rounded px-2 py-1 mb-0 !text-xs text-blue-600 font-mono cursor-pointer js-password-label" for="toggle"><span class="show"></span></div>
                                  </div> -->
                  
                  <div class="form-group mt-7">
                    <div class="text-end mt-6">
                      <button
                        class="btn btn-primary btn-block rounded-md text-white w-full"
                        type="submit"
                      >
                        {#if authenticating}
                          <div class="w-full grid grid-cols-3">
                            <div>
                              <Spinner />
                            </div>
                            <div
                              class="flex flex-col col-span-1 justify-items-start"
                            >
                              Soumettre
                            </div>
                          </div>
                        {:else}
                        Soumettre
                        {/if}
                      </button>
                    </div>
  
                
                  </div>
                  {#if !authenticating && message !== ""}
                  <div
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong class="font-bold">Oups erreur!</strong>
                    <span class="block sm:inline">{message}</span>
                  </div>
                {/if}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <style>
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    </style>
    
    {#if showNotification}
      <Notification message={notificationMessage} type={notificationType} duration={5000} />
    {/if}
    