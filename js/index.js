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
  draw_mono_pie();
}




var toggle_menu = function(){
  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });
};


var draw_mono_pie = function(){
  var Obj = {
    title: "This is a pie chart to visualization",
    name: "play with browser",
    data:[
        {name: "Microsoft Internet Explorer", y: 56.33},
        {name: "Chrome", y: 24.03},
        {name: "Firefox", y: 10.38},
        {name: "Safari", y: 4.77},
        {name: "Opera", y: 0.91},
        {name: "Proprietary or Undetectable", y: 0.2}
    ]
  };
  mono_pie_paintbrush(Obj);
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
