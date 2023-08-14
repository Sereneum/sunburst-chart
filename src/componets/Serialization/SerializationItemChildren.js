import React from 'react';
import './serialization.css'
import SerializationItem from "./SerializationItem";

const SerializationItemChildren = ({children, deep, index, prev, changeData}) => {

    if(!children) return

    return (
        <ol>
            {children.map((item, childrenIndex) =>
                <SerializationItem
                    item={item}
                    deep={deep + 1}
                    index={childrenIndex}

                    key={`${deep}_${childrenIndex}`}
                />)}
        </ol>
    );
};

export default SerializationItemChildren;