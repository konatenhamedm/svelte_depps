<script lang="ts">
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import Footer from "$components/Footer.svelte";
  import { onMount } from "svelte";
  import { apiFetch, BASE_URL_API } from "$lib/api";
  import { EyeOutline } from "flowbite-svelte-icons";
  import { goto } from "$app/navigation";
  import Spinner from "$components/_skeletons/Spinner.svelte";
    import { isValid } from "date-fns";

  let paiementData: any[] = [];

export let data;
let user = data?.user;

let formData = {

  nom: "",
  prenoms: "",
  numero : "",
 
};


let loading = false;

async function fetchData(userId: number) {
    loading = true;
    try {
      const res = await apiFetch(true, `/professionnel/get/one/${userId}`)

      console.log("Response:", res);
        if (res) {
          
            formData = {
                nom: res.data.personne?.nom || "",
                prenoms: res.data.personne?.prenoms || "",
                numero: res.data.personne?.number || "",
            };
          
        } else {
            console.error("Erreur de récupération:");
        }
    } catch (error) {
        console.error("Erreur API:", error);
    } finally {
        loading = false;
    }
}

onMount(async () => {
    await fetchData(user?.personneId);
    
});

let isValiding = false;
 function clickValidation() {

    isValiding = true;
    try {
      //apiFetch(provenance: boolean, url: string, method?: string, data?: any, options?: RequestInit)



      fetch( BASE_URL_API +"/paiement/renouvellement", {
      method: "POST",
      body: JSON.stringify({
        nom: formData.nom,
        prenoms: formData.prenoms,
        numero: formData.numero,
        email: user?.username,
        type: user?.type,
        user: user?.id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        
        console.log("TTFDGFDTD", result);

        if (result.data.url) {
          localStorage.setItem("reference", result.data.reference);
          window.location.href = result.data.url + "?return=1";
        }
        isValiding = false;

      })
      
    } catch (error) {
        console.error("Erreur API:", error);
        isValiding = false;
    } 
}



function navigateToDashboard() {
    goto("/site/dashboard");
}
</script>

<Slide {user} /> <br /><br /><br /><br /><br /><br />


  <div
    class="file-ariane flex items-center space-x-2 text-sm text-gray-600 mb-8"
  >
    <div class="flex items-center hover:text-blue-600 entete">
      <button
      on:click={navigateToDashboard}
      class="flex items-center hover:text-blue-600"
    >
      <!-- Icône SVG pour "Tableau de bord" -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
        />
      </svg>
      Tableau de bord
    </button>
    <span>/</span>
    <span class="text-gray-800">Informations de l'utilisateur</span>
    </div>
    <!-- Nom de la page actuelle -->
  </div> <br /><br /><br /><br /><br /><br />


<main style="background-color: #fff" class="pb-20">
  <style>
      .entete {
    width: 80% !important;
  }
    .tablo:not(:last-child) {
      margin-bottom: 35px;
    }
    .dropify-wrapper .dropify-message p {
      text-align: center;
    }
    .dropify-wrapper .dropify-message span.file-icon {
      font-size: 50px;
      color: #ccc;
      display: none;
    }
    .dropify-wrapper {
      height: 100px !important;
    }
    .col-md-3 {
      margin-top: 15px !important;
    }
    .iletisim-form-alani {
      padding: 20rem 157px 10rem !important;

      background-color: #fff;
    }
    .main-div {
      margin-top: -10px;
      margin-bottom: 130px;
      /* border: 1px solid #e5e7eb; */
      background: transparent;
      border-radius: 10px;
      padding: 20rem 316px 10rem !important;
    }

    .file-ariane {
      position: absolute;
      width: 100%;
      top: 96px;
      background: #4292cecc;
      padding: 22px;
      color: white;
      font-size: 14px;
      justify-content: center;
      align-items: center;
    }

    .file-ariane span {
      color: white;
      margin: 0 5px;
    }
    .pagination-controls {
      /* display: flex; */
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }
    .pagination-controls button {
      margin: 0 10px;
      padding: 5px 10px;
      background-color: #f57f30;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .pagination-controls button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .pagination-controls span {
      margin: 0 10px;
    }
   
  </style>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <section class="hakkimizda-bolumu-anasayfa1 iletisim-form-alani" style="padding-top:120px">
    <div class="container">
      
      <div class="masqueur à effet de révélation d'image de projet wow">
   

        <div class="card shadow-sm p-4" style="max-width: 600px; margin: 0 auto;">
         <!--  <h4 class="mb-4 text-center">Informations de l'utilisateur</h4> -->
          <div class="mb-3">
            <strong>Nom :</strong> {formData.nom}
          </div>
          <div class="mb-3">
            <strong>Prénoms :</strong> {formData.prenoms}
          </div>
          <div class="mb-3">
            <strong>Email :</strong> {user?.username}
          </div>
          <div class="mb-3">
            <strong>Type d'utilisateur :</strong> {user?.type}
          </div>
          <div class="mb-4">
            <strong>Numéro de téléphone :</strong> {formData.numero}
          </div>
        
          <div class="mt-6 flex justify-start">
            <!--  -->
            <button
              type="button"
              on:click={clickValidation}
              class="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {#if isValiding }
                <div class="grid grid-cols-2">
                  <div>
                    <Spinner />
                  </div>
                  <div>Modifier</div>
                </div>
              {:else}
                Soumettre
              {/if}
            </button>
          </div>
        </div>
        
       
       <br /><br /><br /><br /> <br /><br /><br /><br /><br /><br />
      </div>
    </div>
  </section>
</main>


<Footer />
