//BMI calculator using ES6 and vanilla script

 //our variables

document.addEventListener("DOMContentLoaded", function(){
 
    document.getElementById('estimate').onclick = function(){
        let myHeight = document.getElementById('height').value;
        let myWeight = document.getElementById('weight').value;
        let dropdown = document.getElementById('dropdown');
        let myUnit = dropdown.options[dropdown.selectedIndex].text;
        let myBMI;
        
        console.log(myUnit);
        console.log(myWeight);
        console.log(myHeight);

        return false;

            switch(myUnit){
             //Metric formula conversion
             case "Metric":

             console.log(myUnit);
             console.log(myWeight);
             console.log(myHeight);

             myBMI = (myWeight/(Math.pow(myHeight, 2)))*10000;
             {
                if(myBMI >= 18.5 && BMI <= 25){
                    alert("Your BMI is " + Math.round(BMI) + ", You're pretty healthy");
                }
                else if(myBMI < 18.5){
                    alert("Your BMI is " + Math.round(BMI) + ", Your BMI is under by " + (18.5 - Math.round(BMI)));
                }
                else if(myBMI > 25){
                    alert("Your BMI is " + Math.round(BMI) + ", Your BMI is over by " + (Math.round(BMI) - 25));
                }
	        }
            break;

            //Imperial conversion
            case "Imperial":

             console.log(myUnit);
             console.log(myWeight);
             console.log(myHeight);

             myBMI = (myWeight/(Math.pow(myHeight, 2)))*703;
             {
                if(myBMI >= 18.5 && BMI <= 25){
                    alert("Your BMI is " + Math.round(BMI) + ", You're pretty healthy");
                }
                else if(myBMI < 18.5){
                    alert("Your BMI is " + Math.round(BMI) + ", Your BMI is under by " + (18.5 - Math.round(BMI)));
                }
                else if(myBMI > 25){
                    alert("Your BMI is " + Math.round(BMI) + ", Your BMI is over by " + (Math.round(BMI) - 25));
                }
	        }
            break;

            //error handler
            default:
		    alert("Please type metric or imperial to continue.");
         }   
    }
  
});


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

