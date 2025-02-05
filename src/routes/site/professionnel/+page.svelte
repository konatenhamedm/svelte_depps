<script>

  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";

  import { onMount } from "svelte";

  import { onDestroy } from 'svelte';


  let step = 1;
  let formData = {
    code_verification: "",
 
  
    address: "",
    professionnel: "",
    addressPro: "",
   nom: "",
    prenoms: "",
  viile : "",
      dateNaissance: "",

      
  specialite: "",


  genre: "",
  diplome: "",
  organisationAnnee: "",
  civilite: "",
 
  nationate: "",
  user: "",
   organisationNumero: "",

  dateDiplome: "",


  numero: "",
  profession: "",
  dateEmploi: "",
   emailPro: "",
  contactPro: "",
  appartenirOrganisation: false,
  situationPro: "",
  organisationNom: "",
// file 

 cv: null,
    photo: null,
    casier: null,
    cni: null,
    certificat: null,
    diplomeFile: null,


  confirmPassword : "",
  password : "",
  email : "",



  };

  let errors = {

    //personnel
    nom: "",
    prenoms: "",
    address: "",
    nationate: "",
    numero: "",  
    dateNaissance: "",
 viile:"",

//professionnel
    addressPro: "",
    specialite: "",
    emailPro: "",

  casier: "",
  diplomeFile: "",
  genre: "",
  diplome: "",
  organisationAnnee: "",
  civilite: "",

    professionnel: "",
  user: "",

  dateEmploi: "",
  contactPro: "",
  certificat: "",
  appartenirOrganisation: "",
  situationPro: "",

  photo: "",
  organisationNom: "",
  cv: "",

  organisationNumero: "",

  dateDiplome: "",

  profession: "",
  cni: "",


 
  confirmPassword : "",
  password : "",
  email : "",

  passwordDif  : "",
   
  };

  function validateStep() {
    let valid = true;

     if (step === 1) {
      errors.confirmPassword = formData.confirmPassword ? "" : "confirm Password est requis";
     errors.password = formData.password ? "" : "password est requis";
      errors.email = formData.email ? "" : "email est requise";
      // @ts-ignore
      errors.passwordDif = formData.confirmPassword  ? formData.confirmPassword !== formData.password : "password different du confirm Password";
      
      valid = !errors.email && !errors.confirmPassword  && !errors.password && !errors.passwordDif;
    }

    if (step === 2) {

      errors.address = formData.address ? "" : "L'adresse est requise";
    errors.numero = formData.numero ? "" : "Le numéro est requis";
       errors.civilite = formData.civilite ? "" : "La civilité est requise";
      errors.nationate = formData.nationate ? "" : "La nationalité est requise";

      errors.nom = formData.nom ? "" : "Le nom est requis";
      errors.prenoms = formData.prenoms ? "" : "Le prénom est requis";
       errors.viile =  formData.viile ? "" : "La viile est requis";
      errors.dateNaissance = formData.dateNaissance ? "" : "La date de naissance est requise";
      valid = !errors.nom && !errors.prenoms  && !errors.dateNaissance &&!errors.address && !errors.civilite && !errors.nationate && !errors.numero;
    }

    if (step === 3) {

        errors.dateEmploi = formData.dateEmploi ? "" : "La date d'emploi est requise";
      errors.emailPro  = formData.emailPro ? "" : "L'adresse email est requise";
      errors.contactPro = formData.contactPro ? "" : "Le contact professionnel est requis";
     
    errors.profession = formData.profession ? "" : "La profession est requise";
    
      errors.genre = formData.genre ? "" : "Le genre est requis";
      errors.diplome = formData.diplome ? "" : "Le diplôme est requis";
      errors.situationPro = formData.situationPro ? "" : "La situation professionnelle est requise";
      errors.addressPro = formData.addressPro ? "" : "Lieu d’exercice requis";
      errors.specialite = formData.specialite ? "" : "La spécialité est requise";
      errors.dateDiplome = formData.dateDiplome ? "" : "La date du diplôme est requise";
      valid =  !errors.genre && !errors.diplome  && !errors.civilite && !errors.nationate &&
              !errors.specialite && !errors.dateDiplome 
            && !errors.professionnel
               && 
              !errors.situationPro && !errors.profession && !errors.dateEmploi && !errors.emailPro && !errors.contactPro;
  
    }

   
   if (step === 4) {
      errors.photo = formData.photo ? "" : "La photo est requise";
      errors.cv = formData.cv ? "" : "Le CV est requis";
     errors.casier = formData.casier ? "" : "Le casier judiciaire est requis";
      errors.cni = formData.cni ? "" : "La CNI est requise";
       errors.certificat = formData.certificat ? "" : "Le certificat est requis";
      errors.diplomeFile = formData.diplomeFile ? "" : "Le fichier de diplôme est requis";
      valid = !errors.photo && !errors.cv && !errors.casier && !errors.cni && !errors.diplomeFile && !errors.certificat;
    }

    // Étape 6
    if (step === 5) {
      if (formData.appartenirOrganisation){
      
      errors.organisationAnnee = formData.organisationAnnee ? "" : "L'année d'organisation est requise";
      errors.organisationNom = formData.organisationNom ? "" : "Le nom de l'organisation est requis";
      errors.organisationNumero = formData.organisationNumero ? "": "entre le numero de organisation";
      valid =  !errors.organisationAnnee && !errors.organisationNom && !errors.organisationNumero;
      }
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

  let civiliteOption = [ "M","MME","MLE"];

  let professions = [
    {
      category: "Médecins",
      options: [
        "Médecins", "Médecins spécialistes", "Chirurgiens-dentistes", "Chirurgiens-dentistes spécialistes"
      ]
    },
    {
      category: "Professions de pharmacie et de la physique médicale",
      options: [
        "Pharmaciens", "Pharmaciens spécialistes", "Physiciens médicaux", "Infirmiers", "Infirmiers spécialistes", "Sages-femmes", "Sages-femmes spécialistes"
      ]
    },
    {
      category: "Professions paramédicales",
      options: [
        "Diététicien", "Opticiens / Optométristes", "Audioprothésistes", "Orthoprothésistes", "Pédicure, podologue", "Assistants dentistes", "Psychomotriciens", "Ergothérapeutes"
      ]
    },
    {
      category: "Technicien Supérieur de la Santé",
      options: [
        "Biologie Médicale", "Hygiène et Assainissement", "Imagerie médicale", "Biomédicale ", "Kinésithérapie", "Prothèse Dentaire", "Préparation  et Gestion en Pharmacie"
      ]
    },
    {
      category: "Auxiliaire des techniques sanitaires",
      options: [
        "Soins obstétricaux", "Soins Infirmiers", "Pharmacie", "Laboratoire", " Hygiène et Assainissement", "Imagerie Médicale"
      ]
    },
    {
      category: "Ingénieur des Techniques Sanitaires",
      options: [
        "Préparation et Gestion en Pharmacie", "Biologie  Médicale", "Hygiène et Assainissement ", "Imagerie  Médicale", " Biomédicale", "Santé Publique"
      ]
    },
    {
      category: "Ingénieur des Services de Santé",
      options: [
        "Préparation et gestion en Pharmacie", " Biologie Médicale", "Hygiène et  Assainissement", "imagerie Médicale", "Biomédicale", "Economie de la Santé", "Santé Public", "Epidémiologie"
      ]
    },
    {
      category: "Profession de médecine traditionnelle",
      options: [
        "Naturothérapeutes", "Phytothérapeutes", "Psychothérapeutes", "Herboristes", "Médico-droguistes", "Accoucheuses traditionnelles"
      ]
    },
    {
      category: "Professions de médecine alternative et complémentaire",
      options: [
        "Naturothérapie", "Praticiens d’acupuncture", "Homéopathie", "Naturopathie", "Phytothérapie", "Chiropractie", "Ostéopathie", "Psychothérapie", "Hypnothérapie", "Massothérapie"
      ]
    }
  ];













  let previews = {
    cv: null,
    photo: null,
    casier: null,
    cni: null,
    certificat: null,
    diplomeFile: null
  };

  let errorss = {};

  function handleFileChange(event, fieldName) {
    const file = event.target.files[0];
    if (file) {
      // Vérification de la taille du fichier (ex: max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        errorss[fieldName] = "Le fichier est trop volumineux (max: 5MB)";
        formData[fieldName] = null;
        previews[fieldName] = null;
      } else {
        errorss[fieldName] = null;
        formData[fieldName] = file;
        previews[fieldName] = URL.createObjectURL(file);
      }
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














    {#if step === 1}
  <h3>Informations de connexion</h3>
   <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Informations de connexion(étape 1/5)
              </h2>
  <div class="tablo">
    <div class="tablo--1h-ve-2">
      <div class="row">
       
 <div class="form__grup">
          <label class="form_label">E-mail *</label>
          <input
            type="email"
            class="form__input"
            bind:value={formData.email}
            placeholder="E-mail"
          />
          {#if errors.email}<p class="error">{errors.email}</p>{/if}
        </div>
        <!-- Champ Password -->
       
      </div>

      <div class="row">
        <!-- Champ Confirm Password -->
        <div class="form__grup">
          <label class="form_label">Confirm Password *</label>
          <input
            type="password"
            class="form__input"
            bind:value={formData.confirmPassword}
            placeholder="Confirm Password"
          />
          {#if formData.confirmPassword !== formData.password}
            <p class="error">password different du confirm Password</p>
          {/if}
           {#if errors.confirmPassword}
            <p class="error">{errors.confirmPassword}</p>
          {/if}
        </div>
 <div class="form__grup">
          <label class="form_label">Password *</label>
          <input
            type="password"
            class="form__input"
            bind:value={formData.password}
            placeholder="Password"
          />
          {#if errors.password}<p class="error">{errors.password}</p>{/if}
        </div>
        <!-- Champ Email -->
       
      </div>
    </div>
  </div>
{/if}

            <!-- Étape 1 -->
            {#if step === 2}
              
               <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
             Informations personnelles(étape 2/5)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  <div class="row">
                    <div class="form__grup">
                      <label class="form_label">Nom *</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.nom}
                        placeholder="Nom"
                      />
                      {#if errors.nom}<p class="error">
                          {errors.nom}
                        </p>{/if}
                    </div>
                    <div class="form__grup">
                      <label class="form_label">Prénom *</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.prenoms}
                        placeholder="Prénom"
                      />
                      {#if errors.prenoms}<p class="error">
                          {errors.prenoms}
                        </p>{/if}
                    </div>

                     <div class="form__grup">
          <label class="form_label">Adresse complète *</label>
          <input
            type="text"
            class="form__input"
            bind:value={formData.address}
            placeholder="Pôle sanitaire, ville..."
          />
          {#if errors.address}<p class="error">{errors.address}</p>{/if}
        </div>

        <div class="form__group">
          
          <label for="civility" class="form_label">Civilité *</label>
          <select 
            name="civility" 
            id="civility" 
            class="form__input"
            bind:value={formData.civilite}>
            {#each civiliteOption as option }
            <option value={option}>{option}</option>
            {/each}
          </select>
          {#if errors.civilite}<p class="error">{errors.civilite}</p>{/if}
        </div>
                  </div>

                  <div class="row">

                      <div class="form__grup">
                      <label class="form_label">Date de naissance *</label>
                      <input
                        type="date"
                        class="form__input"
                        bind:value={formData.dateNaissance}
                      />
                      {#if errors.dateNaissance}<p class="error">{errors.dateNaissance}</p>{/if}
                    </div>
                     <div class="form__grup">
                      <label class="form_label">viile *</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.viile}
                        placeholder="viile"
                      />
                      {#if errors.viile}<p class="error">
                          {errors.viile}
                        </p>{/if}
                    </div>
                         <div class="form__grup">
        <label class="form_label">Numéro *</label>
        <input
          type="text"
          class="form__input"
          bind:value={formData.numero}
          placeholder="Numéro"
        />
        {#if errors.numero}<p class="error">{errors.numero}</p>{/if}
      </div>
         <div class="form__grup">
        <label class="form_label">Nationalité *</label>
        <input
          type="text"
          class="form__input"
          bind:value={formData.nationate}
          placeholder="Nationalité"
        />
        {#if errors.nationate}<p class="error">{errors.nationate}</p>{/if}
      </div>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Étape 2 -->


{#if step === 3}
    
       <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
             Informations professionnel(étape 3/5)
              </h2>
  <div class="tablo">

<div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
  {#each professions as profession}
    <div class="border p-4 rounded-lg shadow-sm">
      <h3 class="text-lg font-semibold mb-2">{profession.category}</h3>
      {#each profession.options as option}
        <label class="block mb-1">
          <input type="radio"  bind:group={formData.profession }  value={option} class="mr-2" >

          {option}
        </label>
      {/each}
    </div>
  {/each}

        {#if errors.profession}<p class="error">{errors.profession}</p>{/if}
</div>
    <div class="tablo--1h-ve-2">



         <div class="row">

<div class="form__grup">
        <label class="form_label">Date d'emploi *</label>
        <input
          type="date"
          class="form__input"
          bind:value={formData.dateEmploi}
        />
        {#if errors.dateEmploi}<p class="error">{errors.dateEmploi}</p>{/if}
      </div>

                  <div class="form__grup">
                    <label class="form_label">Lieu d’exercice *</label>
                    <input
                      type="text"
                      class="form__input"
                      bind:value={formData.addressPro}
                      placeholder="Lieu"
                    />
                    {#if errors.addressPro}<p class="error">
                        {errors.addressPro}
                      </p>{/if}
                  </div>
                    <div class="form__grup">
                      <label class="form_label">specialite *</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.specialite}
                        placeholder=" specialite"
                      />
                      {#if errors.specialite}<p class="error">
                          {errors.specialite}
                        </p>{/if}
                    </div>
      <div class="form__grup">
        <label class="form_label">Genre *</label>
        <input
          type="text"
          class="form__input"
          bind:value={formData.genre}
          placeholder="Genre"
        />
        {#if errors.genre}<p class="error">{errors.genre}</p>{/if}
      </div>
      <div class="form__grup">
        <label class="form_label">Diplôme *</label>
        <input
          type="text"
          class="form__input"
          bind:value={formData.diplome}
          placeholder="Diplôme"
        />
        {#if errors.diplome}<p class="error">{errors.diplome}</p>{/if}
      </div>
   
         </div>
          <div class="row"> 
         <div class="form__grup">
        <label class="form_label">Situation professionnelle *</label>
        <input
          type="text"
          class="form__input"
          bind:value={formData.situationPro}
          placeholder="Situation" 
        />
        {#if errors.situationPro}<p class="error">{errors.situationPro}</p>{/if}
      </div>
      <div class="form__grup">
        <label class="form_label">Date du diplôme *</label>
        <input
          type="date"
          class="form__input"
          bind:value={formData.dateDiplome}
        />
        {#if errors.dateDiplome}<p class="error">{errors.dateDiplome}</p>{/if}
      </div>



          <div class="form__grup">
        <label class="form_label">Adresse email professionnel*</label>
        <input
          type="email"
          class="form__input"
          bind:value={formData.emailPro}
          placeholder="Email"
        />
        {#if errors.emailPro}<p class="error">{errors.emailPro}</p>{/if}
      </div>
      <div class="form__grup">
        <label class="form_label">Contact professionnel *</label>
        <input
          type="text"
          class="form__input"
          bind:value={formData.contactPro}
          placeholder="Contact"
        />
        {#if errors.contactPro}<p class="error">{errors.contactPro}</p>{/if}
      </div>
            </div>
    </div>
  </div>
{/if}








{#if step === 5}

 <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
             Informations organisation(étape 5/5)
              </h2>

  <div class="tablo">
    <div class="tablo--1h-ve-2">



             <div class="form__group">
              <label class="form_label">Appartenance à une organisation *</label>
              
              <!-- Case à cocher classique -->
              <input 
                  type="checkbox" 
                  class="form__input h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-400" 
                  bind:checked={formData.appartenirOrganisation} 
                  id="organisation-checkbox"
              />
              
              <!-- Message de "Oui" ou "Non" -->
              <span class="ml-2">
                  {#if formData.appartenirOrganisation}
                      Oui
                  {:else}
                      Non
                  {/if}
              </span>

              <!-- Message d'erreur -->
              {#if errors.appartenirOrganisation}
                  <p class="error text-red-500 text-sm mt-1">{errors.appartenirOrganisation}</p>
              {/if}
    </div>
       {#if formData.appartenirOrganisation == true}
        
    
      <div class="row">
      <div class="form__grup">
        <label class="form_label">Numero de l'organisation *</label>
        <input
          type="text"
          class="form__input"
          bind:value={formData.organisationNumero}
          placeholder="Organisation"
        />
        {#if errors.organisationNumero}<p class="error">{errors.organisationNumero}</p>{/if}
      </div>
     


      </div>
      <div class="row">
      <div class="form__grup">
        <label class="form_label">Nom de l'organisation *</label>
        <input
          type="text"
          class="form__input"
          bind:value={formData.organisationNom}
          placeholder="Nom de l'organisation"
        />
        {#if errors.organisationNom}<p class="error">{errors.organisationNom}</p>{/if}
      </div>
         <div class="form__grup">
        <label class="form_label">Année d'organisation *</label>
        <input
          type="text"
          class="form__input"
          bind:value={formData.organisationAnnee}
          placeholder="Année"
        />
        {#if errors.organisationAnnee}<p class="error">{errors.organisationAnnee}</p>{/if}
      </div>
      </div>
         {/if}
    </div>
  </div>
{/if}











{#if step === 4}
  <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
    Informations complémentaires (étape 4/5)
  </h2>

  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- CV -->
      <div class="flex flex-col space-y-2">
        <label class="font-semibold">▸ CV</label>
        <input type="file" class="dropify" name="cv" on:change={(e) => handleFileChange(e, 'cv')} accept=".jpg,.jpeg,.png,.pdf"/>
        {#if errors.cv} <p class="text-red-500">{errors.cv}</p> {/if}
        {#if previews.cv} <img src={previews.cv} alt="CV" class="h-40 w-50"/> {/if}
      </div>

      <!-- Photos d’identité -->
      <div class="flex flex-col space-y-2">
        <label class="font-semibold">▸ 02 photos d’identité</label>
        <input type="file" class="dropify" name="photo" on:change={(e) => handleFileChange(e, 'photo')} accept=".jpg,.jpeg,.png,.pdf"/>
        {#if errors.photo} <p class="text-red-500">{errors.photo}</p> {/if}
        {#if previews.photo} <img src={previews.photo} alt="Photos d’identité" class="h-40 w-50"/> {/if}
      </div>

      <!-- Casier judiciaire -->
      <div class="flex flex-col space-y-2">
        <label class="font-semibold">▸ Extrait de casier judiciaire</label>
        <input type="file" class="dropify" name="casier" on:change={(e) => handleFileChange(e, 'casier')} accept=".jpg,.jpeg,.png,.pdf"/>
        {#if errors.casier} <p class="text-red-500">{errors.casier}</p> {/if}
        {#if previews.casier} <img src={previews.casier} alt="Casier judiciaire" class="h-40 w-50"/> {/if}
      </div>

      <!-- CNI -->
      <div class="flex flex-col space-y-2">
        <label class="font-semibold">▸ CNI</label>
        <input type="file" class="dropify" name="cni" on:change={(e) => handleFileChange(e, 'cni')} accept=".jpg,.jpeg,.png,.pdf"/>
        {#if errors.cni} <p class="text-red-500">{errors.cni}</p> {/if}
        {#if previews.cni} <img src={previews.cni} alt="CNI" class="h-40 w-50"/> {/if}
      </div>

      <!-- Certificat -->
      <div class="flex flex-col space-y-2">
        <label class="font-semibold">▸ Certificat</label>
        <input type="file" class="dropify" name="certificat" on:change={(e) => handleFileChange(e, 'certificat')} accept=".jpg,.jpeg,.png,.pdf"/>
        {#if errors.certificat} <p class="text-red-500">{errors.certificat}</p> {/if}
        {#if previews.certificat} <img src={previews.certificat} alt="Certificat" class="h-40 w-50"/> {/if}
      </div>

      <!-- Diplôme -->
      <div class="flex flex-col space-y-2">
        <label class="font-semibold">▸ Diplôme</label>
        <input type="file" class="dropify" name="diplomeFile" on:change={(e) => handleFileChange(e, 'diplomeFile')} accept=".jpg,.jpeg,.png,.pdf"/>
        {#if errors.diplomeFile} <p class="text-red-500">{errors.diplomeFile}</p> {/if}
        {#if previews.diplomeFile} <img src={previews.diplomeFile} alt="Diplôme" class="h-40 w-50"/> {/if}
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

              {#if step < 5}
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


      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/css/dropify.css" integrity="sha512-In/+MILhf6UMDJU4ZhDL0R0fEpsp4D3Le23m6+ujDWXwl3whwpucJG1PEmI3B07nyJx+875ccs+yX2CqQJUxUw==" crossorigin="anonymous" referrerpolicy="no-referrer">

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


   .footerss p {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: start !important;
                  align-items: start !important;
              }
              h2.h2-baslik-footer.h-yazi-margin-kucuk,.footer__list,.footer__sosyal {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: start !important;
                  align-items: start !important;
              }


                .tablo:not(:last-child) {
      margin-bottom: 35px;
  }
  .dropify-wrapper .dropify-message p {
      text-align: center;
  }
  .dropify-wrapper .dropify-message span.file-icon {
      font-size: 50px;
      color: #CCC;
      display: none;
  }
  .dropify-wrapper {
      height: 100px !important;
  }
  .col-md-3{
      margin-top:15px !important;
  }
  
  </style>
  <Footer />
</div>





