<script lang="ts">
  import Notification from "$components/_includes/Notification.svelte";
  import Spinner from "$components/_skeletons/Spinner.svelte";
  import { login } from "$lib/auth";

  let showNotification = false;
  let notificationMessage = "";
  let notificationType = "info";

  let username = "";
  let password = "";
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
      const success = await login(username, password);
	
      if (success.token != null) {
        window.location.href = "/admin";
      } else {
        message = "Veuillez vérifier vos identifiants";
        authenticating = false;
        setTimeout(() => {
          message = ""; // Efface le message après 3 secondes
        }, 3000);
      }
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
              <p>Veuillez vous connecter.</p>
              <div class="relative w-full mt-4">
                <label
                  for="input-label"
                  class="block text-sm font-medium mb-2 dark:text-white"
                  >Pseudo</label
                >
                <input
                  type="text"
                  id="input-label"
                  bind:value={username}
                  class="border-1 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Entrez votre pseudo"
                />
              </div>
              <label
                class="font-medium block mb-1 mt-4 text-gray-700"
                for="password"
              >
                Mot de passe
              </label>
              <div class="relative w-full">
                <!-- 	<div class="absolute inset-y-0 right-0 flex items-center px-2">
									<input class="hidden js-password-toggle" id="toggle" type="checkbox" />
									<div class="show-hide bg-slate-200 hover:bg-slate-50 rounded px-2 py-1 mb-0 !text-xs text-blue-600 font-mono cursor-pointer js-password-label" for="toggle"><span class="show"></span></div>
								</div> -->
                <div class="relative">
                  {#if showPassword}
                    <input
                      id="Password"
                      bind:value={password}
                      class="border-1 rounded w-full py-3 px-3 leading-tight border-gray-300  focus:outline-none focus:border-indigo-700 focus:bg-white text-black pr-16 font-mono js-password"
                      type="text"
                      placeholder="Entrez votre mot de passe"
                    />
                  {:else}
                    <input
                      id="Password"
                      bind:value={password}
                      class="border-1 rounded w-full py-3 px-3 leading-tight border-gray-300 focus:outline-none focus:border-indigo-700 focus:bg-white text-black pr-16 font-mono js-password"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                    />
                  {/if}
                  <button
                    type="button"
                    class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                    on:click={() => (showPassword = !showPassword)}
                  >
                    {#if showPassword}
                      👁️‍🗨️
                    {:else}
                      👁️
                    {/if}
                  </button>
                  <!-- <input class=" border-1 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" id="password" type="password" name="login[password]" autocomplete="off" placeholder="*********" value="1234@abc" required="" /> -->
                </div>
                <div class="form-group mt-7">
                  <!-- <div class="checkbox p-0">
									<input id="checkbox1" type="checkbox">
									<label class="text-muted" for="checkbox1">Remember password</label>
								</div> -->
                  <!-- 				<div class="checkbox p-0">

								<a class="link text-blue-500" href="forget-password.html">Forgot password?</a>
							</div> -->
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
                            Se connecter
                          </div>
                        </div>
                      {:else}
                        Se connecter
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
  