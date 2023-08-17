import React, {useEffect, useRef, useState} from 'react';
import '../../index.css'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, useDisclosure,
} from '@chakra-ui/react'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';



const MultiRangeSlider = ({isOpenSlider, setOpenSlider, data, customRadius, setCustomRadius}) => {

    const funcDepth = (root, depth, mxd) => {
        if(!('children' in root)) return depth

        for(let children of root.children) {
            let d = funcDepth(children, depth + 1, mxd)
            if(d > mxd) mxd = d
        }

        return mxd
    }

    const mdx = funcDepth(data, 0, 0)

    const createValues = mdx => {
        let arr = [100/(mdx + 1)]
        for(let i = 1; i < mdx + 1; ++i)
            arr.push(arr[i - 1] + arr[0])

        return arr
    }

    const getValues = values => {
        let arr = [values[0]]
        for(let i = 1; i < values.length; ++i)
            arr.push(values[i] - values[i - 1])

        return arr
    }


    const offset = 10;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const tooltipRef = useRef(null);

    useEffect(() => {
        if(isOpenSlider) onOpen()
    }, [isOpenSlider])

    useEffect(() => {
        setOpenSlider(false)
    }, [isOpen])

    const [sliderValues, setSliderValues] = useState(customRadius ? customRadius : createValues(mdx));

    const handleChange = (values) => {
        values[values.length - 1] = sliderValues[sliderValues.length - 1];
        if(values[0] < offset) values[0]  = offset;
        setSliderValues(values);


    }


    const creatMarks = values => {

        let marks = {}
        for(let i = 0; i < values.length; ++i)
            marks[values[i]] = <span style={{ whiteSpace: 'pre-line' }}>{`segment: ${i}\n value: ${values[i]}%`}</span>
        return marks
    }

    const createStyles = len => {
        let styles = new Array(len)

        for(let i = 0; i < len; ++i) {
            if(i === len - 1) {
                styles[i] = {'cursor': 'not-allowed', 'borderColor': 'lightgray'}
            }
            else {
                styles[i] = {'cursor': 'grab'}
            }
        }


        return styles
    }

    const customHandle = e => {
        return e
    }

    const save = () => {
        setCustomRadius(sliderValues)
        onClose()
    }



    return (
           <>
               <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                   <ModalOverlay />
                   <ModalContent>
                       <ModalHeader>Контроль размеров</ModalHeader>
                       <ModalCloseButton />

                       <ModalBody style={{'margin': '0 40px', 'marginTop': 30}} >
                           {/*<Slider  count={3} min={0} max={0} value={sliderValues} onChange={handleChange}/>*/}
                           <Slider
                               value={sliderValues}
                               count={3}
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

                       <ModalFooter style={{marginTop: 40}}>
                           <Button colorScheme='blue' mr={3} onClick={save} >
                               Сохранить
                           </Button>
                           <Button variant='ghost' onClick={onClose}>Не сохранять</Button>
                       </ModalFooter>
                   </ModalContent>
               </Modal>
               <div ref={tooltipRef} style={{display: "none"}} className="slider-tooltip">{'0%'}</div>
           </>
    );
};

export default MultiRangeSlider;