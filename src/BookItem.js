import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

class BookItem extends Component {
  /*constructor for the delete method */
  constructor(props){
    super (props);
    this.state = {
        isEdit : false
    };
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditSave = this.onEditSave.bind(this);
  }

  /**
   * delete method
   */
  onDelete(){
    const {onDelete, id} = this.props;
    onDelete(id);
  }

  /**
   * create edit method
   */
  onEdit() {
        this.setState({isEdit :true });
    }

  /**
   * function to update edited data
   * @param event
   */
  onEditSave(event) {
    event.preventDefault();
    this.props.onEditSubmit(this.props.id, this.bookNameInput.value, this.bookAuthorInput.value, this.bookPriceInput.value, this.bookDescInput.value);
    this.bookNameInput.value = '';
    this.bookAuthorInput.value = '';
    this.bookPriceInput.value ='';
    this.bookDescInput.value ='';
    this.setState({isEdit :false });
  }

  render() {
      const { name, price, author, desc } = this.props;
    return (
        <div>
          {
              this.state.isEdit ? (
                <div>
                  <form onSubmit={this.onEditSave}>
                    <div>
                      <span> Edit book </span>
                      <br />
                      <input placeholder="Book Name" ref={bookNameInput => this.bookNameInput = bookNameInput} defaultValue={name}/>
                      {`  `}
                      <input placeholder="Book author" ref={bookAuthorInput=>this.bookAuthorInput = bookAuthorInput} defaultValue={author}/>
                      {`  `}
                      <input placeholder="Book price" ref={bookPriceInput=>this.bookPriceInput = bookPriceInput} defaultValue={price}/>
                      {`  `}
                      <br />
                      <br />
                      <input placeholder="Book describtion" ref={bookDescInput=>this.bookDescInput = bookDescInput} defaultValue={desc}/>
                      {`  `}
                      <Button variant="primary" size="sm" onClick={this.onEditSave}> Save</Button>
                      <hr/>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                      <span> {name}  </span>
                  {`|`}
                      <span> {author} </span>
                  {`|`}
                      <span> {price}  </span>
                  {`|`}
                      <span> {desc} </span>
                  {`|`}
                      <span><Button variant="danger" size="sm" onClick={this.onDelete}> Delete </Button> </span>
                      <span><Button variant="warning" size="sm" onClick={this.onEdit}> Edit</Button> </span>
                </div>
              )
          }
        </div>
    );
  }
}

export default BookItem;