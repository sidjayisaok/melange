//BMI calculator using ES6 and OOP
class BMI{
    constructor(country){
        this.country = country;
    }
}

//d3 library working in conjunction with nv.d3.js
nv.addGraph(function() {  
  var chart = nv.models.bulletChart();

  d3.select('#bulletChart svg')
      .datum(bmiData())
      .transition().duration(1000)
      .call(chart);

  return chart;
});


function bmiData() {
  return {
  	"title":"BMI",
  	"ranges":[10,22,50],
  	"measures":[22],
  	"markers":[22]
  };
}

