<script context="module" lang="ts">
  export const ssr = false; // Désactive le SSR pour ce composant
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import Highcharts from 'highcharts';
  import Exporting from 'highcharts/modules/exporting';
  import ExportData from 'highcharts/modules/export-data';
  import pdfMake from 'pdfmake';
  import pdfFonts from 'pdfmake/build/vfs_fonts';

  export let data: any = [];

  let pie3;

  onMount(() => {
    if (typeof window !== 'undefined') {
      Exporting(Highcharts);
      ExportData(Highcharts);
      /*
      ExportData(Highcharts); */
   /*    pdfMake.vfs = pdfFonts.pdfMake.vfs; */

      pie3 = Highcharts.chart('container3', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: ''
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Parts',
          colorByPoint: true,
          data: data
        }],
        exporting: {
          enabled: true,
          buttons: {
            contextButton: {
              menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
            }
          }
        }
      });
    }
  });

  $: if (pie3 && data.length > 0) {
    pie3.series[0].setData(data);
  }
</script>

<div id="container3" style="width:100%; height:400px;"></div>