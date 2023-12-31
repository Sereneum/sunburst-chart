import React, {useEffect, useState} from 'react';
import './serialization.css'
import {DotsSixVertical, Trash, Plus, ArrowsOutSimple} from '@phosphor-icons/react'

const SerializationItemControl = ({item, deep, changeName, deleteFamily, addChild}) => {

    const [input, setInput] = useState(item.name ? item.name : '')

    useEffect(() => {
        if (input !== item.name) setInput(item.name)
    }, [item.name])

    const change = value => {
        setInput(value)
    }

    const leave = () => {
        if (input !== item.name)
        changeName(input)
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter' && input !== item.name)
            changeName(input)
    }


    return (
        <div className="flex">
            <input
                type="text"
                className="form-control"
                value={input}
                onChange={e => change(e.currentTarget.value)}
                onBlur={leave}
                onKeyDown={handleKeyDown}
            />
            <Plus
                className="serialization-icon"
                onClick={() => addChild('')}
            />
            {
                !!deep
                &&
                <Trash
                    className="serialization-icon"
                    onClick={deleteFamily}
                />
            }
        </div>
    );
};

export default SerializationItemControl;