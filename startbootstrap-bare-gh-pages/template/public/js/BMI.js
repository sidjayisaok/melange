//BMI calculator using ES6 and vanilla script
document.addEventListener("DOMContentLoaded", function(){

 //our variables
let myBMI;

//display dummy bullet graph
    nv.addGraph(function(){  
    var chart = nv.models.bulletChart();

    d3.select('#bulletChart svg')
        //dummy data
        .datum({
          "title":"BMI",
          "ranges":[1,25,50],
          "measures": [22],
          "markers": [22]  
        })
        .transition().duration(2000)
        .call(chart);

    return chart;
    });

//adds data to our bullet chart
const bmiData = (myBMI)=> {
    let x = myBMI;
  return {
  	"title":"BMI",
  	"ranges":[1,25,50],
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

//basic conditional logic
if(myHeight <= 0 || myWeight <= 0){
    alertify.alert("please enter a number larger than zero");
    return false;
}

else if(isNaN(myHeight) || isNaN(myWeight)){
    alertify.alert("Please use numbers only");
    return false;
}

else if(myUnit === "Metric"){
    myBMI = (myWeight/(Math.pow(myHeight, 2)))*10000;
    bulletGraph(myBMI);
    logicBMI(myBMI);
    return false;
}
else if(myUnit === "Imperial"){
    myBMI = (myWeight/(Math.pow(myHeight, 2)))*703;
    bulletGraph(myBMI);
    logicBMI(myBMI);
    return false;
}
}

const logicBMI = (myBMI)=>{
          //if you're underweight
    if(myBMI >= 16 && myBMI < 18.5){
        document.getElementById("solutionA").innerHTML = '<p>Your BMI is estimated to be: ' + myBMI.toFixed(2) + '</p>'; 
        document.getElementById("solutionB").innerHTML = '<p><h6>You are considered to be underweight. For more information, consult the <a href="http://www.nhlbi.nih.gov/health/educational/lose_wt/risk.htm">NIH</a>.</h6></p>';
        return false;
    }
    //if you're overweight
    else if(myBMI > 25 && myBMI <= 30){
        document.getElementById("solutionA").innerHTML = '<p>Your BMI is estimated to be: ' + myBMI.toFixed(2) + '</p>'; 
        document.getElementById("solutionB").innerHTML = '<p><h6>You are considered to be overweight. For more information, consult the <a href="http://www.nhlbi.nih.gov/health/educational/lose_wt/risk.htm">NIH</a>.</h6></p>';
        return false;
    }
    //if you're obese
    else if(myBMI > 30){
        document.getElementById("solutionA").innerHTML = '<p>Your BMI is estimated to be: ' + myBMI.toFixed(2) + '</p>'; 
        document.getElementById("solutionB").innerHTML = '<p><h6>You are considered to be obese. Drastic lifestyle changes are recommended. For more information, consult the <a href="http://www.nhlbi.nih.gov/health/educational/lose_wt/risk.htm">NIH</a>.</h6></p>';
        return false;
    }
    //if you're malnourished
    else if(myBMI < 16){
        document.getElementById("solutionA").innerHTML = '<p>Your BMI is estimated to be: ' + myBMI.toFixed(2) + '</p>'; 
        document.getElementById("solutionB").innerHTML = '<p><h6>You are considered to be malnourished. Drastic lifestyle changes are recommended. For more information, consult the <a href="http://www.nhlbi.nih.gov/health/educational/lose_wt/risk.htm">NIH</a>.</h6></p>';
        return false;
    }
    //if you're normal weight
    else{
        document.getElementById("solutionA").innerHTML = '<p>Your BMI is estimated to be: ' + myBMI.toFixed(2) + '</p>'; 
        document.getElementById("solutionB").innerHTML = '<p><h6>You bodyweight is within normal parameters. For more information, consult the <a href="http://www.nhlbi.nih.gov/health/educational/lose_wt/risk.htm">NIH</a>.</h6></p>';
        return false;
    }
}

//render the bullet graph to the page
const bulletGraph = (myBMI)=>{
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
