import './index.css'
import testData from './data/testData.json'
import bigData from './data/data.json'
import {useEffect, useState} from "react";
import Serialization from "./componets/Serialization/Serialization";
import SunburstBlock from "./componets/SunburstBlock/SunburstBlock";
import ChartMenu from "./componets/ChartMenu/ChartMenu";
import NullData from "./componets/NullData/NullData";
import {FullScreen, useFullScreenHandle} from "react-full-screen";
import SunburstChartFullscreen from "./componets/SunburstChart/SunburstChartFullscreen";
import SunburstChartGpt from "./componets/SunburstChart/SunburstChartGpt";


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


function App() {
    const isDataNull = true
    // const [data, setData] = useState(isDataNull ? null : testData)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const handle = useFullScreenHandle()
    // console.log('handle', handle)

    const globalSetData = (d) => {
        console.log('globalSetData: ', d)
        setData(d)
    }

    const storageManager = {
        key: 'chart-data',
        save: function () {
            return localStorage.setItem(this.key, JSON.stringify(data))
        },
        clear: function () {
            localStorage.setItem(this.key, null)
        },
        get: function () {
            return JSON.parse(localStorage.getItem(this.key))
        }
    }


    useEffect(() => {
        try {
            let storageData = storageManager.get()
            setData(storageData)
            setLoading(false)
        } catch (e) {
            console.log('ОШИБКА ЧТЕНИЯ ФАЙЛА ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА')
            setLoading(false)
        }
    }, [])

    const clear = () => {
        storageManager.clear()
        setData(null)
    }

    const saveLocal = () => {
        storageManager.save()
    }

    const openFullscreenMode = () => {
        setIsFullscreen(true)
        handle.enter().then(r => console.log(r))
    }

    useEffect(() => {
        if (handle.active && isFullscreen)
            setIsFullscreen(false)
    }, [handle.active])

    if (loading) return <></>

    return (
        <div className="main-block">
            {
                data === null
                    ?
                    <NullData update={globalSetData} storageManager={storageManager}/>
                    :
                    <>
                        <div className="sunburst-chart-block">
                            {/*<SunburstChartGpt data={data}/>*/}
                            <SunburstBlock data={data}/>
                        </div>

                        <div className="control-block">
                            <ChartMenu
                                clear={clear}
                                saveLocal={saveLocal}
                                openFullscreenMode={openFullscreenMode}
                            />
                            <Serialization data={data} setData={globalSetData}/>
                        </div>
                        <FullScreen handle={handle}>
                            <SunburstChartFullscreen isView={handle.active} data={data}/>
                        </FullScreen>
                    </>
            }
        </div>
    );
}

export default App;
