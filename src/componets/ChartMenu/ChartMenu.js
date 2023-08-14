import React from 'react';

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider, Button,
} from '@chakra-ui/react'
import {ChevronDownIcon} from "@chakra-ui/icons";

const ChartMenu = ({clear, saveLocal, openFullscreenMode}) => {
    return (
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
                    <MenuItem>
                        Печать
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
};

export default ChartMenu;