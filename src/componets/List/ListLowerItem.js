import React from 'react';
import './list.css'
import ListItem from "./ListItem";

const ListLowerItem = ({item, deep}) => {
    return (
        <li>
            {/*<div className="name">*/}
            {/*    {`ур-нь - ${deep}: ${item.name}`}*/}
            {/*</div>*/}

            <ListItem item={item} deep={deep}/>
        </li>
    );
};

export default ListLowerItem;