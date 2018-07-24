//App divided into 3 smaller components-BookShelf,SearchBooks and Book

import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Route} from 'react-router-dom';
import SearchBooks from './SearchBooks';
import BookShelf from './BookShelf';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      books:[]
    };
  }

  componentDidMount(){
    BooksAPI.getAll().then(books => {
      this.setState({books})
    });
  }

  //TODO:Change shelf on user input
  changeToShelf = (event,changedBook) =>{
    const books = this.state.books;
    const shelf = event.target.value;
    changedBook.shelf = event.target.value;
    this.setState({books});

  //update the changes to the backend
  //   Method Signature:
  // ```js
  // update(book, shelf)
  // ```
    BooksAPI.update(changedBook,shelf).then(()=>{
      this.setState((currState)=>({
        books:currState.books.filter(book => book.id !== changedBook.id).concat([changedBook])
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <BookShelf
            books={this.state.books}
            changeToShelf={this.changeToShelf}
          />
        )}
        />
        <Route path="/search" render={()=>(
          <SearchBooks
            books={this.state.books}
            changeToShelf={this.changeToShelf}
          />
        )}
        />    
      </div>
    );
  }
}

export default App;
