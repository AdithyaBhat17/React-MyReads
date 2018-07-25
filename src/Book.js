import React from 'react';
import noCover from './icons/image.png';

const Book = (props) => {
    const {changedBooks} = props;
    return(
        <div className="bookshelf-books">
            <ol className="books-grid">
            {/* FIXED: Now handling undefined thumbnail property */}
                {changedBooks.length > 0 && changedBooks.map((changedBook)=>(
                    <li key={changedBook.id}>
                    <div className="book">
                        <div className="book-top">
                        {/* url idea from question asked by Jastuccio in the udacity slack workspace */}
                            <div className="book-cover"
                             style={{ width: 128, height: 193, backgroundImage: `url(${changedBook.imageLinks && changedBook.imageLinks.thumbnail ? changedBook.imageLinks.thumbnail : noCover}` }}>
                            </div>
                            <div className="book-shelf-changer">
                                {/* TODO:Change shelf based on user input */}
                                <select
                                 name="shelf"
                                 onChange={event => props.changeToShelf(event,changedBook)}
                                 value={changedBook.shelf}
                                >
                                    <option value="none" disabled="true">Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{changedBook.title}</div>
                        <div className="book-authors">{changedBook.authors ? changedBook.authors.join(", ") : ""} 
                        {/*FIXED: Thanks for the suggestion (if-else in JSX)*/}
                        </div>
                    </div>
                </li>
                ))}                    
            </ol>
        </div>
    );
}

export default Book;