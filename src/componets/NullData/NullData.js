import React, {useState} from 'react';
import {
    Text,
    Card,
    Heading,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem, useDisclosure,
} from '@chakra-ui/react'

import './NullData.css'
import {ChevronDownIcon} from "@chakra-ui/icons";
import ModalFileLoader from "./ModalFileLoader";
import Modals from "./Modals";

const NullData = ({update, storageManager}) => {

    const [mode, setMode] = useState(null)

    /* открывает модальное окно с загрузкой файлов */
    const fileLoading = () => {
        setMode('file')
    }

    const load = data => {
        storageManager.save(data)
        update(data)
    }

    const voidFile = () => {
        load({name: "root", value: 1})
    }

    return (
        <>
            <Modals mode={mode} setMode={setMode} load={load}/>

            <div className="block">

                <Card align='center'>
                    <CardHeader>
                        <Heading size='md'>Sunburst-chart</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>Данные не загружены</Text>
                    </CardBody>
                    <CardFooter>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                                Выберите способ загрузки данных
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={fileLoading}>
                                    Заргузить .json файл
                                </MenuItem>
                                <MenuItem>
                                    Загрузить по ссылке
                                </MenuItem>
                                <MenuItem onClick={voidFile}>
                                    Ручной ввод
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </CardFooter>
                </Card>
            </div>
        </>)
        ;
};

export default NullData;