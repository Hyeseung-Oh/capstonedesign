import React, { useState } from 'react';
import './imagebutton.css';

export default function Imagebutton(props) {
    const { image, alt, onClick, className, type, buildingName } = props;
    const [isHovered, setIsHovered] = useState(false);
    const defaultType = 'building';

    const handleClick = (buildingPath, params) => {
        if (params) {
            console.log("Clicked path:", buildingPath, params.name);
            onClick(`${buildingPath}/${params.name}`);
        } else {
            console.log("Clicked path:", buildingPath);
            onClick(buildingPath);
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const btnClass = `Imagebutton ${className} ${type === 'building' ? 'buildingbtn' : ''} ${type === 'bottom' ? 'bottombtn' : ''} ${!type ? defaultType : ''}`;

    return (
        <button
            className={btnClass}
            onClick={() => handleClick(props.path, props.params)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img src={image} alt={alt} type={type} />
            {isHovered && buildingName && (
                <div className="buildinginfo">
                    <span>{buildingName}</span>
                </div>
            )}
        </button>
    );
}