import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

class AddBook extends Component {

    constructor(props) {
        super (props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * function to save a book
     * @param event
     */
    onSubmit(event) {
        event.preventDefault();                 
        this.props.onAdd(this.bookNameInput.value, this.bookAuthorInput.value, this.bookPriceInput.value, this.bookDescInput.value);
        this.bookNameInput.value = '';
        this.bookAuthorInput.value = '';
        this.bookPriceInput.value ='';
        this.bookDescInput.value ='';
    }

  render() {
      return (
      <form onSubmit={this.onSubmit}>
      <div>            
      <span> Add A book </span>
      <br />
      <input placeholder="Book Name" ref={bookNameInput => this.bookNameInput = bookNameInput}/>
      {`  `}
      <input placeholder="Book author" ref={bookAuthorInput=>this.bookAuthorInput = bookAuthorInput}/>
      {`  `}
      <input placeholder="Book price" ref={bookPriceInput=>this.bookPriceInput = bookPriceInput}/>
      {`  `}
      <br />
      <br />
      <input placeholder="Book describtion" ref={bookDescInput=>this.bookDescInput = bookDescInput}/>
      {`  `}
      <Button variant="primary" size="sm" onClick={this.onSubmit}>Add Book</Button>

      <hr/>
      </div>
      </form>
    );
  }
}

export default AddBook;

