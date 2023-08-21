import * as d3 from 'd3'


export const colorSchemesObject = {
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