import React, { Component } from "react";

class BookShelf extends Component {
  titles = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
    none: "None"
  };
  render() {
    const { shelves } = this.props;
    const keys = Object.keys(shelves);

    return (
      <div className="bookshelf">
        {keys.map(
          key =>
            shelves[key].length == 0
              ? null
              : <div>
                  <h2 className="bookshelf-title">{this.titles[key]}</h2>
                  <div className="bookshelf-books">
                    <BookRow books={shelves[key]} {...this.props} />
                  </div>
                </div>
        )}
      </div>
    );
  }
}

class BookRow extends Component {
  render() {
    const { books } = this.props;
    return (
      <div>
        {books.length < 1
          ? <div />
          : <ol className="books-grid">
              {books.map(book =>
                <BookItem
                  id={book.id}
                  book={book}
                  key={book.title}
                  {...this.props}
                />
              )}
            </ol>}
      </div>
    );
  }
}

class BookItem extends Component {
  render() {
    const {
      width,
      height,
      imageLinks,
      title,
      authors,
      shelf
    } = this.props.book;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url('${imageLinks.thumbnail}')`
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={shelf}
                onChange={event =>
                  this.props.changeShelf(this.props.book, event.target.value)}
              >
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">
            {authors && authors.length > 0 ? authors[0] : ""}
          </div>
        </div>

      </li>
    );
  }
}

export { BookShelf, BookRow, BookItem };
