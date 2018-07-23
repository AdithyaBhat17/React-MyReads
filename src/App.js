import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Link , Route} from 'react-router-dom';
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
    }
  }

  componentDidMount(){
    BooksAPI.getAll().then(books => {
      this.setState(()=>{
        books:{books}
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <BookShelf
            books={this.state.books}
          />
        )}
        />
        <Route path="/search" render={()=>(
          <SearchBooks
            books={this.state.books}
          />
        )}
        />    
      </div>
    )
  }
}

export default App;
