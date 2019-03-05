import React, {Component} from 'react';
import BookItem from './BookItem';
import AddBook from './AddBook';

const books = [
  {
    id:1,
    name: "Book 1",
    author: "some author 1",
    price: 200,
    desc: "this will be some describtion about this book 1"
  },
{
  id: 2,
  name: "Book 2",
  author: "some author 2",
  price: 400,
  desc: "this will be some describtion about this book 2"
},
{
  id: 3,
  name: "Book 3",
  author: "some author 3",
  price: 120,
  desc: "this will be some describtion about this book 3"
},
{
  id: 4,
  name: "Book 4",
  author: "some author 4",
  price: 420,
  desc: "this will be some describtion about this book 4"
}];
/* store the item into the local storage  */
localStorage.setItem('books', JSON.stringify(books));
class App extends Component {
  /**
   * constructor loads at 1st
   * @param props
   */
  constructor(props){
    super (props);
    this.state = { books: JSON.parse(localStorage.getItem('books')) };
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
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

  render() {
    return ( <div className = "App" >
        <h2> Library of books </h2>
        <AddBook onAdd={this.onAdd}/>
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