//script using ES6 and jQuery
//api provided using http://fixer.io/
//exchange rates set by the European Central Bank

$("#convert").on('click', function(){
    //our basic variables
    let thisCurrency = $('#myCurrency').val();
    let thatCurrency = $('#yourCurrency').val();
    let thisAmount = $('#yourAmount').val();
    //convert to proper format
    let myCurrency = thisCurrency.toUpperCase();
    let yourCurrency = thatCurrency.toUpperCase();
    let yourAmount = parseFloat(thisAmount);

    //API link
    let queryURL = "https://api.fixer.io/latest?base=" + myCurrency + "&rates=" + yourCurrency;
    // let historyURL = "http://api.fixer.io/" + myDate;
    //logic controllers
    if(yourAmount <= 0){
        alertify.alert("Please select an amount greater than zero");
        return;
    }
    else if(isNaN(yourAmount)){
        alertify.alert("Please use numbers for the amount field only");
        return;
    }
    //API call
    $.ajax({
        method: 'GET',
        url: queryURL,
        datatype: 'json'
    }).done(function(res){
        $(".currentDate").html(" Rates current as of " + res.date);
        $(".myConversion").html(" You have selected " + res.base);
        $(".myRatio").html(" The current ratio is 1 " + res.base + " to " + res.rates[yourCurrency] + " " + yourCurrency);
        $(".yourConversion").html(" Converting " + yourAmount + " " + myCurrency + " is worth approximately " + (res.rates[yourCurrency]*yourAmount).toFixed(2) + " " + yourCurrency);
    })
    return false;
});

//our barchart variables
let svg = d3.select("svg"),
margin = {top: 20, right: 20, bottom: 30, left: 40},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;

let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

let g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//data using csv file
d3.csv("/misc/data.csv", (d)=> {
  d.frequency = +d.frequency;
  return d;
}, function(error, data) {
  if (error) throw error;
//declare our x and y axes
  x.domain(data.map((d)=> { return d.letter; }));
  y.domain([0, d3.max(data, (d)=> { return d.frequency; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");
//render the bar graph
  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", (d)=> { return x(d.letter); })
    .attr("y", (d)=> { return y(d.frequency); })
    .attr("width", x.bandwidth())
    .attr("fill", "green")
    .attr("height", (d)=> { return height - y(d.frequency); });
});


