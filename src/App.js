import React, {Component} from 'react';
import BookItem from './BookItem';
import AddBook from './AddBook';
import SearchBook from './SearchBook';

const books = [
  {
    id:1,
    name: " Do Androids Dream of Electric Sheep? ",
    author: "Philip K. Dick",
    price: 200,
    desc: "this will be some describtion about this book 1"
  },
{
  id: 2,
  name: " Everything I Never Told You ",
  author: "Celeste Ng",
  price: 400,
  desc: "this will be some describtion about this book 2"
},
{
  id: 3,
  name: "Is Everyone Hanging Out Without Me? (and Other Concerns)",
  author: "Mindy Kaling",
  price: 120,
  desc: "this will be some describtion about this book 3"
},
{
  id: 4,
  name: "The Electric Kool-Aid Acid Test",
  author: "Tom Wolfe",
  price: 420,
  desc: "this will be some describtion about this book 4"
}];
/* store the item into the local storage  */
localStorage.setItem('books', JSON.stringify(books));

/**
 * static function to check the search input with the state .
 * @param term
 * @returns {function(*): boolean}
 */
function searchForBooks(term) {
  return function (getbook) {
     return getbook.name.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}

class App extends Component {
  /**
   * constructor loads at 1st
   * @param props
   */
  constructor(props){
    super (props);
    this.state = { books: JSON.parse(localStorage.getItem('books')) , term:'' };
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.searchBook = this.searchBook.bind(this);
  }

  /**
   * this function loads state
   */
  componentWillMount(){
    const books  = this.getBooks();
    this.setState({books});
  }

  /**
   * function to get all the books
   * @returns {any}
   */
  getBooks(){
  return this.state.books;
  }

  /**
   * function to delete a book
   * @param id
   */
  onDelete(id){
    const books = this.getBooks();
    const filteredBooks = books.filter(book => {
      return book.id !== id;
    });
    this.setState({books:filteredBooks});    
  }

  /**
   * function to add a book
   * @param name
   * @param author
   * @param price
   * @param desc
   */
  onAdd(name, author, price, desc ){       
       const books = this.getBooks();
       let id = books.length + 1; /* get last insert id  */
       books.push({
         id, name, author, price, desc 
       });
       this.setState({books});
  }

  /**
   * function to edit and save the books
   * @param id
   * @param name
   * @param author
   * @param price
   * @param desc
   */
  onEditSubmit(id, name, author, price, desc ){
      let books = this.getBooks();
      books = books.map(book => {
        if(book.id === id){
          book.id = id;
          book.name = name;
          book.author = author;
          book.price = price;
          book.desc = desc;
        }
        return book;
      });
      this.setState({ books });
  }

  /**
   * function to search book
   * @param value
   */
  searchBook(value){
    if(value === ''){
     return this.setState({ books: JSON.parse(localStorage.getItem('books'))});
    }
    this.setState({term:value});
    let allBooks = this.getBooks();
    // allBooks = allBooks.filter(allBook => allBook.author.toLowerCase().includes(value.toLowerCase())).map(book => {
    //   return book;
    // });
    allBooks = allBooks.filter(searchForBooks(value)).map(book => {
      return book;
    });
    this.setState({books:allBooks});
  }

  render() {

    return ( <div className = "App" >
        <h2> Library of books </h2>
        <AddBook onAdd={this.onAdd}/>
        <SearchBook searchBook={this.searchBook}/>
          <div> <span> Name </span> | <span> Author </span> | <span> Price </span>  | <span> Description </span> | <span>Action </span> </div>
              {
        this.state.books.map(book => {
          return (                        
            <BookItem key={book.id} {...book} onDelete={this.onDelete} onEditSubmit={this.onEditSubmit}/>
          );
        })
              }

      </div>
    );
  }
}

export default App;