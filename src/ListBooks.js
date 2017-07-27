import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BookShelf } from "./BookComponents";

class ListBooks extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title='Book Title' shelves={this.props.shelves} {...this.props}/>

          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ListBooks;
