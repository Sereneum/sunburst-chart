import React, {useContext} from 'react';
import './serialization.css'
import SerializationItem from "./SerializationItem";
import {Context} from "../../index";


const Serialization = () => {

    const {store} = useContext(Context)

    const executeOperation = (deep, prev, index, modifiedData) => {
        let clone = JSON.parse(JSON.stringify(store.chartData))
        if(!deep) {
            //корень
            if(modifiedData.type === 'rename')
                clone.name = modifiedData.value
            if(modifiedData.type === 'add')
                'children' in clone
                    ?
                    clone.children.push({name: modifiedData.value, value: 1})
                    :
                    clone = {name: clone.name, children: [{name: modifiedData.value, value: 1}]}
            console.log(clone)
            return clone
        }

        let current = clone
        let prevList = prev.slice(1,).reverse()

        while (prevList.length) {
            current = current.children[prevList[prevList.length - 1].index]
            prevList = prevList.slice(0, -1)
        }

        console.log('modifiedData', modifiedData)

        // return clone

        if (modifiedData.type === 'rename')
            current.children[index].name = modifiedData.value

        if (modifiedData.type === 'delete')
            current.children.splice(index, 1)

        if(modifiedData.type === 'add')
            current.children[index].children
                ?
                current.children[index].children.push({name: modifiedData.value, value: 1})
                :
                current.children[index] = {name: current.children[index].name, children: [{name: modifiedData.value, value: 1}]}


        return clone
    }

    const changeData = ({deep, index, prev, modifiedData}) => {
        let clone = executeOperation(deep, prev, index, modifiedData)
        store.setChartData(clone)
    }

    return (
        <div className="group">
            <ol className="serialization">
                <SerializationItem item={store.chartData} deep={0} index={0} prev={[]} changeData={changeData}/>
            </ol>
        </div>
    );
};

export default Serialization;

