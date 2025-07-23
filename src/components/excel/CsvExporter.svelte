<script lang="ts">
  import * as XLSX from 'xlsx';

  export let title = '';
  export let headers: any = [];
  export let data: any = [];
  export let typeUser = '';
  export let type = 'professionnel';

  let dataP: any;

  function getStatus(status: any) {
    return status === 1 ? 'Paiement effectué' : 'Paiement échoué';
  }

  function formatMontantPerso(montant: any) {
    return montant?.toLocaleString('fr-FR') + ' FCFA';
  }

  function formatDatePaiement(dateString: any) {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }

  function exportToCSV() {
    let rows = [];

    // Ajouter les en-têtes comme première ligne
    rows.push(headers);
    /* 'Reference',
                'Type',
                'Email',
                'Etat',
                'Montant',
                'Date', */
    if (type === 'paiement') {
      dataP = data.map((item: any) => ({
        reference: item.reference,
        email: item.email,
        type: item.type,
        etat: item.state,
        montant: item.montant,
        createdAt: item.createdAt,
      }));
    } else {

        console.log(dataP)
      dataP = data.map((item: any) => ({
        nom: item.personne.nom,
        prenom: item.personne.prenoms,
        email: item.personne.email,
        telephone: item.personne.number,
        profession: item.personne.profession ? item.personne.profession.libelle : ''
      }));
    }

    // Ajouter les lignes de données formatées
    dataP.forEach((item: any) => {
      if (type === 'paiement') {
        if (!['INSTRUCTEUR', 'SOUS-DIRECTEUR'].includes(typeUser)) {
          rows.push([
            item.reference || 'N/A',
            item.type || 'N/A',
            item.email || 'N/A',
            getStatus(item.state),
            formatMontantPerso(item.montant),
            formatDatePaiement(item.createdAt),
          ]);
        } else {
          rows.push([
            item.reference || 'N/A',
            item.type || 'N/A',
            item.email || 'N/A',
            getStatus(item.state),
            item.channel || 'N/A',
            formatDatePaiement(item.createdAt),
          ]);
        }
      } else if (type === 'professionnel' || type === 'pro') {
        rows.push([
          item.nom || 'N/A',
          item.prenom || 'N/A',
          item.email || 'N/A',
          item.telephone || 'N/A',
          item.profession || 'N/A' 
        ]);
      } else {
        rows.push([
          item.nomEtablissement || 'N/A',
          item.responsable || 'N/A',
          item.email || 'N/A',
          item.telephone || 'N/A',
        ]);
      }
    });

    // Créer une feuille de calcul à partir des données formatées
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Export');

    // Exporter en .csv (ou .xlsx si souhaité)
    //XLSX.writeFile(workbook, `${title}.csv`);
    // Pour un export en .xlsx, utilisez cette ligne à la place :
    XLSX.writeFile(workbook, `${title}.xlsx`);
  }
</script>

<!-- Bouton d'export CSV -->
<button
  on:click={exportToCSV}
  class="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
  Télécharger CSV
</button>
