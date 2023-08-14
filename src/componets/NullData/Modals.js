import React from 'react';
import ModalFileLoader from "./ModalFileLoader";

const Modals = ({mode, setMode, update}) => {


    return (
        <>
            <ModalFileLoader active={mode === 'file'} setMode={setMode} update={update}/>
        </>
    );
};

export default Modals;