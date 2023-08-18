import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import '../../index.css'

const SunburstChart = ({root, SIZE, treetopRepositioning, customRadius}) => {
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const [viewBox, setViewBox] = React.useState("0,0,0,0");

    console.log(customRadius)

    const RADIUS = SIZE / 2;
    const isCenter = true

    const tryOpenPath = d => {
        treetopRepositioning(d)
    }

    const color = d3.scaleOrdinal(
        d3.quantize(d3.interpolateRainbow, root.children.length + 1)
    );

    const format = d3.format(",d");

    // const arc = d3
    //     .arc()
    //     .startAngle((d) => d.x0)
    //     .endAngle((d) => d.x1)
    //     .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    //     .padRadius(RADIUS / (2 * root.height))
    //     .innerRadius((d) => d.y0)
    //     .outerRadius((d) => d.y1 - 1);
    // .outerRadius((d) => d.y1 - 1);

    const isCurrentCustomRadius = customRadius !== null
        && customRadius.length === root.height + 1

    const currentCustomRadius = (i) => {
        if(isCurrentCustomRadius) return customRadius[i]
        else return customRadius[i] * (100 / customRadius[root.height])
    }

    const currentCustomRadiusReverse = (i) => {
        /* пока не работает xd */
        if(isCurrentCustomRadius) return customRadius[i]
        else return customRadius[i] * (100 / customRadius[customRadius.length - root.height - 2])
    }


    const innerRadius = d => {
        let r = customRadius
        ?
            d.depth ? currentCustomRadius(d.depth - 1) * 0.01 * RADIUS : 0
            :
        d.y0

        return r ? r : 0

        // if(customRadius) return d.depth ? currentCustomRadius(d.depth - 1) * 0.01 * RADIUS : 0
        // else return d.y0
    }

    const outerRadius = d => {
        let r = customRadius
        ?
            currentCustomRadius(d.depth) * 0.01 * RADIUS - 1
            :
            d.y1 - 1
        return r ? r : 0
        // if(customRadius) return currentCustomRadius(d.depth) * 0.01 * RADIUS - 1
        // else return d.y1 - 1
    }



    // console.log('customRadius: ', customRadius)
    const customArc = d3
        .arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(RADIUS / (2 * root.height))
        .innerRadius((d) => innerRadius(d))
        .outerRadius((d) => outerRadius(d));

    const getAutoBox = () => {
        if (!svgRef.current) {
            return "";
        }
        return [-RADIUS, -RADIUS, SIZE, SIZE].toString();
    };
    // let viewBox = getAutoBox()
    useEffect(() => {
        setViewBox(getAutoBox());
    }, [SIZE]);

    const getColor = (d) => {
        if (d.depth === 0) return `rgb(225, 225, 225)`
        while (d.depth > 1) d = d.parent;
        return color(d.data.name)
    };

    const getTextTransform = (d) => {
        if (!d.depth) return

        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
        const y = (innerRadius(d)  + outerRadius(d) + 1) / 2
        // console.log('innerRadius(d) = ', innerRadius(d))
        // console.log('outerRadius(d) = ', outerRadius(d))
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        // const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
        // const y = (d.y0 + d.y1) / 2;
        // return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    };


    useEffect(() => {

            // console.log('root', root);
            // очистка дочерних эл-тов
            d3
                .select(svgRef.current)
                .selectAll("*")
                .remove();

            // заполняем атребуты svg
            const svg = d3.select(svgRef.current)
                .attr('width', SIZE)
                .attr('height', SIZE)
                .attr('viewBox', viewBox)
                .append('g')
                .attr('fill-opacity', 0.6);


            /* получение всех path из первого "g" */
            const paths = () => d3.select(svgRef.current)
                .select("g")
                .selectAll("path");

            // получение всех path из первого "g"
            paths()
                .data(root.descendants().filter((d) => isCenter ? true : d.depth))
                .join("path")
                .attr("fill", (d) => getColor(d))
                .attr("d", customArc)
                //
                .join("text")
                .text(d => `${d.data.name}`)
                .transition()
                .duration(750)
                .attrTween("d", (d) => {
                    const start = {x0: 0, x1: 0, y0: 0, y1: 0};
                    const interpolate = d3.interpolate(start, d);
                    return (t) => customArc(interpolate(t));
                });

            // paths()
            //     .selectAll("text")
            //     .data(root.descendants().filter((d) => isCenter ? true : d.depth))
            //     .join("text")
            //     .text(d => `${d.data.name}`)

            const pathNodes = d3
                .select(svgRef.current)
                .select('g')
                .selectAll('path').nodes()


            // .attr('className', 'text-container')
            /* текстовые поля */
            const textG = d3
                .select(svgRef.current)
                .append('g')
                .attr('fill-opacity', 0.9)
                .attr('pointer-events', 'none')
                .attr('text-anchor', 'middle')
                .attr('font-size', 13)
                .attr('font-weight', 'middle')
                .attr('font-family', 'sans-serif')
                // .attr('overflow', 'hidden')
                // .attr('text-overflow', 'ellipsis')
                .selectAll("text")
                .data(root.descendants().filter((d) => (isCenter || d.depth) && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10))
                .join("text")
                .attr("transform", d => getTextTransform(d))
                .attr("dy", "0.35em")
                .attr('size', function () {
                    return this.getBoundingClientRect().width;
                })
                .text(d => d.data.name)
                .attr('fill-opacity', 0)
                .each(function (d, i) {
                    // const path = pathNodes[i];
                    const textBWidth = this.getBoundingClientRect().width;
                    const textBHeight = this.getBoundingClientRect().height;
                    // const segmentRadius = d.y1 - d.y0 - 1;
                    const segmentRadius = outerRadius(d) - innerRadius(d);
                    // if(this.innerHTML !== 'South-Eastern Asia') return

                    const convR = r => {
                        r = Math.abs(r)
                        if (r > 0 && r < 90) return 90 - r
                        if (r > 90 && r < 180) return r - 90
                        if (r > 180 && r < 270) return 270 - r
                        if (r > 270 && r < 360) return 360 - r
                    }

                    const tr = this.getAttribute('transform');
                    const rotateGr = tr ? Number(tr.slice(tr.indexOf('(') + 1, tr.indexOf(')'))) : 0
                    const rotate = (Math.PI * convR(rotateGr)) / 180


                    // const x = (textBWidth * Math.cos(rotate) - textBHeight * Math.sin(rotate)) / (Math.pow(Math.cos(rotate), 2) - Math.pow(Math.sin(rotate), 2))
                    let y = (textBHeight * Math.cos(rotate) - textBWidth * Math.sin(rotate)) / (Math.pow(Math.cos(rotate), 2) - Math.pow(Math.sin(rotate), 2))
                    const realWidth = rotateGr % 90 ? y : textBWidth
                    if (realWidth > segmentRadius) {
                        let text = this.innerHTML
                        let one = realWidth / text.length
                        let l = segmentRadius / one
                        this.innerHTML = text.slice(0, l - 2) + '..'
                    }


                })
            textG
                .transition()
                .duration(750)
                .attr('fill-opacity', 1);


            /* события */

            paths().on('click', function (event, d) {
                tryOpenPath(d)
            });

            paths().on('mouseover', function (event, d) {

                d3.select(this)
                    .attr("transition", "all 100ms ease-in-out")
                    .attr("stroke", "#addfad")
                    .attr("stroke-width", "2");


                tooltipRef.current.style.left = `${event.pageX + 10}px`
                tooltipRef.current.style.top = `${event.pageY + 10}px`
                tooltipRef.current.style.display = ""
                tooltipRef.current.innerHTML = `<span>${d.data.name}</span>: ${d.value}`

            });

            paths().on('mouseout', function (event, d) {
                d3.select(this)
                    .attr("transition", "all 100ms ease-in-out")
                    .attr("stroke", "white")
                    .attr("stroke-width", "0");

                tooltipRef.current.style.display = "none"

            });


        }
        , [root, viewBox])


    return (
        <>
            <svg ref={svgRef} id='node'/>
            <div ref={tooltipRef} style={{display: "none"}} className="tooltip">Значение лол</div>
        </>
    );
};


export default SunburstChart