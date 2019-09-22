import React from 'react';

import {default as SearchResultProps} from '../interface/SearchResult.interface';
import SearchResult from './SearchResult';

import './SearchResultSet.scss';

interface SearchResultSetProps {
    searchResults: Array<SearchResultProps>
    selectionIndex: number
}


const SearchResultSet: React.FC<SearchResultSetProps> = ({searchResults, selectionIndex}) => {
    return (
        <div className="search-result-set">
            {searchResults.map( (searchResult, index) => (
                <SearchResult
                    actionType={searchResult.actionType}
                    name={searchResult.name}
                    href={searchResult.href}
                    key={index}
                    selected={index === selectionIndex ? true : false }/>
            ))}
        </div>
    );
}

export default SearchResultSet;
