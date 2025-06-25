<script lang="ts">
    export let fieldName = "";
    export let label = "";
    export let field:any;
    export let type = "text";
    export let placeholder = "";
    export let classe: string = "";
  
    let showPassword = false;
  
    $: inputType = type === "password" && !showPassword ? "password" : "text";
  </script>
  
  <div class={`relative ${classe}`}>
    <label for={fieldName} class="block text-sm font-medium text-gray- mb-1">
      {label}
    </label>
  
    <input
      id={fieldName}
      type={inputType}
      bind:value={field}
      placeholder={placeholder}
      class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  
    {#if type === "password"}
      <button
        type="button"
        class="absolute top-9 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        on:click={() => (showPassword = !showPassword)}
        aria-label="Afficher le mot de passe"
      >
        {#if showPassword}
          👁️
        {:else}
          👁️‍🗨️
        {/if}
      </button>
    {/if}
  </div>
  