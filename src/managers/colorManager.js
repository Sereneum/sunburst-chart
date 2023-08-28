import * as d3 from 'd3'


const strToRgb = str => str.slice(4, str.length - 1).split(', ')

const middleColor = (c1, c2) => {
    let c1v = strToRgb(c1);
    let c2v = strToRgb(c2);
    let conv = (i, j) => Math.floor((i + j) / 2);
    return `rgb(${conv(c1v[0], c2v[0])}, ${conv(c1v[1], c2v[1])}, ${conv(c1v[1], c2v[1])})`;
}
/*
    Создание кастомной цветовой схемы:
    сначала выбираются цвета из списка,
    и далее равномерно заполняются цвета между цветами из списка.
 */
const createCompanyScheme = (list, k) => {
    if (k < list.length) return list.slice(0, -1 * (list.length - k));
    if (k === list.length) return list;
    if (k === 1) return list[0];
    const n = list.length, m = n - 1, em = Math.floor((k - n) / m);
    let s = (k - n) % m;
    let r = [];
    r.push(list[0]);


    for (let i = 0; i < n - 1; ++i) {
        let offset = em + 2;
        if (s > 0) {
            offset += 1;
            s -= 1;
        }
        const inter = d3.interpolate(list[i], list[i + 1]);
        for (let j = 1; j < offset - 1; ++j) {
            r.push(inter(j / offset));
        }
        r.push(list[i + 1]);
    }
    return r;
}


/* Список цветов компании. */
const companyColors = [
    'rgb(246, 209, 6)',
    'rgb(239, 107, 1)',
    'rgb(250, 157, 16)',
    'rgb(249, 189, 39)',
    'rgb(194, 9, 55)',
    'rgb(192, 0, 0)',
    'rgb(61, 70, 74)',
    'rgb(107, 107, 107)',
    'rgb(178, 178, 178)',
    'rgb(186, 186, 186)',
    'rgb(226, 226, 226)',
    'rgb(71, 91, 121)',
    'rgb(105, 133, 175)',
    'rgb(149, 160, 178)',
]

/*
    list заполяется цветами, и далее его нужно передать в .func
 */
export const customColorSchemes = {
    "igirgi1": {
        list: ['rgb(246, 209, 6)', 'rgb(249, 189, 39)', 'rgb(250, 157, 16)', 'rgb(239, 107, 1)'],
        func: function (n) {
            return createCompanyScheme(customColorSchemes.igirgi1.list, n);
        }
    },
    "igirgi2": {
        list: ['rgb(246, 209, 6)', 'rgb(249, 189, 39)', 'rgb(250, 157, 16)', 'rgb(239, 107, 1)', 'rgb(194, 9, 55)', 'rgb(192, 0, 0)'],
        func: function (n) {
            return createCompanyScheme(customColorSchemes.igirgi2.list, n);
        }
    },
    "igirgi3": {
        list: ['rgb(226, 226, 226)', 'rgb(149, 160, 178)', 'rgb(105, 133, 175)', 'rgb(71, 91, 121)'],
        func: function (n) {
            return createCompanyScheme(customColorSchemes.igirgi3.list, n);
        }
    },
    "igirgi4": {
        list: [ 'rgb(186, 186, 186)', 'rgb(178, 178, 178)', 'rgb(107, 107, 107)', 'rgb(61, 70, 74)'],
        func: function (n) {
            return createCompanyScheme(customColorSchemes.igirgi4.list, n);
        }
    },
}

/*
    Список всех цветовых схем приложения:
    схема берется либо из библиотеки d3,
    либо создается и берется из объекта customColorSchemes.
 */
export const colorSchemesObject = {
    "igirgi1": {
        name: "igirgi1",
        description: "Цветовая тема ИГиРГИ №1.",
        func: customColorSchemes.igirgi1.func,
        isCustomColorScheme: true
    },
    "igirgi2": {
        name: "igirgi2",
        description: "Цветовая тема ИГиРГИ №2.",
        func: customColorSchemes.igirgi2.func,
        isCustomColorScheme: true
    },
    "igirgi3": {
        name: "igirgi3",
        description: "Цветовая тема ИГиРГИ №3.",
        func: customColorSchemes.igirgi3.func,
        isCustomColorScheme: true
    },
    "igirgi4": {
        name: "igirgi4",
        description: "Цветовая тема ИГиРГИ №4.",
        func: customColorSchemes.igirgi4.func,
        isCustomColorScheme: true
    },
    "interpolateViridis": {
        name: "interpolateViridis",
        description: "Цветовая схема Viridis.",
        func: d3.interpolateViridis
    },
    "interpolateInferno": {
        name: "interpolateInferno",
        description: "Цветовая схема Inferno.",
        func: d3.interpolateInferno
    },
    "interpolateMagma": {
        name: "interpolateMagma",
        description: "Цветовая схема Magma.",
        func: d3.interpolateMagma
    },
    "interpolateSpectral": {
        name: "interpolateSpectral",
        description: 'Цветовая схема Spectral.',
        func: d3.interpolateSpectral
    },
    "interpolateOranges": {
        name: "Oranges",
        description: 'Цветовая схема Oranges.',
        func: d3.interpolateOranges
    },

    "interpolatePlasma": {
        name: "interpolatePlasma",
        description: "Цветовая схема Plasma.",
        func: d3.interpolatePlasma
    },
    "interpolateWarm": {
        name: "interpolateWarm",
        description: "Цветовая схема Warm.",
        func: d3.interpolateWarm
    },
    "interpolateCool": {
        name: "interpolateCool",
        description: "Цветовая схема Cool.",
        func: d3.interpolateCool
    },
    "interpolateRainbow": {
        name: "interpolateRainbow",
        description: "Цветовая схема Rainbow.",
        func: d3.interpolateRainbow
    },
    "interpolateCubehelixDefault": {
        name: "interpolateCubehelixDefault",
        description: "Цветовая схема Cubehelix.",
        func: d3.interpolateCubehelixDefault
    },
    "interpolateBuGn": {
        name: "interpolateBuGn",
        description: "Цветовая схема от синего к зеленому.",
        func: d3.interpolateBuGn
    },
    "interpolateBuPu": {
        name: "interpolateBuPu",
        description: "Цветовая схема от синего к фиолетовому.",
        func: d3.interpolateBuPu
    },
    "interpolateGnBu": {
        name: "interpolateGnBu",
        description: "Цветовая схема от зеленого к синему.",
        func: d3.interpolateGnBu
    },
    "interpolateOrRd": {
        name: "interpolateOrRd",
        description: "Цветовая схема от оранжевого к красному.",
        func: d3.interpolateOrRd
    },
    "interpolatePuBuGn": {
        name: "interpolatePuBuGn",
        description: "Цветовая схема от фиолетового к зеленому, через синий.",
        func: d3.interpolatePuBuGn
    },
    "interpolatePuBu": {
        name: "interpolatePuBu",
        description: "Цветовая схема от фиолетового к синему.",
        func: d3.interpolatePuBu
    },
    "interpolatePuRd": {
        name: "interpolatePuRd",
        description: "Цветовая схема от фиолетового к красному.",
        func: d3.interpolatePuRd
    },
    "interpolateRdPu": {
        name: "interpolateRdPu",
        description: "Цветовая схема от красного к фиолетовому.",
        func: d3.interpolateRdPu
    },
    "interpolateYlGnBu": {
        name: "interpolateYlGnBu",
        description: "Цветовая схема от желтого к зеленому, через синий.",
        func: d3.interpolateYlGnBu
    },
    "interpolateYlGn": {
        name: "interpolateYlGn",
        description: "Цветовая схема от желтого к зеленому.",
        func: d3.interpolateYlGn
    },
    "interpolateYlOrBr": {
        name: "interpolateYlOrBr",
        description: "Цветовая схема от желтого к оранжевому, через коричневый.",
        func: d3.interpolateYlOrBr
    },
    "interpolateYlOrRd": {
        name: "interpolateYlOrRd",
        description: "Цветовая схема от желтого к красному, через оранжевый.",
        func: d3.interpolateYlOrRd
    }
};
