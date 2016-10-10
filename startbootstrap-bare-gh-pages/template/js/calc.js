//vanilla script demo with es6
const dummy = 0;
document.querySelector('#solutionA').innerHTML = '<p>Grand total: $' + dummy + '</p>'; 
document.querySelector('#solutionB').innerHTML = '<p>Amount split between ' + dummy + ' party members: $' + dummy + '</p>';
document.querySelector('#solutionC').innerHTML = '<p><svg width="300" height="300" ><circle cx="150" cy="150" r="150" class="myTarget"/></svg></p>';
document.querySelector('#solutionD').innerHTML = '<p>Total tip is : $' + dummy + '</p>';
document.querySelector('#solutionE').innerHTML = '<p>Taxes paid is : $' + dummy + '</p>';

//our d3 pie chart
function pieGraph(total, percent, tax, answer, tip, taxTotal){
    //remove duplicates
    d3.select("svg").remove();
    //set up pie graph
    let w = 300,                        
        h = 300,
        r = 150

        color = d3.scale.category20c();
        //my data fields    
        data = [{"label":"pre-total", "value": (total/answer)},
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
                  .attr("class", "slice")
                  .on("mouseover", function (d) {
                    d3.select("#tooltip")
                        .style("left", d3.event.pageX + "px")
                        .style("top", d3.event.pageY + "px")
                        .style("opacity", 1)
                        .select("#value")
                        .text(d.value);
                  })
                    .on("mouseout", function () {
                    // Hide the tooltip
                    d3.select("#tooltip")
                        .style("opacity", 0);
                    }); 
        
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
            .text((d, i)=> { return data[i].label; });
}        

//our calculator function
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
        //basic logic for calculator
        if((party === 0) || (total === 0) || (tax === 0) || (percent === 0)){
            alert("please enter a number greater than zero");
            return false;
        }
        else if((isNaN(party)) || (isNaN(total)) || (isNaN(tax)) || (isNaN(percent))){
            alert("You must enter numbers only");
            return false;
        }
        else{
        let answer = total + .01*tax*total + .01*percent*(total + .01*tax*total);
        let tip = (answer - total - (.01*tax*total));
        let taxTotal = .01*tax*total;
        //render elements to the page
        document.getElementById("solutionA").innerHTML = '<p>Grand total: $' + answer.toFixed(2) + '</p>'; 
        document.getElementById("solutionB").innerHTML = '<p>Amount split between ' + party + ' party members: $' + (answer / party).toFixed(2) + '</p>';
        document.getElementById("solutionD").innerHTML = '<p>Total tip is : $' + tip.toFixed(2) + '</p>';
        document.getElementById("solutionE").innerHTML = '<p>Taxes paid is : $' + taxTotal.toFixed(2) + '</p>';
        //recursively call pie graph to render it to the page
        pieGraph(total, percent, tax, answer, tip, taxTotal);
        }
        return false;
        }; 


