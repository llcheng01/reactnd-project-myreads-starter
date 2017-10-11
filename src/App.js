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
        if (term) {
            BooksAPI.search(term, 2).then(
                (books) => {
                    const mergedResult = this.mergeArrays(books, this.state.books); 
                    this.setState({searchedBooks: mergedResult});
                }
            ).catch((error) => { 
                this.setState({searchedBooks: []})
                console.log(error); 
            })
        }
    }

    mergeArrays(searched, existed) {
        // Convert search result to hashmap
        const merged = searched.reduce((map, obj) => {
                map[obj.id] = obj;
                return map;
            }, new Map()); 

        existed.forEach((b) => {
            const search = merged[b.id];
            if (search) {
                search['shelf'] = b.shelf;
            }
        });

        // Back to array
        let values = [];

        Object.keys(merged).forEach((key)=>{
                values.push(merged[key]);
            });
        return values;
    }

    fetchMyBooks() {
        BooksAPI.getAll().then((books) => {
            this.setState({books: books})
        }).catch((error) => { console.log(error); })
    }

    componentDidMount() {
        console.log("I am being called!");
        this.fetchMyBooks()
    }

    handleUpdate(book, shelf) {
        const updatedBooks = BooksAPI.update(book, shelf).
        then(res => {
            const bookIds = this.state.books.map((b) => { return b.id });

            if (bookIds.includes(book.id)) {
                // remove existing book and add the updated version
                // Change the shelf for original book
                book.shelf = shelf;
                const newBooksList = this.state.books.filter((b) => { if (b.id !== book.id) return b; });
                newBooksList.push(book);
                this.setState({books: newBooksList});
            } else {
                this.setState({books: this.state.books.push(book) });   
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
