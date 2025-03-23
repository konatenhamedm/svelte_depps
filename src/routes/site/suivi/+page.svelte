<script>
  import { goto } from "$app/navigation";
  import Footer from "$components/Footer.svelte";
  import Slide from "$components/Slide.svelte";

  
  function navigateToDashboard() {
      goto("/site/dashboard");
    }

</script>

<Slide /><br><br><br><br>
<div class="container ">
  <div class="file-ariane flex items-center space-x-2 text-sm text-gray-600 mb-4">
    <button on:click={navigateToDashboard} class="flex items-center hover:text-blue-600">
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
    <span class="text-gray-800">Détails du forum</span> <!-- Nom de la page actuelle -->
  </div><br>
</div>
<main style="background-color: #fff" class="pb-[100px]">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
      /* Custom styles */
      .file-ariane {
      position: absolute;
      width: 68%;
      top: 112px;
      background: #4292cecc;
      padding: 22px;
      color: white;
      font-size: 14px;
    }

    .file-ariane span {
      color: white;
    }
      .government-table {
        font-size: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .government-table thead {
          background-color: #003366 !important;
          color: white;
      }
      .government-table th, .government-table td {
          padding: 12px;
          text-align: center;
      }
      .government-table tbody tr:nth-child(even) {
          background-color: #e9ecef;
      }
      .government-table tbody tr:hover {
          background-color: #d1e7fd;
      }
  </style>

<br><br><br><br>
<div class="container mt-5">
 <!--  <h2 class="text-center mb-4">Informations Gouvernementales</h2> -->
  <div class="table-responsive government-table">
      <table class="table table-bordered">
          <thead >
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nom du Département</th>
                  <th scope="col">Responsable</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Statut</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <th scope="row">1</th>
                  <td>Ministère de la Santé</td>
                  <td>Jean Dupont</td>
                  <td>jean.dupont@gouv.fr</td>
                  <td><span class="badge bg-success">Actif</span></td>
              </tr>
              <tr>
                  <th scope="row">2</th>
                  <td>Ministère de l'Éducation</td>
                  <td>Marie Curie</td>
                  <td>marie.curie@gouv.fr</td>
                  <td><span class="badge bg-warning">En attente</span></td>
              </tr>
              <tr>
                  <th scope="row">3</th>
                  <td>Ministère des Finances</td>
                  <td>Pierre Martin</td>
                  <td>pierre.martin@gouv.fr</td>
                  <td><span class="badge bg-danger">Inactif</span></td>
              </tr>
              <tr>
                  <th scope="row">4</th>
                  <td>Ministère de la Défense</td>
                  <td>Lucie Bernard</td>
                  <td>lucie.bernard@gouv.fr</td>
                  <td><span class="badge bg-success">Actif</span></td>
              </tr>
          </tbody>
      </table>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
<br><br>
</main>
<Footer />