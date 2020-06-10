import React, { Component } from "react";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

export default class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
    };
  }
  static propTypes = {
    books: PropTypes.array.isRequired,
  };
  componentDidUpdate(prevProps) {
    /* If there were books in this.props.books previsously
      check if any of them were moved to another shelf and save
      them in changedBooks variable */
    const changedBooks = prevProps.books.length
      ? this.props.books
          .filter((newBook) => {
            const oldBook = prevProps.books.find(
              (prevBook) => prevBook.id === newBook.id
            );
            return oldBook ? oldBook.shelf !== newBook.shelf : newBook; // Also add alert if book wasn't previously in the books array (i.e. it was added from the search form)
          })
          .map((book) => book.title)
      : [];
    // Add an alert for each of the moved books
    changedBooks.length &&
      this.setState((prevState) => ({
        alerts: [
          ...prevState.alerts,
          ...changedBooks.map((title) => ({
            id: `move${title}${Date.now()}-alert`,
            show: true,
            text: `Moved Book "${title}"`,
          })),
        ],
      }));
  }
  render() {
    const { alerts } = this.state;
    return (
      <div className="alerts">
        {alerts.map((alert) => (
          <Collapse in={alert.show} key={alert.id}>
            <Alert
              position="sticky"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() =>
                    this.setState((prevState) => ({
                      alerts: prevState.alerts.filter((a) => a.id !== alert.id),
                    })) // remove this alert
                  }
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {alert.text}
            </Alert>
          </Collapse>
        ))}
      </div>
    );
  }
}
