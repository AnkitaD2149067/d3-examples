import React, { useEffect } from "react";
import * as d3 from 'd3';
 
const Scatterplot1 = () => {
  useEffect(() => {
    const circles = ([
      { cx: 20, cy: 20},
      { cx: 50, cy: 20},
      { cx: 70, cy: 80},
      { cx: 260, cy: 70},
      { cx: 45, cy: 55},
      { cx: 163, cy: 46},
      { cx: 100, cy: 120},
      { cx: 200, cy: 106},
      { cx: 90, cy: 270},
      { cx: 45, cy: 190},
    ]);
    drawChart(circles);
  }, []);
 
  const drawChart = (circles) => {
    // creating circle inside the svg
    const circle = d3.select('#circle1')
      .selectAll('circle')  // selecting all the circles      
      .data(circles)   // reffering to the array of circles
      .enter()
      .append('circle')   // reffering to the tag
 
    circle.attr('cx', ({ cx }) => {
      return cx;
    })
      .attr('cy', ({ cy }) => {
        return cy;
      })
      .attr('r', 5)
      .attr('fill', 'lightblue')
      .attr('stroke', 'red')
  }
 
  return (
    <div className="container" >
      <h3>ScatterPlot --  Example 1</h3>
      <div id="svgWrapper">
        {/* If we write directly without using useEffect, it will go on printing after some time */}
        <svg id="circle1"></svg>
      </div>
    </div>
  )
}
export default Scatterplot1;