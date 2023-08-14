// import React, {useEffect, useRef, useState} from "react";
// import * as d3 from "d3";
// import {count, pointRadial} from "d3";
// import { useSpring, animated } from 'react-spring';
//
// const SIZE = 650;
// const RADIUS = SIZE / 2;
//
// const SunburstChart = ({data}) => {
//
//
//     const svgRef = useRef(null);
//     const [viewBox, setViewBox] = React.useState("0,0,0,0");
//
//     const isCenter = true
//
//     /* Функция, используящая методы из библиотеки D3.js для создания разбиения иерархических
//     данных для круговой диаграммы.
//
//        d3.partition() - преобразует иерархическую структуру данных, созданную с помощью метода
//        d3.hierarchy(), в разбиение.
//
//       Разбиение визуализирует иерархические данные в виде круговой или секторной диаграммы.
//       Метод вычисляет размеры и позиции каждого узла в разбиении, основываясь на заданных параметрах иерархии.
//     */
//     const partition = (data) =>
//         d3.partition().size([2 * Math.PI, RADIUS])(
//             d3
//                 .hierarchy(data)
//                 .sum(d => d.value)
//                 .sort((a, b) => b.value - a.value)
//         );
//
//     const color = d3.scaleOrdinal(
//         d3.quantize(d3.interpolateRainbow, data.children.length + 1)
//     );
//
//     const format = d3.format(",d");
//
//     const arc = d3
//         .arc()
//         .startAngle((d) => d.x0)
//         .endAngle((d) => d.x1)
//         .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
//         .padRadius(RADIUS / 2)
//         .innerRadius((d) => d.y0)
//         .outerRadius((d) => d.y1 - 1);
//
//     const getAutoBox = () => {
//         if (!svgRef.current) {
//             return "";
//         }
//
//         const {x, y, width, height} = svgRef.current.getBBox();
//
//         return [x, y, width, height].toString();
//     };
//
//     useEffect(() => {
//         setViewBox(getAutoBox());
//     }, []);
//
//     const getColor = (d) => {
//         while (d.depth > 1) d = d.parent;
//         let c = color(d.data.name)
//         console.log('color: ', c)
//         return color(d.data.name);
//     };
//
//     const getTextTransform = (d) => {
//         if (!d.depth) return
//
//         const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
//         const y = (d.y0 + d.y1) / 2;
//         return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
//     };
//
//
//     const [root, setRoot] = useState(partition(data))
//     useEffect(() => {
//             console.log('effect')
//             let r = partition(data)
//             // d3.select(svgRef.current).select('')
//         //     const select  = d3.selectAll('path')
//         //         .transition()
//         //         .duration(500)
//         //     console.log(select)
//         // console.log(d3.select(svgRef.current).select("g").selectAll("path"))
//
//             d3.select(svgRef.current)
//                 .select("g")
//                 .selectAll("path")
//                 .transition()
//                 .duration(500)
//             setRoot(r)
//         }
//         , [data])
//
//
//     // const root = partition(data);
//     // console.log(root)
//
//
//     return (
//         <svg width={SIZE} height={SIZE} viewBox={viewBox} ref={svgRef}>
//             <g fillOpacity={0.6}>
//                 {root
//                     .descendants()
//                     .filter((d) => isCenter ? true : d.depth)
//                     .map((d, i) => (
//                         <path key={`${d.data.name}-${i}`} fill={getColor(d)} d={arc(d)}>
//                             <text>
//                                 {d
//                                     .ancestors()
//                                     .map((d) => d.data.name)
//                                     .reverse()
//                                     .join("/")}
//                                 \n${format(d.value)}
//                             </text>
//                         </path>
//                     ))}
//             </g>
//             <g
//                 pointerEvents="none"
//                 textAnchor="middle"
//                 fontSize={10}
//                 fontFamily="sans-serif"
//             >
//                 {root
//                     .descendants()
//                     .filter((d) => (isCenter || d.depth) && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10)
//                     .map((d, i) => (
//                         <text
//                             key={`${d.data.name}-${i}`}
//                             transform={getTextTransform(d)}
//                             dy="0.35em"
//                         >
//                             {d.data.name}
//                         </text>
//                     ))}
//             </g>
//         </svg>
//     );
// };
//
//
// export default SunburstChart