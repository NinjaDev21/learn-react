import React, {Component} from 'react';

class SearchBook extends Component {

    constructor(props) {
        super (props);
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event){
        event.preventDefault();
        this.props.searchBook(this.searchBook.value);
    }

    render() {
        return (
            <form>
                <input placeholder="type to Search a book" ref={searchBook => this.searchBook = searchBook} onKeyUp={this.searchHandler}/>
            </form>
        );
    }
}

export default SearchBook;

