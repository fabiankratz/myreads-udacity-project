import React, { Component } from "react";
import PropTypes from "prop-types";
import BookSearchForm from "./BookSearchForm/BookSearchForm";
import FilteredBookListCollection from "../FilteredBookListCollection/FilteredBookListCollection";
import * as Books from "../utils/BooksAPI";
import BookTwoToneIcon from "@material-ui/icons/BookTwoTone";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import StarsIcon from "@material-ui/icons/Stars";
import LibraryBooksTwoToneIcon from "@material-ui/icons/LibraryBooksTwoTone";

export default class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      books: [],
    };
    this.updateQuery = this.updateQuery.bind(this);
  }
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  };
  updateQuery(query) {
    this.setState(() => ({
      query,
    }));
  }
  /**
   * Merges the latest book search results with the books that are already in my
   * shelves, so that they appear in the correct shelves in the search area
   * @param {array} books
   */
  setBooks(books = this.state.books) {
    const mergedBooks = this.state.query
      ? books.map((book) => {
          return (
            this.props.myBooks.find((myBook) => myBook.id === book.id) || book
          );
        })
      : []; // Don't show any books if query is empty
    this.setState((prevState) => ({
      ...prevState,
      books: mergedBooks,
    }));
  }
  componentDidUpdate(prevProps, prevState) {
    /* If the query has changed, make a new search API call.
      In case the response contains an error or if the query was empty,
      set this.state.books to be an empty array */
    if (this.state.query !== prevState.query) {
      this.state.query
        ? Books.search(this.state.query.trim()).then((books) =>
            this.setBooks(books.error ? [] : books)
          )
        : this.setBooks([]);
    }
    // Also update the search results when the myBooks prop has changed
    prevProps.myBooks !== this.props.myBooks && this.setBooks();
  }
  render() {
    return (
      <div className="book-search">
        <BookSearchForm
          onUpdateQuery={this.updateQuery}
          query={this.state.query}
        />
        <FilteredBookListCollection
          filters={[
            {
              title: { text: "All", icon: <LibraryBooksTwoToneIcon /> },
              options: { shelf: undefined }, // Return all books that are not in any of my shelves
            },
            {
              title: { text: "Want to read", icon: <StarsIcon /> },
              options: { shelf: "wantToRead" },
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
          onUpdateBook={this.props.onUpdateBook}
          books={this.state.books}
        />
      </div>
    );
  }
}
