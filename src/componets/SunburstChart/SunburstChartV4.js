import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import '../../index.css'
import {colorSchemesObject} from "../../managers/colorManager";

const SunburstChart = ({root, SIZE, treetopRepositioning, customRadius, chartData, colorScheme, rootData, isPrintMode=false}) => {
    // ссылка на дерево
    const svgRef = useRef(null);
    // ссылка на подсказку
    const tooltipRef = useRef(null);
    const [viewBox, setViewBox] = React.useState("0,0,0,0");

    const RADIUS = SIZE / 2;
    const opacity = 1.0;
    const isCenter = true

    /* произвисти соответствующие действия при клике на path */
    const tryOpenPath = d => {
        let isTryImmersion = true
        if (!d.height) isTryImmersion = false


        if (isTryImmersion) {
            if (immersionState.isImmersion) {
                // выбранная вершина - одна из детей текущей => спуск
                if (root.height - d.height) {
                    setImmersionState(prev => {
                        return {
                            isImmersion: true,
                            parentIndex: prev.parentIndex,
                            localDepth: prev.localDepth + d.depth
                        }
                    })
                } else {
                    setImmersionState(prev => {
                        let isRoot = !(prev.localDepth - 1)
                        return {
                            isImmersion: !isRoot,
                            parentIndex: isRoot ? null : prev.parentIndex,
                            localDepth: isRoot ? null : prev.localDepth - 1
                        }
                    })
                }


            } else {
                if (!d.depth) return
                let index = findIndex(d);
                let depth = d.depth;
                setImmersionState({
                    isImmersion: true,
                    parentIndex: index,
                    localDepth: depth
                })
            }
        }


        // end immersionState block
        treetopRepositioning(d)
    }

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
        if (isCurrentCustomRadius) return customRadius[i]
        else return customRadius[i] * (100 / customRadius[root.height])
    }
    
    /* Рассчет внутреннего радиуса сигмента */
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
    
    /* Рассчет внешнего радиуса сигмента */
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


    /* Расчитывает размеры сигмента */
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

    const color = d3.scaleOrdinal(
        d3.quantize(d3.interpolateMagma, root.children.length + 1)
    )

    /* Создает цветовую шкалу. При погрудении по дереву цвет смегчается. */
    const createColorScale = (parentColor, countElements) => {
        return d3.scaleLinear()
            .domain([0, countElements])
            .range([parentColor, '#ffffff'])
        // .range([parentColor, '#ffffff'])
    }


    const voidImmersionState = () => {
        return JSON.parse(JSON.stringify({
            isImmersion: false,
            parentIndex: null,
            localDepth: null
        }))
    }

    // состояние текущих цветов сигментов по их иерархии 
    const [colors, setColors] = useState([])
    // состояние, помогающие следить за уровнем погружения для контроля цветов 
    const [immersionState, setImmersionState] = useState(voidImmersionState())
    
    /* проверка на наличие цветовой схемы */
    const getColorSchemeFunc = () => {
        try {
            return colorSchemesObject[colorScheme].func
        } catch (e) {
            return colorSchemesObject.interpolateViridis.func
        }
    }

    /* Инициализация цветов сигментво в зависимости от цветовой схемы */
    useEffect(() => {
        const childrenLen = rootData.children.length;
        /* Получаем цвета верхних уровней сигментов. (для кастомных цветовых схем функция слегка отличается) */
        const parentColors =
            (
                'isCustomColorScheme' in colorSchemesObject[colorScheme]
                &&
                colorSchemesObject[colorScheme].isCustomColorScheme
            )
                ?
                getColorSchemeFunc()(childrenLen)
                :
                d3.quantize(getColorSchemeFunc(), rootData.children.length + 1).splice(1);


        const arr = [];
        for (let i = 0; i < childrenLen; ++i) {
            /* имея цвет сигмента верхнего уровня, можно получить распределение цветов более нижних уровней. */
            const colorScale = createColorScale(parentColors[i], rootData.children[i].height + 1)
            arr.push([])
            for (let j = 0; j < rootData.children[i].height + 1; ++j)
                arr[i].push(colorScale(j));
        }

        // сохраняем цвета
        setColors(arr);
    }, [rootData, colorScheme]);

    /* для любого сигмента можно получить индекс его самого верхнего уровня */
    const findIndex = d => {
        let ind = -1;
        while (d.depth > 1) d = d.parent;
        d.parent.children.forEach((node, index) => {
            if (node === d) ind = index
        })
        return ind
    }

    /* Функция выдает цвета из инициализированного набора цветов для каждого сигмента.
       Если мы погрузились в нижние уровни, то цвета будут распределяется так,
       как бы они распредлялись без погрудения.
    */
    const getColor = d => {
        if (!d.depth && !immersionState.isImmersion) return 'rgb(255, 255, 255)'
        const childDepth = d.depth;


        try {
            // диаграмма в состоянии погрудения
            if (immersionState.isImmersion) {
                return colors[immersionState.parentIndex][immersionState.localDepth + childDepth - 1]
            } else {
                const parentIndex = findIndex(d);
                // console.log('parentIndex__childDepth-1', parentIndex, childDepth - 1)
                return colors[parentIndex][childDepth - 1];
            }

            // return colors[parentIndex][childDepth - 1];
        } catch (e) {
            return 'rgb(0,0,0)'
        }
    }

    /* Перемещает и поворачивает текст */
    const getTextTransform = (d) => {
        if (!d.depth) return

        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
        const y = (innerRadius(d) + outerRadius(d) + 1) / 2
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    };


    /* Инициализация самой диаграммы. */
    useEffect(() => {
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
                .attr('fill-opacity', opacity);


            /* функция получение всех path из первого "g" */
            const paths = () => d3.select(svgRef.current)
                .select("g")
                .selectAll("path");

            // создание сигментов
            paths()
                .data(root.descendants().filter((d) => isCenter ? true : d.depth))
                .join("path")
                .attr("fill", (d) => getColor(d))
                .attr("d", customArc)
                .join("text")
                .text(d => `${d.data.name}`)
                // анимация
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
                    /* Этот блок кода отвечает за сокращение текста при его выходе за сигмент.
                       textBWidth/textBHeight - размеры текстового блока(bounding box).
                       segmentRadius - радиус сигмента.
                       цель - зная bounding box текста и радиус сигмента получить длину самого текста.
                    * */
                    const path = pathNodes[i];
                    const textBWidth = this.getBoundingClientRect().width;
                    const textBHeight = this.getBoundingClientRect().height;
                    const segmentRadius = outerRadius(d) - innerRadius(d);

                    /* пограничные случаи значения поворота */
                    const convR = r => {
                        r = Math.abs(r)
                        if (r > 0 && r < 90) return 90 - r
                        if (r > 90 && r < 180) return r - 90
                        if (r > 180 && r < 270) return 270 - r
                        if (r > 270 && r < 360) return 360 - r
                    }

                    const tr = this.getAttribute('transform');
                    // угло поворота текста
                    const rotateGr = tr ? Number(tr.slice(tr.indexOf('(') + 1, tr.indexOf(')'))) : 0;
                    const rotate = (Math.PI * convR(rotateGr)) / 180;

                    const conv90 = rot => {
                        if (Math.abs(rot) === 90 || Math.abs(rot) === 270) return textBHeight
                        else return textBWidth
                    }

                    // const x = (textBWidth * Math.cos(rotate) - textBHeight * Math.sin(rotate))
                    // / (Math.pow(Math.cos(rotate), 2) - Math.pow(Math.sin(rotate), 2))
                    // y - нужный размер теста
                    let y = (textBHeight * Math.cos(rotate) - textBWidth * Math.sin(rotate))
                        / (Math.pow(Math.cos(rotate), 2) - Math.pow(Math.sin(rotate), 2))
                    let realWidth = rotateGr % 90 ? y : conv90(rotateGr);

                    if (!(convR(rotateGr) % 45) && (convR(rotateGr) % 90))
                        realWidth = textBWidth * Math.sqrt(2);

                    // if(this.innerHTML === 'Southern Asia' || this.innerHTML === 'Eastern Asia' || this.innerHTML == 'SEA_1')
                    //     console.log(
                    //         {
                    //             name: this.innerHTML,
                    //             segmentRadius,
                    //             realWidth,
                    //             textBWidth,
                    //             textBHeight,
                    //             y,
                    //             rotateGr,
                    //             conv: convR(rotateGr),
                    //             rotate: (Math.PI * convR(rotateGr)) / 180,
                    //             r1: (textBHeight * Math.cos(rotate) - textBWidth * Math.sin(rotate)),
                    //             r2: (Math.pow(Math.cos(rotate), 2) - Math.pow(Math.sin(rotate), 2))
                    //         }
                    //     )

                    if (realWidth > segmentRadius) {
                        // если текст вышел за сигмент, то обрезать.
                        let text = this.innerHTML
                        let one = realWidth / text.length
                        let l = segmentRadius / one
                        this.innerHTML = text.slice(0, l - 2) + '..'
                        if (this.innerHTML === '..') this.innerHTML = ''
                    }


                })
            // анимация
            textG
                .transition()
                .duration(750)
                .attr('fill-opacity', 1);


            /* событие клика на сигмент */
            paths().on('click', function (event, d) {
                tryOpenPath(d)
            });

            /* событие выделения сигмена */
            paths().on('mouseover', function (event, d) {

                d3.select(this)
                    .attr("transition", "all 100ms ease-in-out")
                    .attr("stroke", "#addfad")
                    .attr("stroke-width", "2");
                // отображение подсказки
                tooltipRef.current.style.left = `${event.pageX + 10}px`
                tooltipRef.current.style.top = `${event.pageY + 10}px`
                tooltipRef.current.style.display = ""
                tooltipRef.current.innerHTML = `<span>${d.data.name}</span>: ${d.value}`

            });
            /* отмена события выделения сигмена */
            paths().on('mouseout', function (event, d) {
                d3.select(this)
                    .attr("transition", "all 100ms ease-in-out")
                    .attr("stroke", "white")
                    .attr("stroke-width", "0");

                tooltipRef.current.style.display = "none"

            });

        }
        , [root, colors, viewBox])


    return (
        <>
            <svg ref={svgRef} id='node'/>
            <div ref={tooltipRef} style={{display: "none"}} className="tooltip">Значение лол</div>
        </>
    );
};


export default SunburstChart