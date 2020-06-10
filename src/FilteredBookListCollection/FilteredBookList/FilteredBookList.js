import React from "react";
import Book from "../../Book/Book";
import PropTypes from "prop-types";

export default function FilteredBookList(props) {
  const { onUpdateBook, books, filter } = props;
  // Get all books that have the specified key-value pairs in from the filter object
  const filteredBooks = books.filter((book) => {
    return Object.keys(filter.options).reduce((acc, key) => {
      if (acc) {
        return book[key] === filter.options[key];
      } else {
        return false;
      }
    }, true);
  });
  return (
    <React.Fragment>
      {filteredBooks.length > 0 && (
        <div className="filtered-book-list">
          <h3>{filter.title.text}</h3>
          <div>
            {filteredBooks.map((book) => (
              <Book key={book.id} book={book} onUpdateBook={onUpdateBook} />
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

FilteredBookList.propTypes = {
  onUpdateBook: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
};
