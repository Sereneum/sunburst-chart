import React from 'react';
import './list.css'

import ListUpperItem from "./ListUpperItem";
import {ListDistributor} from "./ListDistributor";

const List = ({data}) => {


    /*

    0-уровень
        1-уровень
        1-уровень
            2..

     */

    console.log('data -> ', data)

    return (
        <ol>
            {
                data.children.map((item, index) =>
                    ListDistributor(item, index, 0))
            }
        </ol>
        // <div>
        //     <ol>
        //         <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus, erat.</li>
        //         <li>
        //             Fusce ac egestas tortor. Suspendisse fringilla velit quis nunc ornare.
        //             <ol>
        //                 <li>
        //                     Quisque sed congue eros, eu lacinia mauris. Phasellus non finibus mi.
        //                     <ol>
        //                         <li>Nunc sem lorem, hendrerit in luctus eget, egestas in mi.</li>
        //                         <li>Suspendisse mollis nunc vitae mi luctus, eu viverra est.</li>
        //                     </ol>
        //                 </li>
        //                 <li>Nam pharetra consectetur egestas. Sed nec auctor odio. In viverra.</li>
        //             </ol>
        //         </li>
        //         <li>Vivamus pulvinar a libero tempor auctor. Duis commodo turpis at turpis rhoncus.</li>
        //     </ol>
        // </div>
    );
};

export default List;