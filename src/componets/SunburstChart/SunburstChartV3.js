import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import '../../index.css'

const SunburstChart = ({root, SIZE, treetopRepositioning}) => {
    const svgRef = useRef(null);
    const [viewBox, setViewBox] = React.useState("0,0,0,0");
    const RADIUS = SIZE / 2;
    const isCenter = true

    /* Функция, используящая методы из библиотеки D3.js для создания разбиения иерархических
    данных для круговой диаграммы.

       d3.partition() - преобразует иерархическую структуру данных, созданную с помощью метода
       d3.hierarchy(), в разбиение.

      Разбиение визуализирует иерархические данные в виде круговой или секторной диаграммы.
      Метод вычисляет размеры и позиции каждого узла в разбиении, основываясь на заданных параметрах иерархии.
    */

    // const partition = (data) =>
    //     d3.partition().size([2 * Math.PI, SIZE / 2])(
    //         d3.hierarchy(data)
    //             .sum(d => d.value)
    //             .sort((a, b) => b.value - a.value)
    //     );

    /*  */
    const tryOpenPath = d => {
        treetopRepositioning(d)
    }

    const color = d3.scaleOrdinal(
        d3.quantize(d3.interpolateRainbow, root.children.length + 1)
    );

    const format = d3.format(",d");

    const arc = d3
        .arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(RADIUS / 2)
        .innerRadius((d) => d.y0)
        .outerRadius((d) => d.y1 - 1);

    const getAutoBox = () => {
        if (!svgRef.current) {
            return "";
        }

        const {x, y, width, height} = svgRef.current.getBBox();

        return [x, y, width, height].toString();
    };

    useEffect(() => {
        setViewBox(getAutoBox());
    }, []);

    const getColor = (d) => {
        if(d.depth === 0) return `rgb(211, 211, 211)`
        while (d.depth > 1) d = d.parent;
        return color(d.data.name)
    };

    const getTextTransform = (d) => {
        if (!d.depth) return

        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    };



    useEffect(() => {
            // let r = partition(data);
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
                .attr("d", arc)
                //
                .join("text")
                .text(d => `${d.data.name}`)
                //
                .transition()
                .duration(750)
                .attrTween("d", (d) => {
                    const start = {x0: 0, x1: 0, y0: 0, y1: 0};
                    const interpolate = d3.interpolate(start, d);
                    return (t) => arc(interpolate(t));
                });

            // paths()
            //     .selectAll("text")
            //     .data(r.descendants().filter((d) => isCenter ? true : d.depth))
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
                .text(d => d.data.name)
                .attr('fill-opacity', 0)
                .each((d, i) => {
                    const path = pathNodes[i],
                        client = path.getBoundingClientRect();
                    const innerRadius = d.y0, outerRadius = d.y1 - 1
                    // console.log(innerRadius, outerRadius)
                        // len = path.


                    // console.log(`Ширина элемента: ${client.width}px`);
                    // console.log(`Высота элемента: ${client.height}px`);
                    // console.log(d.data.name)

                })
                // .each(function (d, i) {
                //     console.log(i, d)
                //     const path = svg.select('g:nth-child(' + (i + 1) + ') path')
                //     const pathNode = path.node()
                    // console.log(pathNode)
                    // const pathLength = pathNode.getTotalLength()

                    // const text = d3.select(this);
                    // const textNode = text.node();
                    // const textWidth = textNode.getComputedTextLength();
                    //
                    // const fontSize = (pathLength / textWidth) * 12;
                    // text.style('font-size', fontSize + 'px');
                    //
                    // const textPath = text.append('textPath')
                    //     .attr('href', `#path-${i + 1}`)
                    //     .text(d.text);
                // })



            textG
                .transition()
                .duration(750)
                .attr('fill-opacity', 1);

                /* события */

            paths().on('click', (event, d) => {
                tryOpenPath(d)
            })

        }
        , [root, viewBox])


    return (
        <svg ref={svgRef} style={{'border': '2px solid #ffcccb'}}/>
    );
};


export default SunburstChart