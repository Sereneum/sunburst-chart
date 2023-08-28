/* Возращает глубину текущего состояния диаграммы */
const funcDepth = (root, depth=0, maxDepth=0) => {
    if (!('children' in root)) return depth

    for (let children of root.children) {
        let d = funcDepth(children, depth + 1, maxDepth)
        if (d > maxDepth) maxDepth = d
    }

    return maxDepth
}

/* Распределение размеров при понижении уровня диаграммы */
const lowerFunc = (list, diff=1) => {
    let r = []
    for(let i = 0; i < list.length - diff; ++i) {
        r.push(
            list[i] * (100 / list[list.length - diff - 1])
        )
    }
    return r
}

/* Распределение размеров при повышении уровня диаграммы */
const upperFunc = (list, diff=1) => {
    let r = [], rn = 1 / (list.length + diff)
    for(let i = 0; i < list.length; ++i) {
        r.push(
            list[i] * (1 - rn)
        )
    }
    r.push(100)
    return r
}

/* Функция распределения размеров сигментов при понижении/повышении уровня всей диаграммы */
export const sizeManager = ({chartData, customRadius}) => {
    if(chartData === null || customRadius === null) return {isResize: false}
    let depth = funcDepth(chartData) + 1;
    // console.log('depth => ', depth)
    let crLen = customRadius ? customRadius.length : null
    // console.log('crLen => ', crLen)
    if(crLen === depth) return {isResize: false, r: []}

    if(depth < crLen) return {isResize: true, r: lowerFunc(customRadius)}
    else return {isResize: true, r: upperFunc(customRadius)}
}