<script lang="ts">
  export let label: string;
  export let type: "text" | "date" | "email" | "tel" = "text";
  export let value: string = "";
  export let placeholder: string = "";
  export let error: string | null = null;
  export let onInput: (event: Event) => void = () => {};

  let emailError: string | null = null;
  let phoneError: string | null = null;
  let ageError: string | null = null;
  let formData: Record<string, string> = {};
  export let step: any; // Remplace cela par ta gestion actuelle des étapes

  function validateInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    onInput(event);

    // Mise à jour de l'état local du formulaire
    formData[label] = value;
    saveFormState();

    if (type === "email") {
      emailError = validateEmail(value) ? null : "Veuillez entrer un email valide";
    }

    if (type === "tel") {
      phoneError = validatePhone(value) ? null : "Numéro invalide. Il doit commencer par 07, 01 ou 05 et contenir 10 chiffres.";
    }

    if (type === "date") {
      ageError = validateAge(value);
    }
  }

  function saveFormState() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("step", step.toString());
    }
  }

  function validateEmail(email: string): boolean {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  function validatePhone(phone: string): boolean {
    const regex = /^(07|01|05)\d{8}$/;
    return regex.test(phone);
  }

  function validateAge(dateString: string): string | null {
    const birthDate = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (age < 19 || (age === 19 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      return "Vous devez avoir au moins 19 ans.";
    }
    return null;
  }
</script>

<div class="form__group">
  <label class="block text-2xl font-medium mb-1">{label} *</label>
  <input
    type={type}
    bind:value
    class="w-full form__input"
    placeholder={placeholder}
    on:input={validateInput}
  />
  
  {#if error}
    <p class="text-red-500 text-sm">{error}</p>
  {/if}

  {#if type === "email" && emailError}
    <p class="text-red-500 text-sm">{emailError}</p>
  {/if}

  {#if type === "tel" && phoneError}
    <p class="text-red-500 text-sm">{phoneError}</p>
  {/if}

<!--   {#if type === "date" && ageError}
    <p class="text-red-500 text-sm">{ageError}</p>
  {/if} -->
</div>
