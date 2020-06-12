import React from "react";
import Book from "../../Book/Book";
import PropTypes from "prop-types";

export default function FilteredBookList(props) {
  const { onUpdateBook, books, namedFilter, filter } = props;
  // Filter all books by the specified filter functions passed in through props
  const applyFilter = (f, books) => {
    return books.filter(book => Object.keys(f.options).reduce((acc, key) => {
      if (acc) {
        return f.options[key](book);
      } else {
        return false;
      }
    }, true))
  }
  const filteredBooks = applyFilter(namedFilter, applyFilter(filter, books))
  return (
    <div className="filtered-book-list">
      {filteredBooks.length > 0 && (
        <div className="filtered-book-list">
          <h3>{namedFilter.title.text}</h3>
          <div>
            {filteredBooks.map((book) => (
              <Book key={book.id} book={book} onUpdateBook={onUpdateBook} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

FilteredBookList.propTypes = {
  onUpdateBook: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  namedFilter: PropTypes.object.isRequired
};
