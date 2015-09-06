var data_endpoint = "https://cvisual-data.herokuapp.com/api/v1/data/"
// // pie chart, d is a object
// function draw_pie(data_url){
//   d3.json(data_url, function(d){
//     pie(d);
//   });
// }

//
// //read data from path
// function parse_data(file_url){
//   var jsonData;
//   $.ajax({
//     dataType: "json",
//     url: file_url,
//     async: false,
//     success: function(data){jsonData = data;}
//   });
//   return jsonData;
// }
$(document).ready(function(){
  main();
});

function main(){
  toggle_menu();
  draw_bar_chart(Obj);
  // draw_mono_pie();
}

var toggle_menu = function(){
  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });
};

var Obj = {
  'title': 'World\'s largest cities per 2014',
  'subtitle': 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>',
  'ytext': 'Population (millions)',
  'tooltip': 'Population in 2008: <b>{point.y:.1f} millions</b>',
  'name': 'Population',
  'data':  [
      ['Shanghai', 23.7],
      ['Lagos', 16.1],
      ['Instanbul', 14.2],
      ['Karachi', 14.0],
      ['Mumbai', 12.5],
      ['Moscow', 12.1],
      ['São Paulo', 11.8],
      ['Beijing', 11.7],
      ['Guangzhou', 11.1],
      ['Delhi', 11.1],
      ['Shenzhen', 10.5],
      ['Seoul', 10.4],
      ['Jakarta', 10.0],
      ['Kinshasa', 9.3],
      ['Tianjin', 9.3],
      ['Tokyo', 9.0],
      ['Cairo', 8.9],
      ['Dhaka', 8.9],
      ['Mexico City', 8.9],
      ['Lima', 8.9]
    ]
}


var draw_bar_chart = function (Obj) {


    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: Obj.title
        },
        subtitle: {
            text: Obj.subtitle
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: Obj.ytext
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: Obj.tooltip
        },
        series: [{
            name: Obj.name,
            data: Obj.data,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}




var draw_mono_pie = function(){

  var data_url = data_endpoint + "data";

  $.get(data_url, function(data){
    var Obj = $.parseJSON(data);
    mono_pie_paintbrush(Obj);
  })

};

var mono_pie_paintbrush = function (Obj) {

    // Make monochrome colors and set them as default for all pies
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [],
            base = Highcharts.getOptions().colors[0],
            i;

        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());

    // Build the chart
    $('#container').highcharts({
        credits: {
          enabled:false
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: Obj.title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: Obj.name,
            data: Obj.data
        }]
    });

};
