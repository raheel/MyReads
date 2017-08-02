import React, { Component } from "react";

const BookShelf = (props) =>  {
  const titles = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read"
  };
  
    let { shelves } = props;
    let keys = Object.keys(shelves);

    return (
      <div className="bookshelf">
        {keys.map(
          key =>
            shelves[key].length == 0
              ? null
              : <div key={key}>
                  <h2 className="bookshelf-title">{titles[key]}</h2>
                  <div className="bookshelf-books">
                    <BookRow books={shelves[key]} {...props} />
                  </div>
                </div>
        )}
      </div>
    );
  }

const BookRow = (props) =>  {
    const { books } = props;
    return (
      <div>
        {books.length < 1
          ? <div />
          : <ol className="books-grid">
              {books.map(book =>
                <BookItem
                  book={book}
                  key={book.id}
                  {...props}
                />
              )}
            </ol>
            }
      </div>
    );
  }

const BookItem = (props) =>  {
  const getShelf = (book) => {
    if (props.idToShelfMapping) {
       if(book.id in props.idToShelfMapping){
        let shelf = props.idToShelfMapping[book.id];
        book.shelf = shelf;
        return shelf;
       }

      return "none";     
    }
    else
    if (props.book.shelf){
      return props.book.shelf;
    }

    return "none";
  }

    const {
      width,
      height,
      imageLinks,
      title,
      authors,
      publisher
    } = props.book;

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
                value={getShelf(props.book)}
                onChange={event =>
                  props.changeShelf(props.book, event.target.value)}
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

export { BookShelf, BookRow, BookItem };
