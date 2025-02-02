<script>
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import { onMount } from "svelte";

  let step = 1;
  let formData = {
    code_verification: "",
    first_name: "",
    last_name: "",
    email_pro: "",
    address: "",
    professionnel: "",
    address_pro: ""
  };

  let errors = {
    first_name: "",
    last_name: "",
    email_pro: "",
    address: "",
    professionnel: "",
    address_pro: ""
  };

  function validateStep() {
    let valid = true;

    if (step === 1) {
      errors.first_name = formData.first_name ? "" : "Le nom est requis";
      errors.last_name = formData.last_name ? "" : "Le prénom est requis";
      errors.email_pro = formData.email_pro ? "" : "L'e-mail est requis";

      valid = !errors.first_name && !errors.last_name && !errors.email_pro;
    }

    if (step === 2) {
      errors.address = formData.address ? "" : "L'adresse est requise";
      errors.professionnel = formData.professionnel ? "" : "Structure requise";
      errors.address_pro = formData.address_pro ? "" : "Lieu d’exercice requis";

      valid = !errors.address && !errors.professionnel && !errors.address_pro;
    }

    return valid;
  }

  function nextStep() {
    if (validateStep()) {
      step++;
    }
  }

  function prevStep() {
    step--;
  }

  function submitForm() {
    if (validateStep()) {
      console.log("Données envoyées :", formData);
      alert("Formulaire soumis !");
    }
  }
</script>

<div
  id="pointer-ring"
  style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(308px, 648px);"
></div>
<div
  id="pointer-dot"
  style="border-color: rgb(113, 88, 190); transform: translate(333px, 673px);"
></div>
<div id="">
  <Header />
  <Slide />
  <main style="padding-top:200px">
    <!--İletişim Form Alanı-->
    <section class="iletisim-form-alani">
      <div class="tablo">
        <div class="" style="visibility: visible;">
          <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
            INSCRIPTION
          </h2>
          <form
            class="form one_customer"
            method="post"
            on:submit|preventDefault={submitForm}
          >
            <!-- Étape 1 -->
            {#if step === 1}
              <h3>Informations personnelles</h3>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  <div class="row">
                    <div class="form__grup">
                      <label class="form_label">Nom *</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.first_name}
                        placeholder="Nom"
                      />
                      {#if errors.first_name}<p class="error">
                          {errors.first_name}
                        </p>{/if}
                    </div>
                    <div class="form__grup">
                      <label class="form_label">Prénom *</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.last_name}
                        placeholder="Prénom"
                      />
                      {#if errors.last_name}<p class="error">
                          {errors.last_name}
                        </p>{/if}
                    </div>
                  </div>

                  <div class="row">
                    <div class="form__grup">
                      <label class="form_label">Prénom *</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.last_name}
                        placeholder="Prénom"
                      />
                      {#if errors.last_name}<p class="error">
                          {errors.last_name}
                        </p>{/if}
                    </div>
                    <div class="form__grup">
                      <label class="form_label">E-mail *</label>
                      <input
                        type="email"
                        class="form__input"
                        bind:value={formData.email_pro}
                        placeholder="E-mail"
                      />
                      {#if errors.email_pro}<p class="error">
                          {errors.email_pro}
                        </p>{/if}
                    </div>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Étape 2 -->
            {#if step === 2}
              <div class="tablo">
                <div class="tablo--1-ve-2">
                  <div class="form__grup">
                    <label class="form_label">Adresse complète *</label>
                    <input
                      type="text"
                      class="form__input"
                      bind:value={formData.address}
                      placeholder="Pôle sanitaire, ville..."
                    />
                    {#if errors.address}<p class="error">
                        {errors.address}
                      </p>{/if}
                  </div>
                  <div class="form__grup">
                    <label class="form_label">Structure d’exercice *</label>
                    <input
                      type="text"
                      class="form__input"
                      bind:value={formData.professionnel}
                      placeholder="Structure"
                    />
                    {#if errors.professionnel}<p class="error">
                        {errors.professionnel}
                      </p>{/if}
                  </div>
                  <div class="form__grup">
                    <label class="form_label">Lieu d’exercice *</label>
                    <input
                      type="text"
                      class="form__input"
                      bind:value={formData.address_pro}
                      placeholder="Lieu"
                    />
                    {#if errors.address_pro}<p class="error">
                        {errors.address_pro}
                      </p>{/if}
                  </div>
                </div>
              </div>
            {/if}

            <!-- Boutons de navigation -->
            <div class="form__grup">
              {#if step > 1}
                <button
                  type="button"
                  class="buton buton--kirmizi"
                  on:click={prevStep}>← RETOUR</button
                >
              {/if}

              {#if step < 2}
                <button
                  type="button"
                  class="buton buton--kirmizi"
                  on:click={nextStep}>SUIVANT →</button
                >
              {:else}
                <button type="submit" class="buton buton--kirmizi"
                  >VALIDER</button
                >
              {/if}
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>

  <style>
    .footerss p {
      display: flex;
      flex-wrap: wrap;
      justify-content: start !important;
      align-items: start !important;
    }
    h2.h2-baslik-footer.h-yazi-margin-kucuk,
    .footer__list,
    .footer__sosyal {
      display: flex;
      flex-wrap: wrap;
      justify-content: start !important;
      align-items: start !important;
    }
    .form {
    max-width: 100%;
    margin: auto;
  }
  .tablo {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    gap: 1px; /* Espacement entre les champs */
    flex-wrap: wrap;
  }

  .form__grup {
    flex: 1; /* Permet aux champs de prendre la même largeur */
    min-width: 250px; /* Empêche les champs d'être trop petits */
  }
  h3 {
    font-size: 1.5em;
    margin-bottom: 15px;
    color: #333;
  }
 
  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  </style>
  <Footer />
</div>

