import './index.css'
import testData from './data/testData.json'
import bigData from './data/data.json'
import {useState} from "react";
import Serialization from "./componets/Serialization/Serialization";
import SunburstBlock from "./componets/SunburstBlock/SunburstBlock";
import ChartMenu from "./componets/ChartMenu/ChartMenu";
import NullData from "./componets/NullData/NullData";


/*
    Кнопка удаления
    Реализация удаления элемента и его детей xd
    Кнопка создания нового элемента
    Перемещение элементов
    Пользовательсая настройка цветов
    Кнопка смены цвета
    Реализация смены цвета
    Перенос текста
    Выделение и подсказки
    Выбор новой верхушки
    Анимации
    Загрузка и сохранение файлов
    UI
    Размеры
    Ссылка на файл из облака в url
*/


function App() {
    const isDataNull = true
    const [data, setData] = useState(isDataNull ? null : testData)

    const addInNode = name => {
        let newChildren = data.children
        newChildren.push({
            name,
            value: 10
        })

        setData({name: data.name, children: newChildren})
    }

    const globalSetData = (d) => {
        console.log('globalSetData: ', d)
        setData(d)
    }

    return (
        <div className="main-block">

            {
                data === null
                    ?
                    <NullData update={globalSetData}/>
                    :
                    <>
                        <div className="sunburst-chart-block">
                            <SunburstBlock data={data}/>
                        </div>

                        <div className="control-block">
                            <ChartMenu/>
                            <Serialization data={data} setData={globalSetData}/>
                        </div>
                    </>
            }


        </div>
    );
}

export default App;
