import React, { Fragment } from "react";

export default class BookList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUpdate = (bookInfo) => {
    this.props.handleUpdate(bookInfo);
  }

  handleDelete = (bookId) => {
    this.props.handleDelete(bookId);
  }

  renderBooks(books) {
    return (
      <Fragment>
        {books.map((book, i) => (
          <div className="col-sm-6 col-md-3 py-3" key={i}>
            <div className="card h-100">
              <div className="c-icon edit-icon" onClick={() => {this.handleUpdate(book)}}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </div>
              <div className="c-icon delete-icon" onClick={() => {this.handleDelete(book._id)}}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </div>
              <img className="card-img-top" src="/images/book_default.png" alt="Book"></img>
              <div className="card-body">
                <h5 className="card-title w-100 three-dot-1">{book.title}</h5>
                <p className="card-text w-100 three-dot-3">{book.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }

  render() {
    let { books } = this.props;
    return books.length > 0 ? (
      this.renderBooks(books)
    ) : (
      <div className="alert alert-primary text-center mt-4" role="alert">
        No Books to display
      </div>
    );
  }
}
