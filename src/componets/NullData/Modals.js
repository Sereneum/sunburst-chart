import React from 'react';
import ModalFileLoader from "./ModalFileLoader";


const Modals = ({mode, setMode, load}) => {


    return (
        <>
            <ModalFileLoader active={mode === 'file'} setMode={setMode} load={load}/>
        </>
    );
};

export default Modals;