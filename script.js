d3.csv("https://gist.githubusercontent.com/mbostock/3719724/raw/7a30d1dea47185afca7f6c26cf8ae5e640254a03/states.csv", function(error, states) {
  if (error) throw error;

  var ages = d3.keys(states[0]).filter(function(key) {
    return key != "State" && key != "Total";
  });

  d3.selectAll("thead td").data(ages).on("click", function(k) {
    tr.sort(function(a, b) { return (b[k] / b.Total) - (a[k] / a.Total); });
  });

  var tr = d3.select("tbody").selectAll("tr")
      .data(states)
    .enter().append("tr");

  tr.append("th")
      .text(function(d) { return d.State; });

  tr.selectAll("td")
      .data(function(d) { return ages.map(function(k) { return d[k] / d.Total; }); })
    .enter().append("td").append("svg")
      .attr("width", 71)
      .attr("height", 12)
    .append("rect")
      .attr("height", 12)
      .attr("width", function(d) { return d * 71; });
});