import React, {createRef, useEffect} from 'react';
import Dropzone from 'react-dropzone'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, useDisclosure
} from '@chakra-ui/react'
import {CloudArrowUp, File} from "@phosphor-icons/react";

const ModalFileLoader = ({active, setMode, load}) => {

    const {isOpen, onOpen, onClose} = useDisclosure()

    useEffect(() => {
        if (active) onOpen()
    }, [active])

    useEffect(() => {
        if (active && !isOpen) setMode(null)
    }, [isOpen])

    const loaded = dataFile => {
        load(dataFile)
    }

    const onDrop = (acceptedFiles) => {
        if(!acceptedFiles.length) return
        const file = acceptedFiles[0]
        const reader = new FileReader()
        reader.onload = () => {
            const fileContent = reader.result;
            // console.log(fileContent, typeof(fileContent))
            let jsonData = null

            try {
                jsonData = JSON.parse(fileContent)
                console.log(jsonData)
                loaded(jsonData)
            } catch (e) {

            }

            // const jsonData = JSON.parse(fileContent);


        }
        reader.readAsText(file);
    }


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Загрузка .json файла</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Dropzone onDrop={onDrop} accept={{ "data/json": [".json"]}} maxFiles={1}>
                            {({getRootProps, getInputProps, onDropAccepted}) => (
                                <div {...getRootProps()} className="attach_cover">
                                    <input {...getInputProps()} />
                                    <div className="attach_container">
                                        <CloudArrowUp weight="bold" className="icon_big" size={"40px"}/>
                                        <p>Выберите файл с устройства или перетащите его в это окно</p>
                                    </div>
                                </div>
                            )}
                        </Dropzone>
                    </ModalBody>

                    <ModalFooter>
                        {/*<Button colorScheme='gray' mr={3} onClick={onClose}>*/}
                        {/*    Закрыть*/}
                        {/*</Button>*/}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalFileLoader;