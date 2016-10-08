//script using ES6 and jQuery
$().on('submit', function(){
    let myCurrency = $().val();
    let yourCurrency = $().val();
    let queryURL = "https://api.fixer.io/latest?base=" + myCurrency + "&rates=" + yourCurrency;

    //API call
    $.ajax({
        method: GET,
        url: queryURL
    }).done(function(res){
        console.log(res);
    })
    return false;
});


function getGraph(){
    //bar graph via d3
let svg = d3.select("#barChart"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

let g = svg.append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//our data field
d3.csv("/misc/data.csv", function(d) {
        return{
        Currency: d.Currency,
        Share: +d.Share
        }
}, function(error, data) {
  if (error) throw error;

  console.log(data);

  x.domain(data.map(function(d) { return d.Currency; }));
  y.domain([0, d3.max(data, function(d) { return d.Share; })]);

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
      .text("currency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Currency); })
      .attr("y", function(d) { return y(d.Share); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.Share); });
});
}

console.log(getGraph());

