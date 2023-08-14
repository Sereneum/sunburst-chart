import React, {useEffect, useState} from 'react';
import './serialization.css'
import {DotsSixVertical, Trash} from '@phosphor-icons/react'

const SerializationItemControl = ({item, deep, changeName, deleteFamily}) => {

    const [input, setInput] = useState(item.name)

    useEffect(() => {
        if(input !== item.name) setInput(item.name)
    }, [item.name])

    const change = value => {
        if (!value) return
        setInput(value)
    }

    const leave = () => {
        if (input !== item.name)
            changeName(input)
    }


    return (
        <div className="flex">
            <DotsSixVertical
                className="move-item"
                weight="bold"
            />
            <input
                type="text"
                className="form-control"
                value={input}
                onChange={e => change(e.currentTarget.value)}
                onBlur={leave}
            />
            {
                !!deep
                &&
                <Trash
                    className="trash"
                    onClick={deleteFamily}
                />
            }
        </div>
    );
};

export default SerializationItemControl;