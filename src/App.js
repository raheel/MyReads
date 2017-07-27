import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";

class BooksApp extends React.Component {
  state = {
    query: "",
    searchResults: [],
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: []
    }
  };

  componentDidMount() {
    this.getAllBooks();
  }

  updateQuery = query => {
    this.setState({ query: query.trim() });
    this.searchBooks();
  };

  searchBooks = () => {
    BooksAPI.search(this.state.query, 100).then(searchResults => {
      if (Array.isArray(searchResults)) {
        this.setState({ searchResults });
      } else {
        this.setState({ searchResults: [] });
      }
    });
  };

  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books });

      var shelves = this.state.shelves;
      books.map(book => {
        shelves[book.shelf].push(book);
      });

      this.setState({ shelves });
    });
  };

  changeShelf = (book, shelf) => {
    var shelves = this.state.shelves;
    var array = shelves[book.shelf];

    array = array.filter(item => item.id !== book.id);

    shelves[book.shelf] = array;

    //book now belongs to new shelf
    BooksAPI.update(book, shelf);    
    book.shelf = shelf;

    if (shelves[shelf].id !== book.id) {
      shelves[shelf].push(book);
    }
    this.setState({ shelves });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={(history) =>
            <SearchBooks 
              books={this.state.searchResults}
              updateQuery={this.updateQuery}
              query={this.state.query}
              changeShelf={this.changeShelf}              
            />}
        />
        <Route
          exact
          path="/"
          render={() =>
            <ListBooks
              shelves={this.state.shelves}
              changeShelf={this.changeShelf}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;
