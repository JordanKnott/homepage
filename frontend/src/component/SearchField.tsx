import React from 'react';

import './SearchField.scss';

interface SearchFieldProps {
    onSearchFieldChange(e: React.ChangeEvent<HTMLInputElement>): void
    onSearchSelectionChange(indexDelta: number): void
    onSearchAction(): void
    selectedResult: any
}

class SearchField extends React.Component<SearchFieldProps> {
    handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.key === "Tab" && e.shiftKey) {
            e.preventDefault();
            this.props.onSearchSelectionChange(-1);
        } else if (e.key === "Tab") {
            e.preventDefault();
            this.props.onSearchSelectionChange(1);
        } else if (e.key === "Enter") {
            this.props.onSearchAction();
        }
    }
    render() {
        let actionContent;
        if (this.props.selectedResult === null) {
            actionContent = (
                <div className="search-field-action-data">
                    <span className="clock">14:00:12</span>
                </div>
            );
        } else {
            actionContent = (
                <div className="search-field-action-data">
                    <div className="full-path">
                        <span className="name">{this.props.selectedResult.name}</span>
                    </div>
                    <div className="meta">
                        <span className="action-type">{this.props.selectedResult.actionType}</span>
                        {this.props.selectedResult.section && <span className="separator">//</span>}
                        {this.props.selectedResult.section &&
                            <span className="group">{this.props.selectedResult.section}</span>}
                        </div>
                    </div>
            );
        }

        return (
            <div className="search-field-row">
                <div className="search-field">
                    <div className="row">
                        <span className="display">Welcome</span>
                        <span className="separator">//</span>
                        <input onKeyDown={this.handleKeyDown}
                        onChange={this.props.onSearchFieldChange} className="input" type="text" />
                    </div>
                </div>
                <div className="search-field-action">
                    <img src="/bookmark.png" alt="bookmark"/>
                    {actionContent}
                </div>
            </div>
        );
    }
}

export default SearchField;
