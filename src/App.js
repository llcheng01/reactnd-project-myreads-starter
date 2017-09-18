import _ from 'lodash'
import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
    }
    state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
        // showSearchPage: false,
        currentlyReadingBooks: [], 
        wantToReadBooks: [],
        readBooks: [],  
        searchedBooks: []
    }

    doBookSearch(term) {
        term = term.trim();
        console.log("Do Search:" + term);
        if (term) {
            BooksAPI.search(term, 2).then(
                (books) => {
                    
                    this.setState({searchedBooks: books});
                }
            ).catch((error) => { 
                this.setState({searchedBooks: []})
                console.log(error); 
            })
        }
    }

    fetchMyBooks() {
        BooksAPI.getAll().then((books) => {
            this.setState({ currentlyReadingBooks: books.filter((b)=>"currentlyReading"===b.shelf), wantToReadBooks: books.filter((b)=>"wantToRead"===b.shelf), readBooks: books.filter((b)=>"read"===b.shelf) })
        }).catch((error) => { console.log(error); })
    }

    componentDidMount() {
        this.fetchMyBooks()
    }

    handleUpdate(book, shelf) {
        const updatedBooks = BooksAPI.update(book, shelf).
        then(res => {
            
            if ("currentlyReading" === shelf) {
                this.setState({
                currentlyReadingBooks: this.state.currentlyReadingBooks.concat(book), wantToReadBooks: this.state.wantToReadBooks.filter((b)=>b.id !== book.id), readBooks: this.state.readBooks.filter((b)=>b.id !== book.id) })
            } else if ("wantToRead" === shelf) {
                this.setState({
                wantToReadBooks: this.state.wantToReadBooks.concat(book), currentlyReadingBooks: this.state.currentlyReadingBooks.filter((b)=>b.id !== book.id), readBooks: this.state.readBooks.filter((b)=>b.id !== book.id) })
            } else if ("read" === shelf) {
                this.setState({
                readBooks: this.state.readBooks.concat(book),         wantToReadBooks: this.state.wantToReadBooks.filter((b)=>b.id !== book.id), currentlyReadingBooks: this.state.currentlyReadingBooks.filter((b)=>b.id !== book.id) })
            }
        }).catch((error) => {console.log(error); })
    }

  render() {
    const bookSearch = _.debounce((term) => { this.doBookSearch(term) }, 300);
    return (
      <div className="app">
        <Route exact path="/" render={() => (
                <ListBooks currentlyReading={this.state.currentlyReadingBooks} wantToRead={this.state.wantToReadBooks} read={this.state.readBooks} updateBookShelf={this.handleUpdate} />
            )}
        />
        <Route path="/search" render={() => (<SearchBooks books={this.state.searchedBooks} onSearchTermChange={bookSearch} updateBookShelf={this.handleUpdate}/>
            )} 
        />
      </div>
    )
  }
}

export default BooksApp
