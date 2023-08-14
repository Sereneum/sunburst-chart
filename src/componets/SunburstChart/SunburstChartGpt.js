import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3'

const SunburstChartGpt = ({data}) => {

    const svgRef = useRef(null);
    const SIZE = 650;

    const partition = data => {
        const root = d3
            .hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        return d3
            .partition()
            .size([2 * Math.PI, root.height + 1])(root);
    }

    const arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(SIZE / 6)
        .innerRadius(d => d.y0)
        .outerRadius(d => d.y1 - 1);

    const getAutoBox = () => {
        if (!svgRef.current) {
            return "";
        }

        const {x, y, width, height} = svgRef.current.getBBox();
        console.log('BOX: ', svgRef.current.getBBox())


        const padding = 20

        // return [x - padding, y - padding, width + 2 * padding, height + 2 * padding].toString();
        return [x, y, width, height].toString();
    };

   useEffect(() => {
       const root = partition(data);
       console.log(root)

       // root.each(d => d.current = d)
       const svg = d3
           .select(svgRef.current)
           .attr("viewBox", getAutoBox());

       svg.append("g")
           .attr("fill-opacity", 0.6)
           .selectAll("path")
           .data(root.descendants().filter(d => d.depth))
           .join("path")
           .attr("d", arc)
           .attr("fill", "rgb(200, 200, 200)");


       // svg.selectAll("path")
       //     .style("cursor", "pointer")
       //     .on("click", clicked);

       // function clicked(p) {
       //     svg.selectAll("path")
       //         .transition()
       //         .duration(750)
       //         .attrTween("d", arcTween(p));
       // }
       //
       // function arcTween(p) {
       //     const arcCurrent = p.current;
       //     const arcInterpolate = d3.interpolate(p.current, p);
       //
       //     return t => {
       //         arcCurrent.x0 = arcInterpolate(t).x0;
       //         arcCurrent.x1 = arcInterpolate(t).x1;
       //         return arc(arcCurrent);
       //     };
       // }



   }, [data])



    return (
        <svg ref={svgRef}/>
    );
};

export default SunburstChartGpt;