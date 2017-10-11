import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' }
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange (event) {
        this.setState( { term: event.target.value });
        this.props.onSearchTermChange(event.target.value);
    }

    handleOptionChange(book, event) {
        this.props.updateBookShelf(book, event.target.value);
    }

    render() {
        const { books } = this.props || [];

        return (
            
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" 
                value={this.state.term} onChange={this.onInputChange} />
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
               {books.map((book) => (
               <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf || "none"} onChange={(e) => this.handleOptionChange(book, e)}>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none" defaultValue>None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors[0]}</div>
                    </div>
                </li> 

                ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks
