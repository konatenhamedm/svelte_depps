<script lang="ts">
  //import { saveAs } from 'file-saver';
  import * as XLSX from 'xlsx';
  export let apiData;

  // Ordre des tranches d'âge
  const ageRanges = [
    '< 25 ans',
    '25-34 ans',
    '35-44 ans',
    '45-54 ans',
    '55 ans et plus',
  ];

  // Traitement sécurisé avec vérifications
  $: processedData = (() => {
    // Vérification initiale des données
    if (
      !apiData ||
      !apiData.statistiques ||
      !Array.isArray(apiData.statistiques.tableau_croise)
    ) {
      console.warn('Données manquantes ou format incorrect');
      return {
        lieux: [],
        totals: {
          ageRanges: Object.fromEntries(ageRanges.map((range) => [range, 0])),
          general: 0,
        },
      };
    }

    const lieuxMap = new Map();
    const totals = {
      ageRanges: Object.fromEntries(ageRanges.map((range) => [range, 0])),
      general: 0,
    };

    apiData.statistiques.tableau_croise.forEach((item: any) => {
      try {
        // Vérification de la structure de l'item
        if (
          !item ||
          !item.lieu ||
          !item.civilite ||
          !item.tranche_age ||
          item.count === undefined
        ) {
          console.warn('Item incomplet:', item);
          return;
        }

        const lieuId = item.lieu.id;
        const civiliteId = item.civilite.id;
        const count = Number(item.count);
        const tranche = String(item.tranche_age);

        // Validation des valeurs
        if (isNaN(count) || count < 0 || !ageRanges.includes(tranche)) {
          console.warn("Valeurs invalides dans l'item:", item);
          return;
        }

        // Initialisation du lieu
        if (!lieuxMap.has(lieuId)) {
          if (!item.lieu.nom) {
            console.warn('Nom de lieu manquant pour', lieuId);
            return;
          }
          lieuxMap.set(lieuId, {
            id: lieuId,
            nom: item.lieu.nom,
            civilites: new Map(),
            totals: {
              ageRanges: {...totals.ageRanges},
              general: 0,
            },
          });
        }

        const lieu = lieuxMap.get(lieuId);

        // Initialisation de la civilité
        if (!lieu.civilites.has(civiliteId)) {
          if (!item.civilite.libelle) {
            console.warn('Libellé de civilité manquant pour', civiliteId);
            return;
          }
          lieu.civilites.set(civiliteId, {
            id: civiliteId,
            libelle: item.civilite.libelle,
            counts: {...totals.ageRanges},
          });
        }

        const civilite = lieu.civilites.get(civiliteId);

        // Mise à jour des compteurs
        civilite.counts[tranche] += count;
        lieu.totals.ageRanges[tranche] += count;
        lieu.totals.general += count;
        totals.ageRanges[tranche] += count;
        totals.general += count;
      } catch (error) {
        console.error("Erreur lors du traitement d'un item:", error, item);
      }
    });

    return {
      lieux: Array.from(lieuxMap.values()).map((lieu) => ({
        ...lieu,
        civilites: Array.from(lieu.civilites.values()),
      })),
      totals,
    };
  })();

  // Fonction de formatage sécurisée
  const formatCount = (count: any) => {
    const num = Number(count);
    return isNaN(num) ? 0 : num;
  };
  // Formatage sécurisé
  const fmt = (num: any) => num?.toLocaleString() || '0';

  // Export en CSV
  function exportToCSV() {
    let csvContent = 'Lieu,Civilité,' + ageRanges.join(',') + ',Total\n';

    processedData.lieux.forEach((lieu: any) => {
      lieu.civilites.forEach((civilite: any) => {
        const row = [
          lieu.nom,
          civilite.libelle,
          ...ageRanges.map((range) => civilite.counts[range] || 0),
          Object.values(civilite.counts).reduce((a, b) => a + b, 0),
        ];
        csvContent += row.join(',') + '\n';
      });
    });

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    //saveAs(blob, `statistiques-diplomes_${new Date().toISOString().slice(0,10)}.csv`);
  }

  // Export en Excel
  function exportToExcel() {
    const wb = XLSX.utils.book_new();
    const wsData = [];

    // En-têtes
    wsData.push(['Lieu', 'Civilité', ...ageRanges, 'Total']);

    // Données
    processedData.lieux.forEach((lieu: any) => {
      lieu.civilites.forEach((civilite: any) => {
        wsData.push([
          lieu.nom,
          civilite.libelle,
          ...ageRanges.map((range) => civilite.counts[range] || 0),
          Object.values(civilite.counts).reduce((a, b) => a + b, 0),
        ]);
      });
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Statistiques');

    XLSX.writeFile(
      wb,
      `statistiques-diplomes_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  }
</script>

<div class="col-span-1 p-1">
  <div class="box">
    <div class="box-header with-border flex justify-between items-center">
      <!--  <h4 class="box-title text-xl font-medium">
         
        </h4> -->
        <div class="export-buttons">
            <button class="btn-csv" on:click={exportToCSV}>
              Exporter en CSV
            </button>
    
            <button class="btn-excel" on:click={exportToExcel}>
              Exporter en Excel
            </button>
    
            <!-- <button class="btn-clipboard" on:click={copyToClipboard}>
                  Copier les données
                </button> -->
          </div>
    </div>
    <!-- /.box-header -->
    <div class="box-body">
      <div class="table-responsive">
        <div class="w-full grid grid-cols-4">
          <div></div>
        </div>
        <!-- body -->

        <div style="width: 100%; height: 400px;">
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th rowspan="2">Lieu</th>
                  <th rowspan="2">Civilité</th>
                  <th colspan={ageRanges.length} class="age-header">
                    Tranches d'âge
                  </th>
                  <th rowspan="2">Total</th>
                </tr>
                <tr>
                  {#each ageRanges as range}
                    <th class="age-header">{range}</th>
                  {/each}
                </tr>
              </thead>

              <tbody>
                {#each processedData.lieux as lieu (lieu.id)}
                  {#each lieu.civilites as civilite, i (civilite.id)}
                    <tr class:highlight={i === 0}>
                      {#if i === 0}
                        <td rowspan={lieu.civilites.length} class="lieu-title">
                          {lieu.nom}
                        </td>
                      {/if}
                      <td>{civilite.libelle}</td>

                      {#each ageRanges as range}
                        <td>{fmt(civilite.counts[range])}</td>
                      {/each}

                      <td>{fmt(lieu.totals.general)}</td>
                    </tr>
                  {/each}

                  <tr class="total-row">
                    <td colspan="2">Total {lieu.nom}</td>
                    {#each ageRanges as range}
                      <td>{fmt(lieu.totals.ageRanges[range])}</td>
                    {/each}
                    <td>{fmt(lieu.totals.general)}</td>
                  </tr>
                {/each}
              </tbody>

              <tfoot>
                <tr class="total-row">
                  <td colspan="2">Total général</td>
                  {#each ageRanges as range}
                    <td>{fmt(processedData.totals.ageRanges[range])}</td>
                  {/each}
                  <td>{fmt(processedData.totals.general)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {#if processedData.lieux.length === 0}
            <div class="empty-state">
              <p>Aucune donnée disponible pour les critères sélectionnés</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
    <!-- /.box-body -->
  </div>
</div>

<style>
  .table-wrapper {
    margin: rem 0;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.12),
      0 1px 2px rgba(0, 0, 0, 0.24);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  th,
  td {
    padding: 0.75rem 1rem;
    text-align: center;
    border: 1px solid #e2e8f0;
  }

  th {
    background-color: #3b82f6;
    color: white;
    font-weight: 600;
    position: sticky;
    top: 0;
  }

  .age-header {
    background-color: #2563eb;
  }

  tr:nth-child(even) {
    background-color: #f8fafc;
  }

  .total-row {
    font-weight: 600;
    background-color: #edf2f7;
  }

  .lieu-title {
    font-weight: 500;
    color: #2d3748;
  }

  .highlight {
    background-color: #ebf8ff;
  }

  .export-buttons {
    display: flex;
    gap: 10px;
   
  }

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }

  .btn-csv {
    background-color: #4caf50;
    color: white;
  }

  .btn-excel {
    background-color: #217346;
    color: white;
  }

  button:hover {
    opacity: 0.9;
  }
</style>
