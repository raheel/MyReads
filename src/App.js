import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";

class BooksApp extends React.Component {
  state = {
    query: "",
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    }
  };

  componentDidMount() {
    this.getAllBooks();
  }

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

  if (array){
    array = array.filter(item => item.id !== book.id);
    shelves[book.shelf] = array;
  }

    //book now belongs to new shelf
    BooksAPI.update(book, shelf);    
    book.shelf = shelf;

    if (shelf in shelves && shelves[shelf].id !== book.id) {
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
