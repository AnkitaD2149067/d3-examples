// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';

// const LineChart = () => {
//   const data = useState([30, 50, 47, 12, 98, 89, 100, 180, 66, 82, 28]);
//   const svgRef = useRef();

//   useEffect(() => {
//     drawChart(svgRef.current);
//   }, [data])
//   const drawChart = () => {
//     // creating svg
//     const svg = d3.select(svgRef.current)
//       .append('svg')
//       .attr('width', '100%')
//       .attr('height', 500)
//       .style('overflow', 'visible')
//       .style('background', 'lightgrey');

//     //creating scales
//     const xScale = d3.scaleBand()
//       .domain(data.map((val, i) => i))
//       .range([0, w])
//       .padding(0.5);
//     const yScale = d3.scaleLinear()
//       .domain([0, h])
//       .range([h, 0]);

//     //creating axes
//     const xAxis = d3.axisBottom(xScale)
//     ticks(data.length);
//     const yAxis = d3.axisLeft(yScale)
//     ticks(5);

//     svg.append('g')
//       .call(xAxis)
//       .attr('transform', `translate(0, ${h})`)
//     svg.append('g')
//       .call(yAxis);

//     svg.selectAll('.bar')
//     .data(data)
//   }

//   return (
//     <div>
//       <h2>Line Chart</h2>
//       <div className='pie-container' ref={svgRef}></div>
//     </div>
//   )
// }

// export default LineChart;


import React, { useEffect, useRef, useState } from "react";
import *  as d3 from 'd3';
 
const LineChart = () => {
  const [data] = useState([50, 25, 200, 10, 85, 20, 15, 167, 34, 45, 80, 36, 199]);
  const svgRef = useRef();
 
  useEffect(() => {
    //setting up svg
    const w = 400;
    const h = 200;
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', 'lightgrey')
      .style('padding', '30px')
      .style('overflow', 'visible');
 
    //setting up scales
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
 
    const yScale = d3.scaleLinear()
      .domain([0, h])
      .range([h, 0]);  //since yaxis should be inverted
 
    const generateScaledLine = d3.line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal); //makes the line curve instead of making the ends pointy
 
    //setting up Axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(i => i + 1)
 
    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
 
    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0,${h})`);
 
    svg.append('g')
      .call(yAxis);
 
    // setting up data
    svg.selectAll('.line')
      .data([data])
      .join('path')
      .attr('d', d => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'black');
  }, [data]);
 
  return (
    <div className="container" >
      <h3>Line Chart</h3>
      <div id="svgWrapper">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  )
}
export default LineChart;