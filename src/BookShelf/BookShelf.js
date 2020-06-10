import React from "react";
import FilteredBookListCollection from "../FilteredBookListCollection/FilteredBookListCollection";
import PropTypes from "prop-types";
import BookTwoToneIcon from "@material-ui/icons/BookTwoTone";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import StarsIcon from "@material-ui/icons/Stars";

export default function BookShelf(props) {
  const { books, onUpdateBook } = props;
  return (
    <div className="book-shelf">
      <FilteredBookListCollection
        filters={[
          {
            title: { text: "Want to read", icon: <StarsIcon /> }, // For visual representation of filter
            options: { shelf: "wantToRead" }, // This is used to find only the books with the shelf "wantToRead"
          },
          {
            title: { text: "Currently reading", icon: <BookTwoToneIcon /> },
            options: { shelf: "currentlyReading" },
          },
          {
            title: { text: "Read", icon: <DoneAllIcon /> },
            options: { shelf: "read" },
          },
        ]}
        onUpdateBook={onUpdateBook}
        books={books}
      />
    </div>
  );
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};
