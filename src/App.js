import React, { Component } from 'react';
import './App.css';
import * as Books from './utils/BooksAPI'
import { BrowserRouter, Route } from 'react-router-dom'
import BookShelf from './BookShelf/BookShelf'
import BookSearch from './BookSearch/BookSearch'
import Alerts from './Alerts/Alerts'
import Navigator from './Navigator/Navigator'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      pendingBookUpdates: [], // Perform these updates on componentDidUpdate
    }
    this.updateBook = this.updateBook.bind(this)
  }
  /**
   * Creates an Update object containing the desination shelf and the book to move
   * and adds it to the pendingBookUpdates array on the state variable
   * @param {array} book 
   * @param {string} shelf 
   */
  updateBook(book, shelf) {
    this.setState(prevState => ({
      ...prevState,
      pendingBookUpdates: [...prevState.pendingBookUpdates, {book, shelf}]
    }))
  }
  /**
   * Get all Books from the API and set them in the state variable.
   * Also clears the pendingBookUpdates that have now been resolved
   */
  getBooks() {
    Books.getAll().then(books => {
      this.setState((prevState) => ({
        ...prevState,
        books: books,
        pendingBookUpdates: []
      }))
    })
  }
  componentDidMount() {
    this.getBooks() // Initial load of books
  }
  componentDidUpdate() {
    /* If there are pendingBookUpdates, perform them using the API and
       get the new state of books after all Promises have resolved */
    if (this.state.pendingBookUpdates.length) {
      const updatePromises = this.state.pendingBookUpdates.map(bookUpdate => {
        return Books.update(bookUpdate.book, bookUpdate.shelf)
      })
      Promise.all(updatePromises).then(() => {
        this.getBooks()
      })  
    } 
  }
  render() {
    const { books } = this.state
    return (
      <div className="app">
        <BrowserRouter>
          <Alerts books={ books } /> {/* Alerts are shown when books have been successfully moved */}
          <Route exact path="/search">
            <BookSearch myBooks={ books } onUpdateBook={ this.updateBook }/>
          </Route>
          <Route exact path="/">
            <BookShelf books={ books } onUpdateBook={ this.updateBook }/>
          </Route>
          <Navigator /> {/* Link to jump from home screen to search and back*/}
        </BrowserRouter>
      </div>
    );
  }
}
