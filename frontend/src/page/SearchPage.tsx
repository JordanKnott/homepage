import React from 'react';

import Fuse from 'fuse.js';

import {default as SearchResultProps} from '../interface/SearchResult.interface';
import SearchField from '../component/SearchField';
import BookmarkIcon from '../component/BookmarkIcon';
import SearchResultSet from '../component/SearchResultSet';

class SearchPage extends React.Component {
    state = {
        display: "Welcome",
        searchInput: "",
        selectionIndex: 0,
        bookmarks: [
            {
                name: "Gmail",
                href: "https://gmail.com",
                section: "Development"
            }, {
                name: "My Blog",
                href: "https://jordanknott.com",
                section: "General"
            }, {
                name: "WPEngine",
                href: "https://wpengine.com",
                section: "General"
            }
        ],
        searchResults: [],
        _searchResults: [{
            name: "WPEngine",
            href: "https://google.com",
            actionType: "bookmark"
        }, {
            name: "drivendigital.us",
            href: "https://drivendigital.us",
            actionType: "direct"
        }, {
            name: "Google",
            href: "https://google.com+example",
            actionType: "search"
        }, {
            name: "Gmail",
            href: "https://gmail.com",
            actionType: "priority"
        }]
    }

    handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        var results = this.calculateSearchResults(e.target.value);
        this.setState(
            {
                ...this.state,
                searchInput: e.target.value,
                searchResults: results,
                selectionIndex: 0
            }
        );
    }

    handleSearchSelectionChange = (indexDelta: number): void => {
        var newIndex = this.state.selectionIndex + indexDelta;
        if (newIndex < 0 || this.state.searchResults.length <= newIndex ) {
            return;
        }
        this.setState({
            ...this.state,
            selectionIndex: this.state.selectionIndex + indexDelta
        });
    }

    calculateSearchResults = (searchInput: string): Array<SearchResultProps> => {
        if (searchInput === "") {
            return [];
        }
        var options = {
            shouldSort: true,
            threshold: 0.3,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                {name: 'name', weight: .7},
                {name: 'href', weight: .3},
            ]
        };
        var fuse = new Fuse(this.state.bookmarks, options); // "list" is the item array
        var fuzzyResults = fuse.search(searchInput);
        console.log(fuzzyResults);
        var results: Array<any> = [];
        fuzzyResults.forEach(result => {
            var r = {
                name: result.name,
                href: result.href,
                section: result.section,
                actionType: "bookmark"
            };
            results.push(r);
        })
        results.push({
            name: "Google",
            href: "https://google.com+" + searchInput,
            actionType: "search"
        });

        return results;
    }

    handleSearchAction = () => {
        console.log(this.state.searchResults[this.state.selectionIndex]);
    }

    render() {
        const {searchResults, display, searchInput, selectionIndex } = this.state;
        let selectedResult;
        if (searchResults.length === 0 ) {
            selectedResult = null;
        } else {
            selectedResult = searchResults[selectionIndex];
        }
            return (
                <div className="homepage-wrapper">
                    <div className="icon-row">
                        <BookmarkIcon iconUrl="/firefox.png" />
                    </div>
                    <SearchField
                        onSearchSelectionChange={this.handleSearchSelectionChange}
                        onSearchAction={this.handleSearchAction}
                        onSearchFieldChange={this.handleSearchFieldChange}
                        selectedResult={selectedResult}
                    />
                    <SearchResultSet selectionIndex={selectionIndex} searchResults={searchResults} />
                </div>
            );
    }
}

export default SearchPage;

