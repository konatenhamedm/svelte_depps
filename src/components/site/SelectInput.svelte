<script lang="ts">
  export let label: string;
  export let value: string = ""; // Assurez-vous que la valeur par défaut est une chaîne vide.
  export let options: { id: string; libelle: string }[] = [];
  export let placeholder: string = "Veuillez sélectionner une option";
  export let error: string | null = null;
  export let onInput: (event: Event) => void = () => {};
  export let step: any; // Remplace cela par ta gestion actuelle des étapes

  let formData: Record<string, string> = {};

  function handleInput(event: Event) {
    const target = event.target as HTMLSelectElement;
    value = target.value;
    onInput(event);
  }

  function saveFormState() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("step", step.toString());
    }
  }
</script>

<div class="form__group">
  <label class="block text-2xl font-medium mb-1">{label} *</label>
  <select
    bind:value
    class="w-full form__input"
    on:change={handleInput}
    on:change={saveFormState}
  >
    <!-- Option vide par défaut -->
    <option value="" disabled selected={value === ""}>{placeholder}</option>
    {#each options as option}
      <option value={option.id}   selected={value === option.id}>{option.libelle}</option>
    {/each}
  </select>
  {#if error}
    <p class="text-red-500 text-sm">{error}</p>
  {/if}
</div>
