import React from 'react';
import './list.css'

const ListItem = ({item, deep}) => {
    return (
        <div className="add_with_name">
            <div className="name">
                {`ур-нь - ${deep}: ${item.name}`}
            </div>

            {/*<button className="add"/>*/}
        </div>
    );
};

export default ListItem;