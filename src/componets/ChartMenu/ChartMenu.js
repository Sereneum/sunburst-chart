import React, {useState} from 'react';

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider, Button, useDisclosure, RangeSlider,
} from '@chakra-ui/react'
import {ChevronDownIcon} from "@chakra-ui/icons";
import MultiRangeSlider from "../RangeSlider/MultiRangeSlider";



const ChartMenu = ({clear, saveLocal, openFullscreenMode, data, customRadius, setCustomRadius}) => {

    const [isOpenSlider, setIsOpenSlider] = useState(false)


    return (
        <>
            <div style={{'marginTop': 4}}>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                        Действия
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
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
                            onClick={() => setIsOpenSlider(true)}
                        >
                            Изменить размеры
                        </MenuItem>
                        <MenuItem>
                            Печать
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>

            <MultiRangeSlider
                isOpenSlider={isOpenSlider}
                setOpenSlider={setIsOpenSlider}
                customRadius={customRadius}
                setCustomRadius={setCustomRadius}
                data={data}
            />
        </>
    );
};

export default ChartMenu;