//vanilla script demo with es6
const dummy = 0;
document.querySelector('#solutionA').innerHTML = '<p>Total: ' + dummy + '</p>'; 
document.querySelector('#solutionB').innerHTML = '<p>Amount split between ' + dummy + ' party members: ' + dummy + '</p>'; 

function TipCalc(){
    //varibales
    let myParty = document.getElementById('party').value;
    let myTotal =document.getElementById('total').value;
    let myTax = document.getElementById('tax').value;
    let myPercent = document.getElementById('tip').value;
    //convert to floats
    let party = parseFloat(myParty);
    let total = parseFloat(myTotal);
    let tax = parseFloat(myTax);
    let percent = parseFloat(myPercent); 
    
        if((party === 0) || (total === 0) || (tax === 0) || (percent === 0)){
            alert("please enter a number greater than zero");
            return false;
        }
        else{
        let answer = total + .01*tax*total + .01*percent*total;
        console.log(answer);

        document.getElementById("solutionA").innerHTML = '<p>Total: ' + answer + '</p>'; 
        document.getElementById("solutionB").innerHTML = '<p>Amount split between ' + party + ' party members: ' + answer / party + '</p>'; 
        }
        return false;
        }; 
