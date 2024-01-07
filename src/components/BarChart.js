import React, { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';

const BarChart = () => {
  const [data] = useState([90, 60, 180, 34, 87, 150, 26, 120, 100, 20])
  const svgRef = useRef(); //so that d3 controls the DOM instead of React

  useEffect(() => {
    //setting up SVG
    const w = 400;
    const h = 200;
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('margin', '20px')
      .style('background', 'bisque')
      .style('overflow', 'visible');

    //setting up scales
    const xScale = d3.scaleBand()
      .domain(data.map((val, i) => i+1))
      .range([0, w])
      .padding(0.5);

    const yScale = d3.scaleLinear()
      .domain([0, h])
      .range([h, 0]); //inverted yaxis

    //setting up axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)

    const yAxis = d3.axisLeft(yScale)
      .ticks(data.length)

    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0,${h})`); //shifting xaxis to bottom

    svg.append('g')
      .call(yAxis);

    svg.selectAll('.bar') //bar tag
      .data(data)
      .join('rect')  //join with rectangle tag
      .attr('x', (v, i) => xScale(i+1)) //index value
      .attr('y', yScale)
      .attr('width', xScale.bandwidth())
      .attr('height', val => h - yScale(val))
      .style('fill', 'grey')
      .style('stroke', 'black')
      .append("title")
      .text((data)=> data );

    // Line graph for corresponding bar graph
    const generateScaledLine = d3.line()
      .x((d, i) => xScale(i+1))
      .y(yScale)
      .curve(d3.curveCardinal);
    svg.selectAll('.line')
      .data([data])
      .join('path')
      .attr('d', d => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .style('padding', '10px');
  }, [data]);

  return (
    <div className="container" >
      <h3>Bar Chart with Line</h3>
      <div id="svgWrapper">
        <svg ref={svgRef}>
          <title className="title">abc</title>
        </svg>
      </div>
    </div>
  )
}

export default BarChart;