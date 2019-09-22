import React from 'react';

import './PageToggleIcon.scss';

interface PageToggleIconProps {
    onPageToggle(e: any): void
}

const PageToggleIcon: React.FC<PageToggleIconProps> = ({onPageToggle}) => {
    return (
        <div className="page-toggle-icon" onClick={onPageToggle}>
            <img src='/bookmark.png' alt="icon" />
        </div>
    );
}

export default PageToggleIcon;
