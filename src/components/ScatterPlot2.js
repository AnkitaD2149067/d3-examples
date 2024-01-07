import React, { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';

const Scatterplot2 = () => {
  const [data] = useState([
    [90, 20], [20, 100], [66, 44], [53, 55], [80, 10], [10, 60], [78, 120], [40, 149], [25, 30], [50, 190], [26, 170], [5, 19], [25, 30], [35, 85]
  ])
  const svgRef = useRef();

  useEffect(() => {
    //settign up svg
    const w = 500;
    const h = 300;
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('margin-left', '60px')
      .style('background', 'lightblue')
      .style('overflow', 'visible');

    //setting up scales
    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, w]);

    const yScale = d3.scaleLinear()
      .domain([0, 200])
      .range([h, 0]);

    //setting up axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)

    const yAxis = d3.axisLeft(yScale)
      .ticks(data.length)

    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0,${h})`);

    svg.append('g')
      .call(yAxis);

    //setting up axes labels
    svg.append('text')
      .attr('x', w / 3)
      .attr('y', h + 40)
      .text('Population  -->');

    svg.append('text')
      .attr('y', h / 2)
      .attr('x', -65)
      .text('Year');

    //setting up data for svg
    svg.selectAll()
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', 4)
      .style('fill', 'purple')

  }, [data])

  return (
    <div className="container" >
      <h3>Scatterplot -- Example 2</h3>
      <div id="svgWrapper">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  )
}

export default Scatterplot2;
