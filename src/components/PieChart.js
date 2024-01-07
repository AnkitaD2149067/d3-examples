import React, { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
 
const PieChart = () => {
  const [data] = useState([
    { property: 'Maths', value: 85 },
    { property: 'English', value: 90 },
    { property: 'Physics', value: 78 },
    { property: 'Chemistry', value: 80 },
    { property: 'Computer', value: 89 },
  ])
  const svgRef = useRef();
 
  useEffect(() => {
    const w = 300;
    const h = 50;
    const r = w / 2;
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('margin', '120px')
      .style('padding', '50px')
      .style('overflow', 'visible');
 
    //setting up piechart
    const pieData = d3.pie().value(d => d.value)(data);
 
    //setting up arc
    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(r)
 
    //setting color for piechart
    const color = d3.scaleOrdinal()
      .range(d3.schemeSet2);
 
    //setting up data for svg
    svg.selectAll()
      .data(pieData)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', d => color(d.value))
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
      <h3>PieChart</h3>
      <svg ref={svgRef}></svg>
    </div>
  )
}
 
export default PieChart;