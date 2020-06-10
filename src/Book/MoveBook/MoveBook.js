import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default class MoveBook extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateBook = this.handleUpdateBook.bind(this);
  }
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  };
  handleUpdateBook(event) {
    const { onUpdateBook, book } = this.props;
    const selectedShelf = event.target.value;
    onUpdateBook(book, selectedShelf);
  }
  render() {
    const { book } = this.props;
    return (
      <FormControl>
        <Select
          id="demo-simple-select"
          value={book.shelf || "none"}
          onChange={this.handleUpdateBook}
        >
          <MenuItem value="moveTo" disabled>
            Move to ...
          </MenuItem>
          <MenuItem value="none" disabled>
            None
          </MenuItem>
          {["wantToRead", "read", "currentlyReading"].map((shelf) => (
            <MenuItem key={shelf} value={shelf}>
              {
                // More human readable text than "wantToRead"
                shelf
                  .split(/(?=[A-Z])/)
                  .join(" ")
                  .toLocaleLowerCase()
              }
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}
