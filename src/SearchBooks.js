import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { BookRow } from "./BookComponents";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  state = {
    query: '',
    searchResults: [],
  };

  searchBooks = (query) => {
    BooksAPI.search(query, 100).then(searchResults => {
      if (Array.isArray(searchResults)) {
        this.setState({ searchResults });
      } else {
        this.setState({ searchResults: [] });
      }
    });
  };

  updateQuery = query => {
    this.setState({ query: query.trim()});
    this.searchBooks(query);
  };

  
  render() {

    return (
          <div className="search-books">
                    
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"
                value={this.state.query}
                onChange={event => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <BookRow books={this.state.searchResults} {...this.props}/>
            </div>
          </div>


    )
    }
}

export default SearchBooks



