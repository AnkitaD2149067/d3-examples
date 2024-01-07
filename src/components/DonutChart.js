import React, { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
 
const DonutChart = () => {
  const [data] = useState([
    { property: 'India', value: 30 },
    { property: 'Korea', value: 25 },
    { property: 'Singapore', value: 20 },
    { property: 'USA', value: 12 },
    { property: 'Australia', value: 13 },
  ])
  const svgRef = useRef();
 
  useEffect(() => {
    const w = 300;
    const h = 20;
    const r = w / 2;
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('margin', '100px')
      .style('padding', '50px')
      .style('overflow', 'visible');
 
    //setting up piechart
    const pieData = d3.pie().value(d => d.value)(data);
 
    //setting up arc
    const arcGenerator = d3.arc()
      .innerRadius(50)
      .outerRadius(r)
 
    //setting color for piechart
    const color = d3.scaleOrdinal()
      .range(d3.schemeSet3);
 
    //setting up data for svg
    svg.selectAll()
      .data(pieData)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', d => color(d.value))
      .style('stroke','black')
      .style('opacity', 0.7);
 
    //setting up annotation
    svg.selectAll()
      .data(pieData)
      .join('text')
      .text(d => d.data.property)
      .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
      .style('text-anchor', 'middle');
  }, [data]);
 
  return (
    <div className="container">
      <h3>DonutChart</h3>
      <svg ref={svgRef}></svg>
    </div>
 
  )
}
 
export default DonutChart;