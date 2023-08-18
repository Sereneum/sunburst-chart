import {makeAutoObservable} from "mobx";
import { toJS} from 'mobx';

export default class Store {
    constructor() {
        this._chartData = null
        this._customRadius = null
        makeAutoObservable(this)
    }

    setChartData(chartData) {
        // this._chartData =  JSON.parse(JSON.stringify(chartData))
        this._chartData = chartData
    }

    setCustomRadius(customRadius) {
        this._customRadius = customRadius
    }

    get chartData() {
        // return JSON.parse(JSON.stringify(this._chartData))
        return toJS(this._chartData)
    }

    get customRadius() {
        return toJS(this._customRadius)
    }
}
