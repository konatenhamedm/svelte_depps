<script lang="ts">
  import { onMount } from 'svelte';
  import Highcharts from 'highcharts';

  export let data: any = [];

  let pie3;

  onMount(() => {
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
      }]
    });
  });

  // Mettre à jour les données lorsque `data` change
  $: if (pie3 && data.length > 0) {
    pie3.series[0].setData(data);
  }
</script>

<div id="container3" style="width:100%; height:400px;"></div>
