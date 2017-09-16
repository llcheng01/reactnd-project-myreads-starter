import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

class ListBooks extends Component {

    constructor(props) {
        super(props);

        // controlled component
        // this.handleOptionChange = this.handleOptionChange.bind(this);

    }

    handleOptionChange(book, event) {
        console.log("Changed: " + book.id + " to shelf: " + event.target.value);
        this.props.updateBookShelf(book, event.target.value);
    }
  
    render() {
        const { currentlyReading, wantToRead, read } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books"> 
                                <ol className="books-grid">
                                    {currentlyReading.map((book) => (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select value="currentlyReading" onChange={(e) => this.handleOptionChange(book, e)}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading" defaultValue>Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
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
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books"> 
                                <ol className="books-grid">
                                {wantToRead.map((book) => (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select  value="wantToRead" onChange={(e) => this.handleOptionChange(book, e)}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead" defaultValue>Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
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
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books"> 
                                <ol className="books-grid">
                                {read.map((book) => (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select value="read" onChange={(e) => this.handleOptionChange(book, e)}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                         <option value="read" defaultValue>Read</option>
                                                        <option value="none">None</option>
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
                    </div>
               </div>
               <div className="open-search">
                <Link to="/search">Add a book</Link> 
               </div>

            </div> 
        )   
    }
}

export default ListBooks
