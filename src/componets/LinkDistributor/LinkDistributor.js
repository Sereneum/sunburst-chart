import React, {useEffect} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button, Stack, Text, Image,
    Box
} from '@chakra-ui/react'

import link_guide_1 from '../../materials/link_guide_1.png'


const LinkDistributor = ({isOpenLinkDistributor, setIsOpenLinkDistributor}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    useEffect(() => {
        if (isOpenLinkDistributor) onOpen()
    }, [isOpenLinkDistributor])

    const closeModal = () => {
        setIsOpenLinkDistributor(false);
        onClose();
    }



    return (
        <Modal isOpen={isOpen} onClose={closeModal} size='xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Создатель ссылок</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={3}>
                        <Text fontSize='md'>
                            Кликните на нужный файл и после
                            этого нажмите на иконку ссылки на верхней панели,
                            чтобы перейти в настройки доступа:</Text>
                        {/*<Box boxSize='md' style={{margin: 'auto'}}>*/}
                            <Image src={link_guide_1} />
                        {/*</Box>*/}
                        <Text fontSize='md'>
                            В открывшемся окне выберите "Доступные всем пользователям, у которых есть ссылка":</Text>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={closeModal}>
                        Выйти
                    </Button>
                    {/*<Button variant='ghost'>Secondary Action</Button>*/}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default LinkDistributor;