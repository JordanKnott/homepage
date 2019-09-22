import React from 'react';

import './BookmarkIcon.scss';

const BookmarkIcon: React.FC<{iconUrl: string}> = ({iconUrl}) => {
    return (
        <div className="bookmark-icon">
            <img src={iconUrl} alt="icon" />
        </div>
    );
}

export default BookmarkIcon;
