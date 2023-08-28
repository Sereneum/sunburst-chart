import './index.css'
import {useContext, useEffect, useRef, useState} from "react";
import Serialization from "./componets/Serialization/Serialization";
import SunburstBlock from "./componets/SunburstBlock/SunburstBlock";
import ChartMenu from "./componets/ChartMenu/ChartMenu";
import NullData from "./componets/NullData/NullData";
import {FullScreen, useFullScreenHandle} from "react-full-screen";
import SunburstChartFullscreen from "./componets/SunburstChart/SunburstChartFullscreen";
import {Context} from "./index";
import {observer} from 'mobx-react-lite'
import {storageManager} from "./managers/storageManager";
import {sizeManager} from "./managers/sizeManager";

const App = observer(() => {

    // Глобальное хранилице приложение (mobx)
    const {store} = useContext(Context)

    const [loading, setLoading] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPrintMode, setIsPrintMode] = useState(false);

    const refChartBlock = useRef(null)
    const handle = useFullScreenHandle()


    // Подгрузка данных об диаграмме
    useEffect(() => {
        try {
            let chartData = storageManager.chartData.get()
            store.setChartData(chartData)
            setLoading(false)
        } catch (e) {
            console.log('ОШИБКА ЧТЕНИЯ ФАЙЛА ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА')
            setLoading(false)
        }
    }, [])

    // Подгрузка размеров сигментов
    useEffect(() => {
        try {
            let customRadius = storageManager.customRadius.get()
            store.setCustomRadius(customRadius)
        } catch (e) {
            console.log('ОШИБКА ЧТЕНИЯ КАСТОМНЫХ РАЗМЕРОВ ГРАФИКА ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА')
        }
    }, [])

    // Подгрузка текущей цветовой схемы
    useEffect(() => {
        try {
            let colorScheme = storageManager.colorScheme.get()
            if(colorScheme) store.setColorScheme(colorScheme)
            else store.setColorScheme('igirgi1')
        } catch (e) {
            console.log('ОШИБКА ЧТЕНИЯ ЦВЕТОВОЙ ТЕМЫ ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА')
        }
    }, [])


    // Создает событие сохранения данных в локальное хранилище при выходе из приложения.
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            saveLocal();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            saveLocal();
        };
    }, []);

    /* очистка данных */
    const clear = () => {
        storageManager.chartData.clear()
        store.setChartData(null)

        storageManager.customRadius.clear()
        store.setCustomRadius(null)
    }

    /* сохраняет данные диаграммы в локал. хранилище */
    const saveLocal = () => {
        storageManager.chartData.save(store.chartData)
    }

    /* Открывает полноэкранный режим */
    const openFullscreenMode = () => {
        setIsFullscreen(true)
        handle.enter().then(r => {})
    }

    /* При выходе из fullscreen -> изменить состояние приложения */
    useEffect(() => {
        if (handle.active && isFullscreen)
            setIsFullscreen(false)
    }, [handle.active])


    // Распределение размеров сигментов.
    useEffect(() => {
        let resize = sizeManager({
            chartData: store.chartData,
            customRadius: store.customRadius
        })

        if (resize.isResize) {
            console.log('resize.r -> ', resize.r)
            store.setCustomRadius(resize.r)
            storageManager.customRadius.save(resize.r)
        }

    }, [store.chartData])

    if (loading) return <></>



    return (
        <div className="main-block">
            {
                store.chartData === null
                    ?
                    <NullData/> // при отсутствии данных
                    :
                    <>

                        <div className="sunburst-chart-block" ref={refChartBlock}>
                            <SunburstBlock parentRef={refChartBlock}/>
                        </div>
                        {
                            !isPrintMode // во время режима печать остается только диаграмма
                                ?
                                <>
                                    <div className="control-block">
                                        <ChartMenu
                                            clear={clear}
                                            saveLocal={saveLocal}
                                            openFullscreenMode={openFullscreenMode}
                                            setIsPrintMode={setIsPrintMode}
                                        />
                                        <Serialization/>
                                    </div>
                                    <FullScreen handle={handle}>
                                        <SunburstChartFullscreen isView={handle.active}/>
                                    </FullScreen>
                                </>
                                :
                                <></>
                        }


                    </>
            }
        </div>
    );
})

export default App;
