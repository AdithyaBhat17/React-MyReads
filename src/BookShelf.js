import React from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';

    const BookShelf = (props) => {
        const {books} = props;
        //TODO: pass the filtered array to `Book`.
        const currentlyReading = books.filter(book => book.shelf === "currentlyReading");
        const wantToRead = books.filter(book => book.shelf === "wantToRead");
        const read = books.filter(book => book.shelf === "read");
        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1 className="animated fadeInDown">MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title animated bounceInLeft">Currently Reading</h2>
                            {/* feat : short-circuit evaluation :D  */}
                            {currentlyReading.length > 0 && <Book 
                            changedBooks={currentlyReading}
                            changeToShelf={props.changeToShelf}
                            />}
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title animated bounceInLeft">Want to Read</h2>
                            {wantToRead.length > 0 && <Book
                            changedBooks={wantToRead}
                            changeToShelf={props.changeToShelf}
                            />}
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title animated bounceInLeft">Read</h2>
                            {read.length > 0 && <Book
                            changedBooks={read}
                            changeToShelf={props.changeToShelf}
                            />}                        
                        </div>
                    </div>
                </div>
                <div className="open-search animated bounceInUp">
                    <Link to="/search">Add a book</Link>
                </div>
            </div> 
        )
    }

export default BookShelf;