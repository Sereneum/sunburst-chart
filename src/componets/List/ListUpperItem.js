import React from 'react';
import './list.css'
import {ListDistributor} from "./ListDistributor";
import ListItem from "./ListItem";

const ListUpperItem = ({item, deep}) => {

    // console.log(item.children)

    return (
       <li>
           {/*<div className="name">*/}
           {/*    {`ур-нь - ${deep}: ${item.name}`}*/}
           {/*</div>*/}

           <ListItem item={item} deep={deep}/>

           <ol>
               {
                   item.children.map((i, index) =>
                       ListDistributor(i, index, deep))
               }
           </ol>
       </li>
    );
};

export default ListUpperItem;