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
        books: [],
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
            this.setState({books: books})
        }).catch((error) => { console.log(error); })
    }

    componentDidMount() {
        this.fetchMyBooks()
    }

    handleUpdate(book, shelf) {
        const updatedBooks = BooksAPI.update(book, shelf).
        then(res => {
            const bookIds = this.state.books.map((b) => { return b.id });

            if (bookIds.includes(book.id)) {
                console.log("Update shelf for existing books");
                // remove existing book and add the updated version
                // Change the shelf for original book
                book.shelf = shelf;
                const newBooksList = this.state.books.filter((b) => { if (b.id !== book.id) return b; });
                newBooksList.push(book);
                this.setState({books: newBooksList});
            } else {
                console.log("Add new books");
                this.setState({books: this.state.books.concat(book) });   
            }
        }).catch((error) => {console.log(error); })
    }

  render() {
    const bookSearch = _.debounce((term) => { this.doBookSearch(term) }, 300);
    return (
      <div className="app">
        <Route exact path="/" render={() => (
                <ListBooks books={this.state.books} updateBookShelf={this.handleUpdate} />
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
