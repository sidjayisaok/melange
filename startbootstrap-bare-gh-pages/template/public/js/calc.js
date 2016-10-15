//vanilla script demo with es6
const dummy = 0;
document.querySelector('#solutionA').innerHTML = 'Grand total: $' + dummy; 
document.querySelector('#solutionB').innerHTML = 'Amount split between ' + dummy + ' party members: $' + dummy;
document.querySelector('#solutionC').innerHTML = '<svg width="300" height="300" ><circle cx="150" cy="150" r="150" class="myTarget"/></svg>';
document.querySelector('#solutionD').innerHTML = 'Total tip is : $' + dummy;
document.querySelector('#solutionE').innerHTML = 'Taxes paid is : $' + dummy;

//our d3 pie chart
const pieGraph = (total, percent, tax, answer, tip, taxTotal)=>{
    //remove duplicates
    d3.select("svg").remove();
    //set up pie graph
    let w = 300,                        
        h = 300,
        r = 150

        color = d3.scale.category20c();
        //my data fields    
        data = [
                {"label":"pre-total", "value": (total/answer)},
                {"label":"tip", "value": (tip/answer)},
                {"label":"tax", "value": (taxTotal/answer)}
               ];

    //target the page with data
    let vis = d3.select("#solutionC")
                .append("svg:svg")             
                .data([data])
                .attr("width", w)           
                .attr("height", h)
                .attr("class", "myTarget")
                .append("svg:g")           
                .attr("transform", "translate(" + r + "," + r + ")")
                 
    let arc = d3.svg.arc()              
                .outerRadius(r);
    let pie = d3.layout.pie()           
                .value((d)=> { return d.value; }); 
    let arcs = vis.selectAll("g.slice")     
                  .data(pie)
                  .enter()                            
                  .append("svg:g")                
                  .attr("class", "slice"); 
        
        arcs.append("svg:path")
            .attr("fill", (d, i)=> { return color(i); } ) 
            .attr("d", arc);                                    
        
        arcs.append("svg:text")                                     
            .attr("transform", (d)=> {                   
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .style("fill", "#335533")
            .text((d, i)=> {return data[i].label + ": " + data[i].value.toFixed(2)*100;});
}        

//our calculator function
const TipCalc = ()=>{
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
        //basic logic for calculator
        if((party === 0) || (total === 0) || (tax === 0) || (percent === 0)){
            alertify.alert("please enter a number greater than zero");
            return false;
        }
        else if((isNaN(party)) || (isNaN(total)) || (isNaN(tax)) || (isNaN(percent))){
            alertify.alert("You must enter numbers only");
            return false;
        }
        else{
        let answer = total + .01*tax*total + .01*percent*(total + .01*tax*total);
        let tip = (answer - total - (.01*tax*total));
        let taxTotal = .01*tax*total;
        //render elements to the page
        document.getElementById("solutionA").innerHTML = 'Grand total: $' + answer.toFixed(2); 
        document.getElementById("solutionB").innerHTML = 'Amount split between ' + party + ' party members: $' + (answer / party).toFixed(2);
        document.getElementById("solutionD").innerHTML = 'Total tip is : $' + tip.toFixed(2);
        document.getElementById("solutionE").innerHTML = 'Taxes paid is : $' + taxTotal.toFixed(2);
        //recursively call pie graph to render it to the page
        pieGraph(total, percent, tax, answer, tip, taxTotal);
        }
        return false;
        }; 


