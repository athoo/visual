$(document).ready(main());
var str;

function read_csv(path, file){
  var path_to_file = path+"/"+file;

  d3.csv( path_to_file ,function(error,csvdata){

    if(error){
      console.log(error);
    }else{
      str = d3.csv.format(csvdata);
      // for (var i=0; i<csvdata.length; i++){
      //   var state = csvdata[i].State;
      //   var population = csvdata[i].Population;
      //   var gdp = csvdata[i].GDP;
      //   console.log(state+" "+population+" "+gdp);
      // }
    }

  });
}



function main(){
  read_csv("data", "table.csv");

}
