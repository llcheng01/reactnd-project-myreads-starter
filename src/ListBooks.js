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
        this.props.updateBookShelf(book, event.target.value);
    }
  
    render() {
        const { books } = this.props

        // Create three arrays 
        const currentlyReading = this.props.books.filter((b) => "currentlyReading" ===b.shelf);

        const wantToRead = this.props.books.filter((b) => "wantToRead" ===b.shelf);
        
        const read = this.props.books.filter((b) => "read" === b.shelf);

        const allBooks = [currentlyReading, wantToRead, read];

        const titles = ["Currently Reading", "Want to Read", "Read"];

        const combined = titles.map((t, i) => {return [t,allBooks[i]];}); 

        const bookLists = combined.map((c) => {
                return (
                    <div key={c[0].length} className="bookshelf">
                        <h2 className="bookshelf-title">{c[0]}</h2>
                        <div className="bookshelf-books"> 
                            <ol className="books-grid">
                                {c[1].map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                            <div className="book-shelf-changer">
                                                <select value={book.shelf} onChange={(e) => this.handleOptionChange(book, e)}>
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
                );
            });

        return (
            <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                { bookLists } 
               </div>
               <div className="open-search">
                <Link to="/search">Add a book</Link> 
               </div>

            </div> 
        )   
    }
}

export default ListBooks
