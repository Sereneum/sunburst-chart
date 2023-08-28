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
import {jsonDownloader} from "../../managers/fileManager";
import ColorSchemeList from "../ColorSchemeList/ColorSchemeList";



const ChartMenu = observer(({clear, saveLocal, openFullscreenMode, setIsPrintMode}) => {

    const [isOpenSlider, setIsOpenSlider] = useState(false)
    const [isOpenColorScheme, setIsOpenColorScheme] = useState(false)
    // const [isOpenLinkDistributor, setIsOpenLinkDistributor] = useState(false)

    const {store} = useContext(Context)

    const openMultiRadiusMenu = () =>
        setIsOpenSlider(true);


    const openColorSchemeList = () =>
        setIsOpenColorScheme(true);


    const saveCustomRadius = customRadius =>
        store.setCustomRadius(customRadius);

    const saveColorScheme = colorScheme =>
        store.setColorScheme(colorScheme)

    const openPrintWindow = () => {
        setIsPrintMode(true);
        setTimeout(() => window.print(), 100);

        window.addEventListener("afterprint", function (event) {
            setIsPrintMode(false);
        });

    }

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
                        {/*<MenuItem onClick={openLinkDistributor}>*/}
                        {/*    Поделится ссылкой с данными*/}
                        {/*</MenuItem>*/}
                        <MenuItem onClick={clear}>
                            Сменить данные
                        </MenuItem>
                        <MenuItem onClick={openFullscreenMode}>
                            Отобразить в полноэкранном режиме
                        </MenuItem>
                        <MenuItem
                            onClick={openMultiRadiusMenu}
                        >
                            Изменить размеры
                        </MenuItem>
                        <MenuItem onClick={openPrintWindow}>
                            Печать
                        </MenuItem>
                        {/*<MenuItem onClick={svgDownloader}>*/}
                        {/*    Скачать изображение*/}
                        {/*</MenuItem>*/}
                        <MenuItem onClick={openColorSchemeList}>
                            Изменить цветовую тему
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

            {
                isOpenColorScheme
                &&
                <ColorSchemeList
                    isOpenColorScheme={isOpenColorScheme}
                    setIsOpenColorScheme={setIsOpenColorScheme}
                    colorScheme={store.colorScheme}
                    saveColorScheme={saveColorScheme}
                />
            }
            {/*{*/}
            {/*    isOpenLinkDistributor*/}
            {/*    &&*/}
            {/*    <LinkDistributor*/}
            {/*        isOpenLinkDistributor={isOpenLinkDistributor}*/}
            {/*        setIsOpenLinkDistributor={setIsOpenLinkDistributor}*/}
            {/*    />*/}
            {/*}*/}
        </>
    );
});

export default ChartMenu;