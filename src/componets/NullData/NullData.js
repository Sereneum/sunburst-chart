import React, {useContext, useState} from 'react';
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
import Modals from "./Modals";
import {storageManager} from "../../managers/storageManager";
import {Context} from "../../index";

const NullData = () => {

    const [mode, setMode] = useState(null)
    const {store} = useContext(Context)

    /* открывает модальное окно с загрузкой файлов */
    const fileLoading = () => {
        setMode('file')
    }

    const load = data => {
        storageManager.chartData.save(data)
        store.setChartData(data)
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