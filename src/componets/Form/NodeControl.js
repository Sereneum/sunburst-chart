import React, {useState} from 'react';
import './NodeControl.css'

const NodeControl = ({data, addInNode}) => {
    const [name, setName] = useState('')

    const add = () => {
        if(!name) return

        addInNode(name)
        setName('')
    }

    return (
        <div className="NodeControl">
            <input
                value={name}
                onChange={e => setName(e.currentTarget.value)}
            />
            <button onClick={add}/>
        </div>
    );
};

export default NodeControl;