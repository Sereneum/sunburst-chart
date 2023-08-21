import React, {useContext, useEffect, useRef, useState} from 'react';
import '../../index.css'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, useDisclosure, Text,
} from '@chakra-ui/react'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Context} from "../../index";
import {storageManager} from "../../managers/storageManager";
import {WarningOctagon} from "@phosphor-icons/react";


const MultiRangeSlider = ({isOpenSlider, setOpenSlider, chartData, customRadius, setCustomRadius}) => {

    const funcDepth = (root, depth, mxd) => {
        if (!('children' in root)) return depth

        for (let children of root.children) {
            let d = funcDepth(children, depth + 1, mxd)
            if (d > mxd) mxd = d
        }

        return mxd
    }


    const mdx = funcDepth(chartData, 0, 0)
    // console.log('mdx', mdx)

    const createValues = mdx => {
        let arr = [100 / (mdx + 1)]
        for (let i = 1; i < mdx + 1; ++i)
            arr.push(arr[i - 1] + arr[0])

        return arr
    }
    const offset = 5;

    const {isOpen, onOpen, onClose} = useDisclosure();
    const tooltipRef = useRef(null);

    /*  */
    useEffect(() => {
        if (isOpenSlider) onOpen()
    }, [isOpenSlider])


    const closeModal = () => {
        setOpenSlider(false)
        onClose()
    }


    const [sliderValues, setSliderValues] = useState(customRadius ? customRadius : createValues(mdx));

    // console.log('sliderValues = ', sliderValues)


    /* случай, когда данные обнуляются */
    useEffect(() => {
        if(customRadius === null)
            setSliderValues(createValues(mdx))
    }, [customRadius])

    // useEffect(() => {
    //     if(customRadius === null) return
    //
    //     if(chartData !== null && chartData.length !== sliderValues?.length)
    //         setSliderValues(createValues(mdx))
    //
    // }, [chartData])


    /* двигаем ползунок */
    const handleChange = (values) => {
        values[values.length - 1] = 100
        if (values[0] < offset) values[0] = offset;
        setSliderValues(values);
    }


    const creatMarks = values => {

        let marks = {}
        for (let i = 0; i < values.length; ++i)
            marks[values[i]] = <span style={{whiteSpace: 'pre-line'}}>{`segment: ${i}\n value: ${Math.round(values[i], 0)}%`}</span>
        return marks
    }

    const createStyles = len => {
        let styles = new Array(len)

        for (let i = 0; i < len; ++i) {
            if (i === len - 1) {
                styles[i] = {'cursor': 'not-allowed', 'borderColor': 'lightgray'}
            } else {
                styles[i] = {'cursor': 'grab'}
            }
        }


        return styles
    }

    const customHandle = e => {
        return e
    }

    const save = () => {
        // console.log('save -> sliderValues', sliderValues)
        setCustomRadius(sliderValues)
        storageManager.customRadius.save(sliderValues)
        closeModal()
    }


    return (
        <>
            <Modal isOpen={isOpen} onClose={closeModal} size='xl'>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Контроль размеров</ModalHeader>
                    <ModalCloseButton/>

                    {
                        mdx
                            ?
                            <ModalBody style={{'margin': '0 40px', 'marginTop': 30}}>
                                <Slider
                                    value={sliderValues}
                                    count={mdx}
                                    range={true}
                                    onChange={handleChange}
                                    startPoint={0}
                                    allowCross={false}
                                    pushable={offset}
                                    marks={creatMarks(sliderValues)}
                                    handleStyle={createStyles(sliderValues.length)}
                                    railStyle={{'backgroundColor': '#abe2fb'}}
                                    handleRender={customHandle}
                                />
                            </ModalBody>
                            :
                            <div style={{display: 'flex'}}>
                                <WarningOctagon
                                    size={24}
                                    style={{
                                        marginLeft: 24, alignContent: 'center',
                                        verticalAlign: 'center', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                />
                                <Text noOfLines={1} style={{marginLeft: 4}}>
                                    Слишком мало данных.
                                </Text>
                            </div>

                    }

                    <ModalFooter style={{marginTop: 40}}>
                        {
                            mdx
                                ?
                                <>
                                    <Button colorScheme='blue' mr={3} onClick={save}>
                                        Сохранить
                                    </Button>
                                    <Button variant='ghost' onClick={closeModal}>Не сохранять</Button>
                                </>
                                :
                                <Button colorScheme='blue' mr={3} onClick={closeModal}>
                                    Выйти
                                </Button>
                        }

                    </ModalFooter>
                </ModalContent>
            </Modal>
            <div ref={tooltipRef} style={{display: "none"}} className="slider-tooltip">{'0%'}</div>
        </>
    );
};

export default MultiRangeSlider;