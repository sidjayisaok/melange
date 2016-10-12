//BMI calculator using ES6 and OOP
class BMI{
    constructor(unit, height, weight){
        this._unit = unit;
        this._height = height;
        this._weight = weight;
        }

        estBMI(BMI){
            return `${this._unit} | ${this._height} | ${this._weight}`;
            if(`${this._unit}` === 'metric'){
                this.BMI = (`${this._weight}`/(Math.pow(`${this._height}`, 2)))*10000;
                if(this.BMI > 25){
                    return Math.round(this.BMI);
                }
                else if(this.BMI < 18.5){
                    return Math.round(this.BMI);
                }
                else{
                    return Math.round(this.BMI);
                }
            }
            else{
                this.BMI = (`${this._weight}`/(Math.pow(`${this._height}`, 2)))*703;
                if(this.BMI > 25){
                    return Math.round(this.BMI);
                }
                else if(this.BMI < 18.5){
                    return Math.round(this.BMI);
                }
                else{
                    return Math.round(this.BMI);
                }
            }
        }

        testPrint(){
            console.log(this.estBMI());
        }  
}

// let myUnit = document.getElementById('dropdown').value;
// let myHeight = document.getElementById('height').value;
// let myWeight = document.getElementById('weight').value;

// const ourInfo = new BMI(myUnit, myHeight, myWeight);

const ourInfo = new BMI("imperial", 60, 150);

ourInfo.testPrint();


//d3 bullet graph library working in conjunction with nv.d3.js
nv.addGraph(function() {  
  var chart = nv.models.bulletChart();

  d3.select('#bulletChart svg')
      .datum(bmiData())
      .transition().duration(2000)
      .call(chart);

  return chart;
});


function bmiData() {
  return {
  	"title":"BMI",
  	"ranges":[1,22,50],
  	"measures":[22],
  	"markers":[22]
  };
}

