import React, {useEffect, useState} from 'react';
import SunburstChartV3 from "../SunburstChart/SunburstChartV3";
import '../../index.css'
import {partition as d3_partition, hierarchy as d3_hierarchy, min} from "d3";
import SunburstChartV4 from "../SunburstChart/SunburstChartV4";

const SunburstBlock = ({data, isFullscreen=false, parentRef=null, customRadius}) => {


    const [SIZE, setSIZE] = useState(0)


    const  minSize = (a, b) => a > b ? b : a
    const offset = 35
    useEffect(() => {
        if(isFullscreen) setSIZE(window.screen.height - 20)
        else setSIZE(minSize(window.innerWidth / (2/3) - offset, window.innerHeight - offset))
    }, [isFullscreen])


    const copy = obj => JSON.parse(JSON.stringify(obj))

    /* создает структуру */
    const partition = (data) => d3_partition()
        .size([2 * Math.PI, SIZE / 2])(
        d3_hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value)
    );


    /*  */
    // const [dataRoot, setDataRoot] = useState(partition(data))

    const [root, setRoot] = useState({
        tree: partition(data),
        history: []
    })

    useEffect(() => {
        let new_root = partition(data)
        // setDataRoot(new_root)
        setRoot({
            tree: new_root,
            history: []
        })
    }, [data])

    const fillHistory = treetop => {
        let arr = []
        let cur = treetop
        while (cur.parent) {
            let parent = cur.parent
            arr.push(parent)
            cur = cur.parent
        }

        return arr.reverse()
    }

    const treetopRepositioningV2 = treetop => {
        // выбранная вершина - корень всего дерева
        if (!treetop.depth && !root.tree && !treetop.depth) return

        // выбранная вершина - вершина без детей
        if (!treetop.height) return

        // выбранная вершина - одна из детей текущей => спуск
        if (
            (root.tree.height - treetop.height)
        ) {


            setRoot(prev => {
                return {
                    tree: treetop,
                    history: [...prev.history, ...fillHistory(treetop)]
                }
            })
        } else {
            // выбранная вершина - текущая (но не вершина всего дерева) => подъем
            // console.log('проверка на подъем')
            if(!root.history.length) return;
            setRoot(prev => {
                return {
                    tree: prev.history[prev.history.length - 1],
                    history: prev.history.slice(0, -1)
                }
            })
        }
    }


    return (
        <div className={`chart`}>
            {
                root
                &&
                root.tree
                &&
                root.tree.children
                &&
                <SunburstChartV4
                    SIZE={SIZE}
                    root={partition(copy(root.tree.data))}
                    treetopRepositioning={treetopRepositioningV2}
                    customRadius={customRadius}
                />
            }
        </div>
    );
};

export default SunburstBlock;