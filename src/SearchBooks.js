//data:searched query,array of books returned and error message;

//idea from https://stackoverflow.com/questions/49681170/search-bar-functionality-for-book-api-in-react

import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';


class SearchBooks extends React.Component{
    constructor(props){
      super(props);
      this.state={
        query:'',
        searchedBooks:[],
        searchError:false
      };
    }

   
    
    searchBooks = (query) => {
      if(query && query.length>0){
        //fixed:searchedResults `undefined`
        let searchedResults=[];
        BooksAPI.search(query,20).then(res => {
          if(res.length){
            searchedResults = res.map(r => {
              r.shelf = this.addToShelf(r);
              return r;
            });
            this.setState({
              searchedBooks:searchedResults,
              searchError:false
            });
          } else {
            this.setState({
              searchedBooks:[],
              searchError:true
            });
          }
        });
      } else {
        this.setState({
          searchedBooks:[]
        });
      }
      this.setState({
        query:query.trim()
      });
    };

    addToShelf(r){
      let Shelf = this.props.books.filter(b => b.id === r.id);
      if(Shelf.length){
        return Shelf[0].shelf;
      } else {
        return "none"
      }
    }

    render(){
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/React-MyReads">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                 type="text"
                 placeholder="Search by title or author"
                 onChange={event => this.searchBooks(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
            {this.state.searchedBooks.length > 0 &&
              <Book
               changedBooks={this.state.searchedBooks}
               changeToShelf={this.props.changeToShelf}/>
            }
            <div>
            {(this.state.searchError) && (
              <div style={{textAlign:`center`}}>search returned 0 results! Try Again</div>
            )}
            </div>
            </div>
          </div>
        );
    }
}

export default SearchBooks;