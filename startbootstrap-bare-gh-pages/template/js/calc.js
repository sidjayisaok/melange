//vanilla script demo with es6
const dummy = 0;
document.querySelector('#solutionA').innerHTML = '<p>Total: ' + dummy + '</p>'; 
document.querySelector('#solutionB').innerHTML = '<p>Amount split between ' + dummy + ' party members: ' + dummy + '</p>';

function pieGraph(total, percent, tax, answer){
    d3.select("svg").remove();
    let w = 300,                        //width
        h = 300,                            //height
        r = 100,                            //radius
        color = d3.scale.category20c();     //builtin range of colors
        data = [{"label":"total", "value": total / answer},
                {"label":"tip", "value": percent / answer},
                {"label":"tax", "value": tax / answer}
               ];

    let vis = d3.select("#solutionC")
                .append("svg:svg")              //create the SVG element inside the <body>
                .data([data])                   //associate our data with the document
                .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
                .attr("height", h)
                .append("svg:g")                //make a group to hold our pie chart
                .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius
    let arc = d3.svg.arc()              //this will create <path> elements for us using arc data
                .outerRadius(r);
    let pie = d3.layout.pie()           //this will create arc data for us given a list of values
                .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array
    let arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
                  .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
                  .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
                  .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                  .attr("class", "slice");    //allow us to style things in the slices (like text)
        
        arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
            .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
        
        arcs.append("svg:text")                                     //add a label to each slice
            .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")                          //center the text on it's origin
            .text(function(d, i) { return data[i].label; });        //get the label from our original data array
}        

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
        else if((party === NaN) || (total === NaN) || (tax === NaN) || (percent === NaN)){
            alert("You must enter numbers only");
            return false;
        }
        else{
        let answer = total + .01*tax*total + .01*percent*total;
        console.log(answer);
        //render elements to the page
        document.getElementById("solutionA").innerHTML = '<p>Total: ' + answer + '</p>'; 
        document.getElementById("solutionB").innerHTML = '<p>Amount split between ' + party + ' party members: ' + answer / party + '</p>';
        pieGraph(total, percent, tax, answer);
        }
        return false;
        }; 


