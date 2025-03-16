import React, { useState } from 'react';
import "./hoverbutton.css"

export default function Hoverbutton(props) {
    const { image, alt, className, type, buildingName } = props;
    const [isHovered, setIsHovered] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const defaultType = 'building';

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleTouchStart = () => {
        setIsTouched(true);
    };

    const handleTouchEnd = () => {
        setIsTouched(false);
    };

    const btnClass = `Hoverbutton ${className} ${type === 'building' ? 'buildingbtn' : ''} ${type === 'bottom' ? 'bottombtn' : ''} ${!type ? defaultType : ''}`;

    return (
        <button className={btnClass}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}>
            <img src={image} alt={alt} type={type} />
            {(isHovered || isTouched) && (
                <div className="buildinginfo">
                    <span>{buildingName}</span>
                </div>
            )}
        </button>
    );
};