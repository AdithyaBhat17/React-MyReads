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

  //Change shelf on user input and update the changes to the backend as well.
  //got the idea for this function from https://github.com/djarrin/MyReads/blob/master/src/App.js
  changeToShelf = (event,changedBook) =>{
    const shelf = event.target.value;
    changedBook.shelf = event.target.value;

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
