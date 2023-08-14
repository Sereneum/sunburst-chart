import React from 'react';
import SerializationItemControl from "./SerializationItemControl";
import SerializationItemChildren from "./SerializationItemChildren";
import './serialization.css'
import {DotsSixVertical} from "@phosphor-icons/react";

const SerializationItem = ({item, deep, index, prev = [], changeData}) => {
    const prevForChild = [...prev, {deep, index}]

    const changeName = name => {
        changeData({
            deep, index, prev, modifiedData: {
                type: 'name',
                value: name
            }
        })
    }

    const deleteFamily = () => {
        changeData({
            deep, index, prev, modifiedData: {
                type: 'delete'
            }
        })
    }


    return (
        <li>
            <SerializationItemControl
                item={item}
                deep={deep}
                changeName={changeName}
                deleteFamily={deleteFamily}
            />

            {item.children
                &&
                <ol>
                    {item.children?.map((item, childrenIndex) =>
                        <SerializationItem
                            item={item}
                            deep={deep + 1}
                            index={childrenIndex}
                            prev={prevForChild}
                            changeData={changeData}
                            key={`${deep}_${childrenIndex}`}
                        />)}
                </ol>
            }
        </li>
    )

    // return (
    //     <li>
    //         <SerializationItemControl
    //             item={item}
    //             deep={0}
    //             index={0}
    //             prev={prevForChild}
    //             changeData={changeData}
    //         />
    //         <SerializationItemChildren
    //             children={item?.children}
    //             deep={0}
    //             index={0}
    //             prev={prevForChild}
    //             changeData={changeData}
    //         />
    //     </li>
    // );
};

export default SerializationItem;