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

/*
    (1) Кнопка удаления
    (1) Реализация удаления элемента и его детей xd
    (0) Кнопка создания нового элемента
    (0) Перемещение элементов
    (0) Пользовательсая настройка цветов
    (0) Кнопка смены цвета
    (0) Реализация смены цвета
    (0) Перенос текста
    (0) Выделение и подсказки
    (1) Выбор новой верхушки
    (1) Анимации
    (0) Загрузка и сохранение файлов
    (0) UI
    (0) Размеры
    (0) Ссылка на файл из облака в url
*/


const App = observer(() => {

    const {store} = useContext(Context)

    const [loading, setLoading] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isPrintMode, setIsPrintMode] = useState(false);

    const refChartBlock = useRef(null)
    const handle = useFullScreenHandle()


    // chartData
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

    // customRadius
    useEffect(() => {
        try {
            let customRadius = storageManager.customRadius.get()
            store.setCustomRadius(customRadius)
        } catch (e) {
            console.log('ОШИБКА ЧТЕНИЯ КАСТОМНЫХ РАЗМЕРОВ ГРАФИКА ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА')
        }
    }, [])

    // colorScheme
    useEffect(() => {
        try {
            let colorScheme = storageManager.colorScheme.get()
            if(colorScheme) store.setColorScheme(colorScheme)
            else store.setColorScheme('igirgi1')
        } catch (e) {
            console.log('ОШИБКА ЧТЕНИЯ ЦВЕТОВОЙ ТЕМЫ ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА')
        }
    }, [])


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

    const saveLocal = () => {
        storageManager.chartData.save(store.chartData)
    }

    const openFullscreenMode = () => {
        setIsFullscreen(true)
        handle.enter().then(r => console.log(r))
    }

    useEffect(() => {
        if (handle.active && isFullscreen)
            setIsFullscreen(false)
    }, [handle.active])


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
                    <NullData/>
                    :
                    <>

                        <div className="sunburst-chart-block" ref={refChartBlock}>
                            <SunburstBlock parentRef={refChartBlock}/>
                        </div>
                        {
                            !isPrintMode
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

// {
//     isPrintMode
//         ?
//         <>
//             <SunburstBlock parentRef={refChartBlock} isPrintMode={isPrintMode}/>
//         </>
//         :
//         <>
//             <div className="sunburst-chart-block" ref={refChartBlock}>
//                 <SunburstBlock parentRef={refChartBlock}/>
//             </div>
//
//             <div className="control-block">
//                 <ChartMenu
//                     clear={clear}
//                     saveLocal={saveLocal}
//                     openFullscreenMode={openFullscreenMode}
//                     setIsPrintMode={setIsPrintMode}
//                 />
//                 <Serialization/>
//             </div>
//             <FullScreen handle={handle}>
//                 <SunburstChartFullscreen isView={handle.active}/>
//             </FullScreen>
//         </>
// }