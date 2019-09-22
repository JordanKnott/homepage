import React from 'react';
import {default as SearchResultProps} from '../interface/SearchResult.interface';

import './SearchResult.scss';

const SearchResult: React.FC<SearchResultProps> = ({name, href, actionType, selected}) => {
    return (
        <div className={selected ? "search-result selected" : "search-result"}>
            <a href={href}>
                <span className="name">{name}</span>
                <span className="actionType">{actionType}</span>
            </a>
        </div>
    );
}

export default SearchResult;
