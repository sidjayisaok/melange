//BMI calculator using ES6 and vanilla script

document.addEventListener("DOMContentLoaded", function(){

 //our variables
let myBMI;

//adds data to our bullet chart
function bmiData(myBMI) {
    let x = Math.round(myBMI);
  return {
  	"title":"BMI",
  	"ranges":[1,22,50],
  	"measures": [x],
  	"markers": [x]
  };
}


//fire the functions based off the variables below
document.getElementById('estimate').onclick = function(){
let myHeight = document.getElementById('height').value;
let myWeight = document.getElementById('weight').value;
let dropdown = document.getElementById('dropdown');
let myUnit = dropdown.options[dropdown.selectedIndex].text;

if(myUnit === "Metric"){
    myBMI = (myWeight/(Math.pow(myHeight, 2)))*10000;
    bulletGraph(myBMI);
    // console.log(bmiData(measures[myBMI]));
    // console.log(bmiData(markers[myBMI]));
    return false;
}
else if(myUnit === "Imperial"){
    myBMI = (myWeight/(Math.pow(myHeight, 2)))*703;
    bulletGraph(myBMI);
    return false;
}

}

//render the bullet graph to the page
function bulletGraph(myBMI){
    //d3 bullet graph library working in conjunction with nv.d3.js
    nv.addGraph(function(){  
    var chart = nv.models.bulletChart();

    d3.select('#bulletChart svg')
        .datum(bmiData(myBMI))
        .transition().duration(2000)
        .call(chart);

    return chart;
    });
}

return false;
});
