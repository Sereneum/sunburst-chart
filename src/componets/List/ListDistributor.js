import ListUpperItem from "./ListUpperItem";
import ListLowerItem from "./ListLowerItem";

export const ListDistributor = (item, index, deep) => {
    if(item?.children)
        return <ListUpperItem item={item} deep={deep + 1} key={`${deep}_${index}`}/>
    else
        return <ListLowerItem item={item} deep={deep + 1} key={`${deep}_${index}`}/>
}



