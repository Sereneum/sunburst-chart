import './index.css'
import testData from './data/testData.json'
import bigData from './data/data.json'
import {useState} from "react";
import Serialization from "./componets/Serialization/Serialization";
import SunburstBlock from "./componets/SunburstBlock/SunburstBlock";


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
    const [data, setData] = useState(testData)

    const addInNode = name => {
        let newChildren = data.children
        newChildren.push({
            name,
            value: 10
        })

        setData({name: data.name, children: newChildren})
    }

    const globalSetData = (d) => {
        setData(d)
    }

    // useEffect(() => {
    //     console.log('Данные были изменены')
    // }, [data])


    return (
        <div className="main-block">

            <div className="sunburst-chart-block">
                <SunburstBlock data={data}/>
            </div>

            <div className="control-block">
                <Serialization data={data} setData={globalSetData}/>
            </div>

            {/*<div className="control-chart-block">*/}
            {/*    <List data={data}/>*/}
            {/*    <NodeControl data={data} addInNode={addInNode}/>*/}
            {/*</div>*/}


        </div>
    );
}

export default App;
