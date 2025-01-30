$(function () {
    "use strict";


    var options = {
          series: [{
          name: 'Amount',
          type: 'line',
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        }, {
          name: 'Amount Weighted',
          type: 'line',
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        }, {
          name: 'Count',
          type: 'line',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }],
          chart: {
          height: 300,
          type: 'line',
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: [2, 2, 2],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        },
        
        fill: {
          opacity: [1, 1, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: ['01/01/2024', '02/01/2024', '03/01/2024', '04/01/2024', '05/01/2024', '06/01/2024', '07/01/2024',
          '08/01/2024', '09/01/2024', '10/01/2024', '11/01/2024'
        ],
        legend: {
          show: false,
        },
        colors: [
              "#0d6efd",
              "#ff9920",
              "#00baff",
            ],
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          title: {
            text: '',
          },
          min: 0
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + "";
              }
              return y;
        
            }
          }
        }
        };

        var chart = new ApexCharts(document.querySelector("#chart-Overall"), options);
        chart.render();


var o = c3.generate({
        bindto: "#donut-chart",
        color: { pattern: ["#0052cc", "#ff9920", "#00baff", "#3db76b" ] },
         size: {
            height: 295,
          },
          options:  {
          plugins: {
            datalabels: {
              display: false,
            },
          },
        },
        data: {
            columns: [
                ['Call', 200],
                ['Email', 50],
                ['Website', 100],
                ['Partner', 50]
            ],
            type: "donut",
            onclick: function(o, n) { console.log("onclick", o, n) },
            onmouseover: function(o, n) { console.log("onmouseover", o, n) },
            onmouseout: function(o, n) { console.log("onmouseout", o, n) }
        },
        donut: { title: "Share Holder", width: 20, }
    });
    setTimeout(function() {
            o.load({
                columns: [
                    ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
          ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
          ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2]
                ]
            })
        }, 1500),
        setTimeout(function() { o.unload({ ids: "data1" }), o.unload({ ids: "data2" }), o.unload({ ids: "data3" })}, 2500)



     Morris.Donut({
        element: 'donut-charts',
        data: [{
            label: "Prospecting",
            value: 45,

        }, {
            label: "Negotiation",
            value: 35
        }, {
            label: "Proposal",
            value: 22
        }, {
            label: "Qualification",
            value: 15
        }],
        resize: true,
        colors:["#0052cc", "#ff9920", "#00baff", "#3db76b"]
    });



     var options = {
          series: [{
          name: 'Prospecting',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
          name: 'Qualification',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
          name: 'Negotiation',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
          chart: {
          type: 'bar',
          height: 368
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
            endingShape: 'rounded',
            borderRadius: 8,
          },
        },
        colors:["#0052cc","#00baff", "#ff9920"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 5,
          colors: ['transparent']
        },
        grid: {
          strokeDashArray: 10,
        },
        xaxis: {
          categories: ['Jan' ,'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',],
        },
        yaxis: {
          title: {
            text: ''
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          }
        }
        };

        var chart = new ApexCharts(document.querySelector("#sales_funnel"), options);
        chart.render();
      



  
  
  var options = {
          series: [{
          name: 'Section 001',
          data: [44, 55, 41, 67, 22, 43]
        },  {
          name: 'Section 006',
          data: [21, 7, 25, 13, 22, 8]
        }],
          chart: {
          type: 'bar',
          height: 285,
          stacked: false,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'top',
              offsetX: 0,
              offsetY: 0
            }
          }
        }],
        stroke: {
          show: true,
          width: 3,
          colors: ['transparent']
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 5,
            columnWidth: '30%',
            dataLabels: {
              total: {
                enabled: false,
                style: {
                  fontSize: '0px',
                  fontWeight: 900
                }
              }
            }
          },
        },
        grid: {
          show: true,
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: 'category',
          categories: ["Mon","Tue","Wed","Thu","Fri","Sat",
          ],
        },
        yaxis: {
          labels: {
            show: true,
          },
        },
        legend: {
          show: false,
          position: 'right',
          offsetY: 40
        },
        colors: [
              "#0d6efd",
              "#16C7F9",
            ],
        fill: {
          opacity: 1
        }
        };

        var chart = new ApexCharts(document.querySelector("#barchart"), options);
        chart.render();




        var options = {
          series: [67],
          chart: {
          height: 300,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '55%',
              image: '../../../images/icon-1.png',
              imageWidth: 80,
              imageHeight: 80,
              imageClipped: false
            },
            dataLabels: {
              name: {
                show: false,
                color: '#fff'
              },
              value: {
                show: false,
                color: '#333',
                offsetY: 0,
                fontSize: '22px'
              }
            }
          }
        },
        colors: ['#0052cc'],
        fill: {
          type: 'color',

          
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['Volatility'],
        };

        var chart = new ApexCharts(document.querySelector("#radialbarchart"), options);
        chart.render();



      var options = {
      chart: {
        height: 280,
        width: "100%",
        type: "area",
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: "Series 1",
          data: [10,5,25,20,35,25,40]
        }
      ],
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          show: false
        },
      },
      fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.2,
            stops: [0, 100]
          }
        },
      markers: {
        size: 0,
        discrete: [{
          seriesIndex: 0,
          // For dataPointIndex: 0 there is no discrete marker at all!
          dataPointIndex: 1,
          
          // Also docs says its "fill" and "stroke", but "fillColor" and "strokeColor" are working
          fillColor: "#b5b5c3",
          strokeColor: "#FFF",
          size: 8
        },{
          seriesIndex: 0,
          // For dataPointIndex: 0 there is no discrete marker at all!
          dataPointIndex: 4,
          
          // Also docs says its "fill" and "stroke", but "fillColor" and "strokeColor" are working
          fillColor: "#0052cc ",
          strokeColor: "#FFF",
          size: 8
        },
        ]
      }
    };

    var chart = new ApexCharts(document.querySelector("#expenses-spark"), options);

    chart.render();


      
       var options = {
        series: [
          {
            name: 'Yearly Profit',
            data: [
              {
                x: '67',
                y: 67
              },
              {
                x: '73',
                y: 73
              },
              {
                x: '53',
                y: 53
              },
              {
                x: '47',
                y: 47
              },
              {
                x: '39',
                y: 39
              },
              {
                x: '27',
                y: 27
              },
            ]
          }
        ],
        chart: {
          height: 291,
          type: 'bar',
          toolbar: {
            show: false,
          },
        },
        grid: {
        show: false,
          },
          dataLabels: {
            enabled: false,
          },
          yaxis: {
            labels: {
              show: false
            },
          },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
            borderRadius: 8,
          }
        },
        colors: [
          function({ value, seriesIndex, w }) {
            if (value < 70) {
              return '#b5b5c3'
            } else {
              return '#0052cc'
            }
          }
        ]
      }

      var chart = new ApexCharts(document.querySelector('#chart-2'), options)
      chart.render()
      
    















  var spark1 = {
    chart: {
    id: 'spark1',
    group: 'sparks',
    type: 'area',
    height: 200,
    sparkline: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 5,
      left: 1,
      blur: 5,
      opacity: 0.1,
    }
    },
    series: [{
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    }],
    stroke: {
    curve: 'smooth'
    },
    markers: {
    size: 0
    },
    grid: {
    padding: {
      top: 50,
      bottom: 0,
      right: 0,
      left: 0
    }
    },
    colors: ['#ff9920'],
    tooltip: {
     theme: 'dark',
    x: {
      show: false
    },
    y: {
      title: {
      formatter: function formatter(val) {
        return '';
      }
      }
    }
    }
  }
  new ApexCharts(document.querySelector("#spark2"), spark1).render();


  var spark1 = {
    chart: {
    id: 'spark1',
    group: 'sparks',
    type: 'area',
    height: 200,
    sparkline: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 5,
      left: 1,
      blur: 5,
      opacity: 0.1,
    }
    },
    series: [{
    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    }],
    stroke: {
    curve: 'smooth'
    },
    markers: {
    size: 0
    },
    grid: {
    padding: {
      top: 50,
      bottom: 0,
      right: 0,
      left: 0
    }
    },
    colors: ['#9c27b0'],
    tooltip: {
     theme: 'dark',
    x: {
      show: false
    },
    y: {
      title: {
      formatter: function formatter(val) {
        return '';
      }
      }
    }
    }
  }
  new ApexCharts(document.querySelector("#spark3"), spark1).render();


  var spark1 = {
    chart: {
    id: 'spark1',
    group: 'sparks',
    type: 'area',
    height: 200,
    sparkline: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 5,
      left: 1,
      blur: 5,
      opacity: 0.1,
    }
    },
    series: [{
    data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
    }],
    stroke: {
    curve: 'smooth'
    },
    markers: {
    size: 0
    },
    grid: {
    padding: {
      top: 50,
      bottom: 0,
      right: 0,
      left: 0
    }
    },
    colors: ['#04a08b'],
    tooltip: {
     theme: 'dark',
    x: {
      show: false
    },
    y: {
      title: {
      formatter: function formatter(val) {
        return '';
      }
      }
    }
    }
  }
  new ApexCharts(document.querySelector("#spark4"), spark1).render();



    var chart = new ApexCharts(
    document.querySelector("#apexcharts-mixed"), {
      chart: {
        height: 412,
        type: "line",
        stacked: false,
         toolbar: {
        show: false,},
      },
      stroke: {
        width: [2, 3, 5],
        curve: "smooth",
        dashArray: [5, 5, 5]
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }
      },
      colors: ["#ff8f00", "#ee1044", "#389f99"],
      series: [{
        name: "In Stock",
        type: "area",
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
      }, {
        name: "Online",
        type: "area",
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
      }, {
        name: "Total Visits",
        type: "area",
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
      }],
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
      fill: {
        opacity: [0.25, 0.25, 0.25],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: ["01/01/2023", "02/01/2023", "03/01/2023", "04/01/2023", "05/01/2023", "06/01/2023", "07/01/2023", "08/01/2023", "09/01/2023", "10/01/2023",
        "11/01/2023"
      ],
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        title: {
          text: "",
        },
        min: 0
      },
      
      tooltip: {
        shared: false,
        intersect: false,
        enabled: false,
        y: {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + "";
            }
            return y;
          }
        }
      }
    }
  );
  chart.render();

  
   
  
    var a = c3.generate({
        bindto: "#area-chart",
        size: { height: 350 },
        point: { r: 4 },
        color: { pattern: ["#3e8ef7", "#ff4c52"] },
        data: {
            columns: [
                ['data1', 300, 350, 300, 0, 0, 0],
              ['data2', 130, 100, 140, 200, 150, 50]

            ],
            types: { data1: "area", data2: "area-spline" }
        },
        grid: { y: { show: !0 } }
    });
  
  

  var options3 = {
          series: [43, 32, 12, 9],
          chart: {
          type: 'pie',
          width: 120,
          height: 120,
          sparkline: {
            enabled: true
          }
        },
    colors:['#4d7cff','#51ce8a','#733aeb','#f2426d'],
        stroke: {
          width: 1
        },
        tooltip: {
          fixed: {
            enabled: false
          },
        }
        };

        var chart3 = new ApexCharts(document.querySelector("#deals-chart"), options3);
        chart3.render();

var options5 = {
          series: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
          chart: {
          type: 'bar',
          width: 100,
          height: 70,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          RubyXhairs: {
            width: 1
          },
        },
    colors:['#ffffff'],
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
        };

        var chart5 = new ApexCharts(document.querySelector("#campaign-sent-chart-4"), options5);
        chart5.render();

  
  
  var n = c3.generate({
        bindto: "#spline-chart",
        size: { height: 340 },
        color: { pattern: ["#26C6DA", "#1e88e5"] },
        data: {
            columns: [
                ['data1', 0, 2, 3.5, 0, 13, 1, 4, 1],
              ['data2', 0, 4, 0, 4, 0, 4, 0, 4]
            ],
            type: "spline"
        },
        grid: { y: { show: !0 } }
    });
  
  

    // Callback that creates and populates a data table, instantiates the line region chart, passes in the data and draws it.
    var lineRegionChart = c3.generate({
        bindto: '#line-region',
        size: { height: 350 },
        point: {
            r: 4
        },
        color: {
            pattern: ['#0bb2d4', '#3e8ef7']
        },

        // Create the data table.
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
              ['data2', 50, 20, 10, 40, 15, 25]
            ],
            regions: {
                'data1': [{ 'start': 1, 'end': 2, 'style': 'dashed' }, { 'start': 3 }], // currently 'dashed' style only
                'data2': [{ 'end': 3 }]
            }
        },
        grid: {
            y: {
                show: true
            }
        }
    });
  
  
  
  
  
  
  var o = c3.generate({
        bindto: "#simple-xy",
        size: { height: 350 },
        point: { r: 4 },
        color: { pattern: ["#0bb2d4", "#17b3a3"] },
        data: {
            x: "x",
            columns: [
                ['x', 30, 50, 100, 230, 300, 310],
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 130, 300, 200, 300, 250, 450]
            ]
        },
        grid: { y: { show: !0 } }
    });
    setTimeout(function() {
        o.load({
            columns: [
                ['data1', 100, 250, 150, 200, 100, 350]
            ]
        })
    }, 1e3), setTimeout(function() {
        o.load({
            columns: [
                ['data3', 80, 150, 100, 180, 80, 150]
            ]
        })
    }, 1500), setTimeout(function() { o.unload({ ids: "data2" }) }, 2e3)

  });


var options5 = {
          series: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
          chart: {
          type: 'bar',
          width: 70,
          height: 50,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          RubyXhairs: {
            width: 1
          },
        },
    colors:['#ffffff'],
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
        };

        var chart5 = new ApexCharts(document.querySelector("#campaign-sent-chart"), options5);
        chart5.render();


var options5 = {
          series: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
          chart: {
          type: 'bar',
          width: 70,
          height: 50,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          RubyXhairs: {
            width: 1
          },
        },
    colors:['#ffffff'],
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
        };

        var chart5 = new ApexCharts(document.querySelector("#campaign-sent-chart-2"), options5);
        chart5.render();



        var options5 = {
          series: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
          chart: {
          type: 'bar',
          width: 70,
          height: 50,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          RubyXhairs: {
            width: 1
          },
        },
    colors:['#ffffff'],
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
        };

        var chart5 = new ApexCharts(document.querySelector("#campaign-sent-chart-3"), options5);
        chart5.render();




      

        var options = {
          series: [{
          name: 'Net Profit',
          data: [5, 4, 3, 7, 5, 10, 3]
        }, {
          name: 'Revenue',
          data: [3, 2, 9, 5, 4, 6, 4]
        }],
          chart: {
          type: 'bar',
          height: 230
        },
        legend: {
          show: false,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          }
        }
        };

        var chart = new ApexCharts(document.querySelector("#basic-bar"), options);
        chart.render();



// slimScroll-------------------------------------------------
window.onload = function() {
  // Cache DOM Element
  var scrollable = $('.scrollable');
  
  // Keeping the Scrollable state separate
  var state = {
    pos: {
      lowest: 0,
      current: 0
    },
    offset: {
      top: [0, 0], //Old Offset, New Offset
    }
  }
  //
  scrollable.slimScroll({
    height: '300px',
    width: '',
    start: 'top'
  });
  //
  scrollable.slimScroll().bind('slimscrolling', function (e, pos) {
    // Update the Scroll Position and Offset
    
    // Highest Position
    state.pos.highest = pos !== state.pos.highest ?
      pos > state.pos.highest ? pos : state.pos.highest
    : state.pos.highest;
    
    // Update Offset State
    state.offset.top.push(pos - state.pos.lowest);
    state.offset.top.shift();
    
    if (state.offset.top[0] < state.offset.top[1]) {
      console.log('...Scrolling Down')
      // ... YOUR CODE ...
    } else if (state.offset.top[1] < state.offset.top[0]) {
      console.log('Scrolling Up...')
      // ... YOUR CODE ...
    } else {
      console.log('Not Scrolling')
      // ... YOUR CODE ...
    }
  });
};

window.onload = function() {
  // Cache DOM Element
  var scrollable = $('.scrollable');
  
  // Keeping the Scrollable state separate
  var state = {
    pos: {
      lowest: 0,
      current: 0
    },
    offset: {
      top: [0, 0], //Old Offset, New Offset
    }
  }
  //
  scrollable.slimScroll({
    height: '300px',
    width: '',
    start: 'top'
  });
  //
  scrollable.slimScroll().bind('slimscrolling', function (e, pos) {
    // Update the Scroll Position and Offset
    
    // Highest Position
    state.pos.highest = pos !== state.pos.highest ?
      pos > state.pos.highest ? pos : state.pos.highest
    : state.pos.highest;
    
    // Update Offset State
    state.offset.top.push(pos - state.pos.lowest);
    state.offset.top.shift();
    
    if (state.offset.top[0] < state.offset.top[1]) {
      console.log('...Scrolling Down')
      // ... YOUR CODE ...
    } else if (state.offset.top[1] < state.offset.top[0]) {
      console.log('Scrolling Up...')
      // ... YOUR CODE ...
    } else {
      console.log('Not Scrolling')
      // ... YOUR CODE ...
    }
  });
};

// slimScroll------------------------------------------------- End

