import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

export default class BookSearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateQuery = this.handleUpdateQuery.bind(this);
  }
  static propTypes = {
    onUpdateQuery: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
  };
  handleUpdateQuery(event) {
    this.props.onUpdateQuery(event.target.value);
  }
  render() {
    return (
      <div className="book-search-form">
        <form>
          <TextField
            onChange={this.handleUpdateQuery}
            value={this.props.query}
            id="outlined-basic"
            label="Search"
            margin="dense"
            variant="outlined"
            fullWidth
          />
        </form>
      </div>
    );
  }
}
