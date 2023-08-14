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

const NullData = ({update}) => {

    const [mode, setMode] = useState(null)

    /* открывает модальное окно с загрузкой файлов */
    const fileLoading = () => {
        setMode('file')
    }

    return (
        <>
            <Modals mode={mode} setMode={setMode} update={update}/>

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
                                <MenuItem type="file" onClick={fileLoading}>
                                    Заргузить .json файл
                                </MenuItem>
                                <MenuItem>
                                    Загрузить по ссылке
                                </MenuItem>
                                <MenuItem>
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