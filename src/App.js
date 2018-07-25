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
      books:[]
    };
  }

  //Lifecycle

  componentDidMount(){
    BooksAPI.getAll().then(books => {
      this.setState({books})
    });
  }

  //Change shelf on user input.
  changeToShelf = (event,changedBook) =>{
    const shelf = event.target.value;
    BooksAPI.update(changedBook,shelf).then(resp => {
      changedBook.shelf = shelf;
      var changedBooks = this.state.books.filter(book => book.id !== changedBook.id);
      changedBooks.push(changedBook);
      this.setState({
        books:changedBooks
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Route path="/React-MyReads" render={()=>(
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
