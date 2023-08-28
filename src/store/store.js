import {makeAutoObservable} from "mobx";
import { toJS} from 'mobx';


/* Глобальное хранилище приложения:
    chartData -> Данные диаграммы.
    customRadius -> Размеры сигментов
    colorScheme -> Текущая цветовая схема
 */
export default class Store {
    constructor() {
        this._chartData = null
        this._customRadius = null
        this._colorScheme = null
        makeAutoObservable(this)
    }

    setChartData(chartData) {
        this._chartData = chartData
    }

    setCustomRadius(customRadius) {
        this._customRadius = customRadius
    }

    setColorScheme(colorScheme) {
        this._colorScheme = colorScheme
    }

    get chartData() {
        return toJS(this._chartData)
    }

    get customRadius() {
        return toJS(this._customRadius)
    }

    get colorScheme() {
        return toJS(this._colorScheme)
    }
}
