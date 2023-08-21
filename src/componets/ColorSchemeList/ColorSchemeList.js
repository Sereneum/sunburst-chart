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
import {storageManager} from "../../managers/storageManager";

const ColorSchemeList = ({isOpenColorScheme, setIsOpenColorScheme, colorScheme, saveColorScheme}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const init = () => {
        try {
            let index = Object.keys(colorSchemesObject).indexOf(colorScheme)
            if(index >= 0) return index.toString()
            else return '1'
        } catch (e) {
            return '1'
        }
    }

    const [radioValue, setRadioValue] = useState(Object.keys(colorSchemesObject).indexOf(colorScheme).toString())


    useEffect(() => {
        if (isOpenColorScheme) onOpen()
    }, [isOpenColorScheme])

    const closeModal = () =>
        onClose();

    const save = () => {
        let key = Object.keys(colorSchemesObject)[Number(radioValue)]
        console.log(key)
        storageManager.colorScheme.save(key)
        saveColorScheme(key)
        setIsOpenColorScheme(false)
        closeModal()
    }



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
                    <Button colorScheme='blue' mr={3} onClick={save}>
                        Сохранить
                    </Button>
                    <Button variant='ghost' onClick={closeModal}>Закрыть</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ColorSchemeList;