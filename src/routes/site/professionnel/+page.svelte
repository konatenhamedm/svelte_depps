<script>

  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import { onMount } from "svelte";

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
  certificat: "",
  appartenirOrganisation: false,
  situationPro: "",
  organisationNom: "",
// file 
 casier: "",
  diplomeFile: "",
  photo: "",
  cv: "",
  cni: "",


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
      errors.passwordDif = formData.confirmPassword  ? formData.confirmPassword !== formData.password : "password different du confirm Password";
      
      valid = !errors.email && !errors.confirmPassword  && !errors.password && !errors.passwordDif;
    }

    if (step === 2) {
      errors.nom = formData.nom ? "" : "Le nom est requis";
      errors.prenoms = formData.prenoms ? "" : "Le prénom est requis";
       errors.viile =  formData.viile ? "" : "La viile est requis";
      errors.dateNaissance = formData.dateNaissance ? "" : "La date de naissance est requise";
      valid = !errors.nom && !errors.prenoms  && !errors.dateNaissance;
    }

    if (step === 3) {
      errors.address = formData.address ? "" : "L'adresse est requise";
    errors.numero = formData.numero ? "" : "Le numéro est requis";
       errors.civilite = formData.civilite ? "" : "La civilité est requise";
      errors.nationate = formData.nationate ? "" : "La nationalité est requise";

      valid = !errors.address && !errors.civilite && !errors.nationate && !errors.numero;
    }

   
    // Étape 3
    if (step === 4) {


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
              !errors.situationPro;
    }

    // Étape 4
    if (step === 5) {
      errors.dateEmploi = formData.dateEmploi ? "" : "La date d'emploi est requise";
      errors.emailPro  = formData.emailPro ? "" : "L'adresse email est requise";
      errors.contactPro = formData.contactPro ? "" : "Le contact professionnel est requis";
      valid = !errors.profession && !errors.dateEmploi && !errors.emailPro && !errors.contactPro;
    }

    // Étape 6
    if (step === 6) {
      if (formData.appartenirOrganisation){
      
      errors.organisationAnnee = formData.organisationAnnee ? "" : "L'année d'organisation est requise";
      errors.organisationNom = formData.organisationNom ? "" : "Le nom de l'organisation est requis";
      errors.organisationNumero = formData.organisationNumero ? "": "entre le numero de organisation";
      valid =  !errors.organisationAnnee && !errors.organisationNom && !errors.organisationNumero;
      }
    } 

     // Étape 6
   

    // Étape 7
  if (step === 7) {
      errors.photo = formData.photo ? "" : "La photo est requise";
      errors.cv = formData.cv ? "" : "Le CV est requis";
     errors.casier = formData.casier ? "" : "Le casier judiciaire est requis";
      errors.cni = formData.cni ? "" : "La CNI est requise";
       errors.certificat = formData.certificat ? "" : "Le certificat est requis";
      errors.diplomeFile = formData.diplomeFile ? "" : "Le fichier de diplôme est requis";
      valid = !errors.photo && !errors.cv && !errors.casier && !errors.cni && !errors.diplomeFile && !errors.certificat;
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
                Informations de connexion(étape 1/7)
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
             Informations personnelles(étape 2/7)
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
                  </div>
                </div>
              </div>
            {/if}

            <!-- Étape 2 -->


{#if step === 3}
   <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
             Informations personnelles(étape 3/7)
              </h2>
  <div class="tablo">
    <div class="tablo--1h-ve-2">
      <div class="row">
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




{#if step === 4}
       <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
             Informations professionnel(étape 4/7)
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
            </div>
    </div>
  </div>
{/if}




{#if step === 5}

         <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
             Informations professionnel(étape 5/7)
              </h2>
  <div class="tablo">
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
      </div>
      <div class="row">
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



{#if step === 6}

 <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
             Informations organisation(étape 6/7)
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












{#if step === 7}
     <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
             Informations complementaire(étape 7/7)
              </h2>
        <div class="tablo">
          <div class="tablo--h-ve-2">

      <section class="hakkimizda-bolumu-anasayfa1" >
        <div class="container">
            <div class="tablo--1h-ve-2 masqueur à effet de révélation d'image de projet wow animated" style="visibility: visible;">
              
                <h2 class=" text-center"> Documents à fournir</h2>
              
                    <div class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Colonne 1 -->
            

              <!-- Colonne 1 -->
              <div class="flex items-center space-x-4">
                  <!-- Titre -->
                  <div class="flex-shrink-0 text-lg font-semibold">
                      ▸ cv
                  </div>
                  <!-- Champ de téléchargement -->
                  <div class="dropify-wrapper">
                      <div class="dropify-message">
                          <span class="file-icon"></span>
                          <p>Importer cv (Jpg/PDF)</p>
                          <p class="dropify-error">Désolé, le fichier trop volumineux</p>
                          {#if errors.cv}<p class="error">
                              {errors.cv}
                            </p>{/if}
                      </div>
                      <div class="dropify-loader"></div>
                      <div class="dropify-errors-container">
                          <ul></ul>
                      </div>
                    
                      <input type="file" class="dropify w-48" name="cv"   bind:value={formData.cv} data-default-file="">
                      <button type="button" class="dropify-clear">Supprimer</button>
                      <div class="dropify-preview">
                          <span class="dropify-render"></span>
                          <div class="dropify-infos">
                              <div class="dropify-infos-inner">
                                  <p class="dropify-filename">
                                      <span class="file-icon"></span> 
                                      <span class="dropify-filename-inner"></span>
                                  </p>
                                  <p class="dropify-infos-message">Importer cv (Jpg/PDF)</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
              </div>
                <!-- Colonne 1 -->
              <div class="flex items-center space-x-4">
                  <!-- Titre -->
                  <div class="flex-shrink-0 text-lg font-semibold">
                      ▸ 02 photos d’identité de même tirage
                  </div>
                  <!-- Champ de téléchargement -->
                  <div class="dropify-wrapper">
                      <div class="dropify-message">
                          <span class="file-icon"></span>
                          <p>Importer photos (Jpg/PDF)</p>
                          <p class="dropify-error">Désolé, le fichier trop volumineux</p>
                          {#if errors.photo}<p class="error">
                              {errors.photo}
                            </p>{/if}
                      </div>
                      <div class="dropify-loader"></div>
                      <div class="dropify-errors-container">
                          <ul></ul>
                      </div>
                    
                      <input type="file" class="dropify w-48" name="photo"   bind:value={formData.photo} data-default-file="">
                      <button type="button" class="dropify-clear">Supprimer</button>
                      <div class="dropify-preview">
                          <span class="dropify-render"></span>
                          <div class="dropify-infos">
                              <div class="dropify-infos-inner">
                                  <p class="dropify-filename">
                                      <span class="file-icon"></span> 
                                      <span class="dropify-filename-inner"></span>
                                  </p>
                                  <p class="dropify-infos-message">Importer un fichier (Jpg/PDF)</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
              </div>
              
        <div class="flex items-center space-x-4">
                  <!-- Titre -->
                  <div class="flex-shrink-0 text-lg font-semibold">
                      ▸Extrait de casier judiciaire <br>
                      (Datant de moins de 3 mois)
                  </div>
                  <!-- Champ de téléchargement -->
                  <div class="dropify-wrapper">
                      <div class="dropify-message">
                          <span class="file-icon"></span>
                          <p>Importer Extrait de casier judiciaire (Jpg/PDF)</p>
                          <p class="dropify-error">Désolé, le fichier trop volumineux</p>
                          {#if errors.casier}<p class="error">
                              {errors.casier}
                            </p>{/if}
                      </div>
                      <div class="dropify-loader"></div>
                      <div class="dropify-errors-container">
                          <ul></ul>
                      </div>
                    
                      <input type="file" class="dropify w-48" name="casier"   bind:value={formData.casier} data-default-file="">
                      
                      <button type="button" class="dropify-clear">Supprimer</button>
                      <div class="dropify-preview">
                          <span class="dropify-render"></span>
                          <div class="dropify-infos">
                              <div class="dropify-infos-inner">
                                  <p class="dropify-filename">
                                      <span class="file-icon"></span> 
                                      <span class="dropify-filename-inner"></span>
                                  </p>
                                  <p class="dropify-infos-message">Importer casier judiciaire (Jpg/PDF)</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
              </div>


        <div class="flex items-center space-x-4">
                  <!-- Titre -->
                  <div class="flex-shrink-0 text-lg font-semibold">
                      ▸cni
                  </div>
                  <!-- Champ de téléchargement -->
                  <div class="dropify-wrapper">
                      <div class="dropify-message">
                          <span class="file-icon"></span>
                          <p>Importer cni (Jpg/PDF)</p>
                          <p class="dropify-error">Désolé, le fichier trop volumineux</p>
                          {#if errors.cni}<p class="error">
                              {errors.cni}
                            </p>{/if}
                      </div>
                      <div class="dropify-loader"></div>
                      <div class="dropify-errors-container">
                          <ul></ul>
                      </div>
                    
                      <input type="file" class="dropify w-48" name="cni"   bind:value={formData.cni} data-default-file="">
                      <button type="button" class="dropify-clear">Supprimer</button>
                      <div class="dropify-preview">
                          <span class="dropify-render"></span>
                          <div class="dropify-infos">
                              <div class="dropify-infos-inner">
                                  <p class="dropify-filename">
                                      <span class="file-icon"></span> 
                                      <span class="dropify-filename-inner"></span>
                                  </p>
                                  <p class="dropify-infos-message">Importer cni (Jpg/PDF)</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
              </div>

        <div class="flex items-center space-x-4">
                  <!-- Titre -->
                  <div class="flex-shrink-0 text-lg font-semibold">
                      certificat
                  </div>
                  <!-- Champ de téléchargement -->
                  <div class="dropify-wrapper">
                      <div class="dropify-message">
                          <span class="file-icon"></span>
                          <p>Importer certificat (Jpg/PDF)</p>
                          <p class="dropify-error">Désolé, le fichier trop volumineux</p>
                          {#if errors.certificat}<p class="error">
                              {errors.certificat}
                            </p>{/if}
                      </div>
                      <div class="dropify-loader"></div>
                      <div class="dropify-errors-container">
                          <ul></ul>
                      </div>
                    
                      <input type="file" class="dropify w-48" name="certificat"   bind:value={formData.certificat} data-default-file="">
                      <button type="button" class="dropify-clear">Supprimer</button>
                      <div class="dropify-preview">
                          <span class="dropify-render"></span>
                          <div class="dropify-infos">
                              <div class="dropify-infos-inner">
                                  <p class="dropify-filename">
                                      <span class="file-icon"></span> 
                                      <span class="dropify-filename-inner"></span>
                                  </p>
                                  <p class="dropify-infos-message">Importer certificat (Jpg/PDF)</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
              </div>



      <div class="flex items-center space-x-4">
                  <!-- Titre -->
                  <div class="flex-shrink-0 text-lg font-semibold">
                      diplome
                  </div>
                  <!-- Champ de téléchargement -->
                  <div class="dropify-wrapper">
                      <div class="dropify-message">
                          <span class="file-icon"></span>
                          <p>Importer diplome  (Jpg/PDF)</p>
                          <p class="dropify-error">Désolé, le fichier trop volumineux</p>
                          {#if errors.diplomeFile}<p class="error">
                              {errors.diplomeFile}
                            </p>{/if}
                      </div>
                      <div class="dropify-loader"></div>
                      <div class="dropify-errors-container">
                          <ul></ul>
                      </div>
                    
                      <input type="file" class="dropify w-48" name="diplomeFile"   bind:value={formData.diplomeFile} data-default-file="">
                      <button type="button" class="dropify-clear">Supprimer</button>
                      <div class="dropify-preview">
                          <span class="dropify-render"></span>
                          <div class="dropify-infos">
                              <div class="dropify-infos-inner">
                                  <p class="dropify-filename">
                                      <span class="file-icon"></span> 
                                      <span class="dropify-filename-inner"></span>
                                  </p>
                                  <p class="dropify-infos-message">Importer diplomeFile (Jpg/PDF)</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
              </div>



          </div>
      </div> 
                  
          
            </div>
        </div>

      


      </section>

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

              {#if step < 7}
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

