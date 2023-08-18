import React, {useContext, useEffect, useState} from 'react';

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react'
import {ChevronDownIcon} from "@chakra-ui/icons";
import MultiRangeSlider from "../RangeSlider/MultiRangeSlider";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {jsonDownloader, svgDownloader} from "../../managers/fileManager";


const ChartMenu = observer(({clear, saveLocal, openFullscreenMode}) => {

    const [isOpenSlider, setIsOpenSlider] = useState(false)
    const {store} = useContext(Context)

    const openMultiRadiusMenu = () => {
        setIsOpenSlider(true)
    }

    const saveCustomRadius = customRadius =>
        store.setCustomRadius(customRadius)


    return (
        <>
            <div style={{'marginTop': 4}}>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                        Действия
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => jsonDownloader(store.chartData)}>
                            Скачать файл
                        </MenuItem>
                        <MenuItem onClick={clear}>
                            Сменить данные
                        </MenuItem>
                        <MenuItem onClick={saveLocal}>
                            Сохранить изменения локально
                        </MenuItem>
                        <MenuItem onClick={openFullscreenMode}>
                            Отобразить в полноэкранном режиме
                        </MenuItem>
                        <MenuItem
                            onClick={openMultiRadiusMenu}
                        >
                            Изменить размеры
                        </MenuItem>
                        <MenuItem>
                            Печать
                        </MenuItem>
                        <MenuItem onClick={svgDownloader}>
                            Скачать изображение
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>

            {
                isOpenSlider
                &&
                <MultiRangeSlider
                    isOpenSlider={isOpenSlider}
                    setOpenSlider={setIsOpenSlider}
                    chartData={store.chartData}
                    customRadius={store.customRadius}
                    setCustomRadius={saveCustomRadius}
                />
            }
        </>
    );
});

export default ChartMenu;