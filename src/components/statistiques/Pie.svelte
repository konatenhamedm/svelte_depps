<script lang="ts">
    import { onMount } from 'svelte';
    import Highcharts from 'highcharts';
    import Highcharts3D from 'highcharts/highcharts-3d';

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
        text: 'Répartition  transactions par opérateur'
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
        data: [{
          name: 'MTN',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'ORANGE',
          y: 11.84
        }, {
          name: 'MOOV',
          y: 10.85
        },{
          name: 'WAVE',
          y: 10.85
        }]
      }]
    });
  
    });
  </script>
  
  <div id="container3" style="width:100%; height:400px;"></div>
  