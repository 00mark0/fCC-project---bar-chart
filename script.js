// Load the data
d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then((data) => {
  const dataset = data.data;

  // Create SVG container
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", 800)
    .attr("height", 600);

  // Define scales
  const xScale = d3
    .scaleTime()
    .domain([
      d3.min(dataset, (d) => new Date(d[0])),
      d3.max(dataset, (d) => new Date(d[0])),
    ])
    .range([0, 800]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([600, 0]);

  // Generate axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0, 600)")
    .call(xAxis);

  svg.append("g").attr("id", "y-axis").call(yAxis);

  // Create bars
  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("x", (d) => xScale(new Date(d[0])))
    .attr("y", (d) => yScale(d[1]))
    .attr("width", 1)
    .attr("height", (d) => 600 - yScale(d[1]));

  // Create tooltip
  const tooltip = d3.select("body").append("div").attr("id", "tooltip");

  svg
    .selectAll(".bar")
    .on("mouseover", (event, d) => {
      tooltip
        .attr("data-date", d[0])
        .html(`Date: ${d[0]}<br>GDP: ${d[1]}`)
        .style("left", event.pageX + "px")
        .style("top", event.pageY + "px")
        .style("visibility", "visible");
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    });
});
