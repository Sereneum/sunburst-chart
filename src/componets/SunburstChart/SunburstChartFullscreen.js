import React from 'react';
import SunburstBlock from "../SunburstBlock/SunburstBlock";

const SunburstChartFullscreen = ({isView, data}) => {
    const SIZE = Math.floor(window.screen.height - 20)

    return (
        <div>
            {
                isView
                &&
                <SunburstBlock isFullscreen={true} data={data} SIZE={SIZE}/>
            }
        </div>
    );
};

export default SunburstChartFullscreen;