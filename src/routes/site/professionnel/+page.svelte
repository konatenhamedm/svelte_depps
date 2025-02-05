<script>
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import { onMount } from "svelte";

  import {getCategories} from "$lib/constants";
  const categories = getCategories()

  let step = 1;
  let formData = {
    // Login informations
    email: "",
    password: "",
    confirmPassword: "",

    // Personal Informations
    category: "",
    civilite: "M",
    // email: "",
    dateDiplome: "",
    dateNaissance: "",
    contact: "",
    lieuDiplome: "",
    nationalite: "Côte d'Ivoire",
    situationMatrimoniale: "",
    datePremierEmploi: "",
    poleSanitaire: "",
    diplome: "",
    situationProfessionnelle: "",

    code_verification: "",
    first_name: "",
    last_name: "",
    email_pro: "",
    address: "",
    professionnel: "",
    address_pro: ""
  };

  let errors = {
    // Login Errors
    email: "",
    password: "",
    confirmPassword: "",

    // Personal Informations
    category: "",
    civilite: "M",
    // email: "",
    dateDiplome: "",
    dateNaissance: "",
    contact: "",
    lieuDiplome: "",
    nationalite: "Côte d'Ivoire",
    situationMatrimoniale: "Célibataire",
    datePremierEmploi: "",
    poleSanitaire: "",
    diplome: "",
    situationProfessionnelle: "",

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
      errors.email = formData.email ? "" : "L'e-mail est requis";
      errors.password = formData.password ? "" : "Le mot de passe est requis";
      errors.confirmPassword =
      formData.confirmPassword === formData.password
      ? ""
      : "Les mots de passe ne correspondent pas";
      
      valid = !errors.password && !errors.confirmPassword && !errors.email;
    }
    
    if (step === 2) {
      errors.category = formData.category ? "" : "Veuillez choisir une categorie";
      errors.civilite = formData.civilite ? "" : "Veuillez choisir une civilité";
      errors.dateDiplome = formData.dateDiplome ? "" : "Veuillez choisir une date de diplome";
      errors.dateNaissance = formData.dateNaissance ? "" : "Veuillez choisir une date de naissance";
      errors.contact = formData.contact ? "" : "Le contact est requis";
      errors.lieuDiplome = formData.lieuDiplome ? "" : "Le lieu du diplôme est requis";
      errors.datePremierEmploi = formData.datePremierEmploi ? "" : "Veuillez choisir une date de premier emploi";
      errors.poleSanitaire = formData.poleSanitaire ? "" : "Le pole sanitaire est requis";
      errors.diplome = formData.diplome ? "" : "Le diplôme est requis";
      errors.situationProfessionnelle = formData.situationProfessionnelle ? "" : "La situation professionnelle est requise";

      valid = !errors.category && !errors.civilite && !errors.dateDiplome && !errors.dateNaissance && !errors.contact && !errors.lieuDiplome && !errors.datePremierEmploi && !errors.poleSanitaire && !errors.diplome && !errors.situationProfessionnelle
    }

    if (step === 3) {
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
    console.log(formData);
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
  <section class="text-center pb-20" style="padding-top:150px">
    <h2 class="h2-baslik-anasayfa-ozel pb-10 text-uppercase">Inscription en tant que professionnel de santé</h2>
    <p class="text-center paragraf">
      Veuillez renseigner vos informations afin de procéder à l'inscription
    </p>
  </section>

  <main style="padding-top:200px">
    <!--İletişim Form Alanı-->
    <section class="iletisim-form-alani pt-20">
      <div class="tablo">
        <div class="" style="visibility: visible;">
          <form
            class="form one_customer"
            method="post"
            on:submit|preventDefault={submitForm}
          >
            <!-- Étape 1 -->
            {#if step === 1}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Informations de connexion (étape 1/3)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  <div class="grid grid-cols-3">
                    
                    <div class="form__grup">
                      <label class="form_label">E-mail *</label>
                      <input
                        type="email"
                        class="form__input"
                        bind:value={formData.email}
                        placeholder="E-mail"
                      />
                      {#if errors.email}<p class="error">
                          {errors.email}
                        </p>{/if}
                    </div>
                  
                    <div class="form__grup">
                      <label class="form_label">Mot de passe *</label>
                      <input
                        type="password"
                        class="form__input"
                        bind:value={formData.password}
                        placeholder="Mot de passe"
                      />
                      {#if errors.password}<p class="error">
                          {errors.password}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Confirmer le mot de passe *</label>
                      <input
                        type="password"
                        class="form__input"
                        bind:value={formData.confirmPassword}
                        placeholder="Confirmer le mot de passe"
                      />
                      {#if errors.confirmPassword}<p class="error">
                          {errors.confirmPassword}
                        </p>{/if}
                    </div>
                    
                  </div>
                </div>
              </div>
            {/if}

            <!-- Étape 2 -->
            {#if step === 2}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Informations personnelles (étape 2/3)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  {#if errors.category}<p class="error">
                    {errors.category}
                  </p>{/if}
                  <div class="grid grid-cols-3">
                    {#each categories as categoryGP}
                      <div class="form__grup mb-10">
                        <label class="form_label font-bold"><big>{categoryGP.title}</big></label>

                        {#each categoryGP.categories as category}
                          <div class="">
                            <input
                              type="radio"
                              class="me-2"
                              id={category.id}
                              name="rd_category"
                              style="cursor: pointer;"
                              checked={category.title == formData.category}
                              on:change={() => formData.category = category.title}
                            />
                            <label for={category.id} style="cursor: pointer;">{category.title}</label>
                          </div>

                        {/each}
                      </div>
                    {/each}
                  </div>
  
                  <div class="grid grid-cols-3">
                    <div class="form__grup">
                      <label class="form_label">Civilité</label>
                      <select class="form__input" name="" id="" bind:value={formData.civilite}>
                        <option value="M" selected={formData.civilite === "M"}>M.</option>
                        <option value="Mme" selected={formData.civilite === "Mme"}>Mme.</option>
                        <option value="Mlle" selected={formData.civilite === "Mlle"}>Mlle.</option>
                      </select>
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Adresse Email</label>
                      <input
                        type="text"
                        class="form__input"
                        value={formData.email}
                        readonly
                      />
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Date d'obtention du diplôme</label>
                      <input
                        type="date"
                        class="form__input"
                        bind:value={formData.dateDiplome}
                        placeholder="Date d'obtention du diplôme"
                      />
                      {#if errors.dateDiplome}<p class="error">
                          {errors.dateDiplome}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Date de naissance</label>
                      <input
                        type="date"
                        class="form__input"
                        bind:value={formData.dateNaissance}
                        placeholder="Date de naissance"
                      />
                      {#if errors.dateNaissance}<p class="error">
                          {errors.dateNaissance}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Contact</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.contact}
                        placeholder="Contact"
                      />
                      {#if errors.contact}<p class="error">
                          {errors.contact}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Lieu d'obtention du diplôme</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.lieuDiplome}
                        placeholder="Lieu d'obtention du diplôme"
                      />
                      {#if errors.lieuDiplome}<p class="error">
                          {errors.lieuDiplome}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Nationalité</label>
                      <select class="form__input" name="" id="" bind:value={formData.nationalite}>
                        <option value="Côte d'Ivoire" selected={formData.nationalite === "Côte d'Ivoire"}>Côte d'Ivoire</option>
                        <!-- <option value="Mme" selected={formData.nationalite === "Mme"}>Mme.</option>
                        <option value="Mlle" selected={formData.nationalite === "Mlle"}>Mlle.</option> -->
                      </select>
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Situation matrimoniale</label>
                      <select class="form__input" name="" id="" bind:value={formData.situationMatrimoniale}>
                        <option value="Célibataire" selected={formData.situationMatrimoniale === "Célibataire"}>Célibataire</option>
                        <option value="Marié(e)" selected={formData.situationMatrimoniale === "Marié(e)"}>Marié(e)</option>
                        <option value="Divorcé(e)" selected={formData.situationMatrimoniale === "Divorcé(e)"}>Divorcé(e)</option>
                        <option value="Veuf (Veuve)" selected={formData.situationMatrimoniale === "Veuf (Veuve)"}>Veuf (Veuve)</option>
                      </select>
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Date d'obtention de premier emploi</label>
                      <input
                        type="date"
                        class="form__input"
                        bind:value={formData.datePremierEmploi}
                        placeholder="Date d'obtention de premier emploi"
                      />
                      {#if errors.datePremierEmploi}<p class="error">
                          {errors.datePremierEmploi}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Pôle sanitaire, District, Ville, Commune, Quartier, Lot, Ilot</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.poleSanitaire}
                        placeholder="Pôle sanitaire, District, Ville, Commune, Quartier, Lot, Ilot"
                      />
                      {#if errors.poleSanitaire}<p class="error">
                          {errors.poleSanitaire}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Dénomination du diplôme</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.diplome}
                        placeholder="Dénomination du diplôme"
                      />
                      {#if errors.diplome}<p class="error">
                          {errors.diplome}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Situation professionnelle</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.situationProfessionnelle}
                        placeholder="Situation professionnelle"
                      />
                      {#if errors.situationProfessionnelle}<p class="error">
                          {errors.situationProfessionnelle}
                        </p>{/if}
                    </div>

                  </div>

                </div>
              </div>
            {/if}

            <!-- Étape 3 -->
            {#if step === 3}
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

              {#if step < 3}
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

