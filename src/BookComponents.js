import React, { Component } from "react";

class BookShelf extends Component {
  titles = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read"
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
              : <div key={key}>
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
                  book={book}
                  key={book.id}
                  {...this.props}
                />
              )}
            </ol>}
      </div>
    );
  }
}

class BookItem extends Component {
  getShelf = (book) => {
    if (this.props.idToShelfMapping) {
       if(book.id in this.props.idToShelfMapping){
        return this.props.idToShelfMapping[book.id];
       }

      return "none";     
    }
    else
    if (this.props.book.shelf){
      return this.props.book.shelf;
    }

    return "none";
  }

  render() {
    const {
      width,
      height,
      imageLinks,
      title,
      authors,
      publisher
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
                backgroundImage: `url('${(imageLinks && imageLinks.thumbnail) ? imageLinks.thumbnail : ""}')`
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={this.getShelf(this.props.book)}
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
            {authors && authors.length > 0 ? authors.join(", ") : publisher}
          </div>
        </div>

      </li>
    );
  }
}

export { BookShelf, BookRow, BookItem };
