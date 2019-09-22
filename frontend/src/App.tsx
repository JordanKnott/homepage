import React from 'react';
import './App.scss';

import SearchPage from './page/SearchPage';
import BookmarkPage from './page/BookmarkPage';
import PageToggleIcon from './component/PageToggleIcon';

class App extends React.Component {
    state = {
        showBookmarkPage: false
    }
    handlePageToggle = (e: React.ChangeEvent<HTMLButtonElement>): void => {
        this.setState({showBookmarkPage: this.state.showBookmarkPage ? false : true});
    }
    render() {
        const {showBookmarkPage} = this.state;
        return (
            <div className="container">
                {showBookmarkPage ? <BookmarkPage /> : <SearchPage />}
                <PageToggleIcon onPageToggle={this.handlePageToggle} />
            </div>
        );
    }


}

export default App;
