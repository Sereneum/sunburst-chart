import React, {useEffect, useState} from 'react';
import {Button, Radio, RadioGroup, Stack, useDisclosure} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import {colorSchemesObject} from "../../managers/colorManager";

const ColorSchemeList = ({isOpenColorScheme, setIsOpenColorScheme, colorScheme, saveColorScheme}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [radioValue, setRadioValue] = useState('0')


    useEffect(() => {
        if (isOpenColorScheme) onOpen()
    }, [isOpenColorScheme])


    const closeModal = () => {
        setIsOpenColorScheme(false)
        onClose()
    }

    useEffect(() => {
        console.log('radioValue', radioValue)
    }, [setRadioValue])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Цветовые темы</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <RadioGroup onChange={setRadioValue} value={radioValue}>
                        <Stack>
                            {
                                Object.keys(colorSchemesObject).map(
                                    (key, index) =>
                                        <Radio
                                            size='md'
                                            colorScheme='green'
                                            value={index.toString()}
                                            key={key}
                                        >
                                            {colorSchemesObject[key].description}
                                        </Radio>
                                )
                            }
                        </Stack>
                    </RadioGroup>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Сохранить
                    </Button>
                    <Button variant='ghost'>Закрыть</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ColorSchemeList;